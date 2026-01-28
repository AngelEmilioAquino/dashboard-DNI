"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/supabase/client"

export interface VentaConCliente {
  venta_id: number
  cliente_id: number
  fecha: string
  total: number
  moneda: string
  canal: string
  cliente_nombre: string | null
}

interface UseVentasReturn {
  ventas: VentaConCliente[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  totalVentas: number // total de todas las ventas
  sumaVentas: number  // suma de todas las ventas
  page: number
  setPage: (p: number) => void
  pageSize: number
  setPageSize: (size: number) => void
  totalCount: number  // número de ventas total para paginación
  ventasStats: { fecha: string; total: number }[]
  ventasCanal: { canal: string; total: number }[]
}

export function useVentas(initialPage = 1, initialPageSize = 10): UseVentasReturn {
  const [ventas, setVentas] = useState<VentaConCliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalCount, setTotalCount] = useState(0)
  const [totalSuma, setTotalSuma] = useState(0)
  const [ventasStats, setVentasStats] = useState<{ fecha: string; total: number }[]>([])
  const [ventasCanal, setVentasCanal] = useState<{ canal: string; total: number }[]>([])

  // Fetch estadísticas globales (total y suma para Cards)
  const fetchStats = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("ventas")
        .select("total", { count: "exact" })
      if (error) throw error

      setTotalCount(data?.length ?? 0)
      setTotalSuma(data?.reduce((sum, v) => sum + (v.total ?? 0), 0) ?? 0)
    } catch (err: any) {
      console.error("Error fetchStats:", err.message)
    }
  }, [])

  // Fetch página actual de ventas
  const fetchVentasPage = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const from = (page - 1) * pageSize
      const to = page * pageSize - 1

      const { data, error: supaError } = await supabase
      .from("ventas")
      .select("venta_id, cliente_id, fecha, total, moneda, canal, clientes!inner(nombre)")
      .order("fecha", { ascending: false })
      .range(from, to)


      if (supaError) throw supaError

      const ventasMap: VentaConCliente[] = (data ?? []).map((v: any) => ({
        venta_id: v.venta_id,
        cliente_id: v.cliente_id,
        fecha: v.fecha,
        total: v.total,
        moneda: v.moneda,
        canal: v.canal,
        cliente_nombre: v.clientes?.nombre ?? null,
      }))

      setVentas(ventasMap)
    } catch (err: any) {
      setError(err.message ?? "Error al cargar ventas")
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize])

  // Estadisticas para graficos
  const fetchVentasStats = useCallback(async () => {
  try {
    const { data, error } = await supabase
      .from("ventas")
      .select("fecha, total")

    if (error) throw error

    setVentasStats(data ?? [])
  } catch (err: any) {
    console.error("Error fetchVentasStats:", err.message)
  }
}, [])

// Fetch ventas por canal
const fetchVentasCanal = useCallback(async () => {
  try {
    const { data, error } = await supabase
      .from("ventas")
      .select("canal, total");

    if (error) throw error;
    
    // Agrupar y sumar totales por canal ya que Supabase no soporta agregaciones complejas directamente
    const grouped = data?.reduce((acc: Record<string, number>, v: any) => {
      acc[v.canal] = (acc[v.canal] ?? 0) + (v.total ?? 0);
      return acc;
    }, {}) ?? {};
    
    const result = Object.entries(grouped).map(([canal, total]) => ({
      canal,
      total: total as number,
    })).sort((a, b) => b.total - a.total);
    
    setVentasCanal(result);
    
  } catch (err: any) {
    console.error("Error fetchVentasCanal:", err.message);
  }
}, []);

  // Refetch completo (estadísticas + página con el callback)
  const refetch = useCallback(async () => {
  await fetchStats()
  await fetchVentasPage()
  await fetchVentasStats()
  await fetchVentasCanal()
}, [fetchStats, fetchVentasPage, fetchVentasStats])

  // Cargar datos al montar o al cambiar página/tamaño hacer el refetch
  useEffect(() => {
    refetch()
  }, [refetch, page, pageSize])

  return {
    ventas,
    ventasCanal,
    ventasStats,  
    isLoading,
    error,
    refetch,
    totalVentas: totalCount,
    sumaVentas: totalSuma,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
  }
}

