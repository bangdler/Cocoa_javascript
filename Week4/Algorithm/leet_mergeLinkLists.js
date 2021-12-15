

// node 만드는 함수, 문제에서 제공
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// 입력값 예시를 만들기 위함. 배열을 받으면 연결된 노드 객체로 바꾼다.
function makeLinkedList (array) {
    let head = null;
    // 배열 순회하면서 head node 를 만들고 신규 node 는 head 의 마지막 node 인 curr.next 에 위치시킨다.
    for (let i = 0; i < array.length; i++) {
        let node = new ListNode(array[i]);
        if(head === null) {
            head = node;
        }
        else {
            let curr = head;
            while(curr.next) {
                curr = curr.next;
            }
            curr.next = node
        }
    }
    return head;
}

let list1 = [1,3,4];
let list2 = [1,2,4];
let firstNode = new ListNode(null);
let a = makeLinkedList(list1)
let b = makeLinkedList(list2)
console.log(firstNode)
console.log(a)

// 두개의 node 객체를 받아 순서대로 연결한다.
function mergeTwoLists(list1, list2) {
    // 두 객체가 null 로 들어오는 input 은 없어서 삭제해도 무방.
     if (list1 ===null && list2 === null) return null;
     // head 생성
     let head = new ListNode();
     let curr = head;
     // 두 node 모두 값이 있을 경우에 비교를 한다. 작은 값의 node를 모두 curr 에 연결시킨다. 각 List 는 연결 이후 값으로 update.
     while (list1 && list2) {
         if (list1.val <= list2.val) {
             curr.next = list1;
             list1 = list1.next;
         }
         else {
             curr.next = list2;
             list2 = list2.next;
         }
         // curr 을 변경해준다.
         curr = curr.next
     }
     // 두 list 중 하나가 먼저 완료되는 경우 나머지 list 를 그대로 붙여준다.
     if (list1 !== null){
         curr.next = list1
     }
     else if(list2 !== null) {
         curr.next = list2;
     }
     // Head node 의 첫번째는 항상 value 0 이므로 Next 부터 연결된 List 임.
     return head.next;
}

let result = mergeTwoLists(a, b)
console.log(result)