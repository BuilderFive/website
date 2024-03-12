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
