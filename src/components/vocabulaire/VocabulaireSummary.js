import React, { useState, useEffect, useContext } from "react";
import { lessons, protectedLessonsIndex } from "../../pages/Vocabulaire";
import { useParams, Link } from 'react-router-dom';
import { RiTranslate } from "react-icons/ri";
import { ThemeContext } from "../../context/context";
import { ErrorPage } from "../shared/404";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { promptChinese, promptEnglish } from "./prompt";

const apiKey = process.env.REACT_APP_API_KEY;

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
            returnedChineseString += english.substring(englishIndices[i], englishIndices[i + 1]);
            returnedChineseString += ')';
            prevIndex = chineseIndices[i + 1] + 1;
        }
        returnedChineseString += chinese.substring(prevIndex);
        return returnedChineseString;
    }

    else if (englishIndices.length !== 0) {
        let returnedChineseString = chinese + ' ';
        for (let i = 0; i < englishIndices.length; i += 2) {
            returnedChineseString += english.substring(englishIndices[i], englishIndices[i + 1]);
            returnedChineseString += (i + 2 >= englishIndices.length) ? ')' : ') ';
        }
        return returnedChineseString;
    }

    return chinese;
}

function Cards({ words, chinese }) {
    let isMobile = window.innerWidth < 500;
    let [cardIndex, setCardIndex] = useState(0);
    let [french, setFrench] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        setCardIndex(0);
    }, [words]);

    if (words.length === 0) {
        return <></>
    }

    const onClickLeftArrow = (e) => {
        e.stopPropagation();
        setCardIndex(cardIndex === 0 ? 0 : cardIndex - 1);
    }

    const onClickRightArrow = (e) => {
        e.stopPropagation();
        setCardIndex(cardIndex === words.length - 1 ? cardIndex : cardIndex + 1);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            setCardIndex(cardIndex === 0 ? 0 : cardIndex - 1);
        }
        else if (e.key === 'ArrowRight') {
            setCardIndex(cardIndex === words.length - 1 ? cardIndex : cardIndex + 1);
        }
        else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            setFrench(!french);
        }
    };

    const onClickCard = (e) => {
        setFrench(!french);
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const SWIPE_THRESHOLD = 50;

        if (distance > SWIPE_THRESHOLD) {
            // Swiped left
            setCardIndex(cardIndex === words.length - 1 ? cardIndex : cardIndex + 1);
        } else if (distance < -SWIPE_THRESHOLD) {
            // Swiped right
            setCardIndex(cardIndex === 0 ? 0 : cardIndex - 1);
        }

        setTouchStart(null);
        setTouchEnd(null);
    }

    return (
        <>
            <div className="flex items-center justify-center h-96">
                <div
                    className={`card bg-base-200 ${isMobile ? 'w-full' : 'w-1/3'} shadow-xl align-center justify-center transition-transform ease-in-out duration-1000 ${french ? 'flip-horizontal-disable' : ''}`}
                    onKeyDown={handleKeyDown}
                    style={{ outline: 'none' }}
                    tabIndex="0"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <figure>
                        <p>
                            {french ? 'french' : 'definition'}
                        </p>
                    </figure>

                    <div className="card-body" onClick={onClickCard}>
                        <br />
                        <br />
                        <p className="text-center text-3xl">
                            {french ? ChineseParser(words[cardIndex].english, words[cardIndex].french)
                                :
                                words[cardIndex].pos + " " + (chinese ? ChineseParser(words[cardIndex].english, words[cardIndex].chinese) : words[cardIndex].english)
                            }
                        </p>
                        <br />
                        <br />

                        <div className="card-actions justify-evenly">
                            <div className="btn" onClick={onClickLeftArrow}><FaArrowAltCircleLeft /></div>
                            <div className="btn" onClick={onClickRightArrow}><FaArrowAltCircleRight /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Title({ title, id }) {
    let isMobile = window.innerWidth < 500;
    return (<>
        <div className={isMobile ? "grid grid-cols-6 gap-1 text-xl align-center justify-center text-center" : "grid grid-cols-6 gap-1 text-4xl align-center justify-center text-center"}>
            <Link to={`/vocsum/${(Number(id) - 1) === -1 ? 0 : (Number(id) - 1)}`} className="col-span-1">
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

            <Link to={`/vocsum/${((Number(id)) + 1 === lessons.length ? lessons.length - 1 : (Number(id) + 1))}`} className="col-span-1">
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
    </>)
}

function articleParser(word) {
    if ( (!word.pos.includes('n.m.') && !word.pos.includes('n.f.')) || word.french[0] === 'h') {
        return word.french;
    }
    if (word.pos.includes('pl.'))
        return word.french
    let vowels = ["a", "i", "o", "e", "y", "u", "é", "ê", "è", "î", "ï", "à"];
    if (vowels.includes(word.french[0]))
        return "l'" + word.french;
    return word.pos.includes('n.m.') ? `le ${word.french}` : `la ${word.french}`;
}



export function VocabulaireSummary() {
    const { eng, theme } = useContext(ThemeContext);
    const { id } = useParams();
    let lesson_arr = id < lessons.length ? lessons[id].words.lessons : [];

    useEffect(() => {
        if (id < lessons.length) {
            setQuizletChinese(eng ? false : true);
            setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit)
        }
    }, [eng, id])

    useEffect(() => {
        if (id < lessons.length) {
            var allWords = [];
            for (let lesson of lessons[id].words.lessons) {
                allWords = [...allWords, ...lessons[id]["words"][lesson]]
            }
            setVoc(allWords);
            setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
            setLessonButtonStyles(Array(lesson_arr.length).fill(false));
            setLessonID(-1);
            SetSortByLetter(0);
            setPOSButtonID(0);
        }
    }, [id, eng, lesson_arr.length]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top-left corner
    }, []);

    let allWords = [];

    if (id < lessons.length) {
        for (let lesson of lessons[id].words.lessons) {
            allWords = [...allWords, ...lessons[id]["words"][lesson]]
        }
    }

    // let lesson_arr = id < lessons.length ? lessons[id].words.lessons : [];
    let [lessonID, setLessonID] = useState(-1)
    let [lessonButtonStyle, setLessonButtonStyles] = useState(Array(lesson_arr.length).fill(false));
    let [title, setTitle] = useState(id < lessons.length ?
        ((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit) :
        ""
    );
    let isMobile = window.innerWidth < 500;
    let [voc, setVoc] = useState(allWords);
    let [sortByLetter, SetSortByLetter] = useState(0);
    let [chinese, setChinese] = useState(false);
    let [quizletChinese, setQuizletChinese] = useState(eng ? false : true);
    let [POSButtonID, setPOSButtonID] = useState(0);

    if (id >= lessons.length) {
        return <ErrorPage />
    }

    if (protectedLessonsIndex.has(Number(id)) && localStorage.getItem('password') !== apiKey) {
        return <ErrorPage />
    }

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
        {
            name: eng ? "highlight" : "高亮",
            words: allWords.filter((verb) => !!verb.highlight && (verb.highlight)),
            filter: "highlight",
            flipped: false
        },
    ]

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


    const onClickPOSNoun = (index) => (e) => {
        setPOSButtonID(index);
        if (lessonID === -1) {
            console.log(buttonArr[index].words, index, 'debug')
            setVoc(buttonArr[index].words);
        }
        else {
            setVoc(lessons[id].words[lesson_arr[lessonID]].filter(word => !!word.pos && (
                buttonArr[index].flipped ? word.pos.indexOf(buttonArr[index].filter) === -1 : word.pos.indexOf(buttonArr[index].filter) !== -1
            )
            ));
        }
        if (lessonID !== -1 && index === 4) {
            setVoc(
                lessons[id].words[lesson_arr[lessonID]].filter(word => !!word.highlight && word.highlight)
            );
        }
    }

    const onClickLessonButton = (index, les) => (e) => {
        let newLessonButtonStyles = Array(lesson_arr.length).fill(false);
        if (lessonButtonStyle[index] === true) {
            setLessonID(-1);
            setVoc(allWords.filter(word => !!word.pos && (
                buttonArr[POSButtonID].flipped ? word.pos.indexOf(buttonArr[POSButtonID].filter) === -1 : word.pos.indexOf(buttonArr[POSButtonID].filter) !== -1
            )
            ));
            if (POSButtonID === 4) {
                setVoc(buttonArr[4].words);
            }
            setLessonButtonStyles(newLessonButtonStyles)
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

        if (POSButtonID === 4) {
            setVoc(
                lessons[id].words[les].filter(word => !!word.highlight && word.highlight)
            );
        }
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

    const copyToClipBoardGPT = (english) => {
        let wordList = voc.map(item =>
            `${item.french}\t\t${item.pos} ${item.english} `
        ).join('\n');

        let textToCopy = english ? promptEnglish(wordList, voc.length) : promptChinese(wordList, voc.length);
        navigator.clipboard.writeText(textToCopy);
        document.getElementById('my_modal_2').showModal()
    }


    return (
        <>
            <Title id={id} title={title} />

            <div>
                <div className={isMobile ? "grid grid-cols-5 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {buttonArr.map((button, id) => <>
                        <button className={id === POSButtonID ? "btn btn-warning w-full" : "btn btn-warning btn-outline w-full"} onClick={onClickPOSNoun(id)}>{button.name}</button>
                    </>)}
                    {!isMobile &&
                        <button className={"btn btn-info btn-outline w-full"} onClick={() => { window.location.href = window.location.hostname === "localhost" ? `./#/vocunit/${id}/0` : `https://logan130.github.io/conjugate/#/vocunit/${id}/0` }}>{eng ? "Practice" : "练习"}</button>
                    }
                </div>
                <br />

            </div>

            <div>
                <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    {lesson_arr.map((les, lesson_id) => {
                        let buttonText = (eng && lessons[id].words.lessonsEng) ? lessons[id].words["lessonsEng"][lesson_id] : les;
                        return (<>
                            <button className={lessonButtonStyle[lesson_id] ? `btn btn-success w-full break-all p-1 ${isMobile && buttonText.length > 8 ? 'text-xs' : ''}` : `btn btn-success btn-outline w-full break-all p-1 ${isMobile && buttonText.length > 8 ? 'text-xs' : ''}`} onClick={onClickLessonButton(lesson_id, les)}>
                                {buttonText}
                            </button>
                        </>)
                    })}
                </div>
                <br />

            </div>


            {!eng &&
                <p className={isMobile ? "text-sm" : ""}>
                    点击词性可排序，
                    <span className=" font-bold text-amber-600">
                        点击释义 <RiTranslate className="align-super inline" /> 可切换中英
                    </span>
                    。<span className="font-bold txt-rose-400 text-violet-400">如果熟悉英语建议看英语释义</span> <span>, 英文释义是我手打的，有附加固定搭配用法和常见例子。如果你不熟悉英文选择看中文释义，则有一些用户注意事项，如果你看中文释义一定要<Link className="font-bold link link-warning" to='/warning'>《点击看这篇解释》</Link>，这篇文章解释了中文注释的生成机制和缺陷。</span>
                </p>
            }

            <br />


            <div className="overflow-x-auto">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="w-1"></th>
                            <th className={POSButtonID === 2 ? (isMobile ? "text-lg w-40" : "text-lg w-60") : "text-lg w-32"}>{eng ? "voc" : "单词"}</th>
                            {(!isMobile || POSButtonID !== 2) && <th className="text-lg w-10 cursor-pointer hover:bg-sky-700 rounded-lg" onClick={onClickSortLetter}>{eng ? "POS" : "词性"}{ArrowComponent()}</th>}
                            <th className="text-lg cursor-pointer" onClick={onClickChinese}><div className="flex justify-left"> <p className={isMobile ? "flex justify-left text-amber-600" : "hover:bg-sky-700 rounded-lg flex justify-left text-amber-600"}>{eng ? "def" : "释义"} <RiTranslate /></p>  </div></th>
                        </tr>
                    </thead>
                    <tbody>


                        {voc.map((word, id) => (
                            <>
                                {!!word.highlight ?
                                    <tr className={isMobile ? "" : "text-lg"}>
                                        <th className={theme === 'dark' ? "w-1 text-yellow-400" : "w-1 text-red-500"}>{id + 1}</th>
                                        <th className={isMobile ? `text-${theme === 'dark' ? 'yellow-400' : 'red-500'}` : `text-${theme === 'dark' ? 'yellow-400' : 'red-500'} text-sm`}>{articleParser(word)}</th>
                                        {(!isMobile || POSButtonID !== 2) && <th className={isMobile ? `text-${theme === 'dark' ? 'yellow-400' : 'red-500'}` : `text-${theme === 'dark' ? 'yellow-400' : 'red-500'} text-sm`}>{word.pos}</th>}
                                        <th className={isMobile ? `text-${theme === 'dark' ? 'yellow-400' : 'red-500'}` : `text-${theme === 'dark' ? 'yellow-400' : 'red-500'} text-sm`}>
                                            {chinese ? ChineseParser(word.english, word.chinese) : word.english}
                                        </th>
                                    </tr>
                                    :
                                    <tr className={isMobile ? "" : "text-lg"}>
                                        <th className="w-1 opacity-50">{id + 1}</th>
                                        <th className={isMobile ? "" : "text-sm"}>{articleParser(word)}</th>
                                        {(!isMobile || POSButtonID !== 2) && <th className={isMobile ? "" : "text-sm"}>{word.pos}</th>}
                                        <th className={isMobile ? "" : "text-sm"}>
                                            {chinese ? ChineseParser(word.english, word.chinese) : word.english}
                                        </th>
                                    </tr>
                                }
                            </>
                        ))}
                    </tbody>
                </table>
            </div>



            <br /><br />
            <h1 className={isMobile ? "text-sm" : "text-xl"}>⭐️ {eng ? `For Quizlet or Anki (Format: word and def separated by two escape characters "\\t\\t")` : "复制按钮为Quizlet或Anki导入专用，格式：单词和释义之间用两个tab (逃脱字符为“\\t\\t”)分割"}</h1>
            <h1 className={isMobile ? "text-sm" : "text-xl"}>⭐️ {eng ? "Once input into GPT, the prompt from the prompt button generates example sentences using the words above" : "点击LLM指令按钮即可获取指令，输入GPT可生成用以上词组造的例句"}</h1>


            <div>
                <textarea
                    className="w-full h-96 pl-3 pt-2"
                    readOnly
                    value={
                        voc.map(item =>
                            `${item.french}\t\t${item.pos} ${item.english} ${quizletChinese ? item.chinese : ""}`
                        ).join('\n')
                    }
                />
            </div>

            <div className={isMobile ? "flex flex-wrap gap-2 mt-2 text-xs p-0" : "flex flex-wrap gap-4 mt-2"}>
                <button className={isMobile ? "btn btn-outline btn-error text-xs p-4" : "btn btn-outline btn-error"} onClick={copyToClipboard}>{eng ? "Copy" : "复制"}</button>
                <button className={isMobile ? "btn btn-outline btn-error text-xs p-2" : "btn btn-outline btn-error"} onClick={() => setQuizletChinese(!quizletChinese)}>{quizletChinese ? (eng ? "Delete Chinese" : "去除中文") : (eng ? "Show Chinese" : "保留中文")}</button>
                <button className={isMobile ? "btn btn-outline btn-error text-xs p-2" : "btn btn-outline btn-error"} onClick={() => copyToClipBoardGPT(true)}>{eng ? "English Prompt" : "LLM指令英文"}</button>
                <button className={isMobile ? "btn btn-outline btn-error text-xs p-2" : "btn btn-outline btn-error"} onClick={() => copyToClipBoardGPT(false)}>{eng ? "Chinese Prompt" : "LLM指令中文"}</button>
            </div>

            {/* <br /><br /><br /> */}


            <br />
            <Cards words={voc} chinese={chinese} />



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