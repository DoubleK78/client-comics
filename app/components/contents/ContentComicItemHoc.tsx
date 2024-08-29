"use client";
import { EStorageType } from "@/app/models/enums/EStorageType";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ContentComicItemV3 from "./ContentComicItemV3";
import ContentComicItemV6 from "./ContentComicItemV6";
import { addListener, launch, isIphone, isAndroid, isIpad } from 'devtools-detector';
import { parseJsonFromString } from "@/lib/json";
import { decryptUrl } from "@/lib/security/securityHelper";

type ContentComicItemHocProps = {
    imageUrls?: string[];
    storageType: EStorageType;
}

export default function ContentComicItemHoc({ imageUrls, storageType }: ContentComicItemHocProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDevtoolsOpen, setIsDevtoolsOpen] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
                const isWindows = (navigator as any).platform?.toLowerCase().includes("win");
                if (hasTouchScreen && isWindows) {
                    hasTouchScreen = false;
                }

                if (hasTouchScreen && !isWindows && !isIphone && !isIpad && !isAndroid) {
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

    const handleDevToolsChange = (isOpen: boolean) => {
        if (isOpen) {
            if (!timeoutRef.current) {
                // If dev tools are open, start the timeout
                timeoutRef.current = setTimeout(() => {
                    const vmode = parseJsonFromString<string | null>(sessionStorage.getItem('vmode')) === decryptUrl('i5yw135');
                    if (isOpen && !vmode) {
                        // Redirect to the home page
                        window.location.href = '/';
                    }
                }, 5000); // 5 seconds
            }
        } else {
            // If dev tools are closed, clear the timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    };

    useEffect(() => {
        setIsMobile(checkMobileDevice());
    }, []);

    useEffect(() => {
        const isMobile = checkMobileDevice();

        addListener(isOpen => {
            setIsDevtoolsOpen(isOpen);

            if (!isMobile) {
                handleDevToolsChange(isOpen);
            }
        });

        launch();
    }, [isDevtoolsOpen]);

    const ElementMemo = useMemo(() => {
        return (
            <>
                {(isDevtoolsOpen || !isMobile) ? imageUrls?.map((item) => {
                    return <ContentComicItemV6 key={uuidv4()} storageType={storageType} imageUrl={item} />
                }) : imageUrls?.map((item) => {
                    return <ContentComicItemV3 key={uuidv4()} storageType={storageType} imageUrl={item} />
                })}
            </>
        );
    }, [isDevtoolsOpen, isMobile, imageUrls])

    return ElementMemo;
}