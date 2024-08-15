function addSubj(pronoun, word) {
    if (!word) {
        return ""
    }

    let isVowel = false, isJe = (pronoun === "je");
    for (let vowel of ["a", "i", "o", "e", "y", "u", "h", "é", "ê", "è", "î", "ï", "à"]) {
        isVowel = (isVowel || (word[0] === vowel));
    }
    return (isVowel && isJe) ? `j'${word}` : `${pronoun} ${word}`
}

export function SingleConjugationBox({ words }) {
    let isMobile = window.innerWidth < 500;
    let pronounsArr = ["je", "nous", "tu", "vous", "il", "ils"];

    return (
        <>
            <div class={`grid grid-cols-${isMobile ? "1" : "3"} gap-${isMobile ? "4" : "4"}`}>
                {words.map((word, id) => (<>
                    <div className="card w-auto bg-neutral text-neutral-content">
                        <div className="absolute bottom-0 right-0 m-2 text-xs font-bold">{id+1}</div>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{word.name}</h2>
                            <div class="grid grid-cols-2 gap-4 text-left">
                                {pronounsArr.map((pronoun, id) => (
                                    <div className="bg-neutral">
                                        {addSubj(pronoun, word[pronoun])}
                                    </div>
                                ))}
                                <div className="bg-neutral">
                                    {word["passé"]}
                                </div>
                                <div className="bg-neutral">
                                    {word["futur"]}
                                </div>
                            </div>
                        </div>
                    </div>
                </>))}
            </div>

        </>
    )
}