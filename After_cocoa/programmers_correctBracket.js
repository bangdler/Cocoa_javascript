
//'(' 와 ')' 로만 이루어진 문자열이 있을 경우, '(' 의 개수와 ')' 의 개수가 같다면 이를 균형잡힌 괄호 문자열이라고 부릅니다.
// 그리고 여기에 '('와 ')'의 괄호의 짝도 모두 맞을 경우에는 이를 올바른 괄호 문자열이라고 부릅니다.
// 예를 들어, "(()))("와 같은 문자열은 "균형잡힌 괄호 문자열" 이지만 "올바른 괄호 문자열"은 아닙니다.
// 반면에 "(())()"와 같은 문자열은 "균형잡힌 괄호 문자열" 이면서 동시에 "올바른 괄호 문자열" 입니다.
// '(' 와 ')' 로만 이루어진 문자열 w가 "균형잡힌 괄호 문자열" 이라면 다음과 같은 과정을 통해 "올바른 괄호 문자열"로 변환할 수 있습니다.

// 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다.
// 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
// 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다.
//   3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다.
// 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다.
//   4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다.
//   4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다.
//   4-3. ')'를 다시 붙입니다.
//   4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다.
//   4-5. 생성된 문자열을 반환합니다.


function solution(p) {
    let answer = '';
    if(!p) return "";
    let wordArray = p.split('')
    answer = reformBracket(wordArray).join('')
    return answer;
}

function divideWord(array) {
    // ( 면 +1, ) 면 -1, 하여 0 일 때, u 로 나눈다.
    let countBracket = 0;
    let u;
    let v;
    for(let i = 0; i < array.length; i++) {
        if(array[i] === '(') {
            countBracket += 1;
        }
        else if(array[i] === ')') {
            countBracket -= 1;
        }
        if(countBracket === 0) {
            u = array.slice(0, i+1);
            v = array.slice(i+1);
            return [u, v];
        }
    }
}

function reformBracket(array) {
    if(array.length === 0) return array;
    let [u, v] = divideWord(array);
    let bracketStack = [];
    // u 에 대해 올바른 괄호 확인.
    for(let i = 0; i < u.length; i++) {
        if(u[i] === '(') {
            bracketStack.push(u[i])
        }
        else if(u[i] === ')') {
            bracketStack.pop();
        }
    }
    // u 가 올바른 괄호일 경우
    if(bracketStack.length === 0) {
        let addV = reformBracket(v);
        let reform = [...u, ...addV];
        return reform;
    }
    // u 가 올바른 괄호가 아닐 경우
    else {
        // 괄호 반대로 뒤집기. (이거 때문에 계속 틀렸다.)
        let reverseU = u.map(function(x) {
         if(x === '(') {
             return ')'
         }
         else{
             return '('
         }
        })
        let addU = reverseU.slice(1,-1);
        let addV = reformBracket(v);
        let reform = [...'(', ...addV, ...')', ...addU]
        return reform;
    }
}

//console.log(solution(""))
//console.log(divideWord([ '(', '(', ')', ')' ]))
//console.log(reformBracket([ ')', '(', '(', ')' ]))
console.log(solution("))()))(((("))