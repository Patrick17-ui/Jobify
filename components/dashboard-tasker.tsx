"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import {
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight,
  Star,
  Search,
  Briefcase,
  TrendingUp,
} from "lucide-react"

// Données fictives pour la démonstration
const availableTasks = [
  {
    id: "task-3",
    title: "Réparation robinet",
    description: "Réparation d'un robinet qui fuit dans la salle de bain",
    date: "2024-05-15T09:00:00",
    location: "Paris, 75011",
    budget: 70,
    client: {
      id: "client-1",
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      rating: 4.7,
    },
  },
  {
    id: "task-4",
    title: "Aide au déménagement",
    description: "Besoin d'aide pour déplacer quelques meubles et cartons",
    date: "2024-05-12T10:00:00",
    location: "Paris, 75020",
    budget: 100,
    client: {
      id: "client-2",
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      rating: 4.9,
    },
  },
  {
    id: "task-5",
    title: "Montage étagères",
    description: "Montage de 3 étagères murales",
    date: "2024-05-18T14:00:00",
    location: "Paris, 75016",
    budget: 60,
    client: {
      id: "client-3",
      name: "Pierre Durand",
      avatar: "/placeholder.svg?height=40&width=40&text=PD",
      rating: 4.5,
    },
  },
]

const myBookings = [
  {
    id: "booking-1",
    task: {
      id: "task-1",
      title: "Nettoyage d'appartement",
      description: "Nettoyage complet d'un appartement de 60m²",
      status: "in-progress",
      date: "2024-05-10T14:00:00",
      location: "Paris, 75011",
      budget: 80,
    },
    client: {
      id: "client-1",
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      rating: 4.7,
    },
  },
  {
    id: "booking-2",
    task: {
      id: "task-2",
      title: "Montage de meuble",
      description: "Montage d'une armoire IKEA",
      status: "completed",
      date: "2024-05-02T10:00:00",
      location: "Paris, 75015",
      budget: 50,
    },
    client: {
      id: "client-2",
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      rating: 4.9,
    },
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
    value: "8",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Taux d'acceptation",
    value: "95%",
    icon: Briefcase,
    color: "text-purple-500",
  },
  {
    title: "Revenus totaux",
    value: "450 €",
    icon: DollarSign,
    color: "text-yellow-500",
  },
]

export function DashboardTasker() {
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
          <Link href="/dashboard/available-tasks">
            <Search className="mr-2 h-4 w-4" />
            Trouver des tâches
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="available">Tâches disponibles</TabsTrigger>
          <TabsTrigger value="bookings">Mes réservations</TabsTrigger>
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mes réservations</CardTitle>
                <CardDescription>Vos tâches en cours et à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{booking.task.title}</h3>
                          {getStatusBadge(booking.task.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.task.description}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(booking.task.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.task.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{booking.task.budget} €</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.client.avatar || "/placeholder.svg"} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{booking.client.name}</p>
                            <div className="flex items-center text-yellow-500">
                              <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                              <span className="text-xs">{booking.client.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/bookings/${booking.id}`}>
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
                  <Link href="/dashboard/bookings">
                    Voir toutes mes réservations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenus</CardTitle>
                <CardDescription>Aperçu de vos revenus ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ce mois-ci</p>
                    <p className="text-2xl font-bold">130 €</p>
                  </div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span className="text-sm">+15% vs mois dernier</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression vers l'objectif mensuel</span>
                    <span>130 € / 300 €</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Derniers paiements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Nettoyage d'appartement</span>
                      </div>
                      <span>80 €</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Montage de meuble</span>
                      </div>
                      <span>50 €</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/earnings">
                    Voir tous mes revenus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tâches disponibles à proximité</CardTitle>
              <CardDescription>Tâches correspondant à vos compétences dans votre zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold">{task.title}</h3>
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
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.client.avatar || "/placeholder.svg"} alt={task.client.name} />
                          <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{task.client.name}</p>
                          <div className="flex items-center text-yellow-500">
                            <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                            <span className="text-xs">{task.client.rating}</span>
                          </div>
                        </div>
                      </div>
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
                <Link href="/dashboard/available-tasks">
                  Voir toutes les tâches disponibles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tâches disponibles</CardTitle>
              <CardDescription>Trouvez des tâches correspondant à vos compétences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold">{task.title}</h3>
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
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.client.avatar || "/placeholder.svg"} alt={task.client.name} />
                          <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{task.client.name}</p>
                          <div className="flex items-center text-yellow-500">
                            <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                            <span className="text-xs">{task.client.rating}</span>
                          </div>
                        </div>
                      </div>
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

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes réservations</CardTitle>
              <CardDescription>Gérez vos tâches en cours et terminées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{booking.task.title}</h3>
                        {getStatusBadge(booking.task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.task.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(booking.task.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.task.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{booking.task.budget} €</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.client.avatar || "/placeholder.svg"} alt={booking.client.name} />
                          <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{booking.client.name}</p>
                          <div className="flex items-center text-yellow-500">
                            <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                            <span className="text-xs">{booking.client.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/bookings/${booking.id}`}>
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
      </Tabs>
    </div>
  )
}
