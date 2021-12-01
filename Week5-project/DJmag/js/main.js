//import csvParser from "./../../../node_modules/csv-parser";
//import fs from 'fs';
//const parse = require('csv-parser');
//const fs = require('fs');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM('').window.document;
import {dj_data} from "./../dataset/dj_mag.js"
let dj_magArr = dj_data;

//dj_magArr 예시
const example = [  {
    id: '95',
    Year: '2008',
    Rank: '6',
    DJ: 'Ferry Corsten',
    Change: 'Up 2'
},
    { id: '96', Year: '2009', Rank: '6', DJ: 'Deadmau5', Change: 'Up 5' },
    { id: '98', Year: '2011', Rank: '7', DJ: 'bangtae', Change: 'Up 33' },
    { id: '98', Year: '2009', Rank: '7', DJ: 'ozumi', Change: 'Up 33' },
    { id: '98', Year: '2011', Rank: '10', DJ: 'Avicii', Change: 'Up 33' },
    { id: '98', Year: '2016', Rank: '12', DJ: 'Avicii', Change: 'Up 33' }
]


// data 가공

class dataManager {
    constructor(data) {
        this.top100Data = this.getRequiredData(data)[0];
        this.djRankData = this.getRequiredData(data)[1];
        this.djNameList = Object.keys(this.djRankData);
        this.yearList = Object.keys(this.top100Data);
    }

    // parsing 하여 객체 배열로 된 data를 받아 연간 top 100 객체, dj 당 순위 객체로 변환.
    // foreach 문에서 this 사용 시에는 인자로 참조할 this 를 지정해주어야함.
    getRequiredData(data) {
        const top100ofYear = new Object();
        const djRankTrend = new Object();

        data.forEach(function (item) {
            const year = item['Year']
            const dj = item['DJ']
            const rank = item['Rank']
            this.makeTop100(top100ofYear, year, dj)
            this.makeDjRank(djRankTrend, year, dj, rank)
        }, this)
        return [top100ofYear, djRankTrend];
    }

    /* data에서 year 를 key 로 같은 년도의 dj 들을 순서대로 배열에 넣어 top 100을 value로 하는 객체 생성.
        (data 는 객체 순서가 순위 순서인 배열로 구성되어 있음.)
        */
    makeTop100(object, year, dj) {
        if(!object[year]) {
            object[year] = [];
        }
        object[year].push(dj)
        return;
    }

    // dj 를 key, 순위배열을 value로 하는 객체 만들기.
    // 2004~2021 17개의 0을 가진 빈 배열에 dj가 있을 경우 rank 로 변경. (year type = string)
    makeDjRank(object, year, dj, rank) {
        const yearIndex = Number(year) - 2004
        if (!object[dj]) {
            object[dj] = [];
            for (let i = 0; i < 17; i++){
                object[dj].push(200);
            }
        }
        object[dj][yearIndex] = Number(rank)
        return;
    }


    // djRankData 의 key 배열(=dj명) 과 입력된 djName 을 match 하여 matching key 배열을 반환.
        // key 배열 공백 제거, djName 은 공백 제거, 대소문자 구분 없이 비교.
        // 출력은 검색된 모든 key 값을 화면에 띄운다.
    getMatchedDj(djName) {
        const djKey = this.djNameList
        const djKeyNoSpace = djKey.map((dj) => dj.replace(/ /gi, ""))
        const djNameReg = this.changeNameRegExp(djName)
        let matchedDjKey = this.checkKeyWithName(djKeyNoSpace, djNameReg, djKey);
        if(matchedDjKey.length === 0) {
            alert('없는 dj 입니다.')
            console.log('없는 dj 입니다.')
            return false;
        }
        return matchedDjKey;
    }

    changeNameRegExp(djName) {
        let nameReg = djName.replace(/ /gi, "")
        nameReg = RegExp(nameReg, 'gi')
        return nameReg;
    }

    checkKeyWithName(keyArray, name, originKey){
        let checkResults = [];
        keyArray.forEach(function(dj, index) {
            const matchResult = dj.match(name)
            if(matchResult) {
                checkResults.push(originKey[index])
            }
        })
        return checkResults;
    }



}


class ViewManager {
    constructor() {
        this.$djNameSearch = document.querySelector('#djNameSearch');
        this.chart = null;
    }

    //검색된 dj 이름들이 링크로 보여진다.
    renderSearchedDj(djNameArray, $searchedDj) {
        djNameArray.forEach(function (dj) {
            $searchedDj.innerHTML += `<li><span role="button" tabindex="0" class="djSelect" id="${dj}">${dj}</span></li>`
        })
    }

    clearSearchedDj($searchedDj) {
        $searchedDj.innerHTML = null;
    }

    renderDjName(selectedKey) {
        const $djName = document.querySelector('#djName')
        $djName.textContent = selectedKey;
    }

    renderDjRankTrend(yearList, selectedRankArray) {
        //clear
        const $djRankChart = document.querySelector('#rankingChart')
        if(this.chart)
            this.chart.destroy()

        const config = {
            type: 'line',
            data: {
                labels: yearList,
                datasets: [{
                    label: 'Rank Trend',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: selectedRankArray,
                }]
            },
            options: {
                scales: {
                    y: {
                        reverse: true,
                        min: 1,
                        max: 100
                    }
                }
            }
        };
        let myChart = document.getElementById('rankingChart')
        console.log(myChart)
        this.chart = new Chart(myChart, config);
    }
}

class controller {
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
        this.view.renderDjRankTrend(yearArray, selectedRankArray)
    }

    isEmpty(djName) {
        if(djName === "") {
            alert('dj 이름을 입력해주세요')
            return true;
        }
    }

}


const djData = new dataManager(dj_magArr);
const djView = new ViewManager();
const djControl = new controller(djData, djView);
djControl.init()

//const djDataSet = initialParser()
//console.log(dj_magArr)
//const djData = new dataManager();
//const djView = new ViewManager();
//const djControl = new controller(djData, djView);

//console.log(djData.top100Data)