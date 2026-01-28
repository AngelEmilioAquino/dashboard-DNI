"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/supabase/client"

export interface Cliente {
  cliente_id: number
  nombre: string
  ciudad: string | null
  segmento: string | null
  fecha_registro: string | null
}

interface UseClientesReturn {
  clientes: Cliente[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  totalClientes: number
  clientesPorSegmento: { segmento: string; count: number }[]
  clientesPorCiudad: { ciudad: string; count: number }[]
  page: number
  setPage: (p: number) => void
  pageSize: number
  setPageSize: (size: number) => void
  totalCount: number
}

export function useClientes(initialPage = 1, initialPageSize = 10): UseClientesReturn {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalCount, setTotalCount] = useState(0)
  const [clientesPorSegmento, setClientesPorSegmento] = useState<{ segmento: string; count: number }[]>([])
  const [clientesPorCiudad, setClientesPorCiudad] = useState<{ ciudad: string; count: number }[]>([])
  const [totalClientes, setTotalClientes] = useState(0)

  const fetchStats = useCallback(async () => {
    try {
      // Traemos todos los clientes solo para calcular estadísticas
      const { data, error } = await supabase
        .from("clientes")
        .select("*", { count: "exact" })

      if (error) throw error

      const allClientes = data ?? []
      setTotalClientes(allClientes.length)

      // Segmentos
      const segMap = new Map<string, number>()
      const ciudadMap = new Map<string, number>()

      allClientes.forEach((c) => {
        if (c.segmento) segMap.set(c.segmento, (segMap.get(c.segmento) || 0) + 1)
        if (c.ciudad) ciudadMap.set(c.ciudad, (ciudadMap.get(c.ciudad) || 0) + 1)
      })

      setClientesPorSegmento(Array.from(segMap.entries()).map(([segmento, count]) => ({ segmento, count })))
      setClientesPorCiudad(Array.from(ciudadMap.entries()).map(([ciudad, count]) => ({ ciudad, count })))
    } catch (err: any) {
      console.error("Error fetchStats:", err.message)
    }
  }, [])

  const fetchClientesPage = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const from = (page - 1) * pageSize
      const to = page * pageSize - 1

      const { data, count, error } = await supabase
        .from("clientes")
        .select("*", { count: "exact" })
        .range(from, to)

      if (error) throw error

      setClientes(data ?? [])
      if (count !== null) setTotalCount(count)
    } catch (err: any) {
      setError(err.message ?? "Error al cargar clientes")
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize])

  const refetch = useCallback(async () => {
    await fetchStats()
    await fetchClientesPage()
  }, [fetchStats, fetchClientesPage])

  useEffect(() => {
    refetch()
  }, [refetch, page, pageSize])

  return {
    clientes,
    isLoading,
    error,
    refetch,
    totalClientes,
    clientesPorSegmento,
    clientesPorCiudad,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
  }
}
