"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { useRef } from "react";

export const CreateProject = () => {

    const ref = useRef<HTMLFormElement | null>(null)
    const session = useSession()

    function submit(formData: { get: (arg0: string) => any; }) {
        console.log(`Hello ${session.user?.['id']}`)
        ref.current?.reset()
        //add project to database and update cache
    }
    
    return <form ref={(newRef)=> ref.current = newRef} action={submit} className="justify-center whitespace-nowrap">
        <input type="text" className="focus:outline-none w-full text-xs font-medium  px-5 py-2 rounded-md border-primary-100 border-[2px]" id="create-project" placeholder="Type here to create..." />
     </form>
}
  