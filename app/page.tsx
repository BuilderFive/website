"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthProvider from "./auth/auth-provider";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Index() {
  const { user, supabase, logout } = useSession();
  const [email, setEmail] = useState("");

  const handleInsert = async () => {
    try {
      const { data, error } = await supabase.from("rsvp").insert([{ email }]);
      if (error) {
        toast.error("Already registered!");
      } else {
        toast.success("Registered!");
      }
    } catch (error) {
      toast.error("Error registering!");
    }
  };

  return (
    <div
      className="size-full bg-cover"
      style={{ backgroundImage: 'url("/map.jpg")' }}
    >
      {user ? (
        <AuthProvider>
          <div>
            {/* Signed in */}
            <Link
              href="/test"
              className="absolute right-32 text-sm text-foreground top-8 py-2 px-4 justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="absolute right-8 text-sm text-foreground top-8 py-2 px-4 justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Logout
            </button>
          </div>
        </AuthProvider>
      ) : (
        <div>
          {/* Signed Out */}
          <Link
            href="/login"
            className="absolute right-8 text-sm text-foreground top-8 py-2 px-4 justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        </div>
      )}
      <div className="bg-black bg-opacity-50 min-h-screen flex justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Inov8rs.io</h1>
          <p className="text-xl mb-8">
            Meet with Friends and Complete Projects
          </p>
          <div className="mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="py-2 px-3 shadow-lg text-black w-64"
              placeholder="Enter your email"
            />
            <button
              onClick={handleInsert}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 shadow-lg"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
