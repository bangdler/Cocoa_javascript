
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let num1 = Math.floor(Math.random() * 10 + 1);
let num2 = Math.floor(Math.random() * 10 + 1);
let answer = num1 + num2;
console.log(answer)
console.log(typeof(answer))

 rl.question(`what is ${num1} + ${num2} ?\n`, function(userInput) {
     if (Number(userInput.trim()) === answer) {
         rl.close();
     }
     else {
         rl.setPrompt('Incorrect Answer! please try again...\n')
         rl.prompt();
         rl.on('line', function(userInput) {
             if (Number(userInput) === Number(answer)) {
                 rl.close();
             }
             else {
                 rl.setPrompt(`Your answer ${userInput} is Incorrect! please try again!!\n`)
                 rl.prompt();
             }
         })
     }
})
rl.on('close', function(){
    console.log("you got a point!")
})

// 이부분만 있어도 기능은 똑같다.
// rl.setPrompt(`what is ${num1} + ${num2} ?\n`)
// rl.prompt();
// rl.on('line', function(userInput) {
//     if (Number(userInput) === Number(answer)) {
//         rl.close();
//     } else {
//         rl.setPrompt(`Your answer ${userInput} is Incorrect! please try again!!\n`)
//         rl.prompt();
//     }
// })
// rl.on('close', function(){
//     console.log("you got a point!")
// })