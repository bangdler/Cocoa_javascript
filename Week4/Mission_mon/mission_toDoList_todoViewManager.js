

function select(selector) {
    return document.querySelector(selector);
}

export default class TodoViewManager {
    constructor() {
        this.$inputTodo = select('.inputTodo');
        this.$todoList = select('.todoList');
        this.$doneList = select('.doneList');
        this.request = function(){};
    }

    // 현재 날짜 보여주기
    printToday() {
        this.$today = select('.today')
        const today = new Date();
        const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = (today.getMonth() + 1);
        const date = (today.getDate());
        const day = weekArray[today.getDay()];

        let todayContent = `${month}월 ${date}일 ${day}`
        this.$today.textContent = todayContent;
    }

    // Controller 의 함수를 이용하기 위한 메소드. 매개변수로 controller 함수를 받아 필요한 동작을 요청한다.
    requestEvent(controlFunction) {
        this.request = controlFunction
    }

    // list 추가, count
    renderTodo(id, contents, checked=false) {
        const list = this.createList(id);
        const checkBox = this.createCheckBox();
        const contentsSpan = this.createSpan(contents);
        const deleteBtn = this.createDelete();
        const modifyBtn = this.createModify();

        this.makeChild(list, checkBox, contentsSpan, modifyBtn, deleteBtn )
        if(checked) {
            this.completeTodo(checkBox)
            return;
        }
        this.$todoList.appendChild(list);
        this.countList();

    }

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

    createModify() {
        const $modify = document.createElement('button')
        $modify.className = 'modify';
        $modify.textContent = '수정';
        this.handleModifyButton($modify);
        return $modify;
    }

    makeChild (parent, ...child) {
        child.forEach(function(element) {
            parent.appendChild(element);
        })
        return parent;
    }

    // 수정 이벤트 발생
    handleModifyButton(button) {
        button.addEventListener('click', (e) => this.modifyTodo(e))
    }

    modifyTodo(event) {
        const modifiedItem = event.target.parentNode;
        const contentsNode = modifiedItem.childNodes[1]
        const modifiedNode = modifiedItem.childNodes[2]
        const modifiedItemId = modifiedItem.getAttribute('id')
        contentsNode.contentEditable = 'true';
        modifiedNode.textContent = '수정완료'
        this.handleModifyCompleteButton(modifiedNode, contentsNode, modifiedItemId);
    }

    // 수정완료 이벤트 발생
    handleModifyCompleteButton(button, contents, modifiedItemId) {
        button.addEventListener('click', (e) => this.modifyCompleteTodo(button, contents, modifiedItemId))
    }

    modifyCompleteTodo(button, contents, modifiedItemId) {
        contents.contentEditable = false;
        const contentsText = contents.innerText;
        this.request('modify', modifiedItemId, contentsText);
        button.textContent = '수정'
        this.handleModifyButton(button);
    }

    // 삭제 이벤트 발생
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

    // 체크(완료)이벤트 발생
    handleCheckBox(checkbox) {
        checkbox.addEventListener('click', (e) => {this.completeTodo(checkbox)})
    }


    completeTodo(checkbox) {
        const doneItem = checkbox.parentNode;
        const doneItemId = doneItem.getAttribute('id');
        const modifyButton = doneItem.childNodes[2];
        this.$doneList.appendChild(doneItem);
        checkbox.remove();
        modifyButton.remove();
        this.request('check', doneItemId)
        this.countList();
    }

    countList() {
        const $todoCount = select('.todoCount')
        $todoCount.innerText = this.$todoList.childElementCount
        const $doneCount = select('.doneCount')
        $doneCount.innerText = this.$doneList.childElementCount
    }
}