"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Calendar, DollarSign, Star, MessageSquare, ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Données fictives pour la démonstration
const tasksData = [
  {
    id: "task-1",
    title: "Nettoyage d'appartement",
    description:
      "J'ai besoin d'un nettoyage complet de mon appartement de 60m². Cela comprend le nettoyage de la cuisine, de la salle de bain, des toilettes, du salon et de la chambre. Je fournirai tous les produits de nettoyage nécessaires. L'appartement est situé au 3ème étage avec ascenseur.",
    category: "Ménage",
    location: "Paris, 75011",
    date: "2024-05-10T14:00:00",
    budget: 80,
    client: {
      id: "client-1",
      name: "Jean Dupont",
      rating: 4.7,
      tasksPosted: 12,
      memberSince: "Janvier 2023",
      avatar: "/placeholder.svg?height=80&width=80&text=JD",
    },
  },
  {
    id: "task-2",
    title: "Montage de meuble",
    description:
      "J'ai acheté une armoire IKEA (modèle PAX) et j'ai besoin d'aide pour la monter. Les dimensions sont de 150x60x236 cm. J'ai tous les outils nécessaires. L'armoire est déjà dans mon appartement, il ne reste plus qu'à la monter.",
    category: "Bricolage",
    location: "Paris, 75015",
    date: "2024-05-12T10:00:00",
    budget: 50,
    client: {
      id: "client-2",
      name: "Sophie Martin",
      rating: 4.9,
      tasksPosted: 8,
      memberSince: "Mars 2023",
      avatar: "/placeholder.svg?height=80&width=80&text=SM",
    },
  },
  {
    id: "task-3",
    title: "Réparation robinet",
    description:
      "Le robinet de ma salle de bain fuit. J'ai besoin d'un plombier pour le réparer ou le remplacer si nécessaire. Le robinet est un mitigeur classique. La fuite se situe au niveau du joint entre le robinet et l'évier.",
    category: "Bricolage",
    location: "Paris, 75011",
    date: "2024-05-15T09:00:00",
    budget: 70,
    client: {
      id: "client-3",
      name: "Pierre Durand",
      rating: 4.5,
      tasksPosted: 5,
      memberSince: "Juin 2023",
      avatar: "/placeholder.svg?height=80&width=80&text=PD",
    },
  },
]

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = params.id as string
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Trouver la tâche correspondante
  const task = tasksData.find((t) => t.id === taskId) || tasksData[0]

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

  const handleSubmitOffer = async () => {
    if (!message.trim()) {
      toast({
        title: "Message requis",
        description: "Veuillez écrire un message pour accompagner votre offre",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulation d'une requête d'envoi d'offre
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Offre envoyée",
        description: "Votre offre a été envoyée avec succès",
      })

      setMessage("")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre offre",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">S'inscrire</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <Link href="/tasks" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux tâches
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Détails de la tâche */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{task.title}</h1>
                  <Badge variant="outline" className="text-base">
                    {task.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Disponible
                  </Badge>
                  <span className="text-sm text-muted-foreground">Publiée il y a 2 jours</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{task.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Détails</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Localisation</p>
                        <p className="text-sm text-muted-foreground">{task.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Date et heure</p>
                        <p className="text-sm text-muted-foreground">{formatDate(task.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Budget</p>
                        <p className="text-sm text-muted-foreground">{task.budget} €</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Durée estimée</p>
                        <p className="text-sm text-muted-foreground">2-3 heures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={task.client.avatar || "/placeholder.svg"} alt={task.client.name} />
                      <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{task.client.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="mr-1 h-4 w-4 fill-yellow-500" />
                        <span>{task.client.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Membre depuis:</span> {task.client.memberSince}
                    </p>
                    <p>
                      <span className="font-medium">Tâches publiées:</span> {task.client.tasksPosted}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faire une offre</CardTitle>
                  <CardDescription>Proposez vos services pour cette tâche</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Budget proposé</p>
                    <p className="text-2xl font-bold">{task.budget} €</p>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-medium">
                      Votre message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Présentez-vous et expliquez pourquoi vous êtes la personne idéale pour cette tâche..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button className="w-full" onClick={handleSubmitOffer} disabled={isLoading}>
                    {isLoading ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Envoyer mon offre
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contacter le client
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
