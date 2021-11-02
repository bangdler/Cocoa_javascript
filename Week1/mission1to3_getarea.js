console.log("hello world");

var logging = [];
var results = [];

function getArea(figure, ...params) {
    logging.push(figure)
    if (figure == 'circle') {
        var getCircle = function(a) {
            return (a ** 2) * Math.PI;
        }
        var area = 0;
        var radius = params[0];
        var iters = params[1] || 1;
        for (var i = 0; i < iters; i++) {
            area = area + getCircle(radius + i);
        }
    }
    else if (figure == 'rect') {
        var height = params[0];
        var width = params[1];
        var area = height * width
    }
    else if (figure == 'trapezoid') {
        var height = params[0];
        var upper_width = params[1];
        var lower_width = params[2];
        var area = height * (upper_width + lower_width) / 2;
    }
    results.push(area);
    console.log(area)
    return area;
}

function printExecutionSequence() {
    console.log('계산수행순서 :', logging.toString());
    console.log('결과값순서 :', results.toString());
}

getArea('trapezoid', 10, 2, 4);
getArea('circle', 5, 7);
getArea('rect', 10, 1);
getArea('circle', 10);

printExecutionSequence();
