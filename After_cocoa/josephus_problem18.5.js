
// 원형으로 모인 n명의 사람 중 1번째가 자살하면, 시계방향으로 k번째 사람이 자살한다. 마지막 2명은 살아남는다. 2명의 위치를 반환한다.

function josephus(n, k) {
    let list_n = [];
    for (let i = 1; i <= n; i++) {
        list_n.push(i)
    }
    let killIndex = 0;
    while (n > 2) {
        list_n.splice(killIndex,1)
        n--;
        killIndex += k - 1
        if (killIndex >= n) {
            killIndex = killIndex - n
        }
    }
    return list_n;
}

console.log(josephus(40,3))