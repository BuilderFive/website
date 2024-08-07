import { css } from '~/util';
import type { Metadata } from 'next';
import { Header } from '~/components/global/Header';
import { Footer } from '~/components/global/Footer';

import { Inter, Roboto_Mono, Poppins } from 'next/font/google';
import { ThemeProvider } from '~/components/ui/theme-provider';

import "~/styles/globals.css";
import "tailwindcss/tailwind.css"
import Script from 'next/script';
import { SessionProvider, useSession } from '~/util/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<div className="relative bg-cover bg-landing">
        <div className='flex flex-col relative min-h-screen container'>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
        
    </div>);
}
