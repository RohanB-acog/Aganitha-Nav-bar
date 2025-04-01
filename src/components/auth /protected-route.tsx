"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  loginRedirect?: string
  loadingComponent?: React.ReactNode
}

export function ProtectedRoute({ children, loginRedirect = "/login", loadingComponent }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push(`${loginRedirect}?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, router, pathname, loginRedirect])

  if (status === "loading") {
    return (
      loadingComponent || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}

