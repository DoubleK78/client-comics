// Enum Dictionary Type to satisfy Typescript  
export type EnumDictionary<KeyType extends string | symbol | number, Value> = {
    [Key in KeyType]: Value
}