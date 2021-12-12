import csvParser from "csv-parser";
import fs from 'fs';

//const parse = require('csv-parser');
//const fs = require('fs');

// 빈 배열에 csv 를 읽어 dj_magArr 빈 배열에 한 행씩 추가하고 완성된 배열을 json 형태의 data 로 변경, 별도 js 파일로 저장한다.
const dj_magArr = [];

// createReadStream buffer 형식으로 64kb 씩 읽는다.
fs.createReadStream('../dataset/dj_mag.csv')
    .on('error', () => {
        // handle error
    })
    // csvParser 로 전달한다. 문자열로 바꾼 후 객체 배열로 parsing 한다.
    .pipe(csvParser())
    // 전달한 data 를 한줄씩 배열에 넣는다.
    .on('data', (data) =>
        dj_magArr.push(data)
        )
    // data 를 모두 읽으면 새로운 파일을 만든다. (문자열로 만든다.)
    .on('end', () => {
        fs.writeFile ("../dataset/dj_mag.js", JSON.stringify(dj_magArr), function(err) {
                if (err) throw err;
                console.log('complete');
            }
        );
    });
