"use client"

import { useState, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useVentas } from "@/hooks/use-ventas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RefreshCw } from "lucide-react"

const chartConfig = {
  total: {
    label: "Ventas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type Periodo = "mes" | "anio"

function agruparVentas(
  ventas: any[],
  periodo: Periodo
) {
  const map = new Map<string, number>()

  ventas.forEach((v) => {
    const date = new Date(v.fecha)
    let key = ""

    if (periodo === "mes") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    } else {
      key = `${date.getFullYear()}`
    }

    map.set(key, (map.get(key) ?? 0) + v.total)
  })

  return Array.from(map.entries())
    .map(([periodo, total]) => ({
      periodo,
      total,
    }))
    .sort((a, b) => a.periodo.localeCompare(b.periodo))
}

export function SalesChart() {
  const { ventasStats, isLoading } = useVentas()
  const [periodo, setPeriodo] = useState<Periodo>("mes")

  const data = useMemo(() => {
  return agruparVentas(ventasStats, periodo).map((d) => ({
    label: d.periodo,
    total: d.total,
  }))
}, [ventasStats, periodo])

  const formatCurrencyShort = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`
    return `$${value}`
  }

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">
          <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">
          Reporte de Ventas
        </CardTitle>

        <Select value={periodo} onValueChange={(v) => setPeriodo(v as Periodo)}>
          <SelectTrigger className="w-full sm:w-32 rounded-full border-0 bg-secondary">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mes">Mensual</SelectItem>
            <SelectItem value="anio">Anual</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-2 sm:p-6 sm:pt-0">
        <ChartContainer config={chartConfig} className="h-[220px] sm:h-[280px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              fontSize={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={formatCurrencyShort}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `$${Number(value).toLocaleString("es-DO")}`,
                    "Ventas",
                  ]}
                />
              }
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--chart-1)"
              fill="url(#fillTotal)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
