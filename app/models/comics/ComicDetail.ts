import ContentResponse from "../contents/ContentResponse";

export enum EAlbumStatus {
    Ongoing = 0,
    Completed = 1
}

export default interface ComicDetail {
    id: number;
    title: string;
    description?: string;
    albumAlertMessageName?: string;
    contentTypeNames?: string;

    // Comic Extra info
    alternativeName?: string;
    type?: string;
    albumStatus: EAlbumStatus;
    releaseYear?: string;
    authorNames?: string;
    artistNames?: string;
    tags?: string;

    // Thumbnail
    thumbnailUrl?: string;

    views: number;

    createdDate: Date;
    updatedDate?: Date;

    isPublic: boolean;
    friendlyName?: string;
    contents: ContentResponse[];
}