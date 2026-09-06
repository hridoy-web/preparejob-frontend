"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, MoreVertical, Ban, Trash2, CheckCircle2, UserX, AlertTriangle, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getAllUsers, toggleUserStatus, deleteUser } from "@/lib/apiActions/adminApi";

// Updated IUser interface matching database field names
interface IUser {
  _id: string;
  name?: string;
  username?: string;
  email: string;
  role?: string;
  status?: "active" | "blocked";
  image?: string; // Matching DB image field
  avatar?: string; // Fallback field
  createdAt?: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [, startTransition] = useTransition();

  const [targetUser, setTargetUser] = useState<IUser | null>(null);
  const [dialogType, setDialogType] = useState<"block" | "delete" | null>(null);

  // Identify logged in admin
  const currentAdmin = users.find(
    (u) => u.role === "admin" || u.role === "Super Admin"
  );

  // Fetch updated user list
  const fetchUsersData = useCallback(async () => {
    try {
      const res = await getAllUsers({ page: 1, limit: 20 });
      if (res?.data) {
        setUsers(res.data.users || []);
        setTotalUsers(res.data.pagination?.totalUsers || 0);
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await getAllUsers({ page: 1, limit: 20 });
        if (isMounted && res?.data) {
          setUsers(res.data.users || []);
          setTotalUsers(res.data.pagination?.totalUsers || 0);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const err = error as Error;
          toast.error(err.message || "Failed to fetch users");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle block/unblock status toggle
  const handleToggleStatus = async (user: IUser) => {
    if (user._id === currentAdmin?._id) {
      toast.error("You cannot block or modify your own account status");
      return;
    }

    try {
      const res = await toggleUserStatus(user._id, currentAdmin?._id);
      toast.success(res?.message || "User status updated successfully");
      startTransition(() => {
        fetchUsersData();
        router.refresh();
      });
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update user status");
    } finally {
      setDialogType(null);
      setTargetUser(null);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (user: IUser) => {
    if (user._id === currentAdmin?._id) {
      toast.error("You cannot delete your own admin account");
      return;
    }

    try {
      const res = await deleteUser(user._id, currentAdmin?._id);
      toast.success(res?.message || "User account deleted successfully");
      startTransition(() => {
        fetchUsersData();
        router.refresh();
      });
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to delete user");
    } finally {
      setDialogType(null);
      setTargetUser(null);
    }
  };

  return (
    <div className="space-y-6 px-1 sm:px-0">
      {/* Header section with responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">Users Management</h2>
            <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
              <Shield className="size-3 text-purple-600" /> Admin Access
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage user accounts, roles, and platform permissions seamlessly.
          </p>
        </div>

        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 w-fit self-start sm:self-auto">
          <Users className="size-4 text-purple-600" />
          <span className="text-xs font-semibold text-slate-700">Total Accounts:</span>
          <span className="text-xs font-bold text-purple-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
            {totalUsers}
          </span>
        </div>
      </div>

      {/* Main user list card */}
      <Card className="bg-white border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-3.5 px-4 sm:px-6 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Users className="size-3.5 text-purple-600" /> Registered Accounts Directory
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-12 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
                <div className="size-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span>Loading users...</span>
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-500">No users found in database.</div>
            ) : (
              users.map((user) => {
                const displayName = user.name || user.username || "User";
                const isBlocked = user.status === "blocked";
                const isAdmin = user.role === "admin" || user.role === "Super Admin";
                const isSelf = user._id === currentAdmin?._id;
                // Read image or avatar field
                const userAvatarUrl = user.image || user.avatar || "";

                return (
                  <div
                    key={user._id}
                    className="p-3.5 sm:p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/80 transition-all duration-150"
                  >
                    {/* User profile info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 border border-slate-200 shadow-2xs shrink-0">
                        <AvatarImage src={userAvatarUrl} alt={displayName} className="object-cover" />
                        <AvatarFallback className="bg-purple-100 text-purple-800 font-bold text-xs">
                          {displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm font-semibold text-slate-900 truncate max-w-[160px] sm:max-w-xs">{displayName}</h3>
                          {isSelf && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full">
                              You
                            </span>
                          )}
                          {isBlocked && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full flex items-center gap-1">
                              <UserX className="size-2.5" /> Blocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] sm:max-w-sm mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    {/* Role badge & action menu */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          isAdmin
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {isAdmin && <ShieldCheck className="size-3 text-purple-600" />}
                        {user.role || "Candidate"}
                      </span>

                      {!isSelf && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44 bg-white border-slate-200 p-1 shadow-md">
                            <DropdownMenuItem
                              onClick={() => {
                                setTargetUser(user);
                                setDialogType("block");
                              }}
                              className="cursor-pointer text-xs font-semibold py-2 rounded-md"
                            >
                              {isBlocked ? (
                                <>
                                  <CheckCircle2 className="size-4 mr-2 text-emerald-600" /> Unblock User
                                </>
                              ) : (
                                <>
                                  <Ban className="size-4 mr-2 text-amber-600" /> Block User
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setTargetUser(user);
                                setDialogType("delete");
                              }}
                              className="cursor-pointer text-xs font-semibold py-2 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="size-4 mr-2" /> Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation modal */}
      <AlertDialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <AlertDialogContent className="bg-white border-slate-200 max-w-sm sm:max-w-md rounded-2xl shadow-xl p-5 sm:p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  dialogType === "delete"
                    ? "bg-red-100 text-red-600"
                    : targetUser?.status === "blocked"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                <AlertTriangle className="size-5" />
              </div>
              <AlertDialogTitle className="text-base font-bold text-slate-900">
                {dialogType === "delete"
                  ? "Delete User Account?"
                  : targetUser?.status === "blocked"
                  ? "Unblock User Account?"
                  : "Block User Account?"}
              </AlertDialogTitle>
            </div>

            <AlertDialogDescription asChild>
              <div className="text-xs text-slate-600 leading-relaxed pt-1 space-y-2">
                <span>
                  {dialogType === "delete"
                    ? "This action is permanent and cannot be undone. You are about to remove this user:"
                    : `Are you sure you want to ${
                        targetUser?.status === "blocked" ? "unblock" : "block"
                      } access for this user?`}
                </span>

                {/* Target user card inside dialog */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3 mt-2">
                  <Avatar className="size-10 border border-slate-200 shrink-0">
                    <AvatarImage 
                      src={targetUser?.image || targetUser?.avatar || ""} 
                      alt={targetUser?.name || "User"} 
                      className="object-cover" 
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-800 font-bold text-xs">
                      {(targetUser?.name || targetUser?.username || "US").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden text-left min-w-0 flex-1">
                    <p className="font-bold text-slate-900 truncate">
                      {targetUser?.name || targetUser?.username || "Unnamed User"}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{targetUser?.email}</p>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 gap-2 flex-col-reverse sm:flex-row">
            <AlertDialogCancel className="text-xs font-semibold rounded-lg border-slate-200 hover:bg-slate-100 mt-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={`text-xs font-bold rounded-lg px-4 text-white ${
                dialogType === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : targetUser?.status === "blocked"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => {
                if (targetUser && dialogType === "block") handleToggleStatus(targetUser);
                if (targetUser && dialogType === "delete") handleDeleteUser(targetUser);
              }}
            >
              {dialogType === "delete"
                ? "Yes, Delete"
                : targetUser?.status === "blocked"
                ? "Yes, Unblock"
                : "Yes, Block"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}