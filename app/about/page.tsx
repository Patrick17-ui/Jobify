import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Users, Globe, Award, Heart, Shield } from "lucide-react"

const stats = [
  { value: "50K+", label: "Utilisateurs actifs" },
  { value: "100K+", label: "Tâches réalisées" },
  { value: "15+", label: "Catégories de services" },
  { value: "95%", label: "Clients satisfaits" },
]

const values = [
  {
    title: "Confiance",
    description: "Nous créons un environnement sûr et fiable pour tous nos utilisateurs",
    icon: Shield,
  },
  {
    title: "Communauté",
    description: "Nous connectons les personnes pour créer une communauté d'entraide",
    icon: Users,
  },
  {
    title: "Qualité",
    description: "Nous nous engageons à offrir des services de haute qualité",
    icon: Award,
  },
  {
    title: "Accessibilité",
    description: "Nous rendons les services accessibles à tous, partout",
    icon: Globe,
  },
  {
    title: "Bienveillance",
    description: "Nous encourageons le respect et la bienveillance entre tous les utilisateurs",
    icon: Heart,
  },
]

const team = [
  {
    name: "Jean Dupont",
    role: "CEO & Co-fondateur",
    bio: "Jean a fondé TaskMaster avec la vision de créer une plateforme qui connecte les personnes et facilite l'entraide au quotidien.",
    image: "/placeholder.svg?height=300&width=300&text=JD",
  },
  {
    name: "Marie Martin",
    role: "COO & Co-fondatrice",
    bio: "Marie supervise les opérations quotidiennes et s'assure que la plateforme offre la meilleure expérience possible aux utilisateurs.",
    image: "/placeholder.svg?height=300&width=300&text=MM",
  },
  {
    name: "Thomas Bernard",
    role: "CTO",
    bio: "Thomas dirige l'équipe technique et développe les fonctionnalités innovantes qui font de TaskMaster une plateforme de premier plan.",
    image: "/placeholder.svg?height=300&width=300&text=TB",
  },
]

export default function AboutPage() {
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  À propos de TaskMaster
                </h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Notre mission est de connecter les personnes pour faciliter l'entraide au quotidien
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre histoire</h2>
                <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  TaskMaster a été fondé en 2020 avec une vision simple : créer une plateforme qui connecte les
                  personnes ayant besoin d'aide pour des tâches quotidiennes avec des personnes compétentes et
                  disponibles pour les réaliser.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Tout a commencé lorsque nos fondateurs, Jean et Marie, ont réalisé qu'il était souvent difficile de
                  trouver de l'aide pour des tâches simples comme le montage de meubles, le nettoyage ou les petites
                  réparations. Ils ont alors imaginé une solution qui permettrait de mettre en relation les personnes
                  ayant besoin d'aide avec celles ayant les compétences nécessaires.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Aujourd'hui, TaskMaster est devenu une communauté dynamique où des milliers de personnes trouvent de
                  l'aide pour leurs tâches quotidiennes et où des Taskers peuvent mettre à profit leurs compétences pour
                  gagner un revenu supplémentaire.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="L'équipe TaskMaster"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  src="/placeholder.svg?height=550&width=550"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">TaskMaster en chiffres</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Notre impact depuis notre création
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos valeurs</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Les principes qui guident nos actions au quotidien
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <Card key={value.title} className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre équipe</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Les personnes qui font de TaskMaster une réalité
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                      src={member.image || "/placeholder.svg"}
                      height={300}
                      width={300}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rejoignez-nous</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Faites partie de notre communauté et contribuez à notre mission
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register?type=client">Trouver de l'aide</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground" asChild>
                  <Link href="/become-tasker">Devenir Tasker</Link>
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
