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
import {NextUIProvider} from "@nextui-org/react";
import { GroupProvider } from '~/util/GroupProvider';
import { ProfileProvider } from '~/util/ProfileProvider';

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: '--font-mono' });
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });

export const metadata: Metadata = {
    title: {
        default: 'BuilderFive',
        template: 'BuilderFive - %s',
    },
    description: "Where builders collaborate in masterminds to turn ideas into products.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        type: "website",
        url: "https://BuilderFive.com",
        title: "BuilderFive",
        description: "Where builders collaborate in masterminds to turn ideas into products.",
        siteName: "BuilderFive",
        images: [{
          url: "https://BuilderFive.com/static/logos/logo-image.png",
        }],
    },
    

};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <Script id="Google-Analytics-1"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script strategy="lazyOnload" id="Google-Analytics-2">
            {` 
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
                });
            `}
        </Script>
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <link rel="icon" href="https://www.builderfive.com/favicon.ico?v=2" />
            </head>
            <body className={css("min-h-screen font-poppins antialiased", sans.variable, mono.variable, poppins.variable)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                <NextUIProvider>
                <SessionProvider>
                <GroupProvider>
                <ProfileProvider>
                    <div className="flex-1">{children}</div>
                </ProfileProvider>
                </GroupProvider>
                </SessionProvider>
                </NextUIProvider>
                </ThemeProvider>
            </body>
        </html></>
    );
}
