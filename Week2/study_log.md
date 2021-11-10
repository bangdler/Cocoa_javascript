# Bandler's study note 
## Week 2 Day 1 (2021-11-08)

### Mission hash & Study
1. call back 

    [콜백 함수](https://medium.com/@oasis9217/%EB%B2%88%EC%97%AD-javascript-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%BD%9C%EB%B0%B1%EC%9D%B4-%EB%AD%94%EB%8D%B0-65bb82556c56)

2. hash, hash table

    * 해시 테이블은 직접 주소 테이블처럼 값을 바로 테이블의 인덱스로 사용하는 것이 아니라 해시 함수(Hash Function)이라는 것에 한번 통과시켜서 사용한다. 해시 함수는 임의의 길이를 가지는 임의의 데이터를 고정된 길이의 데이터로 매핑하는 함수이다. 이때 이 함수가 뱉어내는 결과물을 해시(Hash)라고 부른다.
        
    * 참고 사이트
    
        [hash, hash table, 충돌 개념](https://evan-moon.github.io/2019/06/25/hashtable-with-js/)
        
        [Map, Map 함수](https://velog.io/@jun094/Hash%EC%99%80-Map#21-map-%EA%B0%9D%EC%B2%B4%EB%9E%80)
        
        [객체 참조, 복사](https://ko.javascript.info/object-copy)
        
## Day 2 (2021-11-09)

### Study
1. 알고리즘, 데이터구조에 대한 공부터
    * 배열, 오브젝트 등의 각 데이터구조는 reading, searching, insert, delete 의 관점에서 각각 장단점이 있다.
    * 배열의 경우 reading 은 빠르나, searching 은 순차적으로 검색하기 때문에 그닥 빠른편은 아니다. add, delete는 마지막에 추가, 삭제하는 경우에 사용하는 것이 좋다.
    * 시간복잡도 - 알고리즘의 단계가 몇 개로 구성되어있는지에 따라 알고리즘의 스피드가 달라진다. 처리해야할 input 양에 따라 알고리즘 단계가 늘어나는 추세를 나타낸 그래프이다. big O 라고 한다.
    * 선형검색의 경우 input이 2배가 되면 검색하는데 2배의 시간이 걸리므로 O(n)이며, for문 중첩의 경우 O(n^2), 이진검색(binary)에서는 input이 두배가 되어도 단계는 1개 늘어나므로 O(log n)으로 표현한다.
    * 이진검색 - 정렬이 된 배열에 사용이 가능하다. data 를 반으로 나누고 기준값과 비교하여 해당되지 않는 반은 제거하는 식으로 검색하는 방법.
    * 정렬이 된 배열에 값을 추가하는 경우에 시간이 더 오래 걸린다.

         [노마드 코더 youtube 알고리즘, 데이구조 0~6](https://www.youtube.com/watch?v=BEVnxbxBqi8&list=PL7jH19IHhOLMdHvl3KBfFI70r9P0lkJwL&index=4)
         
         
## Day 3 (2021-11-10)

### Mission hash
1. 기존에 만들었던 hash 함수는 단순히 prototype을 활용한 생성자함수 정도였던 것 같다.
2. 다른 분들이 만든 hash 함수처럼 일정 크기의 배열을 만들고 hash 함수를 통해 문자열을 특정한 숫자로 변환하여 index를 부여하도록 refactoring 하려고 한다. 
3. chaining 을 위해 linked list 을 사용한 분의 코드를 보다가 이해가 하나도 안돼서 시간만 보냈다. 결국 단순히 hash table 의 index 내에 버킷을 생성해서 배열을 계속해서 추가하는 방법으로 중복을 피하는 것으로 수정함. 
    * 참고한 분들 코드
    
        [hemdi](https://github.com/hemudi/codeSquad_cocoa/blob/master/daily_study_log/log_1108/HashMap_LinkedList.js)
    
        [s](https://github.com/soralee2821/cocoa/blob/master/week2/hashmap.js#L27)     
    