import { getAxiosInstanceAsync } from "@/lib/axios";
import Breadcrumb from "../../../components/comic/Breadcrumb";
import ChapterComic from "../../../components/comic/ChapterComic";
import InfomationComic from "../../../components/comic/InfomationComic";
import ServerResponse from "@/app/models/common/ServerResponse";
import ComicDetail from "@/app/models/comics/ComicDetail";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLocale, getTranslations } from "next-intl/server";
import ComicMetadata from "@/app/models/comics/ComicMetadata";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";

type Props = {
    params: { comicid: string | null, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { comicid, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const comicMetadata: ComicMetadata | null | undefined = await fetch(process.env.PORTAL_API_URL + `/api/client/ComicApp/${comicid}/metadata`)
        .then(res => res.json())

    if (comicMetadata) {
        return {
            title: t('comic', {
                title: comicMetadata.title,
                lastedChapter: comicMetadata.lastestChapter
            }),
            description: t('comic_description', {
                title: comicMetadata.title,
                lastedChapter: comicMetadata.lastestChapter
            }),
            openGraph: {
                title: t('comic', {
                    title: comicMetadata.title,
                    lastedChapter: comicMetadata.lastestChapter
                }),
                description: t('home'),
                images: [
                    {
                        url: comicMetadata.comicImageUrl,
                        width: 800,
                        height: 600
                    }
                ]
            }
        };
    }

    return {
        title: t('comic'),
        description: t('comic_description')
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
        const response = await (await getAxiosInstanceAsync()).get<ServerResponse<ComicDetail>>(`/api/client/ComicApp/${comicid}`);
        return response.data.data;
    }
    catch (exception: any) {
        return null;
    }
}

export default async function Comic({ params }: { params: { comicid: string | null } }) {
    const comic = await getComic(params.comicid);
    const session = await getServerSession(authOptions);
    const locale = await getLocale();
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    return (
        <>
            <ScrollButton />
            <Breadcrumb title={comic?.title} friendlyName={comic?.friendlyName} />
            <InfomationComic comic={comic} roleUser={roleUser} region={comic?.region}/>
            <ChapterComic contents={comic?.contents} locale={locale} roleUser={roleUser} genre={comic?.tags} comicId={comic?.id} region={comic?.region}/>
            <DynamicCommentComic comicId={comic?.id} collectionId={null} roleUser={roleUser}/>
        </>
    );
}