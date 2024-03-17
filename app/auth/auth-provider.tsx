"use client"

import { UserNotFoundModal } from "@/components/modals/account-complete-modal";
import { useSession } from "@/utils/hooks/SessionContext";
import { redirect } from "next/navigation";

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const { user } = useSession();

    const failedAuth = () => {
        return redirect("/login?message=Denied access, please login");
    }

    //send to failedAuth if takes longer than 10 seconds to load in

    //use account-complete-modal to check if the user has an account

    return user ? <>{children} <UserNotFoundModal/></> : <div>Waiting for authentication...</div>; 
}