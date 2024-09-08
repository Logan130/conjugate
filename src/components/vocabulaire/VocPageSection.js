import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../context/context';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom'

const apiKey = process.env.REACT_APP_API_KEY;

export function Section({ title, vocArr, filter, filterArr, filterHandler, buttonArr, reverse, titleStyle, buttonStyle, locked }) {
    const { eng } = useContext(ThemeContext);

    let [expanded, setExpanded] = useState(false);
    let isMobile = window.innerWidth < 850;
    let [matched, setMatched] = useState(!locked || localStorage.getItem('password') === apiKey)
    let [passwordCorrect, setPasswordCorrect] = useState(null);
    let [alertIsVisible, setAlertIsVisible] = useState(false);
    let [page, setPage] = useState(0);
    let lessonsPerPage = (isMobile ? 6 : 10);
    let [missing, setMissing] = useState(0);

    let targetArr = vocArr.filter((lesson) => lesson.book === filter);
    let totalUnits = targetArr.length;
    if (reverse) {
        targetArr = targetArr.reverse();
    }

    useEffect(() => {
        var targetArr = vocArr.filter((lesson) => lesson.book === filter);
        if (reverse) {
            targetArr = targetArr.reverse();
        }

        setUnits(targetArr.slice(0, lessonsPerPage))
        setMissing(0);
        setPage(0);
    }, [filter, lessonsPerPage, reverse, vocArr])

    let [units, setUnits] = useState(targetArr.slice(0, lessonsPerPage));

    let vocButtonStyle = `btn btn-success ${buttonStyle}`
    let spellingButtonStyle = `btn btn-warning ${buttonStyle}`;
    let genderButtonStyle = `btn btn-secondary ${buttonStyle}`;

    const onClickUnlock = (e) => {
        setExpanded(!expanded);
    }
    let [passwordValue, setPasswordValue] = useState('');
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
        window.localStorage.setItem('password', e.target.value)
    }

    const onClickConfirm = (e) => {
        let correct = passwordValue === apiKey;
        setMatched(correct);
        setPasswordCorrect(correct);
        setAlertIsVisible(!correct);
        const timer = setTimeout(() => {
            setAlertIsVisible(false);
        }, 1800);
        return () => clearTimeout(timer);
    }

    const onHitKeyDown = (e) => {
        if (e.key === 'Enter') {
            let correct = passwordValue === apiKey;
            setMatched(correct);
            setPasswordCorrect(correct);
            setAlertIsVisible(!correct);
            const timer = setTimeout(() => {
                setAlertIsVisible(false);
            }, 2500);
            return () => clearTimeout(timer);
        };
    }

    // window.localStorage.clear();
    const onClickPage = (diff) => (e) => {
        let maxPageNumber = Math.ceil(targetArr.length / lessonsPerPage);
        let pageNumber = page + diff;
        if (pageNumber < 0 || pageNumber >= maxPageNumber) {
            return;
        }
        setUnits(targetArr.slice(lessonsPerPage * pageNumber, lessonsPerPage * (pageNumber + 1)));
        if (pageNumber === maxPageNumber - 1) {
            setMissing((lessonsPerPage - (totalUnits % lessonsPerPage)) % lessonsPerPage);
        }
        else {
            setMissing(0)
        }
        setPage(pageNumber);
    }

    return (
        <>
            <div className={isMobile ? "text-2xl mb-2 flex justify-left" : "text-4xl mb-4 flex justify-left"}>
                {(locked && !matched) ?
                    <>
                        <div className='flex flex-row align-center items-center'>
                            <div>{title} &nbsp;&nbsp; </div>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            <button onClick={onClickUnlock} className="btn btn-neutral ml-3 mr-3">{eng ? 'unlock' : '解锁'}</button>

                            {!isMobile && <>
                                {(expanded && !matched) &&
                                    <>
                                        <label className="input input-bordered flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                    clipRule="evenodd" />
                                            </svg>

                                            <input type="password" className="grow" value={passwordValue} onChange={onPasswordChange} onKeyDown={onHitKeyDown} />
                                        </label>
                                        <button onClick={onClickConfirm} className="btn btn-neutral ml-3">{eng ? 'Confirm' : '确认'}</button>
                                    </>
                                }
                            </>}
                        </div>


                    </>
                    :
                    <>{title}</>}
            </div>

            <div>
                {isMobile && <>
                    {(expanded && !matched) &&
                            <div className='flex flex-row align-center items-center mb-2'>
                                <label className="input input-bordered flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd" />
                                    </svg>

                                    <input type="password" className="grow" value={passwordValue} onChange={onPasswordChange} onKeyDown={onHitKeyDown} />
                                </label>
                                <button onClick={onClickConfirm} className="btn btn-neutral ml-3">{eng ? 'Confirm' : '确认'}</button>
                            </div>
                    }
                </>}
            </div>

            {(expanded && !matched) &&
                <>
                    {/* <div className='flex flex-row'>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" value={passwordValue} onChange={onPasswordChange} onKeyDown={onHitKeyDown} />
                        </label>
                        <div>
                            <button onClick={onClickConfirm} className="btn btn-neutral ml-3">{eng ? 'Confirm' : '确认'}</button>
                        </div>
                    </div> */}
                    {passwordCorrect !== null && alertIsVisible &&
                        <>
                            <div role="alert" className={`alert alert-error font-bold transition transition-opacity duration-5000 opacity-100`}>
                                <span>{eng ? 'Wrong Password. You are not invited 🙄💅🏻' : '密码错误，你没有被邀请 🙄💅🏻'}</span>
                            </div>
                            <br />
                        </>
                    }
                </>
            }

            <div className={isMobile ? "grid grid-cols-4 gap-2 align-left" : "grid grid-cols-8 gap-2 align-left"}>
                {buttonArr.map((button, index) => (
                    <button className={filter === filterArr[index] ? "btn btn-accent w-full" : "btn btn-accent btn-outline w-full"} onClick={filterHandler(filterArr[index])}>{button}</button>
                ))}
            </div>
            <br />

            {(!locked || matched) &&
                <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
                    {units.map((lesson, id) => (<>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
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

                    {Array(missing).fill(0).map((mis, id) => <>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{" "}</span>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={vocButtonStyle}>{eng ? "Voc" : "单词表"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={spellingButtonStyle}>{eng ? "Spelling" : "拼写练习"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={genderButtonStyle}>{eng ? "Gender" : "阴阳练习"}</button>
                                </Link>
                            </div>
                        </div>
                    </>)}
                </div>
            }

            {(locked && !matched) &&
                <div class={isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}>
                    {units.map((lesson, id) => (<>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{eng ? (!!lesson.engUnit ? lesson.engUnit : lesson.unit) : lesson.unit}</span>
                            </div>
                            <div>
                                <button className={vocButtonStyle}><FaLock /></button>
                            </div>
                            <div>
                                <button className={spellingButtonStyle}><FaLock /></button>
                            </div>
                            <div>
                                <button className={genderButtonStyle}><FaLock /></button>
                            </div>
                        </div>
                    </>))}

                    {Array(missing).fill(0).map((mis, id) => <>
                        <div className={isMobile ? 'flex justify-between gap-2 mb-2 bg-base-100 rounded-lg' : 'flex justify-start gap-2 mb-2 bg-base-100 w-1/1 rounded-lg'}>
                            <div className={titleStyle}>
                                <span className='ml-1 font-bold break-all'>{" "}</span>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={vocButtonStyle}>{eng ? "Voc" : "单词表"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={spellingButtonStyle}>{eng ? "Spelling" : "拼写练习"}</button>
                                </Link>
                            </div>
                            <div className='opacity-0'>
                                <Link >
                                    <button className={genderButtonStyle}>{eng ? "Gender" : "阴阳练习"}</button>
                                </Link>
                            </div>
                        </div>
                    </>)}
                </div>
            }

            <br />

            {
                (lessonsPerPage < targetArr.length && <>
                    <div className={isMobile ? "join grid grid-cols-2 w-1/2" : "join grid grid-cols-2 w-1/3"}>
                        <button className="join-item btn btn-outline btn-accent" onClick={onClickPage(-1)}>{eng ? 'prev' : "前一页"}</button>
                        <button className="join-item btn btn-outline btn-accent" onClick={onClickPage(1)}>{eng ? 'next' : "后一页"}</button>
                    </div>
                </>)
            }

            <div className="divider"></div>
        </>
    )
}