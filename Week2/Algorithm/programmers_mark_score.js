
const answer = [1, 1, 1, 1, 1, 1, 1];
const answer2 = [1,3,2,4,2];


// 정답을 받아 test case object 와 비교하여 채점하고 가장 높은 점수를 받은 test key 의 index 배열을 반환.
function runMark(answerArray) {
    const testCases = {
        test1: [1, 2, 3, 4, 5],
        test2: [2, 1, 2, 3, 2, 4, 2, 5],
        test3: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    }
    let scoredArray = markAnswerEachCases(answerArray, testCases);
    let maxScoreCases = getMaxScoreIndex(scoredArray);
    return maxScoreCases;
}

// test case 로 구성된 object 를 key 순서대로 순회하여 채점, 각 점수로 구성된 scores 배열 반환.
function markAnswerEachCases(answer, testObject) {
    const testKey = Object.keys(testObject)
    let scores = [];
    for (let i = 0; i < testKey.length; i++) {
        let testArray = testObject[testKey[i]];
        scores.push(markTest(answer, testArray))
    }
    return scores;
}

// 정답과 test 를 비교하여 점수를 반환한다.
function markTest(answer, testArr) {
    let repeatNumEach = testArr.length
    let n = answer.length
    let score = 0;
    for (let j = 0; j < n; j++) {
        let remainder = (j % repeatNumEach)
        if (answer[j] !== testArr[remainder]) continue;
        score += 1;
    }
    return score;
}

// test 채점 결과 중에서 최고점을 받은 모든 test 의 index 를 오름차순 배열로 반환.
    // indexOf 는 배열에 해당 요소가 없는 경우 -1 을 반환한다.
function getMaxScoreIndex(scores) {
    const maxScore = Math.max(...scores);
    let maxIndexArr = [];
    let maxIndex = scores.indexOf(maxScore);
    while(maxIndex !== -1) {
        maxIndexArr.push(maxIndex + 1);
        maxIndex = scores.indexOf(maxScore, maxIndex + 1)
    }
    return maxIndexArr
}


console.log(runMark(answer))
console.log(runMark(answer2))