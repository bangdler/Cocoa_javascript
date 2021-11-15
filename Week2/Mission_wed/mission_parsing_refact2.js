
// mission 요구사항 3. 배열 분석 정보를 출력한다. 하기 1,2 함수 재활용

// mission 요구사항 1, 2
// Stack 생성자 함수를 만들고 그 안에 stack 배열을 생성, push / pop 기능을 넣었음. 별 필요는 없는 것 같다.
function Stack() {
    this.stack = [];
}

    Stack.prototype.push = function(data) {
        this.stack.push(data);
    }

    Stack.prototype.pop = function() {
        if (this.stack.length > 0) {
            this.stack.pop();
        }
    }

// 정규식 [ 가 있을 경우 true
function checkOpenBracket(str) {
    const regExp = /\[/g;
    return regExp.test(str);
}

function checkCloseBracket(str) {
    const regExp = /\]/g;
    return regExp.test(str);
}

// ',' 이면 true, str === ',' 로 리턴했을때 작동이 안됨...
function isComma(str) {
    const regExp = /\,/g;
    return regExp.test(str);
}

// data를 array로 변환한 후 for문을 돌면서 [ , ], ','외 로 구하여분 작업 수행, bracketStack 배열에 push, pop
// mission 요구사항 3을 위해 arrayForPrint 배열을 만들고 [ 숫자 ] 만 추출하여 배열을 만듦.

// data 문자열을 분석해서 괄호가 맞는지를 확인하고 괄호와 요소 순서로 구성된 배열을 반환.
function run(data) {
    const bracketStack = new Stack();
    let array = data.split('');
    let element = '';                            // element 는 숫자가 들어올 경우 기록했다가 , 를 통해 초기화한다. 두자리 이상의 숫자를 기록가능.
    let arrayForPrint = [];

    for (let i = 0; i < array.length; i++) {
                                                // [ 이면 stack에 push
        if (checkOpenBracket(array[i])) {
            bracketStack.stack.push(array[i])
            arrayForPrint.push(array[i])
            continue;
        }
                                                // ] 이면 element가 차있는 경우 초기화( ...6] 와 같이 배열의 마지막에 값의 초기화를 위함)
                                                // pop 값이 [ 가 아니면 ] 갯수가 많다는 뜻으로 괄호가 일치하지 않음.
        else if (checkCloseBracket(array[i])) {
            if (element.length !== 0) {
                arrayForPrint.push(element)
                element = '';
            }
            if (bracketStack.stack.pop() !== '[') {
                console.log('괄호가 일치하지 않습니다.')
                return false;                    // break; 로 하면 for 문만 빠져나가므로 맨 아래 출력이 실행되나, false로 하면 함수전체를 나간다.
            }
            else {
                arrayForPrint.push(array[i]);
            }
            continue;
        }
                                                 // [,],',' 가 아니면 element로 추가한다.
        else if (!isComma(array[i])) {
            element += array[i];
            continue;
        }
                                                  // [,] 경우 거르기 위함. ',' 왔을 경우에 element가 비어있지 않다면 초기화
        else {
            if (element.length !== 0) {
                arrayForPrint.push(element)
                element = '';
            }
        }
    }
                                                    // ] 갯수가 적을 경우에 stack 배열은 for 문이 종료된 순간에도 0이 아니므로 이 경우에 false 를 return.
    if (bracketStack.stack.length !== 0) {
        console.log('괄호가 일치하지 않습니다.')
        return false;
    }
    console.log(arrayForPrint)
    return arrayForPrint;
}

// 요구사항 3을 위한 함수

let root = { "type" : "root", "child" : []};        // "[]" 로 하면 문자열이라 push가 안된다.


// 새로운 obj 를 만든다. value 는 특정한 type 에만 생성된다.
function getObj(type, value = 0, child = []){
    let dataObj = new Object();
    dataObj.type = type;
    if (type === 'number') {
        dataObj.value = value;
    }
    dataObj.child = child;
    return dataObj
}

// run function 에서 data 를 적정 배열로 반환하고, 받은 배열을 순회하며 문자에 따라 root의 적정 위치에 새로운 obj 를 넣는다.
function analyzeData(data) {
    let dataArray = run(data);
    let currentObj = root;
    let childObj = root.child

    if (!dataArray) {
        return false;
    }
// [ 이면 child -> current , child에는 new obj를 push 하고 new obj.child -> child가 된다.
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] === '[') {
            let newChildObj = getObj('array')
            currentObj = childObj;
            childObj.push(newChildObj)
            childObj = newChildObj.child
            continue;
        }
// ] 이면 다시 current -> child 가 된다.
        else if (dataArray[i] === ']') {
            childObj = currentObj
            continue;
        }
// 숫자가 나오면 child에 number obj를 push.
        else {
            let numberObj = getObj('number', dataArray[i])
            childObj.push(numberObj)
            continue;
        }
    }
    return JSON.stringify(root, null, 3)
}

const data = "[1,2,[3,4,[5,[6]]]]"

console.log(analyzeData(data))