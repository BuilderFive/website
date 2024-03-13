"use client"

import DeployButton from "../components/DeployButton";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Index() {

  const session = useSession();
  const router = useRouter();

  const signOut = () => {
    session.supabase?.auth.signOut()
    router.push("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {session.user ? <button
            onClick={()=>signOut()}
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button> : <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Login
          </Link>}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {session.supabase ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
