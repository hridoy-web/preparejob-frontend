"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { TbTargetArrow } from "react-icons/tb";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Email/Password Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Successfully logged in! Welcome back.");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Invalid email or password.");
            setIsLoading(false);
          },
        }
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  // Google Sign-In Handler
  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Google sign-in failed.");
            setIsGoogleLoading(false);
          },
        }
      );
    } catch {
      toast.error("Something went wrong with Google sign-in.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(79,70,229,0.12)] font-urbanist p-6 sm:p-8">
      
      {/* SaaS Style Brand Header Inside Card */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 mb-6">
        <div className="size-12 rounded-2xl bg-indigo-50 border border-indigo-500/30 flex items-center justify-center text-indigo-600 shadow-xs mb-3.5">
          <TbTargetArrow className="size-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
          Welcome back
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Continue your journey to crack your dream job with{" "}
          <span className="font-bold text-slate-900">Prepare</span>
          <span className="text-indigo-600 font-bold">Job</span>
        </p>
      </div>

      <CardContent className="space-y-5 px-0 pb-0">
        {/* Google Social Login Button */}
        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading || isLoading}
          onClick={handleGoogleSignIn}
          className="w-full h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-800 font-semibold transition-all duration-200 shadow-2xs flex items-center justify-center gap-3 group cursor-pointer"
        >
          {isGoogleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
          ) : (
            <FcGoogle className="h-5 w-5 transition-transform group-hover:scale-105" />
          )}
          <span>Continue with Google</span>
        </Button>

        {/* Modern Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            Or continue with email
          </span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5 text-left">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              required
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          {/* Password with show/hide toggle */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all pr-10 text-slate-900 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full h-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-500/25 transition-all duration-200 mt-2 cursor-pointer"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Sign In to PrepareJob
          </Button>

          {/* Footer Register Link */}
          <p className="text-center text-sm text-slate-500 mt-3">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-600 font-bold hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}