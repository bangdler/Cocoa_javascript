
// 손님이 주문한 단품메뉴를 바탕으로 코스메뉴 만들어 반환하기.
// 단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다.
// 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.

// 각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders,
// "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때,
// "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수

// 정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return 해주세요.
//     배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.
//     만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
//     orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.

const orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
const course = [2,3,4];

function solution(orders, course) {
    let answer = [];
    // course 를 순회
    course.forEach(function(num) {
        // course 숫자에 따른 menu 조합과 총 주문 횟수를 담은 객체
        let menuCount = {};
        // orders 를 순회하며 정해진 갯수의 menu 조합을 구한다.
        orders.forEach(function(order) {
            // 문자열을 배열로 바꾼뒤 menu 조합을 구한다.
            let orderArr = order.split('')
            if(orderArr.length < num) return;
            // combination 함수는 배열로 조합을 반환하기에 문자열 오름차순 정리 후 join 으로 문자열로 합쳐준다.
            let orderCombination = combination(orderArr, num).map((x) => (x.sort().join('')))
            // 각 메뉴 조합의 갯수를 추가한다.
            if(orderCombination){
                orderCombination.forEach(function(order) {
                    if(!menuCount[order]) {
                        menuCount[order] = 1;
                    }
                    else{
                        menuCount[order] += 1;
                    }
                })
            }
        })
        // 최대 메뉴 갯수를 구한다.
        let menuVals = Object.values(menuCount)
        let maxMenu= Math.max(...menuVals)
        // 최대 갯수를 value 로 가진 menu 를 answer에 담는다.
        for(let menu in menuCount) {
            if(menuCount[menu] === maxMenu && maxMenu >= 2) {
                answer.push(menu)
            }
        }
    })
    return answer.sort();
}

// 배열에서 원하는 조합의 배열을 담아 반환함.
function combination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((v) => [v]);
    arr.forEach((v, idx, arr) => {
        const fixed = v;
        const restArr = arr.slice(idx + 1);
        const combinationArr = combination(restArr, selectNum - 1);
        const combineFix = combinationArr.map((v) => [fixed, ...v]);
        result.push(...combineFix);
    });
    return result;
}

let a = ['a','c','b']
let b = a.sort()
console.log(b)
console.log(solution(orders, course))

//console.log(combination([1,2,3], 4))