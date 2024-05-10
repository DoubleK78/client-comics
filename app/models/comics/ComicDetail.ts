import ContentResponse from "../contents/ContentResponse";
import { ERegion } from "./ComicSitemap";

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
    artitstNames?: string;
    tags?: string;

    // Thumbnail
    thumbnailUrl?: string;

    views: number;

    createdOnUtc: Date;
    updatedOnUtc?: Date;

    isPublic: boolean;
    friendlyName?: string;
    contents: ContentResponse[];
    region?: ERegion;
}