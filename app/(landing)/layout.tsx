import { css } from '~/util';
import type { Metadata } from 'next';
import { Header } from '~/components/global/Header';
import { Footer } from '~/components/global/Footer';

import { Inter, Roboto_Mono, Poppins } from 'next/font/google';
import { ThemeProvider } from '~/components/ui/theme-provider';

import "~/styles/globals.css";
import "tailwindcss/tailwind.css"
import Script from 'next/script';
import { SessionProvider } from '~/util/AuthProvider';

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<div className="relative flex min-h-screen flex-col bg-cover bg-twighlight">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
    </div>);
}
