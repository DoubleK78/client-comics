"use client"
import { useRef, useState, useEffect } from "react";
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
    const [isTabFocused, setIsTabFocused] = useState<boolean>(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabFocused(document.visibilityState === 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleDetection = () => {
         if (!requestedRef.current) {
            const checkFocusAndTimeout = () => {
                if (isTabFocused) {
                    setTimeout(async () => {
                        if (isTabFocused) {
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
                        } else {
                            checkFocusAndTimeout(); // Check again after a short delay
                        }
                    }, 10000); // 10 seconds delay
                } else {
                    setTimeout(checkFocusAndTimeout, 1000); // Check again after 1 second
                }
            };

            checkFocusAndTimeout();
        }
    };

    return <ScrollDetection threshold={1600} onDetect={handleDetection} />;
}

export default AccumulateChap;