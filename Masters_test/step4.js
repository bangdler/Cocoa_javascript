

import * as readline from "readline" ;
import * as fs from "fs" ;

// text file 로부터 문자열을 받아 문자를 숫자로 된 이차원 배열로 변환하고 각 정보를 구해 stageInfo 객체를 만들고 각 stageInfo 로 이루어진 stages 배열을 얻는다.
// stageManager 로부터 요청 받은 data 를 수정, 반환
class DataManager {
    constructor(fileName) {
        this.data = fs.readFileSync(`./${fileName}.txt`, 'utf-8');
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
        this.originalStages = this.makeStagesFromMap();
        this.stages = this.makeStagesFromMap();
        this.saveSlot = {};
    }

    // 문자열 map data 를 받아 각 stage 의 정보(stage no., map 배열, 가로/세로 길이, hole/ball 개수, player 위치) 를 담은 배열을 반환한다.
    makeStagesFromMap() {
        let rows = this.data.split('\n');
        let stages = [];
        let currentMap = [];
        let stageNum = 0;
        let [x, y, hole, ball, player, ballInHole] = [0, 0, 0, 0, [0, 0], 0];
        let turnCount = 0;

        rows.forEach(function(row){
            // row 가 'stage' 문자를 포함하고 있을때 stage No. 를 구한다. stage 가 1보다 큰 경우, 이전 stage 에서 얻은 정보를 stages 배열에 넣는다
            if(row.includes('Stage')) {
                stageNum = Number(row[row.length - 1]);
                if(stageNum > 1) {
                    stages.push(this.makeStageInfo(stageNum-1, currentMap, x, y, hole, ball, player, ballInHole, turnCount));
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
                    else if(row[i] === '0') {
                        ballInHole += 1;
                        hole += 1;
                        ball += 1;
                    }
                }
                if(row[0] !== '=') y += 1;
                currentMap.push(changedRow)
            }
        }, this)
        // 마지막 스테이지 정보를 넣어준다
        stages.push(this.makeStageInfo(stageNum, currentMap, x, y, hole, ball, player, ballInHole, turnCount));
        return stages;
    }

