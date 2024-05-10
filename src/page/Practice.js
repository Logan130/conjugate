import { TestBox } from "../components/testbox"
import { conjugates } from "../data/conjugates"
import { useState } from "react";

function selectRandomElements(arr, numElements) {
    const result = [];
    const length = arr.length;

    const copyArray = arr.slice();
    for (let i = 0; i < numElements; i++) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        result.push(copyArray.splice(randomIndex, 1)[0]);
    }

    return result;
}

export function Practice() {
    let number_of_practice = 6;
    let [conjugs, setConjugates] = useState(selectRandomElements(conjugates, number_of_practice));

    const onRefresh = (e) => {
        setConjugates(selectRandomElements(conjugates, number_of_practice));
    }


    return (
        <>
            <div className="card-actions justify-center m-4">
                <button className="btn btn-success w-full" onClick={onRefresh}>换一组</button>
            </div>
            <div class="grid grid-cols-2 gap-4">
                {conjugs.map((verb, id) => <TestBox verb={verb} />)}
            </div>
            <div className="card-actions justify-center m-4">
                <button className="btn btn-success w-full" onClick={onRefresh}>换一组</button>
            </div>

        </>
    )
}