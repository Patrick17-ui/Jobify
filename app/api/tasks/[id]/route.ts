import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer une tâche spécifique
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { id } = params

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      categories(*),
      client:client_id(id, name, email, avatar_url, rating),
      tasker:tasker_id(id, name, email, avatar_url, rating),
      offers(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Mettre à jour une tâche
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { title, description, category_id, budget, location, date, status, tasker_id } = await request.json()

  // Vérifier que l'utilisateur est le propriétaire de la tâche ou un admin
  const { data: task } = await supabase.from("tasks").select("client_id").eq("id", id).single()

  if (!task || (task.client_id !== user.id && user.role !== "admin")) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title,
      description,
      category_id,
      budget,
      location,
      date,
      status,
      tasker_id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Si un tasker est assigné, créer une notification
  if (tasker_id && status === "in-progress") {
    await supabase.from("notifications").insert({
      user_id: tasker_id,
      type: "task",
      content: `Vous avez été sélectionné pour la tâche: ${title}`,
      reference_id: id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({ success: true, data: data[0] })
}

// Supprimer une tâche
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est le propriétaire de la tâche ou un admin
  const { data: task } = await supabase.from("tasks").select("client_id").eq("id", id).single()

  if (!task || (task.client_id !== user.id && user.role !== "admin")) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
