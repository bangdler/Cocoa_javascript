
let logging_figure = [];
let logging_results = [];
//let logArr = [];

function getArea(figure, ...params) {
    let result;
    if (figure === 'circle') {
        //logging_figure.push(figure);
        //logging_results.push(getCircle(...params));
        //logArr.push(`${figure}, ${getCircle(...params)}`;
        result = getCircle(...params);
    } else if (figure === 'rect') {
        //logging_figure.push(figure);
        //logging_results.push(getRect(...params));
        //logArr.push(`${figure}, ${getRect(...params)}`)
        result = getRect(...params);
    } else if (figure === 'trapezoid') {
        //logging_figure.push(figure);
        //logging_results.push(getTrapezoid(...params));
        //logArr.push(`${figure}, ${getTrapezoid(...params)}`)
        result = getTrapezoid(...params);
    }
    console.log(result)
    return [figure, result]
}

function getCircle(radius, iters) {
    iters = iters || 1;
    let area = 0;
    for (let i = 0; i < iters; i++) {
        area = area + ((radius + i) ** 2) * Math.PI
}
    return area;
}

function getRect(height, width) {
    return height * width;
}

function getTrapezoid(height, upper, lower) {
    return height * (upper + lower);
}

function printExecutionSequence() {
    console.log('계산수행순서 :', logging_figure.toString());
    console.log('결과값순서 :', logging_results.toString());
    //console.log(logArr);
}

function makeExecutionSequence(vals) {
    logging_figure.push(vals[0]);
    logging_results.push(vals[1]);
}

makeExecutionSequence(getArea('trapezoid', 10, 2, 4))
makeExecutionSequence(getArea('circle', 5, 7));
makeExecutionSequence(getArea('rect', 10, 1));
makeExecutionSequence(getArea('circle', 10));

printExecutionSequence();