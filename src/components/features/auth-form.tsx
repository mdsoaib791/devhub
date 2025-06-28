"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import axios from "axios";
import AuthSchema from "@/schema/auth-schema";
import { RegisterSchema } from "@/schema/register-schema";
import RegisterModel from "@/models/register.model";
import AuthModel from "@/models/auth.model";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  const schema = tab === "login" ? AuthSchema : RegisterSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthModel | RegisterModel>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthModel | RegisterModel) => {
    setIsLoading(true);
    if (tab === "login") {
      try {
        await signIn("credentials", {
          redirect: true,
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        console.log("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:4000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data as RegisterModel,
        });

        const json = res.data;
        if (!res.data) throw new Error(json.message || "Registration failed");
        reset();
        setTab("login");
      } catch (err) {
        console.error("Register error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      localStorage.setItem("at", session.user.token || "");
      router.push("/chat");
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome DevHub
          </h1>
          <Link
            href="/developers"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Go To Developers
          </Link>
          <p className="text-slate-600">
            Sign in to your account or create a new one
          </p>
        </div>

        <Tabs
          defaultValue="login"
          onValueChange={(val) => setTab(val as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN FORM */}
          <TabsContent value="login">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                <CardDescription className="text-center text-slate-600">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 h-12"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 h-12"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="register">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-slate-600">
                  Fill the form to register
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="fullName"
                        type="text"
                        className="pl-10 h-12"
                        {...register("fullName")}
                      />
                    </div>
                    {/* {errors. && (
                      <p className="text-sm text-red-600">
                        {errors.fullName.message}
                      </p>
                    )} */}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 h-12"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 h-12"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 h-12"
                        {...register("confirmPassword")}
                      />
                    </div>
                    {/* {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )} */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("termsAccepted")}
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the{" "}
                      <span className="text-blue-600 font-medium hover:underline">
                        Terms
                      </span>{" "}
                      &{" "}
                      <span className="text-blue-600 font-medium hover:underline">
                        Privacy
                      </span>
                    </Label>
                  </div>
                  {/* {errors.termsAccepted && (
                    <p className="text-sm text-red-600">
                      {errors.termsAccepted.message}
                    </p>
                  )} */}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
