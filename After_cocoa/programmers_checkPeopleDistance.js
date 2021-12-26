
// 코로나 바이러스 감염 예방을 위해 응시자들은 거리를 둬서 대기를 해야하는데 개발 직군 면접인 만큼
// 아래와 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있습니다.
// 대기실은 5개이며, 각 대기실은 5x5 크기입니다.
// 거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
// 단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.

const place = ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"]

// 한 대기실의 문자열 배열을 2차원 배열로 변환한다.
function makePlaceArray(place) {
    const array = place.map(row => row.split(''))
    return array
}

// const placeArray = makePlaceArray(place)

// 2차원 배열을 탐색하여 거리두기가 지켜지지 않는 경우를 구한다.
function searchArray(placeArr) {
    const mapSize = 5;
    // 위 아래 좌 우 기준과 대각선 기준으로 나눈다.
    const dirs1 = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    const dirs2 = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    let answer = 1;
    // 2차원 배열 탐색하여 P 인 경우에 대해 추가 조건을 본다.
    for (let i = 0; i < placeArr.length; i++) {
        for (let j = 0; j < placeArr[i].length; j++) {
            let data = placeArr[i][j]
            if(data === 'P') {
                // dirs1 탐색하여 P 이면 0, O 이면 해당 방향으로 한칸 더 탐색하여 P 이면 0;
                for (let k = 0; k < dirs1.length; k++) {
                    // map size 에 따라 범위 내인지 검사.
                    if (0 <= i + dirs1[k][0] && i + dirs1[k][0] < mapSize && 0 <= j + dirs1[k][1] && j + dirs1[k][1] < mapSize) {
                        let nearby = placeArr[i + dirs1[k][0]][j + dirs1[k][1]];
                        if (nearby === 'P') {
                            answer = 0;
                            return answer;
                        }
                        else if (nearby === 'O') {
                            if (0 <= i + 2*dirs1[k][0] && i + 2*dirs1[k][0] < mapSize && 0 <= j + 2*dirs1[k][1] && j + 2*dirs1[k][1] < mapSize) {
                                nearby = placeArr[i + 2*dirs1[k][0]][j + 2*dirs1[k][1]];
                                if (nearby === 'P') {
                                    answer = 0;
                                    return answer;
                                }
                            }
                        }
                    }
                }
                // dir2 탐색하여 P 이면 기준점에서 i, j 한 방향씩 간 위치가 하나라도 O 이면 0;
                for (let r = 0; r < dirs2.length; r++) {
                    if (0 <= i + dirs2[r][0] && i + dirs2[r][0] < mapSize && 0 <= j + dirs2[r][1] && j + dirs2[r][1] < mapSize) {
                        let nearby = placeArr[i + dirs2[r][0]][j + dirs2[r][1]];
                        if (nearby === 'P') {
                            if (placeArr[i + dirs2[r][0]][j] === 'O' || placeArr[i][j+dirs2[r][1]] === 'O') {
                                answer = 0;
                                return answer;
                            }
                        }
                    }
                }
            }
        }
    }
    return answer;
}

function solution(places) {
    let answer = [];
    places.forEach(function(place) {
        let placeArray = makePlaceArray(place);
        let checkDistance = searchArray(placeArray);
        answer.push(checkDistance)
    })
    return answer;
}

const places = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]

console.log(solution(places));
