import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Calendar, Star, ArrowRight } from "lucide-react"

// Données fictives pour la démonstration
const tasks = [
  {
    id: "task-1",
    title: "Nettoyage d'appartement",
    description: "Nettoyage complet d'un appartement de 60m²",
    category: "Ménage",
    location: "Paris, 75011",
    date: "2024-05-10T14:00:00",
    budget: 80,
    client: {
      id: "client-1",
      name: "Jean Dupont",
      rating: 4.7,
    },
  },
  {
    id: "task-2",
    title: "Montage de meuble",
    description: "Montage d'une armoire IKEA",
    category: "Bricolage",
    location: "Paris, 75015",
    date: "2024-05-12T10:00:00",
    budget: 50,
    client: {
      id: "client-2",
      name: "Sophie Martin",
      rating: 4.9,
    },
  },
  {
    id: "task-3",
    title: "Réparation robinet",
    description: "Réparation d'un robinet qui fuit dans la salle de bain",
    category: "Bricolage",
    location: "Paris, 75011",
    date: "2024-05-15T09:00:00",
    budget: 70,
    client: {
      id: "client-3",
      name: "Pierre Durand",
      rating: 4.5,
    },
  },
  {
    id: "task-4",
    title: "Aide au déménagement",
    description: "Besoin d'aide pour déplacer quelques meubles et cartons",
    category: "Déménagement",
    location: "Paris, 75020",
    date: "2024-05-18T10:00:00",
    budget: 100,
    client: {
      id: "client-1",
      name: "Jean Dupont",
      rating: 4.7,
    },
  },
  {
    id: "task-5",
    title: "Montage étagères",
    description: "Montage de 3 étagères murales",
    category: "Bricolage",
    location: "Paris, 75016",
    date: "2024-05-20T14:00:00",
    budget: 60,
    client: {
      id: "client-2",
      name: "Sophie Martin",
      rating: 4.9,
    },
  },
  {
    id: "task-6",
    title: "Tonte de pelouse",
    description: "Tonte d'une pelouse de 200m²",
    category: "Jardinage",
    location: "Paris, 75016",
    date: "2024-05-22T09:00:00",
    budget: 75,
    client: {
      id: "client-3",
      name: "Pierre Durand",
      rating: 4.5,
    },
  },
]

const categories = [
  "Ménage",
  "Bricolage",
  "Déménagement",
  "Jardinage",
  "Services personnels",
  "Courses",
  "Assistance administrative",
  "Informatique",
]

export default function TasksPage() {
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
        <section className="container py-8 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Filtres */}
            <div className="w-full md:w-1/4 space-y-6">
              <div className="rounded-lg border p-4">
                <h2 className="text-lg font-semibold mb-4">Filtres</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Recherche</h3>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input type="search" placeholder="Mot-clé" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Catégories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category}`} />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Budget</h3>
                    <div className="space-y-4">
                      <Slider defaultValue={[100]} max={200} step={10} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">0 €</span>
                        <span className="text-sm">200 €</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Localisation</h3>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input type="text" placeholder="Ville, code postal" className="pl-8" />
                    </div>
                  </div>

                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </div>

            {/* Liste des tâches */}
            <div className="w-full md:w-3/4 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tâches disponibles</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Trier par:</span>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option value="date">Date (plus récente)</option>
                    <option value="budget-high">Budget (plus élevé)</option>
                    <option value="budget-low">Budget (plus bas)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <Badge variant="outline" className="mt-1">
                              {task.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{task.budget} €</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{task.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{formatDate(task.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${task.client.name.charAt(0)}`}
                                alt={task.client.name}
                              />
                              <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-medium">{task.client.name}</p>
                              <div className="flex items-center text-yellow-500">
                                <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                                <span className="text-xs">{task.client.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/tasks/${task.id}`}>
                              <span className="sr-only">Voir les détails</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 py-4">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
