
// 가로 길이가 Wcm, 세로 길이가 Hcm인 직사각형 종이가 있습니다. 종이에는 가로, 세로 방향과 평행하게 격자 형태로 선이 그어져 있으며,
// 모든 격자칸은 1cm x 1cm 크기입니다. 이 종이를 격자 선을 따라 1cm × 1cm의 정사각형으로 잘라 사용할 예정이었는데,
// 누군가가 이 종이를 대각선 꼭지점 2개를 잇는 방향으로 잘라 놓았습니다. 그러므로 현재 직사각형 종이는 크기가 같은 직각삼각형 2개로 나누어진 상태입니다.
// 새로운 종이를 구할 수 없는 상태이기 때문에, 이 종이에서 원래 종이의 가로, 세로 방향과 평행하게 1cm × 1cm로 잘라 사용할 수 있는 만큼만 사용하기로 하였습니다.
// 가로의 길이 W와 세로의 길이 H가 주어질 때, 사용할 수 있는 정사각형의 개수를 구하는 solution 함수를 완성해 주세요.

//https://leedakyeong.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%A9%80%EC%A9%A1%ED%95%9C-%EC%82%AC%EA%B0%81%ED%98%95-in-python
// 잘려진 사각형의 수는 격자점이 있을 때와 없을 때 다르다. 격자점 여부는 최대공약수와 연관됨.
// 격자점이 존재하지 않는 것 : '(가로) + (세로) - 1'
// 격자점이 존재하는 것(최대공약수가 1보다 큰 것) : '(가로) + (세로) - 1 - (격자점의 개수)' 또는 '(가로) + (세로) - (가로 세로 최대공약수)'

function solution(w, h) {
    let answer;
    // 총 사각형의 수
    let total = w * h;
    let useless;
    // 긴 부분을 y , 짧은 부분을 x;
    const y = w > h ? w : h;
    const x = w > h ? h : w;
    const gcd = getGcd(y, x);
    // 최대공약수가 1보다 큰 경우(격자점 존재)
    if(gcd > 1) {
        useless = x + y - gcd
    }
    else {
        useless = x + y - 1;
    }
    answer = total - useless
    return answer;
}

// 최대공약수 구하기, 유클리드호제법. (a > b, != 0 의 경우)
function getGcd(a, b) {
    const r = a % b;
    if(r === 0) {
        return b;
    }
    else {
        return getGcd(b, r);
    }
}

console.log(getGcd(10, 5))