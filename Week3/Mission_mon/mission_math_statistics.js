import {zIndex} from './Z_index.js'

// 학생들의 수학 점수 분석한다.

let math_data = '89.23\n' +
    '82.03\n' +
    '71.56\n' +
    '78.82\n' +
    '85.05\n' +
    '84.44\n' +
    '67.53\n' +
    '71.7\n' +
    '77.97\n' +
    '73.77\n' +
    '84.25\n' +
    '67.01\n' +
    '73.78\n' +
    '64.19\n' +
    '89.89\n' +
    '90.32\n' +
    '73.21\n' +
    '75.35\n' +
    '83.22\n' +
    '74.01'


// 평균 구하기 : 1. 입력값을 배열로 바꾼다. 2. 배열에서 평균을 구한다.

// 개행을 구분하여 문자열을 배열(type : Num)로 바꾼다.
function makeArray(data) {
    let dataArr = data.split('\n')
    dataArr = dataArr.map((score) => Number(score))
    return dataArr
}


// reduce 를 사용하여 배열 평균 구하기
function getMean(array) {
    let sum = array.reduce(function(acc, curr) {
        return acc + curr;
    })
    let mean = (sum / array.length).toFixed(2);
    return mean;
}

// 편차 구하기
function getDeviation(array) {
    let mean = getMean(array)
    array = array.map((score) => (score - mean).toFixed(2));
    return array;
}

console.log(getDeviation(makeArray(math_data)))

// 분산 구하기
function getVariance(array) {
    let deviSquare = getDeviation(array).map((score) => Math.pow(score, 2));
    let sumDeviSquare =  deviSquare.reduce(function(acc, curr) {
        return acc + curr;
    })
    let variance = (sumDeviSquare / deviSquare.length).toFixed(2);
    return variance;
}

console.log(getVariance(makeArray(math_data)))

// 표준편차 구하기
function getStdDevi(array) {
    let variance = getVariance(array);
    let standardDevi = Math.sqrt(variance).toFixed(2);
    return standardDevi;
}

console.log(getStdDevi(makeArray(math_data)))

// Z 구하기
function getZ(array, data) {
    let mean = getMean(array);
    let stdDevi = getStdDevi(array);
    let Z = ((data - mean) / stdDevi).toFixed(2)
    return Z;
}

console.log(getZ(makeArray(math_data), 70))

// Z 를 이용하여 표준정규분포표에서 누적분포 함수값 구하기 : getZ 에서 구한 값을 정수+소수첫째자리 / 소수둘째자리 로 구분하여 zIndex 배열에서 해당 값을 찾는다.

function getZtableValue(array, data) {
    let zValue = getZ(array, data);
    let xIndex;
    let yIndex;
    let zTableValue;
    if (zValue >= 0) {
        xIndex = Number(String(zValue).slice(0, 3));
        yIndex = Number(String(zValue).slice(3));
        zTableValue = zIndex[xIndex][yIndex];
    }
    else {
        zValue = Math.abs(zValue)
        xIndex = Number(String(zValue).slice(0, 3));
        yIndex = Number(String(zValue).slice(3));
        zTableValue = (1 - zIndex[xIndex][yIndex]).toFixed(4);
    }
    return zTableValue;
}

// 정규분포 data 에서 num 1 ~ num2 사이 값을 갖는 비율을 구한다.
function getRangeRate(data, num1, num2) {
    let dataArr = makeArray(data);
    let zTable1 = getZtableValue(dataArr, num1);
    let zTable2 = getZtableValue(dataArr, num2);
    let rangeRate = ((zTable2 - zTable1) * 100).toFixed(2)+'%';
    return rangeRate
}

console.log(getRangeRate(math_data, 70, 80))


