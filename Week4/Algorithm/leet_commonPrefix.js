
// 공통 접두사 찾기
// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".
/**
 * @param {string[]} strs
 * @return {string}
 */

let longestCommonPrefix = function(strs) {
    let commonPrefix = ''
    let firstWord = strs[0]
    for(let i = 0; i < firstWord.length; i++) {
        for(let j = 0; j < strs.length; j++) {
            if(firstWord[i] !== strs[j][i]) return commonPrefix;
        }
        commonPrefix += firstWord[i];
    }
    return commonPrefix;
};

let strs = ["flower","flow","flight"]
console.log(longestCommonPrefix(strs))