
// 뒤집어도 똑같은 숫자이면 true 아니면 false (음수 false)
let isPalindrome = function(x) {
    if(x < 0) return false;
    const xStr = x.toString();
    let xArray = [];
    for(let string of xStr) {
        xArray.push(string);
    }
    let lastIndex = xArray.length - 1
    let halfIndex = parseInt(lastIndex / 2)
    for(let i = 0; i <= halfIndex; i++) {
        if (xArray[i] !== xArray[lastIndex - i]) {
            return false
        }
    }
    return true;
};

console.log(    isPalindrome(10))