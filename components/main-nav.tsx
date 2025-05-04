"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { useIsMobile } from "@/hooks/use-mobile"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block text-xl text-gradient">TaskMaster</span>
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileNav setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/tasks"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
        >
          Tâches
        </Link>
        <Link
          href="/categories"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
        >
          Catégories
        </Link>
        <Link
          href="/become-tasker"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
        >
          Devenir Tasker
        </Link>
        <Link
          href="/about"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
        >
          À propos
        </Link>
      </nav>
      <div className="flex">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSearchOpen(true)}
          aria-label="Rechercher"
          className="relative"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Rechercher</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} isMobile={isMobile} />
      </div>
    </div>
  )
}

function MobileNav({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-3 mt-4">
      <Link href="/" className="text-xl font-bold text-gradient" onClick={() => setIsOpen(false)}>
        TaskMaster
      </Link>
      <Link
        href="/tasks"
        className="text-foreground/70 transition-colors hover:text-foreground"
        onClick={() => setIsOpen(false)}
      >
        Tâches
      </Link>
      <Link
        href="/categories"
        className="text-foreground/70 transition-colors hover:text-foreground"
        onClick={() => setIsOpen(false)}
      >
        Catégories
      </Link>
      <Link
        href="/become-tasker"
        className="text-foreground/70 transition-colors hover:text-foreground"
        onClick={() => setIsOpen(false)}
      >
        Devenir Tasker
      </Link>
      <Link
        href="/about"
        className="text-foreground/70 transition-colors hover:text-foreground"
        onClick={() => setIsOpen(false)}
      >
        À propos
      </Link>
      <div className="flex flex-col space-y-2 pt-4 border-t">
        <Button
          variant="outline"
          className="justify-start"
          onClick={() => {
            setSearchOpen(true)
            setIsOpen(false)
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Rechercher
        </Button>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} isMobile={true} />
        <Link href="/login" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" className="w-full justify-start">
            Connexion
          </Button>
        </Link>
        <Link href="/register" onClick={() => setIsOpen(false)}>
          <Button className="w-full btn-gradient">S'inscrire</Button>
        </Link>
      </div>
    </div>
  )
}
