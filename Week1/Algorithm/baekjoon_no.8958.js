
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let N = null;
let count = 0;
let data = [];
let results = [];


// test case 숫자에 맞는 ox input 에 따라 totalscore 반환하기
// o 가 연속될 경우 점수는 +1 되므로 for문 내에서 o일 경우 score에 +1을 해주고 x일 경우 0으로 초기화
// total score에 계속 score를 더한 후 각 결과를 result 배열에 추가하여 for문을 통해 한줄씩 출력한다.
rl.on('line', function(line){
    if (!N){                      // test case 숫자 입
        N = +line;
    }
    else {
        let score = 0;
        let totalscore = 0;                             // totalscore가 전역변수로 있을 경우 두번째 이후에 값이 누적된다. 초기화를 위해 지역변수로 변경!
        for (let i = 0; i < line.length; i++){          // 입력값이 공백으로 구분되어 있지 않으므로 바로 line을 사용하여 값을 구한다. ( data = line.split('').map((el) => el);  불필요 )
            if (line[i] === 'O'){
                score += 1;
                totalscore += score
            }
            else if (line[i] === 'X') {
                score = 0;
            }
        }
        results.push(totalscore);
        count += 1;
    }
    if (count === N){
        rl.close();
    }
}).on('close', function(){         // 입력이 모두 끝난 후 출력이 실행된다.
    for (let i = 0; i < N; i++)
        console.log(results[i]);
    process.exit();
})