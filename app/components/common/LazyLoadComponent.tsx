"use client"
import LazyLoad from "react-lazyload";

type Props = {
    children: React.ReactNode;
    offset: number;
}

export default function LazyLoadComponent({ children, offset }: Props) {
    return (
        <LazyLoad height={1000} once={true} offset={offset}>
            {children}
        </LazyLoad>
    )
}