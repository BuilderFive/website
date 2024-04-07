import { SideBarProfile } from "@/components/sidebar/sidebars";
// import { useSession, useSupabaseClient } from "@/utils/hooks/SessionContext";
import AuthProvider from "../auth/auth-provider";
// import UConnMap from "../../components/Map";
// import isMobile from "../utils/hooks/Helper";

export default function Test() {
  return (
    <AuthProvider>
      {/* <UConnMap /> */}
      <div></div>
    </AuthProvider>
  );
}
