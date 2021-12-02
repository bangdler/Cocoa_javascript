
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

    // search 발생 시 검색된 이름 체크 후 매칭된 이름의 배열을 render 하고 selectEvent 걸어준다.
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

    selectEventListener($searchedDj){
        $searchedDj.addEventListener('click', (e) => this.selectHandler(e))
    }

    // select 발생 시 dj name, dj img, dj rankTrend 를 render 하고 urlEvent 를 걸어준다.
    selectHandler(e) {
        const target = e.target;
        // 이벤트 위임
        if (target.className !=='djSelect') return;
        const selectedKey = target.id;
        const yearArray = this.data.yearList;
        const selectedRankArray = this.data.djRankData[selectedKey]
        const selectedImg = this.selectImageHandler(selectedKey)
        this.clickUrlListener(selectedKey);

        // view에 만들어야할 함수.
        this.view.renderDjImg(selectedImg)
        this.view.renderDjName(selectedKey)
        this.view.renderDjRankTrend(yearArray, selectedRankArray, selectedKey)
    }

    isEmpty(djName) {
        if(djName === "") {
            alert('dj 이름을 입력해주세요');
            return true;
        }
    }

    // 초기 dropDown 에 모든 year key 를 등록하고 button 이벤트를 걸어준다.
    setDropdown() {
        const yearArray = this.data.yearList;
        this.view.addDropdownList(yearArray);
        this.dropdownButtonListener();
    }

    dropdownButtonListener() {
        const $dropdownMenu = document.querySelector('.dropdown-menu')
        $dropdownMenu.addEventListener('click', (e) => this.dropdownButtonHandler(e));
    }

    // 해당년도 버튼 클릭 시 top100List render, select 이벤트를 걸어준다.
    dropdownButtonHandler(e) {
        const target = e.target;  // dropdown menu tag 이벤트 위임.
        const $searchedDj = document.querySelector('#searchedDj')
        this.view.clearSearchedDj($searchedDj);

        if(target.className !== 'dropdown-item') return;
        const yearKey = target.id;
        const yearTop100 = this.data.top100Data[yearKey]
        this.view.renderYearTop100(yearTop100, yearKey)
        this.selectEventListener($searchedDj)
    }

    selectImageHandler(selectedKey) {
        const selectedImgLink = this.data.getMatchedImgKey(selectedKey)
        if(!selectedImgLink) return false;
        return selectedImgLink;
    }

    // url button click 시 fm 사이트의 해당 dj 페이지로 간다.
    clickUrlListener(selectedKey) {
        const $djUrl = document.querySelector('#djUrl')
        $djUrl.classList.replace('hidden', 'unhidden')
        console.log(selectedKey)
        selectedKey = selectedKey.replace(/ /g,"+")
        console.log(selectedKey)
        $djUrl.addEventListener('click', (e) => this.urlHandler(e, selectedKey))
    }

    // 이름이 한번 고정되면 안바뀜...
    urlHandler(e, selectedKey) {
        const target = e.target;
        window.open(`https://www.last.fm/music/${selectedKey}`)
    }

}