
// 두마리 캥거루가 뛰는 위치, 뛰는 거리가 주어질 때 뛰다보면 둘의 위치가 같아질 수 있는지 아닌지를 반환하는 함수.

// Complete the function kangaroo in the editor below.
//     kangaroo has the following parameter(s):
// int x1, int v1: starting position and jump distance for kangaroo 1
// int x2, int v2: starting position and jump distance for kangaroo 2

// Returns
// string: either YES or NO

// 캥거루 위치가 같아지는 x 를 구하는 방정식을 코드로 구현. x 가 0 이상, 정수일 경우에 YES
function kangaroo(x1, v1, x2, v2) {
    let diffStarting = x1 - x2;
    let diffJump = -(v1 - v2);
    let divideDiff = diffStarting / diffJump;
    if (divideDiff > 0 && divideDiff === parseInt(divideDiff)) {
        return "YES"
    }
    return "NO"
}

console.log(kangaroo(0,3,4,2))