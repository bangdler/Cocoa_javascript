// 입력 배열을 받아 특수문자가 있는 id는 제외하고, 특수문자가 없는 id 중에서는 숫자를 제거하여 결과 배열로 출력한다.
// 입력값 peoples, 결과값 newpeoples
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
let newpeoples = [];

// 특수 문자가 있는지 test 하고 true, false를 반환하는 함수
function checkSpecial(str) {
    const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    return regExp.test(str);
}

// 숫자가 있는지 확인하고 있는 경우 숫자를 ""으로 변환, 없는 경우 그대로 반환하는 함수
function replaceNum(str) {
    const regExp = /[0-9]/g;
    if (regExp.test(str)) {
        str = str.replace(regExp, "");
        return str;
    }
    else {
        return str;
    }
}

// for를 사용. 배열을 돌면서 특수문자가 없는 경우 replaceNum을 실행하고 반환값을 newpeoples 배열에 추가하여 신규 배열로 반환하는 함수
function filterId(array){
    for (let i = 0; i < peoples.length; i++){
        const id = peoples[i];
        if (!checkSpecial(id)) {
            newpeoples.push(replaceNum(id));
        }
    }
    return newpeoples;
}

console.log(filterId(peoples))

// forEach를 사용. forEach는 객체 요소들이 call back 함수에 순서대로 호출된다.
let newpeoples2 = [];
function filterId2(array){
    array.forEach(function(item){
        if (!checkSpecial(item)) {
            newpeoples2.push(replaceNum(item));
        }
    })
    return newpeoples2;
}

console.log(filterId2(peoples))

// map 사용 시 checkSpecial = true 일 때, 신규 배열에 undefined로 생성됨. 이후 filter로 undefined 거름.
let newpeoples3 = peoples.map(function(item){
    if (!checkSpecial(item)) {
        return replaceNum(item);
    }
})
let newpeoples4 = newpeoples3.filter(function(item){
    item !== undefined;
    return item
})

console.log(newpeoples3)
console.log(newpeoples4)


// filter를 사용하여 특수문자를 거르고, map으로 숫자 변환
let newpeoples5 = peoples.filter(function(item) {
    if (!checkSpecial(item)){
        return item;
    }
})
let newpeoples6 = newpeoples5.map(function(item){
    replaceNum(item);
    return item;
})

console.log(newpeoples5)
console.log(newpeoples6)
