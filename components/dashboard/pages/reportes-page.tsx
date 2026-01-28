"use client"

import { useDashboard } from "@/hooks/use-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ec4899"]

export function ReportesPage() {
  const { 
    isLoading, 
    refetch, 
    stats, 
    getVentasPorCanal, 
    getVentasPorMes, 
    getClientesPorSegmento 
  } = useDashboard()

  const ventasPorCanal = getVentasPorCanal()
  const ventasPorMes = getVentasPorMes()
  const clientesPorSegmento = getClientesPorSegmento()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Reportes</h2>
          <p className="text-sm text-muted-foreground">Analisis detallado de ventas y clientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2 bg-transparent flex-1 sm:flex-none" onClick={refetch}>
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
          <Button className="rounded-xl gap-2 flex-1 sm:flex-none">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Ingresos</p>
              <p className="text-base sm:text-xl font-bold text-foreground truncate">{formatCurrencyShort(stats.totalVentas)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Clientes</p>
              <p className="text-base sm:text-xl font-bold text-foreground">{stats.totalClientes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Transacciones</p>
              <p className="text-base sm:text-xl font-bold text-foreground">{stats.totalTransacciones}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Promedio</p>
              <p className="text-base sm:text-xl font-bold text-foreground truncate">{formatCurrencyShort(stats.ventaPromedio)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Ventas por Mes */}
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Ventas por Mes</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 sm:pt-0">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ventasPorMes} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrencyShort(value)} width={50} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Ventas"]}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ventas por Canal */}
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Ventas por Canal</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 sm:pt-0">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ventasPorCanal} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="canal" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrencyShort(value)} width={50} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Total"]}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="total" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Clientes por Segmento */}
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Distribucion de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 sm:pt-0">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientesPorSegmento}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="segmento"
                  >
                    {clientesPorSegmento.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-2 sm:mt-4">
              {clientesPorSegmento.map((seg, index) => (
                <div key={seg.segmento} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs sm:text-sm text-muted-foreground">{seg.segmento}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transacciones por Canal */}
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Transacciones por Canal</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 sm:pt-0">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ventasPorCanal} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="canal" type="category" stroke="#9ca3af" width={60} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [value, "Transacciones"]}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="count" fill="#22c55e" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
