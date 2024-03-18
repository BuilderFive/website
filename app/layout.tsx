import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SessionProvider } from "@/utils/hooks/SessionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../public/innov8rs-icon-logo-white.png";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Innov8rs",
  description: "The place where innovators collaborate in real-time",
  favicon: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
       <Head>
        <link rel="Innov8rs Icon" href="./public/innov8rs-icon-logo-white.png" />
      </Head>
      <link rel="icon" type="image" href="../innov8rs-icon-logo-white.png" />
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
            <SessionProvider>{children}</SessionProvider>
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
