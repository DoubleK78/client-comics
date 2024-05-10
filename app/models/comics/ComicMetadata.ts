import { ERegion } from "./ComicSitemap";

export default interface ComicMetadata {
    title: string;
    lastestChapter?: string | null;
    comicImageUrl?: string | null;
    region: ERegion;
}