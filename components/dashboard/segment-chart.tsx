"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart, Label } from "recharts"
import { useClientes } from "@/hooks/use-clientes"

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
  PYME: {
    label: "PYME",
    color: "var(--chart-4)",
  }
} satisfies ChartConfig

export function SegmentChart() {
  const { clientesPorSegmento, totalClientes } = useClientes()

  // Calculate percentage for the main segment
  const mainSegment = clientesPorSegmento.reduce((max, item) => 
    item.count > max.count ? item : max, clientesPorSegmento[0])

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
              data={clientesPorSegmento}
              dataKey="count"
              nameKey="segmento"
              innerRadius={45}
              outerRadius={65}
              strokeWidth={4}
              stroke="var(--card)"
            >
              {clientesPorSegmento.map((entry, index) => (
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
                          dy="-4"
                          className="fill-foreground text-md font-bold"
                        >
                          Conteo de
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          dy="18"
                          className="fill-muted-foreground text-[10px] sm:text-xs font-medium"
                        >
                          Segmento
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
          {clientesPorSegmento.map((item, index) => (
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
