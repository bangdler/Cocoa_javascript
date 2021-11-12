
// divisor 로 나누어 떨어지는 숫자를 오름차순으로 정렬하여 반환한다.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let data = [];
let divideArray = [];
let results = [];
rl.on('line', function(line) {
    data = line.split(' ').map((el) => el);
    console.log(data)
    rl.close();
})
rl.on('close', function() {
    let arrayData = data[0].replace(/[\[\]]/gi, '');
    let array = arrayData.split(',');
    let divisor = Number(data[1]);
    console.log(array)
    divideArray = getNoRemainder(array, divisor)
    console.log(divideArray)
    results = sortAscending(divideArray)
    console.log(results)
    return results;
})

function getNoRemainder (array, divisor) {
    let noRemainderArray = [];
    for (let i = 0; i < array.length; i++) {
        let remainder = array[i] % divisor;
        if (remainder === 0) {
            noRemainderArray.push(Number(array[i]));
        }
    }
    return noRemainderArray;
}

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
                 let j = 0
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