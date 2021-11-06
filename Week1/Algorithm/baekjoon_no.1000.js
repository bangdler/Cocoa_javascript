
const readline = require('readline');

const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
});

let data = [];

rl.on('line', function (line){
    data = line.split(' ').map((el) => el);
    // 입력 받는 형식에 따라 바뀐다.
    // data.push(line);
    // data = line.split(' ').map((el) => parseInt(el));
    // data = line.split('').map((el) => el);
    // data = line.split(' ').map((el) => el);
    // data = line.split('').map((el) => +el);
    rl.close();
  });
  rl.on('close', function(){
    console.log(Number(data[0]) + Number(data[1]));
    rl.close();                                         // 없어도 됨.
    process.exit();
  });

console.log('hello')  // 이게 먼저 실행되고 입력값 받음.