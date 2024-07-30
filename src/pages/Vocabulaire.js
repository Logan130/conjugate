import { Link } from 'react-router-dom'
import Mulan from '../static/mulan2.jpeg'
import TwelfthNight from '../static/12night.jpeg'
import Orlando from '../static/orlando.jpeg'
import Paris1 from '../static/paris-games-artistic-gymnastics-6753651837110525-2xa.gif'
import Paris2 from '../static/paris-games-football-6753651837110524-2xa.gif'
import Paris3 from '../static/paris-games-opening-ceremony-6753651837110444-2xa.gif'
import Paris4 from '../static/paris-games-skateboarding-6753651837110523-2xa.gif'



import { useEffect, useState, useContext, useRef } from 'react';
import { alterEgoB2, taxiA1A2, taxiB1 } from '../data/array/VocArray/taxi';
import { vocabulaireProgressifA1, vocabulaireProgressifA2, vocabulaireProgressifB1 } from '../data/array/VocArray/vocabulaireProgressif';
import { communicationA1, communicationA2 } from '../data/array/VocArray/communication';
import { EditoB1 } from '../data/array/VocArray/edito';
import { ThemeContext } from '../context/context';
import { InnerFrench } from '../data/array/VocArray/innerfrench';
import { FaLock, FaUnlock, FaKey } from "react-icons/fa";

const apiKey = process.env.REACT_APP_API_KEY;

export const lessons = [
    ...taxiA1A2,
    ...taxiB1,
    ...alterEgoB2,
    ...communicationA1,
    ...communicationA2,
    ...vocabulaireProgressifA1,
    ...vocabulaireProgressifA2,
    ...vocabulaireProgressifB1,
    ...EditoB1,
    ...InnerFrench
]

export let protectedLessonsIndex = new Set();
// for (let i = 0; i < communicationA1.length + communicationA2.length; i++) {
//     let index = taxiA1A2.length + taxiB1.length + i;
//     protectedLessonsIndex.add(index);
// }

export const protectedLessonsMax = taxiA1A2.length +
    taxiB1.length + communicationA1.length + communicationA2.length +
    vocabulaireProgressifA1.length + vocabulaireProgressifA2.length +
    EditoB1.length + InnerFrench.length

const FilterArr = ["TaxiFilter", "CommunicationFilter", "VocabulaireFilter", "AutreFilter"];

function getCollapseSession(id) {
    const arr = ["commCollapse", "vocCollapse"];
    let target = arr[id];
    let session = window.localStorage.getItem(target);
    console.log("session", window.localStorage)
    return !!session ? (session === "true") : false;
}

function getFilterSession(id) {
    const arrDefault = ["B1", "A2", "A2", "InnerFrench"]
    let target = FilterArr[id];
    let session = window.localStorage.getItem(target);
    return !!session ? session : arrDefault[id];
}

const isIpad = () => {
    return /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};


