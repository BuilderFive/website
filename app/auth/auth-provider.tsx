"use client"

import { UserNotFoundModal } from "@/components/modals/account-complete-modal";
import { useSession } from "@/utils/hooks/SessionContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const { account, user } = useSession().isLoading
    const [accountShown, setAccountShown] = useState(false)

    //super scuffed, should delete some day and make better
    const LoadedComponent = () => {
        const checkAccount = () => {
            setTimeout(() => {
                console.log(account)
                if (!account) {
                    setAccountShown(true)
                }
            }, 2000)
        }
        checkAccount()

        if (user) {
            return <div>
                {children}
                {accountShown && <UserNotFoundModal/>}
            </div>
        } else {
            return <LoadingScreen/>
        }
    }

    const failedAuth = () => {
        return redirect("/login?message=Denied access, please login");
    }

    const LoadingScreen = () => {
        return <div className="min-h-screen min-w-screen items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            Loading
        </div>
    }

    return <LoadedComponent/>
}