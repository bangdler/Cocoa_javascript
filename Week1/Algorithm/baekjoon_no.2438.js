
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 첫번째 방법
let data = ''
rl.on('line', function(line){
     for (let i = 0; i < Number(line); i++){
         data = data + '*'
         console.log(data);
     }
     rl.close()
})

// 두번째 방법
rl.on('line', function(line){
    for (let i = 1; i <= Number(line); i++){
        star = '*'.repeat(i)
        console.log(star);
    }
    rl.close()
})