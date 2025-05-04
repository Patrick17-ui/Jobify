import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer toutes les tâches avec filtres
export async function GET(request: Request) {
  const supabase = createSupabaseServerClient()
  const { searchParams } = new URL(request.url)

  // Paramètres de filtrage
  const category = searchParams.get("category")
  const status = searchParams.get("status")
  const minBudget = searchParams.get("minBudget")
  const maxBudget = searchParams.get("maxBudget")
  const location = searchParams.get("location")
  const search = searchParams.get("search")

  // Construire la requête
  let query = supabase
    .from("tasks")
    .select(`
      *,
      categories(*),
      client:client_id(id, name, email, avatar_url, rating),
      tasker:tasker_id(id, name, email, avatar_url, rating)
    `)
    .order("created_at", { ascending: false })

  // Appliquer les filtres
  if (category) {
    query = query.eq("category_id", category)
  }

  if (status) {
    query = query.eq("status", status)
  }

  if (minBudget) {
    query = query.gte("budget", minBudget)
  }

  if (maxBudget) {
    query = query.lte("budget", maxBudget)
  }

  if (location) {
    query = query.ilike("location", `%${location}%`)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}

// Créer une nouvelle tâche
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const { title, description, category_id, budget, location, date } = await request.json()

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      category_id,
      client_id: user.id,
      status: "pending",
      budget,
      location,
      date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Créer une notification pour les taskers ayant cette compétence
  const { data: taskers } = await supabase.from("user_skills").select("user_id").eq("category_id", category_id)

  if (taskers && taskers.length > 0) {
    const notifications = taskers.map((tasker) => ({
      user_id: tasker.user_id,
      type: "task",
      content: `Nouvelle tâche disponible: ${title}`,
      reference_id: data[0].id,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))

    await supabase.from("notifications").insert(notifications)
  }

  return NextResponse.json({ success: true, data: data[0] })
}
