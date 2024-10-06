import React, { useEffect, useContext, useRef } from "react";
import { ThemeContext } from '../context/context';
import TomJerry from '../static/desktop-wallpaper-tom-jerry-for-fans-for-android-aesthetic-tom-and-jerry (1).jpg'


export function Features() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 500;
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
            <div className="flex flex-wrap ">
                {/* Left-hand side (picture) */}
                {
                    !isMobile &&
                    <div className="w-full md:w-2/5 px-4 mb-4 md:mb-0">
                        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box h-dvh">
                            <div className="carousel-item" id="slide2">
                                <img src={TomJerry} className="rounded-box h-full" alt='Tom' />
                            </div>
                        </div>
                    </div>
                }

                {/* Right-hand side (text) */}
                <div className="w-full md:w-3/5 px-4">
                    <h1 className="text-3xl font-bold mb-4">{eng ? "Features" : "功能介绍"}</h1>

                    <h2 className="text-xl font-bold mb-4">{eng ? "Responsive UI" : "自动适配手机和电脑端"}</h2>

                    <div>
                        {
                            eng ? 
                            <>This site can detect whether you are using a computer or a phone and display the corresponding UI. However, the code is not configured for ipad. If you are using an ipad, it's advised to use it horizontally. </>
                            :
                            <>本网站的代码能够自动检测出你在用手机还是电脑，然后生成更合适的排版，但是我的代码没有适配ipad，如果你想用ipad浏览，最好用横屏</>
                        }
                    </div>
                    <br/><br/>

                    <h2 className="text-xl font-bold mb-4">{eng ? "Dark Mode" : "支持黑夜和白天模式"}</h2>

                    <div>
                        {eng ?
                        <>This site supports day/dark modes. Click the top left button on the nav bar to switch.</>
                        :
                        <>这个网站支持黑夜和白天模式，明亮空间或阴暗空间使用更护眼，点击屏幕左上角可切换</>
                        }
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Bilingual Support" : "支持中英文"}</h2>

                    <div>
                        {
                            eng ? 
                            <>This site supports English and Chinese in both its web content and work definiton. It automatically detects your IP and system language to determine the preferred langauge. But you can also manuelly switch the language by clicking the top left button.</> 
                            :
                            <>这个网站无论是内容还是单词注释都支持中英双语。网站能够根据你的IP和系统语言猜测你的常用语言，但如果你想手动调整，也可以点击屏幕上方左上角的语言图标</>
                        }
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Vocabulary" : "单词表"}</h2>

                    <div>
                        {
                            eng ?
                            <>Clicking the <button className='btn btn-success btn-sm m-2'>Voc</button> button on the top right directs you to the vocabulary list page. Every voc unit supports filtering based on lessons and POS. In addition, some words are annotated with parentheses that explains how to use it. The voc list includes textbooks such as Taxi, Alter Ego, Édito, Progressif(ve).</>
                            :
                            <>每一课都有对应的<button className='btn btn-success btn-sm m-2'>单词表</button>，点击屏幕右上方的"词汇"可以前往。每个单词表内部支持根据课文、词性过滤，还可以根据词性排序。此外，单词释义还同时支持中英文切换，并用括号配有用法和介词搭配示例。同时，单词表涵盖了Taxi, Ego, 渐进词汇，渐进交际，Édito，Inner French等语料</>
                        }
                        
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Integration with Anki, Quizlet" : "Anki, Quizlet融合"}</h2>

                    <div>
                        {
                            eng ? 
                            <>By scrolling down in a voc list, you will see a <button className='btn btn-error btn-outline btn-sm m-2'>copy</button> button. Clicking it will copy the vocabularies that are already parsed in a way that can be easily exported to Anki/Quizlet.</>:
                            <>每一个单词表下拉可看到一个<button className='btn btn-error btn-outline btn-sm m-2'>复制</button>按钮，点击可以复制格式化的单词和释义，可以轻松一键导入Quizlet或Anki，从而定制私人学习计划</>
                        }
                        
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Integration with LLM" : "大语言模型融合"}</h2>

                    <div>
                        {
                            eng ? 
                            <>You can also see an <button className='btn btn-error btn-outline btn-sm m-2'>LLM Prompt</button> button at the top of every voc list. Clicking it copies a prompt that, once input into large languaege models such as GPT, can generate sample sentences and paragraphs to help you internalize the words in the voc list. </>
                            :
                            <>每一个单词表下拉可看到一个<button className='btn btn-error btn-outline btn-sm m-2'>LLM指令</button>按钮，点击可以复制大语言模型指令，输入大语言模型可以生成大量例句和语境来强化单词理解。国外的同学推荐用GPT，国内经过测试，我认为最好的模型只有文心一言，国内其他模型经常有语法错误。这是近期生成式AI发展后一个非常高效的学习过程</>
                        }
                        
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Practice Modes" : "练习功能"}</h2>

                    <div>
                        {
                            eng ?
                            <>You can also practice the words. <button className='btn btn-warning btn-sm m-2'>Spelling</button> allows you to practice the spelling, while <button className='btn btn-secondary btn-sm m-2'>Gender</button> allows you to practice the genders of the nouns. Both practice modes support grading and they can also give hints.</>
                            :
                            <>每一课的单词表还支持练习，你可以进行<button className='btn btn-warning btn-sm m-2'>拼写练习</button>(填空题) 或<button className='btn btn-secondary btn-sm m-2'>阴阳练习</button>(选择题)，做完以后还可以一键批改并提示正确答案</>
                        }
                        
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Conjugation Card" : "动词变位卡片"}</h2>

                    <div>
                        {
                            eng ? 
                            <>This site also provides conjugation cards classified based on their level of difficulties and suffix. The cards are sorted based on Levenshtein Distance in computational linguistics, making similar words closer together. </>
                            :
                            <>这个网站还提供从A1到B2的各种不规则动词变位卡片，并根据计算语言学里的莱文斯坦距离进行排序，使得相似的单词会靠得更近，你还可以根据水平(A1-B2)和词根进行过滤</>
                        }
                    </div>
                    <br/><br/>


                    <h2 className="text-xl font-bold mb-4">{eng ? "Conjugation Dictation" : "动词变位听写"}</h2>

                    <div>
                        {
                            eng ?
                            <>You can also practice your conjugation by going to the dictation mode. It also supports auto grading. You can go to the page by clicking the Conj button on the top right. </>
                            :
                            <>当你认为你已经学习了一定的动词变位，这时你就可以开始听写变位了。这个网站不仅支持根据各阶段水平进行练习，还可以自动批改并给出提示，点击屏幕右上角的变位按钮就可以练习</>
                        }
                    </div>
                    <br/><br/>
                    
                </div>
            </div>
        </>
    );
}

export default Features;
