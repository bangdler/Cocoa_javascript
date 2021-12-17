
// 주어진 숫자 배열 중 3개를 더해 만들 수 있는 소수의 경우의 수 반환하기.

// 배열 중 3개를 더해 나올 수 있는 모든 합을 구하고 소수 여부를 판별한다.
// 더해서 같은 소수가 나오더라도 다른 경우의 수이므로 갯수에 포함된다.
function checkPrimeThreeSum(array) {
    let result;
    let answer = 0;
    for (let i = 0; i < array.length - 2; i++) {
        for (let j = i+1; j < array.length - 1; j++) {
            for (let k = j+1; k < array.length; k++) {
                result = array[i] + array[j] + array[k];
                if (isPrime(result)) {
                    answer += 1;
                }
            }
        }
    }
    return answer;
}

// 주어진 값이 소수인지 확인하는 함수
function isPrime(num) {
    if (num <= 1) return false;
    else if (num === 2 || num === 3) return true;
    else if (num % 2 === 0) return false;
    let sqrt = parseInt(Math.sqrt(num));
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

let numbers = [1,2,7,6,4]
console.log(checkPrimeThreeSum(numbers))