"use client"

import { useEffect } from "react"
import { addListener, launch, } from 'devtools-detector';
import dayjs from "@/lib/dayjs/dayjs-custom";

export default function ClearSearchParams() {
    useEffect(() => {
        const date = dayjs.utc().subtract(1, 'months').format('YYYY-MM-DD');
        const isSkip = window.location.search?.includes(date);

        const params = new URLSearchParams(window.location.search);
        params.delete('page');
        window.history.replaceState({}, '', `${window.location.pathname}`);

        if (!isSkip && !isPwa()) {
            const child = document.querySelector(".row.text-center.pt-4");
            if (child && child.parentNode) {
                child.addEventListener("contextmenu", function (ev) {
                    ev.preventDefault();
                });
            }

            addListener(isOpen => {
                if (isOpen) {
                    const child = document.querySelector(".row.text-center.pt-4");
                    if (child) {
                        child.parentNode?.removeChild(child);
                    }
                }
            });
            launch();
        }
    }, []);

    const isPwa = () => {
        const displayModes = [
            // "fullscreen",
            "standalone",
            // "minimal-ui"
        ];
        return displayModes.some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches);
    }

    return <></>;
}