"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, UserRound, Loader2, Upload, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    // Revoke previous preview URL to prevent memory leaks
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
    setError(null);
    setIsLoading(true);

    try {
      let imageUrl: string | undefined = undefined;

      // 1. Upload image to Cloudinary if an avatar is selected
      if (avatarFile) {
        setLoadingMessage("Uploading profile picture...");
        imageUrl = await uploadImage(avatarFile, "preparejob/avatars");
      }

      // 2. Create user with Better-Auth and pass Cloudinary image URL
      setLoadingMessage("Creating your account...");
      const { error: signUpError } = await authClient.signUp.email({
        name: username,
        email,
        password,
        image: imageUrl,
      });

      if (signUpError) {
        setError(signUpError.message ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage(null);
    }
  }

  return (
    <Card className="relative z-10 w-full max-w-sm rounded-2xl border-brand-accent/20 shadow-lg shadow-brand-accent/10">
      <CardHeader>
        <CardTitle className="ai-gradient-text text-2xl font-semibold">
          Create an account
        </CardTitle>
        <CardDescription>Sign up to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Profile picture */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar">Profile picture</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserRound className="h-full w-full p-3.5 text-muted-foreground" />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
                    disabled={isLoading}
                  >
                    <Upload className="h-4 w-4" />
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
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="janedoe"
              autoComplete="username"
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password with show/hide toggle */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
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
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-brand-accent"
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-accent text-white hover:bg-brand-accent/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingMessage ?? "Please wait..."}
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
