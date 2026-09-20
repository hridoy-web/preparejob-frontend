"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, UserRound, Loader2, Upload, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { TbTargetArrow } from "react-icons/tb";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function RegisterForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleRemoveAvatar() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl: string | undefined = undefined;

      if (avatarFile) {
        setLoadingMessage("Uploading profile picture...");
        imageUrl = await uploadImage(avatarFile, "preparejob/avatars");
      }

      setLoadingMessage("Creating your account...");
      const { error: signUpError } = await authClient.signUp.email({
        name: username,
        email,
        password,
        image: imageUrl,
      });

      if (signUpError) {
        toast.error(signUpError.message ?? "Something went wrong. Please try again.");
        setIsLoading(false);
        setLoadingMessage(null);
        return;
      }

      toast.success("Account created successfully! Welcome to PrepareJob.");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsLoading(false);
      setLoadingMessage(null);
    }
  }

  // Google Sign-Up Handler
  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Google sign-up failed.");
            setIsGoogleLoading(false);
          },
        }
      );
    } catch {
      toast.error("Something went wrong with Google sign-up.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(79,70,229,0.12)]  p-6 sm:p-8">
      
      {/* Brand Header Inside Card */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 mb-6">
        <div className="size-12 rounded-2xl bg-indigo-50 border border-indigo-500/30 flex items-center justify-center text-indigo-600 shadow-xs mb-3.5">
          <TbTargetArrow className="size-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
          Create an account
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Start your journey to crack your dream job with{" "}
          <span className="font-bold text-slate-900">Prepare</span>
          <span className="text-indigo-600 font-bold">Job</span>
        </p>
      </div>

      <CardContent className="space-y-5 px-0 pb-0">
        {/* Google Social Button */}
        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading || isLoading}
          onClick={handleGoogleSignUp}
          className="w-full h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-800 font-semibold transition-all duration-200 shadow-2xs flex items-center justify-center gap-3 group cursor-pointer"
        >
          {isGoogleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
          ) : (
            <FcGoogle className="h-5 w-5 transition-transform group-hover:scale-105" />
          )}
          <span>Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            Or register with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile picture */}
          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="avatar" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Profile Picture
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserRound className="h-6 w-6 text-slate-400" />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-9 rounded-xl border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                    disabled={isLoading}
                  >
                    <Upload className="h-4 w-4 mr-1.5" />
                    Upload photo
                  </Button>
                  {avatarFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveAvatar}
                      aria-label="Remove photo"
                      disabled={isLoading}
                      className="h-9 w-9 p-0 text-slate-500 hover:text-red-600 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="truncate text-xs text-slate-400">
                  {avatarFile ? avatarFile.name : "PNG, JPG or WebP (max 5MB)"}
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5 text-left">
            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="janedoe"
              autoComplete="username"
              required
              disabled={isLoading}
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

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
              disabled={isLoading}
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          {/* Password with show/hide toggle */}
          <div className="flex flex-col gap-1.5 text-left">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={isLoading}
                className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all pr-10 text-slate-900 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
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
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {loadingMessage ?? "Please wait..."}
              </>
            ) : (
              "Create PrepareJob Account"
            )}
          </Button>

          {/* Footer Login Link */}
          <p className="text-center text-sm text-slate-500 mt-3">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4">
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}