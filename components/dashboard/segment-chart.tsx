"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart, Label } from "recharts"
import { getClientesPorSegmento, getTotalClientes } from "@/lib/data"

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]

const chartConfig = {
  Individual: {
    label: "Individual",
    color: "var(--chart-1)",
  },
  Retail: {
    label: "Retail",
    color: "var(--chart-2)",
  },
  Corporativo: {
    label: "Corporativo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function SegmentChart() {
  const data = getClientesPorSegmento()
  const totalClientes = getTotalClientes()

  // Calculate percentage for the main segment
  const mainSegment = data.reduce((max, item) => 
    item.count > max.count ? item : max, data[0])
  const mainPercentage = Math.round((mainSegment.count / totalClientes) * 100)

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="p-4 sm:p-6 sm:pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">Segmentos de Clientes</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 sm:pt-0">
        <ChartContainer config={chartConfig} className="mx-auto h-[160px] sm:h-[200px] w-full">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="segmento"
              innerRadius={45}
              outerRadius={65}
              strokeWidth={4}
              stroke="var(--card)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.segmento}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl sm:text-3xl font-bold"
                        >
                          {mainPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground text-[10px] sm:text-xs"
                        >
                          {mainSegment.segmento}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-2 sm:mt-4 flex flex-wrap justify-center gap-3 sm:gap-6">
          {data.map((item, index) => (
            <div key={item.segmento} className="flex items-center gap-2">
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs sm:text-sm text-muted-foreground">{item.segmento}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
