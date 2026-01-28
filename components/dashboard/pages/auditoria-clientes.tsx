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
import { useAuditoriaClientes } from "@/hooks/use-auditoria-clientes"

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ec4899"]

export function AuditoriaClientePage() {
  const {
  clientesError,
  erroresPorTipo,
  erroresPorSegmento,
  loading: isLoading,
} = useAuditoriaClientes()

const erroresTipoData = useMemo(() => {
  return Object.entries(erroresPorTipo).map(([name, value]) => ({
    name,
    value,
  }))
}, [erroresPorTipo])

const erroresSegmentoData = useMemo(() => {
  return Object.entries(erroresPorSegmento).map(([segmento, total]) => ({
    segmento,
    total,
  }))
}, [erroresPorSegmento])

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
    <Card>
        <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">Nombre inválido</p>
        <p className="text-2xl font-bold">{erroresPorTipo.NOMBRE_NULO || 0}</p>
        </CardContent>
    </Card>

    <Card>
        <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">Ciudad inválida</p>
        <p className="text-2xl font-bold">{erroresPorTipo.CIUDAD_NULA || 0}</p>
        </CardContent>
    </Card>

    <Card>
        <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">Segmento inválido</p>
        <p className="text-2xl font-bold">{erroresPorTipo.SEGMENTO_NULO || 0}</p>
        </CardContent>
    </Card>

    <Card>
        <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">Fecha inválida</p>
        <p className="text-2xl font-bold">{erroresPorTipo.FECHA_INVALIDA || 0}</p>
        </CardContent>
    </Card>
    </div>


    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
            <CardTitle>Errores por Segmento</CardTitle>
        </CardHeader>

        <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={erroresSegmentoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segmento" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#1366f4" radius={[8, 8, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
        </Card>
    </div>

    <Card className="rounded-2xl border-0 shadow-sm">
    <CardHeader>
        <CardTitle>Detalle de Clientes con Error</CardTitle>
    </CardHeader>

    <CardContent className="overflow-x-auto">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Segmento</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead>Error</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {clientesError.map((c) => (
            <TableRow key={c.cliente_id ?? Math.random()}>
                <TableCell>{c.cliente_id ?? "—"}</TableCell>

                <TableCell className={!c.nombre || c.nombre === "NONE" ? "text-red-600 font-semibold" : ""}>
                {c.nombre ?? "NULO"}
                </TableCell>

                <TableCell className={!c.ciudad || c.ciudad === "NONE" ? "text-red-600 font-semibold" : ""}>
                {c.ciudad ?? "NULO"}
                </TableCell>

                <TableCell className={!c.segmento || c.segmento === "NONE" ? "text-red-600 font-semibold" : ""}>
                {c.segmento ?? "NULO"}
                </TableCell>

                <TableCell>
                {c.fecha_registro ?? <span className="text-red-600">Inválida</span>}
                </TableCell>

                <TableCell>
                <span className="px-2 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">
                    ERROR
                </span>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </CardContent>
    </Card>
  </div>
  )
}
