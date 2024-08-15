// Function to compute the Levenshtein Distance between two strings
function levenshtein(a, b) {
    const matrix = [];

    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Increment along the first row of each column
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Compute the values for the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // Substitution
                    Math.min(matrix[i][j - 1] + 1, // Insertion
                        matrix[i - 1][j] + 1)); // Deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

// Function to sort words based on their similarity
export function sortSimilarWordsLevenshtein(words) {
    const n = words.length;
    const distances = Array.from({ length: n }, () => Array(n).fill(0));

    // Build a distance matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = levenshtein(words[i].name, words[j].name);
            distances[i][j] = dist;
            distances[j][i] = dist;
        }
    }

    // Sort the words such that similar words groups together
    // Using a simple approach here, could use more sophisticated clustering algorithm if needed
    const sortedWords = [];
    const visited = new Set();

    function getNextWord(currentWordIndex) {
        visited.add(currentWordIndex);
        sortedWords.push(words[currentWordIndex]);
        let nextWordIndex = -1;
        let minDist = Infinity;

        for (let i = 0; i < n; i++) {
            if (!visited.has(i) && distances[currentWordIndex][i] < minDist) {
                nextWordIndex = i;
                minDist = distances[currentWordIndex][i];
            }
        }

        if (nextWordIndex !== -1) {
            getNextWord(nextWordIndex);
        }
    }

    // Start with the first word in the array
    getNextWord(0);

    return sortedWords;
}