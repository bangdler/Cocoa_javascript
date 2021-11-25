function select(selector) {
    return document.querySelector(selector);
}

export default class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    // 시작 시 실행되는 메소드
    init() {
        this.view.requestEvent(this.replyEvent.bind(this))
        this.setStoredData();
        this.listenAddButton();
        this.allClear();
        this.view.printToday();

    }

    // View 의 요청 동작을 대신 전달 받아 Model 메소드를 실행.
    replyEvent(event, id) {
        if (event === 'remove') {
            this.model.deleteList(id);
        }
        else if (event === 'check') {
            this.model.checkList(id);
        }
    }

    // local data 를 불러와서 render
    setStoredData() {
        const storedData = this.model.getStoredData();
        if(storedData.length === 0) return;

        for(const data of storedData) {
            this.view.renderTodo(data['id'], data['contents'], data['checked'])
        }
    }

    // add 이벤트 수행
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

    // 각 list 에 id 를 다르게 부여하기 위해 시간을 구함.
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