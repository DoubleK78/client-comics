"use client"
import { useRef } from "react";
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

    const handleDetection = () => {
        if (!requestedRef.current) {
            setTimeout(async () => {
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
            }, 10000);
        }
    };

    return <ScrollDetection threshold={5000} onDetect={handleDetection} />;
}

export default AccumulateChap;