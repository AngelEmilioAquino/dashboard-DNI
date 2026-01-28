"use client"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Receipt,
  FileText,
  FolderOpen,
  Store,
  Bell,
  User,
  Settings,
  Users,
} from "lucide-react"

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ventas", label: "Ventas", icon: Receipt },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "reportes", label: "Reportes", icon: FileText },
  { id: "documentos", label: "Documentos", icon: FolderOpen },
]

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col bg-card rounded-3xl p-4 shadow-sm">
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Store className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground">DNI</span>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onItemClick(item.id)}
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
    </aside>
  )
}
