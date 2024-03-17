import { SideBarProfile } from "@/components/sidebar/sidebars";
// import { useSession, useSupabaseClient } from "@/utils/hooks/SessionContext";
import AuthProvider from "../auth/auth-provider";
import UConnMap from "../../components/Map";
// import isMobile from "../utils/hooks/Helper";

export default function Test() {
  return (
    <AuthProvider>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <UConnMap />
        <div className="absolute self-end">
          <SideBarProfile />
        </div>
      </div>
    </AuthProvider>
  );
}
