"use client";

import { Navigation } from '../nav/Navigation';
import { ThemeSwitcher } from '../nav/ThemeSwitcher';
import { MobileNavigation } from '../nav/NavigationMobile';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';

export const Header: React.FC = () => (
    <header className="top-3 z-40 w-full">
      <div className="flex flex-row w-full justify-between max-md:h-16 py-[24px] px-[24px] items-center justify-center text-white">
            <Navigation />
            <MobileNavigation />
            
            <div className="flex md:justify-end w-fit items-center space-x-[24px]">
                <Link href="/connect" className="flex flex-row gap-[12px] items-center hover:cursor-pointer hover:bg-background1 p-[12px] rounded-[12px]">
                    <p className='text-white text-[14px] font-regular '>Go to Globe</p>
                    <FaEarthAmericas/>
                </Link>
               <nav className="flex items-center">
                    <ThemeSwitcher />
                </nav>
            </div>
        </div>
    </header>
)