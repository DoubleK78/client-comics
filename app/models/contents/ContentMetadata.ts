import { ERegion } from "../comics/ComicSitemap";

export default interface ContentMetadata {
   comicTitle: string;
   comicImageUrl?: string | null;
   contentTitle: string;
   region: ERegion;
}