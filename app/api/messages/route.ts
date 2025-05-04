import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer les conversations d'un utilisateur
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const otherUserId = searchParams.get("otherUserId")

  if (otherUserId) {
    // Récupérer les messages d'une conversation spécifique
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
      .order("created_at", { ascending: true })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } else {
    // Récupérer toutes les conversations de l'utilisateur
    const { data: sentMessages, error: sentError } = await supabase
      .from("messages")
      .select(`
        *,
        receiver:receiver_id(id, name, avatar_url)
      `)
      .eq("sender_id", user.id)
      .order("created_at", { ascending: false })

    const { data: receivedMessages, error: receivedError } = await supabase
      .from("messages")
      .select(`
        *,
        sender:sender_id(id, name, avatar_url)
      `)
      .eq("receiver_id", user.id)
      .order("created_at", { ascending: false })

    if (sentError || receivedError) {
      return NextResponse.json({ success: false, error: sentError?.message || receivedError?.message }, { status: 400 })
    }

    // Regrouper les messages par conversation
    const conversations: Record<string, any> = {}

    sentMessages?.forEach((message) => {
      const otherUserId = message.receiver_id
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: message.receiver,
          lastMessage: message,
          unreadCount: 0,
        }
      } else if (new Date(message.created_at) > new Date(conversations[otherUserId].lastMessage.created_at)) {
        conversations[otherUserId].lastMessage = message
      }
    })

    receivedMessages?.forEach((message) => {
      const otherUserId = message.sender_id
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: message.sender,
          lastMessage: message,
          unreadCount: message.is_read ? 0 : 1,
        }
      } else if (new Date(message.created_at) > new Date(conversations[otherUserId].lastMessage.created_at)) {
        conversations[otherUserId].lastMessage = message
      }

      if (!message.is_read) {
        conversations[otherUserId].unreadCount = (conversations[otherUserId].unreadCount || 0) + 1
      }
    })

    const conversationsList = Object.values(conversations).sort((a: any, b: any) => {
      return new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()
    })

    return NextResponse.json({ success: true, data: conversationsList })
  }
}

// Envoyer un nouveau message
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { receiver_id, content, task_id } = await request.json()

  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: user.id,
      receiver_id,
      task_id,
      content,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Créer une notification pour le destinataire
  await supabase.from("notifications").insert({
    user_id: receiver_id,
    type: "message",
    content: `Nouveau message de ${user.name}`,
    reference_id: data[0].id,
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, data: data[0] })
}
