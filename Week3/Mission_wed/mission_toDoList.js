
// 우선 Html 에서 변경 필요한 Tag 를 변수 선언
const $user = document.querySelector('.user')
const $today = document.querySelector('.today')
const $inputTodo = document.querySelector('.inputTodo')
const $addButton = document.querySelector('addButton')
const $list = document.querySelector('list')

class TodoManager {
    constructor(userName) {
        this.user = userName
        this.todoList = {};
        this.itemKeyNum = 1;
        this.currentInput = '';

    }

    printName() {
        $user.textContent = this.user;
    }

    printToday() {
        const today = new Date();
        const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = (today.getMonth() + 1);
        const date = (today.getDate());
        const day = weekArray[today.getDay()];

        $today.textContent = `${month}월 ${date}일 ${day}`
    }

    onInput(event) {
        this.currentInput = event.target.value;
        console.log(this.currentInput)
        return this.currentInput;
    }

    checkInput(event) {
        event.preventDefault();     //이벤트가 발생하지 않도록 막아준다.
        if(!this.currentInput) {
            alert('내용을 입력해주세요')
            return;
        }
        else {
            const item = this.currentInput;
            const itemKey = this.itemKeyNum;
            $list.appendChild(this.makeList(item, itemKey))
            this.clear()
        }
    }

    clear() {
        this.currentInput = null;
        $inputTodo.focus();
    }

    makeList(item, itemKey) {
        const $listItem = document.createElement('li');
        const $checkBox = document.createElement('input')
        const $content = document.createElement('span')
        const $delete = document.createElement('button')

        $listItem.className = `list item${itemKey}`;
        $checkBox.className = 'checkBox';
        $content.className = 'content';
        $delete.className = 'delete';

        this.makeChild($listItem, $checkBox, $content, $delete)

        $checkBox.type = 'checkbox'
        $delete.textContent = '<i class="far fa-trash-alt"></i>'
        $content.textContent = item;
    }

    makeChild(parent, ...child) {
        child.forEach(function(element) {
            parent.appendChild(element);
        })
        return parent;
    }

}
const bangdler = new TodoManager('bangdler')

bangdler.printName()
bangdler.printToday()
$inputTodo.addEventListener('input', bangdler.onInput)
$addButton.addEventListener('click', bangdler.checkInput)
