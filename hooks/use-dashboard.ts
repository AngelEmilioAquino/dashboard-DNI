"use client"

import { useClientes } from "./use-clientes"
import { useVentas } from "./use-ventas"

export function useDashboard() {
  const clientesData = useClientes()
  const ventasData = useVentas()

  const isLoading = clientesData.isLoading || ventasData.isLoading
  const error = clientesData.error || ventasData.error

  const stats = {
    totalVentas: ventasData.sumaVentas,
    totalClientes: clientesData.totalClientes,
    totalTransacciones: ventasData.totalVentas,
    ventaPromedio: ventasData.totalVentas > 0 
      ? ventasData.sumaVentas / ventasData.totalVentas 
      : 0,
  }

  const refetch = () => {
    clientesData.refetch()
    ventasData.refetch()
  }

  return {
    ...clientesData,
    ...ventasData,
    stats,
    isLoading,
    error,
    refetch,
  }
}
