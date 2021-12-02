## DJ mag 만들기

[DEMO](https://bangdler.github.io/Cocoa_javascript/)
 

1. 프로젝트 개요
    - DJ mag 사이트의 [Top 100 List](https://djmag.com/top100dj?year=2021)처럼 동작하는 웹 만들기.
    - 연도별 DJ top 100, 선택 시 DJ image와 약 10년간 순위 graph를 볼수있다.
    
2. 주요 기능
    - DJ 검색
    - 연도 DropDown - 선택년도 Top 100 List 활성화 - DJ 선택가능   
    - 검색/선택된 DJ 이미지와 지난 10여년간의 순위 그래프를 보여주기
    - 미반영) 검색/선택된 횟수를 count 하여 local에 저장 및 보여주기
    - 미반영) 변동폭 등에 따라 Title (rising star etc.)을 부여해서 보여준다.
    - 미반영) 선택 DJ의 유명한 곡 link 보여주기 
    - 미반영) 미선택시 Random DJ List 보여주기 
    
    
### 수행과정

1. Data set 구하기
    - DJ mag 에서 history data scraping 코드를 발견, 이를 이용하여 2004 - 2021년 data set을 얻을 수 있었다.
      (코드가 js도 아니고 crawling 해본 적이 없어 csv 파일은 도움을 받았다.)
    - 연도, 순위, 이름 으로 구성된 csv 파일
    - 이름, 이미지링크 로 구성된 csv 파일
    - [scraping code](https://github.com/koki25ando/DJ-Mag-History-Data/blob/master/DJ_Mag.R)    
    
2. CSV Parsing
    - npm csv-parser 를 설치하여 parsing 하기.
    
        [npm csv-parser](https://www.npmjs.com/package/csv-parser)
    - 모듈 사용이 익숙하지 않아 csv-parse 모듈을 사용하려다가 csv-parser 로 변경
    - id(행번호), year, dj명, 순위, 작년대비 로 구성된 객체로 parsing
    - 최종적으로 연도별 dj 순위 객체로 가공하였다.
    - 이상하게 어제는 parsing 이 됐는데, 오늘은 require 관련 에러가 발생한다. document 도 인식을 못하는 현상 발생중...
    
        Uncaught ReferenceError: require is not defined
        
    - document 는 terminal 에서 js 파일 실행 시에 인식을 못하는게 당연한 거였고, fs & csv-parser 모듈 사용 시 브라우저에서 인식을 못하여 방법을 찾다가 결국 포기.
    - fs 모듈은 아직도 잘 모르겠지만, end 이벤트가 발생하면 빈 배열에 push 한 data 가 남아있지 않고 사라진다. 
    - 최종적으로 data.js 를 만들어 모듈 import 후, fs.writeFile 을 이용하여 json 형태로 가공한 dj_mag.js 를 별도로 만들어 export 하여 사용함.
        
3. HTML CSS
    - css 는 최소화하고 싶지만 dj list 등 보여주는 용도의 웹이므로 부트스트랩이라는 css 라이브러리? 오픈소스 프레임워크를 이용하기로 했다.
    - 필요한 기능과 디자인의 css, js 가 구현되어 있어 편리하다.
          
        [부트스트랩 홈페이지](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
        
4. 기능 구현
    - 수업 과제를 통해 배운 것처럼 MVC 패턴을 적용해보려고 한다.
    - MVC 역할
        1. Controller : 브라우저에서 요청 받은 input, click 등의 이벤트를 View 에 전달하여 render, Data에 전달하여 Data set 에서 해당되는 값을 찾아 반환할 수 있도록 함.
        2. View : 검색한 글자가 포함된 dj 명 List 보여주기, 선택 시 이름, 사진, rank Trend 보여주기. drop down 선택 시 연도별 순위 보여주기.
        3. Data : dj mag 의 parsing 된 data를 가공하여 필요한 data 객체로 관리. 요청 시 해당 dj name key 값에 해당되는 rank trend 반환. 
       
    - 검색
        1. 검색은 객체 (key:dj name, value:rank trend)에서 요청한 값에 해당되는 key 값을 찾아 value를 반환하고자 함.
        2. 이 때 대소문자와 띄어쓰기에 상관없이 찾도록 구현하고 싶어, 정규표현식을 활용하여 객체를 한번 더 가공하였다. 
        3. 띄어쓰기를 제거한 데이터와, 검색 요청한 값 띄어쓰기 제거 및 대소문자 구분 없는 정규표현식으로 만들어 match method 활용하여 비교하였다.
        4. 처음에는 include를 사용하여 배열에 존재 여부를 보려고 하였으나, 대소문자 구분이 안되더라.
        5. 현재는 문자열의 순서만 같다면 띄어쓰기, 대소문자 상관없이 true 이므로 해당되는 모든 값을 배열로 반환하도록 구성하였다.
        
            [match method](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match)
            
            [정규표현식 패턴과 플래그](https://ko.javascript.info/regexp-introduction)
            
        6. data 가공 시 forEach 문에서 this 사용 시 참조가 안되는 문제 발생. 아래와 같이 해결하였다.
            ```javascript
            // foreach 문에서 this 사용 시에는 인자로 참조할 this 를 지정해주어야함.
            getRequiredData(data) {
                const top100ofYear = new Object();
                const djRankTrend = new Object();
                data.forEach(function (item) {
                    const year = item['Year']
                    const dj = item['DJ']
                    const rank = item['Rank']
                    this.makeTop100(top100ofYear, year, dj)
                    this.makeDjRank(djRankTrend, year, dj, rank)
                }, this)
                return [top100ofYear, djRankTrend];
            }
            ```   
    - 검색된 배열 값에 select 이벤트 추가
        1. 배열 값마다 eventListener 를 추가하지 않고 상위 tag 에 추가하여 이벤트 위임을 시도해보았다. 이로써 각 하위 tag마다 이벤트를 걸지 않아도 됨.
            
            [이벤트 위임](https://ko.javascript.info/event-delegation)
            
    - 그래프 보여주기
        1. Chart js 사용. 
        
            [chart js site](https://www.chartjs.org/docs/latest/getting-started/)
            
        2. 애를 먹은 부분은 그래프가 안나와서 고생을 했는데, 이유는 canvas tag 의 상위 tag에 ```textContent = 입력값``` 으로 덮어쓰기가 되고 있어서였다.
        3. 새로운 dj 를 선택할 때 그래프가 변경되지 않아서 ```this.chart = null; ``` 을 설정하고 ```if(this.chart) this.chart.destroy();``` 로 초기화 실시.
        4. 추가를 고려하는 기능 : 여러명 선택 시 그래프를 겹쳐서 보여주기. 색 구분 필요.
        
    - dropDown 모든 연도 추가, 연도 선택 시 dj list 보여주기
        1. dropDown 버튼 click 시에도 상위 tag 에 이벤트 위임
        2. top 100 list 에 dj name click 시 기존의 select event handler 함수를 활용했다.
        3. 활용을 위해 동일한 $searchDj 지역변수를 선언해줘야했는데 각 함수마다 같은 태그를 지칭하는 변수를 만드는게 괜찮은지...아니면 생성자에 하나를 만들어주는게 나은지 잘 모르겠다.
    
    - 이미지 보여주기
        1. 이미지 parsing data 가공.
        2. key : dj name, value : image 주소 객체 생성
        3. select 함수 실행 시 이미지 render.  