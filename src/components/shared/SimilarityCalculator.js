function longestCommonSuffixLength(str1, str2) {
    let i = str1.length - 1;
    let j = str2.length - 1;
    let length = 0;

    while (i >= 0 && j >= 0 && str1.charAt(i) === str2.charAt(j)) {
        i--;
        j--;
        length++;
    }

    return length;
}

function compareBySuffixSimilarity(dic1, dic2) {
    // First, consider the longest common suffix length
    let a = dic1.name, b = dic2.name;
    const commonSuffixLengthA = a.length >= b.length ? longestCommonSuffixLength(a, b) : 0;
    const commonSuffixLengthB = b.length >= a.length ? longestCommonSuffixLength(b, a) : 0;

    if (commonSuffixLengthA !== commonSuffixLengthB) {
        return commonSuffixLengthB - commonSuffixLengthA; // Sort in descending order of common suffix length
    }

    // If the common suffix lengths are the same, sort alphabetically
    return a < b ? -1 : (a > b ? 1 : 0);
}

export function sortStringsBySuffixSimilarity(arr) {
    return arr.sort(compareBySuffixSimilarity);
}