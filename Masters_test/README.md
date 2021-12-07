### 0단계 Gist 생성 및 Git clone 하기
    
 - new Gist 생성 및 clone 완료
    
### 1단계: 지도 데이터 출력하기

1. 입력 : stage 정보를 문자열로 받는다.
    - command 를 통해 입력 받도록 구현하는데 어려움이 있어 stage 의 정보를 문자열로 담은 변수를 설정하고 매개변수로 함수에 넣어 처리하도록 구현.
    
    ```javascript
   // 입력값 예시
       const stageData = "Stage 1\n" +
            "#####\n" +
            "#OoP#\n" +
            "#####\n" +
            "=====\n" + ...
   ```

2. 함수 구현
    - 필요 사항 
      
      (1) 입력값을 읽어 2차원 배열로 변환
                     
         | 기호 |       의미       | 저장값 |
         |:----:|:----------------:|:------:|
         | #    | 벽(Wall)         | 0      |
         | O    | 구멍(Hall)       | 1      |
         | o    | 공(Ball)         | 2      |
         | P    | 플레이어(Player) | 3      |
         | =    | 스테이지 구분    | 4      |
      
      (2) Stage 의 필요 정보 반환
      
          가로크기, 세로크기, 구멍의 수, 공의 수, 플레이어 위치(1,1 기준) -> (2단계에서 0,0 기준으로 변경)
        
    - 구현
    
      (1) ```function makeStagesFromMap(data)```
       
       - 개요: 문자열 map data 를 받아 각 stage 의 정보(stage no., map 배열, 가로/세로 크기, hole/ball 개수, player 위치) 를 담은 stages 배열을 반환한다.
       - data 를 개행을 기준으로 구분한 rows 배열로 만든다.
       - forEach 로 배열의 각 문자행(row)을 순회하며 값을 변환한다. 
       - 이 때 symbol 및 reverseSymbol 객체를 만들어 매칭되는 기호와 값을 key, value 로 하여 변환이 쉽도록 한다.
         ```javascript
            const symbol = {
                ' ': -1,
                '#': 0,
                'O': 1,
                'o': 2,
                'P': 3,
                '=': 4 }
         ``` 
       - 배열 순회 시 가로 크기(x)는 각 배열의 길이 최대값, 세로 크기(y)는 구분선(=) 이 아닌 경우에 +1 해준다.
       - stages 배열에 각 stage 정보를 넣기 위해 ```makeStageInfo(stageNum, currentMap, x, y, hole, ball, player)``` 를 활용한다.
       - stages 에 push 는 다음 stage 변환 전과 마지막 stage 변환 후에 한다.
       - 그러므로 배열 순회 전 "Stage" 라는 문자를 가진 row 를 체크하고, stage no. 를 구한다.
       - stage no. > 1 이면 각 값들이 있다는 의미이므로 stages 에 정보를 push 하고, 각 값들을 초기화 해준다.
       - 마지막 stage 정보를 넣기 위해 배열 순회 후 stages 에 정보를 push 한다.  
       
       - 헷갈렸던 부분 
       
         -. 문자에 P 가 있을 경우, 플레이어 위치를 저장하는데, (x, y) 순서가 아닌 (y, x) 순서로 위치를 저장한다. 배열 안에 배열이 있어 순회 순서가 y 부터이기 때문이 아닐까. 출력 예시를 만족하기 위해 기준점은 (1,1) 로 했다.
         
         -. 변환 시 빈공간도 변환('-1')해주어야 정확한 가로 크기를 구할 수 있었다. 짧은 문자열은 변환 후 배열 길이가 작아 row 마다 배열 길이가 달라서 보기에 불편했다. fillMap 함수를 통해 빈 부분에 -1을 채워 길이를 맞췄다.  
    
      (2) ```function makeStageInfo(stageNum, currentMap, x, y, hole, ball, player)```
       
       - rows 에서 얻은 각 정보를 객체로 만든다.
       
       - 이 때, currentMap 은 fillMap 을 통해 길이를 맞춘다.
       
       - (최대 길이 - 현 row 길이) 값만큼 -1 push
       
      (3) ```function printAllStage & printThisMap```
      
       - makeStagesFromMap 함수의 return 인 stages 배열을 받아 기존 입력값의 형태로 바꾸어 출력한다.
       
       - stages 배열 내 각 stage 정보를 담은 객체의 값들을 console.log 한다.
 
       - getSymbolMap 함수 및 reverseSymbol 객체를 통해 key 값에 해당하는 value 로 재변환하여 입력값 형태의 map을 만든다. 
       
       - 출력 시 구분선은 불필요하므로 구분선일 경우는 if 로 filter 한다.
       
       - 이 때 printThisMap 함수를 활용하면 원하는 stage 의 map 정보만 출력한다.
        
