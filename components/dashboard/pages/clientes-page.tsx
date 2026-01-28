"use client"

import { useClientes } from "@/hooks/use-clientes"
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
import { Search, Filter, Download, RefreshCw, UserPlus } from "lucide-react"
import { useState } from "react"

export function ClientesPage() {
  const { clientes, isLoading, refetch, totalClientes, getClientesPorSegmento, getClientesPorCiudad } = useClientes()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.segmento.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-DO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getSegmentoBadgeColor = (segmento: string) => {
    switch (segmento.toLowerCase()) {
      case "corporativo":
        return "bg-purple-100 text-purple-700"
      case "retail":
        return "bg-blue-100 text-blue-700"
      case "individual":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const segmentos = getClientesPorSegmento()
  const ciudades = getClientesPorCiudad()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card className="bg-card rounded-2xl border-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-muted-foreground">Total Clientes</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{totalClientes}</p>
          </CardContent>
        </Card>
        {segmentos.slice(0, 3).map((seg) => (
          <Card key={seg.segmento} className="bg-card rounded-2xl border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{seg.segmento}</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{seg.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card className="bg-card rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold">Todos los Clientes</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-48 md:w-64 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent h-9 w-9" onClick={refetch}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="rounded-xl gap-2 h-9 px-3 hidden sm:flex">
                <UserPlus className="h-4 w-4" />
                <span className="hidden md:inline">Nuevo</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">ID</TableHead>
                  <TableHead className="whitespace-nowrap">Nombre</TableHead>
                  <TableHead className="whitespace-nowrap hidden sm:table-cell">Ciudad</TableHead>
                  <TableHead className="whitespace-nowrap">Segmento</TableHead>
                  <TableHead className="whitespace-nowrap hidden md:table-cell">Fecha Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.cliente_id}>
                    <TableCell className="font-medium whitespace-nowrap">#{cliente.cliente_id}</TableCell>
                    <TableCell className="max-w-[120px] sm:max-w-none truncate">{cliente.nombre}</TableCell>
                    <TableCell className="hidden sm:table-cell whitespace-nowrap">{cliente.ciudad}</TableCell>
                    <TableCell>
                      <Badge className={`${getSegmentoBadgeColor(cliente.segmento)} border-0 text-xs`}>
                        {cliente.segmento}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">{formatDate(cliente.fecha_registro)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ciudades Card */}
      <Card className="bg-card rounded-2xl border-0 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold">Clientes por Ciudad</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {ciudades.map((ciudad) => (
              <div
                key={ciudad.ciudad}
                className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2 sm:px-4"
              >
                <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[100px] sm:max-w-none">{ciudad.ciudad}</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  {ciudad.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
