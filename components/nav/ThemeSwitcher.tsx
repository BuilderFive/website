"use client"

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()

    return (
        <Button variant="ghost" className="w-9 px-0" onClick={()=>{ 
            setTheme(theme == "dark" ? "light" : "dark")
        }}>
            <div className='absolute opacity-[15%] bg-text1 rounded-full p-[24px]'/>
            <SunIcon color="var(--text-1)" className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme == "dark" && "-rotate-90 scale-0 opacity-[0%]"}`} />
            <MoonIcon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${theme == "dark" && "rotate-0 scale-100"}`} />
            
    </Button>
    )
}