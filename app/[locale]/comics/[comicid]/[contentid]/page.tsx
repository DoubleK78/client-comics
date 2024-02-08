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