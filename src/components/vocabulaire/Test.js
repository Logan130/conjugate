import { useState, useEffect } from "react";

function IndividualQuestion({ question, id }) {
    let [checkedIndex, setCheckedIndex] = useState(-1);
    let [answer, setAnswer] = useState("")

    const handleRadioChange = (index, option) => {
        console.log(option)
        setCheckedIndex(index);
        setAnswer(option);
    };

    return (
        <div className="card w-auto bg-neutral text-neutral-content">
            <div className="card-body items-left text-left">
                <h2 className="card-title">Q{id}: {question.question}</h2>
                <div className="grid grid-cols-1 gap-2">
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                className={answer === "" ? "radio radio-xs" : (answer === question.answer ? "radio radio-xs radio-success" : "radio radio-xs radio-error")}
                                checked={checkedIndex === index} // Check if this option is selected
                                onChange={() => handleRadioChange(index, option)} // Update checkedIndex when an option is clicked
                            />
                            <span className="">
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
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        // URL of the raw JSON file on GitHub
        const url = "https://raw.githubusercontent.com/Logan130/conjugate/master/src/practice/communication/B1/L1.json";

        // Fetch the JSON data
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json(); // Parse the JSON response
            })
            .then((data) => {
                setQuestions(data.test); // Set the "test" field to state
                console.log(data.test)
            })
            .catch((error) => {
                console.error("Error fetching the data: ", error);
            });
    }, []);

    return (
        <>

            {questions.length > 0 && questions.map((q, id) =>
                <div className="m-2">
                    <IndividualQuestion question={q} id={id + 1} />
                </div>)}

        </>
    )
}

