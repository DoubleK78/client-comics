"use client"
import { useEffect, useRef, useState } from "react";
import ScrollDetection from "../common/ScrollDetection";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import { generateSimpleToken } from "@/lib/security/simpleTokenHelper";

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

    const handleDetection = async () => {
        if (!requestedRef.current) {
            const payload = {
                isBot,
                collectionId,
                createdOnUtc,
                previousCollectionId: Number(previousCollectionId),
                timestamp: Date.now(),
                expiresIn: 60000
            };

            const token = await generateSimpleToken(payload);

            await requestAccumulateChap(token);
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