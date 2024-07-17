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
        className="relative w-full flex flex-row rounded-[24px] p-[6px] items-center justify-center bg-gradient-to-r from-[var(--secondary-4)] to-[var(--secondary-1)] hover:cursor-pointer bg-[length:200%_200%] animate-gradient-x">
    <div className='w-full h-full flex flex-row gap-[12px] rounded-[24px] p-[24px] justify-center items-center bg-white'>
        <img className='w-6 h-6' src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo"/>
        <p className='text-secondary1 font-semibold text-2xl max-md:text-lg'>{children}</p>
    </div>
</button>

    )
}