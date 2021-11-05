
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let N;
rl.on("line", function(line){
    console.log('print input string ${line}');
    N = Number(line);
    console.log('print input number ${N}');
    rl.close();
})