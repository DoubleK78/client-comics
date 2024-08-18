"use client"
import { EStorageType } from '@/app/models/enums/EStorageType';
import { generateImageUrlByStorageType } from '@/app/utils/HelperFunctions';
import { encrypt } from '@/lib/security/securitXorHelper';
import { decryptUrl } from '@/lib/security/securityHelper';
import React, { useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';

const generateTokenByImage = (url: string) => {
    const payload = {
        url
    };

    const token = encrypt(payload, 15000);
    return token;
}

const ContentComicImage = ({ initialSrc, imageUrl, onError, originHeight, setOriginHeight }: {
    initialSrc: string,
    imageUrl: string,
    onError: (event: React.SyntheticEvent<HTMLImageElement, Event>, imgRef?: React.RefObject<HTMLImageElement> | null) => void,
    originHeight?: number | null,
    setOriginHeight: (height: number) => void
}) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imgElement = imgRef.current;

        // Function to preload images
        const preloadImage = (url: any) => {
            const img = new Image();
            img.src = url;
        };

        // Preload initial and new images
        preloadImage(initialSrc);
        // preloadImage(imageUrl);

        const handleIntersection = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting && imgRef?.current) {
                    const token = generateTokenByImage(imageUrl);
                    imgRef.current.src = generateImageUrlByStorageType(EStorageType.S1, `images?token=${token}`);
                } else if (imgRef?.current) {
                    imgRef.current.src = initialSrc;
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            rootMargin: `1600px 0px 1600px 0px`,
            threshold: 0, // Trigger when 0% of the element is visible
        });

        if (imgElement) {
            observer.observe(imgElement);
        }

        return () => {
            if (imgElement) {
                observer.unobserve(imgElement);
            }
        };
    }, [initialSrc, imageUrl]);

    useEffect(() => {
        if (imgRef.current && !imgRef.current.src.includes('1.1_abcda.jpg')) {
            imgRef.current.style.height = `${originHeight}px`;
        }
    }, [originHeight]);

    return (
        <img
            ref={imgRef}
            src={initialSrc}
            onLoad={e => {
                if (!originHeight && !e.currentTarget.src.includes('1.1_abcda.jpg')) {
                    setOriginHeight(e.currentTarget.height);
                }
            }}
            onError={(event) => onError(event, imgRef)}
            alt=""
            width={800}
        />
    );
}

export function ContentComicItemV6({ imageUrl, storageType }: { imageUrl: string, storageType: EStorageType }) {
    const [originUrl, setOriginUrl] = useState<string>('');
    const [originHeight, setOriginHeight] = useState<number | null>(null);

    useEffect(() => {
        const fileName = decryptUrl(imageUrl);
        const url = generateImageUrlByStorageType(storageType, fileName);
        setOriginUrl(url);
    }, []);

    const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>, imgRef?: React.RefObject<HTMLImageElement> | null) => {
        if (imgRef && imgRef.current) {
            imgRef.current.src = "/assets/media/404/1.1_abcda.jpg";
            event.currentTarget.onerror = null;
        }
    }

    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
            <LazyLoad height={1000} once={false} offset={1600}>
                <ContentComicImage
                    initialSrc={generateImageUrlByStorageType(EStorageType.S1, "1.1_abcda.jpg")}
                    imageUrl={originUrl}
                    onError={onError}
                    originHeight={originHeight}
                    setOriginHeight={setOriginHeight} />
            </LazyLoad>
        </div >
    )
}

export default ContentComicItemV6;