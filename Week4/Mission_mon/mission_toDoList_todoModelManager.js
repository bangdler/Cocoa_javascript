
function select(selector) {
    return document.querySelector(selector);
}

// local storage 데이터 관리
export default class TodoModelManager {
    constructor(storageKey) {
        this.tempStorage = [];
        this.storageKey = storageKey;
    }

    // local storage data 불러오기, 초기 storage 는 null 이므로 새 배열을 만들어준다.
    getStoredData() {
        const listData = localStorage.getItem(this.storageKey);
        this.tempStorage = (listData !== null ? JSON.parse(listData) : new Array());
        return this.tempStorage;
    }

    // local storage data 저장
    setLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempStorage));
    }

    // 주요 값의 객체를 tempStorage 배열에 추가 후 local 저장
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
        let index = this.getStorageIndex(id);
        if (index >= 0) {
            this.tempStorage[index]['checked'] = 'checked';
            this.setLocalStorage();
        }
    }

    modifyList(id, contents) {
        let index = this.getStorageIndex(id);
        if (index >= 0) {
            this.tempStorage[index]['contents'] = contents;
            this.setLocalStorage();
        }
    }
}