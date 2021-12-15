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

//첫번째 시도 : leet 사이트에서 concat 을 인식 못하는듯..
function mergeTwoLists(list1, list2) {
    let mergeList;
    mergeList = list1.concat(list2);
    mergeList.sort(function(a,b) {return a - b;})
    return mergeList;
}

let list1 = [1,2,4]
let list2 = [1,3,4]
//console.log(mergeTwoLists(list1,list2))

// 두번째 시도
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

//console.log(mergeTwoLists2(list1, list2))

// 세번째 시도 : 배열을 순회하면서 각 값을 비교하여 작은값을 results 배열에 넣는다.
// leet 에서 오답처리됨...
function ListNode(list1, list2) {
    let results = [];
    if (list1[0] === undefined && list2[0] !== undefined) return list2
    else if (list1[0] !== undefined && list2[0] === undefined) return list1
    else if (list1[0] === undefined && list2[0] === undefined) return [];
    else {
        // 두 배열의 길이가 다르면 순회가 다 안되는 경우가 있어 밖에서 i, j 선언.
        let i = 0;
        let j = 0;
        for (; i < list1.length;) {
            if(j < list2.length) {
                for (; j < list2.length;) {
                    if (list1[i] > list2[j]) {
                        results.push(list2[j]);
                        j++;
                    }
                    else if (list1[i] <= list2[j]) {
                        results.push(list1[i]);
                        i++;
                        break;  // i 넣는 순간 j 오름차순이므로 뒤는 볼 필요 없음.
                    }
                }
            }
            // list 2 가 먼저 push 되어 순회 종료되는 경우 i 남은 값들을 넣어준다.
            else {
                results.push(list1[i])
                i++;
                }
            }
        // list 1 이 먼저 push 되어 순회 종료되는 경우 j 남은 값들을 넣어준다.
        for (; j <list2.length; j++) {
            results.push(list2[j])
        }
    }
    return results;
}

console.log(ListNode(list1,list2))
