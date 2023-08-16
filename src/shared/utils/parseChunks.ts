const parseChunks = (chunks: string) => {
    let parsedChunks = "";

    if (chunks.indexOf("}") !== -1) {
        const arrayOfChunks = chunks.split("}");

        arrayOfChunks.forEach((chunk) => {
            const separatedChunk = chunk.split(":");
            if (separatedChunk[2]) {
                const separatedChunkValue = separatedChunk[2].split('"').join("");
                if (separatedChunkValue && separatedChunkValue !== "null") {
                    parsedChunks += separatedChunkValue;
                }
            }
        });
    }

    return parsedChunks;
};
export default parseChunks;
