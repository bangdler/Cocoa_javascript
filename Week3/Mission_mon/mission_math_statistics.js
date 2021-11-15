
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

// console.log(math_data)

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

// console.log(getMean(makeArray(math_data)))

// 편차 구하기
function getDeviation(array) {
    let mean = getMean(array)
    array = array.map((score) => (score - mean).toFixed(2));
    return array;
}

console.log(getDeviation(makeArray(math_data)))

// 분산 구하기
function getVariance(array) {
    let deviSquare = getDeviation(array).map((score) => score ** 2);
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
    let standardDevi = (variance ** 0.5).toFixed(2);
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

// Z 를 이용하여 표준정규분포표에서 확률 구하기 : 사이트 테이블에서 값을 읽는 법을 모르겠다.