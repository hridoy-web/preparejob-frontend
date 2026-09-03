"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck, ShieldCheck, Edit3, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function AdminProfileCard() {
  const [admin, setAdmin] = useState({
    name: "Hridoy Chowdhury",
    email: "admin@preparejob.com",
    avatar: "https://github.com/shadcn.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...admin });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAdmin({ ...formData });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <Card className="bg-white border-slate-200/80 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <UserCheck className="size-4 text-indigo-600" />
            Admin Profile & Account
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Manage your credentials and personal admin info via BetterAuth
          </CardDescription>
        </div>
        <Button
          size="sm"
          variant={isEditing ? "ghost" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-lg text-slate-700"
        >
          <Edit3 className="size-3.5 mr-1.5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        {!isEditing ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 border-2 border-indigo-100 shadow-xs">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback className="bg-indigo-600 text-white font-bold text-lg">HC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{admin.name}</h3>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    Super Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium">{admin.email}</p>
              </div>
            </div>

            {/* Motivational Banner */}
            <div className="bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-100 p-4 rounded-xl flex items-start gap-3 max-w-md">
              <Sparkles className="size-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                You are building opportunities for thousands of job seekers. Keep scaling PrepareJob with quality content!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-name" className="text-xs font-semibold">Full Name</Label>
                <Input
                  id="admin-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-semibold">Email Address</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-avatar" className="text-xs font-semibold">Avatar URL</Label>
              <Input
                id="admin-avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}