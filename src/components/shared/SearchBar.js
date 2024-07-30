import React, { useState } from "react";
import { lessons } from "../../pages/Vocabulaire";
import { alterEgoB2, taxiA1A2, taxiB1 } from "../../data/array/VocArray/taxi";
import { communicationA1, communicationA2 } from "../../data/array/VocArray/communication";
import { vocabulaireProgressifA1, vocabulaireProgressifA2, vocabulaireProgressifB1 } from "../../data/array/VocArray/vocabulaireProgressif";
import { EditoB1 } from "../../data/array/VocArray/edito";
import { InnerFrench } from "../../data/array/VocArray/innerfrench";



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

let les = [
    ...taxiA1A2,
    ...taxiB1,
    ...alterEgoB2,
    ...communicationA1,
    ...communicationA2,
    ...vocabulaireProgressifA1,
    ...vocabulaireProgressifA2,
    ...vocabulaireProgressifB1,
    ...EditoB1,
    ...InnerFrench
]

function Statistics(units, tags, book) {
    let words = [];
    for (let unit of units.filter(unit => tags.includes(unit.tag))) {
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
    return {
        all: words.length, 
        nonLoc: nonLoc.length, 
        loc: loc.length, 
        nonLocSet: nonLocSet.size, 
        locSet: locSet.size
    }
}

function StatisticsTable() {
    let TaxiResult = Statistics(lessons, ['Taxi'], '');
    let CommResult = Statistics(lessons, ['Communication Progressive'], '');
    let VocabResult = Statistics(lessons, ['Vocabulaire Progressif', 'Other'], '');

    let AllResult = Statistics(lessons, ['Vocabulaire Progressif', 'Other', 'Communication Progressive', 'Taxi'], '');

    console.log(TaxiResult, 'debug')

    return (<>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        {/* <th className="w-8"></th> */}
                        <th className="w-96">书籍</th>
                        {/* <th>词汇+结构量(含重复)</th> */}
                        <th>词汇量(非重复)</th>
                        <th>结构量(非重复)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        {/* <th>1</th> */}
                        <td>Taxi 四本书</td>
                        {/* <td>{TaxiResult.all}</td> */}
                        <td>{TaxiResult.nonLocSet}</td>
                        <td>{TaxiResult.locSet}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        {/* <th>2</th> */}
                        <td>渐进交际初级/中级</td>
                        {/* <td>{CommResult.all}</td> */}
                        <td>{CommResult.nonLocSet}</td>
                        <td>{CommResult.locSet}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        {/* <th>3</th> */}
                        <td>渐进词汇初级/中级</td>
                        {/* <td>{VocabResult.all}</td> */}
                        <td>{VocabResult.nonLocSet}</td>
                        <td>{VocabResult.locSet}</td>
                    </tr>

                    <tr>
                        {/* <th>4</th> */}
                        <td>所有Taxi + 渐进交际中级 + 渐进词汇中级</td>
                        {/* <td>{VocabResult.all}</td> */}
                        <td>{AllResult.nonLocSet}</td>
                        <td>{AllResult.locSet}</td>
                    </tr>
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
    let numberWords = 0, numberLoc = 0;
    // console.log(Object.entries(wordCount))
    numberWords = Object.entries(wordCount).filter(word => word[1].pos !== "loc.").length;
    numberLoc = Object.entries(wordCount).filter(word => word[1].pos === "loc.").length;


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
        setResults(allWords.filter((word) =>
            word.french.indexOf(searchBarValue) !== -1 ||
            word.english.indexOf(searchBarValue) !== -1 ||
            word.chinese.indexOf(searchBarValue) !== -1
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

    </>)
}
