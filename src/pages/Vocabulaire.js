import { Link } from 'react-router-dom'
import Mulan from '../static/mulan2.jpeg'
import TwelfthNight from '../static/12night.jpeg'
import Orlando from '../static/orlando.jpeg'

import { useEffect, useState, useContext, useRef } from 'react';
import { taxiA1A2, taxiB1 } from '../array/VocArray/taxi';
import { vocabulaireProgressifA1, vocabulaireProgressifA2 } from '../array/VocArray/vocabulaireProgressif';
import { communicationA1, communicationA2 } from '../array/VocArray/communication';
import { iTaki } from '../array/VocArray/italki';
import { ThemeContext } from '../context/context';

export const lessons = [
    ...taxiA1A2,
    ...taxiB1,
    ...communicationA1,
    ...communicationA2,
    ...vocabulaireProgressifA1,
    ...vocabulaireProgressifA2,
    ...iTaki
]

const isIpad = () => {

    // Check if the user agent string contains "iPad"
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
            <p className='text-neutral-content italic'>安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
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


export function VocabulairePage() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;
    let TaxiArr = [], CommunicaionProgressivefArr = [], VocabulaireProgressiffArr = [], itakiArr = [];
    let [commCollapsed, setCommCollapsed] = useState(false);

    const [isIpadUser, setIsIpadUser] = useState(false);

    const targetRef = useRef(null);

    const handleScroll = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Check if the device is an iPad when the component mounts
        setIsIpadUser(isIpad());
    }, []);


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
        else if (lesson.tag === "iTaki") {
            itakiArr.push(lesson);
        }
    }

    let [taxiFilter, setTaxiFilter] = useState("B1");
    const onClickTaxiFilter = (filter) => (e) => {
        setTaxiFilter(filter);
    }

    let [vocabulaireFilter, setVocabulaireFilter] = useState("A2");
    const onClickVocabulaireFilter = (filter) => (e) => {
        setVocabulaireFilter(filter);
    }

    let [communicationFilter, setCommunicationFilter] = useState("A2");
    const onClickCommunicationFilter = (filter) => (e) => {
        setCommunicationFilter(filter);
    }


    useEffect(() => {
        // Scroll to the top of the page when component mounts
        // window.scrollTo(0, 0); // Scrolls to top-left corner
        // or
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth' // Optionally, you can make it scroll smoothly
        // });
    }, []);

    const handleCollape = () => {
        let previousState = commCollapsed;
        if (isMobile && previousState) {
            handleScroll();
        }
        setCommCollapsed(!commCollapsed);
    }

    return (<>

        {isMobile ? <>
            {eng ?
                <>
                    <img alt="Twelfe Night" src={TwelfthNight} className='rounded-lg' />
                    <div className='flex items-center justify-center text-neutral-content'>
                        <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. (Click the button Gender to practice)</p>
                    </div>
                </> :

                <>
                    <img alt="Mulan" src={Mulan} className='rounded-lg' />
                    <div className='flex items-center justify-center text-neutral-content'>
                        <p className='text-neutral-content italic'>安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
                    </div>
                </>}
        </> : <>
            <div className={isIpadUser ? 'flex justify-center items-start' : 'flex justify-center items-start'}>
                <div className='w-1/2'>
                    <RenderImages images={[Mulan, Orlando, TwelfthNight,]} className='rounded-lg w-1/2' />
                </div>
            </div>
        </>}




        <h1 className={isMobile ? "text-2xl mb-2" : "text-4xl mb-4"}>Taxi</h1>


        <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
            <button className={taxiFilter === "B1" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickTaxiFilter("B1")}>B1</button>
            <button className={taxiFilter === "A2" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickTaxiFilter("A2")}>A2</button>
            <button className={taxiFilter === "A1" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickTaxiFilter("A1")}>A1</button>
        </div>
        <br />


        <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
            {TaxiArr.filter((lesson) => lesson.book === taxiFilter).reverse().map((lesson, id) => (<>
                <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                    <div className={isMobile ? 'flex items-center w-20 text-sm' : 'flex items-center w-32'}>
                        <span className='ml-2 font-bold'>{lesson.unit}</span>
                    </div>
                    <div>
                        <Link to={`/vocsum/${lesson.id}`} >
                            <button className={isMobile ? "btn btn-success text-xs" : "btn btn-success text-base py-1"}>{eng ? "Voc" : "单词表"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/0`} >
                            <button className={isMobile ? "btn btn-warning text-xs" : "btn btn-warning text-base py-1"}>{eng ? "Spelling" : "拼写练习"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/1`} >
                            <button className={isMobile ? "btn btn-secondary text-xs" : "btn btn-secondary text-base py-1"}>{eng ? "Gender" : "阴阳练习"}</button>
                        </Link>
                    </div>
                </div>
            </>))}

        </div>

        <br ref={targetRef} />
        <div className="divider"></div>


        <h1 className={isMobile ? "text-2xl mb-2" : "text-4xl mb-4"}>Communication Progressive</h1>

        <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
            <button className={communicationFilter === "A2" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickCommunicationFilter("A2")}>Interm</button>
            <button className={communicationFilter === "A1" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickCommunicationFilter("A1")}>Débutant</button>
        </div>
        <br />


        <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
            {CommunicaionProgressivefArr.filter((lesson) => lesson.book === communicationFilter).reverse().slice(0, commCollapsed ? 100 : (isMobile ? 5 : 10)).map((lesson, id) => (<>
                <div className={isMobile ? 'flex justify-between gap-1 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                    <div className={isMobile ? 'flex items-center w-24 text-sm' : 'flex items-center w-32'}>
                        <span className='ml-2 font-bold'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
                    </div>
                    <div>
                        <Link to={`/vocsum/${lesson.id}`} >
                            <button className={isMobile ? (eng ? "btn btn-success text-xs p-4" : "btn btn-success text-xs p-1.5") : "btn btn-success text-base py-0"}>{eng ? "Voc" : "单词表"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/0`} >
                            <button className={isMobile ? (eng ? "btn btn-warning text-xs p-2" : "btn btn-warning text-xs p-1.5") : "btn btn-warning text-base py-0"}>{eng ? "Spelling" : "拼写练习"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/1`} >
                            <button className={isMobile ? (eng ? "btn btn-secondary text-xs p-2" : "btn btn-secondary text-xs p-1.5") : "btn btn-secondary text-base py-0"}>{eng ? "Gender" : "阴阳练习"}</button>
                        </Link>
                    </div>
                </div>
            </>))}
        </div>

        <br />
        <span class="flex justify-center">
            <button className="btn btn-neutral w-full" onClick={handleCollape}>{commCollapsed ? (eng ? "Collapse" : "折叠") : (eng ? "Expand" : "展开")}</button>
        </span>
        <div className="divider"></div>

        <h1 className={isMobile ? "text-2xl mb-2" : "text-4xl mb-4"}>Vocabulaire Progressif</h1>

        <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
            <button className={vocabulaireFilter === "A2" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickVocabulaireFilter("A2")}>Interm</button>
            <button className={vocabulaireFilter === "A1" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickVocabulaireFilter("A1")}>Débutant</button>
        </div>
        <br />

        <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
            {VocabulaireProgressiffArr.filter((lesson) => lesson.book === vocabulaireFilter).map((lesson, id) => (<>
                <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                    <div className={isMobile ? 'flex items-center w-32 text-sm' : 'flex items-center w-32'}>
                        <span className='ml-1 mr-0 font-bold '>{eng ? lesson.engUnit : lesson.unit}</span>
                    </div>
                    <div>
                        <Link to={`/vocsum/${lesson.id}`} >
                            <button className={isMobile ? (eng ? "btn btn-success text-xs" : "btn btn-success text-xs p-2") : "btn btn-success text-base py-0"}>{eng ? "Voc" : "单词表"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/0`} >
                            <button className={isMobile ? (eng ? "btn btn-warning text-xs" : "btn btn-warning text-xs p-2") : "btn btn-warning text-base py-0"}>{eng ? "Spelling" : "拼写练习"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/1`} >
                            <button className={isMobile ? (eng ? "btn btn-secondary text-xs" : "btn btn-secondary text-xs p-2") : "btn btn-secondary text-base py-0"}>{eng ? "Gender" : "阴阳练习"}</button>
                        </Link>
                    </div>
                </div>
            </>))}

        </div>


        <br />
        <div className="divider"></div>

        <h1 className={isMobile ? "text-2xl mb-2" : "text-4xl mb-4"}>L'Autre</h1>

        {/* <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
            <button className={vocabulaireFilter === "A2" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickVocabulaireFilter("A2")}>Interm</button>
            <button className={vocabulaireFilter === "A1" ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={onClickVocabulaireFilter("A1")}>Débutant</button>
        </div> */}
        <br />

        <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
            {itakiArr.map((lesson, id) => (<>
                <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                    <div className={isMobile ? 'flex items-center w-32 text-sm' : 'flex items-center w-32'}>
                        <span className='ml-1 mr-0 font-bold break-words'>{lesson.unit}</span>
                    </div>
                    <div>
                        <Link to={`/vocsum/${lesson.id}`} >
                            <button className={isMobile ? (eng ? "btn btn-success text-xs" : "btn btn-success text-xs p-2") : "btn btn-success text-base py-0"}>{eng ? "Voc" : "单词表"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/0`} >
                            <button className={isMobile ? (eng ? "btn btn-warning text-xs" : "btn btn-warning text-xs p-2") : "btn btn-warning text-base py-0"}>{eng ? "Spelling" : "拼写练习"}</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/vocunit/${lesson.id}/1`} >
                            <button className={isMobile ? (eng ? "btn btn-secondary text-xs" : "btn btn-secondary text-xs p-2") : "btn btn-secondary text-base py-0"}>{eng ? "Gender" : "阴阳练习"}</button>
                        </Link>
                    </div>
                </div>
            </>))}

        </div>





        <br />
        <Link to='/search'>
            <button className="btn btn-outline btn-error">{eng ? "Dev Tool" : "开发者工具，慎点"}</button>
        </Link>



    </>)
} 