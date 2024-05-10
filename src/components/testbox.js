import { useState } from "react"
import React, { useRef, useEffect } from 'react';


export function TestBox({ verb }) {
    const input_array = ["je", "nous", "tu", "vous", "il", "ils", "passé composé", "futur"]
    let [correct, setCorrect] = useState([null, null, null, null, null, null, null, null])
    let [hint, setHint] = useState([false, false, false, false, false, false, false, false])
    let [hint_bool, setHintBool] = useState(true);

    let [je, setJe] = useState("")
    let [tu, setTu] = useState("")
    let [il, setIl] = useState("")
    let [nous, setNous] = useState("")
    let [vous, setVous] = useState("")
    let [ils, setIls] = useState("")
    let [passé, setPassé] = useState("")
    let [futur, setFutur] = useState("")
    let mapping = {
        "je": setJe,
        "tu": setTu,
        "il": setIl,
        "nous": setNous,
        "vous": setVous,
        "ils": setIls,
        "passé composé": setPassé,
        "futur": setFutur
    }
    let style_mapping = {
        null: "grow input input-bordered",
        true: "grow input input-bordered input-success",
        false: "grow input input-bordered input-error",
        hint: "grow input input-bordered input-primary"
    }

    const onTextfieldChange = (field) => (e) => {
        mapping[field](e.target.value);
    }

    const CheckAnswer = (e) => {
        setCorrect([
            je === verb.je,
            nous === verb.nous,
            tu === verb.tu,
            vous === verb.vous,
            il === verb.il,
            ils === verb.ils,
            passé === verb.passé,
            (futur === verb.futur || futur === verb.futur.substring(0, (verb.futur).length - 1))
        ])
    }

    const ClickHint = (e) => {
        if (hint_bool) {
            setCorrect([
                je === verb.je ? true : "hint",
                nous === verb.nous ? true : "hint",
                tu === verb.tu ? true : "hint",
                vous === verb.vous ? true : "hint",
                il === verb.il ? true : "hint",
                ils === verb.ils ? true : "hint",
                passé === verb.passé ? true : "hint",
                (futur === verb.futur || futur === verb.futur.substring(0, (verb.futur).length - 1)) ? true : "hint"
            ])
            let hint = [
                je !== verb.je,
                nous !== verb.nous,
                tu !== verb.tu,
                vous !== verb.vous,
                il !== verb.il,
                ils !== verb.ils,
                passé !== verb.passé,
                futur !== verb.futur && futur !== verb.futur.substring(0, (verb.futur).length - 1)
            ]
            setHint(hint)
            for (let i = 0; i < input_array.length; i++) {
                if (hint[i]) {
                    let field = document.getElementById(`field-${i}`);
                    field.value = "";
                }
            }
        }
        else {
            setCorrect([null, null, null, null, null, null, null, null]);
            setHint([false, false, false, false, false, false, false, false])
        }

        setHintBool(!hint_bool);
    }


    const inputRefs = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 8);
    }, []);

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 8 - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === 'ArrowUp' && index >= 2) {
            inputRefs.current[index - 2].focus();
        } else if (e.key === 'ArrowDown' && index < 8-2) {
            inputRefs.current[index + 2].focus();
        }
    };


    return (
        <>
            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{verb.name}</h2>


                    <div class="grid grid-cols-2 gap-4">
                        {input_array.map((input, id) => (

                            <div>
                                <label>
                                    <input type="text" 
                                    ref={el => (inputRefs.current[id] = el)}
                                    className={style_mapping[correct[id]]} placeholder={hint[id] ? verb[input === "passé composé" ? "passé" : input] : input} 
                                    id={`field-${id}`} 
                                    onChange={onTextfieldChange(input)}
                                    onKeyDown={e => handleKeyDown(e, id)}
                                    />
                                </label>
                            </div>

                            


                        ))}
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary w-24" onClick={CheckAnswer}>检查</button>
                        <button className="btn btn-primary w-24" onClick={ClickHint}>{hint_bool ? "提示" : "隐藏提示"}</button>
                    </div>

                </div>
            </div>
        </>
    )
}