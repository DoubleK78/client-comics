"use client"

import { useEffect } from "react"
// import { addListener, launch, } from 'devtools-detector';
import dayjs from "@/lib/dayjs/dayjs-custom";

export default function ClearSearchParams() {
    useEffect(() => {
        const date = dayjs.utc().subtract(1, 'months').format('YYYY-MM-DD');
        const isSkip = window.location.search?.includes(date);

        const params = new URLSearchParams(window.location.search);
        params.delete('page');
        window.history.replaceState({}, '', `${window.location.pathname}`);

        if (!isSkip) {
            const child = document.querySelector(".row.text-center.pt-4");
            if (child && child.parentNode) {
                child.addEventListener("contextmenu", function (ev) {
                    ev.preventDefault();
                });
            }

            const body = document.querySelector("body");
            if (body) {
                body.addEventListener("contextmenu", function (ev) {
                    ev.preventDefault();
                });
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                // Prevent F12
                if (e.key === 'F12') {
                    e.preventDefault();
                    return;
                }

                // Prevent Ctrl+Shift+I (Windows) and Cmd+Option+I (Mac)
                if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
                    (e.metaKey && e.altKey && e.key.toLowerCase() === 'i')) {
                    e.preventDefault();
                    return;
                }

                // Prevent Ctrl+Shift+J (Windows) and Cmd+Option+J (Mac)
                if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') ||
                    (e.metaKey && e.altKey && e.key.toLowerCase() === 'j')) {
                    e.preventDefault();
                    return;
                }

                // Prevent Ctrl+Shift+C (Windows) and Cmd+Option+C (Mac)
                if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') ||
                    (e.metaKey && e.altKey && e.key.toLowerCase() === 'c')) {
                    e.preventDefault();
                    return;
                }

                // Prevent Ctrl+U (View source)
                if (e.ctrlKey && e.key.toLowerCase() === 'u') {
                    e.preventDefault();
                    return;
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);

    return <></>;
}