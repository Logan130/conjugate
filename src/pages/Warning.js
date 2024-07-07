import { useState, useEffect } from "react";
import { ChineseParser } from "../components/vocabulaire/VocabulaireSummary";


let voc = [
    { english: "to promote (produits, idée, qn au range de sergent)", french: "promouvoir", pos: "v.t.", chinese: "推广" },
    { english: "to interact (avec qn)", french: "interagir", pos: "v.i.", chinese: "互动" },
    { english: "stand (champ de cours, de président), platform", french: "tribune", pos: "n.f.", chinese: "讲台" },
    { english: "overwhelmed (de qch, par article qch)", french: "débordé(e)", pos: "v.t.", chinese: "不堪重负" },
    { english: "to digest (plat, lecture, information, connaissances)", french: "digérer", pos: "v.t.", chinese: "消化" },
    { english: "to invade", french: "envahir", pos: "v.t.", chinese: "入侵" },
    { english: "overwhelmed (de qch, par articles qch)", french: "submergé(e)", pos: "adj.", chinese: "不堪重负" },
    { english: "flood, stream", french: "flot", pos: "n.m.", chinese: "洪水" },
    { english: "invasion", french: "invasion", pos: "n.f.", chinese: "侵略" },
    { english: "watch", french: "veille", pos: "n.f.", chinese: "守夜" },
    { english: "to spark off (débat, émotion), to give rise to (crainte)", french: "susciter", pos: "v.t.", chinese: "点燃，引发" },
    { english: "to receive (salaire), to touch (à qch), to move emotionally (qn)", french: "toucher", pos: "v.t.", chinese: "领取（薪水），触摸（à qch），感动（qn）" }
]

