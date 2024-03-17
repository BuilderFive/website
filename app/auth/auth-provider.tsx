"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { redirect } from "next/navigation";

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const { user } = useSession();

    const failedAuth = () => {
        return redirect("/login?message=Denied access, please login");
    }

    //send to failedAuth if takes longer than 10 seconds to load in

    return user ? children : <div>Waiting for authentication...</div>; 
}