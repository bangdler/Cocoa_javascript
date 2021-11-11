
// 생성자 함수 HashMap : size에 따른 hashTable 빈 배열을 만든다.

function HashMap(size = 23) {
    this.tableSize = size;
    this.hashTable = new Array(this.tableSize);
}

// hash function : key를 ascii code를 이용한 특정 숫자로 바꾼 뒤 tableSize로 나눈 나머지를 이용하여 hashTable index로 반환한다.
HashMap.prototype.getHashAddress = function(key){
    let asciiSum = 0;
    key.split('').forEach(function(keyString) {
        asciiSum += keyString.charCodeAt();
    } )
    const hashIndex = asciiSum % this.tableSize;
    return hashIndex
}

// put : key, value 를 받고, hash function을 통해 hashTable에 key, value를 넣는다.
  // hastTable은 초기 empty이고, 변환된 index 위치에 false면 [] 생성, []에 [key, value] 넣는다.
  // 이로써 index가 중복될 경우, 같은 index 위치에 순서대로 [key, value] 추가가 가능하다.
HashMap.prototype.put = function(key, value) {
    const index = this.getHashAddress(key);
    let indexTable = this.hashTable[index]
    if (!indexTable) {
        indexTable = [];
    }
    indexTable.push([key, value]);
    this.hashTable[index] = indexTable;  // 이게 없으면 indexTable에만 추가가 되고 hashTable에는 추가가 안된다.
}

// remove : key 를 받고 hashing 후 해당 indexTable 에 값이 있다면 Table 내 해당 key, value 배열을 삭제한다.
  // Table 내 array [0] 이 key 값에 해당하므로 key 값과 같은 array를 찾고 array의 위치를 indexOf를 통해 찾는다.
  // indexTable 에서 해당 요소를 splice를 통해 삭제한다.
HashMap.prototype.remove = function(key) {
    const index = this.getHashAddress(key);
    let indexTable = this.hashTable[index]
    if (!indexTable) {
        return false;
    }
    indexTable.forEach(function (arrayInTable) {
        if (arrayInTable[0] === key) {
            const arrayIndex = indexTable.indexOf(arrayInTable);
            indexTable.splice(arrayIndex, 1);
        }
    })
    this.hashTable[index] = indexTable;
}

let hm2 = new HashMap(17);

console.log(hm2.getHashAddress('banana'))
hm2.put('monkey','banana')
hm2.put('hippo','apple')
hm2.put('person','strawberry')
console.log(hm2.hashTable);
hm2.remove('elephant')
console.log(hm2.hashTable);

