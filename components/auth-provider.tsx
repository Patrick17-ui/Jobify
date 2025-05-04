"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "client" | "tasker" | "admin"
  avatar_url?: string
  phone?: string
  address?: string
  bio?: string
  rating?: number
  is_verified: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // Récupérer la session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Récupérer les informations supplémentaires de l'utilisateur
          const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              name: profile.name,
              role: profile.role,
              avatar_url: profile.avatar_url,
              phone: profile.phone,
              address: profile.address,
              bio: profile.bio,
              rating: profile.rating,
              is_verified: profile.is_verified,
            })
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // S'abonner aux changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Récupérer les informations supplémentaires de l'utilisateur
        const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile.name,
            role: profile.role,
            avatar_url: profile.avatar_url,
            phone: profile.phone,
            address: profile.address,
            bio: profile.bio,
            rating: profile.rating,
            is_verified: profile.is_verified,
          })
        }

        router.refresh()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        router.refresh()
      }
    })

    checkAuth()

    // Nettoyer l'abonnement
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData: any) => {
    try {
      // Créer un nouvel utilisateur
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Ajouter les informations supplémentaires dans la table users
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: userData.email,
          name: userData.name,
          role: userData.accountType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_verified: false,
        })

        if (profileError) {
          return { success: false, error: profileError.message }
        }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      return { success: false, error: "Utilisateur non connecté" }
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      // Mettre à jour l'état local
      setUser((prev) => (prev ? { ...prev, ...data } : null))

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
