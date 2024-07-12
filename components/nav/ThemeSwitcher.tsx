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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-9 px-0" color="white">
                    <SunIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme == "dark" && "-rotate-90 scale-0 opacity-[50%] text-transparent"}`} />
                    <MoonIcon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${theme == "dark" && "rotate-0 scale-100"} text-white`} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-background1 text-text1'>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}