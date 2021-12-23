
// 짝지어 제거하기.
// 알파벳 소문자로 이루어진 문자열을 가지고 시작합니다. 먼저 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다.
// 그다음, 그 둘을 제거한 뒤, 앞뒤로 문자열을 이어 붙입니다. 이 과정을 반복해서 문자열을 모두 제거한다면 짝지어 제거하기가 종료됩니다.
// 문자열 S가 주어졌을 때, 짝지어 제거하기를 성공적으로 수행할 수 있는지 반환하는 함수를 완성해 주세요.
// 성공적으로 수행할 수 있으면 1을, 아닐 경우 0을 리턴해주면 됩니다.

function solution(s) {
    let answer = -1;
    // 단어를 하나하나 새로운 배열에 넣는다. 넣으면서 마지막값과 비교한다. 같으면 마지막값을 제거하고, 다르면 새로운 값을 넣어준다.
    let strArray = [];
    strArray.push(s[0])
    for (let i = 1; i < s.length; i++){
        let str = s[i];
        let last = strArray[strArray.length - 1] ;
        if (last === str) {
            strArray.pop();
            continue;
        }
        strArray.push(str)
    }
    if (strArray.length === 0) answer = 1;
    else { answer = 0;}
    return answer
}


let s = 'baabaa'
console.log(solution(s))