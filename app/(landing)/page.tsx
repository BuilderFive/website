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
import CTA from './(home)/components/CTA';
import HowItWorks from './(home)/components/HowItWorks';
import { Globe } from './(home)/components/globe/Globe';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '~/util/AuthProvider';
import DemoGlobe from './(home)/components/globe/DemoGlobe';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    const router = useRouter()
    const { user } = useSession()

    useEffect(()=> {
        if (user) {
            router.push('/connect')
        }
    },[user])
    
    return (
        <div className="w-full relative">
            <Hero loaded={loaded} setLoaded={setLoaded}/>
            
            <HowItWorks />
            {/*<FeatureFooter/>
            <CTA/>*/}
            <div className='w-full flex items-center justify-center my-[128px]'>
                <div className='w-full px-[48px] max-md:px-[12px]'>
                    <RsvpSection/>
                </div>
                
            </div>
            
        </div>
    );
}