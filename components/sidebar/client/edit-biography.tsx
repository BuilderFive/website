"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { ChangeEvent, useRef, useState } from "react";

export const EditDescription = (initDesc: any) => {
    const [desc, setDesc] = useState<string>(initDesc.description)
    const [focused, setFocused] = useState<boolean>(false)
    const ref = useRef<HTMLFormElement | null>(null)

    function submit(formData: { get: (arg0: string) => any; }) {
        //add project to database and update cache
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        //update the description in the database
        setDesc(event.target.value)
    }
    
    return <form ref={(newRef)=> ref.current = newRef} action={submit} className="justify-center whitespace-nowrap">
        <textarea
        maxLength={100} 
        onKeyDown={(event) => {
            if (event.key === "Enter") {
                event.preventDefault()
                setFocused(false)
                ref.current?.requestSubmit()
            }
        }}
        //allow to be saved when user stops typing for 2 seconds
        readOnly={!focused} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="mt-2 font-light text-xs text-text-100 focus:outline-none bg-transparent w-full h-[80px] resize-none" 
        id="edit-desc" value={desc} rows={1}
        onChange={handleChange} 
        placeholder="Write an about me..."/>
     </form>
}
  