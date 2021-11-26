
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/* 문제: nums 배열에서 요소 두개의 합이 target num 를 만족하는 숫자가 1 case 존재함.
    이 경우 요소의 index를 배열로 반환하라.
 */

/* 1. 이중 배열 - nums 중 target 이하인 경우, 배열을 돌면서 합이 target 인 경우 index 반환.

 */


function twoSum(nums, target) {
    const answerIndexArray = [];
    for(let i = 0; i < nums.length; i++) {
        let secondNum = target - nums[i];
        for (let j = i+1; j < nums.length; j++) {
            if (nums[j] === secondNum) {
                answerIndexArray.push(i, j)
                return answerIndexArray;
            }
        }
    }
}

function twoSum2(nums, target) {
    const answerIndexArray2 = [];
    for(let i = 0; i < nums.length; i++) {
        let firstNumIndex = i;
        let secondNum = target - nums[i];
        let secondNumIndex = nums.indexOf(secondNum, i + 1)
        if (secondNumIndex === -1) continue;
        else {
            answerIndexArray2.push(firstNumIndex, secondNumIndex)
            return answerIndexArray2;
        }
    }
}

const nums = [3, 2, 4]
const target = 6

const nums2 = [1,-12, -4, 10, -2, 4, 0]
const target2 = -8

console.log(twoSum2(nums2, target2))