
"use client"

import React, { MouseEventHandler, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import OptionsButton from "./toggle-activity-button";

export default function Options(){ 
    const Header = () => {
        return <div className="text-base font-extrabold text-text-100">Options</div>
    }
    const DisplayProject = () => {
        
        return <div className="flex gap-1 py-1 mt-2 text-xs font-semibold rounded-lg shadow-sm items-center">
            <OptionsButton/>
            <div className="flex gap-1 self-start">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e971a656a8cb5bc9190e79073d09f45b51ead171fc7c877f3df9046a91f6f9?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" />
                <div className="flex-auto text-text-100">Online</div>
            </div>
        </div>
    }
    return(<section className="flex flex-col px-1.5 pt-4 pb-2 mt-5 w-full bg-primary-200 rounded-lg max-w-[180px] text-text-100">
        <Header/>
        <DisplayProject/>
    </section>)
}