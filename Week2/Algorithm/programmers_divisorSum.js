
//정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수

//정수 n 을 1부터 n까지 나누어 나머지가 0 인 값들을 배열로 만든다.

function divisorSum(n) {
    if (n === 0) return n;
    let divisorArray = [];
    for (let i = 1; i <= n; i++) {
        let divisor = n % i
        if(n % i === 0) {
            divisorArray.push(i)
        }
    }
    let result = divisorArray.reduce(function(acc, cur) {
        return acc+cur
    })
    return result
}

console.log(divisorSum(0))