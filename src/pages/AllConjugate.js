import { Table } from "../components/conjugate/ConjugationList"
import { SixGridTable } from "../components/conjugate/DisplaySingleConjugation"
import { useState, useEffect, useContext } from "react"
import Passe from '../static/passe.jpeg'
import TomJerry from '../static/tomjerry2.png'
import TomJerry2 from '../static/tomjerry4.png'
// import TomJerryMusic from '../static/tomjerry5.png'
// import Mulan from '../static/mulan.jpeg'
import { Link } from 'react-router-dom'
import { conjugates } from "../data/conjugation/conjugates"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../context/context"
import { SingleConjugationBox } from "../components/conjugate/SingleConjugationBox"


function Cards() {
    const { eng } = useContext(ThemeContext);
    const [modalOpen, setModalOpen] = useState(false);
    const red_style = "font-bold "
    const toggleModal = () => {
        if (!modalOpen) {
            document.getElementById('my_modal_2').showModal()
        }
        setModalOpen(!modalOpen);
    };

    let isMobile = window.innerWidth < 500;


    // useEffect(() => {
    //     // Scroll to the top of the page when component mounts
    //     // window.scrollTo(0, 0); // Scrolls to top-left corner
    //     // or
    //     if (!!scroll) {

    //     }
    //     else {
    //         window.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: 'smooth' // Optionally, you can make it scroll smoothly
    //         });
    //     }
    // }, []);



    return (<>

        <div class={isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-3 gap-2"}>

            <div className="card w-auto bg-neutral text-neutral-content image-full hover:cursor-pointer" onClick={() => { window.location.href = window.location.hostname === "localhost" ? './#/practice' : 'https://logan130.github.io/conjugate/#/practice' }}>
                <figure><img src={TomJerry2} alt="passé composé" className="z-0" /></figure>
                <Link className='text-lg' to='/practice'>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title z-10">{eng ? "Practice Conjugation" : "点击练习变位"}</h2>
                        {/* <Study className="h-36 w-full" /> */}
                        {/* <img src={TomJerry} className="h-40 m-0 rounded"></img> */}
                        {/* <figure><img src={TomJerry} alt="passé composé" className="z-0 w-full h-32" /></figure> */}
                    </div>
                </Link>
            </div>


            <div className="card w-auto bg-neutral text-neutral-content image-full hover:cursor-pointer" onClick={() => { window.location.href = window.location.hostname === "localhost" ? './#/voc' : 'https://logan130.github.io/conjugate/#/voc' }}>
                <figure><img src={TomJerry} alt="passé composé" className="z-0" /></figure>
                <Link className='text-lg' to='/voc'>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title z-10">{eng ? "Vocabulary, Spelling, & Gender" : "点击查看单词表, 拼写, 阴阳性"}</h2>
                        {/* <Study className="h-36 w-full" /> */}
                        {/* <img src={TomJerry} className="h-40 m-0 rounded"></img> */}
                        {/* <figure><img src={TomJerry} alt="passé composé" className="z-0 w-full h-32" /></figure> */}
                    </div>
                </Link>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Imparfait" : "未完成过去时"}</h2>
                    <h3 className="font-bold">{eng ? `remove "ons" from present indicative "nous" and add suffix` : "直陈式nous去掉ons"}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left"><span>j'all</span><span className={red_style}>ais</span></div>
                        <div className="text-left">nous all<span className={red_style}>ions</span></div>
                        <div className="text-left">tu all<span className={red_style}>ais</span></div>
                        <div className="text-left">vous all<span className={red_style}>iez</span></div>
                        <div className="text-left">il all<span className={red_style}>ait</span></div>
                        <div className="text-left">ils all<span className={red_style}>aient</span></div>
                    </div>

                </div>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Futur" : "简将"}</h2>
                    <h3 className="font-bold">{eng ? "futur root + suffix" : "简将词根加后缀"}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">j'ir<span className={red_style}>ai</span></div>
                        <div className="text-left">nous<span className={red_style}>ons</span></div>
                        <div className="text-left">tu ir<span className={red_style}>as</span></div>
                        <div className="text-left">vous ir<span className={red_style}>ez</span></div>
                        <div className="text-left">il ir<span className={red_style}>a</span></div>
                        <div className="text-left">ils ir<span className={red_style}>ont</span></div>
                    </div>

                </div>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Conditionnel Présent" : "条现"}</h2>
                    <h3 className="font-bold">{eng ? "futur root + imparfait suffix" : "简将词根 + 未完成过去时词尾"}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">j'ir<span className={red_style}>ais</span></div>
                        <div className="text-left">nous ir<span className={red_style}>ions</span></div>
                        <div className="text-left">tu ir<span className={red_style}>ais</span></div>
                        <div className="text-left">vous ir<span className={red_style}>iez</span></div>
                        <div className="text-left">il ir<span className={red_style}>ait</span></div>
                        <div className="text-left">ils ir<span className={red_style}>aient</span></div>
                    </div>

                </div>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Subjonctif Présent" : "虚拟式现在时(规则变位)"}</h2>
                    <h3 className="font-bold">{eng ? `remove "ent" from ind. ils and add suffix; remove "ons" from ind. nous and add suffix; ` : "直现ils去ent加e, es, e, ent；直现nous去ons, 加ions, iez"}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">que je doiv<span className={red_style}>e</span></div>
                        <div className="text-left">que nous dev<span className={red_style}>ions</span></div>
                        <div className="text-left">que tu doiv<span className={red_style}>es</span></div>
                        <div className="text-left">que vous dev<span className={red_style}>iez</span></div>
                        <div className="text-left">qu’il doiv<span className={red_style}>e</span></div>
                        <div className="text-left">qu’ils doiv<span className={red_style}>ent</span></div>
                    </div>

                </div>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Plus-que-parfait" : "愈过去时"}</h2>
                    <h3 className="font-bold">{eng ? "imparfait être/avoir + p.p." : "助动词未完成过去时 + p.p."}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">j'<span className={red_style}>avais</span> aimé</div>
                        <div className="text-left">nous <span className={red_style}>avions</span> aimé</div>
                        <div className="text-left">tu <span className={red_style}>avais</span> aimé</div>
                        <div className="text-left">vous <span className={red_style}>aviez</span> aimé</div>
                        <div className="text-left">il <span className={red_style}>avait</span> aimé</div>
                        <div className="text-left">ils <span className={red_style}>avaient</span> aimé</div>
                    </div>

                </div>
            </div>


            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Futur Antérieur" : "先将来时"}</h2>
                    <h3 className="font-bold">{eng ? "futur être/avoir + p.p." : "助动词简将 + p.p."}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">j'<span className={red_style}>aurai</span> aimé</div>
                        <div className="text-left">nous <span className={red_style}>aurons</span> aimé</div>
                        <div className="text-left">tu <span className={red_style}>auras</span> aimé</div>
                        <div className="text-left">vous <span className={red_style}>aurez</span> aimé</div>
                        <div className="text-left">il <span className={red_style}>aura</span> aimé</div>
                        <div className="text-left">ils <span className={red_style}>auront</span> aimé</div>
                    </div>

                </div>
            </div>


            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Conditionnel Passé Première Forme" : "条过去"}</h2>
                    <h3 className="font-bold">{eng ? "conditionnel présent être/avoir + p.p." : "助动词条现在 + p.p."}</h3>

                    <div className="grid grid-cols-2 gap-2">

                        <div className="text-left">j'<span className={red_style}>aurais</span> aimé</div>
                        <div className="text-left">nous <span className={red_style}>aurions</span> aimé</div>
                        <div className="text-left">tu <span className={red_style}>aurais</span> aimé</div>
                        <div className="text-left">vous <span className={red_style}>auriez</span> aimé</div>
                        <div className="text-left">il <span className={red_style}>aurait</span> aimé</div>
                        <div className="text-left">ils <span className={red_style}>auraient</span> aimé</div>
                    </div>

                </div>
            </div>


            <div className="card w-auto bg-neutral text-neutral-content image-full hover:cursor-pointer" onClick={toggleModal}>
                <figure><img src={Passe} alt="passé composé" /></figure>

                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "être for p.p." : "复合时态助动词"}</h2>
                    <h2 className="card-title">{eng ? "Click to expand" : "点击查询"}</h2>
                </div>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <figure><img src={Passe} className="" alt="passé composé" /></figure>
                        <h3 className="text-2xl text-bold">
                            arriver, monter, passer, entre, rester, sortir, descendre, tomber, aller, venir, retourner, naître, morrir
                        </h3>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={toggleModal}>close</button>
                    </form>
                </dialog>
            </div>







        </div>
    </>)
}





