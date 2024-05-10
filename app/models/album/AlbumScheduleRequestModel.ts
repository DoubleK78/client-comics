import { ERegion } from "../comics/ComicSitemap";

export enum EDate {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export interface AlbumScheduleRequestModel {
    dateRelease: EDate;
    region: ERegion;
}
