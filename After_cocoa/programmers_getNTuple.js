
// 셀수있는 수량의 순서있는 열거 또는 어떤 순서를 따르는 요소들의 모음을 튜플(tuple)이라고 합니다. n개의 요소를 가진 튜플을 n-튜플(n-tuple)이라고 하며,
// 다음과 같이 표현할 수 있습니다.
// (a1, a2, a3, ..., an)
// 튜플은 다음과 같은 성질을 가지고 있습니다.
// 중복된 원소가 있을 수 있습니다. ex : (2, 3, 1, 2)
// 원소에 정해진 순서가 있으며, 원소의 순서가 다르면 서로 다른 튜플입니다. ex : (1, 2, 3) ≠ (1, 3, 2)
// 튜플의 원소 개수는 유한합니다.

// 원소의 개수가 n개이고, 중복되는 원소가 없는 튜플 (a1, a2, a3, ..., an)이 주어질 때(단, a1, a2, ..., an은 자연수),
// 이는 다음과 같이 집합 기호 '{', '}'를 이용해 표현할 수 있습니다.
// {{a1}, {a1, a2}, {a1, a2, a3}, {a1, a2, a3, a4}, ... {a1, a2, a3, a4, ..., an}}
// 예를 들어 튜플이 (2, 1, 3, 4)인 경우 이는 {{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}} 와 같이 표현할 수 있습니다.
// 이때, 집합은 원소의 순서가 바뀌어도 상관없으므로
// {{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}}
// {{2, 1, 3, 4}, {2}, {2, 1, 3}, {2, 1}}
// {{1, 2, 3}, {2, 1}, {1, 2, 4, 3}, {2}}
// 는 모두 같은 튜플 (2, 1, 3, 4)를 나타냅니다.

// 특정 튜플을 표현하는 집합이 담긴 문자열 s가 매개변수로 주어질 때, s가 표현하는 튜플을 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// 설계
// 튜플의 표현식인 각 집합 중에서 길이가 1인 배열부터 값을 정답 배열에 넣고 그 이후에는 길이가 긴 것부터 새로운 값을 정답 배열에 넣는다.
// 튜플의 표현식인 각 집합은 순서가 상관없으므로, 배열 parsing 후 각 원소의 길이를 탐색한다.
// 1. 문자열 s 를 배열로 parsing 한다.
// 2. 배열을 순회하면서 길이를 구하고 길이가 1인 원소부터 정답 배열과 비교하여 없는 값을 추가한다.

function parseS(s) {
    let sArray = s.split('');
    let parent = [];
    let element = '';
    // 문자열을 {, 숫자, } 로만 이루어진 배열로 변환한다.
    sArray.forEach(function(str) {
        if(str === '{') {
            parent.push(str)
        }
        else if(str === '}') {
            if(element.length !== 0){
                parent.push(element)
                element = ''
            }
            parent.push(str)
        }
        else if(str === ',') {
            if(element.length !== 0){
                parent.push(element)
                element = ''
            }
        }
        else {
            element += str;
        }
    })
    //console.log(sArray)
    //console.log(parent)
    // 변환된 문자열을 원소 갯수에 따른 tuple 배열을 담은 배열로 변환.
    let tupleArray = [];
    let current;
    parent.forEach(function(str) {
        if(str === '{') {
            current = new Array();
        }
        else if(str === '}') {
            if(current.length !== 0) {
                tupleArray.push(current)
            }
            current = [];
        }
        else {
            current.push(Number(str));
        }
    })
    //console.log(tupleArray)
    // tuple 길이를 key 로 배열을 value 로 하는 객체를 만든다.
    // key 를 이용하여 객체 순회, 길이가 1인 배열부터 검색해서 없는 숫자를 result에 넣는다.
    let tupleLengthObject = {};
    tupleArray.forEach(function(array) {
        let length = array.length;
        tupleLengthObject[length] = array;
    })
    //console.log(tupleLengthObject)
    let maxLength = Object.keys(tupleLengthObject).length
    let result = [];
    for(let i = 1; i <= maxLength; i++) {
        let array = tupleLengthObject[i];
        array.forEach(function(num){
            if(result.includes(num) === false) {
                result.push(num)
                return;
            }
        })
    }
    //console.log(result)
    return result;
}

const s = "{{4,2,3},{3},{2,3,4,1},{2,3}}";

parseS(s)