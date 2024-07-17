"use client";

import { Navigation } from '../nav/Navigation';
import { ThemeSwitcher } from '../nav/ThemeSwitcher';
import { MobileNavigation } from '../nav/NavigationMobile';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';

export const Header: React.FC = () => (
    <header className="top-3 z-40 w-full">
      <div className="flex flex-row w-full md:justify-between max-md:h-16 py-[24px] px-[24px] items-center text-white">
            <Navigation />
            <MobileNavigation />
            
            <div className="flex justify-between w-fit max-md:w-full items-center space-x-[24px]">
                <Link href="/connect" className="flex flex-row gap-[12px] items-center hover:cursor-pointer p-[12px] rounded-[12px] hover:font-semibold">
                    <p className='text-text1 text-xl font-regular max-md:hidden'>Go to Globe</p>
                    <FaEarthAmericas size='30px' color="var(--text-1)"/>
                </Link>
               <nav className="flex items-center relative">
                    <ThemeSwitcher />
                </nav>
            </div>
        </div>
    </header>
)