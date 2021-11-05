// 각 학생의 3과목에 대한 성적
const grades = [[88, 76, 77], [33, 44, 44], [90, 100, 94], [30, 44, 98]];

// 각 학생의 평균을 구하는 함수
   // map을 사용하여 한 학생의 성적을 iteration하고 내부에 for를 통해 한 학생의 총점을 구한 뒤 평균을 반환함. 최종 함수는 평균에 대한 배열을 반환함.
function getAverage(gradeArr){
    let averageArr = grades.map(function(eachGradeArr){
        let totalscore = 0;
        for (let i = 0; i < eachGradeArr.length; i++){
            totalscore = totalscore + eachGradeArr[i];
        }
        let average = totalscore / eachGradeArr.length;
        return average;
        })
    return averageArr;
}
console.log(getAverage(grades));

// 학생들의 최고점에 대한 평균을 구하는 함수
   // map을 사용하여 각 학생의 최고 점수 배열을 구하고, for를 통해 최고 점수의 합을 구한뒤 최종적으로 평균을 반환하는 함수
function getHighavg(gradeArr){
    let highscoreArr = grades.map(function(eachGradeArr){
        let highscore = Math.max(...eachGradeArr);  // ...을 사용해야 배열에 대한 최고값을 구할 수 있다.
        return highscore;
    })
    let totalscore = 0;
    for (let i = 0; i < highscoreArr.length; i++){
        totalscore = totalscore + highscoreArr[i];
    }
    let average = totalscore / highscoreArr.length;
    return average;
}

console.log(getHighavg(grades));