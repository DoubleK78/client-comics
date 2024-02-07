
export function parseJsonFromString<Type>(data?: string | null) {
    try {
        if (!data) return null;
        return JSON.parse(data) as Type;
    } catch (error) {
        return null;
    }
}