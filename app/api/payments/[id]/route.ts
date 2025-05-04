import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer un paiement spécifique
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      task:task_id(*),
      client:client_id(id, name, email, avatar_url),
      tasker:tasker_id(id, name, email, avatar_url)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Vérifier que l'utilisateur est impliqué dans le paiement
  if (data.client_id !== user.id && data.tasker_id !== user.id && user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  return NextResponse.json({ success: true, data })
}

// Rembourser un paiement (admin seulement)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user || user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { data: payment } = await supabase.from("payments").select("*").eq("id", id).single()

  if (!payment) {
    return NextResponse.json({ success: false, error: "Paiement non trouvé" }, { status: 404 })
  }

  const { data, error } = await supabase
    .from("payments")
    .update({
      status: "refunded",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Créer des notifications pour le client et le tasker
  await supabase.from("notifications").insert([
    {
      user_id: payment.client_id,
      type: "payment",
      content: `Votre paiement de ${payment.amount} € a été remboursé`,
      reference_id: id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      user_id: payment.tasker_id,
      type: "payment",
      content: `Le paiement de ${payment.amount} € a été remboursé au client`,
      reference_id: id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ])

  return NextResponse.json({ success: true, data: data[0] })
}
