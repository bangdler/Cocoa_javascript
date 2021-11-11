// 많은 오류가 발견되어 refactoring 필요...
// 왜 stack 을 사용해야하는지 알게 됨.

// 1. 요구사항 : 객체 분석 정보를 출력
// 배열의 중첩된 길이를 분석하고 원소의 갯수를 출력한다.
// 중첩 갯수는 [ 갯수를 세어 확인 가능함. 원소 갯수는 정규식 숫자를 세어 구할 수 있음.

const data = "[1,2,[33,4,[5,[6]]]]";

// 정규식 [ 가 있을 경우 true
function checkOpenBracket(str) {
    const regExp = /\[/g
    return regExp.test(str)

}

// 정규식 ] 가 있을 경우 true
function checkCloseBracket(str) {
    const regExp = /\]/g
    return regExp.test(str)

}

// 정규식 숫자가 있을 경우 true
function checkNum(str) {
    const regExp2 = /\d/g
    return regExp2.test(str)
}


// for 문을 통해 [ 갯수, ] 갯수, 숫자 갯수를 센다. -> 오류! : 숫자 갯수를 하나씩 세기 때문에 두자리 이상의 숫자를 세면 갯수가 다름.
function getNumber(data) {
    let openBracketNum = 0;
    let closeBracketNum = 0;
    let digitNum = 0;
    for (let i = 0; i < data.length; i++) {
        if (checkOpenBracket(data[i])) {
            openBracketNum += 1;
        }
        else if (checkCloseBracket(data[i])) {
            closeBracketNum += 1;
        }
        else if (checkNum(data[i])) {
            digitNum += 1;
        }
    }
    return [openBracketNum, closeBracketNum, digitNum]
}

// 출력 : openbracket 갯수 = 중첩수, 숫자 갯수 = 원소수
function run(data) {
    let [nestNum,elementNum ] = [getNumber(data)[0], getNumber(data)[2]];
    console.log(`배열의 중첩된 깊이 수준은 ${nestNum}이며, 총 ${elementNum}개의 원소가 포함되어 있습니다.`)
}

run(data)

// 2. 요구사항 : 괄호가 매칭에 오류가 있는 경우 오류내용을 출력한다.
// 괄호의 갯수가 제대로인지 파악한다.
// [ 갯수를 세고 ] 갯수가 다를 경우 오류 출력 -> 오류! 단순 갯수만 비교하면 ]][[ 로 들어온 것도 맞다고 한다.

// [ 갯수 ] 갯수 비교 후 다르면 false 반환
function checkBracketMatch(data) {
    let openBracketNum = getNumber(data)[0];
    let closeBracketNum = getNumber(data)[1];
    if (openBracketNum !== closeBracketNum) {
        return false;
    }
    return true;
}

// 다를 경우 문구 출력
function run2(data) {
    if (!checkBracketMatch(data)) {
        console.log('닫는 괄호가 일치하지 않습니다')
    }
}

const data2 = "[1,2,[33,4,[5,[6]]"

run2(data2)

