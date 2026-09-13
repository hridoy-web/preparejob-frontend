"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";

interface IUser {
  _id: string;
  name?: string;
  username?: string;
  email: string;
  role?: string;
  status?: "active" | "blocked";
  image?: string;
  avatar?: string;
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

  const { data: session } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  const fetchUsersData = useCallback(async () => {
    try {
      const res = await getAllUsers({ page: 1, limit: 50 });
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
        const res = await getAllUsers({ page: 1, limit: 50 });
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

  const handleToggleStatus = async (user: IUser) => {
    if (user.email === currentUserEmail) {
      toast.error("You cannot block your own account");
      return;
    }

    try {
      const res = await toggleUserStatus(user._id);
      toast.success(res?.message || "User status updated");
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

  const handleDeleteUser = async (user: IUser) => {
    if (user.email === currentUserEmail) {
      toast.error("You cannot delete your own account");
      return;
    }

    try {
      const res = await deleteUser(user._id);
      toast.success(res?.message || "User account deleted");
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
    <div className="space-y-6 px-2 sm:px-4 font-lexend pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Users Management
            </h2>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
              <Shield className="size-3 text-indigo-600" /> Admin Access
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage registered accounts, roles, and security permissions.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs shrink-0 self-start sm:self-auto">
          <Users className="size-4 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-600">Total Accounts:</span>
          <span className="text-xs font-bold text-indigo-700">{totalUsers}</span>
        </div>
      </div>

      {/* Table Directory */}
      <Card className="bg-white border-slate-200/80 shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <span>Loading users directory...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const displayName = user.name || user.username || "User";
                    const isBlocked = user.status === "blocked";
                    const isAdmin = user.role?.toLowerCase() === "admin" || user.role === "Super Admin";
                    const isSelf = user.email === currentUserEmail;
                    const userAvatarUrl = user.image || user.avatar || "";

                    return (
                      <tr key={user._id} className="hover:bg-slate-50/70 transition-colors">
                        {/* User Profile */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-9 border border-slate-200 shrink-0">
                              <AvatarImage src={userAvatarUrl} alt={displayName} className="object-cover" />
                              <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                                {displayName.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">{displayName}</span>
                              {isSelf && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3.5 text-slate-500 font-medium">
                          {user.email}
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                              isAdmin
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {isAdmin && <ShieldCheck className="size-3 text-purple-600" />}
                            {user.role || "user"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          {isBlocked ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full">
                              <UserX className="size-3" /> Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">
                              <CheckCircle2 className="size-3" /> Active
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right">
                          {!isAdmin && (
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
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation modal */}
      <AlertDialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <AlertDialogContent className="bg-white border-slate-200 max-w-sm sm:max-w-md rounded-2xl shadow-xl p-5 sm:p-6 font-lexend">
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

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3 mt-2">
                  <Avatar className="size-10 border border-slate-200 shrink-0">
                    <AvatarImage 
                      src={targetUser?.image || targetUser?.avatar || ""} 
                      alt={targetUser?.name || "User"} 
                      className="object-cover" 
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-800 font-bold text-xs">
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