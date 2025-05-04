"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { Clock, CheckCircle2, AlertCircle, Calendar, MapPin, DollarSign, Plus, ArrowRight, Star } from "lucide-react"

// Données fictives pour la démonstration
const tasks = [
  {
    id: "task-1",
    title: "Nettoyage d'appartement",
    description: "Nettoyage complet d'un appartement de 60m²",
    status: "in-progress",
    date: "2024-05-10T14:00:00",
    location: "Paris, 75011",
    budget: 80,
    tasker: {
      id: "tasker-1",
      name: "Marie Dupont",
      avatar: "/placeholder.svg?height=40&width=40&text=MD",
      rating: 4.8,
    },
  },
  {
    id: "task-2",
    title: "Montage de meuble",
    description: "Montage d'une armoire IKEA",
    status: "completed",
    date: "2024-05-02T10:00:00",
    location: "Paris, 75015",
    budget: 50,
    tasker: {
      id: "tasker-2",
      name: "Thomas Martin",
      avatar: "/placeholder.svg?height=40&width=40&text=TM",
      rating: 4.9,
    },
  },
  {
    id: "task-3",
    title: "Réparation robinet",
    description: "Réparation d'un robinet qui fuit dans la salle de bain",
    status: "pending",
    date: "2024-05-15T09:00:00",
    location: "Paris, 75011",
    budget: 70,
    tasker: null,
  },
]

const stats = [
  {
    title: "Tâches en cours",
    value: "1",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Tâches terminées",
    value: "5",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Tâches en attente",
    value: "1",
    icon: AlertCircle,
    color: "text-yellow-500",
  },
  {
    title: "Dépenses totales",
    value: "130 €",
    icon: DollarSign,
    color: "text-purple-500",
  },
]

export function DashboardClient() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            En attente
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            En cours
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Terminée
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bienvenue, {user?.name}</h2>
          <p className="text-muted-foreground">Voici un aperçu de vos tâches et activités</p>
        </div>
        <Button asChild>
          <Link href="/tasks/create">
            <Plus className="mr-2 h-4 w-4" />
            Créer une tâche
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="tasks">Mes tâches</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`rounded-full p-2 ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tâches récentes</CardTitle>
              <CardDescription>Vos 3 dernières tâches créées ou en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(task.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{task.budget} €</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.tasker ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.tasker.avatar || "/placeholder.svg"} alt={task.tasker.name} />
                            <AvatarFallback>{task.tasker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{task.tasker.name}</p>
                            <div className="flex items-center text-yellow-500">
                              <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                              <span className="text-xs">{task.tasker.rating}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Pas encore attribué</span>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/tasks/${task.id}`}>
                          <ArrowRight className="h-4 w-4" />
                          <span className="sr-only">Voir les détails</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/tasks">
                  Voir toutes mes tâches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Messages récents</CardTitle>
                <CardDescription>Vos dernières conversations avec les Taskers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=MD" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Marie Dupont</p>
                        <span className="text-xs text-muted-foreground">Il y a 2h</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Je serai là demain à 14h comme prévu.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=TM" />
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Thomas Martin</p>
                        <span className="text-xs text-muted-foreground">Hier</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Merci pour votre évaluation ! À bientôt.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/messages">
                    Voir tous les messages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Historique de vos dernières actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="absolute right-0 top-0 flex h-2 w-2 rounded-full bg-blue-600"></span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Tâche terminée</p>
                      <p className="text-xs text-muted-foreground">Montage de meuble - Thomas Martin</p>
                      <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Avis laissé</p>
                      <p className="text-xs text-muted-foreground">Vous avez noté Thomas Martin 5 étoiles</p>
                      <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <Plus className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Nouvelle tâche</p>
                      <p className="text-xs text-muted-foreground">Vous avez créé "Réparation robinet"</p>
                      <p className="text-xs text-muted-foreground">Il y a 5 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Toutes mes tâches</CardTitle>
              <CardDescription>Gérez vos tâches en cours, terminées et en attente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(task.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{task.budget} €</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.tasker ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.tasker.avatar || "/placeholder.svg"} alt={task.tasker.name} />
                            <AvatarFallback>{task.tasker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{task.tasker.name}</p>
                            <div className="flex items-center text-yellow-500">
                              <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                              <span className="text-xs">{task.tasker.rating}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Pas encore attribué</span>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/tasks/${task.id}`}>
                          <ArrowRight className="h-4 w-4" />
                          <span className="sr-only">Voir les détails</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                Précédent
              </Button>
              <Button variant="outline" disabled>
                Suivant
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes messages</CardTitle>
              <CardDescription>Vos conversations avec les Taskers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=MD" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Marie Dupont</p>
                      <span className="text-xs text-muted-foreground">Il y a 2h</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Je serai là demain à 14h comme prévu.</p>
                    <p className="text-xs text-muted-foreground">Tâche: Nettoyage d'appartement</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/messages/1">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Voir la conversation</span>
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=TM" />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Thomas Martin</p>
                      <span className="text-xs text-muted-foreground">Hier</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Merci pour votre évaluation ! À bientôt.</p>
                    <p className="text-xs text-muted-foreground">Tâche: Montage de meuble</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/messages/2">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Voir la conversation</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
