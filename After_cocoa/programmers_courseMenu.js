
// 손님이 주문한 단품메뉴를 바탕으로 코스메뉴 만들어 반환하기.

//각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders,
// "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때,
// "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수


const orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
const course = [2,3,4];

function solution(orders, course) {
    let answer = [];
    let menuCount = {};
    orders.forEach(function(order) {
        console.log(order)
        for(let i = 0; i < order.length - 1; i++) {
            for(let j = i+1; j < order.length; j++) {
                let menu = order[i] + order[j]
                if (!menuCount[menu]) {
                    menuCount[menu] = 1;
                }
                else {
                    menuCount[menu] += 1;
                }
            }
        }

    })
    console.log(menuCount)

    return answer;
}

solution(orders, course)