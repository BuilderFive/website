'use client';

import { useEffect, useRef, useState } from 'react';

interface CtaButtonProps {
    target: string;
    children: React.ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ target, children }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' });

    const scrollTo = function (target: string) {
        const element = document.getElementById(target)
        element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x: `${x}px`, y: `${y}px` });
        }

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [])

    return (
        <button
            ref={ref}
            onClick={e => {
                e.preventDefault();
                scrollTo(target);
            }}
            className="relative w-32 h-9 overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90"
        >
            <span
                className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#1e3a8a_0%,transparent_70%)]"
                style={
                    {
                        left: mousePosition.x,
                        top: mousePosition.y,
                    } as any
                }
            ></span>
            <div className="relative h-8 z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/70 px-4 py-[0.3rem] text-xs text-blue-600 backdrop-blur-sm">
                <span className="text-sm font-medium items-center justify-center">
                    {children}
                </span>
            </div>
        </button>
    )
}