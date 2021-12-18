
// 배열의 각 숫자를 어떤 손으로 누르는지 반환하는 함수.

// 맨 처음 왼손 엄지손가락은 * 키패드에 오른손 엄지손가락은 # 키패드 위치에서 시작하며, 엄지손가락을 사용하는 규칙은 다음과 같습니다.
//엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.
//     왼쪽 열의 3개의 숫자 1, 4, 7을 입력할 때는 왼손 엄지손가락을 사용합니다.
//     오른쪽 열의 3개의 숫자 3, 6, 9를 입력할 때는 오른손 엄지손가락을 사용합니다.
//     가운데 열의 4개의 숫자 2, 5, 8, 0을 입력할 때는 두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락을 사용합니다.
// 4-1. 만약 두 엄지손가락의 거리가 같다면, 오른손잡이는 오른손 엄지손가락, 왼손잡이는 왼손 엄지손가락을 사용합니다.

function solution(numbers, hand) {
    let answer = [];
    let keyDistance = {
        1: [0, 3],
        2: [1, 3],
        3: [2, 3],
        4: [0, 2],
        5: [1, 2],
        6: [2, 2],
        7: [0, 1],
        8: [1, 1],
        9: [2, 1],
        0: [1, 0]
    }
    let left = [0, 0];
    let right = [2, 0];
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        if(num === 1 || num === 4 || num === 7) {
            answer.push('L');
            left = keyDistance[num];
        }
        else if(num === 3 || num === 6 || num === 9) {
            answer.push('R');
            right = keyDistance[num];
        }
        // 2580 인 경우 왼손, 오른손 현재 위치와의 거리를 비교하여 구한다.
        else {
            let leftDiff = Math.abs(keyDistance[num][0] - left[0]) + Math.abs(keyDistance[num][1] - left[1])
            let rightDiff = Math.abs(keyDistance[num][0] - right[0]) + Math.abs(keyDistance[num][1] - right[1])
            if(leftDiff < rightDiff) {
                answer.push('L');
                left = keyDistance[num];
            }
            else if(rightDiff < leftDiff) {
                answer.push('R');
                right = keyDistance[num];

            }
            else if(rightDiff === leftDiff && hand === 'right') {
                answer.push('R')
                right = keyDistance[num];
            }
            else {
                answer.push('L')
                left = keyDistance[num];
            }
        }
    }
    answer = answer.join('')
    return answer;
}

let numbers = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5];
let hand = "right";

console.log(solution(numbers, hand))