//Map 과 hash 의 차이 (https://velog.io/@jun094/Hash%EC%99%80-Map#21-map-%EA%B0%9D%EC%B2%B4%EB%9E%80)
let map = new Map();

let number = 0;
let str = 'string';
let obj = { a: 1 };
let fnc = () => {
    console.log('fnc');
};

map.set(number, 2); //key에 number 가능
map.set(str, 1); // key에 string 가능
map.set(obj, 2); //key에 object 가능
map.set(fnc, 3); // key에 함수 가능
map.set(number, 0); // 덮어쓰기 가능

console.log(map);

// hash
// 해시 테이블은 직접 주소 테이블처럼 값을 바로 테이블의 인덱스로 사용하는 것이 아니라 해시 함수(Hash Function)이라는 것에 한번 통과시켜서 사용한다. 해시 함수는 임의의 길이를 가지는 임의의 데이터를 고정된 길이의 데이터로 매핑하는 함수이다. 이때 이 함수가 뱉어내는 결과물을 해시(Hash)라고 부른다.
// hash 란? (https://evan-moon.github.io/2019/06/25/hashtable-with-js/)
const myTableSize = 5;
const myHashTable = new Array(myTableSize);

function hashFunction (key) {
    // 들어온 값을 테이블의 크기로 나눠주고 나머지를 반환하면 된다.
    return key % myTableSize;
}

myHashTable[hashFunction(1991)] = 1991;
myHashTable[hashFunction(1234)] = 1234;
myHashTable[hashFunction(5678)] = 5678;

console.log(myHashTable); // [empty, 1991, empty, 5678, 1234]