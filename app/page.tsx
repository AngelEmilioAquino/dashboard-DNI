"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { DashboardHome } from "@/components/dashboard/pages/dashboard-home"
import { VentasPage } from "@/components/dashboard/pages/ventas-page"
import { ClientesPage } from "@/components/dashboard/pages/clientes-page"
import { AuditoriaPage } from "@/components/dashboard/pages/auditoria-page"
import { AuditoriaClientePage } from "@/components/dashboard/pages/auditoria-clientes"

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  ventas: "Ventas",
  clientes: "Clientes",
  AuditoriaVentas: "Auditoria de Ventas",
  AuditoriaClientes: "Auditoria de Clientes",
}

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("dashboard")

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardHome />
      case "ventas":
        return <VentasPage />
      case "clientes":
        return <ClientesPage />
      case "AuditoriaVentas":
        return <AuditoriaPage />
      case "AuditoriaClientes":
        return <AuditoriaClientePage />
      default:
        return (
          <div className="flex items-center justify-center h-64 rounded-2xl bg-card text-muted-foreground">
            <p>Seccion en desarrollo: {activeItem}</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6">
      <div className="mx-auto flex max-w-[1600px] gap-4 md:gap-6">
        {/* Sidebar - hidden on mobile/tablet */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
          <Header 
            activeItem={activeItem} 
            onItemClick={setActiveItem} 
            title={pageTitles[activeItem] || "Dashboard"}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
