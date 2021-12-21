
// 10진법 수를 124 나라의 숫자로 바꾸기.
// 예를 들어서 124 나라에서 사용하는 숫자는 다음과 같이 변환됩니다.
//
// 10진법 124 나라 10진법 124 나라
// 1	  1	     6	    14
// 2	  2	     7	    21
// 3	  4	     8	    22
// 4	  11	 9	    24
// 5	  12	10	    41

function solution(n) {
    let answer;
    let numbers = [];
    get124(numbers, n)
    answer = numbers.reverse().join('')
    return answer;
}


// 한자리씩 124 나라 숫자로 바꾸어 배열에 넣어준다. 이때 1의 자리숫자부터 들어간다.
function get124(array, n) {
    let quotient = parseInt(n/3);
    // 나머지가 0일 경우 몫이 1 올라가기 때문에 -1 해준다.
    if(n%3 === 0) {
        array.push(4);
        quotient = quotient - 1;
    }
    else if(n%3 === 1) {
        array.push(1);
    }
    else if(n%3 === 2) {
        array.push(2);
    }
    // 몫이 1보다 큰 경우 재귀함수
    if(quotient > 0) {
        return get124(array, quotient)
    }
    else {
        return array
    }
}

console.log(get124([],14))
console.log(solution(14))