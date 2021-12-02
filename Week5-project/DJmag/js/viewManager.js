
export class ViewManager {
    constructor() {
        this.$djNameSearch = document.querySelector('#djNameSearch');
        this.chart = null;
    }

    //검색된 dj 이름들이 링크로 보여진다.
    renderSearchedDj(djNameArray) {
        const $searchedDj = document.querySelector('#searchedDj')
        djNameArray.forEach(function (dj) {
            $searchedDj.innerHTML += `<li><span role="button" tabindex="0" class="djSelect" id="${dj}">${dj}</span></li>`
        })
    }

    clearSearchedDj($searchedDj) {
        $searchedDj.innerHTML = null;
    }

    renderYearTop100(yearTop100) {
        const $searchedDj = document.querySelector('#searchedDj')
        yearTop100.forEach(function (dj, index) {
            $searchedDj.innerHTML += `<li><span role="button" tabindex="0" class="djSelect" id="${dj}">${index + 1}위 ${dj}</span></li>`
        })
    }

    renderDjName(selectedKey) {
        const $djName = document.querySelector('#djName')
        $djName.innerHTML = `<div class="col-3"><span class="badge bg-primary">${selectedKey}</span></div>`
    }

    renderDjRankTrend(yearList, selectedRankArray, djName) {
        if(this.chart)
            this.chart.destroy();
        console.log(yearList)
        console.log(yearList[0])
        const config = {
            type: 'line',
            data: {
                labels: yearList.reverse(),
                datasets: [{
                    label: djName,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: selectedRankArray,
                }]
            },
            options: {
                scales: {
                    y: {
                        reverse: true,
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label == 0)
                                    return label+1
                                else
                                    return label
                            }
                        }
                    }
                }
            }
        };
        let currentChart = document.getElementById('rankingChart')
        this.chart = new Chart(currentChart, config);

        // 그래프 추가하기 시도
        // else {
        //     let new_data = {
        //         label: djName,
        //         backgroundColor: 'rgb(255, 99, 132)',
        //         borderColor: 'rgb(255, 99, 132)',
        //         data: selectedRankArray,
        //     }
        //     this.chart.data.datasets.push(new_data)
        //     this.chart.update()
        // }
    }

    addDropdownList(yearArray) {
        const $dropdownMenu = document.querySelector('.dropdown-menu')
        console.log(yearArray[0])
        const reverseYear = yearArray.reverse();
        reverseYear.forEach(function(year){
            $dropdownMenu.innerHTML += `<li><a class="dropdown-item" id="${year}" href="#">${year}</a></li>`
        })
    }

    renderDjImg(djImgLink) {
        const $djImg = document.querySelector('#djImg')
        if(!djImgLink) {
            $djImg.innerHTML = `<img src="https://www.seekpng.com/png/detail/423-4235598_no-image-for-noimage-icon.png" class="img-thumbnail" alt="...">`
        }
        else {
            $djImg.innerHTML = `<img src="${djImgLink}" class="img-fluid" alt="...">`
        }
    }
}