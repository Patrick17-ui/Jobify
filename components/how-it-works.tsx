import { ClipboardList, Search, Calendar, Star } from "lucide-react"

const steps = [
  {
    title: "Décrivez votre tâche",
    description: "Indiquez ce dont vous avez besoin, quand et où",
    icon: ClipboardList,
  },
  {
    title: "Choisissez un Tasker",
    description: "Parcourez les profils, les avis et les tarifs",
    icon: Search,
  },
  {
    title: "Planifiez la tâche",
    description: "Réservez directement selon vos disponibilités",
    icon: Calendar,
  },
  {
    title: "Tâche accomplie",
    description: "Payez en toute sécurité et laissez un avis",
    icon: Star,
  },
]

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gradient">Comment ça marche</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Obtenez de l'aide en quelques étapes simples
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="mt-4 text-xl font-bold">
                {index + 1}. {step.title}
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
