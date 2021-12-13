
//숫자를 거꾸로 뒤집어 출력하기. 출력값 범위 있음.
//Given a signed 32-bit integer x, return x with its digits reversed.
//If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

let reverse = function(x) {
    let plus = true;
    if(x < 0) {
        x = -x;
        plus = false;
    }
    let xStr = x.toString();
    let xArray = [];
    for (let string of xStr) {
        xArray.push(string)
    }
    let half = parseInt((xArray.length - 1) / 2)
    for (let i = 0; i <= half; i++) {
        let temp;
        let lastIndex = xArray.length -1;
        temp = xArray[i]
        xArray[i] = xArray[lastIndex - i]
        xArray[lastIndex - i] = temp
    }
    x = Number(xArray.join(''));
    if(plus === false) {
        x = -x;
    }
    if(x > Math.pow(2, 31) || x < Math.pow(-2, 31)) return 0;
    return x;
};


console.log(reverse(1534236469))
