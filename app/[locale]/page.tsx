import dynamic from "next/dynamic";
import BannerComic from "../components/home/BannerComic";
import PopularComic from "../components/home/PopularComic";
import RecentlyUploadedComic from "../components/home/RecentlyUploadedComic";
import TopAreaComic from "../components/home/TopAreaComic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
  ssr: false
});
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
        <ScrollButton />
        <BannerComic />
        <PopularComic />
        <RecentlyUploadedComic/>
        <TopAreaComic />
    </>
  )
}
