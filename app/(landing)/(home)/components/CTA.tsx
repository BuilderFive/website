'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { MdiIcon, css } from '~/util';
import { mdiAccountGroup, mdiMapLegend } from '@mdi/js';

export default function CTA() {
    return <div id="CTA" className="flex flex-row flex-wrap max-w-container justify-between w-full bg-background4 p-[48px]">
       
       <div className='flex flex-grow justify-center'>
        </div>
        <div className='flex flex-grow justify-center'>
        <img loading="lazy"
                src="static/rocket-man.svg"
                alt="Visual representation of startup community"
                className="self-center max-w-full aspect-square w-[320px] max-md:w-[180px]"
                />
        </div>
       
    </div>
}