3. 실행 결과

   ```javascript
      // 실행 함수
      printAllStages(stageData)
   ```
   ```   
      // 출력 결과
      Stage  1 
      
      #####
      #OoP#
      #####
      
      가로크기:  5
      세로크기:  3
      구멍의 수:  1
      공의 수:  1
      플레이어 위치 ( 2 ,  4 )
      
      Stage  2 
      
        #######  
      ###  O  ###
      #    o    #
      # Oo P oO #
      ###  o  ###
       #   O  #  
       ########  
      
      가로크기:  11
      세로크기:  7
      구멍의 수:  4
      공의 수:  4
      플레이어 위치 ( 4 ,  6 )

   ```  

### 2단계: 플레이어 이동 구현하기
  
1. 입력 명령을 받아 플레이어를 이동한 후 Map 을 출력한다. 

    ``` w: 위쪽  a: 왼쪽   s: 아래쪽  d: 오른쪽  q: 프로그램 종료```
  
2. 1단계에서 구현한 지도 출력하기 함수를 활용한다. 
3. Class 로 구현
    - Stage, Player 이동에 대한 모든 함수를 각각 정의하다보니, Stage 정보 등이 여러 함수에서 지속적으로 사용될 때 계속 변수를 만들어줘야 하는 문제가 있었다.
    
    - Stage 를 다루는 함수들, Player 이동과 입력값을 다루는 함수들로 구분하는 것이 활용성, 가독성에 유리하다고 판단되어 Class 로 변경했다.
    - 2개 Class 로 구성
        - StageManager : stage 정보를 받아 각 stage 의 정보를 담은 stages 배열을 만들고, PlayerManager 의 요청에 따라 필요한 데이터를 반환, 수정, 출력한다.
        
        - PlayerManager : 사용자 입력을 받고, 입력에 따라 StageManager에 데이터를 요청하여 처리한다. 사용자 입력에 대한 검증, 결과 알림도 수행한다.

4. 구현
    - 기존 Player 위치에서 입력값에 따른 위치 변경이 쉽도록 directions 객체를 만들어 활용함.
        ```javascript
        // 방향에 따라 + / - 헷갈리지 않도록 확인.
        this.directions = {
                       'w': [-1, 0],
                       'a': [0, -1],
                       's': [1, 0],
                       'd': [0, 1]
                   };
       ```
    
    - ```startGame(stageNum = 1), getInput()```
        - startGame 실행 시 단계를 설정하여 게임을 시작한다. getInput 실행하여 ```readline.question```을 활용하여 사용자 입력을 받는다.
        - 이 때 입력값에 대해 filtering 한다.
        - q -> 종료, wasd -> movePlayer(입력값 최대 길이는 5), 그 외 -> 유효하지 않은 값
        - filtering 을 위해 입력값은 모두 소문자로 변경한다. 
       
    - ```movePlayer(commands)```
        - 입력받은 commands 를 순회하면서 각 command 에 해당하는 작업을 수행한다.
        
        - StageManager 에서 현재 stage 의 player 위치를 가져와 command 에 따라 위치를 nextXY로 변경한다. 
        - 이 때 배열에서 위치를 변경해주기 때문에 기존 stageInfo 의 player 위치 기준점을 0,0 으로 변경했다. 
        - 변경되는 위치가 비어있는 경우 (' ': -1) 에만 수행하도록 ```stageManager.isEmptyLocation(this.stageNum, nextXY)```를 실행한다.
        - 변경이 가능할 경우 stageManager 에서 ```modifyStageInfo``` 로 관리하는 정보를 변경해준다. 
           ```javascript
              modifyStageInfo(stageNum, currentXY, nextXY) {
                  // player 위치 정보를 업데이트
                  this.stages[stageNum-1].player = nextXY;
          
                  // 지도 업데이트 : player가 원래 있던 자리는 빈 칸이 된다
                  this.stages[stageNum-1].currentMap[currentXY[0]][currentXY[1]] = this.symbol[' '];
                  // 지도 업데이트 : player가 옮겨갈 자리가 빈칸이라고 간주한다
                  this.stages[stageNum-1].currentMap[nextXY[0]][nextXY[1]] = this.symbol['P']; 
              }
           ```
            -> 이 부분을 해주지 않으면 기존 player 가 그대로 map 에 남아있어 출력 시 P 가 2개가 되고 갈 곳이 없어진다. 
        - 다음 순회를 위해 변경된 위치를 현재 위치로 맞춰줘야 한다. 
           ```javascript
              currentXY = nextXY;  
           ```
        - 변경 혹은 변경 실패 후 ```alertMessage``` 실행 및 현재 Map 을 출력해준다.
    
