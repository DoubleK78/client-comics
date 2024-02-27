import Breadcrumb from "@/app/components/contents/Breadcrumb";
import ContentComic from "@/app/components/contents/ContentComic";
import ContentResponse from "@/app/models/contents/ContentResponse";
import ServerResponse from "@/app/models/common/ServerResponse";
import { getAxiosInstanceAsync } from "@/lib/axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import ComicDetail from "@/app/models/comics/ComicDetail";
import ClearSearchParams from "@/app/components/contents/ClearSearchParams";
import { getLocale, getTranslations } from "next-intl/server";
import ContentMetadata from "@/app/models/contents/ContentMetadata";
import { isbot } from "isbot";
import { getEnumValueFromString, getRegionByLocale } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";

type Props = {
    params: { comicid: string | null, contentid: string | null, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { comicid, contentid, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;
    const routeVi = pathnames["/comics"]['vi'] + `/${comicid}/${contentid}`;
    const routeEn = '/en' + pathnames["/comics"]['en'] + `/${comicid}/${contentid}`;
    const contentMetadata: ContentMetadata | null | undefined = await fetch(process.env.PORTAL_API_URL + `/api/client/ContentApp/comics/${comicid}/contents/${contentid}/metadata`)
        .then(res => res.json());

    if (contentMetadata && contentMetadata.comicTitle && contentMetadata.contentTitle) {
        return {
            metadataBase: new URL(baseUrl),
            alternates: {
                canonical: locale === 'vi' ? routeVi : routeEn,
                languages: {
                    'vi': routeVi,
                    'en': routeEn,
                },
            },
            robots: {
                index: contentMetadata.region === getRegionByLocale(locale),
                follow: contentMetadata.region === getRegionByLocale(locale)
            },
            title: t('content', {
                comicTitle: contentMetadata.comicTitle,
                contentTile: contentMetadata.contentTitle
            }),
            description: t('content_description', {
                comicTitle: contentMetadata.comicTitle,
                contentTile: contentMetadata.contentTitle
            }),
            openGraph: {
                title: t('content', {
                    comicTitle: contentMetadata.comicTitle,
                    contentTile: contentMetadata.contentTitle
                }),
                description: t('home'),
                images: [
                    {
                        url: contentMetadata.comicImageUrl,
                        width: 800,
                        height: 600
                    }
                ]
            }
        };
    }

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('content_blank'),
        description: t('content_blank_description')
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
    isBot: boolean,
    previousCollectionId?: string | string[] | null,
) => {
    try {
        const response = await (await getAxiosInstanceAsync())
            .get<ServerResponse<ContentResponse>>(`/api/client/ContentApp/comics/${comicid}/contents/${contentid}`, {
                headers: {
                    'x-forwarded-for': ip
                },
                params: {
                    previousCollectionId,
                    isBot
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
        const response = await (await getAxiosInstanceAsync()).get<ServerResponse<ComicDetail>>(`/api/client/ComicApp/${comicid}`);
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
    const userAgent = headersList.get("user-agent");
    const isBot = isbot(userAgent);
    const comic = await getComic(params.comicid);
    const locale = await getLocale();

    const session = await getServerSession(authOptions);
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    const content = await getContent(params.comicid, params.contentid, session?.user?.token?.apiToken, ip, isBot, searchParams?.previousCollectionId);
    return (
        <>
            <Breadcrumb content={content} />
            <ClearSearchParams />
            <ContentComic content={content} comic={comic} session={session} locale={locale} />
            <DynamicCommentComic comicId={content?.albumId} collectionId={content?.id} roleUser={roleUser} />
        </>
    );
}