"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardClient } from "@/components/dashboard-client"
import { DashboardTasker } from "@/components/dashboard-tasker"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <DashboardLayout>{user.role === "client" ? <DashboardClient /> : <DashboardTasker />}</DashboardLayout>
}
