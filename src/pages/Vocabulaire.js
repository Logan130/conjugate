import { Link } from 'react-router-dom'
import Mulan from '../static/mulan2.jpeg'
import TwelfthNight from '../static/12night.jpeg'
import Orlando from '../static/orlando.jpeg'

import { useEffect, useState, useContext, useRef } from 'react';
import { taxiA1A2, taxiB1 } from '../data/array/VocArray/taxi';
import { vocabulaireProgressifA1, vocabulaireProgressifA2 } from '../data/array/VocArray/vocabulaireProgressif';
import { communicationA1, communicationA2 } from '../data/array/VocArray/communication';
import { EditoB1 } from '../data/array/VocArray/edito';
import { ThemeContext } from '../context/context';
import { InnerFrench } from '../data/array/VocArray/innerfrench';

export const lessons = [
    ...taxiA1A2,
    ...taxiB1,
    ...communicationA1,
    ...communicationA2,
    ...vocabulaireProgressifA1,
    ...vocabulaireProgressifA2,
    ...EditoB1,
    ...InnerFrench
]

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
                    src={images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className={`w-full transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            <div className="absolute left-0 top-60 flex items-center">
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
            </div>

            {/* <div className='flex items-center justify-center text-neutral-content'>
                <p className='text-neutral-content italic'>安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
            </div> */}
            {captionArr[currentImageIndex]}
        </div>
    );
}

const Images = ({ isIpadUser }) => {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;

    return (
        <>
            {isMobile ? <>
                {eng ?
                    <>
                        <img alt="Twelfe Night" src={TwelfthNight} className='rounded-lg' />
                        <div className='flex items-center justify-center text-neutral-content'>
                            <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. (Click the button Gender to practice)</p>
                        </div>
                        <br />
                    </> :

                    <>
                        <img alt="Mulan" src={Mulan} className='rounded-lg' />
                        <div className='flex items-center justify-center text-neutral-content'>
                            <p className='text-neutral-content text-sm'>双兔傍地走，安能辨我是雄雌🐰 (点击下方按钮练习阴阳性)</p>
                        </div>
                        <br />
                    </>}
            </> : <>
                <div className={isIpadUser ? 'flex justify-center items-start' : 'flex justify-center items-start'}>
                    <div className='w-1/2'>
                        <RenderImages images={[Mulan, Orlando, TwelfthNight,]} className='rounded-lg w-1/2' />
                    </div>
                </div>
            </>}
        </>
    )
}

function Section({ title, vocArr, filter, filterArr, filterHandler, buttonArr, reverse, truncate, titleStyle, buttonStyle, collapse, collpaseHandler }) {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;

    let targetArr = vocArr.filter((lesson) => lesson.book === filter);
    if (reverse) {
        targetArr = targetArr.reverse();
    }
    if (truncate !== undefined && truncate) {
        targetArr = targetArr.slice(0, (isMobile ? 5 : 10))
    }

    let vocButtonStyle = `btn btn-success ${buttonStyle}`
    let spellingButtonStyle = `btn btn-warning ${buttonStyle}`;
    let genderButtonStyle = `btn btn-secondary ${buttonStyle}`

    return (
        <>
            <h1 className={isMobile ? "text-2xl mb-2" : "text-4xl mb-4"}>{title}</h1>
            <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                {buttonArr.map((button, index) => (
                    <button className={filter === filterArr[index] ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={filterHandler(filterArr[index])}>{button}</button>
                ))}
            </div>
            <br />

            <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
                {targetArr.map((lesson, id) => (<>
                    <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                        <div className={titleStyle}>
                            <span className='ml-1 font-bold break-words'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
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
            </div>

            <br />
            {!!collpaseHandler &&
                <span class="flex justify-center">
                    <button className="btn btn-neutral w-full" onClick={collpaseHandler}>{collapse ? (eng ? "Collapse" : "折叠") : (eng ? "Expand" : "展开")}</button>
                </span>
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
            title={'Taxi'}
            vocArr={TaxiArr}
            filter={taxiFilter}
            filterArr={["B1", "A2", "A1"]}
            filterHandler={onClickTaxiFilter}
            buttonArr={["B1", "A2", "A1"]}
            reverse={true}
            titleStyle={isMobile ? 'flex items-center w-20 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? "text-xs" : "text-base py-1"}
            collpaseHandler={undefined}
            collapse={undefined}
        />


        <br ref={targetRef} />

        <Section
            title={'Communication Progressive'}
            vocArr={CommunicaionProgressivefArr}
            filter={communicationFilter}
            filterArr={["A2", "A1"]}
            filterHandler={onClickCommunicationFilter}
            buttonArr={["A2", "A1"]}
            reverse={true}
            truncate={!commCollapsed}
            titleStyle={isMobile ? 'flex items-center w-24 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs p-2" : "text-xs p-1.5") : "text-base py-0"}
            collpaseHandler={handleCollape}
            collapse={commCollapsed}
        />


        <Section
            title={'Vocabulaire Progressif'}
            vocArr={VocabulaireProgressiffArr}
            filter={vocabulaireFilter}
            filterArr={["A2", "A1"]}
            filterHandler={onClickVocabulaireFilter}
            buttonArr={["A2", "A1"]}
            reverse={false}
            truncate={!vocCollapsed}
            titleStyle={isMobile ? 'flex items-center w-28 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-2") : "text-base py-0"}
            collpaseHandler={handleVocCollape}
            collapse={vocCollapsed}
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
        />


        <br />
        <Link to='/search'>
            <button className="btn btn-outline btn-error">{eng ? "Dev Tool" : "开发者工具，慎点"}</button>
        </Link>

    </>)
} 