"use client";

import { useEffect, useState } from "react";

type Props = {
    albumFriendlyName: string | null;
    collectionfriendlyName: string | null;
    onClick: () => void;
    title: string | null;
}

const checkChapHistory = (albumNameParam: any, chapParam: any): string => {
    if (typeof window !== "undefined") {
        const history = localStorage.getItem("history_chap");
        if (history !== undefined && history) {
            let historyList;
            try {
                historyList = JSON.parse(history);
                if (!Array.isArray(historyList)) {
                    historyList = [];
                }
            } catch (error) {
                historyList = [];
            }
            if (historyList.find((item: any) => item.albumName === albumNameParam && item.chap === chapParam) !== undefined)
                return "readed";
        }
    }
    return "";
}

export default function ChapterComicItem({ albumFriendlyName, collectionfriendlyName, title, onClick }: Props) {
    const [classNameReaded, setClassNameReaded] = useState<string>("");

    useEffect(() => {
        setClassNameReaded(checkChapHistory(albumFriendlyName, collectionfriendlyName));
    }, []);

    return (
        <a onClick={onClick}
            className={classNameReaded}>{title}</a>
    )
}