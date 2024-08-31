import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Passe from '../../static/tomjerry6.png'
import TomJerry from '../../static/tomjerry2.png'
import TomJerry2 from '../../static/tomjerry4.png'
import { ThemeContext } from "../../context/context"


export function ConjugateRuleCards() {
    const { eng, theme } = useContext(ThemeContext);
    const [modalOpen, setModalOpen] = useState(false);
    const red_style = theme === 'dark' ? "font-bold text-rose-400" : "font-bold text-amber-700"
    const toggleModal = () => {
        if (!modalOpen) {
            document.getElementById('my_modal_2').showModal()
        }
        setModalOpen(!modalOpen);
    };

    let isMobile = window.innerWidth < 500;

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
                    <h2 className="card-title">{eng ? "Conditionnel Présent / Future Dans le Passée" : "条现在/过去将来时"}</h2>
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


            {/* <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Future Dans le Passée" : "过去将来时"}</h2>
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
            </div> */}


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


            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Subjonctif Passé" : "虚过去"}</h2>
                    <h3 className="font-bold">{eng ? "subjonctif présent être/avoir + p.p." : "助动词虚现在 + p.p."}</h3>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-left">que j'<span className={red_style}>aie</span> aimé</div>
                        <div className="text-left">que nous <span className={red_style}>ayons</span> aimé</div>
                        <div className="text-left">que tu <span className={red_style}>aies</span> aimé</div>
                        <div className="text-left">que vous <span className={red_style}>ayez</span> aimé</div>
                        <div className="text-left">qu’il <span className={red_style}>ait</span> aimé</div>
                        <div className="text-left">qu’ils <span className={red_style}>aient</span> aimé</div>
                    </div>

                </div>
            </div>

            <div className="card w-auto bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{eng ? "Passé Antérieur" : "先过去时"}</h2>
                    <h3 className="font-bold">{eng ? "passé simple être/avoir + p.p." : "助动词简单过去 + p.p."}</h3>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-left">j'<span className={red_style}>eus</span> aimé</div>
                        <div className="text-left">nous <span className={red_style}>eûmes</span> aimé</div>
                        <div className="text-left">tu <span className={red_style}>eus</span> aimé</div>
                        <div className="text-left">vous <span className={red_style}>eûtes</span> aimé</div>
                        <div className="text-left">il <span className={red_style}>eut</span> aimé</div>
                        <div className="text-left">ils <span className={red_style}>eurent</span> aimé</div>
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
                        {/* <figure><img src={Passe} className="" alt="passé composé" /></figure> */}


                        <div className="text- text-bold">
                            {eng ? "Verbs using être" : "使用être的动词"}: arriver, partir, *monter, *descendre, *passer, entrer, *rentrer, rester, *sortir, tomber, aller, venir, *retourner, naître, morrir, intervenir, décéder
                        </div>

                        <br/>
                        <div>
                            {eng ? "The verbs with * can be v.t. In that case, we should use avoir." : "带*动词可以有及物用法，如果是那样，必须用avoir作为助动词"}
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={toggleModal}>close</button>
                    </form>
                </dialog>
            </div>


        </div>
    </>)
}

