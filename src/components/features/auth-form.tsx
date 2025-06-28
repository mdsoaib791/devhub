"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const url = isRegister ? "/api/register" : "/api/login"
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    type ApiResponse = {
      error?: string
      token?: string
      user?: unknown
      [key: string]: unknown
    }
    let data: ApiResponse = {}
    try {
      data = await res.json()
    } catch {
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    if (!res.ok) {
      setError(data.error || "Something went wrong")
      return
    }

    setError("")

    // Store JWT in localStorage (or cookie)
    localStorage.setItem("token", data.token ?? "")
    // Optionally, store user info
    localStorage.setItem("user", JSON.stringify(data.user))
    router.push("/developers");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome DevHub</h1>
          <Link href="/developers" className="text-blue-600 hover:text-blue-800 text-sm">Go To Developers</Link>
          <p className="text-slate-600">Sign in to your account or create a new one</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-sm font-medium">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="text-sm font-medium" onClick={() => setIsRegister(true)}>
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
                <CardDescription className="text-center text-slate-600">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-12"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12"
                        required
                        value={form.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300" />
                      <Label htmlFor="remember" className="text-sm text-slate-600">
                        Remember me
                      </Label>
                    </div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-semibold text-center">Create Account</CardTitle>
                <CardDescription className="text-center text-slate-600">
                  Enter your information to create a new account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 h-12"
                        required
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-12"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 h-12"
                        required
                        value={form.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="h-4 w-4 rounded border-slate-300" required />
                    <Label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the{" "}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                        Privacy Policy
                      </button>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            {"Don't have an account? "}
            <button className="text-blue-600 hover:text-blue-800 font-medium">Contact support</button>
          </p>
        </div>
      </div>
    </div>
  )
}
