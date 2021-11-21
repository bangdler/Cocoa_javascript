
// board 는 5x5 ~ 30x30 2차원 배열로 이중 배열로 나타냄.
// 인형은 1~100의 숫자로 다른 모양을 의미.
// 인형은 위에서부터 뽑히며, 같은 모양의 인형이 2개가 연속으로 있으면 사라지면서 results 에 사라진 갯수가 추가가 된다.
const board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
const moves= [1,5,3,5,1,2,1,4];

let results = 0;
const columns = {};
const drawSequence = [];

// 기계가 뽑을 수 있는 세로로 된 배열로 재구성
// 배열의 각 index 를 key, 각 배열의 같은 index 요소값을 모아 배열로 만들어 value로 하는 객체 만들
function makeColumns(array) {
    for (let i = 0; i < array.length; i++) {
        columns[i+1] = [];
    }
    return;
}

function inputColumns(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j ++) {
            columns[j+1].push(array[i][j])
        }
    }
    return;
}

//moves 의 작동 column 값을 받아 columns value 에서 선택될 인형값을 drawSequence 배열로 만든다. 배열에 추가하기 전 기존 배열의 마지막 값과 비교한다.

function makeDrawSequence(moves) {
    moves.forEach(function(move) {
        let targetColumn = columns[move]
        for (let i = 0; i < targetColumn.length; i++) {
            if (targetColumn[i] !== 0) {
                checkDrawSequence(targetColumn[i])
                targetColumn[i] = 0;
                break;
            }
        }
    })
    return;
}

// drawSequence 배열의 마지막 값과 puppet 이 같으면 마지막 값을 제거하고 results +2 해준다. 같지 않으면 배열에 추가한다.
function checkDrawSequence(puppet) {
    let lastIndex = drawSequence.length - 1;
    if (drawSequence[lastIndex] === puppet) {
        drawSequence.pop();
        results += 2;
        return;
    }
    else {
        drawSequence.push(puppet)
        return;
    }
}

function solution(board, moves) {
    makeColumns(board);
    inputColumns(board);
    makeDrawSequence(moves);
    return results;
}

console.log(solution(board, moves))