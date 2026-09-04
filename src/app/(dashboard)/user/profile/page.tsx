"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera, Save, Loader2, ArrowLeft, Edit2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Mode & Form State (Directly initialized from user session)
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  
  // Loading Indicators
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle Cancel Edit
  const handleCancel = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(false);
  };

  // Direct File Upload Handler
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadImage(file, "preparejob/avatars");
      setImageUrl(uploadedUrl);
      toast.success("Profile picture uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  // Profile Save Handler
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      await authClient.updateUser({
        name,
        image: imageUrl,
      });
      
      toast.success("Profile updated successfully");
      setIsEditing(false); // Relock fields on successful save

    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile details");

    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="font-lexend max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="outline" 
            size="icon" 
            className="size-9 rounded-xl border-slate-200 hover:bg-slate-100 shrink-0"
          >
            <Link href="/user">
              <ArrowLeft className="size-4 text-slate-700" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-urbanist text-slate-900 flex items-center gap-2">
              <User className="size-5 text-indigo-600" /> Account Settings
            </h2>
            <p className="text-xs text-slate-500 font-lexend">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        {/* Dynamic Edit / Cancel Toggle Button */}
        {!isEditing ? (
          <Button
            type="button"
            onClick={() => {
              // Sync input fields with latest session values before editing
              setName(user?.name || "");
              setImageUrl(user?.image || "");
              setIsEditing(true);
            }}
            variant="outline"
            className="rounded-xl h-9 text-xs font-semibold px-4 border-slate-200 hover:bg-slate-50 gap-2 font-lexend"
          >
            <Edit2 className="size-3.5 text-indigo-600" /> Edit Profile
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleCancel}
            variant="ghost"
            disabled={isSaving || isUploading}
            className="rounded-xl h-9 text-xs font-semibold px-4 text-slate-600 hover:bg-slate-100 gap-1.5 font-lexend"
          >
            <X className="size-4" /> Cancel
          </Button>
        )}
      </div>

      <Card className="p-6 rounded-2xl bg-white border-slate-200/80 shadow-xs">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          
          {/* Avatar Direct File Upload Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative group">
              <Avatar className="size-24 border-2 border-indigo-100 shadow-md">
                <AvatarImage src={imageUrl || user?.image || ""} alt={name || user?.name || "User"} />
                <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold font-urbanist">
                  {name ? name[0].toUpperCase() : user?.name ? user.name[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>

              {/* Upload Loader Indicator */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-xs">
                  <Loader2 className="size-6 text-white animate-spin" />
                </div>
              )}

              {/*  Upload */}
              {isEditing && (
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 cursor-pointer transition-transform hover:scale-105"
                >
                  <Camera className="size-4" />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                    disabled={isUploading || isSaving}
                  />
                </label>
              )}
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900 font-urbanist">Profile Picture</h4>
              <p className="text-xs text-slate-500 font-lexend">
                {isEditing 
                  ? "Click the camera icon to upload a new avatar." 
                  : "Click 'Edit Profile' to modify your avatar."}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-xs font-semibold text-slate-700 font-lexend">
                Full Name
              </Label>
              <Input
                id="full-name"
                value={isEditing ? name : user?.name || ""}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing || isSaving}
                className="rounded-xl text-xs h-10 border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 disabled:cursor-not-allowed font-lexend"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700 font-lexend">
                Email Address (Read-only)
              </Label>
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="rounded-xl text-xs h-10 bg-slate-50/80 border-slate-200 text-slate-500 cursor-not-allowed font-lexend"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button 
                type="button"
                onClick={handleCancel}
                variant="outline"
                disabled={isSaving || isUploading}
                className="rounded-xl h-10 text-xs font-semibold px-5 border-slate-200 hover:bg-slate-50 font-lexend"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isUploading || isSaving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 text-xs font-semibold px-6 gap-2 font-lexend"
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}