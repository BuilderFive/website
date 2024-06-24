'use client';

import { css } from '~/util';
import { buttonVariants } from '../ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export const Footer: React.FC = () => (
    <footer className="md:px-8 py-6 bg-background4 text-white">
        <div className="flex-col items-center justify-between gap-4 m:6-24 md:flex-row md:flex hidden">
            <div className="font-mono text-center text-muted-background md:text-left">
                <a href="https://www.builderfive.com" className="font-bold text-blue-400 hover:text-blue-400/60">
                    BuilderFive
                </a>{" "} &copy; {new Date().getFullYear()}
            </div>
            <div className="flex gap-1">
                <a
                    href="https://www.linkedin.com/company/builderfive/"
                    rel="LinkedIn Page"
                    target="_blank"
                    className={css( 'group', buttonVariants({ variant: 'ghost' }))}
                >
                    <LinkedInLogoIcon className="h-6 w-6 group-hover:text-blue-400" />
                </a>
                <a
                    href="https://www.instagram.com/builderfive.community/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={css('group', buttonVariants({ variant: 'ghost' }))}
                >
                    <InstagramLogoIcon className="h-6 w-6 group-hover:text-pink-400" />
                </a>
            </div>
        </div>
    </footer>
);