"use client"
import LazyLoad from "react-lazyload";
import AdBanner from "./AdBanner";

export default function LazyLoadAdBanner() {
    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter"
            style={{ display: 'flex', justifyContent: 'center' }}>
            <LazyLoad height={1000} once={true} offset={300}>
                <AdBanner />
            </LazyLoad>
        </div>
    );
}