"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/supabase/client"

export interface ClienteAuditoria {
  cliente_id: number | null
  nombre: string | null
  ciudad: string | null
  segmento: string | null
  fecha_registro: string | null
  error: boolean
}

export function useAuditoriaClientes() {
  const [clientesError, setClientesError] = useState<ClienteAuditoria[]>([])
  const [loading, setLoading] = useState(true)

  const [erroresPorTipo, setErroresPorTipo] = useState<Record<string, number>>(
    {}
  )

  const [erroresPorSegmento, setErroresPorSegmento] = useState<
    Record<string, number>
  >({})

  useEffect(() => {
    const fetchClientesError = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("clientes_errors")
        .select("cliente_id, nombre, ciudad, segmento, fecha_registro, error")
        .eq("error", true)

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      setClientesError(data ?? [])

      // Errores por tipo
      const tipoCount: Record<string, number> = {
        NOMBRE_NULO: 0,
        CIUDAD_NULA: 0,
        SEGMENTO_NULO: 0,
        FECHA_INVALIDA: 0,
      }

      // Errores por segmento
      const segmentoCount: Record<string, number> = {}

      data?.forEach((c) => {
        if (!c.nombre || c.nombre === "NONE") tipoCount.NOMBRE_NULO++
        if (!c.ciudad || c.ciudad === "NONE") tipoCount.CIUDAD_NULA++
        if (!c.segmento || c.segmento === "NONE") tipoCount.SEGMENTO_NULO++
        if (!c.fecha_registro) tipoCount.FECHA_INVALIDA++

        const seg = c.segmento ?? "NULO"
        segmentoCount[seg] = (segmentoCount[seg] ?? 0) + 1
      })

      setErroresPorTipo(tipoCount)
      setErroresPorSegmento(segmentoCount)
      setLoading(false)
    }

    fetchClientesError()
  }, [])

  return {
    clientesError,
    erroresPorTipo,
    erroresPorSegmento,
    loading,
  }
}
