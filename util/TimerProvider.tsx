"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';
import { Event, useSession } from './AuthProvider';

interface TimerContextProps {
    currentTime: Date;
}

const TimerContext = createContext<TimerContextProps>({
    currentTime: new Date()
});

export const useTimer = () => useContext(TimerContext);

/**
 * For all things that the auth needs to validate a user to use the app
 * Ensures a session is found before getting variables needed
 * @param props 
 * @returns 
 */
export function TimerProvider(props: React.PropsWithChildren) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);

    const calculateTimeRemaining = (now: Date, event: Event | null) => {
        const currentDate = now;
        const futureDate = (event ? (event.isActive ? event!!.end_at : event!!.start_at) : now);
    
        const timeDifference = futureDate.getTime() - currentDate.getTime();
        const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        const days = (weeks * 7) + Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds};
    };


    const contextObject = {
        currentTime
    };

    return (
        <TimerContext.Provider value={contextObject}>
            {props.children}
        </TimerContext.Provider>
    );
}