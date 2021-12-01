import csvParser from "csv-parser";
import fs from 'fs';

//const parse = require('csv-parser');
//const fs = require('fs');

// data 객체로 구성된 배열로 parsing한 dj_magArr를 이용하여 연도별 dj 100 list 객체를 구한다.
const dj_magArr = [];
let yearlyDjList = {};
let djRankList = {};

fs.createReadStream('../dataset/dj_mag.csv')
    .on('error', () => {
        // handle error
    })
    .pipe(csvParser())
    .on('data', (data) =>
        dj_magArr.push(data)
        )
    .on('end', () => {
        fs.writeFile ("../dataset/dj_mag.js", JSON.stringify(dj_magArr), function(err) {
                if (err) throw err;
                console.log('complete');
            }
        );
    });

//console.log(dj_magArr)

function initialParser() {
    const parse = require('csv-parser');
    const fs = require('fs');
    const dj_magArr = [];
    fs.createReadStream('../dataset/dj_mag.csv')
        .pipe(parse())
        .on('data', (data) => dj_magArr.push(data))
        .on('end', () => {
            fs.writeFile ("../dataset/dj_mag.js", JSON.stringify(dj_magArr), function(err) {
                    if (err) throw err;
                    console.log('complete');
                }
            );
        });
}

//const djDataSet = initialParser()
//console.log(initialParser())
