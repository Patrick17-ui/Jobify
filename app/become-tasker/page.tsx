import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CheckCircle, DollarSign, Clock, Star, Briefcase, Shield, Users } from "lucide-react"

const benefits = [
  {
    title: "Flexibilité totale",
    description: "Travaillez quand vous voulez, où vous voulez, selon vos disponibilités",
    icon: Clock,
  },
  {
    title: "Revenus complémentaires",
    description: "Gagnez de l'argent en fonction de vos compétences et de votre temps disponible",
    icon: DollarSign,
  },
  {
    title: "Variété de tâches",
    description: "Choisissez les tâches qui correspondent à vos compétences et à vos centres d'intérêt",
    icon: Briefcase,
  },
  {
    title: "Paiements sécurisés",
    description: "Recevez vos paiements de manière sécurisée directement sur votre compte",
    icon: Shield,
  },
  {
    title: "Développez votre réputation",
    description: "Construisez votre profil avec des avis positifs et augmentez vos opportunités",
    icon: Star,
  },
  {
    title: "Rencontrez des gens",
    description: "Élargissez votre réseau en aidant des personnes dans votre communauté",
    icon: Users,
  },
]

const popularCategories = [
  { name: "Ménage", count: 42, href: "/categories/cleaning" },
  { name: "Bricolage", count: 38, href: "/categories/handyman" },
  { name: "Déménagement", count: 25, href: "/categories/moving" },
  { name: "Jardinage", count: 19, href: "/categories/gardening" },
  { name: "Garde d'enfants", count: 29, href: "/categories/childcare" },
  { name: "Informatique", count: 22, href: "/categories/tech" },
]

const testimonials = [
  {
    quote:
      "Devenir Tasker m'a permis de compléter mes revenus tout en gardant la flexibilité dont j'ai besoin pour mes études. Je choisis mes horaires et les tâches qui m'intéressent.",
    name: "Marie D.",
    role: "Étudiante & Tasker",
    rating: 4.9,
  },
  {
    quote:
      "J'ai commencé comme Tasker à temps partiel et maintenant c'est devenu mon activité principale. Les clients sont satisfaits de mon travail et me recommandent régulièrement.",
    name: "Thomas L.",
    role: "Tasker professionnel",
    rating: 5.0,
  },
  {
    quote:
      "La plateforme est très intuitive et me permet de trouver facilement des tâches près de chez moi. Les paiements sont rapides et le support est toujours disponible.",
    name: "Sophie M.",
    role: "Tasker depuis 2 ans",
    rating: 4.8,
  },
]

const steps = [
  {
    number: 1,
    title: "Créez votre profil",
    description: "Inscrivez-vous et complétez votre profil avec vos compétences et votre expérience",
  },
  {
    number: 2,
    title: "Choisissez vos services",
    description: "Sélectionnez les catégories de services que vous souhaitez proposer",
  },
  {
    number: 3,
    title: "Définissez vos tarifs",
    description: "Fixez vos tarifs en fonction de vos compétences et de la demande",
  },
  {
    number: 4,
    title: "Trouvez des tâches",
    description: "Parcourez les tâches disponibles ou recevez des demandes directes",
  },
  {
    number: 5,
    title: "Réalisez les tâches",
    description: "Effectuez les tâches avec professionnalisme et dans les délais",
  },
  {
    number: 6,
    title: "Recevez vos paiements",
    description: "Les paiements sont automatiquement versés sur votre compte après chaque tâche",
  },
]

export default function BecomeTaskerPage() {
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Devenez Tasker et gagnez de l'argent à votre rythme
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Utilisez vos compétences pour aider les autres et générer des revenus supplémentaires. Vous
                    choisissez quand, où et comment vous travaillez.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register?type=tasker">Devenir Tasker</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    En savoir plus
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>Inscription gratuite</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>Flexibilité totale</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>Paiements sécurisés</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Tasker en action"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  src="/placeholder.svg?height=550&width=550"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pourquoi devenir Tasker ?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Découvrez les avantages de rejoindre notre communauté de Taskers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Catégories populaires</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Les services les plus demandés par nos clients
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-6">
              {popularCategories.map((category) => (
                <Link key={category.name} href={category.href}>
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {category.count} tâches disponibles
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/categories">Voir toutes les catégories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comment ça marche</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Suivez ces étapes simples pour commencer à gagner de l'argent en tant que Tasker
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <span className="text-xl font-bold">{step.number}</span>
                  </div>
                  <div className="mt-4 text-xl font-bold">{step.title}</div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/register?type=tasker">Commencer maintenant</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ce que disent nos Taskers</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Découvrez les témoignages de personnes qui ont rejoint notre communauté
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(testimonial.rating) ? "fill-yellow-500" : "fill-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">{testimonial.rating.toFixed(1)}</span>
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Prêt à commencer ?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rejoignez notre communauté de Taskers et commencez à gagner de l'argent dès aujourd'hui
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register?type=tasker">Devenir Tasker</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground">
                  <Link href="/tasks">Explorer les tâches</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Questions fréquentes</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Tout ce que vous devez savoir pour devenir Tasker
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Card>
                <CardHeader>
                  <CardTitle>Comment puis-je m'inscrire en tant que Tasker ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    L'inscription est simple et gratuite. Cliquez sur "Devenir Tasker", créez votre compte, complétez
                    votre profil avec vos compétences et vos disponibilités, et vous pourrez commencer à chercher des
                    tâches.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Combien puis-je gagner en tant que Tasker ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Vos revenus dépendent de vos compétences, de votre disponibilité et des tâches que vous choisissez.
                    Certains Taskers gagnent un complément de revenu, tandis que d'autres en font leur activité
                    principale. Vous fixez vos propres tarifs en fonction de votre expertise.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comment sont gérés les paiements ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Les clients paient via la plateforme, et l'argent est transféré sur votre compte une fois la tâche
                    terminée et validée. Nous prélevons une commission de 15% sur chaque transaction pour maintenir la
                    plateforme et vous offrir une protection.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dois-je payer pour m'inscrire ou utiliser la plateforme ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Non, l'inscription est totalement gratuite. Nous ne prélevons qu'une commission sur les tâches
                    réalisées. Il n'y a pas de frais d'abonnement ou de frais cachés.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comment puis-je augmenter mes chances d'être choisi pour des tâches ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Complétez votre profil avec des informations détaillées, ajoutez une photo professionnelle, mettez
                    en avant vos compétences et votre expérience, et collectez des avis positifs. Répondez rapidement
                    aux demandes et maintenez une communication claire avec les clients.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
