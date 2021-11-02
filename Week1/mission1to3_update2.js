
function getArea(figure, results, figures, ...params) {
    let result;
    if (figure === 'circle') {
        figures.push(figure);
        results.push(getCircle(...params));
        result = getCircle(...params);
    }
    else if (figure === 'rect') {
        figures.push(figure);
        results.push(getRect(...params));
        result = getRect(...params);
    }
    else if (figure === 'trapezoid') {
        figures.push(figure);
        results.push(getTrapezoid(...params));
        result = getTrapezoid(...params);
    }
    console.log(result)
    return results, figures
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
}

let logging_figure = [];
let logging_results = [];

logging_results, logging_figure = getArea('trapezoid', logging_results, logging_figure, 10, 2, 4)
logging_results, logging_figure = getArea('circle', logging_results, logging_figure, 5, 7)
logging_results, logging_figure = getArea('rect', logging_results, logging_figure, 10, 1)
logging_results, logging_figure = getArea('circle', logging_results, logging_figure, 10)

printExecutionSequence();