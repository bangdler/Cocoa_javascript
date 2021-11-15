// reduce method 구현하기

// arr 배열을 받아서 call back 에서 배열을 순회하면서 call back의 반환값을 누적한다. 초기값을 지정하지 않으면 초기값은 arr[0] 값이고 순회는 arr[1]부터 한다.
const myReduce = function (arr, callback, initialValue) {
    let accumulator;
    if (initialValue === undefined) {
        accumulator = arr[0];
        for (let i = 1; i < arr.length; i++) {
            accumulator = callback(accumulator, arr[i])
        }
    }
    else {
        accumulator = initialValue;
        for (let j = 0; j < arr.length; j++) {
            accumulator = callback(accumulator, arr[j]);
        }
    }
    return accumulator
}

// 하기 result 의 의도를 모르겠다.
// const result = myReduce(arr, (next,prev) => {...}, []);

let arr = [5, 7, 1, 8, 4]
let list = [
    {
        x : 1
    },
    {
        x : 2
    },
    {
        x : 3
    }
];
let array = [
    [0, 1],
    [2, 3],
    [4, 5]
]

const result = myReduce(arr, function(accumulator, current){return accumulator + current}, 10)
const result2 = myReduce(list, function(accumulator, current){return accumulator + current.x}, 10)
const result3 = myReduce(array, function(accumulator, current){return accumulator.concat(current)})

console.log(result)
console.log(result2)
console.log(result3)