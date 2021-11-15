
// divisor 로 나누어 떨어지는 숫자를 오름차순으로 정렬하여 반환한다.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let data = [];

// 띄어쓰기 배열을 입력하는 법은 모르겠다.. 현재 입력방식 : [5,9,7,10] 1
rl.on('line', function(line) {
    data = line.split(' ').map((el) => el);
    rl.close();
})
rl.on('close', function() {
    let divideArray = [];
    let results = [];
    let arrayData = data[0].replace(/[\[\]]/gi, '');  // data 배열 중 index 0 문자열을 숫자만 남기고 배열로 바꿔야함.
    let array = arrayData.split(',');
    let divisor = Number(data[1]);
    console.log(array)
    divideArray = getNoRemainder(array, divisor)
    console.log(divideArray)
    results = sortAscending(divideArray)
    console.log(results)
    return results;
})

// array를 divisor 로 나누어 떨어지는 값만 배열로 반환하는 함수.
function getNoRemainder (array, divisor) {
    let noRemainderArray = [];
    for (let i = 0; i < array.length; i++) {
        let remainder = array[i] % divisor;
        if (remainder === 0) {
            noRemainderArray.push(Number(array[i]));    // Number를 안하면 이후 정렬함수에서 if로 값 비교 시에 문자로 인식함.
        }
    }
    return noRemainderArray;
}

// array를 오름차순으로 정렬하는 함수. 값이 없으면 -1 반환.
// 초기값을 ascending array에 넣어주고 순차적으로 ascending array 의 값과 비교하여 더 작은 경우에 splice를 사용하여 해당 위치에 삽입한다.
function sortAscending (array) {
     let ascendingArray = [];
     if (array.length === 0) {
         ascendingArray.push(-1);
     }
     else {
         for (let i = 0; i < array.length; i++) {
             if (ascendingArray.length === 0) {
                 ascendingArray.push(array[i])
             } else {
                 let j = 0                                      // let 을 for문 밖으로 빼야 for 문 안에서 더 작은 값이 없는 경우 j를 사용해서 추가로 push가 가능함.
                 for (; j < ascendingArray.length; j++) {
                     if (array[i] < ascendingArray[j]) {
                         ascendingArray.splice(j, 0, array[i]);
                         break;
                     }
                 }
                 if (j === ascendingArray.length) {
                     ascendingArray.push(array[i]);
                 }
             }
         }
     }
     return ascendingArray;
}

//참고
// var numbers = [4, 2, 5, 1, 3];
// numbers.sort(function(a, b) {
//     return a - b;
// });
// console.log(numbers);

// [1, 2, 3, 4, 5]