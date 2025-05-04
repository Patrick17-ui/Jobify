import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Marquer une notification comme lue
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est le destinataire de la notification
  const { data: notification } = await supabase.from("notifications").select("user_id").eq("id", id).single()

  if (!notification || notification.user_id !== user.id) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data: data[0] })
}

// Supprimer une notification
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()
  const { id } = params

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est le destinataire de la notification
  const { data: notification } = await supabase.from("notifications").select("user_id").eq("id", id).single()

  if (!notification || notification.user_id !== user.id) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 403 })
  }

  const { error } = await supabase.from("notifications").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
