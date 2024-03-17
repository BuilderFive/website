"use client"

import { UserNotFoundModal } from "@/components/modals/account-complete-modal";
import { useSession } from "@/utils/hooks/SessionContext";
import { redirect } from "next/navigation";

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const { user } = useSession()

    const failedAuth = () => {
        return redirect("/login?message=Denied access, please login");
    }

    //send to failedAuth if takes longer than 10 seconds to load in

    //Open UserNotFoundModal after 2 seconds 
    // not the best approach, should logically figure out 
    //if user needs to see modal or not

    return user ? 
    <>
        {children} 
        {setTimeout(() => {
            <UserNotFoundModal/>
        }, 2000)}
    </> : <div>Waiting for authentication...</div>; 
}