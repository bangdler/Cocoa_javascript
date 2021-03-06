# Bandler's study note 
## Week 4 (2021-11-22\~)


### Mission - toDoList refactoring...
1. MVC 패턴 적용하여 class 나누기.
2. 기존에 했던 코드를 나눠야하는데 어디서부터 손을 대야할지 몰라 막막했다.
3. 지난주에는 local storage에 데이터를 저장하지 않았는데 mvc pattern을 적용하면서 주로 model 부분에서는 data 관리를 다룬다는 것을 알게되어 local storage도 적용하려다보니 코드를 새로 짜야했다.
4. 구성
    - Controller : 요청을 받고 model 에 저장할 정보 전달, model로부터 data를 가져와 view 에 전달하여 render 수행, 기본적인 all clear나 user name을 받는 건 controller에서 바로 수행..(view 비중이 너무 커서)
    - Model : Local Storage에 data 저장, 불러오기, 추가, 삭제 등 데이터 관리. id를 통해 index 찾기.
    - View : 브라우저에 보여지는 작업, 오늘 날짜 print, controller로부터 전달 받은 data render (list 추가, 삭제, 수정, 갯수 count 등)
5. 감을 못잡고 의욕을 잃어 며칠 방황을 했다. 하나부터 차근히 시작하기 위해서 일단 view 를 작성하면서 필요한 요청사항을 controller에 추가했다. 대략적인 기능을 구현하고, 그 data를 저장하기 위한 Model을 만드는 식으로 하니 조금은 길이 보였다.
6. data 를 관리하기 위해서는 list당 고유의 id가 필요했고, 이를 위해 getTime 을 사용하여 시간을 고유의 id로 부여했다. (수업 시간에 리뷰한 분의 아이디어)
7. view 에서 요청받은 작업을 controller 로 전달하는 게 쉽지 않았다. 
    - view 의 requestEvent 함수와 controller의 replyEvent 함수를 만들어서 매개변수로 view에 controller 함수를 전달, view에서 생성자 this.request에 controller 함수를 연결하여 최종적으로 controller 함수에 연결된 model의 기능을 실행하였다. (hemdi 코드 참고, 이해하기 어려웠던 부분...)
6. 참고사이트
    - [MVC pattern 관련 기술 블로그](https://velog.io/@imacoolgirlyo/Todo-List-2.-MVC-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4)
    
    - [innerText, innerHTMl, textContent 차이](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent)
    
    - [수정기능에 사용한 contenteditable MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content)

### Mission - dropBox
1. insertAdjacentHTML 이용하여 ul tag 의 자식요소 중 끝 순서로 추가하는 방식 사용
2. classList.replace 를 통해 Hidden class 와 unhidden class 를 변경
3. mouse event 관련 mouseover - mouseout / mouseenter - mouseleave 의 차이점
    - [관련 유튜브](https://www.youtube.com/watch?v=pzT4hAY82q4)

4. js 구현 상 문제가 없는데 실행이 안되어 보다보니 html script tag 가 실행되고 html 이 파싱되어 js 가 기능을 못한 것 같다. defer 를 붙이니 실행됨.
   (Week3 study log 의 defer 참고사이트 보기)
5. 마우스가 list 를 스쳐지나갔을 때에는 하위 목록 unhidden 이 실행되면 안됨. 허나 setTimeout 은 실행된 순서가 아닌 timeout 이 빠른 순서대로 실행이 됐다. 하여 setTimeout 실행 전 마우스 위치를 확인하는 mouseenter 변수를 만들어 setTimeout callback 실행 시 변수가 true 일 경우만 실행되도록 구성하였다.
    이 때, mouseleave 발생 시 mouseenter = false 로 변경해주어 2초 이상 mouseenter 상태여야 하위 목록이 보임.
6. 마우스무브 카운트의 경우, 500ms 마다 카운트를 해야되므로 setInterval 을 사용하여 해당 시간마다 mousemove 변수를 true 로 만들어주고 move event 발생 시마다 true 일 경우 카운트, 마지막에 false로 다시 바꿔주도록 함. 
7. 기능 상 문제는 없지만 아쉬운 점
    - dj list 를 list 의 형제 요소로 추가했고 그러다보니 forEach 를 통해 추가되는 각 list마다 이벤트함수를 걸어줬다. 하여 내부에 mouseenter 등과 같은 변수들이 중복 선언되는 듯한 느낌이 들고 뭔가 깔끔하지 않다.
    - 추가될 list만 따로 div 를 나누어 구성했으면 좋았을 것 같다. 
8. throttle 과 debouncing 
    - 궁금해서 찾아봤는데 내가 사용한 방식과 똑같지는 않지만 이벤트를 계속 발생시키지 않는다는 목적으로 유사한 부분이 있는 것 같다. 
    - mousemove를 위해 내가 적용한 방식과 throttling 이 유사한 방식 같다.
    - forEach 를 사용했기 때문에 throttling 과 debouncing 을 완전 적용하기는 어려운 것 같다. 
    - 참고 사이트
        [throttle, debounce 사용예](https://pewww.tistory.com/9)