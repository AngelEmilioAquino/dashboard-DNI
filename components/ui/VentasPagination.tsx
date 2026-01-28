"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  page: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function VentasPagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <span className="text-xs text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
