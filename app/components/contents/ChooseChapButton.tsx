"use client";

import { setHistory } from "@/app/utils/HelperFunctions";
import classNames from "classnames";

type Props = {
    albumFriendlyName: string | null;
    collectionfriendlyName: string | null;
    targeLink?: string | null;
    title?: string | null;
    isActive: boolean;
}

const checkChapHistory = (albumNameParam: any, chapParam: any): string => {
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
    return "";
}

export default function ChooseChapButton({ targeLink, title, albumFriendlyName, collectionfriendlyName, isActive }: Props) {

    return (
        <a className={classNames('page-link', {
            readed: checkChapHistory(albumFriendlyName, collectionfriendlyName),
            active: isActive
        })}
            onClick={() => setHistory(targeLink)}
            href={`${targeLink}`}>
            {title}
        </a>
    );
}