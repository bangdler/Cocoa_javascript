
// 2016년 (윤년) 1월 1일이 금요일일 때, a월 b일은 무슨 요일인가.

const months = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

const days = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"]

function getDay(a, b) {
    let totalDayDifference = 0;
    for (const month in months) {
        if (month >= a) continue;
        totalDayDifference += months[month];
    }
    totalDayDifference += (b - 1);

    let remainders = totalDayDifference % 7
    return days[remainders]

}

console.log(getDay(1, 2))

console.log(getDay(5, 24))