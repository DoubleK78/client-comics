"use client";
import { Adsense } from '@ctrl/react-adsense';

export default function AdBanner() {
    return process.env.googleAdsense ? (
        <div style={{
            width: '800px'
        }}>
            <Adsense
                client={process.env.googleAdsense}
                slot="1549460125"
                style={{ display: 'block' }}
                layout="in-article"
                format="fluid"
            />
        </div>
    ) : <></>;
};