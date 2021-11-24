
// Classes 는 2개이상 만든다.(2개 만드는 것을 추천)
// 예시)
// todolist를 처리하는 Model Class
// 화면을 업데이트하는 view Class

function select(selector) {
    return document.querySelector(selector);
}

class TodoModelManager {
    constructor(storageKey) {
        this.tempStorage = [];
        this.storageKey = storageKey;
    }

    getStoredData() {
        const listData = localStorage.getItem(this.storageKey);
        this.tempStorage = (listData !== null ? JSON.parse(listData) : new Array());
        return this.tempStorage;
    }

    setLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempStorage));
    }

    saveListData(id, contents, checked = false) {
        this.tempStorage.push({
            id : id,
            contents : contents,
            checked : checked
        })
        this.setLocalStorage();
    }

    getStorageIndex(id) {
        let numId = Number(id);
        for (let i = 0; i < this.tempStorage.length; i++) {
            if (numId === this.tempStorage[i]['id']) {
                return i;
            }
        }
        return false;
    }

    deleteList(id) {
        let index = this.getStorageIndex(id)
        if (index >= 0) {
            this.tempStorage.splice(index, 1);
            this.setLocalStorage();
        }
    }

    checkList(id) {
        let index = this.getStorageIndex(id)
        if (index >= 0) {
            this.tempStorage[index]['checked'] = 'checked';
            this.setLocalStorage();
        }
    }

}

class TodoViewManager {
    constructor() {
        this.$inputTodo = select('.inputTodo');
        this.$todoList = select('.todoList');
        this.$doneList = select('.doneList');
        this.request = function(){};
    }

    printToday() {
        this.$today = select('.today')
        const today = new Date();
        const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = (today.getMonth() + 1);
        const date = (today.getDate());
        const day = weekArray[today.getDay()];

        let todayContent = `${month}월 ${date}일 ${day}`
        this.$today.textContent = todayContent;
    };

    requestEvent(controlFunction) {
        this.request = controlFunction
    }

    renderTodo(id, contents, checked=false) {
        const list = this.createList(id);
        const checkBox = this.createCheckBox();
        const contentsSpan = this.createSpan(contents);
        const deleteBtn = this.createDelete();

        if(checked) {
            const checkBox = select('.checkBox')
            this.completeTodo(checkBox)
        }
        this.makeChild(list, checkBox, contentsSpan, deleteBtn)
        this.$todoList.appendChild(list);
        this.countList();

    };

    createList(id) {
        const $listItem = document.createElement('li');
        $listItem.id = id;
        $listItem.className = 'listItem';
        return $listItem;
    }

    createSpan(contents) {
        const $content = document.createElement('span')
        $content.className = 'content';
        $content.textContent = contents;
        return $content;
    }

    createDelete() {
        const $delete = document.createElement('button')
        $delete.className = 'delete';
        $delete.textContent = '삭제'
        this.handleDeleteButton($delete);
        return $delete;
    }

    handleDeleteButton(button) {
        button.addEventListener('click', (e) => {this.deleteTodo(e)})
    }

    deleteTodo(event) {
        const deleteItem = event.target.parentNode;
        const deleteItemId = deleteItem.getAttribute('id')
        deleteItem.remove();
        this.request('remove', deleteItemId)
        this.countList();
    }

    createCheckBox() {
        const $checkBox = document.createElement('input')
        $checkBox.type = 'checkbox'
        $checkBox.className = 'checkBox';
        this.handleCheckBox($checkBox)
        return $checkBox;
    }

    handleCheckBox(checkbox) {
        checkbox.addEventListener('click', (e) => {this.completeTodo(checkbox)})
    }

    completeTodo(checkbox) {
        const doneItem = checkbox.parentNode;
        const doneItemId = doneItem.getAttribute('id');
        this.$doneList.appendChild(doneItem);
        checkbox.remove();
        this.request('check', doneItemId)
        this.countList();
    }

    makeChild (parent, ...child) {
        child.forEach(function(element) {
            parent.appendChild(element);
        })
        return parent;
    };

    countList() {
        const $todoCount = select('.todoCount')
        $todoCount.innerText = this.$todoList.childElementCount
        const $doneCount = select('.doneCount')
        $doneCount.innerText = this.$doneList.childElementCount
    }
    }

class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.view.requestEvent(this.replyEvent.bind(this))
        this.setStoredData();
        this.listenAddButton();
        this.allClear();
        this.view.printToday();

    }

    replyEvent(event, id) {
        if (event === 'remove') {
            this.model.deleteList(id);
        }
        else if (event === 'check') {
            this.model.checkList(id);
        }
    }

    setStoredData() {
        const storedData = this.model.getStoredData();
        if(storedData.length === 0) return;

        for(const data of storedData) {
            this.view.renderTodo(data['id'], data['contents'], data['checked'])
        }
    }

    listenAddButton() {
        const $addButton = select('.addButton')
        $addButton.addEventListener('click', (e) => {this.handleAddButton(e)})
    }

    handleAddButton(e) {
        e.preventDefault();
        let contents = this.view.$inputTodo.value;
        const id = this.getListId();

        if(this.isEmpty(contents)) return;
        this.clearInput();
        this.view.renderTodo(id, contents);
        this.model.saveListData(id, contents);
    }

    getListId() {
        const timeId = new Date();
        return timeId.getTime();
    }

    isEmpty(task) {
        if(task === "") {
            alert('내용을 입력해주세요')
        }
        return false;
    }

    clearInput() {
        this.view.$inputTodo.value = '';
    }

    allClear() {
        const $allClear = select('.allClear')
        $allClear.addEventListener('click', (e) => {this.handleAllClear(e)})
    }

    handleAllClear(e) {
        e.preventDefault();
        this.view.$todoList = null;
        this.view.$doneList = null;
        this.model.tempStorage = [];
        this.model.setLocalStorage();
        location.reload();
    }

}

const bangView = new TodoViewManager();
const bangModel = new TodoModelManager('localKey');
const bangControl = new TodoController(bangModel, bangView);

bangControl.init()