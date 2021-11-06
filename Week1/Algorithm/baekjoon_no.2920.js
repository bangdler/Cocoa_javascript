
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let data = [];
// let scale = {
//     'ascending' : [1, 2, 3, 4, 5, 6, 7, 8],
//     'descending' : [8, 7, 6, 5, 4, 3, 2, 1],
// }

// rl.on('line', function(line){
//     data = line.split(' ').map((el) => el);
//     console.log(data)
//     if (data in scale){
//         console.log(object.values(scale))
//         console.log(scale.keys[data])
//     }
//     else {
//         console.log('mixed')
//     }
//     rl.close();
// })

// 모르겠다.
rl.on('line', function(line){
    data = line.split(' ').map((el) => +el);
    console.log(data)
    if (data === [1, 2, 3, 4, 5, 6, 7, 8]){
        console.log('ascending');
    }
    else if (data === [8, 7, 6, 5, 4, 3, 2, 1]){
        console.log('descending');
    }
    else {
        console.log('mixed');
    }
    rl.close();
})