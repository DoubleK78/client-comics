import { ERoleType } from "../common/ERoleType";

export default interface UserProfileResponse {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    avatar?: string | null;
    roleType: ERoleType;
    levelId?: number | null,
    currentExp?: number | null,
    nextLevelExp: number | null,
}