const RenderImages = ({ images }) => {
    const { eng } = useContext(ThemeContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(eng ? 1 : 0);
    const [fade, setFade] = useState(true);
    const titleArr = ["Mulan", "Orlando", "Twelfth Night"];
    const titleOlymArr = ["Ceremony", "Skateboarding", "Football", "Artistic Gymnastics"];

    let imagesOlym = [Paris3, Paris4, Paris2, Paris1];
    images = imagesOlym

    useEffect(() => {
        if (eng) {
            setCurrentImageIndex(1);
        }
        else {
            setCurrentImageIndex(0);
        }
    }, [eng])

    const captionArr = [
        <div className='flex items-center justify-center text-neutral-content'>
            <p className='text-neutral-content italic'>双兔傍地走，安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
        </div>,

        <div className='flex items-center justify-center text-neutral-content'>
            <p className='text-neutral-content italic'>The change of sex, though it altered their future, did nothing whatever to alter their identity. ({eng ? "Click the button Gender to practice" : "点击下方单元练习阴阳性"})</p>
        </div>,

        <div className='flex items-center justify-center text-neutral-content'>
            <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. ({eng ? "Click the button Gender to practice" : "点击下方单元练习阴阳性"})</p>
        </div>
    ]

    const nextImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(true);
        }, 300); // The duration should match the CSS transition duration
    };

    const prevImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setFade(true);
        }, 300); // The duration should match the CSS transition duration
    };

    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={imagesOlym[currentImageIndex]}
                    alt={`sliding ${currentImageIndex + 1}`}
                    className={`w-full transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* <div className="absolute left-0 top-60 flex items-center">
                <button
                    onClick={prevImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-l focus:outline-none"
                >
                    &larr;
                </button>
            </div>

            <div className="absolute top-0 inset-x-0 flex items-center justify-center">
                <button
                    className="text-white text-sm font-bold bg-gray-800 bg-opacity-50 hover:bg-opacity-30 px-3 py-1 rounded-b-lg focus:outline-none"
                >
                    {titleArr[currentImageIndex]}
                </button>
            </div>

            <div className="absolute right-0 top-60 flex items-center">
                <button
                    onClick={nextImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-r focus:outline-none"
                >
                    &rarr;
                </button>
            </div> */}

            <div className="absolute left-0 top-32 flex items-center">
                <button
                    onClick={prevImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-l focus:outline-none"
                >
                    &larr;
                </button>
            </div>

            <div className="absolute top-0 inset-x-0 flex items-center justify-center">
                <button
                    className="text-white text-sm font-bold bg-gray-800 bg-opacity-50 hover:bg-opacity-30 px-3 py-1 rounded-b-lg focus:outline-none"
                >
                    {titleOlymArr[currentImageIndex]}
                </button>
            </div>

            <div className="absolute right-0 top-32 flex items-center">
                <button
                    onClick={nextImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-r focus:outline-none"
                >
                    &rarr;
                </button>
            </div>


            {/* <div className='flex items-center justify-center text-neutral-content'>
                <p className='text-neutral-content italic'>安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
            </div> */}
            <div className='flex items-center justify-center '>
                <p className=' italic'>{eng ? 'Paris Games Begin!🇫🇷' : '高卢鸡奥运快乐！🇫🇷'}</p>
            </div>
        </div>
    );
}

const Images = ({ isIpadUser }) => {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;
    let images = [Paris1, Paris2, Paris3, Paris4];

    return (
        <>
            {isMobile ?
                <>
                    {eng ?
                        // <>
                        //     <img alt="Twelfe Night" src={TwelfthNight} className='rounded-lg' />
                        //     <div className='flex items-center justify-center text-neutral-content'>
                        //         <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. (Click the button Gender to practice)</p>
                        //     </div>
                        //     <br />
                        // </> 
                        // : 
                        // <>
                        //     <img alt="Mulan" src={Mulan} className='rounded-lg' />
                        //     <div className='flex items-center justify-center text-neutral-content'>
                        //         <p className='text-neutral-content text-sm'>双兔傍地走，安能辨我是雄雌🐰 (点击下方按钮练习阴阳性)</p>
                        //     </div>
                        //     <br />
                        // </>
                        <>
                            <img alt="Twelfe Night" src={images[Math.floor(Math.random() * 10000) % 4]} className='rounded-lg' />
                            <div className='flex items-center justify-center text-neutral-content'>
                                <p className='text-neutral-content italic'>Paris Games Begin!🇫🇷</p>
                            </div>
                            <br />
                        </> 
                        : 
                        <>
                            <img alt="Mulan" src={images[(Math.floor(Math.random() * 10000) + new Date().getTime()) % 4]} className='rounded-lg' />
                            <div className='flex items-center justify-center text-neutral-content'>
                                <p className='text-neutral-content text-sm'>高卢鸡奥运快乐🇫🇷</p>
                            </div>
                            <br />
                        </>
                    }
                </>
                :
                <>
                    <div className={isIpadUser ? 'flex justify-center items-start' : 'flex justify-center items-start'}>
                        <div className='w-1/2'>
                            <RenderImages images={[Mulan, Orlando, TwelfthNight,]} className='rounded-lg w-1/2' />
                        </div>
                    </div>
                </>}
        </>
    )
}

const TimedComponent = ({ visible }) => {
    const { eng } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(visible);

    console.log("debug render", visible)

    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    useEffect(() => {
        // Set a timer to hide the component after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        // Cleanup function to clear the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <>
            {isVisible && (
                <>
                    <br />
                    <div role="alert" className="alert alert-error font-bold">
                        <span>{eng ? 'you are not invited' : '你没有被邀请'}</span>
                    </div>
                </>
            )}
        </>
    );
};

function Section({ title, vocArr, filter, filterArr, filterHandler, buttonArr, reverse, truncate, titleStyle, buttonStyle, collapse, collpaseHandler, locked }) {
    let [expanded, setExpanded] = useState(false);
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;
    let [matched, setMatched] = useState(!locked || localStorage.getItem('password') === apiKey)
    let [passwordCorrect, setPasswordCorrect] = useState(null);
    let [alertIsVisible, setAlertIsVisible] = useState(false);
    let [page, setPage] = useState(0);
    let lessonsPerPage = (isMobile ? 6 : 10);
    let [missing, setMissing] = useState(0);

    let targetArr = vocArr.filter((lesson) => lesson.book === filter);
    // console.log("debug2", filter, title, vocArr, targetArr)
    let totalUnits = targetArr.length;
    if (reverse) {
        targetArr = targetArr.reverse();
    }
    if (truncate !== undefined && truncate) {
        // targetArr = targetArr.slice(0, (isMobile ? 5 : 10))
        // targetArr = targetArr.slice(0, lessonsPerPage)
    }

    useEffect(() => {
        targetArr = vocArr.filter((lesson) => lesson.book === filter);
        if (reverse) {
            targetArr = targetArr.reverse();
        }

        setUnits(targetArr.slice(0, lessonsPerPage))
        setMissing(0);
        setPage(0);
    }, [filter])

    let [units, setUnits] = useState(targetArr.slice(0, lessonsPerPage));

    let vocButtonStyle = `btn btn-success ${buttonStyle}`
    let spellingButtonStyle = `btn btn-warning ${buttonStyle}`;
    let genderButtonStyle = `btn btn-secondary ${buttonStyle}`;

    const onClickUnlock = (e) => {
        setExpanded(!expanded);
    }
    let [passwordValue, setPasswordValue] = useState('');
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
        window.localStorage.setItem('password', e.target.value)
    }

    const onClickConfirm = (e) => {
        let correct = passwordValue === apiKey;
        setMatched(correct);
        setPasswordCorrect(correct);
        setAlertIsVisible(!correct);
        const timer = setTimeout(() => {
            setAlertIsVisible(false);
        }, 1800);
        return () => clearTimeout(timer);
    }

    // window.localStorage.clear();
    const onClickPage = (diff) => (e) => {
        let maxPageNumber = Math.ceil(targetArr.length / lessonsPerPage);
        let pageNumber = page + diff;
        if (pageNumber < 0 || pageNumber >= maxPageNumber) {
            return;
        }
        setUnits(targetArr.slice(lessonsPerPage * pageNumber, lessonsPerPage * (pageNumber + 1)));
        if (pageNumber === maxPageNumber - 1) {
            setMissing((lessonsPerPage - (totalUnits % lessonsPerPage)) % lessonsPerPage);
            console.log("missing", Array((lessonsPerPage - (totalUnits % lessonsPerPage)) % lessonsPerPage))
        }
        else {
            setMissing(0)
        }
        setPage(pageNumber);
    }

    return (
        <>
            <div className={isMobile ? "text-2xl mb-2 flex justify-left" : "text-4xl mb-4 flex justify-left"}>
                {title} &nbsp;&nbsp; {(locked && !matched) ?
                    <>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                        <button onClick={onClickUnlock} className="btn btn-neutral ml-3">{eng ? 'unlock' : '解锁'}</button>
                    </>

                    :
                    <></>}
            </div>

            {(expanded && !matched) &&
                <>
                    <div className='flex flex-row'>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" value={passwordValue} onChange={onPasswordChange} />
                        </label>
                        <div>
                            <button onClick={onClickConfirm} className="btn btn-neutral ml-3">{eng ? 'Confirm' : '确认'}</button>
                        </div>
                    </div>
                    {passwordCorrect !== null && alertIsVisible &&
                        <>
                            <br />
                            <div role="alert" className={`alert alert-error font-bold transition transition-opacity duration-5000 opacity-100`}>
                                <span>{eng ? 'you are not invited' : '你没有被邀请'}</span>
                            </div>
                        </>
                    }
                    <br />
                </>
            }

            <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                {buttonArr.map((button, index) => (
                    <button className={filter === filterArr[index] ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={filterHandler(filterArr[index])}>{button}</button>
                ))}
            </div>
            <br />

            {(!locked || matched) &&
                <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
                    {units.map((lesson, id) => (<>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
                            </div>
                            <div>
                                <Link to={`/vocsum/${lesson.id}`} >
                                    <button className={vocButtonStyle}>{eng ? "Voc" : "单词表"}</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={`/vocunit/${lesson.id}/0`} >
                                    <button className={spellingButtonStyle}>{eng ? "Spelling" : "拼写练习"}</button>
                                </Link>
                            </div>
                            <div>
                                <Link to={`/vocunit/${lesson.id}/1`} >
                                    <button className={genderButtonStyle}>{eng ? "Gender" : "阴阳练习"}</button>
                                </Link>
                            </div>
                        </div>
                    </>))}

                    {Array(missing).fill(0).map((mis, id) => <>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{" "}</span>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={vocButtonStyle}>{eng ? "Voc" : "单词表"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={spellingButtonStyle}>{eng ? "Spelling" : "拼写练习"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={genderButtonStyle}>{eng ? "Gender" : "阴阳练习"}</button>
                                </Link>
                            </div>
                        </div>
                    </>)}
                </div>
            }

            {(locked && !matched) &&
                <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
                    {units.map((lesson, id) => (<>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
                            </div>
                            <div>
                                <button className={vocButtonStyle}><FaLock /></button>
                            </div>
                            <div>
                                <button className={spellingButtonStyle}><FaLock /></button>
                            </div>
                            <div>
                                <button className={genderButtonStyle}><FaLock /></button>
                            </div>
                        </div>
                    </>))}

                    {Array(missing).fill(0).map((mis, id) => <>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{" "}</span>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={vocButtonStyle}>{eng ? "Voc" : "单词表"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={spellingButtonStyle}>{eng ? "Spelling" : "拼写练习"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={genderButtonStyle}>{eng ? "Gender" : "阴阳练习"}</button>
                                </Link>
                            </div>
                        </div>
                    </>)}
                </div>
            }

            <br />
            {/* {!!collpaseHandler &&
                <span class="flex justify-center">
                    <button className="btn btn-neutral w-full" onClick={collpaseHandler}>{collapse ? (eng ? "Collapse" : "折叠") : (eng ? "Expand" : "展开")}</button>
                </span>
            } */}

            {
                (lessonsPerPage < targetArr.length && <>
                    <div className={isMobile ? "join grid grid-cols-2 w-1/2" : "join grid grid-cols-2 w-1/3"}>
                        <button className="join-item btn btn-outline btn-accent" onClick={onClickPage(-1)}>{eng ? 'prev' : "前一页"}</button>
                        <button className="join-item btn btn-outline btn-accent" onClick={onClickPage(1)}>{eng ? 'next' : "后一页"}</button>
                    </div>
                </>)
            }

            <div className="divider"></div>


        </>
    )
}


export function VocabulairePage() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;

    // categorize arrays based on types
    let TaxiArr = [], CommunicaionProgressivefArr = [], VocabulaireProgressiffArr = [], otherArr = [];
    for (let i = 0; i < lessons.length; i++) {
        let lesson = lessons[i];
        lesson["id"] = i;
        if (lesson.tag === "Taxi") {
            TaxiArr.push(lesson);
        }
        else if (lesson.tag === "Communication Progressive") {
            CommunicaionProgressivefArr.push(lesson);
        }
        else if (lesson.tag === "Vocabulaire Progressif") {
            VocabulaireProgressiffArr.push(lesson);
        }
        else if (lesson.tag === "Other") {
            otherArr.push(lesson);
        }
    }

    // for handling expansion and scrolling related to expansion/collapse
    let [commCollapsed, setCommCollapsed] = useState(getCollapseSession(0));
    let [vocCollapsed, setVOcCollapsed] = useState(getCollapseSession(1));
    const targetRef = useRef(null);

    const handleScroll = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCollape = () => {
        let previousState = commCollapsed;
        // if (isMobile && previousState) {
        if (previousState) {
            handleScroll();
        }
        setCommCollapsed(!commCollapsed);
        window.localStorage.setItem("commCollapse", !previousState)
    }

    const handleVocCollape = () => {
        let previousState = vocCollapsed;
        setVOcCollapsed(!vocCollapsed);
        window.localStorage.setItem("vocCollapse", !previousState)
    }


    // for ipad users
    const [isIpadUser, setIsIpadUser] = useState(false);
    useEffect(() => {
        setIsIpadUser(isIpad());
    }, []);

    // for filtering based on books
    let [taxiFilter, setTaxiFilter] = useState(getFilterSession(0));
    const onClickTaxiFilter = (filter) => (e) => {
        setTaxiFilter(filter);
        window.localStorage.setItem(FilterArr[0], filter);
    }

    let [vocabulaireFilter, setVocabulaireFilter] = useState(getFilterSession(1));
    const onClickVocabulaireFilter = (filter) => (e) => {
        console.log(filter, "debug2")
        setVocabulaireFilter(filter);
        window.localStorage.setItem(FilterArr[1], filter);
    }

    let [communicationFilter, setCommunicationFilter] = useState(getFilterSession(2));
    const onClickCommunicationFilter = (filter) => (e) => {
        setCommunicationFilter(filter);
        window.localStorage.setItem(FilterArr[2], filter);
    }

    let [autreFilter, setAutreFilter] = useState(getFilterSession(3));
    const onClickAutreFilter = (filter) => (e) => {
        setAutreFilter(filter);
        window.localStorage.setItem(FilterArr[3], filter);
    }

    return (<>
        <Images isIpadUser={isIpadUser} />

        <Section
            title={'Taxi & Alter Ego'}
            vocArr={TaxiArr}
            filter={taxiFilter}
            filterArr={["B2", "B1", "A2", "A1"]}
            filterHandler={onClickTaxiFilter}
            buttonArr={["B2", "B1", "A2", "A1"]}
            reverse={true}
            titleStyle={isMobile ? 'flex items-center w-24 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs p-4" : "text-xs p-3") : "text-base py-1"}
            collpaseHandler={undefined}
            collapse={undefined}
            locked={false}
        />

        {/* <br ref={targetRef} /> */}

        <Section
            title={'Communication Progressive'}
            vocArr={CommunicaionProgressivefArr}
            filter={communicationFilter}
            filterArr={["A2", "A1"]}
            filterHandler={onClickCommunicationFilter}
            buttonArr={["A2-B1", "A1-A2"]}
            reverse={true}
            truncate={!commCollapsed}
            titleStyle={isMobile ? 'flex items-center w-24 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs p-4" : "text-xs p-3") : "text-base py-0"}
            collpaseHandler={handleCollape}
            collapse={commCollapsed}
            locked={false}
        />


        <Section
            title={'Vocabulaire Progressif'}
            vocArr={VocabulaireProgressiffArr}
            filter={vocabulaireFilter}
            filterArr={["B1", "A2", "A1"]}
            filterHandler={onClickVocabulaireFilter}
            buttonArr={["B1-B2", "A2-B1", "A1-A2"]}
            reverse={false}
            truncate={!vocCollapsed}
            titleStyle={isMobile ? 'flex items-center w-28 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-2") : "text-base py-0"}
            collpaseHandler={handleVocCollape}
            collapse={vocCollapsed}
            locked={false}
        />


        <Section
            title={"L'Autre"}
            vocArr={otherArr}
            filter={autreFilter}
            filterArr={["Edito B1", "InnerFrench"]}
            filterHandler={onClickAutreFilter}
            buttonArr={["Edito B1", "Inner French"]}
            reverse={false}
            truncate={false}
            titleStyle={isMobile ? 'flex items-center w-36 text-sm' : 'flex items-center w-64'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-2") : "text-base py-0"}
            collpaseHandler={undefined}
            collapse={undefined}
            locked={false}
        />


        <br />
        <Link to='/search'>
            <button className="btn btn-outline btn-error">{eng ? "Dev Tool" : "开发者工具，慎点"}</button>
        </Link>

    </>)
} 