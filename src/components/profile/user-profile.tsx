"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import React from "react"

interface UserProfileProps {
  className?: string
}

export function UserProfile({ className = "" }: UserProfileProps) {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <Card className={`max-w-md mx-auto ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
          <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{session.user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="text-sm">{session.user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Authentication Provider</h3>
            <p className="text-sm capitalize">
              {session.user.image?.includes("github")
                ? "GitHub"
                : session.user.image?.includes("google")
                  ? "Google"
                  : "LinkedIn"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

