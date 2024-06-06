
import { MdiIcon, css } from '~/util';
import { Badge } from '~/components/ui/badge';
import { CtaButton } from './components/CtaButton';
import { AppSection } from './components/AppSection';
import { RsvpSection } from './components/RsvpSection';
import { FeatureGrid } from './components/FeatureGrid';
import { mdiAlphaPCircle, mdiArrowRight } from '@mdi/js';
import Hero from './components/Hero';
import FeatureFooter from './components/FeatureFooter';
import CTA from './components/CTA';
import HowItWorks from './components/HowItWorks';
import { Globe } from './components/globe/Globe';

export default function Home() {
    return (
        <div className="w-full relative">
            <div className='z-20 relative flex flex-col space-y-[256px] pb-[256px]'>
                <Hero />
                <HowItWorks />
                <FeatureGrid />
            </div>
            <FeatureFooter/>
            <CTA/>
            
        </div>
    );
}