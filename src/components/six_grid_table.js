import { conjugates } from "../data/conjugates"
import { useState } from "react"
import { HiArrowDown } from "react-icons/hi";



export function SixGridTable() {
    const [conj, setConjugates] = useState(conjugates);

    let border_style = { border: '1px solid black', padding: '5px', width: '150px' };

    return (
        <>
            <div class="grid grid-cols-4 gap-2">
                {conj.map((verb, id) => (
                    <div className="card w-auto bg-transparent text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h3 className="font-bold">{verb.name}</h3>

                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                        <td style={border_style}>{verb.je}</td>
                                        <td style={border_style}>{verb.nous}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.tu}</td>
                                        <td style={border_style}>{verb.vous}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.il}</td>
                                        <td style={border_style}>{verb.ils}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.passé}</td>
                                        <td style={border_style}>{verb.futur}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}