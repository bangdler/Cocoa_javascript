'use strict';

// Function Description
//
// Complete the aVeryBigSum function in the editor below. It must return the sum of all array elements.
// aVeryBigSum has the following parameter(s):
// int ar[n]: an array of integers .
// Return
// long: the sum of all array elements
import * as fs from "fs"

// 해커랭크에서 인풋 읽는법... 공부해볼 것.
// Sample Input
//
// 5
// 1000000001 1000000002 1000000003 1000000004 1000000005

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

// node 실행 시 end 하는 법을 모르겠다. 사이트 내에서 입력값을 읽는 경우라면 모든 값을 읽으면 저절로 end 인듯.
// 직접 input 하는 경우에는 종료가 안되어 결과값 출력을 못했다.
process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'aVeryBigSum' function below.
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER_ARRAY ar as parameter.
 */

function aVeryBigSum(ar) {
    // Write your code here
    const result = ar.reduce(function (acc, cur) {
        return acc + cur;
    })
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arCount = parseInt(readLine().trim(), 10);

    // \s+$ : 맨 끝에 공백이 있는 경우. '' 로 변경, 그 외 빈칸을 기준으로 배열로 나누고, map 을 이용하여 10진수 숫자로 바꿔준다.
    const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result = aVeryBigSum(ar);

    ws.write(result + '\n');

    ws.end();
}