    // rows 에서 얻은 각 정보를 객체로 만든다.
    makeStageInfo(stageNum, currentMap, x, y, hole, ball, player, ballInHole, turnCount) {
        currentMap = this.fillMap(currentMap, x)
        return {
            'stageNum': stageNum,
            'currentMap': currentMap,
            'x': x,
            'y': y,
            'hole': hole,
            'ball': ball,
            'player': player,
            'ballInHole': ballInHole,
            'turnCount': turnCount
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
}

// playerManager 에서 발생한 이벤트에 따라 필요한 data 수정을 dataManager 에 요청하고 반환값을 다시 전달한다.
class StageManager{
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.stageNum = 1;
        this.stage = this.dataManager.stages[this.stageNum - 1]
        this.originalStage = this.dataManager.originalStages[this.stageNum - 1]
        this.symbol = this.dataManager.symbol;
        this.reverseSymbol = {
            0: '#',
            1: 'O',
            2: 'o',
            3: 'P',
            5: '0',
            6: 'P'
        };
        this.savedTurn = {};
    }

    getStages() {
        return this.dataManager.stages;
    }

    // 특정 stage map 을 반환한다.
    getStageCurrentMap() {
        return this.stage['currentMap'];
    }

    // 숫자로 저장된 currentMap 을 다시 symbol로 바꾸어 반환한다.
    getSymbolMap(currentMap) {
        let symbolMap = "";
        let tempMap = [];
        currentMap.forEach(function(row) {
            if(row[0] === this.symbol['=']) return;
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
        }, this)
        symbolMap = tempMap.join('\n');
        return symbolMap;
    }
    
    getStageTurnCount() {
        return this.stage['turnCount']
    }

    turnCountUp() {
        this.stage['turnCount'] += 1;
    }

    ballInHoleCount(count) {
        this.stage['ballInHole'] += count;
    }

    getStageNumber() {
        return this.stageNum;
    }

    getPlayerLocation() {
        return this.stage['player'];
    }

    setPlayerLocation(nextCoord) {
        this.stage['player'] = nextCoord;
    }

    // 해당 위치에 있는 물체를 구한다.
    getObject(coord) {
        return this.stage['currentMap'][coord[0]][coord[1]];
    }

    // 해당 위치에 물체를 위치시킨다.
    setObject(coord, object) {
        this.stage['currentMap'][coord[0]][coord[1]] = object;
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

    checkStageClear() {
        if(this.stage['hole'] === this.stage['ballInHole']) {
            return true
        }
        return false
    }

    levelUp() {
        // stage 레벨업, 최종 stage 여부 확인
        this.stageNum += 1;
        this.stage = this.dataManager.stages[this.stageNum - 1]
        this.originalStage = this.dataManager.originalStages[this.stageNum - 1]
        this.savedTurn = {};
        if(this.stageNum > this.dataManager.stages.length) return true;
        return false;
    }

    // 현재 stages 배열 (save 를 하면서 뒤 스테이지를 깨고 이전으로 load 할 경우 대비), stage 정보, savedTurn 객체 저장
    // this.stage 도 깊은 복사를 해주어야 save - u 되돌리기 수행 후 다시 save - load 했을 때 반영이 된다.
    saveThisSlot(Num) {
        const saveStages = JSON.stringify(this.dataManager.stages);
        const saveStage = JSON.stringify(this.stage);
        const saveStageNum = this.stageNum;
        const saveSavedTurn = JSON.stringify(this.savedTurn)
        this.dataManager.saveSlot[Num] = [JSON.parse(saveStages), JSON.parse(saveStage), saveStageNum, JSON.parse(saveSavedTurn)]
    }

    loadThisSlot(Num) {
        if (!this.dataManager.saveSlot[Num]) return false;
        const loadStages = JSON.stringify(this.dataManager.saveSlot[Num][0]);
        const loadStage = JSON.stringify(this.dataManager.saveSlot[Num][1])
        const loadStageNum = this.dataManager.saveSlot[Num][2];
        const loadSavedTurn = JSON.stringify(this.dataManager.saveSlot[Num][3]);
        this.dataManager.stages = JSON.parse(loadStages);
        this.stage = JSON.parse(loadStage);
        this.stageNum = loadStageNum;
        this.savedTurn = JSON.parse(loadSavedTurn);
        return true;
    }

    // 현재 turn 을 복사하여 savedTurn 객체에 저장한다. turnKey type은 number.
    saveThisTurn() {
        const turnKey = this.getStageTurnCount();
        const thisStage = JSON.stringify(this.stage);
        this.savedTurn[turnKey] = JSON.parse(thisStage)
    }

    loadPrevTurn(turnKey) {
        const prevTurn = turnKey - 1;
        const thisStage  = JSON.stringify(this.savedTurn[prevTurn])
        this.stage = JSON.parse(thisStage)
    }

    loadNextTurn(turnKey) {
        const nextTurn = turnKey + 1;
        if(!this.savedTurn[nextTurn]) return false;
        const thisStage  = JSON.stringify(this.savedTurn[nextTurn])
        this.stage = JSON.parse(thisStage)
        return true;
    }

}

// 사용자 입력값을 받고 입력에 따라 data 처리 (stageManager 를 통해), 종료, 출력 수행
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
        this.saveLoadKeyword = {
            '1s': [1, "save"],
            '2s': [2, "save"],
            '3s': [3, "save"],
            '4s': [4, "save"],
            '5s': [5, "save"],
            '1l': [1, "load"],
            '2l': [2, "load"],
            '3l': [3, "load"],
            '4l': [4, "load"],
            '5l': [5, "load"]
        }
    }

