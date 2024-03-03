"use client"

import { setHistory } from "@/app/utils/HelperFunctions";
import { useTranslations } from "next-intl";

type Props = {
    targeLink?: string | null;
    isNext?: boolean;
    alternativeTargertLink?: string | null;
}

export default function PreviousNextButton({ isNext, targeLink, alternativeTargertLink }: Props) {
    const t = useTranslations('comic_detail');

    if (!isNext) {
        return (
            <a href={targeLink!}
                onClick={() => setHistory(targeLink)}
                className="anime-btn btn-dark">
                {t('previous')}
            </a>
        );
    }

    return (
        <a
            href={alternativeTargertLink ?? targeLink!}
            onClick={() => setHistory(targeLink!)}
            className="anime-btn btn-dark border-change ms-1"
        >
            {t('next')}
        </a>
    );
}