import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer les offres pour une tâche
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const { searchParams } = new URL(request.url)
  const taskId = searchParams.get("taskId")

  if (!taskId) {
    return NextResponse.json({ success: false, error: "ID de tâche requis" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("offers")
    .select(`
      *,
      tasker:tasker_id(id, name, email, avatar_url, rating)
    `)
    .eq("task_id", taskId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Créer une nouvelle offre
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  if (user.role !== "tasker") {
    return NextResponse.json({ success: false, error: "Seuls les taskers peuvent faire des offres" }, { status: 403 })
  }

  const { task_id, message } = await request.json()

  // Vérifier que la tâche existe et est disponible
  const { data: task } = await supabase.from("tasks").select("*").eq("id", task_id).eq("status", "pending").single()

  if (!task) {
    return NextResponse.json({ success: false, error: "Tâche non disponible" }, { status: 400 })
  }

  // Vérifier que le tasker n'a pas déjà fait une offre pour cette tâche
  const { data: existingOffer } = await supabase
    .from("offers")
    .select("*")
    .eq("task_id", task_id)
    .eq("tasker_id", user.id)
    .single()

  if (existingOffer) {
    return NextResponse.json(
      { success: false, error: "Vous avez déjà fait une offre pour cette tâche" },
      { status: 400 },
    )
  }

  const { data, error } = await supabase
    .from("offers")
    .insert({
      task_id,
      tasker_id: user.id,
      message,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Créer une notification pour le client
  await supabase.from("notifications").insert({
    user_id: task.client_id,
    type: "offer",
    content: `Nouvelle offre pour votre tâche: ${task.title}`,
    reference_id: data[0].id,
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, data: data[0] })
}
