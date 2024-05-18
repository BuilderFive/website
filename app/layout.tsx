import { css } from '~/util';
import type { Metadata } from 'next';
import { Header } from '~/components/global/Header';
import { Footer } from '~/components/global/Footer';
import { Inter, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '~/components/ui/theme-provider';

import "~/styles/globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
    title: {
        default: 'BuilderFive',
        template: 'BuilderFive - %s',
    },
    description: "Where builders connect and collaborate offline",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </head>
            <body className={css("min-h-screen font-sans antialiased", sans.variable, mono.variable)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <div className="relative flex min-h-screen flex-col bg-cover bg-twighlight">
                      <Header />
                      <div className="flex-1">{children}</div>
                      <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
