
const parse = require('csv-parser');
const fs = require('fs');

// data 객체로 구성된 배열로 parsing한 dj_magArr를 이용하여 연도별 dj 100 list 객체를 구한다.
const dj_magArr = [];
let yearlyDjList = {};
let djRankList = {};

fs.createReadStream('../dataset/dj_mag.csv')
    .pipe(parse())
    .on('data', (data) => dj_magArr.push(data))
    .on('end', () => {
        yearlyDjList = makeTop100ofYear(dj_magArr)
        djRankList = makeDjRankTrend(dj_magArr)
    });
