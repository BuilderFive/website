"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { redirect } from "next/navigation";

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const { user } = useSession();

    const failedAuth = () => {
        return redirect("/login?message=Denied access, please login");
    }

    return user ? children : failedAuth(); 
}