import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer les avis pour un utilisateur
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, error: "ID utilisateur requis" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      reviewer:reviewer_id(id, name, avatar_url),
      task:task_id(*)
    `)
    .eq("reviewee_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Créer un nouvel avis
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { task_id, reviewee_id, rating, comment } = await request.json()

  // Vérifier que la tâche est terminée
  const { data: task } = await supabase.from("tasks").select("*").eq("id", task_id).eq("status", "completed").single()

  if (!task) {
    return NextResponse.json({ success: false, error: "Tâche non terminée ou non trouvée" }, { status: 400 })
  }

  // Vérifier que l'utilisateur est impliqué dans la tâche
  if (task.client_id !== user.id && task.tasker_id !== user.id) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  // Vérifier que l'utilisateur évalue l'autre partie de la tâche
  if (
    (task.client_id === user.id && task.tasker_id !== reviewee_id) ||
    (task.tasker_id === user.id && task.client_id !== reviewee_id)
  ) {
    return NextResponse.json({ success: false, error: "Utilisateur à évaluer non valide" }, { status: 400 })
  }

  // Vérifier que l'utilisateur n'a pas déjà laissé un avis pour cette tâche
  const { data: existingReview } = await supabase
    .from("reviews")
    .select("*")
    .eq("task_id", task_id)
    .eq("reviewer_id", user.id)
    .single()

  if (existingReview) {
    return NextResponse.json(
      { success: false, error: "Vous avez déjà laissé un avis pour cette tâche" },
      { status: 400 },
    )
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      task_id,
      reviewer_id: user.id,
      reviewee_id,
      rating,
      comment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Mettre à jour la note moyenne de l'utilisateur évalué
  const { data: reviews } = await supabase.from("reviews").select("rating").eq("reviewee_id", reviewee_id)

  if (reviews && reviews.length > 0) {
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    await supabase
      .from("users")
      .update({
        rating: averageRating,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reviewee_id)
  }

  // Créer une notification pour l'utilisateur évalué
  await supabase.from("notifications").insert({
    user_id: reviewee_id,
    type: "review",
    content: `${user.name} vous a laissé un avis`,
    reference_id: data[0].id,
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, data: data[0] })
}
