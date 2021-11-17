// 동기
// const baseData = [1,2,3,4,5,6,100];
//
// function foo() {
//     baseData.forEach((v,i) => {
//         console.log("sync ", i);
//         bar();
//     });
// }
//
// function bar() {
//     baseData.forEach((v,i) => {
//         debugger;
//         console.log("sync 2", i);
//     });
// }
//
// foo()


function plus() {
    let a = 1;
    setTimeout( ()=>console.log(++a), 1000);
    return a;
}
// 비동기
//const result = plus();
//console.log('result :', result);

const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
    for(let i=0; i<arr.length; i++) {                       // var 를 쓰면 전역변수라서 7 만 출력된다.
        setTimeout( () => fn(i), 1000);
    }
}

const asyncRun1 = (arr, fn) => {
    arr.forEach((v,i) => {
        setTimeout( () => fn(i), 1000);
    });
}

function sync() {
    baseData.forEach((v,i) => {
        console.log("sync ", i);
    });
}

function sync2() {
    baseData.forEach((v,i) => {
        console.log("sync 2 ", i);
    });
}
// 비동기 + 동기 + 동기
//asyncRun1(baseData, idx =>console.log(idx));
// sync();
// sync2();


// 비동기 + 비동기
// asyncRun2 실행 -> arr.forEach -> setTimeout 실행과 동시에 web API - callback que 로 이동 ->
// stack 에 있던 asyncRun2 / arr.forEach return -> 비어있는 stack에 settimeout 실행, 다시 callback que로 이동과 console.log(cb1)실행
// 비어있는 stack에 최종 settimeout 실행 console.log(cb2), fn(i)
const asyncRun2 = (arr, fn) => {
    arr.forEach((v,i) => {
        setTimeout(() => {
            setTimeout(() => {
                console.log("cb 2");
                fn(i)
            },1000);
            console.log("cb 1");
        }, 1000);
    });
}

//asyncRun2(baseData, idx =>console.log(idx))

// 아래 부분부터는 추가 공부가 필요함...

// promise 맛보기
function runAsync(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('서버에서 온 사람입니다');
        }, time);
    });
}

function runAsync2(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('3명입니다');
        }, time);
    });
}

const cb1 = result => {
    console.log('누구세요? :', result);
    return runAsync2(3000);
};

const cb2 = result2 => {
    console.log('몇명이에요? :', result2);
}

function main() {
    const asyncObj = runAsync(1000);
    asyncObj.then(cb1).then(cb2);
    console.log('함수는 종료');
}

//main();

// async, await 사용
async function main2 () {
    const str1 = await runAsync(1000);
    cb1(str1);

    const str2 = await runAsync2(1000);
    cb2(str2);
    console.log('함수는 종료');
}

//main2()

// result 불러오기, async 비교
// function run() {
//     const result = main2();
//     console.log('함수는 종료');
// }

async function run() {
    const result = await main2();
    console.log(result);
}
run();