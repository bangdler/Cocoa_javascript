
// 로또의 최고순위와 최저순위를 반환하는 함수.
// 일부 숫자가 지워져 0 으로 기록된 lottos 를 입력 받고, 0에 들어가는 숫자 경우의 수를 따져 win_nums 를 기준으로 최고 등수와 최저 등수를 구한다.

// 제한사항
// lottos는 길이 6인 정수 배열입니다.
//     lottos의 모든 원소는 0 이상 45 이하인 정수입니다.
// 0은 알아볼 수 없는 숫자를 의미합니다.
// 0을 제외한 다른 숫자들은 lottos에 2개 이상 담겨있지 않습니다.
//     lottos의 원소들은 정렬되어 있지 않을 수도 있습니다.
//     win_nums은 길이 6인 정수 배열입니다.
//     win_nums의 모든 원소는 1 이상 45 이하인 정수입니다.
//     win_nums에는 같은 숫자가 2개 이상 담겨있지 않습니다.
//     win_nums의 원소들은 정렬되어 있지 않을 수도 있습니다.

function solution(lottos, win_nums) {
    let answer = [0, 0];
    let rank = {
        6: 1,
        5: 2,
        4: 3,
        3: 4,
        2: 5,
        1: 6,
        0: 6
    }
    let correctNum = 0;
    let zeroNum = 0;
    // 주어진 번호로 최저등수 구하기
    lottos.forEach(function(num) {
        if(win_nums.includes(num)) {
            correctNum += 1;
        }
        if(num === 0) {
            zeroNum += 1;
        }
    })
    answer[1] = rank[correctNum];
    // 최고 등수 구하기. 0 갯수를 맞은 갯수로 바꾼다.
    correctNum += zeroNum;
    answer[0] = rank[correctNum];
    return answer;
}

let lotto = [44, 1, 0, 0, 31, 25];
let win = [31, 10, 45, 1, 6, 19];

console.log(solution(lotto, win))