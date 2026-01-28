"use client"

import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { SegmentChart } from "@/components/dashboard/segment-chart"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { RefreshCw } from "lucide-react"

export function DashboardHome() {
  const { isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div>
          <SegmentChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentSales />
        </div>
        <div>
          <AnalyticsChart />
        </div>
      </div>
    </div>
  )
}
