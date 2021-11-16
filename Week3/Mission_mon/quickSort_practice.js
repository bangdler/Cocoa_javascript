// 맨 오른쪽 값을 pivot 으로 삼아 정렬하는 quick sort 함수


function quickSort (array, left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }

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

