export default interface ComicSitemap {
    friendlyName: string,
    region: ERegion,
    contentFriendlyNames?: Array<string> | null;
}

export const enum ERegion {
    vn = 0,
    en = 1
}