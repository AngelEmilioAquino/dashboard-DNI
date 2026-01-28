"use client"
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
    </header>
  )
}
