import { Table } from "../components/conjugate/ConjugationList"
import { useState, useEffect, useContext } from "react"
import { conjugates } from "../data/conjugation/conjugates"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../context/context"
import { SingleConjugationBox } from "../components/conjugate/SingleConjugationBox"
import { ConjugateRuleCards } from "../components/conjugate/ConjugateRuleCards"

export function AllConjugate() {
    const { eng } = useContext(ThemeContext);
    let [listActive, setListActive] = useState(false);
    let [words, setWords] = useState(conjugates);
    let { scroll } = useParams();

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

            <ConjugateRuleCards />


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