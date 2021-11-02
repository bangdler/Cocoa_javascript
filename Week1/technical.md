# Technical Note

## Day 1 (2021-11-01)

#### Mission 4. Debugging 방법
 1. breakpoints란
    * 코드를 검증하고 테스트하는 과정에서 미리 중단점을 설정하여 디버깅함.
    * IDE Tool 에서는 debugging mode를 통해 중단점 설정이 가능함.
    * 코드 상에 debugger; 추가함.
    * 단축
<img width="438" alt="스크린샷 2021-11-01 오후 11 13 06" src="https://user-images.githubusercontent.com/90082464/139685759-d42b1dd4-56a0-4727-a6d7-8a1b914f71ae.png">

 2. watch 사용
    * 중단점까지 실행됐을 때 각 변수에 어떤 값이 있는지를 보여주는 기능으로 추정.
   
 3. call stack 
    * stack은 기본 데이타 구조 중 하나로 후입선출의 구조를 가짐.
    * call stack은 메모리 공간으로 js 실행중인 코드에 대한 정보를 stack 구조로 저장함.
    * error 위치를 찾을 수 있다.
 
 4. step over, step into, step out
    * step over : 한줄을 실행합니다. 함수가 있어도 실행 후 다음으로 넘어갑니다.
    * step into : 함수 내부로 들어갑니다.
    * step out : 함수를 끝까지 실행시키고 호출시킨 곳으로 되돌아 갑니다.
 <img width="666" alt="스크린샷 2021-11-02 오전 12 01 10" src="https://user-images.githubusercontent.com/90082464/139693205-41fe2ee3-f21b-4af2-a62b-1d13e2078ff1.png">

<img width="1440" alt="스크린샷 2021-11-02 오전 12 12 04" src="https://user-images.githubusercontent.com/90082464/139694618-80d04e5b-01ee-448e-aa6a-514afff5f8d4.png">
