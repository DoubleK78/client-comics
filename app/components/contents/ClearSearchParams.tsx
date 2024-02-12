"use client"

import { useEffect } from "react"

export default function ClearSearchParams() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete('page');
        window.history.replaceState({}, '', `${window.location.pathname}`);
    }, []);

    return <></>;
}