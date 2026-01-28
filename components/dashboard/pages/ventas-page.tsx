"use client"

import { useState } from "react"
import { useVentas } from "@/hooks/use-ventas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

export function VentasPage() {
  const {
    ventas,
    isLoading,
    refetch,
    sumaVentas,
    totalVentas,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
  } = useVentas()

  const [searchTerm, setSearchTerm] = useState("")

  const filteredVentas = ventas.filter((venta) => {
    const clienteNombre = venta.cliente_nombre?.toLowerCase() ?? ""
    const canal = venta.canal?.toLowerCase() ?? ""
    const term = searchTerm.toLowerCase()
    return (
      clienteNombre.includes(term) ||
      canal.includes(term) ||
      venta.venta_id.toString().includes(term)
    )
  })

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(amount)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-DO", { year: "numeric", month: "short", day: "numeric" })

  const getCanalBadgeColor = (canal: string) => {
    switch (canal.toLowerCase()) {
      case "web":
        return "bg-blue-100 text-blue-700"
      case "tienda":
        return "bg-green-100 text-green-700"
      case "kiosko":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // Función para descargar CSV

  const downloadCSV = () => {
    const headers = ["ID Venta", "Cliente", "Fecha", "Canal", "Moneda", "Total"]
    const rows = ventas.map((v) => [
      v.venta_id,
      v.cliente_nombre,
      formatDate(v.fecha),
      v.canal,
      v.moneda,
      v.total,
    ])
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `ventas_page_${page}.csv`)
    link.click()
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Total Ventas</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{formatCurrency(sumaVentas)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Transacciones</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{totalVentas}</p>
          </CardContent>
        </Card>
        <Card className="bg-card rounded-2xl border-0 shadow-sm sm:col-span-2 md:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Promedio por Venta</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {formatCurrency(totalVentas > 0 ? sumaVentas / totalVentas : 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card className="bg-card rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold">Todas las Ventas</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar ventas por canal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-48 md:w-64 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent h-9 w-9" onClick={refetch}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent h-9 w-9" onClick={downloadCSV}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Venta</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead className="hidden md:table-cell">Moneda</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVentas.map((venta) => (
                  <TableRow key={venta.venta_id}>
                    <TableCell className="font-medium">#{venta.venta_id}</TableCell>
                    <TableCell className="truncate max-w-[120px] sm:max-w-none">{venta.cliente_nombre}</TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(venta.fecha)}</TableCell>
                    <TableCell>
                      <Badge className={`${getCanalBadgeColor(venta.canal)} border-0 capitalize text-xs`}>
                        {venta.canal}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{venta.moneda}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(venta.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <span>
              {page} / {Math.ceil(totalCount / pageSize)}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= Math.ceil(totalCount / pageSize)}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-1"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
