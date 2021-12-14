
// 조건에 맞게 신규 아이디 추천하기
// 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
// 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
// 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
// 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
// 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
// 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
//     만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
// 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

function solution(new_id) {
    let answer = '';
    new_id = filter_1(new_id);
    new_id = filter_2(new_id);
    new_id = filter_3(new_id);
    new_id = filter_4(new_id);
    new_id = filter_5(new_id);
    new_id = filter_6(new_id);
    new_id = filter_7(new_id);
    answer = new_id
    return answer;
}

function filter_1(id) {
    return id.toLowerCase();
}

function filter_2(id) {
    let reg = new RegExp(/[^\w\-\_\.]/g)
    return id.replace(reg, '')
}

function filter_3(id) {
    let reg = new RegExp(/\.\.+/g)
    return id.replace(reg,'.')
}

function filter_4(id) {
    return id.replace(/^\.|\.$/g,'')
}

function filter_5(id) {
    if (id === '') {
        id = 'a'
    }
    return id
}

function filter_6(id) {
    if (id.length >= 16) {
        id = id.substring(0, 15)
        id = id.replace(/\.$/g,'')
    }
    return id
}

function filter_7(id) {
    if (id.length < 3) {
        let reg = new RegExp(/.$/g)
        let lastStr = reg.exec(id);
        console.log(lastStr)
        while (id.length < 3) {
            id += lastStr;
        }
    }
    return id
}

let id = '...!@BaT#*..y.abcdefghijklm'
let id2 = 'bat.y.abcdefghimn'
id = solution(id)
console.log(id)
id2 = filter_6(id2)
console.log(id2)