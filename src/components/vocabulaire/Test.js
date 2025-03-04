import { useState, useEffect, useContext, useRef } from "react";
import { lessons } from "../../pages/Vocabulaire";
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from "../../context/context";
import Loader from '../../static/loader.webp'
import { Title } from "./VocabulaireSummary";

function Beautifier(question) {
    // Replace all instances of double spaces with a single space
    question = question.replace(/\s{2,}/g, ' ');
    
    // Replace all underscores of any length with exactly 6 underscores
    question = question.replace(/_+/g, '______');
    
    return question;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Generate a random index
        [array[i], array[j]] = [array[j], array[i]];    // Swap elements at i and j
    }
    return array;
}

function IndividualQuestion({ question, id }) {

    let [checkedIndex, setCheckedIndex] = useState(-1);
    let [answer, setAnswer] = useState("")


    const handleRadioChange = (index, option) => {
        setCheckedIndex(index);
        setAnswer(option);
    };

    return (
        <div className="card w-auto bg-neutral text-neutral-content">
            <div className="card-body items-left text-left">
                <h2 className="card-title tracking-tight">Q{id}: {Beautifier(question.question)}</h2>
                <div className="grid grid-cols-1 gap-2">
                    {(question.options).map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 hover:cursor-pointer hover:bg-neutral-content/10 hover:text-base-content rounded-md" onClick={() => handleRadioChange(index, option)}>
                            <input
                                type="radio"
                                className={answer === "" ? "radio radio-xs" : (answer === question.answer ? "radio radio-xs radio-success" : "radio radio-xs radio-error")}
                                checked={checkedIndex === index} // Check if this option is selected
                                onChange={() => handleRadioChange(index, option)} // Update checkedIndex when an option is clicked
                            />
                            <span className="font-semibold">
                                {option}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export function Test() {
    const { id } = useParams();
    let test_json_url = lessons[id].test;
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 500;
    let [title, setTitle] = useState((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
    let filters = useState([]);

    let [questions, setQuestions] = useState([]);
    let [loading, setLoading] = useState(!!test_json_url);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top-left corner
    }, []);

    useEffect(() => {
        setLoading(!!test_json_url);
        setQuestions([]);
        setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
        // URL of the raw JSON file on GitHub
        if (!!test_json_url) {
            const url = "https://raw.githubusercontent.com/Logan130/conjugate/refs/heads/master/src/practice/" + test_json_url;

            // Fetch the JSON data
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return response.json(); // Parse the JSON response
                })
                .then((data) => {
                    let test_data = data.test;
                    for (let i = 0; i < test_data.length; i++) {
                        test_data[i].options = shuffleArray(test_data[i].options);
                    }
                    setQuestions(test_data); // Set the "test" field to state
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Error fetching the data: ", error);
                });
        }

    }, [id, eng]);

    return (
        <>

            {/* <div className={isMobile ? "text-3xl align-center justify-center text-center" : "text-4xl align-center justify-center text-center"}>{title}</div> */}


            <Title id={id} title={title} url={"voc/test"} />
            <br />


            {loading &&
                <div className="flex justify-center">
                    {/* <span className="loading loading-ball loading-xs"></span>
                    <span className="loading loading-ball loading-sm"></span>
                    <span className="loading loading-ball loading-md"></span>
                    <span className="loading loading-ball loading-lg"></span> */}

                    <img src={Loader} className="z-0" />
                </div>
            }


            {questions.length > 0 && !loading && questions.map((q, id) =>
                <div className="m-2">
                    <IndividualQuestion question={q} id={id + 1} />
                </div>)}

        </>
    )
}

