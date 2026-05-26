"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-gray-600 hover:text-red-600"
      onClick={() => signOut({ callbackUrl: "/fr/admin/login" })}
    >
      <LogOut size={16} />
      Déconnexion
    </Button>
  );
}
