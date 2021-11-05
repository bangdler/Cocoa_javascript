
// for 활용한 factorial
function factorial(n){
    let result = 1;
    for (let i = 0; i < n - 1; i++){
        result = result * (n - i)
    }
    return result
}

console.log(factorial(3))

// 재귀함수를 활용한 factorial
function factorial_2(n){
    if (n <=1){
        return 1;
    }
    return n * factorial(n - 1)
}

console.log(factorial_2(1))

// 1부터 n까지 factorial 배열로 만들기
function getArrFactorial(n){
    let arrFactorial = [];
    for (let i = 1; i <= n; i++){
        arrFactorial.push(factorial_2(i));
    }
    return arrFactorial
}

console.log(getArrFactorial(5))