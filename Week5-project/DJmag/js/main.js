
const parse = require('csv-parser');
const fs = require('fs');

// data 객체로 구성된 배열로 parsing
const dj_magArr = [];
let results = {}
fs.createReadStream('../dataset/dj_mag.csv')
    .pipe(parse())
    .on('data', (data) => dj_magArr.push(data))
    .on('end', () => {
        results = makeTop100ofYear(dj_magArr)
    });

const example = [  {
    id: '95',
    Year: '2008',
    Rank: '6',
    DJ: 'Ferry Corsten',
    Change: 'Up 2'
},
    { id: '96', Year: '2009', Rank: '6', DJ: 'Deadmau5', Change: 'Up 5' },
    {
        id: '97',
        Year: '2010',
        Rank: '6',
        DJ: 'Paul van Dyk',
        Change: 'Down 1'
    },
    { id: '98', Year: '2011', Rank: '6', DJ: 'Avicii', Change: 'Up 33' },
    {
        id: '99',
        Year: '2012',
        Rank: '6',
        DJ: 'Hardwell',
        Change: 'Up 18'
    },
    {
        id: '100',
        Year: '2013',
        Rank: '6',
        DJ: 'Dimitri Vegas & Like Mike',
        Change: 'Up 32'
    },
]

function makeTop100ofYear(data) {
    const top100ofYear = new Object();
    data.forEach(function (item) {
        const year = item['Year']
        const dj = item['DJ']
        console.log(year)
        console.log(top100ofYear[year])
        if(!top100ofYear[year]) {
            top100ofYear[year] = [];
        }
        top100ofYear[year].push(dj)
    })
    return top100ofYear;
}
console.log(results)
// data 변환 (년도에 따른 dj 순위로 변환)
//
// function getYearObject() {
//     const listYear = new Object();
//     for(let i = 2004; i < 2022; i++){
//         listYear[i] = [];
//     }
//     return listYear
// }

function addValueToYearObj(array) {
   //if (array[0]
}


// localStorage 에 data 올리기.

class dataManager {
    constructor(storageKey) {
        this.storageKey = storageKey;

    }

    setLocalStorage() {
        localStorage.setItem()
    }
}
