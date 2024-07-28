"use client"
import { EStorageType } from '@/app/models/enums/EStorageType';
import { generateImageUrlByStorageType } from '@/app/utils/HelperFunctions';
import { decryptUrl } from '@/lib/security/securityHelper';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

export function ContentComicItemV3({ imageUrl, storageType }: { imageUrl: string, storageType: EStorageType }) {
    const [originUrl, setOriginUrl] = useState<string>('');

    useEffect(() => {
        const fileName = decryptUrl(imageUrl);
        const url = generateImageUrlByStorageType(storageType, fileName);
        setOriginUrl(url);
    }, []);

    const onError = () => {
        setOriginUrl("/assets/media/404/1.1_abcda.jpg");
    }

    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
            <LazyLoad height={1000} once={false} offset={1600}>
                <img
                    src={originUrl}
                    onError={onError}
                    alt=""
                    width={800}
                />
            </LazyLoad>
        </div >
    )
}

export default ContentComicItemV3;