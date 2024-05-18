'use client';

import { useRef } from 'react';
import { MdiIcon, css } from '~/util';
import { mdiAccountGroup, mdiMapLegend } from '@mdi/js';
import { motion, useTransform, MotionValue, useScroll } from 'framer-motion';

type Feature = {
    title: string;
    icon: JSX.Element;
    description: JSX.Element;
    image: string;
    imageAlt: string;
}

const Features: Array<Feature> = [
    {
        title: 'Builder Groups',
        icon: <MdiIcon path={mdiAccountGroup} size="33px" className="inline align-text-top" />,
        description: (
            <div>
                <p className="text-lg font-medium">Collaborate on startup issues with a group of five peers once a week.</p>
                <ul className="list-disc mt-6 ml-3">
                    <li>
                        Feel safe sharing intimate startup issues and successes with people who care
                    </li>
                    <li>
                        Gather valuable feedback and insights from outside opinions
                    </li>
                    <li>
                        Use in-app tokens for a group that lasts one week, pushing members to actively collaborate before time runs out
                    </li>
                    <li>
                        Work with like-minded ambitious people who will push each other to the next level
                    </li>
                    <li>
                        Start lasting friendships with entrepreneurs in your startup stage
                    </li>
                </ul>
            </div>
        ),
        image: '/static/feat-builder-groups.png',
        imageAlt: 'builder groups'
    },
    {
        title: 'Journey Map',
        icon: <MdiIcon path={mdiMapLegend} size="33px" className="inline align-text-top" />,
        description: (
            <div>
                <p className="text-lg font-medium">Track progress and receive structured guidance from reflecting on critical questions to help you feel prepared for your startup&apos;s next steps.</p>
                <ul className="list-disc mt-6 ml-3">
                    <li>
                        Document each part of your startup journey to help make informed decisions on your next moves
                    </li>
                    <li>
                        Reflect on your journey map with color gradients that visualize your tribulations and victories over time
                    </li>
                    <li>
                        50 structured questions will help you grow from 0 to 1, from an idea to making revenue
                    </li>
                    <li>
                        Answer hard questions to ensure you know the ins and outs of your initial market and product
                    </li>
                </ul>
            </div>
        ),
        image: '/static/feat-journey-map.png',
        imageAlt: 'journey map'
    }
]

const useParallax = (value: MotionValue<number>, distance: number) => useTransform(
    value,
    [0, 1],
    [-distance, distance]
);

interface FeatureElementProps {
    feature: Feature;
    flipped: boolean;
}

export const FeatureElement: React.FC<FeatureElementProps> = ({ feature, flipped }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    const y = useParallax(scrollYProgress, 100);

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div ref={ref} className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className={css(
                        'mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full',
                        flipped ? 'lg:order-last' : ''
                    )}>
                        <img src={feature.image} alt={feature.imageAlt} className="scale-75" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <motion.h2 className="text-2xl font-bold font-mono tracking-tighter sm:text-3xl xl:text-3xl/none text-blue-400" style={{ y }}>
                            {feature.icon} {feature.title}
                        </motion.h2>
                        <motion.div style={{ y }}>
                            {feature.description}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const FeatureGrid = () => (
    <>
        {
            Features.map((feature, i) => (
                <FeatureElement
                    key={i}
                    flipped={i % 2 === 0}
                    feature={feature}
                />
            ))
        }
    </>
)