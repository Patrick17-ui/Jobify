import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Récupérer un utilisateur spécifique
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const currentUser = await getCurrentUser()
  const { id } = params

  // Vérifier que l'utilisateur est connecté ou est un admin
  if (!currentUser) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  // Si l'utilisateur n'est pas un admin et n'est pas l'utilisateur demandé, limiter les informations
  const isAdmin = currentUser.role === "admin"
  const isSelf = currentUser.id === id

  const query = supabase.from("users").select("*").eq("id", id)

  const { data, error } = await query.single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  // Si l'utilisateur n'est pas un admin et n'est pas l'utilisateur demandé, masquer certaines informations
  if (!isAdmin && !isSelf) {
    const { email, phone, address, ...publicData } = data
    return NextResponse.json({ success: true, data: publicData })
  }

  return NextResponse.json({ success: true, data })
}

// Mettre à jour un utilisateur
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const currentUser = await getCurrentUser()
  const { id } = params

  // Vérifier que l'utilisateur est connecté et est soit l'utilisateur à modifier, soit un admin
  if (!currentUser || (currentUser.id !== id && currentUser.role !== "admin")) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  const updateData = await request.json()

  // Empêcher la modification du rôle sauf pour les admins
  if (updateData.role && currentUser.role !== "admin") {
    delete updateData.role
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data: data[0] })
}

// Désactiver/supprimer un utilisateur (admin seulement)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const currentUser = await getCurrentUser()
  const { id } = params

  // Vérifier que l'utilisateur est un admin
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
  }

  // Désactiver l'utilisateur plutôt que de le supprimer
  const { error } = await supabase
    .from("users")
    .update({
      is_verified: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
