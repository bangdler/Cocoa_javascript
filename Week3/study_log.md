# Bandler's study note 
## Week 3 (2021-11-15 ~)

### Mission 표준정규분포
1. 알고리즘 자체는 수학적 지식만 있으면 만들 수 있어서 간단했다.
2. 기능에 따라 함수를 나누는 연습.
3. 동기 / 비동기에 대해 드림코딩 유튜브를 봤는데, promise부터 잘 이해가 안간다.

    [드림코딩 12. 프로미스](https://www.youtube.com/watch?v=JB_yU6Oe2eE)
    
4. 동기/비동기 코드 실행 시 이벤트루프에 관한 동영상 - 그림으로 설명을 해놔서 대략적으로 이해가 간다.
   
   [이벤트루프란?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
   
5. 퀵소트 구현에 대해 공부 및 알고리즘 짜보기
    - 퀵정렬 : pivot(중심축) 을 정하고, 중심축 보다 작은 값들은 왼쪽으로 큰 값들은 오른쪽으로 보내고 이를 재귀적으로 반복한다.
    - 시간복잡도 : 평균 O(nlog(n)), 최악 O(N^2)
    - 비교를 위한 기준값(pivot)을 첫번째, 중간, 끝을 지정하냐에 따라 알고리즘이 조금 바뀌는데, 중간점 기준으로 구현하려고 했지만 이해가 잘안돼서 끝점 기준으로 구현했다.
    - 재귀함수를 두개로 나눠서 실행할 경우 첫번째 재귀함수가 먼저 끝나면 첫번째 재귀함수에서 실행한 두번째 재귀함수가 첫번째가 실행된 순서의 역순으로 실행된다.
    
       [퀵소트 5분 이해 youtube](https://www.youtube.com/watch?v=cWH49IKDIiI)
    
       [퀵소트 코드 구현 참고](https://jun-choi-4928.medium.com/javascript%EB%A1%9C-quick-sort-%ED%80%B5-%EC%A0%95%EB%A0%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-76bf539abc0d)
    
6. readline 공부
    - 유튜브 보고 연습 
        
        [난수 만들기](https://hianna.tistory.com/454)
        
        [readline 모듈 초급강의](https://www.youtube.com/watch?v=vU6OTnhj3wM)
    
    - mission은 readline question 만 써서 우선 과목 지정, 과목에 대한 점수를 객체 안의 배열에 넣는 것으로 구현해봤는데 close를 한번 받으면 끝이기 때문에 계속 값을 받도록 구현하기가 어려웠다.
    
### Mission ToDoList

1. Html 문법이 생소하여 생활코딩 복습하였음. 
2. 움직이는 부분과 움직이지 않는 부분을 구분하여 html로 움직이지 않는 부분에 대한 틀을 만들자.
3. 휴지통 그림을 넣으려면 사이트의 npm 을 설치해줘야 한다.
 
    npm install --save @fortawesome/fontawesome-free
    
    ```html
   <!-- 이렇게 파일경로를 추가해줘야 불러올 수 있다. -->
    <script defer src="../../node_modules/@fortawesome/fontawesome-free/js/regular.js"></script>
    <script defer src="../../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js"></script>    
    ```    
   
4. ToDoList 에서 add, remove까지는 어찌 구현을 하였으나 check box 취소선 구현이 안되더라. 다른 사이트를 참고하려고 해도 html 구조가 달라서 적용이 어려웠다. 초기에 구조를 잘 잡는 것도 중요한 것 같다.
5. 크롱의 html 1~3 강의 보며 따라하기.

    [코드스쿼드 유튜브 Html, css, js #1](https://youtu.be/scEcUQKZ5ik)

7. 생활코딩 html, css, js 강의
    - form tag 는 사용자 입력 정보를 받아 그 값을 다른 url로 넘길 때 사용
    - label 은 for 속성을 사용하여 다른 요소와 결합한다. input, button 등과 사용 (다른 요소의 Id 속성값과 같아야 함.)
    - css를 위한 tag : div 는 줄바꿈이 있는 무색무취 태그 / span 은 줄바꿈이 없는 무색무취 태그
        
        [Html tag reference - TCP school](http://tcpschool.com/html-tags/form)
        
6. 참고사이트
    
    [Html, Js 관련 기술블로](https://kyounghwan01.github.io/blog/JS/JSbasic/getElementById/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8)
     
    [css code 작성 규칙](https://jeonghakhur.gitbooks.io/frontend-coding-convention/content/css/)
    
    [게임 - 선택자 맞추기](https://flukeout.github.io/)
    
    [게임 - flex box](https://flexboxfroggy.com/#ko)
    
    [script tag - defer / async](https://ko.javascript.info/script-async-defer)
    
### 수업
1. Browser Rendering 이란? url 주소 등에서 입력 받은 정보를 통해 네트워크 통신하여 html, css, js 등을 응답 받아 화면에 표시하는 방법
2. 이 때 Tree 구조로 보관하고 출력한다.
3. html 문법 관련
    - 하위 class 지정 시 공백을 넣는다. 예) .class1 .class2
    - id 는 #, class 는 . , element 는 element 로 표기
    - Position, Box model 공부할 것
    - document 는 dom tree 구조의 최상위 객체인 html을 의미한다.
    - addEventListener 는 비동기 method 로 e 는 브라우저가 넣어주는 이벤트 객체이다. 
    - e.target는 이벤트가 발생한 요소이다.
    
    
    