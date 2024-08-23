import React from 'react';
import { writeFile, utils } from 'xlsx';
import { lessons } from '../../pages/Vocabulaire';

const DownloadExcel = () => {
    // Sample data: an array of objects with French words and their English definitions
    let words = [...lessons];
    let parsedwords = [];

    console.log('debug debug', words)

    for (let unit of words) {
        let unit_name = unit.unit;
        for (let lesson of unit.words.lessons) {
            for (let word of unit.words[lesson]) {
                word["location"] = unit_name + " " + lesson;
                parsedwords.push(word)
            }
        }
    }

    const downloadExcel = () => {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the array of objects to a worksheet
        const worksheet = utils.json_to_sheet(parsedwords);

        // Append the worksheet to the workbook with a name, e.g., 'Words'
        utils.book_append_sheet(workbook, worksheet, "Words");

        // Generate an Excel file and trigger the download using `writeFile`
        writeFile(workbook, 'words.xlsx');
    };

    return (
        <div>
            <div className='text-lg text-bold mb-4'>Words in Excel Form</div>

            <button className='btn btn-outline btn-error text-xs ' onClick={downloadExcel}>Download Excel</button>
        </div>
    );
};

export default DownloadExcel;