



const $djList = document.querySelector(".djList")
const $djCount = document.querySelector(".djCount")

const djArray = ['아민반뷰렌', '마틴게릭스', '카이고', '아비치', '로스트프리퀀시스']
let mouseenter;
let mousemove = true;

function run() {
    makeList($djList, djArray, 'list')
    makeList($djCount, djArray, 'count')
    setMouseEvent($djList)
}

// 배열로부터 element(dj)를 받아 parent(djList) 에 addList(<li> tag) 를 추가한다.
function makeList(parent, array, option) {
    array.forEach(function(dj) {
        const addList = create$dj(dj);
        const addCount = creat$count(dj);
        if (option === 'list') {
            parent.insertAdjacentHTML("beforeend", addList)
        }
        else if (option === 'count') {
            parent.insertAdjacentHTML("beforeend", addCount)
        }
    })
    return;
}

function create$dj(dj) {
    const djList = `<li class="dj hidden" id="${dj}">${dj}</li>`
    return djList
}

function creat$count(dj) {
    const countList = `<li class="count hiddenCount" id="${dj}Count">${dj}: <span id="${dj}Number">0</span></li>`
    return countList;
}

// list 에 각 hidden class 의 dj element 에 mouseover 이벤트 등록
function setMouseEvent(list) {
    const $hiddenList = document.querySelectorAll('.hidden')
    setTimeForMousemove();
    $hiddenList.forEach(function (djElement){
        const djElementId = djElement.getAttribute("id");
        const $djCount = document.querySelector(`#${djElementId}Count`)
        mouseenterEventHandler(list, djElement, djElementId, $djCount)
        mouseleaveEventHandler(list, djElement, $djCount)
    })
}

// list에 2초 이상 mouse 있을 경우 hidden 의 class 변경
function mouseenterEventHandler(list, djElement, djElementId, $djCount) {
    list.addEventListener('mouseenter', (e) => {
        mouseenter = true;
        setTimeout(function () {
            if(mouseenter) {
                djElement.classList.replace('hidden', 'unhidden');
                countMouseenterEventHandler(djElement, $djCount);
                mousemoveEventHandler(djElement, djElementId)
                console.log('enter!');
            }
        }, 2000)
    })
}

// mouse 가 list 를 1초 이상 벗어나면 다시 hidden.
function mouseleaveEventHandler(list, djElement, $djCount) {
    list.addEventListener('mouseleave', (e) => {
        mouseenter = false;
        setTimeout(function() {
            djElement.classList.replace('unhidden', 'hidden');
            $djCount.classList.replace('unhidden', 'hiddenCount')
            console.log('leave!');
            }, 1000)
    })
}

// 각 dj에 mouse enter 시 unhidden
function countMouseenterEventHandler(djElement, $djCount) {
    djElement.addEventListener('mouseenter', (e) => {
        $djCount.classList.replace('hiddenCount', 'unhidden')
    })
}

// mouse move 시 count +1
function mousemoveEventHandler(djElement, djElementId) {
    const $djCountNum = document.querySelector(`#${djElementId}Number`)
    djElement.addEventListener('mousemove', (e) => {
        if(mousemove) {
            $djCountNum.innerText = Number($djCountNum.innerText) + 1;
            mousemove = false;
        }
    })
}

// 500ms 마다 move를 count 하기 위함.
function setTimeForMousemove() {
    setInterval(function() {
        mousemove = true;
    }, 500)
}


run();
