// Définition du schéma de la base de données Supabase
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: "client" | "tasker" | "admin"
          avatar_url: string | null
          created_at: string
          updated_at: string
          phone: string | null
          address: string | null
          bio: string | null
          rating: number | null
          is_verified: boolean
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: "client" | "tasker" | "admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          phone?: string | null
          address?: string | null
          bio?: string | null
          rating?: number | null
          is_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: "client" | "tasker" | "admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          phone?: string | null
          address?: string | null
          bio?: string | null
          rating?: number | null
          is_verified?: boolean
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          category_id: string
          client_id: string
          tasker_id: string | null
          status: "pending" | "in-progress" | "completed" | "cancelled"
          budget: number
          location: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category_id: string
          client_id: string
          tasker_id?: string | null
          status?: "pending" | "in-progress" | "completed" | "cancelled"
          budget: number
          location: string
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category_id?: string
          client_id?: string
          tasker_id?: string | null
          status?: "pending" | "in-progress" | "completed" | "cancelled"
          budget?: number
          location?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          task_id: string
          tasker_id: string
          message: string
          status: "pending" | "accepted" | "rejected"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          tasker_id: string
          message: string
          status?: "pending" | "accepted" | "rejected"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          tasker_id?: string
          message?: string
          status?: "pending" | "accepted" | "rejected"
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          task_id: string | null
          content: string
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          task_id?: string | null
          content: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          task_id?: string | null
          content?: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          task_id: string
          client_id: string
          tasker_id: string
          amount: number
          status: "pending" | "completed" | "refunded"
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          client_id: string
          tasker_id: string
          amount: number
          status?: "pending" | "completed" | "refunded"
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          client_id?: string
          tasker_id?: string
          amount?: number
          status?: "pending" | "completed" | "refunded"
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: "task" | "message" | "offer" | "payment" | "review" | "system"
          content: string
          reference_id: string | null
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: "task" | "message" | "offer" | "payment" | "review" | "system"
          content: string
          reference_id?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: "task" | "message" | "offer" | "payment" | "review" | "system"
          content?: string
          reference_id?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          tasker_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tasker_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tasker_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
