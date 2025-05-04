import { createSupabaseServerClient } from "./supabase/server"

// Vérifier si l'utilisateur est connecté
export async function getSession() {
  const supabase = createSupabaseServerClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

// Récupérer l'utilisateur actuel
export async function getCurrentUser() {
  const supabase = createSupabaseServerClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    // Récupérer les informations supplémentaires de l'utilisateur depuis la table users
    const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

    return {
      ...user,
      ...profile,
    }
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Vérifier si l'utilisateur est un client
export async function isClient() {
  const user = await getCurrentUser()
  return user?.role === "client"
}

// Vérifier si l'utilisateur est un tasker
export async function isTasker() {
  const user = await getCurrentUser()
  return user?.role === "tasker"
}

// Vérifier si l'utilisateur est un administrateur
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "admin"
}
