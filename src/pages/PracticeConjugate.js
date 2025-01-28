import { Link } from "react-router-dom";
import { TestBox } from "../components/conjugate/SingleTestConjugationBox"
import { conjugates } from "../data/conjugation/conjugates"
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/context";

function selectRandomElements(arr, numElements) {
    const result = [];

    const copyArray = arr.slice();
    for (let i = 0; i < Math.min(numElements, arr.length); i++) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        result.push(copyArray.splice(randomIndex, 1)[0]);
    }

    return result;
}

export function PracticeConjugate() {
    const { eng } = useContext(ThemeContext);
    let number_of_practice = 6;
    let [conjugs, setConjugates] = useState(selectRandomElements(conjugates, number_of_practice));
    let isMobile = window.innerWidth < 500;
    const [suffixIndex, setSuffixIndex] = useState(0);
    let [levelIndex, setLevelIndex] = useState(0);

    let buttonsArr = [
        {
            name: eng ? "Practice All" : "练习全部",
            index: 0,
            verbs: conjugates,
        },
        {
            name: "A1",
            index: 1,
            verbs: conjugates.filter((verb) => verb.level === "A1"),
        },
        {
            name: "A2",
            index: 2,
            verbs: conjugates.filter((verb) => verb.level === "A2"),
        },
        {
            name: "B1",
            index: 3,
            verbs: conjugates.filter((verb) => verb.level === "B1"),
        },
        {
            name: "B2",
            index: 4,
            verbs: conjugates.filter((verb) => verb.level === "B2"),
        },
    ]

    let suffixButtonArr = [
        {
            name: eng ? "All" : "全部",
            value: ''
        },
        {
            name: 'ir',
            value: 'ir'
        },
        {
            name: 're',
            value: 're'
        },
        {
            name: 'er',
            value: 'er'
        },
        {
            name: 'oir',
            value: 'oir'
        },
        {
            name: 'dre',
            value: 'dre'
        },
        {
            name: 'tre',
            value: 'tre'
        },
        {
            name: 'ire',
            value: 'ire'
        },
    ]

    const onClickButton = (levelID) => {
        setLevelIndex(levelID);
        let newWords = buttonsArr[levelID].verbs.filter((verb) => verb.name.endsWith(suffixButtonArr[suffixIndex].value));
        setConjugates(selectRandomElements(newWords, number_of_practice));
    };

    const onClickSuffixButton = (suffixID) => (e) => {
        setSuffixIndex(suffixID);
        let newWords = buttonsArr[levelIndex].verbs.filter((verb) => verb.name.endsWith(suffixButtonArr[suffixID].value));
        setConjugates(selectRandomElements(newWords, number_of_practice));
    }

    const onRefresh = (e) => {
        let newWords = buttonsArr[levelIndex].verbs.filter((verb) => verb.name.endsWith(suffixButtonArr[suffixIndex].value));
        setConjugates(selectRandomElements(newWords, number_of_practice));
        const inputFields = document.querySelectorAll('input[type="text"]');
        inputFields.forEach((input) => {
            input.value = '';
        });
    }


    useEffect(() => {
        // Scroll to the top of the page when component mounts
        // window.scrollTo(0, 0); // Scrolls to top-left corner
        // or
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Optionally, you can make it scroll smoothly
        });
    }, []);


    return (
        <>
            <div className="flex items-center justify-center mt-2">
                <Link to="/">
                    <div role="alert" className="alert alert-success font-bold"
                        style={{
                            transition: 'transform 0.5s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)'; // Enlarge slightly
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'; // Return to original size
                        }}
                    >
                        <span>
                            {eng ? "Forget the conjugation? See the complete list here!" : "忘了变位？点击前往不规则变位表"}
                        </span>
                    </div>
                </Link>
            </div>


            <br />

            <div>
                <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {buttonsArr.map((button, buttonIndex) => (
                        <button
                            key={`level-button-${buttonIndex}`}
                            className={levelIndex === buttonIndex ? 'btn btn-success' : 'btn btn-success btn-outline'}
                            onClick={() => onClickButton(buttonIndex)}
                        >
                            {button.name}
                        </button>
                    ))}
                    <button className="btn btn-success btn-outline w-full" onClick={onRefresh}>{eng ? "Shuffle" : "换一组"}</button>
                </div>
            </div>

            <br />
            <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                {suffixButtonArr.map((suffixButton, index) => (
                    <button
                        key={`suffix-button-${index}`}
                        className={suffixIndex === index ? "btn btn-warning" : "btn btn-outline btn-warning"}
                        onClick={onClickSuffixButton(index)}
                    >
                        {suffixButton.name}
                    </button>
                ))}
            </div>

            <div role="alert" className="alert mt-3 text-left">
                <span>
                    {eng ? "Press the Enter key or click the check button to check answers" : "除了用鼠标点击按钮，输入答案后，按下回车键也可检查答案，上下左右键可移动"}
                </span>
            </div>

            <br />

            <div class={`grid grid-cols-${isMobile ? "1" : "2"} gap-${isMobile ? "4" : "4"}`}>
                {conjugs.map((verb, id) => <TestBox verb={verb} CardID={id} />)}
            </div>

            <div className="card-actions justify-center m-4">
                <button className="btn btn-outline btn-success w-full" onClick={onRefresh}>{eng ? "Shuffle" : "换一组"}</button>
            </div>

        </>
    )
}