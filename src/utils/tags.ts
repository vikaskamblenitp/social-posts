export const extractTags = (data: string) => {
    if (!data) return [];
    return data.split(" ").filter(item => item.startsWith("#"));
}