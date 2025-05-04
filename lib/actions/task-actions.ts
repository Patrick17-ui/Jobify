"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Créer une nouvelle tâche
export async function createTask(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Non autorisé" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category_id = formData.get("category") as string
  const budget = Number.parseFloat(formData.get("budget") as string)
  const location = formData.get("location") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string

  // Combiner la date et l'heure
  const dateTime = new Date(`${date}T${time}`)

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
      date: dateTime.toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return { success: false, error: error.message }
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

  revalidatePath("/dashboard/tasks")
  revalidatePath("/tasks")

  return { success: true, data: data[0] }
}

// Mettre à jour une tâche
export async function updateTask(taskId: string, formData: FormData) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Non autorisé" }
  }

  // Vérifier que l'utilisateur est le propriétaire de la tâche ou un admin
  const { data: task } = await supabase.from("tasks").select("client_id, title").eq("id", taskId).single()

  if (!task || (task.client_id !== user.id && user.role !== "admin")) {
    return { success: false, error: "Non autorisé" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category_id = formData.get("category") as string
  const budget = Number.parseFloat(formData.get("budget") as string)
  const location = formData.get("location") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const status = formData.get("status") as string

  // Combiner la date et l'heure
  const dateTime = new Date(`${date}T${time}`)

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title,
      description,
      category_id,
      budget,
      location,
      date: dateTime.toISOString(),
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .select()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/tasks")
  revalidatePath(`/tasks/${taskId}`)
  revalidatePath("/tasks")

  return { success: true, data: data[0] }
}

// Accepter une offre pour une tâche
export async function acceptOffer(offerId: string) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Non autorisé" }
  }

  // Récupérer l'offre
  const { data: offer } = await supabase.from("offers").select("task_id, tasker_id").eq("id", offerId).single()

  if (!offer) {
    return { success: false, error: "Offre non trouvée" }
  }

  // Vérifier que l'utilisateur est le propriétaire de la tâche
  const { data: task } = await supabase.from("tasks").select("client_id, title").eq("id", offer.task_id).single()

  if (!task || task.client_id !== user.id) {
    return { success: false, error: "Non autorisé" }
  }

  // Mettre à jour l'offre
  const { error: offerError } = await supabase
    .from("offers")
    .update({
      status: "accepted",
      updated_at: new Date().toISOString(),
    })
    .eq("id", offerId)

  if (offerError) {
    return { success: false, error: offerError.message }
  }

  // Mettre à jour la tâche
  const { error: taskError } = await supabase
    .from("tasks")
    .update({
      tasker_id: offer.tasker_id,
      status: "in-progress",
      updated_at: new Date().toISOString(),
    })
    .eq("id", offer.task_id)

  if (taskError) {
    return { success: false, error: taskError.message }
  }

  // Refuser toutes les autres offres pour cette tâche
  await supabase
    .from("offers")
    .update({
      status: "rejected",
      updated_at: new Date().toISOString(),
    })
    .eq("task_id", offer.task_id)
    .neq("id", offerId)

  // Créer une notification pour le tasker
  await supabase.from("notifications").insert({
    user_id: offer.tasker_id,
    type: "offer",
    content: `Votre offre pour la tâche "${task.title}" a été acceptée`,
    reference_id: offer.task_id,
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  revalidatePath("/dashboard/tasks")
  revalidatePath(`/tasks/${offer.task_id}`)

  return { success: true }
}

// Compléter une tâche
export async function completeTask(taskId: string) {
  const supabase = createSupabaseServerClient()
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Non autorisé" }
  }

  // Vérifier que l'utilisateur est le tasker assigné à la tâche
  const { data: task } = await supabase.from("tasks").select("*").eq("id", taskId).single()

  if (!task || task.tasker_id !== user.id) {
    return { success: false, error: "Non autorisé" }
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)

  if (error) {
    return { success: false, error: error.message }
  }

  // Créer une notification pour le client
  await supabase.from("notifications").insert({
    user_id: task.client_id,
    type: "task",
    content: `La tâche "${task.title}" a été marquée comme terminée`,
    reference_id: taskId,
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  revalidatePath("/dashboard/tasks")
  revalidatePath(`/tasks/${taskId}`)

  return { success: true }
}
