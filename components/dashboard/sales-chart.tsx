"use client"

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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { getVentasPorMes } from "@/lib/data"

const chartConfig = {
  total: {
    label: "Ventas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function SalesChart() {
  const data = getVentasPorMes()

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">Reporte de Ventas</CardTitle>
        <Select defaultValue="mensual">
          <SelectTrigger className="w-full sm:w-32 rounded-full border-0 bg-secondary">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="mensual">Mensual</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 sm:pt-0">
        <ChartContainer config={chartConfig} className="h-[220px] sm:h-[280px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              stroke="var(--muted-foreground)"
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              fontSize={10}
              stroke="var(--muted-foreground)"
              tickFormatter={formatCurrencyShort}
              width={45}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  formatter={(value) => [`$${Number(value).toLocaleString("es-DO")}`, "Ventas"]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#fillTotal)"
              dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
