import { useState } from "react"
import { HiArrowDown } from "react-icons/hi";



export function Table({words}) {
    const [conj, setConjugates] = useState(words);
    const [alphabeticAsc, setAlphabeticAsc] = useState(false);

    const SortAlphabetically = (e) => {
        let sorted_array = conj.sort(function(a, b) { return (a.name < b.name) ? -1 : 1 * (alphabeticAsc ? -1 : 1)})
        setConjugates(sorted_array)
        setAlphabeticAsc(!alphabeticAsc);
    }


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th></th>
                            <th style={ {display: "flex", alignItems: "center"} }> Verb <button onClick={SortAlphabetically}> <HiArrowDown/> </button></th>
                            <th>je</th>
                            <th>tu</th>
                            <th>il</th>
                            <th>nous</th>
                            <th>vous</th>
                            <th>ils</th>
                            <th>passé composé</th>
                            <th>futur</th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {
                            words.map((verb, index) => (
                                <tr className="hover-debug:bg-gray-300">
                                    <td>{index+1}</td>
                                    <td>{verb.name}</td>
                                    <td>{verb.je}</td>
                                    <td>{verb.tu}</td>
                                    <td>{verb.il}</td>
                                    <td>{verb.nous}</td>
                                    <td>{verb.vous}</td>
                                    <td>{verb.ils}</td>
                                    <td>{verb.passé}</td>
                                    <td>{verb.futur}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>

        </>
    )
}