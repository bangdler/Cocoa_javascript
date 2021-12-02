
export class DataManager {
    constructor(data, img) {
        this.top100Data = this.getRequiredData(data)[0];
        this.djRankData = this.getRequiredData(data)[1];
        this.djNameList = Object.keys(this.djRankData);
        this.yearList = Object.keys(this.top100Data);
        this.djImgData = this.getRequiredImgData(img);
    }

    // parsing 및 json 형태로 된 data를 받아 연간 top 100 객체, dj rank trend 객체로 변환.
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
        (data 는 객체 순서가 순위 순서인 배열로 구성되어 있음.)   */
    makeTop100(object, year, dj) {
        if(!object[year]) {
            object[year] = [];
        }
        object[year].push(dj)
        return;
    }

    /* dj 를 key, 순위배열을 value로 하는 객체 만들기.
       2004~2021 17개의 200을 가진 빈 배열에 dj가 있을 경우 rank 로 변경. (year type = string)
       200 으로 한 이유 : 그래프 만들 때 순위권 밖이었던 연도는 그래프 밖으로 빼주기 위함.
     */
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

    /* djRankData 의 key 배열(=dj명) 과 입력된 djName 을 match 하여 matching key 배열을 반환.
       key 배열 공백 제거, djName 은 공백 제거, 대소문자 구분 없이 비교. 출력시 검색된 모든 key 값을 화면에 띄운다. */
    getMatchedDj(djName) {
        const djKey = this.djNameList
        const djKeyNoSpace = djKey.map((dj) => dj.replace(/ /gi, ""))
        const djNameReg = this.changeNameRegExp(djName)
        const matchedDjKey = this.checkKeyWithName(djKeyNoSpace, djNameReg, djKey);
        if(matchedDjKey.length === 0) {
            alert('없는 dj 입니다.')
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

    // parsing 및 json 형태로 된 img data를 받아 dj 당 img 객로 변환.
    // foreach 문에서 this 사용 시에는 인자로 참조할 this 를 지정해주어야함.
    getRequiredImgData(img) {
        const djImage = new Object();
        img.forEach(function (item) {
            const dj = item['dj']
            const imgLink = item['img']
            this.makeDjImg(djImage, dj, imgLink)
        }, this)
        return djImage;
    }

    // data에서 dj 를 key 로 img 를 value 로 하는 객체 생성. 한 dj당 img 갯수는 다 다르다.
    makeDjImg(object, dj, imgLink) {
        if(!object[dj]) {
            object[dj] = [];
        }
        object[dj].push(imgLink)
        return;
    }

    // djName 에 맞는 여러 이미지 링크 중 랜덤으로 하나를 반환한다.
    selectDjImg(djName) {
        const ImgArr = this.djImgData[djName];
        const max_num = ImgArr.length;
        const randomIndex = Math.floor(Math.random() * max_num)
        return ImgArr[randomIndex]
    }

    // 선택된 djName 에 맞는 imgData 객체의 dj key 를 찾아 해당 value 인 image link 를 반환한다.
    getMatchedImgKey(selectedKey) {
        const imgKey = Object.keys(this.djImgData)
        const imgKeyNoSpace = imgKey.map((dj) => dj.replace(/ /gi, ""))
        const selectedKeyReg = this.changeNameRegExp(selectedKey)
        const matchedImgKey = this.checkKeyWithName(imgKeyNoSpace, selectedKeyReg, imgKey)
        console.log(matchedImgKey)
        // 동일인이라도 비슷한 이름으로 여러개로 존재하여 첫번째 이름값을 선정하여 img link 를 얻는다.
        if(matchedImgKey.length === 0) {
            return false;
        }
        const matchedImgLink = this.selectDjImg(matchedImgKey[0])
        return matchedImgLink;
    }
}