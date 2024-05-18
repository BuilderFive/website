"use client";

import { Navigation } from '../nav/Navigation';
import { ThemeSwitcher } from '../nav/ThemeSwitcher';
import { MobileNavigation } from '../nav/NavigationMobile';

export const Header: React.FC = () => (
    <header className="top-3 z-40 w-full">
      <div className="flex-row max-md:h-16 py-[12px] px-[48px] items-center justify-center space-x-[48px] border-[2px]">
            <Navigation />
            <MobileNavigation />
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <nav className="flex items-center">
                    <ThemeSwitcher />
                </nav>
            </div>
        </div>
    </header>
)