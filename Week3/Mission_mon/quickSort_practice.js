// 맨 오른쪽 값을 pivot 으로 삼아 정렬하는 quick sort 함수


function quickSort (array, left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }
    // partition 을 기준으로 두 배열로 나누어서 재귀함수
    let partition = getPartition(array, left, right);
    console.log(array, partition, left, right)
    quickSort(array, left, partition - 1);
    console.log(array, partition, left, right)
    quickSort(array, partition + 1, right);
    return array;
}


function swap (array, prev, next) {
    const temp = array[prev];
    array[prev] = array[next];
    array[next] = temp;
}

// 기준값은 배열의 마지막이며, pivotIndex는 첫번째 값에서 시작하여 기준값보다 큰 값을 가르키다가 마지막에 기준값(pivot) swap을 통해 기준값을 가리키게 된다.
// 이는 partition 역할을 가능하게 한다.
function getPartition (array, left, right) {
    let pivot = array[right];
    let pivotIndex = left;
    for (let i = left; i < right; i++) {
        if (array[i] < pivot) {
            swap(array, i, pivotIndex);
            pivotIndex += 1;
        }
    }
    swap(array, pivotIndex, right)
    return pivotIndex
}

const array = [10, 30, 100, 50, 20, 60, 80, 70, 90]

console.log(quickSort(array))

