import React, { useState, useEffect } from "react";
import { lessons } from "../../pages/Vocabulaire";
// import { alterEgoB2, taxiA1A2, taxiB1 } from "../../data/array/VocArray/taxi";
// import { communicationA1, communicationA2 } from "../../data/array/VocArray/communication";
// import { vocabulaireProgressifA1, vocabulaireProgressifA2, vocabulaireProgressifB1 } from "../../data/array/VocArray/vocabulaireProgressif";
// import { EditoB1 } from "../../data/array/VocArray/edito";
// import { InnerFrench } from "../../data/array/VocArray/innerfrench";
import DownloadExcel from "../vocabulaire/Excel";



const PaginatedTable = ({ wordCountArr }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(1);
    const rowsPerPage = 15;
    const totalPages = Math.ceil(wordCountArr.length / rowsPerPage);

    const currentRows = wordCountArr.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const handleInputChange = (e) => {
        setInputPage(e.target.value)
    }

    const onGoTo = (e) => {
        setCurrentPage(inputPage)
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        const maxPageButtons = 5; // Number of page buttons to display
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (startPage > 1) {
            pageButtons.push(
                <button key={1} onClick={() => handlePageChange(1)} className="join-item btn">
                    1
                </button>
            );
            if (startPage > 2) {
                pageButtons.push(<button key="start-ellipsis" className="join-item btn btn-disabled">...</button>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={currentPage === i}
                    className="join-item btn"
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(<button key="start-ellipsis" className="join-item btn btn-disabled">...</button>);
            }
            pageButtons.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="join-item btn">
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>单词</th>
                        <th>出现次数</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((res, index) => (
                        <tr key={index}>
                            <th>{(currentPage - 1) * rowsPerPage + index + 1}</th>
                            {/* <td>{res[0]}</td>
                            <td>{res[1]}</td> */}
                            <td>{res[0]}</td>
                            <td>{res[1].count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination join">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="join-item btn"
                >
                    Previous
                </button >
                {renderPageButtons()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="join-item btn"
                >
                    Next
                </button>
            </div>

            <label className="input-group input-group-vertical ml-4">
                <button className="mr-2 btn btn-primary" onClick={onGoTo}>Go to</button>
                <input type="text" placeholder="1" className="input input-bordered" onChange={handleInputChange} value={inputPage} />
            </label>
        </div>
    );
};

// let les1 = [
//     ...taxiA1A2,
//     ...communicationA1,
//     ...vocabulaireProgressifA1,
// ]

// let les2 = [
//     ...taxiB1,
//     ...alterEgoB2,
//     ...communicationA2,
//     ...vocabulaireProgressifA2,
//     ...vocabulaireProgressifB1,
//     ...EditoB1,
//     ...InnerFrench
// ]

function Statistics(units, tags, books) {
    let words = [];
    for (let unit of units.filter(unit => tags.includes(unit.tag) && (books.length === 0 || books.includes(unit.book)))) {
        for (let lessonName of unit.words.lessons) {
            words = [...words, ...unit.words[lessonName]]
        }
    }
    let nonLoc = words.filter(word => word.pos !== 'loc.');
    let loc = words.filter(word => word.pos === 'loc.');
    let nonLocSet = new Set();
    for (let w of nonLoc) {
        nonLocSet.add(w.french)
    }
    let locSet = new Set();
    for (let w of loc) {
        locSet.add(w.french)
    }

    // calculate similarity between french and english
    let similarCount = 0;
    if (false) {
        for (let word of nonLoc) {
            let french = word.french, english = word.english;
            if (english.length > 2 && english[0] === 't' && english[1] === 'o') {
                english = english.substring(2);
            }

            let match = english.match(/^[^,(]+/);
            english = match ? match[0].trim() : english;
    
            let defaultDict = new Proxy({}, {
                get: (target, name) => name in target ? target[name] : 0
            })
            for (let char of french) {
                if (char !== '(' || char !== ')')
                    defaultDict[char] += 1;
            }
            for (let char of english) {
                if (char !== '(' || char !== ')')
                    defaultDict[char] -= 1;
            }
            let sum = Object.values(defaultDict).reduce((acc, value) => acc + Math.abs(value), 0);
            let perc = sum / french.length;
            //console.log(perc, english, french);
            if (perc <= 0.8 && french.length > 6) {
                similarCount += 1;
            }
        }
    }
    

    return {
        all: words.length,
        nonLoc: nonLoc.length,
        loc: loc.length,
        nonLocSet: nonLocSet.size,
        locSet: locSet.size,
        similarity: similarCount / nonLoc.filter(word => {
            return word.french.length > 5
        }).length, 
        totalRepeated: words.length
    }
}

function StatisticsTable() {
    let isMobile = window.innerWidth < 800;

    let StatsRows = [
        {
            book: "Taxi四本书",
            results: Statistics(lessons, ['Taxi'], ['A1', 'A2', 'B1']),
        },
        {
            book: "渐进交际初级",
            results: Statistics(lessons, ['Communication Progressive'], ['A1']),
        },
        {
            book: "渐进交际中级",
            results: Statistics(lessons, ['Communication Progressive'], ['A2']),
        },
        {
            book: "渐进词汇初级",
            results: Statistics(lessons, ['Vocabulaire Progressif'], ['A1']),
        },
        {
            book: "渐进词汇中级",
            results: Statistics(lessons, ['Vocabulaire Progressif'], ['A2']),
        },
        {
            book: "词汇渐进高级",
            results: Statistics(lessons, ['Vocabulaire Progressif'], ['B1']),
        },
        {
            book: "Ego B2",
            results: Statistics(lessons, ['Taxi'], ['B2']),
        },
        {
            book: "A1-B2课堂累计(以上所有课本总和)",
            results: Statistics(lessons, ['Taxi', 'Vocabulaire Progressif', 'Communication Progressive'], ['A1', 'A2', 'B1', 'B2']),
        },
        // {
        //     book: "TCF Reading",
        //     results: Statistics(lessons, ['TCF'], ['TCF CE']),
        // },
        {
            book: "所有积累",
            results: Statistics(lessons, ['Vocabulaire Progressif', 'Other', 'Communication Progressive', 'Taxi', 'TCF'], ['A1', 'A2', 'B1', 'B2', 'TCF CE', 'Edito B1', 'InnerFrench', 'C1']),
        },
    ];

    return (<>
        <div className="overflow-x-auto">
            <h1>非重复词汇量统计</h1> <br />
            <table className={`table ${isMobile ? 'w-1/1' : 'w-1/2'}`}>
                <thead>
                    <tr>
                        <th className={isMobile ? "w-20" : "w-48"}>书籍 {isMobile && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}</th>
                        <th className={isMobile ? "w-3" : ""}>{isMobile ? "词汇" : "词汇量"}</th>
                        <th>{isMobile ? "结构" : "结构量"}</th>
                        <th>非重复总量</th>
                        <th>包含重复总量</th>
                        <th>{isMobile ? "相似度" : "英法相似度"}</th>
                    </tr>
                </thead>

                <tbody>
                    {StatsRows.map((row, id) =>
                        <tr>
                            <td>{row.book}</td>
                            <td>{row.results.nonLocSet}</td>
                            <td>{row.results.locSet}</td>
                            <td>{row.results.nonLocSet + row.results.locSet}</td>
                            <td>{row.results.totalRepeated}</td>
                            <td className="break-all">{(row.results.similarity * 100).toFixed(isMobile ? 1 : 2)}%</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    </>)
}

export function SearchBar() {
    let allWords = [];
    for (let unit of lessons) {
        let words = unit.words;
        for (let lesson of words.lessons) {
            let copyWords = [...words[lesson]]
            for (let word of copyWords) {
                word["location"] = `${unit.unit} ${lesson}`
            }
            allWords = [...allWords, ...copyWords]
        }
    }

    const countNonRepeatingWords = arr => {
        // const wordCount = arr.reduce((count, { french, pos }) => (count[french] = (count[french] || 0) + 1, count), {});
        const wordCount = arr.reduce((count, { french, pos }) => {
            if (!(french in count)) {
                count[french] = {
                    "count": 0,
                    "pos": pos
                }
            }
            // count[french] = (count[french] || 0) + 1;
            count[french]["count"] += 1

            return count;
        }, {});
        return wordCount;
    };
    let wordCount = countNonRepeatingWords([...allWords]);
    // console.log(wordCount);

    const sortedWordFrequencies = arr => {
        return Object.entries(arr).sort((a, b) => b[1].count - a[1].count);
    };

    let wordCountArr = sortedWordFrequencies(wordCount);

    let [results, setResults] = useState([]);
    let [searchBarValue, setSearchBarValue] = useState("")

    const onClickSearch = (e) => {
        if (searchBarValue === "") {
            setResults([]);
            return;
        }
        setResults(allWords.filter((word) => {
            try {
                return word.french.indexOf(searchBarValue) !== -1 ||
                    word.english.indexOf(searchBarValue) !== -1 ||
                    word.chinese.indexOf(searchBarValue) !== -1
            }
            catch (e) {
                console.log('error', e, word)
                return false;
            }
        }

        ))
    }

    const onSearchBarTextChange = (e) => {
        setSearchBarValue(e.target.value);
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickSearch();
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top-left corner
    }, []);

    return (<>

        <div className="form-control m-2">
            <div className="input-group m-2">
                <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered m-2"
                    id="SearchField"
                    value={searchBarValue}
                    onChange={onSearchBarTextChange}
                    onKeyDown={onKeyPress}
                />
                <button className="btn" onClick={onClickSearch}>Search</button>
            </div>

            {/* <div className="text-yellow-500">Taxi A1-B1四本书 + Communication初级/中级 + 词汇渐进初级/中级</div>

            <div>总词汇量: {`${allWords.filter(word => word.pos !== 'loc.').length} 单词 + ${allWords.filter(word => word.pos === 'loc.').length} 结构 = ${allWords.length}`}</div>
            <div>非重复词汇量：{Object.keys(wordCount).length}</div>
            <div>非重复单词词汇量：{numberWords}</div>
            <div>非重复结构量：{numberLoc}</div> */}
        </div>

        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>单词</th>
                        <th>位置</th>
                        <th>释义</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {results.map((res, id) => <>
                        <tr>
                            <th>{id + 1}</th>
                            <td>{res.french}</td>
                            <td>{res.location}</td>
                            <td>{res.pos} {res.english} {res.chinese}</td>
                        </tr>
                    </>)}

                </tbody>
            </table>
        </div>

        <br></br>
        <div className="divider">分割线</div>
        <br></br>

        <StatisticsTable />

        <div className="divider">分割线</div>

        <h1>高频词统计表</h1>
        <PaginatedTable wordCountArr={wordCountArr} />

        <br /><br />
        <DownloadExcel />
        <br /><br />


        <h1>Clear Session</h1><br />
        <button className="btn btn-error btn-outline" onClick={() => {window.localStorage.clear();}}>Clear</button>
    </>)
}
