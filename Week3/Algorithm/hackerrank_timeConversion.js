
// 12 hour format 을 24 hour format 으로 변경하기.
// Example
//
//input s = '12:01:00PM'
// Return '12:01:00'
//
//input s = '12:01:00AM'
//Return '00:01:00'

function timeConversion(s) {
    const meridiem = s.substring(8, 9)
    let hour = Number(s.substring(0, 2))
    if (meridiem === 'A' && hour === 12) {
        hour = '00'
        let sReg = new RegExp(/^(\d+)/g)
        s = s.replace(sReg, hour)
        //let myS = sReg.exec(s)  공부용...
        //console.log(myS[0]) => 앞의 2자리 숫자
        //console.log(sReg.exec(s)) => null (왜 대응값이 있는데 null 을 반환할까?)
        //console.log(myS) => 배열 반환
    }
    else if (meridiem ==='P' && hour < 12) {
        hour = hour + 12;
        hour = hour.toString();
        let sReg = new RegExp(/^(\d+)/g)
        s = s.replace(sReg, hour)
    }
    return s.substring(0, 8)
}

let s = '07:12:12AM'
console.log(timeConversion(s))