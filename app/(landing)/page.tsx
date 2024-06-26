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
import { useState } from 'react';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-full relative">
            <Hero loaded={loaded} setLoaded={setLoaded}/>
            
            <HowItWorks />
            {/*<FeatureFooter/>
            <CTA/>*/}
            <div className='w-full flex items-center justify-center my-[128px]'>
                <div className='max-w-[800px] w-full bg-background1 p-[48px] rounded-[12px]'>
                    <RsvpSection setLoaded={setLoaded}/>
                </div>
                
            </div>
            
        </div>
    );
}