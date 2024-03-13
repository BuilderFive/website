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
    const supabase = createClient();
    return <SessionProvider supabase={supabase}>
        {children}
    </SessionProvider>
}