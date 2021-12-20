
// 진행률과 진행속도가 주어졌을 때 개발이 시작된 기능의 순서대로 배포하기 (뒤의 기능이 먼저 개발되면 앞 기능 배포시 함께 배포)

function solution(progresses, speeds) {
    let answer = [];
    let requiredDays = [];
    let featureNum;
    let releaseKey = 0;
    let releaseCheck = 0;
    let releaseObj = {};
    // 진행률과 진행속도로부터 각 기능이 100% 가 되기 위해 필요한 일수를 배열로 구한다.
    for(let i = 0; i < progresses.length; i++) {
        let day = Math.ceil((100 - progresses[i]) / speeds[i]);
        requiredDays.push(day)
    }
    // releaseCheck 는 처음 0 이고 개발소요일로 변경되며, 다음 개발소요일과 비교를 통해 배포 시기(key)에 배포될 기능의 수를 객체에 넣는다.
    // releaseCheck 와 필요 일수 차이가 음수이면 새로 배포가 필요하므로 key 를 새로 만들고 releaseCheck 를 update 한다.
    // releaseCheck 가 0 이상이면 전 기능 개발소요일보다 필요 일수가 작은 것을 의미하므로 현재 배포의 기능 수만 추가한다.
    for(let i = 0; i < requiredDays.length; i++) {
        let diff = releaseCheck - requiredDays[i];
        if (diff < 0) {
            releaseKey += 1;
            featureNum = 1;
            releaseObj[releaseKey] = featureNum;
            releaseCheck = requiredDays[i];
        }
        else{
            featureNum += 1;
            releaseObj[releaseKey] = featureNum;
        }
    }
    // 객체 값으로 배열을 만든다.
    for(let key in releaseObj) {
        answer.push(releaseObj[key])
    }
    return answer;
}

let progress = [90, 90, 99, 99, 80, 99];
let speed =	[1, 1, 1, 1, 1, 1];

console.log(solution(progress, speed))