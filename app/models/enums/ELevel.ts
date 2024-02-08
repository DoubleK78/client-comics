// Enum Dictionary Type to satisfy Typescript  
export type EnumDictionary<KeyType extends string | symbol | number, Value> = {
    [Key in KeyType]: Value
}

export enum ELevel {
    Base = 1,
    SSJ1 = 2,
    SSJ2 = 3,
    SSJ3 = 4,
    GOD = 5,
    BLUE = 6,
    UI = 7,
    MUI = 8
}

export const levelEnumMapping: EnumDictionary<ELevel, string> = {
    [ELevel.Base]: "Base",
    [ELevel.SSJ1]: "SSJ1",
    [ELevel.SSJ2]: "SSJ2",
    [ELevel.SSJ3]: "SSJ3",
    [ELevel.GOD]: "GOD",
    [ELevel.BLUE]: "BLUE",
    [ELevel.UI]: "UI",
    [ELevel.MUI]: "MUI"
}