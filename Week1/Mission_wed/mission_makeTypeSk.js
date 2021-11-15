
import {data} from './json_tree.js'

// data 로부터 type 이 sk 인 요소의 배열을 반환
// 1. 배열을 순회하면서 타입이 object 라면 type을 찾고, 배열이라면 다시 함수를 실행한다.

// 연습용
let data2 = [{
    "id": 1,
    "name": "Yong",
    "phone": "010-0000-0000",
    "type": "sk",
    "childnode": [{
        "id": 11,
        "name": "echo",
        "phone": "010-0000-1111",
        "type": "kt",
        "childnode": []
    }]
}]

let results = [];

function getTypeSk(data) {
    for (let item of data) {
        if (typeof(item) === 'object') {
            if (item['type'] === 'sk') {
                results.push(item['name'])
            }
        }
        if (Array.isArray(item['childnode'])) {
            getTypeSk(item['childnode']);
        }
    }
    return results
}


console.log(Array.isArray(data2))
console.log(data2[0]['childnode'][0]['type'])

let data3 = [];

console.log(getTypeSk(data))