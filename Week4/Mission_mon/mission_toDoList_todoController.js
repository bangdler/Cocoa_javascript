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
        this.setStoredUser();
        this.listenAddButton();
        this.view.printToday();

    }

    // View 의 요청 동작을 대신 전달 받아 Model 메소드를 실행.
    replyEvent(event, id, contents = '') {
        if (event === 'remove') {
            this.model.deleteList(id);
        }
        else if (event === 'check') {
            this.model.checkList(id);
        }
        else if (event === 'modify') {
            this.model.modifyList(id, contents);
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

        const $allClear = select('.allClear')
        $allClear.addEventListener('click', (e) => {this.handleAllClear(e)})
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
            return true;
        }
        return false;
    }

    clearInput() {
        this.view.$inputTodo.value = '';
    }

    handleAllClear(e) {
        e.preventDefault();
        this.model.tempStorage = [];
        this.model.setLocalStorage();
        location.reload();
    }

    // 사용자 이름 setting
    setStoredUser() {
        const $user = select('.user')
        $user.innerText = this.model.getUserStorage();
        this.listenUserInput($user)
    }

    listenUserInput(user) {
        user.addEventListener('dblclick', (e) => {this.handleUserInput(e)})
    }

    handleUserInput(event) {
        const user = event.target;
        user.contentEditable = 'true'

        user.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                let userText = user.textContent
                if (userText === null) {
                    userText = '사용자 이름';  // 공백 시 사용자 이름 반영이 안됨.
                }
                this.model.setUserStorage(userText)
                user.contentEditable = 'false'
                this.listenUserInput(user)
            }
        })
    }

}