    startGame() {
        console.log (`Stage : ${this.stageManager.stageNum}`)
        this.printThisMap();

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
            else if(directionCommand === 'r') {
                this.resetStage();
            }
            else if(directionCommand === 'u') {
                this.printPrevTurn();
            }
            else if(directionCommand === 'c') {
                this.printNextTurn();
            }
            else if(this.saveLoadKeyword[directionCommand]) {
                this.saveNloadStage(directionCommand);
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
        for (let i = 0; i < commands.length; i++){
            if (!this.directions[commands[i]] ) {
                console.log('유효하지 않은 입력입니다.\n');
                return false;
            }
        }
        return true;
    }

    // 기존 위치에 command 를 순회하며 신규 위치를 더해준 nextCoord 를 stageManager 에 update 하고 반환값에 따라 출력/종료한다.
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
                this.stageManager.saveThisTurn();
            }else{
                this.alertMessage(command, false);
            }
            this.printThisMap();
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
        console.log("\n빠밤! ");
        console.log(`Turn 수 : ${this.stageManager.getStageTurnCount()}`);
        if(this.stageManager.levelUp()) {
            console.log("Congratulations! All Stage Clear!")
            process.exit();
        }
        else {
            console.log (`Stage : ${this.stageManager.stageNum}`)
            this.printThisMap();
            this.stageManager.saveThisTurn()
        }
    }

    // Stage 초기화를 위해 Original stage 의 data 를 깊은 복사한다.
    resetStage() {
        const resetStage = JSON.stringify(this.stageManager.originalStage)
        this.stageManager.stage = JSON.parse(resetStage)
        console.log (`Stage : ${this.stageManager.stageNum}`)
        this.printThisMap();
    }

    printThisMap() {
        let thisMap = this.stageManager.getStageCurrentMap();
        console.log(this.stageManager.getSymbolMap(thisMap))
    }

    // stages 배열의 각 stage 정보를 출력한다.
    printAllStages() {
        const stagesInfo = this.stageManager.getStages();
        stagesInfo.forEach(function (stage) {
            console.log("Stage ", stage.stageNum, '\n');
            console.log(this.stageManager.getSymbolMap(stage['currentMap']));
            console.log('\n가로크기: ', stage.x);
            console.log('세로크기: ', stage.y);
            console.log('구멍의 수: ', stage.hole);
            console.log('공의 수: ', stage.ball);
            console.log('플레이어 위치 (', stage.player[0], ', ', stage.player[1], ')\n');
        }, this)
    }

    saveNloadStage(command) {
        let saveNum = this.saveLoadKeyword[command][0];
        let saveKey = this.saveLoadKeyword[command][1];
        if(saveKey === 'save') {
            this.stageManager.saveThisSlot(saveNum)
            console.log(`${saveNum}번 슬로 ${saveKey} 합니다.`)
            this.printThisMap();
       }
        else if(saveKey === 'load') {
            if(!this.stageManager.loadThisSlot(saveNum)){
                console.log("저장된 내용이 없습니다.")
            }
            else {
                console.log(`${saveNum}번 슬로 ${saveKey} 합니다.`)
            }
            this.printThisMap();
        }
    }

    printPrevTurn() {
        const thisTurn = this.stageManager.getStageTurnCount();
        if (thisTurn === 0) {
            console.log("초기 화면입니다.")
            return;
        }
        else {
            console.log("이전 turn 으로 돌아갑니다.")
            this.stageManager.loadPrevTurn(thisTurn);
            this.printThisMap();
        }
    }

    printNextTurn() {
        const thisTurn = this.stageManager.getStageTurnCount();
        if (!this.stageManager.loadNextTurn(thisTurn)) {
            console.log("더이상 돌아갈 수 없습니다.")
            return;
        } else {
            console.log("다음 turn 으로 다시 돌아갑니다.")
            this.stageManager.loadNextTurn(thisTurn);
            this.printThisMap();
        }
    }

}

let dataManager = new DataManager('map')
let stageManager = new StageManager(dataManager)
let playerManager = new PlayerManager(stageManager)
playerManager.startGame()
