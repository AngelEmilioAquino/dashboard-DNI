"use client"

import { useState, useEffect, useCallback } from "react"
import { clientes as mockClientes, type Cliente } from "@/lib/data"

interface UseClientesReturn {
  clientes: Cliente[]
  isLoading: boolean
  error: string | null
  refetch: () => void
  getClienteById: (id: number) => Cliente | undefined
  getClientesPorSegmento: () => { segmento: string; count: number }[]
  getClientesPorCiudad: () => { ciudad: string; count: number }[]
  totalClientes: number
}

export function useClientes(): UseClientesReturn {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClientes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // TODO: Reemplazar con llamada a Supabase cuando se conecte
      // const { data, error } = await supabase.from('clientes').select('*')
      // if (error) throw error
      // setClientes(data)
      
      setClientes(mockClientes)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar clientes")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClientes()
  }, [fetchClientes])

  const getClienteById = useCallback(
    (id: number) => clientes.find((c) => c.cliente_id === id),
    [clientes]
  )

  const getClientesPorSegmento = useCallback(() => {
    const segmentoMap = new Map<string, number>()
    for (const cliente of clientes) {
      const existing = segmentoMap.get(cliente.segmento) || 0
      segmentoMap.set(cliente.segmento, existing + 1)
    }
    return Array.from(segmentoMap.entries()).map(([segmento, count]) => ({
      segmento,
      count,
    }))
  }, [clientes])

  const getClientesPorCiudad = useCallback(() => {
    const ciudadMap = new Map<string, number>()
    for (const cliente of clientes) {
      const existing = ciudadMap.get(cliente.ciudad) || 0
      ciudadMap.set(cliente.ciudad, existing + 1)
    }
    return Array.from(ciudadMap.entries()).map(([ciudad, count]) => ({
      ciudad,
      count,
    }))
  }, [clientes])

  return {
    clientes,
    isLoading,
    error,
    refetch: fetchClientes,
    getClienteById,
    getClientesPorSegmento,
    getClientesPorCiudad,
    totalClientes: clientes.length,
  }
}
