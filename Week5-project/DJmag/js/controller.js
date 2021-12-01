
export class Controller {
    constructor(data, view) {
        this.data = data;
        this.view = view;
    }

    init() {
        this.searchEventListener();
    }

    searchEventListener() {
        const $searchBtn = document.querySelector('#searchBtn');
        $searchBtn.addEventListener('click', (e) => this.searchHandler(e));
    }

    searchHandler(e) {
        e.preventDefault();
        const searchedName = this.view.$djNameSearch.value;
        const $searchedDj = document.querySelector('#searchedDj')
        this.view.clearSearchedDj($searchedDj);
        if(this.isEmpty(searchedName)) return;
        const searchedArray = this.data.getMatchedDj(searchedName)
        if(searchedArray) {
            this.view.renderSearchedDj(searchedArray, $searchedDj)
            this.selectEventListener($searchedDj);
        }
    }

    selectEventListener(searchedDj){
        searchedDj.addEventListener('click', (e) => this.selectHandler(e))
    }

    selectHandler(e) {
        const target = e.target;
        // 이벤트 위임
        if (target.className !=='djSelect') return;
        const selectedKey = target.id;
        const yearArray = this.data.yearList;
        const selectedRankArray = this.data.djRankData[selectedKey]

        // view에 만들어야할 함수.
        //this.view.renderDjImg(selectedKey)
        this.view.renderDjName(selectedKey)
        this.view.renderDjRankTrend(yearArray, selectedRankArray, selectedKey)
    }

    isEmpty(djName) {
        if(djName === "") {
            alert('dj 이름을 입력해주세요')
            return true;
        }
    }

    setDropdown() {
        const yearArray = this.data.yearList
        this.view.addDropdownList(yearArray)
    }
}