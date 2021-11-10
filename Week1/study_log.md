# Bandler's study note
## Week 1 Day 1 (2021-11-01)

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

## Day 3 (2011-11-03)

### 문법 공부
1. Object vs Array

    Object :  순서가 없는 정보를 정리하기에 좋다. 이름으로 식별자를 줄 수 있다. {} 사용하여 표현
    
    Array : 정보를 순서에 따라 정돈, 고유한 식별자(숫자)가 있다. [] 사용하여 표현
    ```javascript
    //object
    let roles = {
        'red' : 'apple',
        'yellow' : 'banana'
    }
    console.log(roles.red)
    
    //object for in 함수
    //변수는 key 값을 보여주고, value는 별도로 object[]를 통해 나타냄. 
    for(let name in roles){
        console.log('object =>', name, 'value =>', roles[name]);
    }
    ```
    
2. this, new

    this는 조금 찾아봤지만 바인딩, 명시, apply, call 등 개념이 어렵고 헷갈린다.
    this : 함수가 객체 안에서 사용될 때, 그 함수가 자신이 속해있는 객체를 참조할 수 있도록 약속된 키워드
    - 참고 사이트
        
        [this 의미, 명시 관련 블로그](https://191125.tistory.com/59)
        
        [생활코딩 - 데이터와 값을 담는 그릇으로서 객체](https://opentutorials.org/course/3332/21146)
        
        [new - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new)
        
3. 모던자바스크립트 10장 객체 리터럴, 13장 스코프 반절 읽음.

### Mission - n진수 게임

1. 추가 문제 - 사용자 입력값 받기

    readline을 이용하라는 조교의 힌트로 어찌어찌 비슷한 기능을 구현하는 정도로만 짤 수 있었다. 
    - 참고 사이트

        [readline 참고](https://velog.io/@grinding_hannah/JavaScript-Node.js%EC%97%90%EC%84%9C-readline-%EC%9E%85%EB%A0%A5%EB%B0%9B%EA%B8%B0)
        
        [readline 참고2](https://lamarr.dev/javascript/2020/04/06/01.html)
    
2. 진수변환 문제를
    - 총 3개의 함수로 구성
        1. n진법으로 숫자 변환
        2. n진법의 숫자를 m명이 t개의 숫자로 말할 경우의 숫자 배열 구하기
        3. 숫자 배열 중 p번째 사람이 말해야하는 숫자 배열 구하기

   n진법 변환하는 함수 만드는 데에만 오후를 보냈다. 중요한 사항은 아래와 같다.
    - parseInt(숫자)는 정수값을 나타내어 몫을 구할 때 사용가능
    - 10진법 이상의 경우 A~F 입력하도록 별도의 객체를 만듦.
    - 숫자가 n보다 작을 때로 별도 구분했으나, n 이상인 코드만으로 몫이 0일때 작동함. 하여 n보다 작을 때 삭제, 0인 경우만 추가하여 수정함.
    - 숫자를 n진수로 변환한 배열들을 합칠 때, push(...arr)를 사용하여 배열의 개별요소로 합침. 그냥 push할 경우 각 배열이 하나의 요소로 합쳐짐.
    
        ex) [[0], [1], [1,0]]
    - 문제 이해가 조금 어려웠는데, m명이 t개씩 말하는 경우 배열의 길이는 총 m * t이며, n진수로 변환한 배열의 길이가 m * t 보다 작을 때까지 for문 구성함. 변환되는 숫자에 따라 m * t보다 길어질 수 있음.
    - 별개로 m명 중 p번째 사람이 위에서 구한 배열의 m * t 미만의 항까지 index 한 후, 본인이 해당되는 값을 별도의 배열에 추가하는 함수 구성함. 
    - 참고 사이트
    
        [배열합치기](https://hianna.tistory.com/397)
        
        [카카오 유사문제](https://programmers.co.kr/learn/courses/30/lessons/17687)
 
## Day 4 (2011-11-04)
 
### 수업 Review
1. Convention : Code를 짤 때 정한 규칙 = Style guide
2. Git 형상기반 관리 : Git을 사용한 버전관리
3. API : Application Programming Interface(응용 프로그램 프로그래밍 인터페이스)는 응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻한다. (by. 위키백과)
    
   - 사용자 간에 주고 받는 interface에 대한 약속이라고 보면 될 듯.
 
4. Class : 객체를 만드는 틀이라고 하는데 추가 공부가 필요함.
5. CLI : Command Line Interface 로 node a.js / py a.py 와 같이 실행에 관련된 규칙
6. data types : js 에도 존재하나 개발, 즉 구현 시에는 없다. type of 사용할 경우 []를 배열이 아닌 객체로 인식하는 등의 오류가 있다. toString.call() 이 더 정확하다고 함.
7. back-end : 요청에 대해 응답을 주는 부분에 대한 프로그래밍, 주로 [요청 분석 - 자원 찾기 - 자원 가공 - 클라이언트에 제공]으로 구성
 
### Mission n진수 게임 Review
1. 남의 코드 설명 듣고 이해하는 것도 쉽지 않다. 다양한 방법, method를 사용해서 이해하기 위해 하나하나 질문하게 된다...
2. 내 코드 설명하는 것도 쉽지 않다.
 
### Mission - 배열 factorial
1. factorial 을 for 문과 재귀함수를 통해 만들었는데, 재귀함수를 이용한 표현은 직감적으로 와닿지가 않는다.
 
### Mission - 배열 특수문자/숫자 filter
1. 정규표현식을 사용하여 특수문자, 숫자가 있는 요소를 구별할 수 있었다.

    ```javascript
    // 이유는 모르겠으나 하기 블로그에서 복붙한 아래 첫번째 정규표현식을 사용했을 때, true / false 값이 제대로 나오지 않았다. 그래서 두번째 방식으로 변경함.
       // 첫번째의 +-= 부분에서 -가 어디에서 어디까지라는 뜻으로 오류가 발생한 것으로 확인됨.
    const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
    const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
   
   // 정규표현식 regExp method 사용하여 문자가 포함되어있는지 확인(test),교체(replace)함.
   
   function checkSpecial(str) {
       const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
       return regExp.test(str);
   }
   
   const regExp = /[0-9]/g;
   if (regExp.test(str)) {
       str = str.replace(regExp, "");
       return str;
   }
   ```
    - 참고사이트
    
        [정규표현식 사용예](https://curryyou.tistory.com/208)
        
        [정규표현식 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)
    
2. filter와 map 의 경우 배열을 새로 생성하는데, filter는 참인 조건만 배열에 반환하고, map은 모든 값을 순회하는데 내부 조건문에서 false를 지날 경우 undefined 로 반환되어 filter를 통해 undefined를 제거해주어야했다.

## Day 5 (2011-11-05)
### Desktop 환경 설정
1. 여태 맥북, 웹스톰을 사용하다가 울산에 내려와 데스크탑을 사용해야해서 환경 설정을 다시 해야만 했다. 
2. Visual Studio를 써보려고 했는데 node.js 실행이 안되서 환경설정 등 오전 내내 실랑이를 벌였다. 또 Visual Studio 초기 설정이 자동 저장이 아니라 Code를 수정했는데도 반영이 안됐는데 이것 때문에도 한참 고민했다.
   
    [node.js 실행 시 인식 오류 관련 사이트](https://blog.naver.com/oyj1999karma/222499028506)


3. Git Clone, Pull 하는 것도 어려워서 몇 번을 초기화 후 다시 Clone했다. 익숙해지려면 한참 걸릴 것 같다.
    - Clone 시 user name 등의 정보를 가져오는 것으로 추정된다. 파일 수정 후 Commit 및 Push 할 때 별도의 id 적는 과정이 없었음. 컴퓨터에 global이 본인이기 때문인듯.
    - Clone 은 초기에 repository를 동기화, Pull은 원격 저장소의 코드를 로컬에 merge, fetch는 로컬에 가져오나 merge하지 않고 비교만 한다.
    
        [git 용어 관련 사이트](https://sabarada.tistory.com/75)

### Mssion - 배열 평균 구하기
1. JS에서는 평균에 대한 별도 함수가 없어 for 문으로 구성했는데 마음에 안든다. 
2. Map을 통한 배열 순환, Math Method를 이용한 최대, 최소 구하기

    [Math method 관련 사이트](https://hianna.tistory.com/487)
    
## Weekend
### baekjoon algorithm
1. 한 줄 입력, 여러줄 입력, 테스트 case 입력 방식에 대해 공부
2. readline은 조금 알겠고, fs는 잘 모르겠다.
3. 문자열을 ascii code로 변경 시 charCodeAt 사용한다. 반대는 fromCharCode
    
    [js 알고리즘 풀 때 입력방식 정리](https://grap3fruit.dev/blog/%EA%B5%AC%EB%A6%84(goorm),-%EB%B0%B1%EC%A4%80(BOJ)-%EC%BD%94%EB%94%A9-%ED%85%8C%EC%8A%A4%ED%8A%B8-JavaScript%EB%A1%9C-%EC%9E%85%EB%A0%A5%EB%B0%9B%EB%8A%94-%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC)