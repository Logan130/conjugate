import { TCFReadingGratuit01 } from "../../tcf/reading/gratuit01";
import { TCFReadingGratuit02 } from "../../tcf/reading/gratuit02";
import { TCFReadingTest01 } from "../../tcf/reading/test01";
import { wordsTCFWork } from "../../tcf/theme/work";

export const tcf = [
    {
        unit: "Travail",
        words: wordsTCFWork,
        tag: "TCF",
        book: "TCF Voc",
    },

    {
        unit: "Gratuit 01",
        words: TCFReadingGratuit01,
        tag: "TCF",
        book: "TCF CE",
    },
    {
        unit: "Gratuit 02",
        words: TCFReadingGratuit02,
        tag: "TCF",
        book: "TCF CE",
    },
    {
        unit: "Test 01",
        words: TCFReadingTest01,
        tag: "TCF",
        book: "TCF CE",
    },
]

export const tcfListening = [

]