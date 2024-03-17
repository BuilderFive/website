"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { SlLogout } from "react-icons/sl";



export const LogOutButton = () => {
    const { logout } = useSession()

    return <section className="flex border border-primary-200 p-[6px] text-primary-200 text-xs font-medium rounded-sm hover:text-primary-100">
        <button onClick={logout} className="flex-row gap-[4px] flex">
            <SlLogout size={16} />
            Log Out
        </button>
    </section>
}
  