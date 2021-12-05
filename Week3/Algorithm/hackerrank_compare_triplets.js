
// a, b 각각 3분야에 대한 점수를 배열로 받는다. 같은 위치의 점수끼리 비교하여 크면 큰 쪽은 +1, 같으면 0 의 점수를 얻는다.
// 최종 점수를 a, b 순서의 배열로 반환

function compareTriplets(a, b) {
    let results = [0, 0];
    for (let i = 0; i < a.length; i++) {
        let diff = a[i] - b[i]
        if (diff > 0) {
            results[0] += 1
            continue;
        }
        else if (diff < 0) {
            results[1] += 1
            continue;
        }
    }
    return results;
}

const a = [17, 28, 30]
const b = [99, 16, 8]

console.log(compareTriplets(a, b))