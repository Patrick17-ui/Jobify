import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer une offre spécifique
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { id } = params

  const { data, error } = await supabase
    .from("offers")
    .select(`
      *,
      tasker:tasker_id(id, name, email, avatar_url, rating),
      task:task_id(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Mettre à jour le statut d'une offre (accepter/refuser)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { status } = await request.json()

  // Vérifier que l'utilisateur est le propriétaire de la tâche associée à l'offre
  const { data: offer } = await supabase.from("offers").select("task_id, tasker_id").eq("id", id).single()

  if (!offer) {
    return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 })
  }

  const { data: task } = await supabase.from("tasks").select("client_id, title").eq("id", offer.task_id).single()

  if (!task || (task.client_id !== user.id && user.role !== "admin")) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("offers")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Si l'offre est acceptée, mettre à jour la tâche
  if (status === "accepted") {
    await supabase
      .from("tasks")
      .update({
        tasker_id: offer.tasker_id,
        status: "in-progress",
        updated_at: new Date().toISOString(),
      })
      .eq("id", offer.task_id)

    // Refuser toutes les autres offres pour cette tâche
    await supabase
      .from("offers")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("task_id", offer.task_id)
      .neq("id", id)

    // Créer une notification pour le tasker
    await supabase.from("notifications").insert({
      user_id: offer.tasker_id,
      type: "offer",
      content: `Votre offre pour la tâche "${task.title}" a été acceptée`,
      reference_id: offer.task_id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  } else if (status === "rejected") {
    // Créer une notification pour le tasker
    await supabase.from("notifications").insert({
      user_id: offer.tasker_id,
      type: "offer",
      content: `Votre offre pour la tâche "${task.title}" a été refusée`,
      reference_id: offer.task_id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({ success: true, data: data[0] })
}
