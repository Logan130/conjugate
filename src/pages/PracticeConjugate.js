import { Link } from "react-router-dom";
import { TestBox } from "../components/conjugate/SingleTestConjugationBox"
import { conjugates } from "../data/conjugation/conjugates"
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/context";

function selectRandomElements(arr, numElements) {
    const result = [];

    const copyArray = arr.slice();
    for (let i = 0; i < numElements; i++) {
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
    const [buttonStyles, setButtonStyles] = useState([true, false, false]);

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
    ]

    const onClickButton = (id) => {
        // let newButtonStyles = [...buttonStyles];
        let newButtonStyles = [false, false, false, false];
        newButtonStyles[id] = !newButtonStyles[id];

        if (id === 0) {
            newButtonStyles = [true, false, false];
            setConjugates(selectRandomElements(conjugates, number_of_practice));
        }
        else {
            newButtonStyles[0] = false;
            // let new_words = [];
            // let all_false = true;
            // for (let i = 1; i < buttonsArr.length; i++) {
            //     if (newButtonStyles[i]) {
            //         new_words = [...new_words, ...buttonsArr[i].verbs]
            //         all_false = false;
            //     }
            // }
            // if (!all_false) {
            //     setConjugates(selectRandomElements(new_words, number_of_practice));
            // }
            // else {
            //     newButtonStyles[0] = true;
            //     setConjugates(selectRandomElements(conjugates, number_of_practice));
            // }
            let new_words = buttonsArr[id].verbs;
            setConjugates(selectRandomElements(new_words, number_of_practice));
        }
        setButtonStyles(newButtonStyles);
    };

    const onRefresh = (e) => {
        setConjugates(selectRandomElements(conjugs, number_of_practice));
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
                    <div role="alert" className="alert alert-success font-bold">
                        <span>{eng ? "Forget the conjugation? See the complete list here!" : "忘了变位？点击前往不规则变位表"}</span>
                    </div>
                </Link>
            </div>


            <br />

            <div>
                <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {buttonsArr.map((button, id) => (
                        <button
                            key={id}
                            className={`btn ${buttonStyles[id] ? "btn-warning" : "btn-outline btn-warning"}`}
                            onClick={() => onClickButton(id)}
                        >
                            {button.name}
                        </button>
                    ))}
                    <button className="btn btn-success btn-outline w-full" onClick={onRefresh}>{eng ? "Shuffle" : "换一组"}</button>
                </div>
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