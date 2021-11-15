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

## 수업 Review
1. 이론도 좋지만 코드를 직접 짜보면서 배우는게 좋다.
2. 문제를 단순화해서 접근해보기. 요구사항을 정리하고 설계하는 법을 연습해보자. 초기 뼈대를 만드는 연습..
3. class - 생성자 - prototype 에 대해 연습

## Day 5 (2021-11-12)

## Mission 괄호문법감지기 refactoring
1. 요구사항 3번 - 배열 분석 정보를 출력한다.
2. 요구사항 1,2번 함수를 활용하여 data 문자열을 분석해서 괄호가 제대로 되어있는지 확인, \[, 숫자, \] 만 순서에 맞게 추출하여 배열로 반환하도록 함. 
3. root 배열에 신규 object 를 들어오는 값에 따라 각각 생성하도록 구현
4. 현재 배열과 하위 배열을 정의함.
5. \[ 면 'array' 배열을 생성하고 하위 배열에 추가, 하위 배열이 현재 배열이 됨. 신규 배열의 하위 배열이 하위 배열이 됨.
6. \] 면 현재 배열이 하위 배열이 되어 한 배열 밖으로 빠져나옴.
7. 숫자가 들어오면 'number' 배열을 생성하고, 하위 배열에 추가함.
8. JSON.stringify 를 사용하여 객체를 문자열로 변경하여 보기 좋게 공백을 줘서 출력함.

## Algorithm - programmers
1. 오름차순 정렬 구현이 생각보다 어렵다. 구현하고 보니 삽입 정렬을 사용한건가? 새로운 배열은 만든거 아닌 것 같기도 하다.
2. js에서 숫자가 Number()를 안하면 언제는 문자로 인식한다.
3. 오타로 삽질 for 문이 두개일 때 i, j 를 혼동...
 
 
 ## Weekend
 
 ### Mission 
 1. Hash Table refactoring 마무리...
    - 함수 마다 hash function 을 이용한 index를 구하는 알고리즘이 들어가서, 함수 내에 다른 함수를 부를 때 (ex) containskey) index 알고리즘이 중복이 되는게 보기가 싫었다.
    - 그래서 containskey를 안쓰고 유사한 알고리즘을 함수마다 다시 구현하려고 했으나 그럴 경우 함수의 기능이 단순화 되지 않아 추후 수정할 때 오히려 안좋을 수 있다.
    - this.hashtable[index] 가 너무 길어서 새로운 지역변수를 지정했을 때 값만 복사되고 주소가 복사되지 않는 것 같다. 
    - 그래서 코드 마지막 줄에 항상 this.hashTable[index] = indexTable; 를 쓰게 되는데 참조 범위에 대해 공부해봐야겠다.
    - clear를 구현할 때 새로운 빈 배열을 생성했는데, 기존 배열을 삭제해주는게 메모리에 부담을 덜 주는지? 궁금하다.
    
        [기본형과 자료형 - 깊은 복사, 얕은 복사](https://webclub.tistory.com/638)
    
 2. 배열 미션 추가 
    - for in 은 객체 순환, for of 는 배열 순환...
    - typeof(배열) 을 했을 때 object 가 나온다. 따라서 배열을 구분하기 위해서는 Array.isArray(object) 를 사용한다.
    - 객체에서 키에 해당 값을 불러올 때, object.key 와 object['key'] 에 차이가 있었다.
    
        . 을 쓰는 경우 : 객체 안에 정확한 key 값을 알고 그 key에 해당하는 값을 부를 때
    
        [] 을 쓰는 경우 : 객체 안의 key 값을 임의의 변수로 받아서 사용할 때 
        
        [object.key 와 object['key'] 의 차이](https://medium.com/sjk5766/javascript-object-key-vs-object-key-%EC%B0%A8%EC%9D%B4-3c21eb49b763) 
        
 3. reduce method 만들기
    - reduce는 배열에 각 요소에 대해 주어진 call back 함수를 실행하고 반환값을 누적하며, 하나의 결과값으로 반환한다.그래서 reduce 라고 한다.. (주로 현재값과 누적된 반환값을 사용한다.)
    - 구현은 솔직히 잘 이해가 안가 아래 사이트들을 참고했다.
      
      [map 과 reduce 설명](https://ratseno.tistory.com/25)
      
      [reduce method code 구현](https://captainchun.tistory.com/17)