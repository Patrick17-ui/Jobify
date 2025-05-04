import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer les utilisateurs (admin seulement)
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const search = searchParams.get("search")

  let query = supabase.from("users").select("*")

  if (role) {
    query = query.eq("role", role)
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}
