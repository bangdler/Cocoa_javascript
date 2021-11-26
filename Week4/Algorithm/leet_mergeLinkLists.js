/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */


function mergeTwoLists(list1, list2) {
    let mergeList;
    mergeList = list1.concat(list2);
    mergeList.sort(function(a,b) {return a - b;})
    return mergeList;
}

let list1 = [1,2,4]
let list2 = [1,3,4]
//console.log(mergeTwoLists(list1,list2))

// list 하나를 고정하고 값을 순회하면서 나머지 list 를 쪼개서 붙인다.
// leetcode 에서 input 조건이 달라서 그런지 오답으로 나옴...
function mergeTwoLists2(list1, list2) {
    let ListObject = {};
    let biggerList = [];
    let anchorList = list1.map(element => element)
    let j =0;
    for(let i = 0; i < list1.length; i++) {
        let smallerList = [];
        for(; j < list2.length; j++) {
            if(list2[j] <= list1[i]) {
                smallerList.push(list2[j])
            }
            else if(list2[j] > list1[i]) {
                if(i === list1.length) {
                    biggerList = list2.slice(j)
                    ListObject[list1.length] = biggerList
                }
                break;
            }
        }
        ListObject[list1[i]] = smallerList;
    }
    //console.log(ListObject)
    for(let key in ListObject) {
        let anchorIndex = anchorList.indexOf(Number(key));
        let appendArray = ListObject[key];
        if (appendArray === []) continue;

        //console.log(appendArray)
        for(let i = 0; i < appendArray.length; i++) {
            anchorList.splice(anchorIndex+i, 0, appendArray[i]);
        }
    }
    //console.log(list1)
    return anchorList;
}

console.log(mergeTwoLists2(list1, list2))



