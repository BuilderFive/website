import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { SideBarProfile } from "@/components/sidebar/sidebars";

export default function Test() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="absolute self-end">
        <SideBarProfile/>
      </div>
    </div>
  );
}
