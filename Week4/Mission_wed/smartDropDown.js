



const $uList = document.querySelector(".ul")
const $list = document.querySelector("#list")
const djArray = ['아민반뷰렌', '마틴게릭스', '카이고', '아비치', '로스트프리퀀시스']
let mouseenter = true;

function run() {
    makeList($uList, djArray)
    setMouseEvent($uList)
}

// 배열로부터 element(dj)를 받아 parent(uList) 에 addList(<li> tag) 를 추가한다.
function makeList(parent, array) {
    array.forEach(function(dj) {
        const addList = create$list(dj);
        parent.insertAdjacentHTML("beforeend", addList)
    })
    return;
}

function create$list(dj) {
    const djList = `<li class="list hidden">${dj}</li>`
    return djList
}



// list 에 각 hidden 과 연동되는 mouseover 발생 이벤트 등록
function setMouseEvent(ulist) {
    const $hiddenList = document.querySelectorAll('.hidden')
    $hiddenList.forEach(function (hidden){
        mouseenterEventHandler(ulist, hidden)
        mouseleaveEventHandler(ulist, hidden)
    })
}

// list에 1초 이상 mouse 있을 경우 hidden 의 class 변경
function mouseenterEventHandler(list, hidden) {
    list.addEventListener('mouseenter', (e) => {
        mouseenter = true;
        setTimeout(function () {
            if(mouseenter) {
                hidden.classList.replace('hidden', 'unhidden');

                console.log('enter!')
            }
        }, 2000)
    })
}

// mouse 가 ulist 를 0.5초 이상 벗어나면 다시 hidden.
function mouseleaveEventHandler(list, hidden) {
    list.addEventListener('mouseleave', (e) => {
        mouseenter = false;
        setTimeout(function() {
            hidden.classList.replace('unhidden', 'hidden');
            console.log('leave!')}, 1000)
    })
}

run();
