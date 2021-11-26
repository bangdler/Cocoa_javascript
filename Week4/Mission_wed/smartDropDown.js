

// list 하위 list 를 추가한다.

const $uList = document.querySelector(".ul")
const djArray = ['아민반뷰렌', '마틴게릭스', '카이고', '아비치', '로스트프리퀀시스']


function makeList(array) {
    array.forEach(function(dj) {
        const addList = create$list(dj);
        $uList.insertAdjacentHTML("beforeend", addList)
    })
    mouseoverEventHandler()
    return;
}

function create$list(dj) {
    const djList = `<li class="list hidden">${dj}</li>`
    return djList
}



// 1초 이상 mouse 있을 경우 hidden class 변경
function mouseoverEventHandler() {
    const $list = document.querySelector("#list")
    const $hiddenList = document.querySelectorAll('.hidden')
    $hiddenList.forEach(function(item) {
        $list.addEventListener('mouseover', (e)=> {
            item.classList.replace('hidden','unhidden')
        })
    })
}

makeList(djArray);
