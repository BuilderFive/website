'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from '~/util/AuthProvider';

interface CtaButtonProps {
    children: React.ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ children }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { handleSignInWithGoogle } = useSession();

    return (
        <button onClick={handleSignInWithGoogle}
            ref={ref}
            className="w-full flex flex-row py-[24px] gap-[12px] rounded-[12px] items-center justify-center bg-background1 hover:cursor-pointer hover:bg-secondary4">
            
            <img className='w-6 h-6' src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo"/>
            <p className='text-text3 font-semibold text-[24px]'>Get a free account in 5 seconds</p>
        </button>
    )
}