import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { CosmopoliteC1, alterEgoB2, taxiA1A2, taxiB1 } from '../data/array/VocArray/taxi';
import { vocabulaireProgressifA1, vocabulaireProgressifA2, vocabulaireProgressifB1 } from '../data/array/VocArray/vocabulaireProgressif';
import { communicationA1, communicationA2, communicationB2 } from '../data/array/VocArray/communication';
import { EditoB1 } from '../data/array/VocArray/edito';
import { ThemeContext } from '../context/context';
import { InnerFrench } from '../data/array/VocArray/innerfrench';
import { tcf } from '../data/array/VocArray/tcf'
import { ImagesAll } from '../components/vocabulaire/Image'
import { Section } from '../components/vocabulaire/VocPageSection';
import { Fiction } from '../data/array/VocArray/fiction';

export const lessons = [
    ...taxiA1A2,
    ...taxiB1,
    ...alterEgoB2,
    ...communicationA1,
    ...communicationA2,
    ...vocabulaireProgressifA1,
    ...vocabulaireProgressifA2,
    ...vocabulaireProgressifB1,
    ...EditoB1,
    ...InnerFrench,
    ...tcf, 
    ...CosmopoliteC1, 
    ...communicationB2, 
    ...Fiction
]

export let protectedLessonsIndex = new Set();
for (let index = 0; index < lessons.length; index++) {
    if (['TCF'].includes(lessons[index].tag)) {
        protectedLessonsIndex.add(index);
    }
}

export const protectedLessonsMax = taxiA1A2.length +
    taxiB1.length + communicationA1.length + communicationA2.length +
    vocabulaireProgressifA1.length + vocabulaireProgressifA2.length +
    EditoB1.length + InnerFrench.length + tcf.length

const FilterArr = ["TaxiFilter", "CommunicationFilter", "VocabulaireFilter", "AutreFilter", "TCFFilter"];

function getFilterSession(id) {
    // [taxi, voc, comm, autre]
    const arrDefault = ["B2", "B1", "A2", "InnerFrench", "TCF CE"]
    let target = FilterArr[id];
    let session = window.localStorage.getItem(target);
    return !!session ? session : arrDefault[id];
}

