import { Table } from "../components/table"
import { SixGridTable } from "../components/six_grid_table"
import { useState } from "react"
import { ReactComponent as Study } from '../static/study.svg'
import Passe from '../static/passe.jpeg'
import { Link } from 'react-router-dom'




export function AllConjugate() {
    let [listActive, setListActive] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        if (!modalOpen) {
            document.getElementById('my_modal_2').showModal()
        }
        setModalOpen(!modalOpen);
    };

    const onClickTab = (bool) => (e) => {
        setListActive(bool);
    }


    return (
        <>

            <h1 className="text-4xl mb-4">一般规则</h1>

            <div class="grid grid-cols-3 gap-2">
                <div className="card w-auto bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">未完成过去时</h2>
                        <h3 className="font-bold">直陈式nous去掉ons</h3>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="text-left">j'allais</div>
                            <div className="text-left">nous allions</div>
                            <div className="text-left">tu allais</div>
                            <div className="text-left">vous alliez</div>
                            <div className="text-left">il allait</div>
                            <div className="text-left">ils allaient</div>
                        </div>

                    </div>
                </div>

                <div className="card w-auto bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">简将</h2>
                        <h3 className="font-bold">简将词根加后缀</h3>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="text-left">j'irai</div>
                            <div className="text-left">nous irons</div>
                            <div className="text-left">tu iras</div>
                            <div className="text-left">vous irez</div>
                            <div className="text-left">il ira</div>
                            <div className="text-left">ils iront</div>
                        </div>

                    </div>
                </div>

                <div className="card w-auto bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">条现</h2>
                        <h3 className="font-bold">简将词根 + 未完成过去时词尾</h3>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="text-left">j'irais</div>
                            <div className="text-left">nous irions</div>
                            <div className="text-left">tu irais</div>
                            <div className="text-left">vous iriez</div>
                            <div className="text-left">il irait</div>
                            <div className="text-left">ils iriaient</div>
                        </div>

                    </div>
                </div>

                <div className="card w-auto bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">虚拟式现在时(规则变位)</h2>
                        <h3 className="font-bold">直现ils去ent加e, es, e, ent；直现nous去ons, 加ions, iez</h3>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="text-left">que j’aime</div>
                            <div className="text-left">que nous aimions</div>
                            <div className="text-left">que tu aimes</div>
                            <div className="text-left">que vous aimiez</div>
                            <div className="text-left">qu’il/elle aime</div>
                            <div className="text-left">qu’ils/elles aiment</div>
                        </div>

                    </div>
                </div>


                {/* <div className="card w-auto bg-neutral text-neutral-content image-full" onClick={toggleModal}>
                    <figure><img src={Passe} alt="passé composé" /></figure>

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">复合过去时助动词</h2>

                        <button className="text-1xl text-bold" onClick={() => document.getElementById('my_modal_2').showModal()}>展开</button>
                        
                        
                            <dialog id="my_modal_2" className="modal">
                            <div className="modal-box w-max h-max">
                                <figure><img src={Passe} className="w-max h-max" alt="passé composé" /></figure>
                                <h3 className="text-2xl text-bold">
                                    arriver, monter, passer, entre, rester, sortir, descendre, tomber, aller, venir, retourner, naître, morrir
                                </h3>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>


                    </div>
                </div> */}


                <div className="card w-auto bg-neutral text-neutral-content image-full hover:cursor-pointer" onClick={toggleModal}>
                    <figure><img src={Passe} alt="passé composé" /></figure>

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">复合过去时助动词</h2>
                        <h2 className="card-title">点击查询</h2>
                    </div>

                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
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




                <div className="card w-auto bg-neutral text-neutral-content">
                    <Link className='text-lg' to='/practice'>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">点击练习</h2>
                            <Study className="h-36" />
                        </div>
                    </Link>
                </div>

            </div>

            <br />

            <div className="flex items-bottom">
                <h1 className="text-4xl mt-4 mr-4">不规则变位表(按照Taxi顺序)，选择格式</h1>
                <div role="tablist" className="tabs tabs-bordered">
                    <a role="tab" className={listActive ? "tab text-2xl" : "tab tab-active text-2xl"} onClick={onClickTab(false)}>表格</a>
                    <a role="tab" className={!listActive ? "tab text-2xl" : "tab tab-active text-2xl"} onClick={onClickTab(true)}>列表</a>
                </div>
            </div>
            <br />
            {listActive ? <Table /> : <SixGridTable />}

        </>
    )
}