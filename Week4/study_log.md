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
   
   