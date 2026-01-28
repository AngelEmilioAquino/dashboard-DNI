"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/dashboard/mobile-nav"

interface HeaderProps {
  activeItem: string
  onItemClick: (item: string) => void
  title?: string
}

export function Header({ activeItem, onItemClick, title = "Dashboard" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        <MobileNav activeItem={activeItem} onItemClick={onItemClick} />
        <h1 className="text-lg font-bold text-foreground sm:text-2xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - hidden on mobile, visible from sm */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-40 rounded-full bg-secondary pl-10 border-0 md:w-64"
          />
        </div>

        {/* Search button for mobile */}
        <button 
          type="button" 
          className="relative rounded-full bg-primary p-2 text-primary-foreground shadow-md transition-transform hover:scale-105 sm:p-2.5"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
