"use client";
import { EStorageType } from "@/app/models/enums/EStorageType";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ContentComicItemV3 from "./ContentComicItemV3";
import ContentComicItemV4 from "./ContentComicItemV4";
import { addListener, launch, isIphone, isAndroid, isIpad } from 'devtools-detector';

type ContentComicItemHocProps = {
    imageUrls?: string[];
    storageType: EStorageType;
}

export default function ContentComicItemHoc({ imageUrls, storageType }: ContentComicItemHocProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDevtoolsOpen, setIsDevtoolsOpen] = useState<boolean>(false);

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
        } else if ("msMaxTouchPoints" in navigator) {
            hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;

            if (!isIphone && !isIpad && !isAndroid
                && hasTouchScreen
                && (navigator as any).msMaxTouchPoints > 0
                && window.screen.width >= 720) {
                hasTouchScreen = false;
            }
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
        setIsMobile(checkMobileDevice());
    }, []);

    useEffect(() => {
        addListener(isOpen => {
            setIsDevtoolsOpen(isOpen);
        });

        launch();
    }, [isDevtoolsOpen]);

    const ElementMemo = useMemo(() => {
        return (
            <>
                {(isDevtoolsOpen || !isMobile) ? imageUrls?.map((item) => {
                    return <ContentComicItemV4 key={uuidv4()} storageType={storageType} imageUrl={item} />
                }) : imageUrls?.map((item) => {
                    return <ContentComicItemV3 key={uuidv4()} storageType={storageType} imageUrl={item} />
                })}
            </>
        );
    }, [isDevtoolsOpen, isMobile, imageUrls])

    return ElementMemo;
}