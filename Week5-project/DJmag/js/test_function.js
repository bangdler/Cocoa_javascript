//dj_magArr 예시
const example = [  {
    id: '95',
    Year: '2008',
    Rank: '6',
    DJ: 'Ferry Corsten',
    Change: 'Up 2'
},
    { id: '96', Year: '2009', Rank: '6', DJ: 'Deadmau5', Change: 'Up 5' },
    { id: '98', Year: '2011', Rank: '7', DJ: 'bangtae', Change: 'Up 33' },
    { id: '98', Year: '2009', Rank: '7', DJ: 'ozumi', Change: 'Up 33' },
    { id: '98', Year: '2011', Rank: '10', DJ: 'Avicii', Change: 'Up 33' },
    { id: '98', Year: '2016', Rank: '12', DJ: 'Avicii', Change: 'Up 33' },
    { id: '98', Year: '2016', Rank: '15', DJ: 'ferry corst', Change: 'Up 33' }
]


// parsing 하여 객체 배열로 된 data를 받아 연간 top 100 객체, dj 당 순위 객체로 변환.
function getRequiredData(data) {
    const top100ofYear = new Object();
    const djRankTrend = new Object();
    data.forEach(function (item) {
        const year = item['Year']
        const dj = item['DJ']
        const rank = item['Rank']
        makeTop100(top100ofYear, year, dj)
        makeDjRank(djRankTrend, year, dj, rank)
    })
    return [top100ofYear, djRankTrend];
}
// data에서 year 를 key 로 같은 년도의 dj 들을 순서대로 배열에 넣어 top 100을 value로 하는 객체 생성.
    // (data 는 객체 순서가 순위 순서인 배열로 구성되어 있음.)
function makeTop100(object, year, dj) {
    if(!object[year]) {
        object[year] = [];
    }
    object[year].push(dj)
    return;
}
// dj 를 key, 순위배열을 value로 하는 객체 만들기.
// 2004~2021 17개의 0을 가진 빈 배열에 dj가 있을 경우 rank 로 변경.
function makeDjRank(object, year, dj, rank) {
    const yearIndex = Number(year) - 2004
    if (!object[dj]) {
        object[dj] = [];
        for (let i = 0; i < 17; i++){
            object[dj].push(0);
        }
    }
    object[dj][yearIndex] = Number(rank)
    return;
}

//console.log(getRequiredData(example)[0])
//console.log(getRequiredData(example)[1])


// dj 명의 key 배열을 구하고 공백을 제거하여 매개변수 dj 명의 정규식 값과 비교하여 동일 값의 index를 반환.
function getMatchedDj(djName) {
    const djKey = Object.keys(getRequiredData(example)[1])
    const djKeyNoSpace = djKey.map((dj) => dj.replace(/ /gi, ""))
    const djNameReg = changeNameRegExp(djName)
    let matchedDjKey = checkKeyWithName(djKeyNoSpace, djNameReg, djKey);
    if(!matchedDjKey) {
        alert('없는 dj 입니다.')
        console.log('없는 dj 입니다.')
        return;
    }
    return matchedDjKey;
}

function changeNameRegExp(djName) {
    let nameReg = djName.replace(/ /gi, "")
    nameReg = RegExp(nameReg, 'gi')
    return nameReg;
}

function checkKeyWithName(keyArray, name, originKey){
    let checkResults = [];
    keyArray.forEach(function(dj, index) {
        const matchResult = dj.match(name)
        if(matchResult) {
            checkResults.push(originKey[index])
        }
    })
    return checkResults;
}

console.log(getMatchedDj('dfdft'))