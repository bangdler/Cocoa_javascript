// 10진법 이상의 경우 mathced의 value값을 참조한다.
const matched = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
}
// number가 n보다 작을 때를 굳이 나눠줄 필요가 없다.
// function changeBinary(n, number){
//     let binary = [];
//     if (number < n) {
//         if (number >= 10){
//             binary.push(matched[number])
//         }
//         else {
//             binary.push(number)
//         }
//     }
//     else {
//         while(parseInt(number) !== 0){
//         let rest = number % n;
//         let quotient = parseInt(number / n);
//         if (rest >= 10) {
//             binary.push(matched[number])
//         }
//         else {
//             binary.push(rest)
//         }
//         number = quotient;
//         }
//     }
//     return binary.reverse();
// }

// number 를 n진수로 변환하여 binary 배열에 추가한다.
// n 이하일 때는 바로 number를 배열에 추가하고, 10 이상의 경우 A~F로 변환한다.
function changeBinary(n, number){
    let binary = [];
    if (number === 0){
        binary.push(number)
    }
    while(parseInt(number) !== 0){
        let rest = number % n;
        let quotient = parseInt(number / n);
        if (rest >= 10) {
            binary.push(matched[number])
        }
        else {
            binary.push(rest)
        }
        number = quotient;
    }
    return binary.reverse();
}

console.log(changeBinary(16, 15));

// n진법의 숫자를 m명의 사람이 명당 t개씩 말할 때, m*t개로 구성된 배열 구하기 (숫자는 0부터 순차적으로 커진다.)

function getTotalArray(n, m, t){
    let Total = [];
    for (let i = 0; Total.length < m * t; i++){
        Total.push(...changeBinary(n, i))
    }
    return Total;
}

console.log(getTotalArray(2, 2,4))

// m*t로 구성된 배열에서 p번째 사람이 t개씩 말할 때, 말해야하는 숫자의 배열 구하기

function getPersonArray(n, m, t, p){
    let indexRange = m * t;
    let indexArr = getTotalArray(n, m, t);
    let pArr = [];

    // m명의 사람 중 p번째 사람이 말하는 배열 pArr을 index 하는 for문
    for (let j = 0; j < indexRange; j++) {
        if (j % m === p - 1) {
            pArr.push(indexArr[j]);
        }
    }
    console.log(pArr)
return pArr
}

getPersonArray(2,2,4,1)
getPersonArray(16,2,16,1)
getPersonArray(16,2,16,2)



