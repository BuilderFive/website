"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { ChangeEvent, useRef, useState } from "react";

export const EditDescription = (initDesc: any) => {
    const [desc, setDesc] = useState<string>(initDesc.bio)
    const [focused, setFocused] = useState<boolean>(false)
    const ref = useRef<HTMLFormElement | null>(null)
    const { profile } = useSession()

    const cachedTimeout: any = useRef(null)

    /**
     * Automatically saves to database after two seconds of no updates
     * @param new_desc 
     */
    const pushCache = (new_desc: string) => {
        if (cachedTimeout) {
            clearTimeout(cachedTimeout.current)
        }
        cachedTimeout.current = setTimeout(function() {
            // console.log(new_desc)
            //update the description in the database
            profile.saveAccount({bio: new_desc})
        }, 2000)
    }

    function submit() {
        //add project to database and update cache
        pushCache(desc)
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        //update the description in the database
        pushCache(event.target.value)
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
        className="mt-2 font-light text-xs text-text-100 focus:outline-none bg-transparent w-full h-[70px] resize-none" 
        id="edit-desc" value={desc} rows={1}
        onChange={handleChange} 
        placeholder="Write an about me..."/>
     </form>
}
  