"use client";

import { useEffect } from "react";

export default function AdBanner(props: any) {
    if (!process.env.googleAdsense) {
        return <></>;
    }

    useEffect(() => {
        try {
            if ((window as any).adsbygoogle && !(window as any).adsbygoogle.loaded) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: 'block',
                textAlign: 'center',
                width: '800px'
            }}
            data-ad-client={process.env.googleAdsense}
            {...props}
        />
    );
};