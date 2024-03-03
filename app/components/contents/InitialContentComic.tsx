"use client";

import { setHistory } from "@/app/utils/HelperFunctions";
import { useEffect } from "react"

export default function InitialContentComic({ isValid }: { isValid: boolean }) {
    useEffect(() => {
        // Server is loaded by exact current chapter
        if (isValid) {
            setHistory(window.location.href);
        }
    }, [isValid]);

    return (
        <></>
    )
}