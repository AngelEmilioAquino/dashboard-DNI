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
import { useVentas } from "@/hooks/use-ventas"
import { VentasPagination } from "../ui/VentasPagination"
import { RefreshCw } from "lucide-react"

function getCanalBadgeVariant(canal: string) {
  switch (canal.toLowerCase()) {
    case "web":
      return "bg-chart-1/20 text-chart-1"
    case "tienda":
      return "bg-chart-2/20 text-chart-2"
    case "kiosko":
      return "bg-chart-4/20 text-chart-4"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function RecentSales() {
  const {
    ventas,
    isLoading,
    page,
    setPage,
    pageSize,
    totalCount,
  } = useVentas(1, 5)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="p-4 sm:p-6 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold">
          Ventas Recientes
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Canal</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {ventas.map((venta) => (
                  <TableRow key={venta.venta_id}>
                    <TableCell>#{venta.venta_id}</TableCell>
                    <TableCell className="truncate max-w-[160px]">
                      {venta.cliente_nombre}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={getCanalBadgeVariant(venta.canal)}>
                        {venta.canal}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${venta.total.toLocaleString("es-DO")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <VentasPagination
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
