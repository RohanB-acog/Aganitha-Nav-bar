"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import React from "react"

interface LoginFormProps {
  providers?: string[]
  redirectUrl?: string
  termsUrl?: string
  privacyUrl?: string
}

export function LoginForm({
  providers = ["google", "github", "linkedin"],
  redirectUrl = "/",
  termsUrl = "/terms",
  privacyUrl = "/privacy",
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn(provider, { callbackUrl: redirectUrl })
    } catch (error) {
      setError("An error occurred during sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account using one of the methods below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">{error}</div>}
        <div className="space-y-3">
          {providers.includes("google") && (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 bg-white text-black hover:bg-gray-100"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
              <span>Continue with Google</span>
            </Button>
          )}

          {providers.includes("linkedin") && (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
              onClick={() => handleOAuthSignIn("linkedin")}
              disabled={isLoading}
            >
              <Linkedin size={20} />
              <span>Continue with LinkedIn</span>
            </Button>
          )}

          {providers.includes("github") && (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#24292e] text-white hover:bg-[#24292e]/90"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              <Github size={20} />
              <span>Continue with GitHub</span>
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href={termsUrl} className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={privacyUrl} className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

