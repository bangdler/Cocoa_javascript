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
const result = plus();
console.log('result :', result);

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
asyncRun1(baseData, idx =>console.log(idx));
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

asyncRun2(baseData, idx =>console.log(idx))
