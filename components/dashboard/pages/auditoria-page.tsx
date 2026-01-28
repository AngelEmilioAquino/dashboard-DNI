"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw} from "lucide-react"
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
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"
import { useVentasAuditoria } from "@/hooks/use-auditoria-ventas"

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ec4899"]

export function AuditoriaPage() {
  const {
  ventasError,
  erroresPorTipo,
  erroresPorCanal,
  loading: isLoading,
} = useVentasAuditoria()

const erroresTipoData = useMemo(() => {
  return Object.entries(erroresPorTipo).map(([name, value]) => ({
    name,
    value,
  }))
}, [erroresPorTipo])

const erroresCanalData = useMemo(() => {
  return Object.entries(erroresPorCanal).map(([canal, total]) => ({
    canal,
    total,
  }))
}, [erroresPorCanal])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
  <div className="space-y-4 sm:space-y-6">

    {/* Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Fechas inválidas</p>
          <p className="text-2xl font-bold">
            {erroresPorTipo.FECHA_INVALIDA || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Totales inválidos</p>
          <p className="text-2xl font-bold">
            {erroresPorTipo.TOTAL_INVALIDO || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Totales negativos</p>
          <p className="text-2xl font-bold">
            {erroresPorTipo.TOTAL_NEGATIVO || 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Cliente ID Nulo</p>
          <p className="text-2xl font-bold">
            {erroresPorTipo.CLIENTE_ID_NULO || 0}
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Errores por tipo */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Errores por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="h-65">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={erroresTipoData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
              >
                {erroresTipoData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Errores por canal */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Errores por Canal</CardTitle>
        </CardHeader>
        <CardContent className="h-65">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={erroresCanalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="canal" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Detalle de Ventas con Error</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Venta</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Moneda</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Error</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ventasError.map((v) => (
              <TableRow key={v.venta_id}>
                <TableCell className="font-medium">
                  {v.venta_id}
                </TableCell>

                <TableCell>
                  {v.cliente_id ?? (
                    <span className="text-red-500 font-semibold">NULO</span>
                  )}
                </TableCell>

                <TableCell>
                  {v.fecha ? v.fecha : (
                    <span className="text-red-500">Inválida</span>
                  )}
                </TableCell>

                <TableCell
                  className={
                    v.total < 0
                      ? "text-red-600 font-semibold"
                      : ""
                  }
                >
                  {v.total !== null
                    ? (v.total)
                    : "—"}
                </TableCell>

                <TableCell>{v.moneda}</TableCell>

                <TableCell>{v.canal}</TableCell>

                <TableCell>
                  <span className="px-2 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">
                    {v.error_motivo}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {ventasError.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No hay errores registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
  )
}
