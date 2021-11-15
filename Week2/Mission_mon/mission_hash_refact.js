
// 생성자 함수 HashMap : size에 따른 hashTable 빈 배열을 만든다.

function HashMap(size = 23) {
    this.itemCount = 0;
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
    if (this.containsKey(key)) {
        console.log(`${key} already exists`);
        return false;
    }
    else {
        indexTable.push([key, value]);
        this.itemCount += 1;
    }
    this.hashTable[index] = indexTable;  // 이게 없으면 indexTable에만 추가가 되고 hashTable에는 추가가 안된다. (undefined일 경우 값만 복사 = 깊은 복사)
}

// remove : key 를 받고 hashing 후 해당 indexTable 에 값이 있다면 Table 내 해당 key, value 배열을 삭제한다.
  // Table 내 array [0] 이 key 값에 해당하므로 key 값과 같은 array를 찾고 array의 위치를 indexOf를 통해 찾는다.
  // indexTable 에서 해당 요소를 splice를 통해 삭제한다.
HashMap.prototype.remove = function(key) {
    const index = this.getHashAddress(key);
    let indexTable = this.hashTable[index]
    if (!this.containsKey(key)){
        console.log(`there is no ${key}`)
        return false;
    }
    else {
        indexTable.forEach(function (arrayInTable) {
            if (arrayInTable[0] === key) {
                const arrayIndex = indexTable.indexOf(arrayInTable);
                indexTable.splice(arrayIndex, 1);
                this.itemCount -= 1;
            }
        })
    }
    this.hashTable[index] = indexTable;
}

// containskey : str을 받고 hash table의 동일한 버킷 내 배열에 같은 Key가 있으면 true
HashMap.prototype.containsKey = function(str) {
    const index = this.getHashAddress(str);
    if (!this.hashTable[index]) {
        return false;
    }
    for (let i = 0; i < this.hashTable[index].length; i++) {
        if (this.hashTable[index][i][0] === str) {           // hash table index 안의 배열들 i 의 [0]값이 곧 key
            return true;
        }
    }
    return false;
}

HashMap.prototype.get = function(key) {
    const index = this.getHashAddress(key);
    if (!this.hashTable[index]) {
        console.log(`there is no ${key}`)
        return false;
    }
    for (let i = 0; i < this.hashTable[index].length; i++) {
        if (this.hashTable[index][i][0] === key) {
            console.log(`value is ${this.hashTable[index][i][1]}`)
            return true;
        }
    }
    console.log(`there is no ${key}`)
    return false;
}

HashMap.prototype.isEmpty = function() {
    for (let i = 0; i < this.hashTable.length; i++) {
        if (this.hashTable[i] !== undefined) {
            return false;
        }
    }
    return true; // empty
}

HashMap.prototype.keys = function() {
    let keysArr = [];
    for (let i = 0; i < this.hashTable.length; i++) {
        if (this.hashTable[i] !== undefined) {
            for (let j = 0; j < this.hashTable[i].length; j++) {
                keysArr.push(this.hashTable[i][j][0])
            }
        }
    }
    return keysArr;
}

HashMap.prototype.replace = function(key, value) {
    const index = this.getHashAddress(key);
    if (this.containsKey(key)) {
        for (let i = 0; i < this.hashTable[index].length; i++) {
            if (this.hashTable[index][i][0] === key) {
                this.hashTable[index][i][1] = value;
                return;
            }
        }
    }
    else {
        this.put(key, value)
        return;
    }
}

HashMap.prototype.size = function() {
    console.log(this.itemCount)
    return this.itemCount
}

HashMap.prototype.clear = function() {
    this.hashTable = new Array((this.tableSize));
    this.itemCount = 0;
}

let hm2 = new HashMap(17);

console.log(hm2.getHashAddress('banana'))
hm2.put('monkey','banana')
hm2.put('hippo','apple')
hm2.put('person','strawberry')
hm2.put('hippo','banana')
hm2.remove('ele')
console.log(hm2.hashTable);
console.log(hm2.containsKey('hippo'))
hm2.get('hippo')
console.log(hm2.hashTable.length)
console.log(hm2.isEmpty())
console.log(hm2.keys())

hm2.replace('lion', 'kiwi')
console.log(hm2.hashTable)
hm2.size()
hm2.clear()
console.log(hm2)
hm2.size()
