"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Users,
  ListTodo,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  UserX,
  CheckCircle,
  XCircle,
} from "lucide-react"

// Données fictives pour la démonstration
const users = [
  {
    id: "user-1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "client",
    status: "active",
    createdAt: "2024-01-15",
    tasksCount: 5,
  },
  {
    id: "user-2",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    role: "tasker",
    status: "active",
    createdAt: "2024-02-10",
    tasksCount: 8,
    rating: 4.8,
  },
  {
    id: "user-3",
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    role: "tasker",
    status: "active",
    createdAt: "2024-01-20",
    tasksCount: 12,
    rating: 4.9,
  },
  {
    id: "user-4",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    role: "client",
    status: "inactive",
    createdAt: "2024-03-05",
    tasksCount: 2,
  },
  {
    id: "user-5",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    role: "client",
    status: "active",
    createdAt: "2024-02-25",
    tasksCount: 3,
  },
]

const tasks = [
  {
    id: "task-1",
    title: "Nettoyage d'appartement",
    client: "Jean Dupont",
    tasker: "Marie Dupont",
    status: "in-progress",
    date: "2024-05-10",
    budget: 80,
  },
  {
    id: "task-2",
    title: "Montage de meuble",
    client: "Sophie Martin",
    tasker: "Thomas Martin",
    status: "completed",
    date: "2024-05-02",
    budget: 50,
  },
  {
    id: "task-3",
    title: "Réparation robinet",
    client: "Pierre Durand",
    tasker: null,
    status: "pending",
    date: "2024-05-15",
    budget: 70,
  },
  {
    id: "task-4",
    title: "Aide au déménagement",
    client: "Jean Dupont",
    tasker: null,
    status: "pending",
    date: "2024-05-12",
    budget: 100,
  },
  {
    id: "task-5",
    title: "Montage étagères",
    client: "Sophie Martin",
    tasker: null,
    status: "pending",
    date: "2024-05-18",
    budget: 60,
  },
]

const payments = [
  {
    id: "payment-1",
    task: "Nettoyage d'appartement",
    client: "Jean Dupont",
    tasker: "Marie Dupont",
    amount: 80,
    commission: 8,
    status: "completed",
    date: "2024-05-02",
  },
  {
    id: "payment-2",
    task: "Montage de meuble",
    client: "Sophie Martin",
    tasker: "Thomas Martin",
    amount: 50,
    commission: 5,
    status: "completed",
    date: "2024-05-03",
  },
  {
    id: "payment-3",
    task: "Réparation électrique",
    client: "Pierre Durand",
    tasker: "Thomas Martin",
    amount: 90,
    commission: 9,
    status: "completed",
    date: "2024-04-28",
  },
  {
    id: "payment-4",
    task: "Jardinage",
    client: "Jean Dupont",
    tasker: "Marie Dupont",
    amount: 70,
    commission: 7,
    status: "completed",
    date: "2024-04-25",
  },
]

const stats = [
  {
    title: "Utilisateurs",
    value: "125",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Tâches",
    value: "87",
    icon: ListTodo,
    color: "text-green-500",
  },
  {
    title: "Revenus",
    value: "2 450 €",
    icon: DollarSign,
    color: "text-yellow-500",
  },
  {
    title: "Commissions",
    value: "245 €",
    icon: BarChart3,
    color: "text-purple-500",
  },
]

export default function AdminDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            {status === "active" ? "Actif" : "Terminée"}
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Inactif
          </Badge>
        )
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
    }).format(date)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.client && task.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.tasker && task.tasker.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">TaskMaster Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Retour au site
            </Button>
            <Button variant="destructive" onClick={() => router.push("/login")}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <div className="container py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tableau de bord administrateur</h2>
          <p className="text-muted-foreground">Gérez les utilisateurs, les tâches et les paiements</p>
        </div>

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

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrer</span>
          </Button>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Derniers utilisateurs inscrits</CardTitle>
                <CardDescription>Les 5 derniers utilisateurs inscrits sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          {getStatusBadge(user.status)}
                          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                            {user.role === "client" ? "Client" : "Tasker"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">Inscrit le {formatDate(user.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/users/${user.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <UserX className="mr-2 h-4 w-4" />
                          Désactiver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("users")}>
                  Voir tous les utilisateurs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tâches récentes</CardTitle>
                <CardDescription>Les 5 dernières tâches créées sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{task.title}</h3>
                          {getStatusBadge(task.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Client: {task.client}</p>
                        <p className="text-sm text-muted-foreground">Tasker: {task.tasker || "Non attribué"}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {formatDate(task.date)}</span>
                          <span>Budget: {task.budget} €</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/tasks/${task.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("tasks")}>
                  Voir toutes les tâches
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Liste de tous les utilisateurs inscrits sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center gap-1 cursor-pointer">
                            Nom
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rôle
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date d'inscription
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                              {user.role === "client" ? "Client" : "Tasker"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/admin/users/${user.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir
                                </a>
                              </Button>
                              {user.status === "active" ? (
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <UserX className="mr-2 h-4 w-4" />
                                  Désactiver
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="text-green-500">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activer
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des tâches</CardTitle>
                <CardDescription>Liste de toutes les tâches sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center gap-1 cursor-pointer">
                            Titre
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tasker
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Budget
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{task.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{task.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{task.tasker || "Non attribué"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(task.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(task.date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{task.budget} €</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/admin/tasks/${task.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir
                                </a>
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <XCircle className="mr-2 h-4 w-4" />
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des paiements</CardTitle>
                <CardDescription>Liste de tous les paiements effectués sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center gap-1 cursor-pointer">
                            Tâche
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tasker
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Montant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Commission
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{payment.task}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.tasker}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.amount} €</td>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.commission} €</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(payment.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(payment.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    </div>
  )
}