const isIpad = () => {
    return /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

export function VocabulairePage() {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;

    // categorize arrays based on types
    let TaxiArr = [], CommunicaionProgressivefArr = [], VocabulaireProgressiffArr = [], otherArr = [], tcfArr = [], fictionArr = [];
    for (let i = 0; i < lessons.length; i++) {
        let lesson = lessons[i];
        lesson["id"] = i;
        if (lesson.tag === "Taxi") {
            TaxiArr.push(lesson);
        }
        else if (lesson.tag === "Communication Progressive") {
            CommunicaionProgressivefArr.push(lesson);
        }
        else if (lesson.tag === "Vocabulaire Progressif") {
            VocabulaireProgressiffArr.push(lesson);
        }
        else if (lesson.tag === "Other") {
            otherArr.push(lesson);
        }
        else if (lesson.tag === "TCF") {
            tcfArr.push(lesson);
        }
        else if (lesson.tag === "Fiction") {
            fictionArr.push(lesson);
        }
    }

    // for ipad users
    const [isIpadUser, setIsIpadUser] = useState(false);
    useEffect(() => {
        setIsIpadUser(isIpad());
    }, []);

    // for filtering based on books
    let [taxiFilter, setTaxiFilter] = useState(getFilterSession(0));
    const onClickTaxiFilter = (filter) => (e) => {
        setTaxiFilter(filter);
        window.localStorage.setItem(FilterArr[0], filter);
    }

    let [vocabulaireFilter, setVocabulaireFilter] = useState(getFilterSession(1));
    const onClickVocabulaireFilter = (filter) => (e) => {
        setVocabulaireFilter(filter);
        window.localStorage.setItem(FilterArr[1], filter);
    }

    let [communicationFilter, setCommunicationFilter] = useState(getFilterSession(2));
    const onClickCommunicationFilter = (filter) => (e) => {
        setCommunicationFilter(filter);
        window.localStorage.setItem(FilterArr[2], filter);
    }

    let [autreFilter, setAutreFilter] = useState(getFilterSession(3));
    const onClickAutreFilter = (filter) => (e) => {
        setAutreFilter(filter);
        window.localStorage.setItem(FilterArr[3], filter);
    }

    let [tcfFilter, setTCFFilter] = useState(getFilterSession(4));
    const onClickTCFFilter = (filter) => (e) => {
        setTCFFilter(filter);
        window.localStorage.setItem(FilterArr[4], filter);
    }

    let [fictionFilter, setFictionFilter] = useState("Fiction");
    const onClickFictionFilter = (filter) => (e) => {
        setFictionFilter(filter);
        // window.localStorage.setItem(FilterArr[4], filter);
    }

    return (<>
        <ImagesAll isIpadUser={isIpadUser} />

        <Section
            title={'Taxi, Alter Ego, & Cosmopolite'}
            vocArr={TaxiArr}
            filter={taxiFilter}
            filterArr={["C1", "B2", "B1", "A2", "A1"]}
            filterHandler={onClickTaxiFilter}
            buttonArr={["C1", "B2", "B1", "A2", "A1"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-24 text-sm' : 'flex items-center w-36'}
            buttonStyle={isMobile ? (eng ? "text-xs p-4" : "text-xs p-3") : "text-base py-1"}
            locked={false}
        />

        <Section
            title={'Communication Progressive'}
            vocArr={CommunicaionProgressivefArr}
            filter={communicationFilter}
            filterArr={["B2", "A2", "A1"]}
            filterHandler={onClickCommunicationFilter}
            buttonArr={["B2-C1", "A2-B1", "A1-A2"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-24 text-sm' : (eng ? 'flex items-center w-48' : 'flex items-center w-32')}
            buttonStyle={isMobile ? (eng ? "text-xs p-4" : "text-xs p-3") : "text-base py-0"}
            locked={false}
        />


        <Section
            title={'Vocabulaire Progressif'}
            vocArr={VocabulaireProgressiffArr}
            filter={vocabulaireFilter}
            filterArr={["B1", "A2", "A1"]}
            filterHandler={onClickVocabulaireFilter}
            buttonArr={["B2-C1", "A2-B1", "A1-A2"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-32 text-sm' : (eng ? 'flex items-center w-48' : 'flex items-center w-32')}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-2") : "text-base py-0"}
            locked={false}
        />

        <Section
            title={'Fiction'}
            vocArr={fictionArr}
            filter={fictionFilter}
            filterArr={["Fiction"]}
            filterHandler={onClickFictionFilter}
            buttonArr={["Fiction"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-36 text-sm' : 'flex items-center w-48'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-1.5") : "text-base py-0"}
            locked={false}
        />


        {/* <Section
            title={"TCF"}
            vocArr={tcfArr}
            filter={tcfFilter}
            filterArr={["TCF Voc", "TCF CE"]}
            filterHandler={onClickTCFFilter}
            buttonArr={["Thème", "CE"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-28 text-sm' : 'flex items-center w-32'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-2") : "text-base py-0"}
            locked={true}
        /> */}


        <Section
            title={"Les Autres"}
            vocArr={otherArr}
            filter={autreFilter}
            filterArr={["Edito B1", "InnerFrench"]}
            filterHandler={onClickAutreFilter}
            buttonArr={["Édito B1", "Inner French"]}
            reverse={false}
            titleStyle={isMobile ? 'flex items-center w-36 text-sm' : 'flex items-center w-48'}
            buttonStyle={isMobile ? (eng ? "text-xs" : "text-xs p-1.5") : "text-base py-0"}
            locked={false}
        />


        <br />
        <Link to='/search'>
            <button className="btn btn-outline btn-error">{eng ? "Dev Tool" : "开发者工具，慎点"}</button>
        </Link>
        <Link to='/highlight'>
            <button className="btn btn-outline btn-error ml-4">{eng ? "Highlight" : "高亮"}</button>
        </Link>

    </>)
} 