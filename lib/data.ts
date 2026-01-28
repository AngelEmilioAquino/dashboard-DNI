// Mock data based on the database schema

export interface Cliente {
  cliente_id: number
  nombre: string
  ciudad: string
  segmento: string
  fecha_registro: string
}

export interface Venta {
  venta_id: number
  cliente_id: number
  fecha: string
  total: number
  moneda: string
  canal: string
}

export const clientes: Cliente[] = [
  { cliente_id: 1, nombre: "Clínica Guerrero S.A.", ciudad: "La Romana", segmento: "Individual", fecha_registro: "2024-11-23" },
  { cliente_id: 2, nombre: "Raúl Pérez", ciudad: "San Pedro de Macorís", segmento: "Retail", fecha_registro: "2024-12-12" },
  { cliente_id: 3, nombre: "Ferretería Guerrero Corp.", ciudad: "San Pedro de Macorís", segmento: "Individual", fecha_registro: "2024-01-17" },
  { cliente_id: 4, nombre: "Importadora Rodríguez S.A.", ciudad: "Higüey", segmento: "Corporativo", fecha_registro: "2024-10-14" },
  { cliente_id: 5, nombre: "Supermercados Del Este", ciudad: "Santo Domingo", segmento: "Corporativo", fecha_registro: "2024-05-20" },
  { cliente_id: 6, nombre: "María González", ciudad: "Santiago", segmento: "Individual", fecha_registro: "2024-03-08" },
  { cliente_id: 7, nombre: "Tech Solutions RD", ciudad: "Santo Domingo", segmento: "Corporativo", fecha_registro: "2024-07-15" },
  { cliente_id: 8, nombre: "Farmacia Central", ciudad: "La Vega", segmento: "Retail", fecha_registro: "2024-09-22" },
]

export const ventas: Venta[] = [
  { venta_id: 1001, cliente_id: 1, fecha: "2025-03-27", total: 1316.31, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1002, cliente_id: 2, fecha: "2025-01-09", total: 2912.88, moneda: "DOP", canal: "web" },
  { venta_id: 1003, cliente_id: 3, fecha: "2025-02-15", total: 4521.50, moneda: "DOP", canal: "tienda" },
  { venta_id: 1004, cliente_id: 4, fecha: "2025-03-01", total: 8750.00, moneda: "DOP", canal: "web" },
  { venta_id: 1005, cliente_id: 5, fecha: "2025-01-20", total: 15230.75, moneda: "DOP", canal: "tienda" },
  { venta_id: 1006, cliente_id: 6, fecha: "2025-02-28", total: 890.25, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1007, cliente_id: 7, fecha: "2025-03-15", total: 23450.00, moneda: "DOP", canal: "web" },
  { venta_id: 1008, cliente_id: 8, fecha: "2025-03-20", total: 3200.50, moneda: "DOP", canal: "tienda" },
  { venta_id: 1009, cliente_id: 1, fecha: "2025-02-10", total: 2100.00, moneda: "DOP", canal: "web" },
  { venta_id: 1010, cliente_id: 2, fecha: "2025-03-05", total: 1850.75, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1011, cliente_id: 3, fecha: "2025-01-25", total: 5600.00, moneda: "DOP", canal: "tienda" },
  { venta_id: 1012, cliente_id: 4, fecha: "2025-02-20", total: 9200.50, moneda: "DOP", canal: "web" },
]

// Helper functions for dashboard statistics
export function getTotalVentas(): number {
  return ventas.reduce((sum, v) => sum + v.total, 0)
}

export function getTotalClientes(): number {
  return clientes.length
}

export function getVentasPorCanal(): { canal: string; total: number; count: number }[] {
  const canalMap = new Map<string, { total: number; count: number }>()
  
  for (const venta of ventas) {
    const existing = canalMap.get(venta.canal) || { total: 0, count: 0 }
    canalMap.set(venta.canal, {
      total: existing.total + venta.total,
      count: existing.count + 1
    })
  }
  
  return Array.from(canalMap.entries()).map(([canal, data]) => ({
    canal,
    ...data
  }))
}

export function getVentasPorMes(): { mes: string; total: number }[] {
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const mesMap = new Map<number, number>()
  
  for (const venta of ventas) {
    const mesIndex = new Date(venta.fecha).getMonth()
    const existing = mesMap.get(mesIndex) || 0
    mesMap.set(mesIndex, existing + venta.total)
  }
  
  return Array.from(mesMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([mesIndex, total]) => ({
      mes: meses[mesIndex],
      total
    }))
}

export function getClientesPorSegmento(): { segmento: string; count: number }[] {
  const segmentoMap = new Map<string, number>()
  
  for (const cliente of clientes) {
    const existing = segmentoMap.get(cliente.segmento) || 0
    segmentoMap.set(cliente.segmento, existing + 1)
  }
  
  return Array.from(segmentoMap.entries()).map(([segmento, count]) => ({
    segmento,
    count
  }))
}

export function getVentasRecientes(): (Venta & { cliente_nombre: string })[] {
  return ventas
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5)
    .map(venta => {
      const cliente = clientes.find(c => c.cliente_id === venta.cliente_id)
      return {
        ...venta,
        cliente_nombre: cliente?.nombre || "Cliente Desconocido"
      }
    })
}
