"use client";
import axios from "axios";
import { useEffect } from "react";
import dayjs from '@/lib/dayjs/dayjs-custom';
import { parseJsonFromString } from "@/lib/json";
import { encryptUrl } from "@/lib/security/securityHelper";
import { isIphone, isAndroid, isIpad } from 'devtools-detector';

type TimeApiModel = {
    dateTime?: Date | null;
}

const getUtcOnline = async () => {
    try {
        const response = await axios.get<TimeApiModel>('https://timeapi.io/api/Time/current/zone?timeZone=Etc/UTC');
        if (response.data?.dateTime) {
            return response.data?.dateTime;
        }

        return null;
    }
    catch (error) {
        return null;
    }
}

const OffsetTimeZoneGlobal: React.FC = () => {
    const checkMobileDevice = () => {
        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;

            if (!isIphone && !isIpad && !isAndroid
                && hasTouchScreen
                && navigator.maxTouchPoints > 0
                && window.screen.width >= 720) {
                hasTouchScreen = false;
            }

            try {
                if (hasTouchScreen && (navigator as any).platform?.toLowerCase().includes("win")) {
                    hasTouchScreen = false;
                }
            }
            catch { }
        } else if ("msMaxTouchPoints" in navigator) {
            hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;

            if (!isIphone && !isIpad && !isAndroid
                && hasTouchScreen
                && (navigator as any).msMaxTouchPoints > 0
                && window.screen.width >= 720) {
                hasTouchScreen = false;
            }

            try {
                if (hasTouchScreen && (navigator as any).platform?.toLowerCase().includes("win")) {
                    hasTouchScreen = false;
                }
            }
            catch { }
        } else {
            const mQ = matchMedia?.("(pointer:coarse)");
            if (mQ?.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ("orientation" in window) {
                hasTouchScreen = true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = (navigator as any).userAgent;
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }

        return hasTouchScreen;
    }

    useEffect(() => {
        if (!checkMobileDevice()) {
            const offset = parseJsonFromString<number | null>(sessionStorage.getItem("symbol"));
            const offsetRequestedOnUtc = parseJsonFromString<Date | null>(localStorage.getItem("symbolRequestedOnUtc"));

            if (!offset || dayjs.utc(offsetRequestedOnUtc) < dayjs.utc()) {
                sessionStorage.removeItem("symbol");
                sessionStorage.removeItem("symbolRequestedOnUtc");

                getUtcOnline().then((utc) => {
                    if (utc) {
                        const offset = dayjs(utc).utc(true).valueOf() - dayjs().utc().valueOf();

                        sessionStorage.setItem("symbol", encryptUrl(JSON.stringify(offset)));
                        sessionStorage.setItem("symbolRequestedOnUtc", JSON.stringify(dayjs.utc().add(5, 'minutes').toDate()));
                    }
                });
            }
        }
    }, []);

    return <></>;
}

export default OffsetTimeZoneGlobal;