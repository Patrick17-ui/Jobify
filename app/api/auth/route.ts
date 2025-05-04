import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const { action, email, password, name, accountType } = await request.json()

  if (action === "login") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  }

  if (action === "register") {
    // Créer un nouvel utilisateur
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    if (data.user) {
      // Ajouter les informations supplémentaires dans la table users
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        name,
        role: accountType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: false,
      })

      if (profileError) {
        return NextResponse.json({ success: false, error: profileError.message }, { status: 400 })
      }
    }

    return NextResponse.json({ success: true, data })
  }

  if (action === "logout") {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, error: "Action non reconnue" }, { status: 400 })
}
