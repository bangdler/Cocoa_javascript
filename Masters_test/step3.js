 import * as readline from "readline";

class StageManager{
    constructor(data) {
        this.symbol = {
            ' ': -1,    // 빈칸
            '#': 0,     // 벽
            'O': 1,     // hole
            'o': 2,     // ball
            'P': 3,     // player
            '=': 4,     // stage map end
            '0': 5,     // ball in hole
            'B': 6      // player in hole
        };

        this.reverseSymbol = {
            0: '#',
            1: 'O',
            2: 'o',
            3: 'P',
            5: '0',
            6: 'P'
        };
        this.originalStages = this.makeStagesFromMap(data);
        this.stages = this.makeStagesFromMap(data);
        this.stageNum = 1;
        this.turnCount = 0;
    }

    // 문자열 map data 를 받아 각 stage 의 정보(stage no., map 배열, 가로/세로 길이, hole/ball 개수, player 위치) 를 담은 배열을 반환한다.
    makeStagesFromMap(data) {
        let rows = data.split('\n');
        let stages = [];
        let currentMap = [];
        let stageNum = 0;
        let [x, y, hole, ball, player, ballInHole] = [0, 0, 0, 0, [0, 0], 0];

        rows.forEach(function(row){
            // row 가 'stage' 문자를 포함하고 있을때 stage No. 를 구한다. stage 가 1보다 큰 경우, 이전 stage 에서 얻은 정보를 stages 배열에 넣는다
            if(row.includes('Stage')) {
                stageNum = Number(row[row.length - 1]);
                if(stageNum > 1) {
                    stages.push(this.makeStageInfo(stageNum-1, currentMap, x, y, hole, ball, player, ballInHole));
                }
                // 다음 스테이지 정보를 넣기 위해 값을 초기화해준다
                currentMap = [];
                [x, y, hole, ball, player, ballInHole] = [0, 0, 0, 0, [0, 0], 0];
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
                    else if(row[i] === '0') ballInHole += 1;
                }
                if(row[0] !== '=') y += 1;
                currentMap.push(changedRow)
            }
        }, this)
        // 마지막 스테이지 정보를 넣어준다
        stages.push(this.makeStageInfo(stageNum, currentMap, x, y, hole, ball, player, ballInHole));
        return stages;
    }

    // rows 에서 얻은 각 정보를 객체로 만든다.
    makeStageInfo(stageNum, currentMap, x, y, hole, ball, player, ballInHole) {
        currentMap = this.fillMap(currentMap, x)
        return {
            'stageNum': stageNum,
            'currentMap': currentMap,
            'x': x,
            'y': y,
            'hole': hole,
            'ball': ball,
            'player': player,
            'ballInHole': ballInHole
        }
    }

    // 최대 가로 길이에 맞춰 빈 공간을 -1로 채워준다
    fillMap(currentMap, x) {
        currentMap.forEach(function(row) {
            let diff = x - row.length;
            for(let i = 0; i < diff; i++) {
                row.push(-1)
            }
        })
        return currentMap
    }

    // stages 배열의 각 stage 정보를 출력한다.
    printAllStages() {
        this.stages.forEach(function(stage) {
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
    printThisMap() {
        let thisMap = this.stages[this.stageNum-1].currentMap
        console.log(this.getSymbolMap(thisMap))
    }

    // 숫자로 저장된 currentMap 을 다시 symbol로 바꾸어 반환한다.
    getSymbolMap(currentMap) {
        let symbolMap = "";
        let tempMap = [];
        currentMap.forEach(function(row) {
            if(row[0] !== this.symbol['=']) {
                let tempRow = [];
                for (let i = 0; i < row.length; i++) {
                    let symbol = this.reverseSymbol[row[i]]
                    if (symbol) {
                        tempRow.push(symbol);
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

    turnCountUp() {
        this.turnCount++;
    }

    ballInHoleCount(count) {
        this.stages[this.stageNum-1].ballInHole += count;
    }

    getStageNumber() {
        return this.stageNum;
    }

    getPlayerLocation() {
        return this.stages[this.stageNum-1]['player'];
    }

    setPlayerLocation(nextCoord) {
        this.stages[this.stageNum-1]['player'] = nextCoord;
    }

    // 해당 위치에 있는 물체를 구한다.
    getObject(coord) {
        return this.stages[this.stageNum-1].currentMap[coord[0]][coord[1]];
    }

    // 해당 위치에 물체를 위치시킨다.
    setObject(coord, object) {
        this.stages[this.stageNum-1].currentMap[coord[0]][coord[1]] = object;
    }

    // player 가 갈 수 있는지 확인
    canPlayerGo(nextCoord) {
        if(this.getObject(nextCoord) === this.symbol['#']) {
            return false
        }
        return true
    }

    // ball 이 갈 수 있는지 확인
    canBallGo(nextCoord) {
        let nextObject = this.getObject(nextCoord);
        if( nextObject === this.symbol[' '] || nextObject === this.symbol['O']) {
            return true
        }
        return false
    }

    checkStageClear() {
        if(this.stages[this.stageNum-1].hole === this.stages[this.stageNum-1].ballInHole) {
            return true
        }
        return false
    }

    // 각 경우의 수에 따라 player 와 ball 을 움직인다. 경우의 수는 player, ball, hole 의 위치에 따라 좌우된다.

    modifyStageInfo(currentCoord, nextCoord, direction) {
        let ballExist = false;
        let holeExist = false;
        let nextBallCoord = [-1, -1];
        nextBallCoord[0] = nextCoord[0] + direction[0];
        nextBallCoord[1] = nextCoord[1] + direction[1];

        // 1. player가 움직일 수 있는지 체크
        if(!this.canPlayerGo(nextCoord))
            return false;

        // 2. player가 갈 위치에 공이 있는지 체크, 공이 있을 경우 갈 수 있는지 체크
        if(this.getObject(nextCoord) === this.symbol['o'] || this.getObject(nextCoord) === this.symbol['0']) {
            ballExist = true;
            if (!this.canBallGo(nextBallCoord))
                return false;
        }

        // 3. player가 갈 위치에 구멍이 있는지 체크
        if(this.getObject(nextCoord) === this.symbol['O'] || this.getObject(nextCoord) === this.symbol['0']) {
            holeExist = true;
        }
        // player가 갈 수 있는게 확인되었음.
        // 4. 원래 있던 위치 symbol 변경 및 지도 변경
        this.setPlayerLocation(nextCoord);

        // 4-1. player가 빈 칸에 서있었다면,
        if(this.getObject(currentCoord) === this.symbol['P']) {
            this.setObject(currentCoord, this.symbol[' ']);
        }
        // 4-2. player가 hole 위에 서있었다면,
        else if(this.getObject(currentCoord) === this.symbol['B']) {
            this.setObject(currentCoord, this.symbol['O']);
        }

        // 5. player가 옮겨갈 위치의 symbol 변경
        // 5-1. 옮겨갈 위치가 빈 칸이라면
        if (!holeExist && !ballExist) {
            this.setObject(nextCoord, this.symbol['P']);
        }
        // 5-2. 옮겨갈 위치에 hole이 있다면
        else if(holeExist && !ballExist) {
            this.setObject(nextCoord, this.symbol['B']);
        }
        // 5-3. 옮겨갈 위치에 ball이 있는데 hole은 없다면
        else if(!holeExist && ballExist) {
            this.setObject(nextCoord, this.symbol['P']);
            // ball을 옮겨준다
            if(this.getObject(nextBallCoord) === this.symbol[' ']) {
                this.setObject(nextBallCoord, this.symbol['o']);
            }
            else if(this.getObject(nextBallCoord) === this.symbol['O']) {
                this.setObject(nextBallCoord, this.symbol['0']);
                this.ballInHoleCount(1);
            }
        }
        // 5-4. 옮겨갈 위치에 ball도 있고 hole도 있다면
        else if(holeExist && ballExist) {
            this.setObject(nextCoord, this.symbol['B']);
            this.ballInHoleCount(-1);
            // ball을 옮겨준다
            if(this.getObject(nextBallCoord) === this.symbol[' ']) {
                this.setObject(nextBallCoord, this.symbol['o']);
            }
            else if(this.getObject(nextBallCoord) === this.symbol['O']) {
                this.setObject(nextBallCoord, this.symbol['0']);
                this.ballInHoleCount(1);
            }
        }
        return true
    }

    levelUp() {
        // stage 레벨업하고 turn 수 초기화
        this.stageNum += 1;
        this.turnCount = 0;
        if(this.stageNum > this.stages.length) return true;
        return false;
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
    }

    startGame() {
        console.log (`Stage : ${this.stageManager.stageNum}`)
        this.stageManager.printThisMap();

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
            else if(this.checkInput(directionCommand)) {
                this.movePlayer(directionCommand);
            }
            this.getInput(rl);
        });
    }

    checkInput(commands) {
        if (commands.length > 5) {
            console.log('입력 한도 초과입니다.\n')
            return false;
        }
        else {
           for (let i = 0; i < commands.length; i++){
                if (!this.directions[commands[i]]) {
                    console.log('유효하지 않은 입력입니다.\n');
                    return false;
                }
            }
           return true;
        }
    }

    // 기존 위치에 command 를 순회하며 신규 위치를 더해준 nextCoord 를 stageManager 에 update 하여 출력한다.
    movePlayer(commands) {
        for(let i = 0; i < commands.length; i++) {
            let command = commands[i];
            let direction = this.directions[command];
            let nextCoord = [-1, -1];
            let currentCoord = this.stageManager.getPlayerLocation()
            nextCoord[0] = currentCoord[0] + this.directions[command][0];
            nextCoord[1] = currentCoord[1] + this.directions[command][1];

            if(this.stageManager.modifyStageInfo(currentCoord, nextCoord, direction)) {
                this.alertMessage(command, true);
                this.stageManager.turnCountUp();
            }else{
                this.alertMessage(command, false);
            }
            this.stageManager.printThisMap();
            if(this.stageManager.checkStageClear()) {
                this.moveNextStage()
            }
        }
    }

    alertMessage(command, success) {
        let commandUpper = command.toUpperCase();
        if(!success){
            console.log(`${commandUpper}: (경고!) 해당 명령을 수행할 수 없습니다!\n`);
        }else{
            let direction = this.directionKeyword[commandUpper];
            console.log(`${commandUpper}: ${direction}으로 이동합니다.\n`);
        }
    }

    moveNextStage() {
        console.log("빠밤! ");
        console.log(`Turn 수 : ${this.stageManager.turnCount}`);
        if(this.stageManager.levelUp()) {
            console.log("Congratulations! All Stage Clear!")
            process.exit();
        }
        else {
            console.log (`Stage : ${this.stageManager.stageNum}`)
            this.stageManager.printThisMap();
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
playerManager.startGame()