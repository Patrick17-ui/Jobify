import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Briefcase, Home, Truck, Paintbrush, Wrench, Scissors, ShoppingBag, Laptop } from "lucide-react"

const categories = [
  {
    title: "Ménage",
    icon: Home,
    description: "Nettoyage de maison, lessive, repassage",
    href: "/categories/cleaning",
  },
  {
    title: "Bricolage",
    icon: Wrench,
    description: "Petites réparations, montage, installation",
    href: "/categories/handyman",
  },
  {
    title: "Déménagement",
    icon: Truck,
    description: "Aide au déménagement, transport d'objets",
    href: "/categories/moving",
  },
  {
    title: "Jardinage",
    icon: Paintbrush,
    description: "Entretien de jardin, tonte de pelouse",
    href: "/categories/gardening",
  },
  {
    title: "Services personnels",
    icon: Scissors,
    description: "Coiffure, manucure, massage",
    href: "/categories/personal",
  },
  {
    title: "Courses",
    icon: ShoppingBag,
    description: "Livraison de courses, achats spécifiques",
    href: "/categories/shopping",
  },
  {
    title: "Assistance administrative",
    icon: Briefcase,
    description: "Aide aux démarches, organisation",
    href: "/categories/admin",
  },
  {
    title: "Informatique",
    icon: Laptop,
    description: "Dépannage, installation, formation",
    href: "/categories/tech",
  },
]

export function CategorySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gradient">Catégories de services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Découvrez tous les services proposés par nos Taskers qualifiés
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="h-full transition-all hover:shadow-md card-hover-effect category-card">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 mb-4 text-primary bg-primary/10 rounded-full flex items-center justify-center">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{category.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-center">
                  <span className="text-sm font-medium text-primary">Voir les tâches</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
