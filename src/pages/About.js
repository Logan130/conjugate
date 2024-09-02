import Tom from '../static/tom.jpeg'
import Profile from '../static/profile.jpeg'
import Taxi from '../static/Taxi.jpeg'
import { Link } from 'react-router-dom'
import React, { useEffect, useContext, useRef } from "react";
import { ThemeContext } from '../context/context';


export function About() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 500;
    let iconStyle = isMobile ? "h-12 rounded-full " : "h-16 rounded-full";
    const divRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the page when component mounts
        // window.scrollTo(0, 0); // Scrolls to top-left corner
        // or
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Optionally, you can make it scroll smoothly
        });
    }, []);

    useEffect(() => {
        const divElement = divRef.current;
        if (divElement) {
            // Trigger a reflow to ensure the transition will be applied
            divElement.classList.add('opacity-100');
        }
    }, []);

    return (
        <>
            <div className="flex flex-wrap items-center justify-center">
                {/* Left-hand side (picture) */}
                <div className="w-full md:w-2/5 px-4 mb-4 md:mb-0">
                    <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box h-96">
                        <div className="carousel-item" id="slide2">
                            <img src={Tom} className="rounded-box h-full" alt='Tom' />
                        </div>

                        {/* <div className="carousel-item" id="slide1">
                            <img src={Taxi} className="rounded-box h-full" alt='Taxi'/>
                        </div> */}

                    </div>
                </div>

                {/* Right-hand side (text) */}
                <div className="w-full md:w-3/5 px-4">
                    <h1 className="text-3xl font-bold mb-4">{eng ? "About" : "关于这个网站"}</h1>

                    <div
                        // className={isMobile ? "text-sm transition-opacity duration-1000 ease-in-out opacity-0" : "text-lg transition-opacity duration-1000 ease-in-out opacity-0"}
                        className={isMobile ? "text-sm " : "text-lg "}
                        // onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                    >
                        {eng ?
                            <p className="mb-4">
                                While studying French, I find it challenging to memorize vocabulary and conjugation. Taking advantage of my skills as a full-stack engineer, I have developed a web application to make this learning process easier. Furthermore, I have chosen to deploy this application on the Internet so that anyone can access the study materials :)
                            </p> :
                            <p className="mb-4">
                                我从A2开始和{" "}
                                <a className="link link-warning" href="https://space.bilibili.com/516688089/">
                                    <img
                                        src={Profile}
                                        className="w-8 rounded-full mr-2 transition-opacity duration-1000 ease-in-out opacity-0"
                                        style={{ display: "inline" }}
                                        onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                                        alt="Teacher" />
                                    詹晨老师
                                </a>学习法语，他的听写对我帮助非常大，但我记忆力不是很好，旧一些的动词变位和名词阴阳性过一段时间就忘了。
                                由于平时的阅读和听力难以覆盖所有旧单词，复习起来并不容易。再加上詹老师只在A1 A2听写单词，B阶段以后就只听写课文，
                                所以我做了个本地端的小应用来记忆单词和动词变位，但后来觉得干脆把它部署发布到网上，方便我用手机或大家一起学习。
                            </p>
                        }
                        <br />

                        {!eng && (<>
                            <p className="">
                                A1-B2有直现，复合过去时，未完成过去时，最近过去，最近将来，简将，条现，虚现，愈过去，先将来，条过去，虚过去，不定式，过去时不定式，简单过去时，先过去时，虽然每个单词对应的变位有几十个，
                                但这个网站只听写其中8个变位，分别是直现的六个、过去分词、简将词根。
                                除了虚拟式的特殊情况和简单过去时，以上所有时态和语式的变位都可以通过这8个变位推导出来
                            </p>
                            <br />
                        </>)}

                        {eng ?
                            <p className="">
                                To practice conjugation, simply click on the <Link className="link link-warning" to='/practice'>{isMobile ? "Conj" : "Conjugation"}</Link> button located in the navigation bar. By doing so, you will be redirected to a page where you can test and improve your conjugation skills. Additionally, you will have the option to check your answers and receive helpful hints.
                            </p> :
                            <p className="">
                                这个网站的<Link className="link link-warning" to='/practice'>变位练习板块</Link>
                                动词按照每个阶段进行了分类，可以自由组合练习模块，点击“检查”按钮能够检查听写对错，
                                如果忘记变位，点击“提示”按钮就会有答案。由于我还在学习中，因此这个网站会不断更新
                            </p>}


                        <br />

                        {eng ?
                            <p className="">

                                If you are interested in horning your vocabulary, I have created a section called <Link className="link link-warning" to='/voc'>{isMobile ? "Voc" : "Vocabulary"}</Link> that contains a wide range of words and phrases that I've studied. This section includes materials from various sources such as the Progressive series, Taxi, Alter Ego, and Edito. Within the "Voc" section, you will be able to filter the content based on parts of speech and gender. Features that use Large Language Models and Anki/Quizlet are integrated into this section to facilitate learning. Moreover, you can also practice spelling and matching genders.
                                {/* <Link className="link link-warning" to='/voc'>The Voc section </Link>
                                lists all the words and phrases I encountered (including the Progressive series, Taxi, and Edito). It supports filtering based on POS and gender. It also allows you to practice spelling and match genders. */}
                            </p> :
                            <p className="">
                                <Link className="link link-warning" to='/voc'>词汇板块</Link>
                                导入了我学习过程中遇到的单词，包括Taxi/Alter Ego和法语渐进系列(交际系列，词汇系列)，还有一些零碎的其他单元(Inner French, Édito)
                                它支持查看单词表和根据词性过滤，还能听写拼写和测试名词阴阳性，
                                由于阴阳性经常是一整个句子配合的核心，我专门添加了这个功能。
                                此外，每一个单元的单词表是这个软件的精华，里面不仅能根据课文词性分类排序，轻松一键导入Quizlet/Anki，还能自动生成AI大语言模型指令，以帮助快速构建全新语境学习单词。
                            </p>
                        }

                        {eng &&
                            <p>
                                <br />Feel free to explore these features and enhance your French language learning experience!
                            </p>}
                    </div>

                    <br />
                    <br />


                    <h1 className="text-3xl font-bold mb-4">{eng ? "Tech Stack" : "技术"}</h1>




                    <div
                        className={isMobile ? "text-sm transition-opacity duration-1000 ease-in-out opacity-0" : "text-lg transition-opacity duration-1000 ease-in-out opacity-0"}
                        ref={divRef}
                    >
                        <p>{eng ? "Frontend" : "前端"}：React.js, Tailwind CSS, DaisyUI</p>
                        <p>{eng ? "Data Cleaning: Few-Shot Learning via GPT" : "数据清洗：我提供英法笔记草稿，GPT进行Few-Shot Learning填充数组并进行中翻"}</p>
                        <p>{eng ? "Deployment" : "部署"}：GitHub Pages</p>
                    </div>

                    <br />

                    <div className={isMobile ? "grid grid-cols-5 gap-2 align-left" : "grid grid-cols-6 gap-2 align-left"}>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp" className={iconStyle} alt="React" />
                        <img src="https://jackardios.gallerycdn.vsassets.io/extensions/jackardios/vscode-css-to-tailwindcss/1.2.6/1676074578283/Microsoft.VisualStudio.Services.Icons.Default" className={iconStyle} alt="Tailwind" />
                        <img src="https://avatars.githubusercontent.com/u/76870092?s=280&v=4" className={iconStyle} alt="DaisyUI" />
                        <img src="https://cdn-icons-png.flaticon.com/256/11865/11865313.png" className={iconStyle} alt="ChatGPT" />
                        <img src="https://b.thumbs.redditmedia.com/AltCa25flSy96k0VDTcXUseNPu25FWaInEl1LOvkbqs.png" className={iconStyle} alt="Github" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
