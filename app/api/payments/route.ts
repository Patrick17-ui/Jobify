import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer les paiements d'un utilisateur
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const taskId = searchParams.get("taskId")

  let query = supabase.from("payments").select(`
      *,
      task:task_id(*),
      client:client_id(id, name, email, avatar_url),
      tasker:tasker_id(id, name, email, avatar_url)
    `)

  if (taskId) {
    query = query.eq("task_id", taskId)
  } else {
    // Si pas de tâche spécifique, filtrer par utilisateur
    query = query.or(`client_id.eq.${user.id},tasker_id.eq.${user.id}`)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Créer un nouveau paiement
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { task_id, amount, transaction_id } = await request.json()

  // Vérifier que la tâche existe et que l'utilisateur est le client
  const { data: task } = await supabase.from("tasks").select("*").eq("id", task_id).single()

  if (!task) {
    return NextResponse.json({ success: false, error: "Tâche non trouvée" }, { status: 404 })
  }

  if (task.client_id !== user.id) {
    return NextResponse.json({ success: false, error: "Seul le client peut effectuer un paiement" }, { status: 403 })
  }

  if (!task.tasker_id) {
    return NextResponse.json({ success: false, error: "Aucun tasker assigné à cette tâche" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("payments")
    .insert({
      task_id,
      client_id: user.id,
      tasker_id: task.tasker_id,
      amount,
      status: "completed",
      transaction_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Mettre à jour le statut de la tâche
  await supabase
    .from("tasks")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", task_id)

  // Créer des notifications pour le client et le tasker
  await supabase.from("notifications").insert([
    {
      user_id: task.tasker_id,
      type: "payment",
      content: `Vous avez reçu un paiement de ${amount} € pour la tâche "${task.title}"`,
      reference_id: data[0].id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      user_id: user.id,
      type: "payment",
      content: `Votre paiement de ${amount} € pour la tâche "${task.title}" a été effectué`,
      reference_id: data[0].id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ])

  return NextResponse.json({ success: true, data: data[0] })
}
