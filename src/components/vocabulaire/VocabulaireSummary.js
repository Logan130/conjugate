import React, { useState, useEffect, useContext } from "react";
import { lessons } from "../../pages/Vocabulaire";
import { useParams, Link } from 'react-router-dom';
import { RiTranslate } from "react-icons/ri";
import { ThemeContext } from "../../context/context";



const Modal = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        // Clear the timeout if the component is unmounted
        // before the timer is finished to prevent memory leaks
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="">
            {/* Your modal content goes here */}
            <p>This modal will disappear after 2 seconds</p>
        </div>
    );
};

export function ChineseParser(english, chinese) {
    let englishIndices = [], chineseIndices = [];
    for (let i = 0; i < english.length; i++) {
        if (english[i] === '(' || english[i] === ')') {
            englishIndices.push(i);
        }
    }

    for (let i = 0; i < chinese.length; i++) {
        if (chinese[i] === '(' || chinese[i] === ')' || chinese[i] === '（' || chinese[i] === '）') {
            chineseIndices.push(i);
        }
    }

    // #parentheses matches exactly
    if (englishIndices.length === chineseIndices.length && englishIndices.length % 2 === 0 && englishIndices.length !== 0) {
        let returnedChineseString = "";
        let prevIndex = 0;
        for (let i = 0; i < englishIndices.length; i += 2) {
            returnedChineseString += chinese.substring(prevIndex, chineseIndices[i]);
            returnedChineseString += english.substring(englishIndices[i], englishIndices[i+1]);
            returnedChineseString += ')';
            prevIndex = chineseIndices[i+1]+1;
        }
        returnedChineseString += chinese.substring(prevIndex);
        return returnedChineseString;
    }

    else if (englishIndices.length !== 0) {
        let returnedChineseString = chinese + ' ';
        for (let i = 0; i < englishIndices.length; i += 2) {
            returnedChineseString += english.substring(englishIndices[i], englishIndices[i+1]);
            returnedChineseString += (i +2 >= englishIndices.length) ? ')' : ') ';
        }
        return returnedChineseString;
    }

    return chinese;
}


