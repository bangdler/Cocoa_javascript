
// 로마숫자를 정수로 바꾼다. 특정 문자 앞의 문자는 - 해줘야한다.
// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.

let romanToInt = function(s) {
    let romanSymbol = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let result = 0;
    let prev = '';
    for(let str of s) {
        if(str === 'V' || str === 'X') {
            if(prev === 'I')
                result -= 2*romanSymbol[prev]
        }
        else if(str === 'L' || str === 'C') {
            if(prev === 'X')
                result -= 2*romanSymbol[prev]
        }
        else if(str === 'D' || str === 'M') {
            if(prev === 'C')
                result -= 2*romanSymbol[prev]
        }
        result += romanSymbol[str]
        prev = str;
    }
    return result;
};

console.log(romanToInt("MCMXCIV"))