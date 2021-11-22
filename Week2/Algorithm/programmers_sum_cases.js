numbers1 = [2,1,3,4,1];
//results1 = [2,3,4,5,6,7]
numbers2 = [5,0,2,7];
//results2 = [2,5,7,9,12]

//배열에서 두 수의 합의 모든 경우의 수를 배열로 만들어 오름차순으로 반환.

//배열에서 두 수의 합 모든 경우의 수 구하기
function sumCases(array) {
    const sumObject = {}
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            let sumCase =  array[i] + array[j];
            checkSumObj(sumCase, sumObject)
        }
    }
    let sumArray = Object.keys(sumObject);
    let sumNumArr = getNumberArray(sumArray)
    sortArray(sumNumArr)
    return sumNumArr;
}

//객체 값 확인 후 없을 경우 넣기
function checkSumObj(element, object) {
    if (!object[element]) {
        object[element] = "exist"
        return;
    }
}

function sortArray(array) {
    array.sort(function (a,b) {
        return a - b;
    })
}

function getNumberArray(array) {
    let numberArr = array.map(Number)
    return numberArr;
}

//제출용
function solution(numbers) {
    return sumCases(numbers);
}

console.log(sumCases(numbers2))