export function VocabulaireSummary() {
    const { eng } = useContext(ThemeContext);
    const { id } = useParams();
    let allWords = [];

    for (let lesson of lessons[id].words.lessons) {
        allWords = [...allWords, ...lessons[id]["words"][lesson]]
    }
    let [words, setWords] = useState(allWords);
    let lesson_arr = lessons[id].words.lessons;
    let [lessonID, setLessonID] = useState(-1)
    let [lessonButtonStyle, setLessonButtonStyles] = useState(Array(lesson_arr.length).fill(false));
    let [nouns, setNouns] = useState(allWords.filter((verb) => !!verb.pos && (verb.pos.indexOf("n.") !== -1)))
    let [title, setTitle] = useState((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
    let isMobile = window.innerWidth < 500;
    let [nounOnly, setNounOnly] = useState(false);
    let [voc, setVoc] = useState(allWords);
    let [sortByLetter, SetSortByLetter] = useState(0);
    let [chinese, setChinese] = useState(false);
    let [quizletChinese, setQuizletChinese] = useState(eng ? false : true);

    useEffect(() => {
        setQuizletChinese(eng ? false : true);
        setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit)
    }, [eng])

    useEffect(() => {
        allWords = [];

        for (let lesson of lessons[id].words.lessons) {
            allWords = [...allWords, ...lessons[id]["words"][lesson]]
        }
        setWords(allWords);
        setNouns(allWords.filter((verb) => !!verb.pos && (verb.pos.indexOf("n.") !== -1)));
        setVoc(allWords);
        setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
        setLessonButtonStyles(Array(lesson_arr.length).fill(false));
        setLessonID(-1);
        setNounOnly(false);
        SetSortByLetter(0);
        setPOSButtonID(0);

    }, [id])

    let buttonArr = [
        {
            name: eng ? "All POS" : "全部词性",
            words: allWords,
            filter: "",
            flipped: false
        },
        {
            name: eng ? "n." : "名词",
            words: allWords.filter((verb) => !!verb.pos && (verb.pos.indexOf("n.") !== -1)),
            filter: "n.",
            flipped: false
        },
        {
            name: eng ? "loc." : "结构",
            words: allWords.filter((verb) => !!verb.pos && (verb.pos.indexOf("loc.") !== -1)),
            filter: "loc.",
            flipped: false
        },
        {
            name: eng ? "non loc." : "非结构",
            words: allWords.filter((verb) => !!verb.pos && !(verb.pos.indexOf("loc.") !== -1)),
            filter: "loc.",
            flipped: true
        },
    ]
    let [POSButtonID, setPOSButtonID] = useState(0);

    useEffect(() => {
        // Scroll to the top of the page when component mounts
        window.scrollTo(0, 0); // Scrolls to top-left corner
        // or
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth' // Optionally, you can make it scroll smoothly
        // });
    }, []);

    const onClickSortLetter = (e) => {
        let newVoc = [...voc]
        if (sortByLetter === 0) {
            setVoc(newVoc.sort(function (a, b) {
                if (a.pos < b.pos) { return -1; }
                if (a.pos > b.pos) { return 1; }
                return 0;
            }
            ))
        }
        else if (sortByLetter === 1) {
            setVoc(newVoc.sort(function (a, b) {
                if (a.pos < b.pos) { return 1; }
                if (a.pos > b.pos) { return -1; }
                return 0;
            }
            ))
        }
        else {
            // setVoc(nounOnly ? nouns : words)
            setVoc((lessonID === -1 ? allWords :
                lessons[id].words[lesson_arr[lessonID]])
                .filter(word => !!word.pos && (buttonArr[POSButtonID].flipped ? word.pos.indexOf(buttonArr[POSButtonID].filter) === -1
                    : word.pos.indexOf(buttonArr[POSButtonID].filter) !== -1)))
        }
        SetSortByLetter((sortByLetter + 1) % 3);
    }

    const ArrowComponent = () => {
        if (sortByLetter === 0) {
            return <>👀</>
        }
        else if (sortByLetter === 1) {
            return <>👇🏻</>
        }
        return <>👆🏻</>
    }

    const onClickNoun = (e) => {
        if (!nounOnly) {
            let newVoc = [...voc];
            setVoc(newVoc.filter((verb) => verb.pos && (verb.pos.indexOf("n.") !== -1)))
        }
        else {
            setVoc(words)
        }
        setNounOnly(!nounOnly);

    }

    const onClickPOSNoun = (index) => (e) => {
        setPOSButtonID(index);
        if (lessonID === -1) {
            setVoc(buttonArr[index].words);
        }
        else {
            setVoc(lessons[id].words[lesson_arr[lessonID]].filter(word => !!word.pos && (
                buttonArr[index].flipped ? word.pos.indexOf(buttonArr[index].filter) === -1 : word.pos.indexOf(buttonArr[index].filter) !== -1
            )
            ));
        }
    }

    const onClickLessonButton = (index, les) => (e) => {
        let newLessonButtonStyles = Array(lesson_arr.length).fill(false);
        if (lessonButtonStyle[index] === true) {
            setLessonID(-1);
            setWords(allWords)
            // setVoc(allWords)
            setVoc(allWords.filter(word => !!word.pos && (
                buttonArr[POSButtonID].flipped ? word.pos.indexOf(buttonArr[POSButtonID].filter) === -1 : word.pos.indexOf(buttonArr[POSButtonID].filter) !== -1
            )
            ));
            setLessonButtonStyles(newLessonButtonStyles)
            setNouns(allWords.filter((verb) => !!verb.pos && (verb.pos.indexOf("n.") !== -1)))
            return;
        }
        setLessonID(index);
        newLessonButtonStyles[index] = true;
        // setWords(lessons[id].words[les])
        // setVoc(lessons[id].words[les])
        setLessonButtonStyles(newLessonButtonStyles)
        // setNouns(lessons[id].words[les].filter((word) => !!word.pos && (word.pos.indexOf("n.") !== -1)))
        setVoc(lessons[id].words[les].filter(word => !!word.pos && (
            buttonArr[POSButtonID].flipped ? word.pos.indexOf(buttonArr[POSButtonID].filter) === -1 : word.pos.indexOf(buttonArr[POSButtonID].filter) !== -1
        )
        ));
    }

    const onClickChinese = (e) => {
        setChinese(!chinese);
    }

    const copyToClipboard = () => {
        const textToCopy = voc.map(item =>
            // POSButtonID === 2 ? `${item.french}\t\t${item.english} ${item.chinese}` : `${item.french}\t\t${item.pos} ${item.english} ${item.chinese}`
            `${item.french}\t\t${item.pos} ${item.english} ${quizletChinese ? item.chinese : ""}`
        ).join('\n');
        navigator.clipboard.writeText(textToCopy);
        document.getElementById('my_modal_2').showModal()
    };


    return (
        <>
            <div className={isMobile ? "grid grid-cols-6 gap-1 text-xl align-center justify-center text-center" : "grid grid-cols-6 gap-1 text-4xl align-center justify-center text-center"}>
                <Link to={`/vocsum/${(Number(id)-1) === -1 ? 0 : (Number(id)-1)}`} className="col-span-1">
                    <button className="btn btn-circle mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={isMobile ? "h-6 w-6" : "h-6 w-6"}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </Link>

                <div className="col-span-4 text-center p-3">
                {title}
                </div>

                <Link to={`/vocsum/${((Number(id))+1 === lessons.length ? lessons.length-1 : (Number(id) + 1))}`} className="col-span-1">
                    <button className="btn btn-circle ml-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 6l6 6-6 6"
                            />
                        </svg>
                    </button>
                </Link>



            </div>
            <br />


            <div>
                <div className={isMobile ? "grid grid-cols-5 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {buttonArr.map((button, id) => <>
                        <button className={id === POSButtonID ? "btn btn-warning w-full" : "btn btn-warning btn-outline w-full"} onClick={onClickPOSNoun(id)}>{button.name}</button>
                    </>)}
                    <button className={"btn btn-info btn-outline w-full"} onClick={() => { window.location.href = window.location.hostname === "localhost" ? `./#/vocunit/${id}/0` : `https://logan130.github.io/conjugate/#/vocunit/${id}/0` }}>{eng ? "Practice" : "练习"}</button>
                </div>
                <br />

            </div>

            <div>
                <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {lesson_arr.map((les, lesson_id) => (<>
                        <button className={lessonButtonStyle[lesson_id] ? "btn btn-success w-full break-all" : "btn btn-success btn-outline w-full break-all"} onClick={onClickLessonButton(lesson_id, les)}>
                            {(eng && lessons[id].words.lessonsEng) ? lessons[id].words["lessonsEng"][lesson_id] : les}
                        </button>
                    </>))}
                </div>
                <br />

            </div>


            {!eng &&
                <p className={isMobile ? "text-sm" : ""}>
                    点击词性可排序，
                    <span className="underline font-bold text-amber-600">
                        点击释义 <RiTranslate className="align-super inline" /> 可切换中英
                    </span>
                    。<span className="underline font-bold txt-rose-400 text-violet-400">如果熟悉英语建议看英语释义</span> <span>, 英文释义是我手打的，有附加固定搭配用法和常见例子。如果你不熟悉英文选择看中文释义，则有一些用户注意事项，一定要<Link className="underline font-bold text-violet-400" to='/warning'>《点击看这篇解释》</Link>。</span>
                </p>
            }

            <br />






            <div className="overflow-x-auto">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className={POSButtonID === 2 ? (isMobile ? "text-lg w-40" : "text-lg w-60") : "text-lg w-20"}>{eng ? "voc" : "单词"}</th>
                            {(!isMobile || POSButtonID !== 2) && <th className="text-lg w-10 cursor-pointer hover:bg-sky-700 rounded-lg" onClick={onClickSortLetter}>{eng ? "POS" : "词性"}{ArrowComponent()}</th>}
                            <th className="text-lg cursor-pointer" onClick={onClickChinese}><div className="flex justify-left"> <p className={isMobile ? "flex justify-left text-amber-600" : "hover:bg-sky-700 rounded-lg flex justify-left text-amber-600"}>{eng ? "def" : "释义"} <RiTranslate /></p>  </div></th>
                            {/* <th>
                                <button className="btn btn-active btn-neutral">
                                <div className="flex justify-left"> <p className="flex justify-left">释义 <RiTranslate /></p>  </div>
                                </button>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>


                        {voc.map((word, id) => (<>
                            <tr className={isMobile ? "" : "text-lg"}>
                                <th className={isMobile ? "" : "text-sm"}>{word.french}</th>
                                {(!isMobile || POSButtonID !== 2) && <th className={isMobile ? "" : "text-sm"}>{word.pos}</th>}
                                <th className={isMobile ? "" : "text-sm"}> 
                                {chinese ? ChineseParser(word.english, word.chinese) : word.english}
                                </th>
                            </tr>
                        </>))}
                    </tbody>
                </table>
            </div>







            <br /><br />
            <h1 className="text-xl">{eng ? `For Quizlet or Anki (Format: word and def separated by two escape characters "\\t\\t")` : "Quizlet或Anki导入专用，格式：单词和释义之间用两个tab (逃脱字符为“\\t\\t”)分割"}</h1>

            <div>
                <textarea
                    className="w-full h-96 pl-3 pt-2"
                    readOnly
                    value={
                        voc.map(item =>
                            // POSButtonID === 2 ? `${item.french}\t\t${item.english} ${quizletChinese ? item.chinese : ""}` : `${item.french}\t\t${item.pos} ${item.english} ${quizletChinese ? item.chinese : ""}`
                            `${item.french}\t\t${item.pos} ${item.english} ${quizletChinese ? item.chinese : ""}`
                        ).join('\n')
                    }
                />
            </div>

            <button className="btn btn-outline btn-error mt-2" onClick={copyToClipboard}>{eng ? "Copy" : "复制"}</button>
            <button className="btn btn-outline btn-error ml-4 mt-2" onClick={() => setQuizletChinese(!quizletChinese)}>{quizletChinese ? (eng ? "Delete Chinese" : "去除中文") : (eng ? "Show Chinese" : "保留中文")}</button>
            {/* {modalVisible && <Modal onClose={hideModal} />} */}

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