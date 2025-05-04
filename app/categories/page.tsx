import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import {
  Briefcase,
  Home,
  Truck,
  Paintbrush,
  Wrench,
  Scissors,
  ShoppingBag,
  Laptop,
  Utensils,
  Car,
  BookOpen,
  Camera,
  Music,
  Heart,
  Baby,
} from "lucide-react"

const categories = [
  {
    title: "Ménage",
    icon: Home,
    description: "Nettoyage de maison, lessive, repassage",
    href: "/categories/cleaning",
    taskCount: 42,
  },
  {
    title: "Bricolage",
    icon: Wrench,
    description: "Petites réparations, montage, installation",
    href: "/categories/handyman",
    taskCount: 38,
  },
  {
    title: "Déménagement",
    icon: Truck,
    description: "Aide au déménagement, transport d'objets",
    href: "/categories/moving",
    taskCount: 25,
  },
  {
    title: "Jardinage",
    icon: Paintbrush,
    description: "Entretien de jardin, tonte de pelouse",
    href: "/categories/gardening",
    taskCount: 19,
  },
  {
    title: "Services personnels",
    icon: Scissors,
    description: "Coiffure, manucure, massage",
    href: "/categories/personal",
    taskCount: 31,
  },
  {
    title: "Courses",
    icon: ShoppingBag,
    description: "Livraison de courses, achats spécifiques",
    href: "/categories/shopping",
    taskCount: 27,
  },
  {
    title: "Assistance administrative",
    icon: Briefcase,
    description: "Aide aux démarches, organisation",
    href: "/categories/admin",
    taskCount: 15,
  },
  {
    title: "Informatique",
    icon: Laptop,
    description: "Dépannage, installation, formation",
    href: "/categories/tech",
    taskCount: 22,
  },
  {
    title: "Cuisine",
    icon: Utensils,
    description: "Chef à domicile, cours de cuisine",
    href: "/categories/cooking",
    taskCount: 18,
  },
  {
    title: "Transport",
    icon: Car,
    description: "Covoiturage, livraison",
    href: "/categories/transport",
    taskCount: 24,
  },
  {
    title: "Cours particuliers",
    icon: BookOpen,
    description: "Soutien scolaire, langues, musique",
    href: "/categories/lessons",
    taskCount: 20,
  },
  {
    title: "Photographie",
    icon: Camera,
    description: "Portraits, événements, retouche",
    href: "/categories/photography",
    taskCount: 12,
  },
  {
    title: "Musique & Événements",
    icon: Music,
    description: "DJ, musiciens, animation",
    href: "/categories/events",
    taskCount: 9,
  },
  {
    title: "Santé & Bien-être",
    icon: Heart,
    description: "Coaching, yoga, méditation",
    href: "/categories/wellness",
    taskCount: 16,
  },
  {
    title: "Garde d'enfants",
    icon: Baby,
    description: "Babysitting, aide aux devoirs",
    href: "/categories/childcare",
    taskCount: 29,
  },
]

export default function CategoriesPage() {
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
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Catégories de services</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Découvrez tous les services proposés par nos Taskers qualifiés
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{category.description}</p>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium">{category.taskCount}</span> tâches disponibles
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-center">
                    <span className="text-sm font-medium text-primary">Voir les tâches</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
