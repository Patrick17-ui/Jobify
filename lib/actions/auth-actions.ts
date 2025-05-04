"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Connexion
export async function login(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

// Inscription
export async function register(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const accountType = formData.get("accountType") as string

  // Créer un nouvel utilisateur
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
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
      return { success: false, error: profileError.message }
    }
  }

  revalidatePath("/", "layout")
  redirect("/login")
}

// Déconnexion
export async function logout() {
  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  revalidatePath("/", "layout")
  redirect("/")
}

// Mettre à jour le profil
export async function updateProfile(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Non autorisé" }
  }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const bio = formData.get("bio") as string

  const { error } = await supabase
    .from("users")
    .update({
      name,
      phone,
      address,
      bio,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/profile")

  return { success: true }
}
