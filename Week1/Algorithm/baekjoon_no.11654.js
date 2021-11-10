

// const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let results = [];

rl.on('line', function(line){
    for (let i = 0; i < line.length; i++){
        let ascii = line.charCodeAt([i]);
        results.push(ascii);
    }
    console.log(results.join());
    rl.close();
})


