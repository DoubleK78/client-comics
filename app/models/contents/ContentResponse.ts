export default interface ContentResponse {
    id: number;
    title: string | null;
    friendlyName: string | null;
    albumId: number;
    albumTitle: string | null;
    albumFriendlyName: string | null;
    createdOnUtc: Date;
    updatedOnUtc: Date;

    volume: string | null;
    extendName: string | null;
    description: string | null;
    views: number;
    contentItems: Array<string> | null;
}