import { EnumDictionary } from "./EnumDictionary";

export enum ELevel {
    Base = 1,
    SSJ1 = 2,
    SSJ2 = 3,
    SSJ3 = 4,
    GOD = 5,
    BLUE = 6,
    UI = 7,
    MUI = 8,
    SAMA = 9,
    WHIS = 10,
    DAIS = 11,
    ZENO = 12
}

export const levelEnumMapping: EnumDictionary<ELevel, string> = {
    [ELevel.Base]: "Base",
    [ELevel.SSJ1]: "SSJ1",
    [ELevel.SSJ2]: "SSJ2",
    [ELevel.SSJ3]: "SSJ3",
    [ELevel.GOD]: "GOD",
    [ELevel.BLUE]: "BLUE",
    [ELevel.UI]: "UI",
    [ELevel.MUI]: "MUI",
    [ELevel.SAMA]: "SAMA",
    [ELevel.WHIS]: "WHIS",
    [ELevel.DAIS]: "DAIS",
    [ELevel.ZENO]: "ZENO"
}