"use client"

import { createClient } from "../supabase/client"
import { SessionProvider } from "./SessionContext"

export default function Provider({children}: any) {
    const supabase = createClient()
    return (<SessionProvider supabase={supabase}>
        {children}
    </SessionProvider>)
}