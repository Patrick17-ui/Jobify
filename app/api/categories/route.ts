import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer toutes les catégories
export async function GET() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Créer une nouvelle catégorie (admin seulement)
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { name, description, icon } = await request.json()

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      description,
      icon,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data: data[0] })
}
