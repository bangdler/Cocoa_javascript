
export class Controller {
    constructor(data, view) {
        this.data = data;
        this.view = view;
    }

    init() {
        this.searchEventListener();
        this.setDropdown();
    }

    searchEventListener() {
        const $searchBtn = document.querySelector('#searchBtn');
        $searchBtn.addEventListener('click', (e) => this.searchHandler(e));
    }

    searchHandler(e) {
        //form tag 내에 이벤트 발생 시 preventDefault ;
        e.preventDefault();
        const searchedName = this.view.$djNameSearch.value;
        const $searchedDj = document.querySelector('#searchedDj')
        this.view.clearSearchedDj($searchedDj);
        if(this.isEmpty(searchedName)) return;
        const searchedArray = this.data.getMatchedDj(searchedName)
        if(searchedArray) {
            this.view.renderSearchedDj(searchedArray)
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
            alert('dj 이름을 입력해주세요');
            return true;
        }
    }

    setDropdown() {
        const yearArray = this.data.yearList;
        this.view.addDropdownList(yearArray);
        this.dropdownButtonListener();
    }

    dropdownButtonListener() {
        const $dropdownMenu = document.querySelector('.dropdown-menu')
        $dropdownMenu.addEventListener('click', (e) => this.dropdownButtonHandler(e));
    }

    dropdownButtonHandler(e) {
        const target = e.target;  // dropdown menu tag 이벤트 위임.
        const $searchedDj = document.querySelector('#searchedDj')
        this.view.clearSearchedDj($searchedDj);

        if(target.className !== 'dropdown-item') return;
        const yearKey = target.id;
        const yearTop100 = this.data.top100Data[yearKey]
        this.view.renderYearTop100(yearTop100)
        this.selectEventListener($searchedDj)
    }


}