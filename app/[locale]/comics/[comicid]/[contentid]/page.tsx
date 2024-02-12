import Breadcrumb from "@/app/components/contents/Breadcrumb";
import ContentComic from "@/app/components/contents/ContentComic";
import ContentResponse from "@/app/models/contents/ContentResponse";
import ServerResponse from "@/app/models/common/ServerResponse";
import getAxiosInstance from "@/lib/axios";
import { portalServer } from "@/lib/services/client/baseUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import ComicDetail from "@/app/models/comics/ComicDetail";
import ClearSearchParams from "@/app/components/contents/ClearSearchParams";
import { getTranslations } from "next-intl/server";

type Props = {
    params: { comicid: string | null, contentid: string | null, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { comicid, contentid, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const content: ContentResponse | null | undefined = await fetch(process.env.PORTAL_API_URL + `/api/client/ContentApp/comics/${comicid}/contents/${contentid}`).then(res => res.json()).then(res => res.data);

    if (content && content.albumTitle && content.title) {
        return {
            title: t('content', {
                albumTitle: content.albumTitle,
                contentTile: content.title
            }),
            description: t('content_description', {
                albumTitle: content.albumTitle,
                contentTile: content.title
            }),
            icons: {
                icon: '/assets/media/icon/head.ico',
            }
        };
    }

    return {
        title: t('content_blank'),
        description: t('content_blank_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    }
}

const DynamicCommentComic = dynamic(() => import('@/app/components/comic/CommentComic'), {
    ssr: false
});

const getContent = async (
    comicid: string | null,
    contentid: string | null,
    token: string | null = null,
    ip: string | null = null,
    previousCollectionId?: string | string[] | null
) => {
    try {
        const response = await getAxiosInstance(portalServer, token)
            .get<ServerResponse<ContentResponse>>(`/api/client/ContentApp/comics/${comicid}/contents/${contentid}`, {
                headers: {
                    'x-forwarded-for': ip
                },
                params: {
                    previousCollectionId
                }
            });
        return response.data.data;
    }
    catch {
        return null;
    }
}

const getComic = async (comicid: string | null) => {
    try {
        const response = await getAxiosInstance(portalServer).get<ServerResponse<ComicDetail>>(process.env.PORTAL_API_URL + `/api/client/ComicApp/${comicid}`);
        return response.data.data;
    }
    catch (exception: any) {
        return null;
    }
}

export default async function Page({ params, searchParams }: {
    params: { comicid: string | null, contentid: string | null },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const headersList = headers();
    const ip = headersList.get("cf-connecting-ip") ?? headersList.get("x-forwarded-for");
    const comic = await getComic(params.comicid);

    const session = await getServerSession(authOptions);
    const content = await getContent(params.comicid, params.contentid, session?.user?.token?.apiToken, ip, searchParams?.previousCollectionId);
    return (
        <>
            <Breadcrumb content={content} />
            <ClearSearchParams />
            <ContentComic content={content} comic={comic} />
            <DynamicCommentComic comicId={content?.albumId} collectionId={content?.id} />
        </>
    );
}