"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // adjust path to your better-auth client instance
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function LogoutMenuItem() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="w-full cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" /> Logout
    </DropdownMenuItem>
  );
}