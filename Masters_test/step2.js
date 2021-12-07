import * as readline from "readline";

class StageManager{
    constructor(data) {
        this.symbol = {
            ' ': -1,
            '#': 0,
            'O': 1,
            'o': 2,
            'P': 3,
            '=': 4,
            '0': 5
        };

        this.reverseSymbol = {
            0: '#',
            1: 'O',
            2: 'o',
            3: 'P',
            5: '0'
        };

        this.stages = this.makeStagesFromMap(data)
    }

    // 문자열 map data 를 받아 각 stage 의 정보(stage no., map 배열, 가로/세로 길이, hole/ball 개수, player 위치) 를 담은 배열을 반환한다.
    makeStagesFromMap(data) {
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
                    stages.push(this.makeStageInfo(stageNum-1, currentMap, x, y, hole, ball, player));
                }
                // 다음 스테이지 정보를 넣기 위해 값을 초기화해준다
                currentMap = [];
                [x, y, hole, ball, player] = [0, 0, 0, 0, [0, 0]];
            }
            else {
                // row 내의 symbol 을 알맞은 숫자로 변환한다. symbol 에 따라 각 값들을 update 한다. player 위치는 0,0 기준으로 y , x 순으로 넣어준다.
                let changedRow = [];
                x = Math.max(x, row.length);
                for(let i = 0; i < row.length; i++){
                    changedRow.push(this.symbol[row[i]])
                    if(row[i] === 'O') hole += 1;
                    else if(row[i] === 'o') ball += 1;
                    else if(row[i] === 'P') player = [y, i];
                }
                if(row[0] !== '=') y += 1;
                currentMap.push(changedRow)
            }
        }, this)
        // 마지막 스테이지 정보를 넣어준다
        stages.push(this.makeStageInfo(stageNum, currentMap, x, y, hole, ball, player));
        return stages;
    }

    // rows 에서 얻은 각 정보를 객체로 만든다.
    makeStageInfo(stageNum, currentMap, x, y, hole, ball, player) {
        currentMap = this.fillMap(currentMap, x)
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
    fillMap(currentMap, x) {
        currentMap.forEach(function(row){
            let diff = x - row.length;
            for(let i = 0; i < diff; i++){
                row.push(-1)
            }
        })
        return currentMap
    }

    // stages 배열의 각 stage 정보를 출력한다.
    printAllStages() {
        this.stages.forEach(function(stage){
            console.log("Stage ", stage.stageNum, '\n');
            console.log(this.getSymbolMap(stage.currentMap));
            console.log('\n가로크기: ', stage.x);
            console.log('세로크기: ', stage.y);
            console.log('구멍의 수: ', stage.hole);
            console.log('공의 수: ', stage.ball);
            console.log('플레이어 위치 (', stage.player[0], ', ', stage.player[1], ')\n');
        }, this)
    }

    // 특정 stage map 을 출력한다.
    printThisMap(stageNum) {
        let thisMap = this.stages[stageNum-1].currentMap
        console.log(this.getSymbolMap(thisMap))
    }

    // 숫자로 저장된 currentMap 을 다시 symbol로 바꾸어 반환한다.
    getSymbolMap(currentMap) {
        let symbolMap = "";
        let tempMap = [];
        currentMap.forEach(function(row){
            if(row[0] !== 4) {
                let tempRow = [];
                for (let i = 0; i < row.length; i++) {
                    if (this.reverseSymbol[row[i]]) {
                        tempRow.push(this.reverseSymbol[row[i]]);
                    }
                    else{
                        tempRow.push(' ');
                    }
                }
                tempMap.push(tempRow.join(''));
            }
        }, this)
        symbolMap = tempMap.join('\n');
        return symbolMap;
    }

    getPlayerLocation(stageNum) {
        return this.stages[stageNum-1]['player'];
    }

    setPlayerLocation(stageNum, nextXY) {
        this.stages[stageNum-1]['player'] = nextXY;
    }

    isEmptyLocation(stageNum, currentXY) {
        // Todo : 만약, 공/구멍에 다 갈 수 있다면 이 함수는 바뀌어야함
        if(this.stages[stageNum-1].currentMap[currentXY[0]][currentXY[1]] === -1)
            return true
        else
            return false
    }

    modifyStageInfo(stageNum, currentXY, nextXY) {
        //this.setPlayerLocation(this.stageNum, nextXY);
        this.stages[stageNum-1]['player'] = nextXY;
        // 지도 업데이트 : player가 원래 있던 자리는 빈 칸이 된다
        this.stages[stageNum-1].currentMap[currentXY[0]][currentXY[1]] = this.symbol[' '];
        // 지도 업데이트 : player가 옮겨갈 자리가 빈칸이라고 간주한다
        this.stages[stageNum-1].currentMap[nextXY[0]][nextXY[1]] = this.symbol['P'];

        // Todo : 공이 있는 경우에 대한 처리를  해야함
    }
}

class PlayerManager {
    constructor(stageManager) {
        this.stageManager = stageManager
        this.directions = {
            'w': [-1, 0],
            'a': [0, -1],
            's': [1, 0],
            'd': [0, 1]
        };
        this.directionKeyword = {
            'W': "위쪽",
            'A': "왼쪽",
            'S': "아래쪽",
            'D': "오른쪽"
        };

        this.stageNum = 1;
    }

    startGame(stageNum = 1) {
        this.stageNum = stageNum;
        this.stageManager.printThisMap(stageNum);

        //사용자 인풋받기
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.getInput(rl)
    }

    getInput(rl) {
        rl.question('Sokoban> ', (directionCommand) => {
            directionCommand = directionCommand.toLowerCase();
            if (directionCommand === 'q') {
                console.log('Bye~~');
                process.exit();
            }
            else if(this.checkInput(directionCommand)){
                this.movePlayer(directionCommand);
            }
            this.getInput(rl);
        });
    }

    checkInput(commands) {
        if (commands.length > 5) {
            console.log('입력 한도 초과입니다.')
            return false;
        }
        else {
            for (let i = 0; i < commands.length; i++){
                if (!this.directions[commands[i]]) {
                    console.log('유효하지 않은 입력입니다.');
                    return false;
                }
            }
            return true;
        }
    }

    movePlayer(commands) {
        let currentXY = this.stageManager.getPlayerLocation(this.stageNum)
        let nextXY = [-1, -1];
        console.log(currentXY)
        console.log(nextXY)
        for(let i = 0; i < commands.length; i++){
            let command = commands[i];
            nextXY[0] = currentXY[0] + this.directions[command][0];
            nextXY[1] = currentXY[1] + this.directions[command][1];
            if(this.stageManager.isEmptyLocation(this.stageNum, nextXY)){
                this.alertMessage(command, true);
                this.stageManager.modifyStageInfo(this.stageNum, currentXY, nextXY);
                currentXY[0] = nextXY[0];
                currentXY[1] = nextXY[1];
            }else{
                this.alertMessage(command, false);
            }
            this.stageManager.printThisMap(this.stageNum)
            console.log(currentXY)
            console.log(nextXY)
        }
    }

    alertMessage(command, success) {
        let commandUpper = command.toUpperCase();
        if(!success){
            console.log(`${commandUpper}: (경고!) 해당 명령을 수행할 수 없습니다! `);
        }else{
            let direction = this.directionKeyword[commandUpper];
            console.log(`${commandUpper}: ${direction}으로 이동합니다. `);
        }
    }
}

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

let stageManager = new StageManager(stageData);
let playerManager = new PlayerManager(stageManager);
playerManager.startGame(2)