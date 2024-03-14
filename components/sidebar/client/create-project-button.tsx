"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { useRef, useState } from "react";

export const CreateProject = () => {

    const ref = useRef<HTMLFormElement | null>(null)
    const [title, setTitle] = useState<string>("")
    const { createProject } = useSession().profile

    function submit() {
        createProject(title)
        setTitle("")
    }
    
    return <form ref={(newRef)=> ref.current = newRef} action={submit} className="justify-center whitespace-nowrap">
        <input value={title} onChange={(e)=>setTitle(e.currentTarget.value)} type="text" className="focus:outline-none w-full text-xs font-medium  px-5 py-2 rounded-md border-primary-100 border-[2px]" id="create-project" placeholder="Type here to create..." />
     </form>
}
  