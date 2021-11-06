
const { rawListeners } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let data = [];
rl.on('line', function(line){
    data = line.split(' ').map((el) => el);
    rl.close();
}).on('close', function(){
    console.log(Number(data[0]) / Number(data[1]));
    process.exit();
})