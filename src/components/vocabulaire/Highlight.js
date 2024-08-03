import React, { useState, useEffect, useContext, useRef } from "react";
import { lessons, protectedLessonsMax, protectedLessonsIndex } from "../../pages/Vocabulaire";
import { useParams, Link } from 'react-router-dom';
import { RiTranslate } from "react-icons/ri";
import { ThemeContext } from "../../context/context";
import { ErrorPage } from "../shared/404";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { promptChinese, promptEnglish } from "./prompt";


function CheckBox({ onClickCheckBox, index }) {
    return (<>
        <div className="form-control">
            <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" onClick={onClickCheckBox(index)} />
            </label>
        </div>
    </>)
}

function VocTable({ checkedIndices, checkBoxNameArr }) {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 500;
    let [voc, setVoc] = useState(new Array())

    useEffect(() => {
        voc = [];
        for (let index of Array.from(checkedIndices)) {
            let units = checkBoxNameArr[index].units;
            for (let unit of units) {
                let words = unit.words;
                let lessons = words.lessons;
                for (let lesson of lessons) {
                    voc = [...voc, ...words[lesson].filter(word => !!word.highlight && word.highlight)]
                }
            }
        }
        setVoc(voc)
    }, [checkedIndices])

    const copyToClipboard = () => {
        const textToCopy = voc.map(item =>
            // POSButtonID === 2 ? `${item.french}\t\t${item.english} ${item.chinese}` : `${item.french}\t\t${item.pos} ${item.english} ${item.chinese}`
            `${item.french}\t\t${item.pos} ${item.english}`
        ).join('\n');
        navigator.clipboard.writeText(textToCopy);
        document.getElementById('my_modal_2').showModal()
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th className="w-1"></th>
                            <th className={"text-lg w-20"}>{eng ? "voc" : "单词"}</th>
                            <th className="text-lg w-10 cursor-pointer hover:bg-sky-700 rounded-lg" >{eng ? "POS" : "词性"}</th>
                            <th className="text-lg cursor-pointer"><div className="flex justify-left"> <p className={isMobile ? "flex justify-left text-amber-600" : "hover:bg-sky-700 rounded-lg flex justify-left text-amber-600"}>{eng ? "def" : "释义"} <RiTranslate /></p>  </div></th>
                        </tr>
                    </thead>

                    <tbody>
                        {voc.map((word, id) => (
                            <>
                                <tr className={isMobile ? "" : "text-lg"}>
                                    <th className="w-1 opacity-50">{id + 1}</th>
                                    <th className={isMobile ? "" : "text-sm"}>{word.french}</th>
                                    <th className={isMobile ? "" : "text-sm"}>{word.pos}</th>
                                    <th className={isMobile ? "" : "text-sm"}>
                                        {word.english}
                                    </th>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />

            <div>
                <textarea
                    className="w-full h-96 pl-3 pt-2"
                    readOnly
                    value={
                        voc.map(item =>
                            `${item.french}\t\t${item.pos} ${item.english}`
                        ).join('\n')
                    }
                />
            </div>

            <div className={isMobile ? "flex flex-wrap gap-2 mt-2 text-xs p-0" : "flex flex-wrap gap-4 mt-2"}>
                <button className={isMobile ? "btn btn-outline btn-error text-xs p-4" : "btn btn-outline btn-error"} onClick={copyToClipboard}>{eng ? "Copy" : "复制"}</button>
            </div>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{eng ? "Copied!" : "已复制"}</h3>
                    <p className="py-4">{eng ? "Press ESC key or click outside to close" : "按任意键关闭弹窗"}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    )
}


export function HighlightPage() {
    let checkBoxNameArr = [
        {
            name: 'Taxi A1',
            units: lessons.filter(unit => unit.tag === 'Taxi' && unit.book === 'A1'),
        },
        {
            name: 'Voc A1 L1-10',
            units: lessons.filter(unit => unit.tag === 'Vocabulaire Progressif' && unit.book === 'A1').slice(0, 10)
        }
    ];

    let [checkedIndices, setCheckedIndices] = useState(new Set());

    const onClickCheckBox = (index) => (e) => {
        if (checkedIndices.has(index)) {
            checkedIndices.delete(index)
        }
        else {
            checkedIndices.add(index);
        }
        setCheckedIndices(new Set(checkedIndices));
    }


    return (<>

        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Checkbox</th>
                        <th>Book</th>
                    </tr>
                </thead>
                <tbody>
                    {checkBoxNameArr.map((book, id) => <tr>
                        <th>{id + 1}</th>
                        <td><CheckBox index={id} onClickCheckBox={onClickCheckBox} /></td>
                        <td>{book.name}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>

        <VocTable checkBoxNameArr={checkBoxNameArr} checkedIndices={checkedIndices} />

    </>)
}

