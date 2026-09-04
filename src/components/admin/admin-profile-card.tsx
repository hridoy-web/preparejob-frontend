"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck, ShieldCheck, Edit3, Sparkles, Camera, Loader2, Save, X, Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";

// Type to safely handle 'role'
interface AdminUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

export function AdminProfileCard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as AdminUser | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prevUser, setPrevUser] = useState(user);

  // Sync state with session during render phase
  if (user !== prevUser) {
    setPrevUser(user);
    setName(user?.name || "");
    setImageUrl(user?.image || "");
  }

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Upload image to Cloudinary
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadImage(file, "preparejob/admin-avatars");
      setImageUrl(uploadedUrl);
      toast.success("Avatar uploaded successfully!");

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload avatar image");

    } finally {
      setIsUploading(false);
    }
  };

  // Save changes via BetterAuth
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      await authClient.updateUser({
        name,
        image: imageUrl,
      });

      toast.success("Admin profile updated successfully!");
      setIsEditing(false);

    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");

    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(false);
  };

  if (isPending) {
    return (
      <Card className="bg-white border-slate-200/80 p-8 flex items-center justify-center rounded-2xl shadow-xs">
        <Loader2 className="size-6 text-indigo-600 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl overflow-hidden font-lexend">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100/80 bg-slate-50/50 px-6 py-4">
        <div>
          <CardTitle className="text-base font-bold font-urbanist text-slate-900 flex items-center gap-2">
            <UserCheck className="size-4 text-indigo-600" />
            Admin Profile
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-0.5 font-lexend">
            Manage your credentials and personal admin info
          </CardDescription>
        </div>

        {!isEditing ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setName(user?.name || "");
              setImageUrl(user?.image || "");
              setIsEditing(true);
            }}
            className="rounded-lg text-xs font-semibold h-8 px-3 border-slate-200 text-slate-700 hover:bg-white hover:text-indigo-600 shadow-2xs transition-all"
          >
            <Edit3 className="size-3.5 mr-1.5 text-indigo-600" />
            Edit Profile
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSaving || isUploading}
            className="rounded-xl text-xs font-semibold px-3 text-slate-600 hover:bg-slate-100"
          >
            <X className="size-4 mr-1" />
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {!isEditing ? (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="size-16 border-2 border-indigo-100 shadow-sm">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "Admin"} />
                  <AvatarFallback className="bg-linear-to-br from-indigo-600 to-violet-700 text-white font-bold text-xl font-urbanist">
                    {user?.name ? user.name[0].toUpperCase() : "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-4 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900 font-urbanist">
                    {user?.name || "Admin User"}
                  </h3>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    {user?.role ? user.role.toUpperCase() : "SUPER ADMIN"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium font-lexend flex items-center gap-1.5">
                  <Mail className="size-3.5 text-slate-400" />
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Premium Motivational Banner */}
            <div className="bg-linear-to-r from-indigo-50/80 via-purple-50/40 to-pink-50/50 border border-indigo-100/80 p-4 rounded-2xl flex items-start gap-3 max-w-md shadow-2xs">
              <div className="p-2 bg-indigo-600/10 rounded-xl shrink-0">
                <Sparkles className="size-4 text-indigo-600" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium font-lexend">
                You are building opportunities for thousands of job seekers. Keep scaling PrepareJob with quality content!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
            {/* Avatar Edit Section */}
            <div className="flex items-center gap-5 pb-5 border-b border-slate-100">
              <div className="relative group">
                <Avatar className="size-20 border-2 border-indigo-100 shadow-xs">
                  <AvatarImage src={imageUrl || user?.image || ""} alt={name} />
                  <AvatarFallback className="bg-linear-to-br from-indigo-600 to-violet-700 text-white font-bold text-2xl font-urbanist">
                    {name ? name[0].toUpperCase() : "A"}
                  </AvatarFallback>
                </Avatar>

                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-xs">
                    <Loader2 className="size-5 text-white animate-spin" />
                  </div>
                )}

                <label
                  htmlFor="admin-avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 cursor-pointer transition-transform hover:scale-105"
                >
                  <Camera className="size-3.5" />
                  <input
                    id="admin-avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isUploading || isSaving}
                  />
                </label>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 font-urbanist">Admin Profile Photo</h4>
                <p className="text-[11px] text-slate-500 font-lexend">
                  Click the camera icon to upload a new profile picture.
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-name" className="text-xs font-semibold text-slate-700 font-lexend">
                  Full Name
                </Label>
                <Input
                  id="admin-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSaving}
                  className="rounded-xl text-xs h-10 border-slate-200 focus-visible:ring-indigo-600 font-lexend"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-semibold text-slate-700 font-lexend">
                  Email Address (Read-only)
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="rounded-xl text-xs h-10 bg-slate-50/80 border-slate-200 text-slate-500 cursor-not-allowed font-lexend"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving || isUploading}
                className="rounded-xl text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50 font-lexend"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSaving || isUploading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold px-5 gap-1.5 font-lexend shadow-xs"
              >
                {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}