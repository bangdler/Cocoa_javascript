## DJ mag 만들기

1. 프로젝트 개요
    - DJ mag 사이트의 [Top 100 List](https://djmag.com/top100dj?year=2021) 부분처럼 동작하는 웹 만들기.
    - DJ image와 약 10년간 순위 graph를 볼수있다.
    
2. 주요 기능
    - DJ 검색
    - 연도 DropDown - 선택년도 Top 100 List 활성화 - DJ 선택가능   
    - 연도 미선택시 Random DJ List 보여주기
    - 검색/선택된 DJ 이미지와 지난 10여년간의 순위 그래프를 보여주기
    - 검색/선택된 횟수를 count 하여 local에 저장 및 보여주기
    - optional) 순위 변동폭 등에 따라 Title (rising star etc.)을 부여해서 보여준다.
    - optional) 선택 DJ의 유명한 곡 link 보여주기 
    
    
### 수행과정

1. Data set 구하기
    - DJ mag 에서 history data scraping 코드를 발견, 이를 이용하여 2004 - 2021년 data set을 얻을 수 있었다.
      (코드가 js도 아니고 crawling 해본 적이 없어 csv 파일은 도움을 받았다.)
    - 연도, 순위, 이름 으로 구성된 csv 파일
    - 이름, 이미지링크 로 구성된 csv 파일
    
2. CSV Parsing
    - npm csv-parser 를 설치하여 parsing 하기.
    - 
    