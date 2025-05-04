"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X, ArrowRight, Clock, Briefcase, Home, Wrench, Truck, Paintbrush } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Données fictives pour la démonstration
const recentSearches = ["nettoyage appartement", "montage meuble", "déménagement", "jardinage"]

const popularCategories = [
  { name: "Ménage", icon: Home, href: "/categories/cleaning" },
  { name: "Bricolage", icon: Wrench, href: "/categories/handyman" },
  { name: "Déménagement", icon: Truck, href: "/categories/moving" },
  { name: "Jardinage", icon: Paintbrush, href: "/categories/gardening" },
]

const popularTasks = [
  { title: "Nettoyage d'appartement", category: "Ménage", href: "/tasks/task-1" },
  { title: "Montage de meuble", category: "Bricolage", href: "/tasks/task-2" },
  { title: "Aide au déménagement", category: "Déménagement", href: "/tasks/task-4" },
  { title: "Tonte de pelouse", category: "Jardinage", href: "/tasks/task-6" },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isMobile?: boolean
}

export function SearchDialog({ open, onOpenChange, isMobile = false }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Fermer avec Escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onOpenChange(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Pour mobile, on utilise un Dialog standard
  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rechercher</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des tâches..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button type="submit" onClick={handleSearch}>
              Rechercher
            </Button>
          </div>
          <div className="space-y-4">
            {recentSearches.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recherches récentes</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setSearchQuery(search)
                        router.push(`/search?q=${encodeURIComponent(search)}`)
                        onOpenChange(false)
                      }}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Catégories populaires</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      router.push(category.href)
                      onOpenChange(false)
                    }}
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Pour desktop, on utilise CommandDialog pour une expérience plus riche
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput
          placeholder="Rechercher des tâches..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={handleKeyDown}
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        {searchQuery && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSearchQuery("")} type="button">
            <X className="h-4 w-4" />
            <span className="sr-only">Effacer la recherche</span>
          </Button>
        )}
      </div>
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        {recentSearches.length > 0 && (
          <>
            <CommandGroup heading="Recherches récentes">
              {recentSearches.map((search) => (
                <CommandItem
                  key={search}
                  onSelect={() => {
                    router.push(`/search?q=${encodeURIComponent(search)}`)
                    onOpenChange(false)
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{search}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        <CommandGroup heading="Catégories populaires">
          {popularCategories.map((category) => (
            <CommandItem
              key={category.name}
              onSelect={() => {
                router.push(category.href)
                onOpenChange(false)
              }}
            >
              <category.icon className="mr-2 h-4 w-4" />
              <span>{category.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tâches populaires">
          {popularTasks.map((task) => (
            <CommandItem
              key={task.title}
              onSelect={() => {
                router.push(task.href)
                onOpenChange(false)
              }}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              <span>{task.title}</span>
              <Badge variant="outline" className="ml-auto">
                {task.category}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem
            onSelect={() => {
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                onOpenChange(false)
              }
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Rechercher "{searchQuery}"</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