function Table({ english }) {
    let isMobile = window.innerWidth < 500;



    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>单词</th>
                            <th className="text-lg w-10 cursor-pointer hover:bg-sky-700 rounded-lg">词性</th>
                            <th className="text-lg cursor-pointer"><div className="flex justify-left"> <p className={isMobile ? "flex justify-left text-amber-600" : "hover:bg-sky-700 rounded-lg flex justify-left text-amber-600"}>释义</p>  </div></th>
                        </tr>
                    </thead>
                    <tbody>


                        {voc.map((word, id) => (<>
                            <tr className={isMobile ? "" : "text-lg"}>
                                <th className={isMobile ? "" : "text-sm"}>{word.french}</th>
                                <th>{word.pos}</th>
                                <th className={isMobile ? "" : "text-sm"}>
                                    {english ? word.english : ((english !== undefined) ? ChineseParser(word.english, word.chinese) : word.chinese)}
                                </th>
                            </tr>
                        </>))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export function Warning() {
    let isMobile = window.innerWidth < 500;
    let [stepStyles, setStepStyles] = useState(["step", "step", "step", "step"]);

    useEffect(() => {
        const interval = setInterval(() => {
          setStepStyles((prevStepStyles) => {
            if (prevStepStyles[0] === 'step') {
                return ["step step-primary", "step", "step", "step"];
            }
            else if (prevStepStyles[1] === 'step') {
                return ["step step-primary", "step step-primary", "step", "step"];
            }
            else if (prevStepStyles[2] === 'step') {
                return ["step step-primary", "step step-primary", "step step-primary", "step"];
            }
            else if (prevStepStyles[3] === 'step') {
                return ["step step-primary", "step step-primary", "step step-primary", "step step-primary"];
            }
            return ["step", "step", "step", "step"];
          });

        }, 1500);


        return () => clearInterval(interval);
      }, []);

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">单词表设计理念 & 中文用户注意事项</h1>
            <br />
            <p>
            <span className="underline font-bold txt-rose-400 text-violet-400">詹晨老师上课时反复强调单词要放语境里背</span>，这和我以前考美国的SAT背了2.5万个英语单词的经验是一致的，单词要放在情景里才记得牢。然而我在B1 U1-U2阶段尝试了放入很多长句子进单词表，
                后来发现效果一般。我觉得这可能和自然语言处理领域的滑动窗口理论类似，给机器训练语言模型时如果滑动窗口弄成2-4个词大小(只看一个单词周围的2-4个词)，那么它学到的更多是syntaxique的内容(比如介词固定搭配)，
                但如果窗口一大(5-7个单词)，它更容易学到sémantique的内容(句子整体意思)。我觉得我作为学习者，我会更想关注单词后面立刻跟着的能是什么

            </p>
            <br />

            <p>
                由于课堂上已经教了很多语法，实际上我们作为学习者可能只需要更小的语言单位(单词+固搭)就能用规则推导出结构丰富的句子，因此为了减轻记忆容量，我尽可能把单词的窗口缩小到2-3个单词，
                即在释义里创造一个<span className="underline font-bold txt-rose-400 text-violet-400">“微语境”</span>，把重点放在: 比如单词后面要跟什么介词 (interagir AVEC)，常常会和什么概念搭配 (digérer后面不仅能带具体的食物plat, 还能带抽象的概念connaissances).
                有了这个微语境就不用记整个句子了，根据我从Taxi B1 U2-U7的学习经验看，效果确实比放整个句子要好很多。而且这么做的另一个好处是，<span className="underline font-bold txt-rose-400 text-violet-400">用Quizlet或Anki听写时会实际很多</span>，
                如果我把长一些的句子作为生词，那听写肯定会有轻微差别，但那两个软件没智能到能根据意思判断正误，我从B1 U3开始做的这种释义方式尽可能让单词变到了最短，把搭配放到了释义里，这样子用软件默写时也比较现实。
            </p>
            <br />

            <p>
                然而受到时间和开发条件的限制，<span className="underline font-bold text-violet-400">中文释义都是机器生成的，中文用户会面临下面这些问题。</span>或许你已经留意到这个网站的单词表释义支持中英双语，而且配上了相应的例子，例如:
            </p>

            <br />
            <br />

            <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-12"}>
                <div>
                    <Table english={true} />
                </div>

                <div>
                    <Table english={false} />
                </div>
            </div>
            <br />
            <br />
            <br />

            <p>
                然而，值得注意的是，我一开始设计这个网站时，它的释义本身就是只支持英文。这是由我学习的更新这个网站的方式决定的：
            </p>

            <ul className="steps steps-vertical">
                {/* <li className="step step-primary">边听课边做笔记(正常上课时间)</li>
                <li className="step step-primary">整理笔记，由于法语和英语词汇重合度极高，我选择用英文做笔记，并查Oxford Hachette词典配上相应固搭和用法(每课5-10分钟)</li>
                <li className="step">喂给GPT洗数据，把笔记洗成数组(30秒)</li>
                <li className="step">前端框架根据这些单词数组渲染出网站(2秒)</li> */}
                <li className={stepStyles[0]}>边听课边做笔记(正常上课时间)</li>
                <li className={stepStyles[1]}>整理笔记，由于法语和英语词汇重合度极高，我选择用英文做笔记，并查Oxford Hachette词典配上相应固搭和用法(每课5-10分钟)</li>
                <li className={stepStyles[2]}>喂给GPT洗数据，把笔记洗成数组(30秒)</li>
                <li className={stepStyles[3]}>前端框架根据这些单词数组渲染出网站(2秒)</li>
            </ul>
            <br />
            <br />

            <p>
                你可能已经注意到，我的笔记没有任何中文，但最后却能提供单词的中文释义，这是因为我用了GPT的少样本学习，让它根据法语和英文翻出中文，
                <span className="underline font-bold text-violet-400">然而这就有几个很大的问题：</span>
            </p>
            <br />

            <p>
                1. 大语言模型经常产生幻觉(乱翻译)，比如submergé翻译成了"不堪重负"，缺少了英文和法文自带的"被液体淹没"的本意，还有veille误翻成守夜了
            </p>
            <br />

            <p>
                2. 中英法三语偶尔不互通(难翻译)，比如promouvoir对应英语的promote，它们同时具有推广和升职的意思，但中文只翻译出了"推广"，所以后面的qn au range de sergent(升某人为中士)例子就搭不上“推广”这个翻译，
            </p>
            <br />

            <p>
                3. 英文释义里的固搭和用法是用法语写的，中文肯定是要保留法文，比如我更希望用户看到的susciter这个词的中文释义是"点燃，引发 (débat, émotion) (crainte)"，而非"点燃，引发 (争论，情感) (恐惧)"，甚至直接就把几个搭配的例子去掉了
            </p>
            <br />

            <p>
                由于我白天上班晚上听课，不会有很多时间开发这个软件，我不可能每个词去手动输入中文。实际上，如果我单纯依赖GPT，你看到的单词表会长这样，你会发现中文释义缺失了大量法语用法搭配：
            </p>
            <br />

            <p>
                最好的解决方法当然是你看英文释义啦，都是我手工打出来的质量有保障，但并<span className="underline font-bold text-violet-400">不是每个人都熟悉英文，因此为了解决GPT洗出来的中文数据缺失法语固定搭配的问题，我自己做了一个小算法往中文释义里插入法语固搭。</span>
                这个算法当然不完美，但我尽力了而且做了些测试，大致效果是可以的，并且已经部署到网站上了，所以现在看中文释义的用户也可以享受法语固搭的释义了。
                不过这个算法一定是有问题的，某些单词的中文释义即使经过改进还是会失真(比如promouvoir)，<span className="underline font-bold text-violet-400">如果你觉得网站上的释义很奇怪不要犹豫去查词典</span>
            </p>
            <br/>

            <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-12"}>
                <div>
                    <Table english={undefined} />
                    <p className="text-center mt-2 italic text-rose-400">之前版本：中文释义(GPT原生)</p>
                </div>

                <div>
                    <Table english={false} />
                    <p className="text-center mt-2 italic text-rose-400">当前版本：中文释义(GPT+本地算法改进)</p>
                </div>

                <div>
                    <Table english={true} />
                    <p className="text-center mt-2 italic text-rose-400">英文释义 (最准确)</p>
                </div>
            </div>
            <br/>
            <br/>

            


        </>
    )
}