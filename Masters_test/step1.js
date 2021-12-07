

// 입력값
const stageData = "Stage 1\n" +
    "#####\n" +
    "#OoP#\n" +
    "#####\n" +
    "=====\n" +
    "Stage 2\n" +
    "  #######\n" +
    "###  O  ###\n" +
    "#    o    #\n" +
    "# Oo P oO #\n" +
    "###  o  ###\n" +
    " #   O  # \n" +
    " ########"

const symbol = {
    ' ': -1,
    '#': 0,
    'O': 1,
    'o': 2,
    'P': 3,
    '=': 4
};

const reverseSymbol = {
    0: '#',
    1: 'O',
    2: 'o',
    3: 'P'
}

// 문자열 map data 를 받아 각 stage 의 정보(stage no., map 배열, 가로/세로 길이, hole/ball 개수, player 위치) 를 담은 배열을 반환한다.
function makeStagesFromMap(data) {
    let rows = data.split('\n');
    let stages = [];
    let currentMap = [];
    let stageNum = 0;
    let [x, y, hole, ball, player] = [0, 0, 0, 0, [0, 0]];

    rows.forEach(function(row){
        // row 가 'stage' 문자를 포함하고 있을때 stage No. 를 구한다. stage 가 1보다 큰 경우, 이전 stage 에서 얻은 정보를 stages 배열에 넣는다
        if(row.includes('Stage')) {
            stageNum = Number(row[row.length - 1]);
            if(stageNum > 1) {
                stages.push(makeStageInfo(stageNum-1, currentMap, x, y, hole, ball, player));
            }
            // 다음 스테이지 정보를 넣기 위해 값을 초기화해준다
            currentMap = [];
            [x, y, hole, ball, player] = [0, 0, 0, 0, [0, 0]];
        }
        else {
            // row 내의 symbol 을 알맞은 숫자로 변환한다. symbol 에 따라 각 값들을 update 한다. player 위치는 1,1 기준으로 y , x 순으로 넣어준다.
            let changedRow = [];
            x = Math.max(x, row.length);
            for(let i = 0; i < row.length; i++){
                changedRow.push(symbol[row[i]])
                if(row[i] === 'O') hole += 1;
                else if(row[i] === 'o') ball += 1;
                else if(row[i] === 'P') player = [y+1, i+1];
            }
            if(row[0] !== '=') y += 1;
            currentMap.push(changedRow)
        }
    })
    // 마지막 스테이지 정보를 넣어준다
    stages.push(makeStageInfo(stageNum, currentMap, x, y, hole, ball, player));
    return stages;
}

// rows 에서 얻은 각 정보를 객체로 만든다.
function makeStageInfo(stageNum, currentMap, x, y, hole, ball, player) {
    currentMap = fillMap(currentMap, x)
    return {
        'stageNum': stageNum,
        'currentMap': currentMap,
        'x': x,
        'y': y,
        'hole': hole,
        'ball': ball,
        'player': player
    }
}

// 최대 가로 길이에 맞춰 빈 공간을 -1로 채워준다
function fillMap(currentMap, x) {
    currentMap.forEach(function(row){
        let diff = x - row.length;
        for(let i = 0; i < diff; i++){
            row.push(-1)
        }
    })
    return currentMap
}

// stages 배열의 각 stage 정보를 출력한다.
function printAllStages(stageData) {
    const stages = makeStagesFromMap(stageData);
    stages.forEach(function(stage){
        console.log("Stage ", stage.stageNum, '\n');
        console.log(getSymbolMap(stage.currentMap));
        console.log('\n가로크기: ', stage.x);
        console.log('세로크기: ', stage.y);
        console.log('구멍의 수: ', stage.hole);
        console.log('공의 수: ', stage.ball);
        console.log('플레이어 위치 (', stage.player[0], ', ', stage.player[1], ')\n');
    })
}

// 특정 stage map 을 출력한다.
function printThisMap(stageData, n) {
    const stages = makeStagesFromMap(stageData);
    const thisMap = stages[n-1].currentMap;
    console.log(getSymbolMap(thisMap))
}


// 숫자로 저장된 currentMap 을 다시 symbol로 바꾸어 반한다.
function getSymbolMap(currentMap) {
    let symbolMap = "";
    let tempMap = [];
    currentMap.forEach(function(row){
        if(row[0] !== 4) {
            let tempRow = [];
            for (let i = 0; i < row.length; i++) {
                if (reverseSymbol[row[i]]) {
                    tempRow.push(reverseSymbol[row[i]]);
                }
                else{
                    tempRow.push(' ');
                }
            }
            tempMap.push(tempRow.join(''));
        }
    })
    symbolMap = tempMap.join('\n');
    return symbolMap;
}


printAllStages(stageData)

