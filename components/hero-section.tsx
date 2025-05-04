import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Trouvez de l'aide pour vos tâches quotidiennes
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Confiez vos tâches à des experts locaux qualifiés. Ménage, bricolage, jardinage, montage de meubles et
                plus encore.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="De quelle aide avez-vous besoin ?"
                  className="w-full pl-8 bg-white dark:bg-gray-950"
                />
              </div>
              <Button type="submit" size="lg" className="btn-secondary-gradient">
                Rechercher
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/tasks/cleaning">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Ménage
                </Button>
              </Link>
              <Link href="/tasks/handyman">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Bricolage
                </Button>
              </Link>
              <Link href="/tasks/moving">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Déménagement
                </Button>
              </Link>
              <Link href="/tasks/gardening">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Jardinage
                </Button>
              </Link>
              <Link href="/tasks/furniture">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Montage de meubles
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Personne effectuant une tâche"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-xl"
              src="/images/hero-image.png"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
