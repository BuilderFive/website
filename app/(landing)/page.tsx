"use client"
import { MdiIcon, css } from '~/util';
import { Badge } from '~/components/ui/badge';
import { CtaButton } from './(home)/components/CtaButton';
import { AppSection } from './(home)/components/AppSection';
import { RsvpSection } from './(home)/components/RsvpSection';
import { FeatureGrid } from './(home)/components/FeatureGrid';
import { mdiAlphaPCircle, mdiArrowRight } from '@mdi/js';
import Hero from './(home)/components/Hero';
import FeatureFooter from './(home)/components/FeatureFooter';
import CTA from './(home)/components/Problem';
import HowItWorks from './(home)/components/HowItWorks';
import { Globe } from './(home)/components/globe/Globe';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '~/util/AuthProvider';
import DemoGlobe from './(home)/components/globe/DemoGlobe';
import CaseStudy from './(home)/components/Problem';
import Superiority from './(home)/components/SiteSuperiority';
import HeroCollage from './(home)/components/HeroCollage';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    const router = useRouter()
    const { user, event } = useSession()

    useEffect(()=> {
        if (user && event?.isActive) {
            router.push('/connect')
        }
    },[user])
    
    return (
        <div className="container relative">
            <Hero loaded={loaded} setLoaded={setLoaded}/>
            
            <div className='w-full relative flex flex-col gap-[256px] my-[256px] max-md:my-[64px] max-md:gap-[64px]'>
                <HeroCollage />
                <CaseStudy/>
                <div id="video" className='relative w-full h-full rounded-[24px] p-[24px] bg-black'>
                    <video className="z-10 w-full h-full" controls>
                        <source src={"/audio-room.mp4"} type="video/mp4" />
                    </video>
                    <div className="flex w-full items-end justify-end">
                        <Link href={'/demo'} className="hover:cursor-pointer flex flex-row gap-[12px] items-center p-[12px] px-[24px] w-fit rounded-[24px] items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
                            <p className="text-white text-xl max-md:text-md font-medium ">Click to Play with Demo</p>
                            <FaExternalLinkAlt className="text-white h-[24px] w-[24px]" />
                        </Link>
                    </div>
                </div>
                
            </div>
            <iframe id="google-calendar" src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&bgcolor=%23ffffff&src=Y18yNzk2ODA4NmViMDk0NDUxZmNkY2NhMzBlNTg2NTA1N2JmMzA1ZTBhYTczZDZiZWQ2MTVhMDllZjcxMjJhZjVlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5`} className="min-h-[600px] max-h-[1080px] w-full h-full"  scrolling="no"></iframe>

        </div>
    );
}