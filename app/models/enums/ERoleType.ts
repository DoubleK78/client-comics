import { EnumDictionary } from "./EnumDictionary";

export enum ERoleType {
  NoneRole = -1,
  User = 0,
  UserPremium = 1,
  UserSuperPremium = 2,
  Partner = 3,
  Administrator = 99
}

export const roleTypeEnumMapping: EnumDictionary<ERoleType, string> = {
  [ERoleType.NoneRole]: "",
  [ERoleType.User]: "User",
  [ERoleType.UserPremium]: "User Premium",
  [ERoleType.UserSuperPremium]: "User Super Premium",
  [ERoleType.Partner]: "Partner",
  [ERoleType.Administrator]: "Administrator"
}