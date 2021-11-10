
// 생성자 함수 HashMap : init 객체를 설정하고, init 함수 값을 참조가 아닌 복제 새로운 hashmap 객체를 만든다.
function HashMap() {
    this.initmap = {'sample':'value'};
    this.hashmap = {};
    for (let key in this.initmap) {
        this.hashmap[key] = this.initmap[key];
    }
}

HashMap.prototype.put = function(key, value) {
    if (!this.containsKey(key)) {
        this.hashmap[key] = value;
    }else{
        console.log("Key already exists.")
    }
}

HashMap.prototype.remove = function(key) {
    delete this.hashmap[key];
}

HashMap.prototype.containsKey = function(key) {
    return Object.keys(this.hashmap).includes(key);
}

HashMap.prototype.get = function(key) {
    return this.hashmap[key];
}

HashMap.prototype.isEmpty = function() {
     if (Object.keys(this.hashmap).length > 0) {
         return true;
     }
     else {
         return false;
     }
}

HashMap.prototype.keys = function() {
    return Object.keys(this.hashmap);
}

HashMap.prototype.replace = function(key, value) {
    if (this.containsKey(key)) {
        this.hashmap[key] = value;
    }else {
        console.log("Key does not exist.")
    }
}

HashMap.prototype.size = function() {
    return Object.keys(this.hashmap).length;
}

HashMap.prototype.clear = function() {
    let i = 0;
    let keys = hm.keys()
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        hm.remove(keys[i])
    }
    for (let key in this.initmap) {
        this.hashmap[key] = this.initmap[key];
    }
}

let hm = new HashMap();

console.log(hm.hashmap)
hm.put('name', "bangtae")
hm.put('name', "32")
hm.put('age', "32")
hm.put("sex", "male")
hm.put("job", "NaN")
console.log(hm.hashmap);
hm.remove("age")
console.log(hm.hashmap);

console.log(hm.containsKey('age'))
console.log(hm.containsKey('sex'))
console.log(hm.get('job'))
console.log(Object.keys(hm.hashmap).length)
console.log(hm.isEmpty())
console.log(hm.keys())
hm.replace('name', 'juyoung')
console.log(hm.hashmap)
console.table(hm.hashmap)
console.log(hm.size())

hm.clear()
console.log(hm)
