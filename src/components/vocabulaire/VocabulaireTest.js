// import { words } from "../../data/vocabulaire/taxi1/u1";
import React, { useState, useRef, useEffect, useContext } from "react";
import { lessons } from "../../pages/Vocabulaire";
import { useParams } from 'react-router-dom';
import { ThemeContext } from "../../context/context";
import { ChineseParser } from "./VocabulaireSummary";


function nounFilter(arr) {
    return arr.filter((word) => !!word.pos && word.pos.indexOf('n.') !== -1)
}

export function VocabulaireTest() {
    const { eng } = useContext(ThemeContext);

    let isMobile = window.innerWidth < 500;
    const { id, gender } = useParams();

    let [title, setTitle] = useState((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit);
    useEffect(() => {
        setTitle((eng && !!lessons[id].engUnit) ? lessons[id].engUnit : lessons[id].unit)
    }, [eng, id])

    let allWords = [];
    for (let lesson of lessons[id].words.lessons) {
        allWords = [...allWords, ...lessons[id]["words"][lesson]]
    }
    // filter out phrases
    allWords = allWords.filter((word) => word.pos !== "loc.")

    let [words, setWords] = useState(allWords);
    let allNouns = nounFilter(allWords);
    let [nouns, setNouns] = useState(allNouns);
    let [numWords, setNumberWords] = useState(allWords.length);
    let [spellCheck, setSpellCheck] = useState(false);

    let lesson_arr = lessons[id].words.lessons;
    let [lessonButtonStyle, setLessonButtonStyles] = useState(Array(lesson_arr.length).fill(false));

    let input_style_null = isMobile ? 'grow input input-bordered w-28 h-8 text-xs font-bold' : 'grow input input-bordered w-32';
    let input_style_correct = isMobile ? 'grow input input-bordered input-success w-28 h-8 text-xs font-bold' : 'grow input input-bordered input-success w-32';
    let input_style_error = isMobile ? 'grow input input-bordered input-error w-28 h-8 text-xs font-bold' : 'grow input input-bordered input-error w-32';
    let tab_non_active = "tab text-xs", tab_active = "tab tab-active text-xs"

    let buttonsArr = [
        {
            name: eng ? "Practice All" : "拼写全部",
            index: 0,
            words: words,
        },
        {
            name: eng ? "Practice Nouns" : "拼写名词",
            index: 1,
            words: allNouns,
        }
    ]
    const [buttonStyles, setButtonStyles] = useState([true, false]);
    let [vocabs, setVoc] = useState(allWords);
    const inputRefs = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    let [inputStyle, setInputStyle] = useState(Array(words.length).fill(input_style_null));
    let [inputs, setInputs] = useState(Array(words.length).fill(""))
    let [hint, setHint] = useState(false)
    let [corrects, setCorrects] = useState(words.map(dic => dic.french));

    let [genderDictee, setGenderDictee] = useState(gender === "1");
    let [genders, setGenders] = useState(Array(allNouns.length).fill(null));
    let [genderStyle, setGenderStyle] = useState(Array(allNouns.length).fill([tab_non_active, tab_non_active, tab_non_active]));
    let [genderHint, setGenderHint] = useState(false);

    let [chinese, setChinese] = useState(false);
    const onClickChinese = (e) => {
        setChinese(!chinese);
    }

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, vocabs.length);
        let newInputStyle = Array(vocabs.length).fill(input_style_null);
        setInputStyle(newInputStyle);
        setCorrects(vocabs.map(dic => dic.french));
        setInputs(Array(vocabs.length).fill(""))
    }, [vocabs, input_style_null]);


    const onClickButton = (id) => (e) => {
        let newButtonStyles = [false, false];
        newButtonStyles[id] = !newButtonStyles[id];
        setButtonStyles(newButtonStyles);
        setVoc(id === 0 ? words : nouns);
        const inputFields = document.querySelectorAll('input[type="text"]');

        inputFields.forEach((input) => {
            input.value = '';
        });

        if (id === 1) {
            setNumberWords(nouns.length);
        }
        else {
            setNumberWords(words.length);
        }
    }

    const onCheck = (e) => {
        if (!spellCheck) {
            let newStyleArr = [];
            for (let i = 0; i < vocabs.length; i++) {
                if (inputs[i] === corrects[i]) {
                    newStyleArr.push(input_style_correct)
                }
                else {
                    newStyleArr.push(input_style_error)
                }
            }
            setInputStyle(newStyleArr);
        }
        else {
            setInputStyle(Array(vocabs.length).fill(input_style_null));
        }

        setSpellCheck(!spellCheck);
    }

    const onTextfieldChange = (id) => (e) => {
        let newInputs = [...inputs];
        newInputs[id] = e.target.value;
        setInputs(newInputs);
    }

    const handleKeyDown = (index) => (e) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            // inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 8 - 1) {
            // inputRefs.current[index + 1].focus();
        } else if (e.key === 'ArrowUp' && index >= 1) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowDown' && index < numWords - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === 'Enter' && index < numWords - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const onClickHint = (e) => {
        if (!hint) {
            let newStyleArr = [];
            for (let i = 0; i < vocabs.length; i++) {
                if (inputs[i] === corrects[i]) {
                    newStyleArr.push(input_style_correct)
                }
                else {
                    newStyleArr.push(input_style_error)
                }
            }
            setInputStyle(newStyleArr);
        }
        else {
            setInputStyle(Array(words.length).fill(input_style_null));
        }
        setHint(!hint);

    }

    const onClickGender = (index) => (e) => {
        if (index === 0) {
            setGenderDictee(false)
        }
        else {
            setGenderDictee(true);
        }
    }

    const onChangeTab = (id, tab, val) => (e) => {
        let newGenderStyle = [...genderStyle];
        newGenderStyle[id] = [tab_non_active, tab_non_active, tab_non_active];
        newGenderStyle[id][tab] = tab_active;
        setGenderStyle(newGenderStyle);
        let newGender = [...genders];
        newGender[id] = val;
        setGenders(newGender);
    }

    const checkGender = (id, pos, english) => {
        if (!genderHint) {
            return <></>
        }
        if (genders[id] === null) {
            return <div className="text-yellow-500 font-bold pr-2">{pos} {english}</div>
        }

        let correct = false;
        if (nouns[id].pos.indexOf("n.m.") !== -1 && genders[id] === "n.m.") {
            correct = true;
        }
        else if (nouns[id].pos.indexOf("n.f.") !== -1 && genders[id] === "n.f.") {
            correct = true;
        }
        else if (nouns[id].pos !== "n.m." && nouns[id].pos !== "n.f." && genders[id] !== "n.m." && genders[id] !== "n.f.") {
            correct = true;
        }
        if (correct)
            return <div className="text-teal-500 font-bold pr-2">{pos} {english}</div>
        return <div className="text-red-500 font-bold pr-2">{pos} {english}</div>
    }

    const onClickGenderHint = (e) => {
        let newGenders = [...genders]
        let newGenderStyle = [...genderStyle];


        for (let i = 0; i < newGenders.length; i++) {
            newGenders[i] = (nouns)[i].pos;
            newGenderStyle[i] = [tab_non_active, tab_non_active, tab_non_active];

            let correct_gender = (nouns)[i].pos, correct_index = 0;
            if (correct_gender === "n.m." || correct_gender === "n.m.pl.") {
                correct_index = 0;
            }
            else if (correct_gender === "n.f." || correct_gender === "n.f.pl.") {
                correct_index = 1;
            }
            else {
                correct_index = 2;
            }
            newGenderStyle[i][correct_index] = tab_active;
        }
        // setGenders(newGenders);
        // setGenderStyle(newGenderStyle);
        setGenderHint(!genderHint);
    }

    const onClickLessonButton = (index, les) => (e) => {
        let newLessonButtonStyles = Array(lesson_arr.length).fill(false);
        if (lessonButtonStyle[index] === true) {
            setWords(allWords)
            setVoc(allWords)
            setLessonButtonStyles(newLessonButtonStyles)

            let number_of_nous = nounFilter(allWords).length
            setGenders(Array(number_of_nous).fill(null))
            setGenderStyle(Array(number_of_nous).fill([tab_non_active, tab_non_active, tab_non_active]));
            setNouns(nounFilter(allWords))
            return;
        }
        newLessonButtonStyles[index] = true;
        setWords(lessons[id].words[les].filter(word => !!word.pos && word.pos !== 'loc.'))
        setVoc(lessons[id].words[les].filter(word => !!word.pos && word.pos !== 'loc.'))
        setLessonButtonStyles(newLessonButtonStyles);

        let number_of_nous = nounFilter(lessons[id].words[les].filter(word => !!word.pos && word.pos !== 'loc.')).length
        setGenders(Array(number_of_nous).fill(null))
        setGenderStyle(Array(number_of_nous).fill([tab_non_active, tab_non_active, tab_non_active]));
        setNouns(nounFilter(lessons[id].words[les]))
    }

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



    return (<>

        <>
            <div className={isMobile ? "text-3xl align-center justify-center text-center" : "text-4xl align-center justify-center text-center"}>{title}</div>
            <br />

            {/* <div role="alert" className="alert alert bg-orange-600 font-bold text-black">
                <span>
                    {eng ?
                        "I used FSL from GPT for data cleaning of my notes. Since LLMs are prone to hallucinations, some definitions have errors. Pls refer to a dictionary if you think a def is wrong."
                        :
                        "我洗笔记数据时用了GPT的少样本学习，由于大语言模型可能产生幻觉，极小部分答案可能是错的，如有冲突以词典为准。如果熟悉英语建议看英文释义，所有英文释义我都手动查过词典，大部分单词英文有完美对应词汇，中文释义为GPT填充"
                    }
                </span>
            </div>
            <br /> */}

            <div>
                <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                    <button className={!genderDictee ? "btn btn-warning w-full" : "btn btn-warning btn-outline w-full"} onClick={onClickGender(0)}>{eng ? "Spelling" : "练习拼写"}</button>
                    <button className={genderDictee ? "btn btn-warning w-full" : "btn btn-warning btn-outline w-full"} onClick={onClickGender(1)}>{eng ? "Gender" : "练习阴阳"}</button>
                    <button className={"btn btn-secondary btn w-full"} onClick={onClickChinese}>{chinese ? (eng ? "English Def" : "换英文释义") : (eng ? "Chinese Def" : "换中文释义")}</button>
                    <button className={"btn btn-info btn-outline w-full"} onClick={() => { window.location.href = window.location.hostname === "localhost" ? `./#/vocsum/${id}` : `https://logan130.github.io/conjugate/#/vocsum/${id}` }}>{eng ? "Voc List" : "单词表"}</button>
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



            {genderDictee ?
                <div className="">
                    <div className="text-xl mb-2">{eng ? "Match the gender" : "点击匹配正确的阴阳性"}</div>
                    <div className={isMobile ? "" : "flex justify-left"}>
                        <button className={isMobile ? "btn btn-primary w- m-2" : "btn btn-primary w- m-2"} onClick={onClickGenderHint}>{genderHint ? (eng ? "Hide" : "隐藏提示") : (eng ? "Check & Hints" : "批改&提示")}</button>
                        {/* <button className={isMobile ? "btn btn-primary w-1/3 m-2" : "btn btn-primary w-1/3 m-2"} onClick={() => { window.location.href = window.location.hostname === "localhost" ? `./#/vocunit/${id}/1` : `https://logan130.github.io/conjugate/#/vocunit/${id}/1`; window.location.reload(); }}>刷新</button> */}
                    </div>
                    <br />

                    <div className="overflow-x-auto w">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-lg w-1/6">{eng ? "POS" : "词性"}</th>
                                    <th className="text-lg w-32">{eng ? "French" : "法语"}</th>
                                    <th className="text-lg">{eng ? "Definition" : "提示"}</th>

                                </tr>
                            </thead>
                            <tbody>


                                {(nounFilter(vocabs)).map((word, id) => (<>
                                    <tr>


                                        <td className="text-xs font-bold w-48">
                                            <div role="tablist" className="tabs tabs-boxed rounded-b-none w-40">
                                                <div role="tab" className={genderStyle[id][0]} onClick={onChangeTab(id, 0, "n.m.")} value="n.m.">n.m.</div>
                                                <div role="tab" className={genderStyle[id][1]} onClick={onChangeTab(id, 1, "n.f.")} value="n.f.">n.f.</div>
                                                <div role="tab" className={genderStyle[id][2]} onClick={onChangeTab(id, 2, "n.")} value="n.">n.</div>
                                            </div>
                                        </td>
                                        <th className={isMobile ? "text-sm w-16" : "text-sm"}>{word.french}</th>
                                        <td className={isMobile ? "text-xs" : "text-sm"}> {checkGender(id, word.pos, chinese ? (ChineseParser(word.english, word.chinese)) : word.english)}</td>
                                    </tr>
                                    {id !== 0 && (id % 10 === 0 || id === (nounFilter(vocabs)).length - 1) && (
                                        <>
                                            <button className={isMobile ? "btn btn-primary w- m-2" : "btn btn-primary w- m-2"} onClick={onClickGenderHint}>{genderHint ? (eng ? "Hide" : "隐藏提示") : (eng ? "Check & Hints" : "批改&提示")}</button>
                                        </>
                                    )}
                                </>))}
                            </tbody>
                        </table>
                    </div>


                </div>

                :

                <>
                    <div>
                        <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                            {buttonsArr.map((button, id) => (
                                <button
                                    key={id}
                                    className={`btn ${buttonStyles[id] ? "btn-warning" : "btn-outline btn-warning"}`}
                                    onClick={onClickButton(id)}
                                >
                                    {button.name}
                                </button>
                            ))}
                            <button className={spellCheck ? "btn btn-primary w-full" : "btn btn-primary btn-outline w-full"} onClick={onCheck}>{eng ? "Check" : "检查"}</button>
                            <button className={hint ? "btn btn-primary w-full" : "btn btn-primary btn-outline w-full"} onClick={onClickHint}>{hint ? (eng ? "Hide" : "隐藏提示") : (eng ? "Hint" : "提示")}</button>
                        </div>
                    </div>

                    <br />

                    <div className="overflow-x-auto w">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-lg w-1/6 pr-0 mr-0">{eng ? "def" : "释义"}</th>
                                    <th className="text-lg w-36">{eng ? "spelling" : "拼写"}</th>
                                    <th className="text-lg">{eng ? "hint" : "提示"}</th>
                                </tr>
                            </thead>
                            <tbody>


                                {vocabs.map((word, id) => (<>
                                    <tr>
                                        <th className={isMobile ? "text-xs pr-0 mr-0" : "text-base"}>{word.pos} {chinese ? ChineseParser(word.english, word.chinese) : word.english}</th>
                                        <td className="text-xs font-xs">
                                            <div className="">
                                                <label className="">
                                                    <input type="text"
                                                        ref={el => (inputRefs.current[id] = el)}
                                                        className={inputStyle[id]}
                                                        id={`field-${id}`}
                                                        onChange={onTextfieldChange(id)}
                                                        onKeyDown={handleKeyDown(id)}
                                                    />
                                                </label>
                                                {/* <p className="font-bold text-base">{hint ? <>{word.french}</> : <></>}</p> */}

                                            </div>
                                        </td>
                                        <td className={isMobile ? "text-xs font-bold" : "text-base font-bold"}>{hint ? <>{word.french}</> : <></>}</td>
                                    </tr>

                                    {((id > 0 && id % 10 === 0) || (id === vocabs.length - 1)) && <>
                                        <br />
                                        <div className="flex justify-items-start">
                                            <button className={spellCheck ? "btn btn-primary m-2" : "btn btn-primary btn-outline m-2"} onClick={onCheck}>{eng ? "Check" : "检查"}</button>
                                            <button className={hint ? "btn btn-primary m-2" : "btn btn-primary btn-outline m-2"} onClick={onClickHint}>{hint ? (eng ? "Hide" : "隐藏提示") : (eng ? "Hint" : "提示")}</button>
                                        </div>
                                        <br />
                                    </>}
                                </>))}
                            </tbody>
                        </table>
                    </div>


                </>
            }
        </>





    </>)
}