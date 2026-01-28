import { supabase } from "@/supabase/client";
import { useEffect, useMemo, useState } from "react";

export function useVentasAuditoria() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditoria = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("ventas_errors")
        .select("*")
        .order("venta_id", { ascending: false });

      if (!error) setData(data || []);
      setLoading(false);
    };

    fetchAuditoria();
  }, []);

  // Errores por tipo
  const erroresPorTipo = useMemo(() => {
    return data.reduce((acc: any, v) => {
      acc[v.error_motivo] = (acc[v.error_motivo] || 0) + 1;
      return acc;
    }, {});
  }, [data]);

  // Errores por canal
  const erroresPorCanal = useMemo(() => {
    return data.reduce((acc: any, v) => {
      acc[v.canal] = (acc[v.canal] || 0) + 1;
      return acc;
    }, {});
  }, [data]);

  return {
    ventasError: data,
    loading,
    erroresPorTipo,
    erroresPorCanal,
    totalErrores: data.length,
  };
}
