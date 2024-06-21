
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

export default function Home() {
    return (
        <div className="w-full relative">
            <div className='z-20 relative flex flex-col space-y-[256px] pb-[256px]'>
                <Hero />
                {/*<HowItWorks />
                <FeatureGrid />*/}
            </div>
            {/*<FeatureFooter/>
            <CTA/>*/}
            
        </div>
    );
}