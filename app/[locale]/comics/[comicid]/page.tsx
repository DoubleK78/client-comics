import getAxiosInstance from "@/lib/axios";
import Breadcrumb from "../../../components/comic/Breadcrumb";
import ChapterComic from "../../../components/comic/ChapterComic";
import InfomationComic from "../../../components/comic/InfomationComic";
import ServerResponse from "@/app/models/common/ServerResponse";
import ComicDetail from "@/app/models/comics/ComicDetail";
import { portalServer } from "@/lib/services/client/baseUrl";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

type Props = {
    params: { comicid: string | null, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { comicid, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const comic: ComicDetail | null | undefined = await fetch(process.env.PORTAL_API_URL + `/api/client/ComicApp/${comicid}`).then(res => res.json()).then(res => res.data);
    if (comic && comic.title && comic.contents[0]?.title) {
        return {
            title: t('comic', {
                title: comic?.title,
                lastedChapter: comic.contents[0].title
            }),
            description: t('comic_description', {
                title: comic?.title,
                lastedChapter: comic.contents[0].title
            }),
            icons: {
                icon: '/assets/media/icon/head.ico',
            }
        };
    }

    return {
        title: t('comic'),
        description: t('comic_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    }
}

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});
const DynamicCommentComic = dynamic(() => import('@/app/components/comic/CommentComic'), {
    ssr: false
});

const getComic = async (comicid: string | null) => {
    try {
        const response = await getAxiosInstance(portalServer).get<ServerResponse<ComicDetail>>(process.env.PORTAL_API_URL + `/api/client/ComicApp/${comicid}`);
        return response.data.data;
    }
    catch (exception: any) {
        return null;
    }
}

export default async function Comic({ params }: { params: { comicid: string | null } }) {
    const comic = await getComic(params.comicid);
    const session = await getServerSession(authOptions);
    return (
        <>
            <ScrollButton />
            <Breadcrumb title={comic?.title} friendlyName={comic?.friendlyName} />
            <InfomationComic comic={comic} session={session} />
            <ChapterComic contents={comic?.contents} />
            <DynamicCommentComic comicId={comic?.id} collectionId={null} />
        </>
    );
}