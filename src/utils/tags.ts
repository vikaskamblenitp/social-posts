/**
 * @description extracts the tags from a given string
 * @param {string} data: input string
 * @param {string} [tagSymbol]: letter with symbol to consider as tag default to #
 * @returns 
 */
export const extractTags = (data: string, tagSymbol = "#") => {
    if (!data) return [];
    return data.split(" ").filter(item => item.startsWith(tagSymbol));
}