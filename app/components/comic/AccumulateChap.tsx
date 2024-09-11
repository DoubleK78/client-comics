"use client"
import { useEffect, useRef, useState } from "react";
import ScrollDetection from "../common/ScrollDetection";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import { generateSimpleToken } from "@/lib/security/simpleTokenHelper";
import { parseJsonFromString } from "@/lib/json";
import dayjs from "dayjs";
import { decryptUrl, encryptUrl } from "@/lib/security/securityHelper";

type Props = {
    isBot: boolean;
    collectionId?: number | null;
    createdOnUtc?: Date | null;
    previousCollectionId?: string | string[] | undefined
}

const requestAccumulateChap = async (token: string) => {
    try {
        const response = await axiosClientApiInstance.put<string | null>('/api/misc/accumulate', {
            token
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

const AccumulateChap: React.FC<Props> = ({ isBot, collectionId, createdOnUtc, previousCollectionId }: Props) => {
    const requestedRef = useRef<boolean>(false);
    const [isUserOnScreen, setIsUserOnScreen] = useState<boolean>(false);
    const [observableActive, setObservableActive] = useState<boolean>(false);
    const presenceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial or Checking Lasted Accumulate Chap Request
        const lastedAccumulateChapJson = localStorage.getItem('ltamc');
        if (!lastedAccumulateChapJson) {
            localStorage.setItem('ltamc', encryptUrl((JSON.stringify(dayjs.utc().add(-20, 'seconds').toDate()))));
        }
    }, []);

    const handleDetection = async () => {
        if (!requestedRef.current) {
            const lastedAccumulateChap = parseJsonFromString<Date | null>(decryptUrl(localStorage.getItem('ltamc')));

            // Check if it's been 30 seconds since the last accumulate chap request
            // If it has after 30 seconds, send a new accumulate chap request
            if (lastedAccumulateChap && dayjs.utc().diff(dayjs.utc(lastedAccumulateChap), 'seconds') >= 30) {
                const payload = {
                    isBot,
                    collectionId,
                    createdOnUtc,
                    previousCollectionId: Number(previousCollectionId),
                    timestamp: Date.now(),
                    expiresIn: 10000
                };

                const token = await generateSimpleToken(payload);

                await requestAccumulateChap(token);

                localStorage.setItem('ltamc', encryptUrl((JSON.stringify(dayjs.utc().toDate()))));
            }

            requestedRef.current = true;
        }
    };

    useEffect(() => {
        if (isUserOnScreen && !requestedRef.current) {
            if (!presenceTimerRef.current) {
                // Start a 10-second timer when the user is on screen
                presenceTimerRef.current = setTimeout(() => {
                    handleDetection();
                }, 10000);
            }
        } else if (presenceTimerRef.current) {
            // Clear the timer if the user leaves the screen before 10 seconds
            clearTimeout(presenceTimerRef.current);
            presenceTimerRef.current = null;
        }

        // Clean up the timer when the component is unmounted or when isUserOnScreen changes
        return () => {
            if (presenceTimerRef.current) {
                clearTimeout(presenceTimerRef.current);
            }
        };
    }, [isUserOnScreen]);

    const handleTriggerObservable = () => {
        setObservableActive(true);
    };

    useEffect(() => {
        if (observableActive) {
            const handleVisibilityChange = () => {
                setIsUserOnScreen(document.visibilityState === 'visible');
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Set the initial value of isUserOnScreen when active
            setIsUserOnScreen(true);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        }
    }, [observableActive]);

    return <ScrollDetection threshold={5000} onDetect={handleTriggerObservable} />;
};

export default AccumulateChap;