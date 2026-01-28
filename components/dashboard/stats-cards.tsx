"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { getTotalVentas, getTotalClientes, ventas } from "@/lib/data"
import { useVentas } from "@/hooks/use-ventas"
import { useClientes } from "@/hooks/use-clientes"

interface StatCardProps {
  title: string
  value: string
  percentage: number
  icon: React.ReactNode
  iconBg: string
  trend: "up" | "down"
}

function StatCard({ title, value, percentage, icon, iconBg, trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-sm">
      <CardContent className="flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl flex-shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-lg sm:text-2xl font-bold text-foreground truncate">{value}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            trend === "up" 
              ? "bg-accent/20 text-accent-foreground" 
              : "bg-destructive/20 text-destructive"
          }`}>
            <TrendingUp className={`h-3 w-3 ${trend === "down" ? "rotate-180" : ""}`} />
            {percentage}%
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const {ventas,sumaVentas,totalVentas} = useVentas()
  const {totalClientes} = useClientes()

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
      <StatCard
        title="Total Ventas"
        value={sumaVentas.toLocaleString("es-DO", { style: "currency", currency: "DOP" })}
        percentage={80}
        icon={<DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
        iconBg="bg-primary/10"
        trend="up"
      />
      <StatCard
        title="Total Clientes"
        value={`${totalClientes}+`}
        percentage={30}
        icon={<Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />}
        iconBg="bg-accent/20"
        trend="up"
      />
      <StatCard
        title="Transacciones"
        value={`${totalVentas}+`}
        percentage={20}
        icon={<ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-chart-3" />}
        iconBg="bg-chart-3/10"
        trend="up"
      />
    </div>
  )
}
