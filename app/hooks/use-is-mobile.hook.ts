'use client';

import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || '';
            const isMobileUA = /iPhone|iPad|iPod|Android|Mobile/i.test(
                userAgent
            );
            const isNarrowScreen = window.innerWidth <= breakpoint;

            setIsMobile(isMobileUA || isNarrowScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}
