'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaRegHandPointer } from 'react-icons/fa6';
import { useSession } from '~/util/AuthProvider';

interface CtaButtonProps {
    children: React.ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ children }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
<button onClick={()=> {
    router.push('/connect')
    setLoading(true)
}}
        ref={ref}
        className="relative w-full flex flex-row rounded-[24px] p-[6px] items-center justify-center bg-gradient-to-r from-[var(--secondary-4)] to-[var(--secondary-1)] hover:cursor-pointer bg-[length:200%_200%] animate-gradient-x">
    <div className='w-full h-full flex flex-row gap-[12px] rounded-[24px] p-[24px] justify-center items-center bg-white'>
        {loading ? <FaSpinner className="animate-spin text-secondary1" size='24px'/> : <FaRegHandPointer size='24px' className='text-secondary1'/>}
        <p className='text-secondary1 font-semibold text-2xl max-md:text-lg'>{children}</p>
    </div>
</button>

    )
}