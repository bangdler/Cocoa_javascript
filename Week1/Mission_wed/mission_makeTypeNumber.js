// o.js 모듈에서 data 를 import
import {data} from './o.js'

//연습용 객체
let data2 =  {
    "debug" : 200,
    "window" : {
        "title": 'Sample Konfabulator Widget',
        name: 'main_window',
        width: 500,
        height: 500
}
}
console.log(typeof(data2))


let keyTypeNum = [];

// for in 을 사용하여 객체의 value type 이 Number 이면 result 배열에 그 Key 값을 넣는다. value가 객체로 구성되어 있으면 함수를 다시 적용한다.
function getTypeNumber(data) {
    for (let key in data) {
        if (typeof(data[key]) === "number") {
            keyTypeNum.push(key);
        }
        else if (typeof(data[key]) === "object") {
            getTypeNumber(data[key])
        }
    }
    return keyTypeNum;
}

console.log(getTypeNumber(data))