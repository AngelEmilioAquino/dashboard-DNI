"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { getVentasPorCanal } from "@/lib/data"

const chartConfig = {
  total: {
    label: "Ventas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function AnalyticsChart() {
  const data = getVentasPorCanal().map(item => ({
    ...item,
    canal: item.canal.charAt(0).toUpperCase() + item.canal.slice(1)
  }))

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="p-4 sm:p-6 sm:pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">Analisis por Canal</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 sm:pt-0">
        <ChartContainer config={chartConfig} className="h-[160px] sm:h-[200px] w-full">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="canal"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              fontSize={10}
              stroke="var(--muted-foreground)"
              tickFormatter={formatCurrencyShort}
              width={40}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`$${Number(value).toLocaleString("es-DO")}`, "Ventas"]}
                />
              }
            />
            <Bar
              dataKey="total"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
