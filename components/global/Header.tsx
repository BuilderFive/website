"use client";

import { Navigation } from '../nav/Navigation';
import { ThemeSwitcher } from '../nav/ThemeSwitcher';
import { MobileNavigation } from '../nav/NavigationMobile';

export const Header: React.FC = () => (
    <header className="top-3 z-40 w-full">
      <div className="flex flex-row w-full justify-between max-md:h-16 py-[24px] px-[24px] items-center justify-center">
            <Navigation />
            
            <MobileNavigation />
            <div className="flex md:justify-end w-fit">
                <nav className="flex items-center">
                    <ThemeSwitcher />
                </nav>
            </div>
        </div>
    </header>
)