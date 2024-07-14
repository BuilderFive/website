"use client"

import { useState, ChangeEvent, KeyboardEvent } from "react"
import { useSession } from "~/util/AuthProvider"

export default function EmptyBubble({topic, packagedGroup, createGroup, leaveGroup}) {
    //this bubble is shown whenever the user's packaged group is null
    const [prompt, setPrompt] = useState("")
    const [characterCount, setCharacterCount] = useState(0)
    const { event } = useSession()

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value) 
        setCharacterCount(e.target.value.length)
    }

    const handleSubmit = async(e: KeyboardEvent<HTMLTextAreaElement>) => {
        
        if (packagedGroup) {
            //means user is currently in a call. Leave the group
            const response = await leaveGroup();
        }
        //check if user is already in a group, if so call leaveGroup and await for user confirmation
        createGroup(prompt)
    }

    return <div className="flex flex-col w-[240px] h-[280px]">
        <div className="w-full h-[50%]">
            <div className="flex flex-col items-center w-full h-fit rounded-[12px] bg-background1 p-[12px]">
                <form onSubmit={e => e.preventDefault()} className="w-full relative">
                    <textarea disabled={event?.isActive ? false : true}
                        value={prompt} onClick={e => e.currentTarget.focus()}
                        minLength={5} maxLength={60} rows={2}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                e.currentTarget.blur();
                                handleSubmit(e);
                                
                            }
                        }}
                        className="bg-background3 w-full rounded-[12px] p-[12px] resize-none"
                        placeholder={!event?.isActive ? "You're a little early. Can't start a call just yet... please hold!" : `What about ${topic} would you like to discuss?`}
                        onChange={handleChange}/>
                    <div className="absolute bottom-2 right-2">
                        <p className="text-text3 font-light">{characterCount}/60</p>
                    </div>
                </form>
                <p>Press enter to create</p>
            </div>
        </div>
    </div>
}