5. 실행 결과
    
    ```javascript
    // 함수 실행
    let stageManager = new StageManager(stageData);
    let playerManager = new PlayerManager(stageManager);
    playerManager.startGame(2)
   ```
   
   ``` 
     #######  
   ###  O  ###
   #    o    #
   # Oo P oO #
   ###  o  ###
    #   O  #  
    ########  
   
   Sokoban> a
   A: 왼쪽으로 이동합니다. 
     #######  
   ###  O  ###
   #    o    #
   # OoP  oO #
   ###  o  ###
    #   O  #  
    ########  
   
   Sokoban> w
   W: 위쪽으로 이동합니다. 
     #######  
   ###  O  ###
   #   Po    #
   # Oo   oO #
   ###  o  ###
    #   O  #  
    ########  
   
   Sokoban> d
   D: (경고!) 해당 명령을 수행할 수 없습니다! 
     #######  
   ###  O  ###
   #   Po    #
   # Oo   oO #
   ###  o  ###
    #   O  #  
    ########  
   
   Sokoban> sd
   S: 아래쪽으로 이동합니다. 
     #######  
   ###  O  ###
   #    o    #
   # OoP  oO #
   ###  o  ###
    #   O  #  
    ########  
   D: 오른쪽으로 이동합니다. 
     #######  
   ###  O  ###
   #    o    #
   # Oo P oO #
   ###  o  ###
    #   O  #  
    ########  
   
   Sokoban> q
   Bye~~
   ``` 

### 3단계: 소코반 완성하기

1. 추가 구현 필요한 기능
    - r 입력 시 stage 초기화
    - 모든 o 를 O 에 이동하면 clear 및 다음 stage => 구현 완료
    - 모든 stage clear 시 축하메세지 => 구현 완료
    - player 이동 조건
       - player 는 o 를 밀어서 이동시킬수 있다. => 구현 완료
       - o 를 O 에 넣으면 0 이 된다. => 구현 완료
       - 플레이어는 O를 통과할 수 있다. => 구현 완료
       - 플레이어는 #을 통과할 수 없다. => 구현 완료
       - 0 상태의 o를 밀어내면 다시 o와 O로 분리된다. => 구현 완료
       - 플레이어가 움직일 때마다 턴수를 카운트한다. => 구현 완료
       - o 가 두 개 연속으로 붙어있는 경우 밀 수 없다. => 구현 완료
       
