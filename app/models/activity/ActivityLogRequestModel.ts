import { EActivityType } from "../enums/EActivityType";

export default interface ActivityLogRequestModel {
    Description?: string;
    IpV4Address?: string;
    IpV6Address?: string;
    ActivityType?: EActivityType | null;
    LogTimes?: number | null;
    UserId?: number;
    LimitTimes?: number | null;
}
