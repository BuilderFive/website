"use client"

import DeployButton from "../components/DeployButton";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { SessionProvider, useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { sign } from "crypto";

export default function Index() {

  const supabase = createClient();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error) throw error;
          setSignedIn(user ? true : false)
      } catch (error) {
          //error handling
      }
    }
    fetchUser()
  },[supabase])

  const signOut = () => {
    supabase.auth.signOut()
    router.push("/login");
  }

  return (signedIn ? <div>
    <div>
      <div>Signed in</div>
        <button
          onClick={()=>signOut()}
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
        <Link
          href="/test"
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          To Test
          </Link>
    </div>
  </div> :  <div>
      <div>Signed Out</div>
        <Link
          href="/login"
          className="py-2 px-3 flex justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Login
          </Link>
    </div>);
}
