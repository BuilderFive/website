import MdiIcon from '@mdi/react';
import * as MdiIcons from '@mdi/js';

import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

// mdi wrapper
export const MdiRepo = MdiIcons as Record<string, string>;
export { MdiIcon };

export function css(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
