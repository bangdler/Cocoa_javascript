# Bandler's study note
## Day 1 (2021-11-01)

#### Mission 1
1. 원의 경우 반지름(또는 원의 갯수), 사각형의 경우 높이와 너비, 사다리꼴의 경우 윗변 아랫변 높이가 필요함.
   - 도형 따라 1~3개 인자가 input 으로 들어올 때, a, b, c 지정 후 인자가 필요 없는 경우를 대비하여 기본값을 1로 지정하였음. (a = a || 1)
2. 이 경우 d, e 등 추가 인자가 들어올 경우 error가 발생할 수 있으므로 ...params 를 통해 여러 인자를 받을 수 있도록 수정하여 list 형식으로 받음.
3. getCircle 함수 안에 2개 인자(높이, 갯수)가 있으나 두번째 인자가 input 되지 않는 경우가 있으므로 기본값 지정이 필요함. (b = params[1] || 1) 
4. getCircle 함수 안에 return을 적지 않아 결과값으로 undefined 나옴.
5. for 문을 활용한 n개의 원 넓이 합 구하기
``` javascript
   var area = 0;
   for (var i = 0; i < iters; i++) {
       area = area + getCircle(radius + i)
   }
```
## Day 2 (2011-11-02)

#### Mission 1 Code Review
1. 초기 코드는 if 문으로 연결된 하나의 function으로 구성. 하나의 함수가 너무 길어지게 되면 가독성이 떨어지고 수정에 어려움이 있을 수 있으므로 여러개의 함수로 코딩하는 것이 좋다.
2. var 은 2015년 이전의 문법으로 let, const를 사용할 것.
3. == 대신 === 사용하는게 대부분 좋다. 

- 참고 사이트
    
   [var, let, const 차이](https://velog.io/@bathingape/JavaScript-var-let-const-%EC%B0%A8%EC%9D%B4%EC%A0%90)
   
   [같은조 hemdi님 블로그](https://sprout-capybara-6f1.notion.site/MISSION-36871a3503704621b4ae973fb6ef2bb5)
   (코드 참고용 : 갈 길이 멀구나를 느낀다. input에 대한 유효성을 어떻게 체크할 것인)
   
   

#### Mission 1 Code update 1st
1. 여러개의 함수로 나눴을 때 각 함수의 return과 최종 함수의 return이 무엇을 나타내야하는지 잘 모르겠다.
2. 1.1) result 부분에서 다른 함수의 return 값을 result 로 지정하였으나 result in undefined 오류가 발생했었다. 뭐 바꾼 건지 모르겠는데 어느 순간 오류가 나지 않는다...let 선언이  문제 같기도 하다.

    : Scope 공부하기. if문 안에서 변수선언하고 if문 밖에서 호출 불가
3. 1.1) `$ 를 사용하면 2개 변수를 array로 추가 가능한데, 표현식에 대해 공부가 필요하다.
4. 1.1) getArea 함수 내에 전역변수(logging_~) 사용, result에 대해 별도 선언이 없어 붉게 표시됨.
5. 1.2) getArea 함수 내 전역변수 삭제, 함수 기능을 figure, result 를 return만 하도록 수정
6. 1.2) makeExecutionSequence 함수가 전역변수 logging_에 각 값을 추가하도록 수정

```javascript
// 1.1
function getArea(figure, ...params) {
    if (figure === 'circle') {
        logging_figure.push(figure);
        logging_results.push(getCircle(...params));
        logArr.push(`${figure}, ${getCircle(...params)}`)
        result = getCircle(...params);
    }
}
```

```javascript
// 1.2
function getArea(figure, ...params) {
    let result;
    if (figure === 'circle') {
        result = getCircle(...params);
    } else if (figure === 'rect') {
        result = getRect(...params);
    } else if (figure === 'trapezoid') {
        result = getTrapezoid(...params);
    }
    console.log(result)
    return [figure, result]
}

function makeExecutionSequence(vals) {
    logging_figure.push(vals[0]);
    logging_results.push(vals[1]);
}

makeExecutionSequence(getArea('trapezoid', 10, 2, 4))
makeExecutionSequence(getArea('circle', 5, 7));
makeExecutionSequence(getArea('rect', 10, 1));
makeExecutionSequence(getArea('circle', 10));

```
 

### Mission 1 Code update 2nd
1. Review 때 크롱이 말해준 방식으로 함수 내 매개변수를 받아 지역변수로 list push 후 return 값을 마지막 행 전역변수 값에 덮어쓰기하여 전역변수를 update함.
2. 전역변수를 함수 내에 사용하지 않을 수 있음. 
```javascript
function getArea(figure, results, figures, ...params) {
    let result;
    if (figure === 'circle') {
        figures.push(figure);
        results.push(getCircle(...params));
        result = getCircle(...params);
    }
    console.log(result)
    return results, figures
}

let logging_figure = [];
let logging_results = [];

logging_results, logging_figure = getArea('trapezoid', logging_results, logging_figure, 10, 2, 4)
logging_results, logging_figure = getArea('circle', logging_results, logging_figure, 5, 7)

```