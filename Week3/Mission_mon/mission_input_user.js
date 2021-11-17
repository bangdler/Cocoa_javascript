
// package.json 에서 type=module 삭제해야됨
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const subjects = {
    math : [],
    english : []
}

function askSubject() {
    rl.question('과목을 입력하세요.\n', function (input) {
        if (input === 'math' || input === 'english') {
            askScore(input);
        } else {
            console.log(`잘못된 입력입니다. 다시 입력해주세요.\n`)
            askSubject();
        }
    })
}

function askScore(subjectResult) {
    rl.question('점수를 입력하세요.\n', function (input) {
        let subjectKey = subjects[subjectResult]
        input = Number(input)
        if (input >= 0) {
            subjectKey.push(input)
            askKeepGoing()
        }
        else {
            console.log('잘못된 점수입니다. 다시 입력해주세요.\n')
            askScore(subjectResult);
        }
    })
}

function askKeepGoing() {
    rl.question('더 입력하시겠습니까? (yes / no)\n', function(input) {
        if (input === 'yes' && 'Yes') {
            askSubject()
        }
        else {
            rl.close()
        }
    })
}

//     rl.setPrompt(`${subject[i]} 점수를 입력하세요.\n`)
//     rl.prompt();
//     rl.on('line', function(input) {
//         data.push(input);
//     })
// rl.close();

rl.on('close', function() {
    console.log(subjects)
})


askSubject()