

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let data = [];

rl.on('line', function (line) {
    data = line.split('').map((el) => el);
    rl.close();
})
    .on('close', function () {
        data.filter((element) => element !== '')
        console.log(data);
        process.exit();
    });