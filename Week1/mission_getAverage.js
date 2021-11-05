
const grades = [[88, 76, 77], [33, 44, 44], [90, 100, 94], [30, 44, 98]];

function getAverage(gradeArr){
    let averageArr = grades.map(function(oneGrade){
        let score = 0;
        for (let i = 0; i < oneGrade.length; i++){
            score = score + oneGrade[i];
        }
        let average = score / oneGrade.length;
        console.log(average)
        return average
        })
}
getAverage(grades)