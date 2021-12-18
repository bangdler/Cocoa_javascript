
// 숫자와 숫자영어단어가 섞인 문자열을 숫자로 변환한다.

function solution(s) {
    let answer = 0;
    let nums = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    }
    // 정규식에 변수를 넣기 위해서는 RegExp 객체를 활용해야 한다.
    for(let string in nums) {
        let reg = new RegExp(string, "g");
        s = s.replace(reg, nums[string])
    }
    answer = Number(s);
    return answer;
}

let s = "one4seveneightone"
console.log(solution(s))
