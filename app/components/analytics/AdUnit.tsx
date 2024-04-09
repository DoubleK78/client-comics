"use client";
import { Adsense } from '@ctrl/react-adsense';

export default function AdUnit() {
    return process.env.googleAdsense ? (
        <Adsense
            client={process.env.googleAdsense}
            slot="3731403350"
            style={{ display: 'block' }}
            format="auto"
            responsive="true"
        />
    ) : <></>;
};