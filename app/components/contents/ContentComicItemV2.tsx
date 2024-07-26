"use client"
import React from 'react';
import LazyLoad from 'react-lazyload';
import Image from 'next/image'

export function ContentComicItemV2({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
            <LazyLoad height={1000} once={false} offset={1600}
                placeholder={<Image
                    src="/assets/media/1.1_abcda.png"
                    alt=""
                    height={1000}
                    width={800}
                />}
                unmountIfInvisible={true}>
                <img
                    src={"https://www.albertjuhe.com/images/01.jpg"}
                    alt=""
                    width={800}
                />
            </LazyLoad>
        </div>
    )
}

export default ContentComicItemV2;