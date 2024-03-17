"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthProvider from "./auth/auth-provider";

export default function Index() {

  const { user, supabase, logout} = useSession()

  return (user ? 
    <AuthProvider>
      <div>Signed in</div>
        <button
          onClick={logout}
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
        <Link
          href="/test"
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          To Test
          </Link>
    </AuthProvider> :  <div>
      <div>Signed Out</div>
        <Link
          href="/login"
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Login
          </Link>
    </div>);
}
