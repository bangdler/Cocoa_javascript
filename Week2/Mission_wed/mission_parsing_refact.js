
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

    // Stack.prototype.getTop = function() {
    //     let index = this.stack.length - 1
    //     return this.stack[index]
    // }


// 정규식 [ 가 있을 경우 true
function checkOpenBracket(str) {
    const regExp = /\[/g;
    return regExp.test(str);
}

// 정규식 ] 가 있을 경우 true
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

function run(data) {
    const bracketStack = new Stack();
    let array = data.split('');
    let depth = 0;
    let elementcount = 0;
    let element = '';                            // element 는 숫자가 들어올 경우 기록했다가 , 를 통해 초기화 및 count 한다. 두자리 이상의 숫자를 기록가능.

    for (let i = 0; i < array.length; i++) {
                                                // [ 이면 stack에 push
        if (checkOpenBracket(array[i])) {
            bracketStack.stack.push(array[i])
            depth += 1;
            continue;
        }
                                                // ] 이면 element가 차있는 경우 +1 해주면서 초기화(배열의 마지막에 값이 있는 경우 초기화를 위함)
                                                // pop 값이 [ 가 아니면 ] 갯수가 많다는 뜻으로 괄호가 일치하지 않음.
        else if (checkCloseBracket(array[i])) {
            if (element.length !== 0) {
                element = '';
                elementcount += 1;
            }
            if (bracketStack.stack.pop() !== '[') {            // else if 로 했었는데 위에 if 와 함께 조건을 검사 해야하므로 if.
                console.log('괄호가 일치하지 않습니다.')
                return false;                    // break; 로 하면 for 문만 빠져나가므로 맨 아래 출력이 실행되나, false로 하면 함수전체를 나간다.
            }
            continue;
        }
                                                 // [,],',' 가 아니면 element로 추가한다.
        else if (!isComma(array[i])) {
            element += array[i];
            continue;
        }
                                                  // [,] 경우 거르기 위함. ',' 왔을 경우에 "element가 비어있지 않다면" 초기화 및 count +1
        else {
            if (element.length !== 0) {
                element = '';
                elementcount += 1
            }
        }
    }
                                                    // ] 갯수가 적을 경우에 stack 배열은 for 문이 종료된 순간에도 0이 아니므로 이 경우에 false 를 return.
    if (bracketStack.stack.length !== 0) {
        console.log('괄호가 일치하지 않습니다.')
        return false;
    }

    console.log(`배열의 중첩된 깊이 수준은 ${depth}이며, 총 ${elementcount}개의 원소가 포함되어 있습니다.`)
    return true;
}

const data = "[1,[2,[33,4,[5,[a,b]]]]]";
const data1 ="[,]"
const data2 = "1,2,[33,4,[5,[65]]]";
const data3 =""
const data4 ="[1,[2]"
const data5 ='[65,]'
const data6 = "]1,2,[33,4,[5,[65]]";

run(data)
run(data1)
run(data2)
run(data3)
run(data4)
run(data5)
run(data6)