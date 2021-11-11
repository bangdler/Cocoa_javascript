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

### Mission 괄호문법감지기
1. 괄호 등 특정 문자를 찾고 분석하기 위해서 정규식 표현에 대해 공부

    [드림코딩 by 엘리 - 정규식표현](https://www.youtube.com/watch?v=t3M6toIflyQ)
    
2. 단순 for 문과 정규식 test 를 통해 괄호 갯수, 숫자 갯수를 세는 것으로 코드를 완성하였으나, 무한한 배열이 들어왔을 경우에 대해 고민해볼 필요가 있다. 아마 stack, que 개념을 활용해야 할 것 같다.

## Day 4 (2021-11-11)

## Mission 괄호문법감지기
1. Stack 을 사용해야 하는 이유 : 단순히 \[ 와 \]의 갯수를 비교하는 것은 \] 가 먼저 들어오는 배열을 걸러낼 수가 없다. 이에 Stack 을 통해 \[가 먼저 들어온 후 이어서 \] 가 확인될 경우 기존 Stack에서 \[ 를 pop 해주면서 중첩수를 세는 식으로 변경이 필요했다.
2. 원소를 세는 방법 : 초반에는 Stack 에 원소도 포함하려고 했으나, 이 경우 \] 가 들어왔을 때 pop 해주면서 중첩수와 원소 갯수를 세기 위해서는 코드가 굉장히 복잡해진다. 이에 별도로 element 에 ',' 로 구분하여 문자를 더해주고 ',' 나 \] 가 나왔을 경우 조건을 통해 element count를 해주면서 초기화를 해주었다.
3. 역시나 문제 이해가 힘들었고, stack 을 구현하는 방법, 문제에 적용하는 방법에 대해 스스로 떠올리기는 아직 무리인 것 같다...