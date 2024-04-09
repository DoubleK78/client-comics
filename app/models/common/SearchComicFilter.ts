import { ERegion } from "../comics/ComicSitemap";

export default interface SearchComicFilter {
    title?: string;
    friendlyName?: string;
    region?: ERegion;
}