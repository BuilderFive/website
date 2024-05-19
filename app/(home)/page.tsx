
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

export default function Home() {
    return (
        <div className="w-full relative">
            {/** <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 mt-7 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
                <Badge variant="secondary" className="text-sm py-1 mb-6">
                    <a href="https://producthunt.com/abc" target="_blank" rel="noopener noreferrer">
                        <MdiIcon path={mdiAlphaPCircle} size="20px" className="inline-block mr-2 text-orange-600" />
                        Check us out on ProductHunt
                        <MdiIcon path={mdiArrowRight} size="20px" className="inline-block ml-2 align-text-top" />
                    </a>
                </Badge>

                <div className="relative z-[-1] flex before:absolute before:h-[300px] before:w-full before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-20 after:dark:from-sky-900 after:dark:via-[#1d4ed8] after:dark:opacity-60 sm:before:w-[680px] sm:after:w-[240px] before:lg:h-[280px] before:-m-[3rem]">
                    <div className="relative">
                        <h1 className={css(
                            'font-mono text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] mb-3 text-transparent bg-clip-text bg-gradient-to-br',
                            'from-indigo-500 from-15% via-blue-400 via-50% to-indigo-500 to-90%',
                            'dark:from-indigo-300 dark:from-15% dark:via-blue-200 dark:via-50% dark:to-indigo-300 dark:to-90% dark:drop-shadow-[0_0_0.3rem_#ffffff70]',
                        )}>
                            BuilderFive
                        </h1>
                        <p className="max-w-[500px] text-center tracking-tight text-2xl sm:text-2xl">
                            Meet with local like-minded innovators on your campus in person
                        </p>
                    </div>
                    </div>

                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
                    <CtaButton target="rsvp">
                        Sign Up
                    </CtaButton>
                </div>
            </section> */}
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