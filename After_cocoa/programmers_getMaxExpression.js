
// 주어진 수식에서 연산자의 우선순위에 따른 최대값 구하기

// expression은 길이가 3 이상 100 이하인 문자열입니다.
// expression은 공백문자, 괄호문자 없이 오로지 숫자와 3가지의 연산자(+, -, *) 만으로 이루어진 올바른 중위표기법(연산의 두 대상 사이에 연산기호를 사용하는 방식)으로 표현된 연산식입니다. 잘못된 연산식은 입력으로 주어지지 않습니다.
//  즉, "402+-561*"처럼 잘못된 수식은 올바른 중위표기법이 아니므로 주어지지 않습니다.
// expression의 피연산자(operand)는 0 이상 999 이하의 숫자입니다.
//  즉, "100-2145*458+12"처럼 999를 초과하는 피연산자가 포함된 수식은 입력으로 주어지지 않습니다.
//     "-56+100"처럼 피연산자가 음수인 수식도 입력으로 주어지지 않습니다.
// expression은 적어도 1개 이상의 연산자를 포함하고 있습니다.
// 연산자 우선순위를 어떻게 적용하더라도, expression의 중간 계산값과 최종 결괏값은 절댓값이 2^63 - 1 이하가 되도록 입력이 주어집니다.
// 같은 연산자끼리는 앞에 있는 것의 우선순위가 더 높습니다.


/* 1. 각 연산자의 우선순위를 변경하기
      *, +, - 이므로 총 6가지 조합.
      연산자의 조합을 배열로 만든다.
      각 배열을 순회하며 연산자에 해당하는 수식을 먼저 계산하고 값을 변경한다.
       -. 정규식을 사용하여 변경한다.
      최종값을 정답 배열에 저장하고 절대값을 취하여 최종 Max값을 반환한다.
*/


function solution(expression) {
    let answer = 0;
    let basicOperators = ['*', '+', '-'];
    let operatorsComb = combinationOperator(basicOperators)
    let results = [];
    // 연산자 우선순위에 따른 조합을 하나씩 넣어 수식 결과값을 배열에 넣는다.
    operatorsComb.forEach(function(operators) {
        results.push(...calculator2(expression, operators))
        //console.log(results)
    })
    // 절대값으로 변환하여 최대값을 반환한다.
    let resultsNum = results.map((num) => (Math.abs(Number(num))))
    answer = Math.max(...resultsNum)
    return answer;
}


function combinationOperator(array) {
    const result = [];
    if(array.length === 1) return array;
    array.forEach(function(op, idx, array) {
        const fixer = op;
        const rest = array.filter((op) => op !== fixer);
        const combination = combinationOperator(rest);
        const combineFixer = combination.map((op) => [fixer, ...op]);
        result.push(...combineFixer);
    })
    return result;
}

// 틀린 방법.
function calculator(expression, operators) {
    // operator 에 앞뒤에 해당하는 숫자까지 추출하여 계산한다.
    operators.forEach(function(operator) {
        const thisOp = `((^\\-|\\*\\-|\\+\\-)(\\d+\\${operator}\\-?\\d+))|(\\d+\\${operator}\\-?\\d+)`
        const reg = new RegExp(thisOp)
        let calculateReg = reg.exec(expression) //  ['100-200', ...] 형태
        while(calculateReg !== null) {
            const calculateExp = calculateReg[0].split(`${operator}`).map((x) => (Number(x)))
            let result;
            if(calculateExp[0] !== 0) {
                if(operator === '*') {
                    result = calculateExp[0] * calculateExp[1]
                }
                else if(operator === '+') {
                    result = calculateExp[0] + calculateExp[1]
                }
                else if(operator === '-') {
                    result = calculateExp[0] - calculateExp[1]
                }
            }
            else {
                if(operator === '*') {
                    result = -calculateExp[1] * calculateExp[2]
                }
                else if(operator === '+') {
                    result = -calculateExp[1] + calculateExp[2]
                }
                else if(operator === '-') {
                    result = -calculateExp[1] - calculateExp[2]
                }
            }
            expression = expression.replace(reg, result)
            calculateReg = reg.exec(expression)
        }
        console.log(expression)
    })
    return expression;
}

// 연산자 순서에 따라 수식을 계산하여 결과값을 반환한다.
function calculator2(expression, operators) {
    // 수식을 숫자와 연산자로 나누어 배열로 바꾼다.
    expression = expression.replace(/\+/g, ' + ');
    expression = expression.replace(/\-/g, ' - ');
    expression = expression.replace(/\*/g, ' * ');
    let expressionArr = expression.split(' ')
    let numExpArr = expressionArr.map(function(str) {
        if(str === '+' || str === '*' || str === '-') {
            return str;
        }
        else {
            return Number(str);
        }
    })
    //console.log(numExpArr)
    // 배열에서 stack 을 활용하여 해당 연산자일 경우 계산하고, 아닐 경우에 stack 에 넣어 수식 배열을 업데이트한다.
    let array = numExpArr;
    let result;
    operators.forEach(function(operator) {
        // on 으로 계산 필요 여부를 구분한다. stack 에 결과를 하나씩 넣어 연산 이후의 수식으로 업데이트한다.
        let on = 0;
        let stack = [];
        //console.log(array)
        array.forEach(function(data) {
            if(typeof data === "number" && on === 0) {
                stack.push(data)
            }
            else if(typeof data === "number" && on === 1) {
                if(operator === '+') {
                    let calNum = stack.pop() + data;
                    stack.push(calNum);
                    on = 0;
                }
                else if(operator === '*') {
                    let calNum = stack.pop() * data;
                    stack.push(calNum);
                    on = 0;
                }
                else if(operator === '-') {
                    let calNum = stack.pop() - data;
                    stack.push(calNum);
                    on = 0;
                }
            }
            else if(typeof data === "string" && data !== operator) {
                stack.push(data)
            }
            else if(typeof data === "string" && data === operator) {
                on = 1;
            }
        })
        array = stack;
    })
    result = array;
    return result;
}


let expression = "50*6-3*2";
let operators = ['*', '+', '-'];
//console.log(combinationOperator(operators))
//console.log(calculator(expression, operators))
//console.log(solution(expression))

//calculator2(expression, operators)
console.log(solution(expression))