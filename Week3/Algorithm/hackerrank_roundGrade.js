
// Grading policy 에 따른 grade 변환하기
// 성적의 다음 5의 배수와 차이가 3 이하이면 5의 배수로 변환
// 38 보다 작은 성적은 변환하지 않는다.

let grades = [73, 67, 38, 33];


function gradingStudents(grades) {
    let results = [];
    grades.forEach(function (n) {
        let remainder = n % 5;
        let quotient = parseInt((n / 5))
        if (n >= 38 && remainder > 2) {
            let grade = (quotient + 1) * 5
            results.push(grade)
            return;
        }
        else {
            results.push(n)
            return;
        }
    })
    return results
}

console.log(gradingStudents(grades))