import Tom from '../static/tom.jpeg'
import Profile from '../static/profile.jpeg'
import Taxi from '../static/Taxi.jpeg'
import { Link } from 'react-router-dom'
import React, { useEffect, useContext } from "react";
import { ThemeContext } from '../context/context';


export function About() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 500;
    let iconStyle = isMobile ? "h-12 rounded-full " : "h-16 rounded-full"

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

                    <div className={isMobile ? "text-sm" : "text-lg"}>
                        {eng ?
                            <p className="mb-4">
                                While studying French, I personally find it challenging to memorize vocabulary and conjugation. Taking advantage of my skills as a full-stack engineer, I have developed a web application to make this learning process easier. Furthermore, I have chosen to deploy this application on the Internet so that anyone can access the study materials :)
                            </p> :
                            <p className="mb-4">
                                在和{" "}
                                <a className="link link-warning" href="https://space.bilibili.com/516688089/">
                                    <img src={Profile} className="w-8 rounded-full mr-2" style={{ display: "inline" }} alt="Teacher" />
                                    詹晨老师
                                </a>学习法语的过程中，他的听写对我帮助非常大，但我记忆力不是很好，旧一些的动词变位和名词阴阳性过一段时间就忘了。
                                由于平时的阅读难以覆盖所有旧单词，
                                我原本做了个本地电脑端的小应用来记忆，但后来觉得干脆把它部署发布到网上，方便我用手机或大家一起学习
                            </p>
                        }
                        <br />

                        {!eng && (<>
                            <p className="">
                                A1-A2有直现，复过，未完成过去，简将，条现，虚现，虽然每个单词对应的变位有几十个，
                                但这个网站只听写其中8个变位，分别是直现的六个、过去分词、简将词根。
                                除了虚拟式的特殊情况，以上所有时态和语式的变位都可以通过这8个变位推导出来
                            </p>
                            <br />
                        </>)}

                        {eng ?
                            <p className="">
                                To practice conjugation, simply click on the <Link className="link link-warning" to='/practice'>Conjugations</Link> button located in the navigation bar. By doing so, you will be redirected to a page where you can test and improve your conjugation skills. Additionally, you will have the option to check your answers and receive helpful hints.
                                {/* Click <Link className="link link-warning" to='/practice'>the Conjugations button on the navigation bar </Link>
                                to practice conjugation. You can also check your answers and get hints there. */}
                            </p> :
                            <p className="">
                                这个网站的<Link className="link link-warning" to='/practice'>变位练习板块</Link>
                                动词按照Taxi每本书进行了分类，可以自由组合练习模块，点击“检查”按钮能够检查听写对错，
                                如果忘记变位，点击“提示”按钮就会有答案。由于我还在学习中，因此这个网站会不断更新，后续会陆续加入B1和B2板块
                            </p>}


                        <br />

                        {eng ?
                            <p className="">

                                If you are interested in expanding your vocabulary, I have created a section called <Link className="link link-warning" to='/voc'>Vocabularies</Link> that contains a wide range of words and phrases that I've studied. This section includes materials from various sources such as the Progressive series, Taxi, and Edito. Within the "Voc" section, you will be able to filter the content based on parts of speech and gender. Moreover, you can also practice spelling and matching genders.
                                {/* <Link className="link link-warning" to='/voc'>The Voc section </Link>
                                lists all the words and phrases I encountered (including the Progressive series, Taxi, and Edito). It supports filtering based on POS and gender. It also allows you to practice spelling and match genders. */}
                            </p> :
                            <p className="">
                                <Link className="link link-warning" to='/voc'>词汇板块</Link>
                                导入了我学习过程中遇到的单词，包括Taxi和法语渐进系列(交际系列，词汇系列)，
                                它支持查看单词表和根据词性过滤，还能听写拼写和测试名词阴阳性，
                                由于阴阳性经常是一整个句子配合的核心，我专门添加了这个功能
                            </p>
                        }

                        {eng &&
                            <p>
                                <br/>Feel free to explore these features and enhance your French language learning experience!
                            </p>}
                    </div>

                    <br />
                    <br />


                    <h1 className="text-3xl font-bold mb-4">{eng ? "Tech Stack" : "技术"}</h1>




                    <div className={isMobile ? "text-sm" : "text-lg"}>
                        <p>{eng ? "Frontend" : "前端"}：React.js, Tailwind CSS, DaisyUI</p>
                        <p>{eng ? "Data Cleaning: Few-Shot Learning via GPT" : "单词数据：我提供笔记草稿，GPT进行Few-Shot Learning填充JSON"}</p>
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
