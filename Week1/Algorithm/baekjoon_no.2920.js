
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let data = [];

// 1. 단순 비교 방법
// rl.on('line', function(line){
//     data = line.split(' ').map((el) => el);
//     console.log(data)
//     if (data.toString() === [1, 2, 3, 4, 5, 6, 7, 8].toString()){
//         console.log('ascending');
//     }
//     else if (data.toString() === [8, 7, 6, 5, 4, 3, 2, 1].toString()){
//         console.log('descending');
//     }
//     else {
//         console.log('mixed');
//     }
//     rl.close();
// })


// 2. indexing 방법
// 1로 시작할때 -> 이전거와 비교하여 +1 인지 확인하고 맞으면 result는 ascending, 아니면 mixed 후 break
// 8로 시작할때는 반대로, 그 외로 시작하면 mixed

let result = '';

rl.on('line', function(line){
    data = line.split(' ').map((el) => +el);
    if (data[0] === 1){
        for (let i = 1; i < 8; i++){
            if (data[i] === data[i-1] + 1){
                result = 'ascending';
            }
            else {
                result = 'mixed';
                break;
            }
        }
    }
    else if (data[0] === 8){
        for (let i = 1; i < 8; i++){
            if (data[i] === data[i-1] - 1){
                result = 'descending';
            }
            else {
                result = 'mixed';
                break;
            }
        }
    }
    else {
        result = 'mixed';
    }
    console.log(result)
    rl.close();
})