export function AllConjugate() {
    const { eng } = useContext(ThemeContext);
    let [listActive, setListActive] = useState(false);
    let [words, setWords] = useState(conjugates);
    let { scroll } = useParams();

    // if (!!scroll && scroll !== "1") {
    //     // window.location = '/error'
    //     const linkButton = <Link to='/voc'>
    //              {eng ? (isMobile ? "Voc" : "Vocabularies") : "词汇练习"} 
    //     </Link>

    // }

    const [buttonStyles, setButtonStyles] = useState([true, false, false]);

    let buttonsArr = ([
        {
            name: eng ? "All" : "全部",
            index: 0,
            verbs: conjugates,
        },
        {
            name: "A1",
            index: 1,
            verbs: conjugates.filter((verb) => verb.level === "A1"),
        },
        {
            name: "A2",
            index: 2,
            verbs: conjugates.filter((verb) => verb.level === "A2"),
        },
        {
            name: "B1",
            index: 2,
            verbs: conjugates.filter((verb) => verb.level === "B1"),
        },
    ])


    const onClickTab = (bool) => (e) => {
        setListActive(bool);
    }

    const onClickButton = (id) => {
        let newButtonStyles = [...buttonStyles];
        newButtonStyles[id] = !newButtonStyles[id];

        if (id === 0) {
            newButtonStyles = [true, false, false, false];
            setWords(conjugates);
        }
        else {
            // newButtonStyles[0] = false;
            // let new_words = [];
            // let all_false = true;
            // for (let i = 1; i < buttonsArr.length; i++) {
            //     if (newButtonStyles[i]) {
            //         new_words = [...new_words, ...buttonsArr[i].verbs]
            //         all_false = false;
            //     }
            // }
            // if (!all_false) {
            //     setWords(new_words);
            // }
            // else {
            //     newButtonStyles[0] = true;
            //     setWords(conjugates);
            // }
            newButtonStyles = [false, false, false, false];
            newButtonStyles[id] = true;
            let new_words = buttonsArr[id].verbs;
            setWords(buttonsArr[id].verbs)

        }
        setButtonStyles(newButtonStyles);
    };


    let isMobile = window.innerWidth < 500;

    useEffect(() => {
        // Scroll to the top of the page when component mounts
        // window.scrollTo(0, 0); // Scrolls to top-left corner
        // or
        if (!!scroll) {
            const element = document.getElementById('section1');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' // Optionally, you can make it scroll smoothly
            });
        }
    }, []);



    return (
        <>
            <h1 className={isMobile ? "text-2xl mb-2 font-bold" : "text-4xl mb-4 font-bold"}>{eng ? "About" : "介绍"}</h1>

            {/* 
            {
                isMobile && (<>
                    <div role="alert" className="alert alert-error w-full">
                        <span>检测到您在用手机，建议用电脑或ipad听写</span>
                    </div>
                    <br />
                </>)
            } */}

            {/* <p>
                本网站提供<Link className="link link-warning" to='/voc'>词汇</Link>和<Link className="link link-warning" to='/practice'>动词变位</Link>的练习。
            </p> */}

            <p>
                {eng ?
                    "This site provides three different modes for practice: conjugation, spelling, and gender. You can easily access these modes through the navigation bar or on this page. It is recommended to view this site using a computer or a phone, preferably on Chrome or Safari browsers. Please note that the frontend code has not been optimized specifically for iPad compatibility."
                    :
                    "这个网站提供三种听写模式：动词变位、词汇拼写、词汇阴阳性。链接在本页和屏幕最上方的导航栏都可以找到。目前建议用手机或电脑的Chrome或Safari浏览器浏览，代码还没适配ipad，ipad看可能轻微变形"
                }
            </p>
            <br />
            <p>
                {eng ?
                    "When it comes to conjugations, I have included eight different forms: six for the indicative present tense, along with the future root and the past participle. Most conjugations can be derived from these eight forms. To access a comprehensive list of conjugation rules and examples, you can simply scroll down on the page."
                    :
                    `动词变位只听写8个形式：直现的六个、过去分词、简将词根。
                除了极少数特殊情况，大部分常用时态语式的变位都可以通过这8个变位推导出来，
                不规则动词需要重点记忆的应该就这8个。往下滑你能看到规则和课文里所有的不规则动词`}
            </p>

            <br />

            <Cards />


            <br id="section1" />
            <br />
            <br />




            <div class="flex justify-between ...">
                <div>
                    <h1 className={isMobile ? "text-1xl mt-1 mr-1" : "text-4xl mt-4 mr-4"}>{eng ? "Special Conjugations" : "不规则变位表"}</h1>
                </div>
                <div className="flex items-bottom">
                    <h1 className={isMobile ? "text-1xl mt-1 mr-1" : "text-4xl mt-4 mr-4"}>{eng ? "Format" : "选择格式"}</h1>
                    <span role="tablist" className="tabs tabs-bordered">
                        <div role="tab" className={listActive ? `tab text-${isMobile ? "1" : "2"}xl` : `tab tab-active text-${isMobile ? "1" : "2"}xl`} onClick={onClickTab(false)}>{eng ? "Table" : "表格"}</div>
                        <div role="tab" className={!listActive ? `tab text-${isMobile ? "1" : "2"}xl` : `tab tab-active text-${isMobile ? "1" : "2"}xl`} onClick={onClickTab(true)}>{eng ? "List" : "列表"}</div>
                    </span>
                </div>
            </div>

            <br />


            <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                {buttonsArr.map((button, id) => (
                    <button
                        key={id}
                        className={`btn ${buttonStyles[id] ? "btn-success" : "btn-outline btn-success"}`}
                        onClick={() => onClickButton(id)}
                    >
                        {button.name}
                    </button>
                ))}
            </div>





            <br />
            {listActive ? <Table words={words} /> : <SingleConjugationBox words={words} />}

            {/* {listActive ? <Table words={words} /> : <SixGridTable words={words} />} */}



            <div className="flex flex-col w-full">
                <div className="divider"></div>
                <p className="italic">{eng ?
                    `“He kisses—how do I explain it? Like someone in love. Like he has nothing to lose. Like someone who has just learned a foreign language and can use only the present tense and only the second person. Only now, only you.” ― Andrew Sean Greer, Less`
                    :
                    `"他的吻，我要怎么说呢？就像坠入爱河，就像他无所畏惮，像一个人刚学一门外国语言，只会运用现在时态和第二人称，他的世界只有现在，只有你。" - Andrew Sean Greer小说Less`
                }</p>
                <div className="divider"></div>
            </div>

        </>
    )
}