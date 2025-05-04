import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sophie L.",
    avatar: "S",
    role: "Cliente",
    content:
      "J'ai trouvé un excellent bricoleur pour monter mes meubles. Service rapide et professionnel, je recommande !",
    rating: 5,
  },
  {
    name: "Thomas M.",
    avatar: "T",
    role: "Client",
    content:
      "Grâce à TaskMaster, j'ai pu faire nettoyer mon appartement avant un événement important. Le Tasker était ponctuel et efficace.",
    rating: 5,
  },
  {
    name: "Julie D.",
    avatar: "J",
    role: "Tasker",
    content:
      "Devenir Tasker m'a permis de compléter mes revenus tout en aidant les gens. La plateforme est intuitive et les paiements sont rapides.",
    rating: 4,
  },
  {
    name: "Marc B.",
    avatar: "M",
    role: "Client",
    content:
      "J'ai fait appel à un Tasker pour m'aider à déménager quelques meubles. Le service était impeccable et le prix très raisonnable.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gradient">
              Ce que disent nos utilisateurs
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Découvrez les expériences de nos clients et Taskers
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full card-hover-effect testimonial-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.avatar}`} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
