"use client"

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
import { Button } from "@/components/ui/button"
import { getVentasRecientes } from "@/lib/data"

function getCanalBadgeVariant(canal: string) {
  switch (canal.toLowerCase()) {
    case "web":
      return "bg-chart-1/20 text-chart-1 border-0"
    case "tienda":
      return "bg-chart-2/20 text-chart-2 border-0"
    case "kiosko":
      return "bg-chart-4/20 text-chart-4 border-0"
    default:
      return "bg-muted text-muted-foreground border-0"
  }
}

export function RecentSales() {
  const ventasRecientes = getVentasRecientes()

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold">Ventas Recientes</CardTitle>
        <Button variant="outline" size="sm" className="rounded-full bg-transparent w-full sm:w-auto">
          Ver mas
        </Button>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium whitespace-nowrap text-xs sm:text-sm">ID Venta</TableHead>
                <TableHead className="text-muted-foreground font-medium whitespace-nowrap text-xs sm:text-sm">Cliente</TableHead>
                <TableHead className="text-muted-foreground font-medium whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">Canal</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium whitespace-nowrap text-xs sm:text-sm">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventasRecientes.map((venta) => (
                <TableRow key={venta.venta_id} className="border-0">
                  <TableCell className="font-medium text-xs sm:text-sm whitespace-nowrap">#{venta.venta_id}</TableCell>
                  <TableCell className="max-w-[100px] sm:max-w-[200px] truncate text-xs sm:text-sm">{venta.cliente_nombre}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className={`${getCanalBadgeVariant(venta.canal)} text-xs`}>
                      {venta.canal.charAt(0).toUpperCase() + venta.canal.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-xs sm:text-sm whitespace-nowrap">
                    ${venta.total.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
