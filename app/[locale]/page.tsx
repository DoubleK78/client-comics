import dynamic from "next/dynamic";
import BannerComic from "../components/home/BannerComic";
import PopularComic from "../components/home/PopularComic";
import RecentlyUploadedComic from "../components/home/RecentlyUploadedComic";
import TopAreaComic from "../components/home/TopAreaComic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import { getEnumValueFromString } from "../utils/HelperFunctions";
import { getAxiosInstanceAsync } from "@/lib/axios";
import PagingRequest from "../models/paging/PagingRequest";
import ServerResponse from "../models/common/ServerResponse";
import { cache } from 'react'
import { isbot } from "isbot";
import { headers } from "next/headers";

// Fast cache for 1 minutes
export const revalidate = 1

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
  ssr: false
});

const getAlbums = cache(async (params: PagingRequest, filter: any) => {
  try {
    const response = await (await getAxiosInstanceAsync()).get<ServerResponse<any>>('/api/client/comicapp/paging', {
      params: { ...params, ...filter },
    });
    return response.data.data.data;
  } catch (error) {
    return null;
  }
});

export default async function Home() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const roleUser = getEnumValueFromString(session?.user?.token?.roles);

  const popularComicsApiPromise = getAlbums({
    PageNumber: 1,
    PageSize: 12,
    SearchTerm: '',
    SortColumn: 'views',
    SortDirection: 'desc'
  }, {
    firstChar: '',
    genre: '',
    country: '',
    year: '',
    status: false,
    language: '',
    rating: '',
    region: locale
  });

  const recentlyUploadedComicsApiPromise = getAlbums({
    PageNumber: 1,
    PageSize: 12,
    SearchTerm: '',
    SortColumn: 'updatedOnUtc',
    SortDirection: 'desc'
  }, {
    firstChar: '',
    genre: '',
    country: '',
    year: '',
    status: false,
    language: '',
    rating: '',
    region: locale
  });

  const [popularComics, recentlyUploadedComics] = await Promise.all([
    popularComicsApiPromise,
    recentlyUploadedComicsApiPromise
  ]);

  const isBot = isbot(headers().get('user-agent'));

  return (
    <>
      <ScrollButton />
      <BannerComic roleUser={roleUser} isBot={isBot} />
      <PopularComic roleUser={roleUser} albums={popularComics} isBot={isBot} />
      <RecentlyUploadedComic roleUser={roleUser} albums={recentlyUploadedComics} isBot={isBot} />
      <TopAreaComic locale={locale} roleUser={roleUser} isBot={isBot} />
    </>
  )
}
