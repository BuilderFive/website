import { SideBarProfile } from "@/components/sidebar/sidebars";
import { useSession, useSupabaseClient } from "@/utils/hooks/SessionContext";
import AuthProvider from "../auth/auth-provider";
import Map from "../../components/Map";

export default function Test() {
  return (
    <AuthProvider>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Map />
        <div className="absolute self-end">
          <SideBarProfile />
        </div>
      </div>
    </AuthProvider>
  );
}
