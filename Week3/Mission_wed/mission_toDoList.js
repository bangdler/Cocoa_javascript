
// 우선 Html 에서 변경 필요한 Tag 를 변수 선언
const $user = document.querySelector('.user')
const $today = document.querySelector('.today')
const $inputTodo = document.querySelector('.inputTodo')
const $addButton = document.querySelector('.addButton')
const $list = document.querySelector('.list')
let currentInput = null;

class TodoManager {
    constructor(userName) {
        this.user = userName
    };

    printName = () => {
        $user.textContent = this.user;
    };

    printToday = () => {
        const today = new Date();
        const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = (today.getMonth() + 1);
        const date = (today.getDate());
        const day = weekArray[today.getDay()];

        $today.textContent = `${month}월 ${date}일 ${day}`
    };

    onInput = (event) => {
        currentInput = event.target.value;
        console.log(currentInput)
        return currentInput;
    };

    checkInput = (event) => {
        event.preventDefault();     //이벤트가 발생하지 않도록 막아준다.
        if(!currentInput) {
            alert('내용을 입력해주세요')
            return;
        }
        else {
            let listItem = this.makeList(currentInput)
            $list.append(listItem)
            this.clear();
        }
    };

    clear = () => {
        currentInput = null;
        $inputTodo.value = null;
        $inputTodo.focus();
    };

    makeList = (item) => {
        const $listItem = document.createElement('li');
        const $checkBox = document.createElement('input')
        const $content = document.createElement('span')
        const $delete = document.createElement('button')

        $listItem.className = 'listItem';
        $checkBox.className = 'checkBox';
        $content.className = 'content';
        $delete.className = 'delete';

        this.makeChild($listItem, $checkBox, $content, $delete)

        $checkBox.type = 'checkbox'
        $delete.textContent = '삭제'
        $content.textContent = item;

        $checkBox.addEventListener('click', this.toggleChecked)
        $delete.addEventListener('click', this.delete)

        return $listItem
    };

    makeChild = (parent, ...child) => {
        child.forEach(function(element) {
            parent.appendChild(element);
        })
        return parent;
    };

    delete = (event) => {
        const $deleteItem = event.target.parentNode;
        $deleteItem.remove()
    };

    toggleChecked = (event) => {
        const $toggleItem = event.target.parentNode
        $toggleItem.classList.toggle('checked');
    };
}
const bangdler = new TodoManager('bangdler')

bangdler.printName()
bangdler.printToday()
$inputTodo.addEventListener('input', bangdler.onInput)
$addButton.addEventListener('click', bangdler.checkInput)