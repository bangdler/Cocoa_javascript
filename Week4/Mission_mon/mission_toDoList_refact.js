
// Classes 는 2개이상 만든다.(2개 만드는 것을 추천)
// 예시)
// todolist를 처리하는 Model Class
// 화면을 업데이트하는 view Class

function select(selector) {
    return document.querySelector(selector);
}

class TodoModelManager {

}

class TodoViewManager {
    constructor () {
        this.$inputTodo = select('.inputTodo');
        this.$todoList = select('.todoList');
        this.$doneList = select('.doneList');
        this.$today = select('.today')
    }

    printToday () {
        const today = new Date();
        const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = (today.getMonth() + 1);
        const date = (today.getDate());
        const day = weekArray[today.getDay()];

        let todayContent = `${month}월 ${date}일 ${day}`
        this.$today.textContent = todayContent;
    };

    renderTodo(input) {
        const $listItem = document.createElement('li');
        const $checkBox = document.createElement('input')
        const $content = document.createElement('span')
        const $delete = document.createElement('button')

        $listItem.className = 'listItem';
        $checkBox.className = 'checkBox';
        $content.className = 'content';
        $delete.className = 'delete';
        $checkBox.type = 'checkbox'
        $delete.textContent = '삭제'
        $content.textContent = input;

        this.makeChild($listItem, $checkBox, $content, $delete)


        this.$todoList.appendChild($listItem)
        this.handleDeleteButton($delete)
        this.handleCheckBox($checkBox)
        return $listItem;
    };

    handleDeleteButton(button) {
        button.addEventListener('click', (e) => {this.deleteTodo(e)})
    }

    deleteTodo(event) {
        const deleteItem = event.target.parentNode;
        deleteItem.remove();
    }

    handleCheckBox(checkbox) {
        checkbox.addEventListener('click', (e) => {this.completeTodo(e)})
    }

    completeTodo(event) {
        const doneItem = event.target.parentNode;
        this.$doneList.appendChild(doneItem)
    }

    makeChild (parent, ...child) {
        child.forEach(function(element) {
            parent.appendChild(element);
        })
        return parent;
    };

}

class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.listenAddButton()
        this.view.printToday()

    }

    listenAddButton() {
        const $addButton = select('.addButton')
        $addButton.addEventListener('click', (e) => {this.handleAddButton(e)})
    }

    handleAddButton(e) {
        e.preventDefault();
        const taskInput = this.view.$inputTodo.value;
        if(this.isEmpty(taskInput)) return;
        this.view.renderTodo(taskInput)
    }

    isEmpty(task) {
        if(task === "") {
            alert('내용을 입력해주세요')
        }
        return false;
    }


}

const bangView = new TodoViewManager();
const bangModel = new TodoModelManager();
const bangControl = new TodoController(bangModel, bangView);

bangControl.init()