2. 구현

    (0) 기존 함수 refactoring
      - stageNum 은 stageManager 에서 많이 사용되어 stageManager constructor 로 이동.
      - 조건에 따라 map 이 변경되는 경우의 수가 너무 많아 기존 코드에 손을 대기가 어려웠다.
            
      - 2단계에서는 movePlayer 함수 실행 시 isEmptyLocation 함수로 비어있는 곳을 확인 후, modifyStageInfo 함수로 data 변경을 수행했지만, 이동 위치에 발생할 모든 경우의 수에 따른 data 변경을 구성하자니 movePlayer 함수가 너무 복잡해졌다.
    
      - 하여 stage data 를 관리하는 ```stageManager.modifyStageInfo ```에서 모든 경우의 수 확인과 data 변경을 수행하도록 구성했다.
      - ```movePlayer``` 에서 player 의 위치는 계속 update 가 되므로 for 문 안에 ```let currentCoord = this.stageManager.getPlayerLocation()``` 으로 현재 위치를 선언해줌으로써, ```currentCoord = nextCoord``` 를 해줄 필요가 없어졌다. 
      
    (1) player 이동 조건
        
      - 우선 2단계에 완성한 player 이동 코드에 추가적인 조건을 구현해보았다.
      
      - movePlayer 는 이름만 Move 고 사실 이동 시 command 전달, message 와 map 출력만 수행..
      
      - 경우의 수를 나누면서 symbol 을 추가하여 각 경우에 따른 코드 구현을 쉽도록 하였다. 
        ```javascript
        //hole 위에 ball 이 있는 경우 0 을 추가, 여기에 착안하여 hole 위에 player 가 있는 경우를 B 로 추가.
        //출력 시에는 B 는 6으로 변환되었다가 P 로 출력
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
        ```
      - 경우의 수
        - 초기 함수 세팅
           ```javascript
           // 현재 위치, 다음 위치, command 에 따른 ball 의 다음 위치 설정. 볼/구멍 여부 설정
           modifyStageInfo(currentCoord, nextCoord, direction) {
                  let ballExist = false;
                  let holeExist = false;
                  let nextBallCoord = [-1, -1];
                  nextBallCoord[0] = nextCoord[0] + direction[0];
                  nextBallCoord[1] = nextCoord[1] + direction[1]; }
          ``` 
        - 우선 player 가 가는 위치를 확인하고 갈 수 없는 경우를 거른다. 
            1. Player 가 갈 수 있는 위치인가(벽만 아니면 감) / 아니면 false
            2. Player 가 가는 곳 o : ball exist true
               1. 공이 갈 수 있는 위치인가 (빈 곳과 O 이면 감) / 아니면 false
            3. Player 가 가는 곳 O : hole exist true 
        - Player 가 갈 수 있는 게 확인되었으므로 stages.player 위치를 update 한다. ```setPlayerLocation```활용
        - 현재 위치에 따라 변경되는 현재 위치 경우의 수
            1. 현재 위치가 P : 이동 시 빈칸
            2. 현재 위치가 B : 이동 시 O
        - 현재 위치 변경 완료, 가는 곳의 위치는 hole, ball 존재 여부에 따라 경우의 수를 나누어 변경한다.
            1. 가는 위치가 빈칸 : 이동 시 P
            2. 가는 위치가 O : 이동 시 B
            3. 가는 위치가 o : 이동 시 P, ball 이동
                1. ball 다음 위치가 빈칸 : ball 이동 시 o
                2. ball 다음 위치가 O : ball 이동 시 0 (ballInHole)
            4. 가는 위치가 0(ballInHole) : 이동 시 B, ball 이동
                1. ball 다음 위치가 빈칸 : ball 이동 시 o
                2. ball 다음 위치가 O : ball 이동 시 0 (ballInHole)
                
      - 경우의 수 빠진 것을 발견하고 추가해가다보니 함수가 너무 길어진 것 같다...
      - 이 때 반복되는 물체의 위치 확인, 위치 변경 코드를 함수로 만들어 간결화게 만들었다. 
        ```javascript 
        // 해당 위치에 있는 물체를 구한다.
        getObject(coord) {
            return this.stages[this.stageNum-1].currentMap[coord[0]][coord[1]];
        }
        // 해당 위치에 물체를 위치시킨다.
        setObject(coord, object) {
            this.stages[this.stageNum-1].currentMap[coord[0]][coord[1]] = object;
        }
        ```
    (2) Stage Clear 
      
      - stage clear 조건은 ```ballInHole 갯수 = Hole 갯수``` 이므로 ballInHole 을 stageInfo 에 추가했다.
      - map 초기에 ballInHole 이 있는 경우도 있으니 최초 map data 변환 시(```makeStagesFromMap```) ballInHole count 도 해준다.
      
      - 이후 player 이동 시 0 이 생길 때 +1, 0 에서 이동될 때 -1 을 한다.
      - 한 턴 이동 시마다 clear 조건을 확인한다. ```checkStageClear``` 활용.
      - clear 시 ```moveNextStage```를 통해 다음 stage 로 이동하며, 이 때 ```levelUp```으로 stageNum +1, turn수 초기화를 수행한다.
      - leveUp 이후 stageNum 가 stages 배열 길이보다 크다면 종료, 아니면 다음 stage map 을 출력한다. 
      - checkStageClear 와 leveUp 함수는 stage data 관련되어 stageManager 에 포함하였고, moveNextStage 는 종료, 출력 등을 수행하므로 PlayerManager에 넣었다.
      
      
      