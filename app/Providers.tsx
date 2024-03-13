"use client"

import { createClient } from "../utils/supabase/client"
import { SessionProvider } from "../utils/hooks/SessionContext"
import { useEffect, useState } from "react";

/**
 * Wrapper for the SessionProvider
 * @param ReactNode children 
 * @returns Viewable UI
 */
export default function Providers({children}: any) {
    const supabase = createClient()

    const [signedIn, setSignedIn] = useState(false);
    const [supabaseClient, setSupabaseClient] = useState(supabase);

    useEffect(()=>{
      const fetchUser = async () => {
        const { data: { user }, } = await supabase.auth.getUser();
        setSignedIn(user ? true : false)
        setSupabaseClient(supabase)
      }
      fetchUser()
    },[signedIn, supabaseClient])

    return (signedIn ? <SessionProvider supabase={supabase}>
        {children}
    </SessionProvider> : <>{children}</>)
}