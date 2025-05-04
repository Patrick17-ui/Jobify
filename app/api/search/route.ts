import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Recherche globale (tâches, utilisateurs, catégories)
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ success: false, error: "Requête de recherche requise" }, { status: 400 })
  }

  // Rechercher dans les tâches
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select(`
      *,
      categories(*),
      client:client_id(id, name, avatar_url, rating),
      tasker:tasker_id(id, name, avatar_url, rating)
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(10)

  // Rechercher dans les catégories
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name", { ascending: true })
    .limit(5)

  // Rechercher dans les utilisateurs (taskers uniquement)
  const { data: taskers, error: taskersError } = await supabase
    .from("users")
    .select("*")
    .eq("role", "tasker")
    .or(`name.ilike.%${query}%,bio.ilike.%${query}%`)
    .order("rating", { ascending: false })
    .limit(5)

  if (tasksError || categoriesError || taskersError) {
    return NextResponse.json(
      {
        success: false,
        error: tasksError?.message || categoriesError?.message || taskersError?.message,
      },
      { status: 400 },
    )
  }

  return NextResponse.json({
    success: true,
    data: {
      tasks: tasks || [],
      categories: categories || [],
      taskers: taskers || [],
    },
  })
}
