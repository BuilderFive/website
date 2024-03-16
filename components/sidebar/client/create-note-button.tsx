"use client"

import { useSession } from "@/utils/hooks/SessionContext";
import { Tables } from "@/utils/supabase/database.types";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";


export const CreateNote = ({projectUUID, handleAddNote}: {projectUUID: string, handleAddNote: any}) => {

    const ref = useRef<HTMLFormElement | null>(null)
    const [title, setTitle] = useState<string>("")
    const [thought, setThought] = useState<string>("")
    const { createNote } = useSession().profile

    const canSubmit = () => {
       return title.trim() !== "" && thought.trim() !== ""
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (canSubmit()) {
            const newNote = await createNote(title, thought, projectUUID);
            handleAddNote(newNote)
            setTitle("");
            setThought("");
        }
    };

    // ...

    return (
        <form
            ref={(newRef) => (ref.current = newRef)}
            onSubmit={handleSubmit}
            className="relative whitespace-nowrap flex flex-col justify-start border-primary-300 border-[1px] p-[2px] rounded-md flex-grow flex">
            {/* ... */}
            <input required autoFocus value={title} onChange={(e)=>setTitle(e.currentTarget.value)} type="text" 
                className="focus:outline-none bg-transparent w-full text-xs font-medium  px-2 py-2 rounded-md" id="create-note-title" placeholder="Type a title..." />
            <textarea required
                value={thought}
                onChange={(e) => setThought(e.currentTarget.value)}
                className="focus:outline-none bg-transparent resize-none w-full text-xs font-medium px-2 py-2 rounded-sm"
                id="create-note-thought"
                placeholder="Write a thought..."
                rows={1}/>
            <button disabled={!canSubmit()} className={`${canSubmit() ? "bg-success-100" : "bg-text-300 cursor-no-drop"} absolute bottom-1 right-1 self-end p-[4px] w-fit rounded-md flex flex-row gap-[4px] justify-between items-center text-text-100`} type="submit"><FiSend color={'hsl(var(--text-1))'} /></button>
        </form>
    );
}
  