"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Receipt,
  Store,
  Users,
  Menu,
  Logs,
} from "lucide-react"
import { useState } from "react"

interface MobileNavProps {
  activeItem: string
  onItemClick: (item: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ventas", label: "Ventas", icon: Receipt },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "AuditoriaVentas", label: "Auditoria Ventas", icon: Logs },
  { id: "AuditoriaClientes", label: "Auditoria Clientes", icon: Logs },
]

export function MobileNav({ activeItem, onItemClick }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleItemClick = (item: string) => {
    onItemClick(item)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden rounded-xl bg-transparent">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
        <div className="flex h-full flex-col bg-card">
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">DNI</span>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
