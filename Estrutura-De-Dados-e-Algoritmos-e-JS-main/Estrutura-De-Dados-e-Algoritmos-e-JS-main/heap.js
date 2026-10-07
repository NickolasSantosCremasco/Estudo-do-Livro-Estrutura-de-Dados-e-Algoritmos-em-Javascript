export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = [];

    }

    getLeftIndex(index) {
        return 2 * index + 1;
    }

    getRightIndex(index) {
        return 2 * index + 2;
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false
    }

    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index)
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        this.siftDown(0);
        return removedValue;
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN) {
            element = left;
        }

        if (right < size && this.compareFn(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN) {
            element = right;
        }

        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
    
}

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

//Reescrevendo a função na ECMAScript

const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];

//Acima é usada a funcionalidade de desestruturação de objetos


const heap = new MinHeap();
heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)

console.log('Heap size: ', heap.size()); // 5
console.log('heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1

heap = new MinHeap();
for (let i = 1; i < 10; i++) {
    heap.insert(i);
}
console.log('Extract minimum: ', heap.extract());

export class MaxGeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

const maxHeap = new maxHeap()

maxHeap.insert(2);
maxHeap.insert(4);
maxHeap.insert(3);
maxHeap.insert(5);
console.log('Heap size:', maxHeap.size()); // 4
console.log('Heap min value: ', maxHeap.findMinimum()); // 5





function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn); // 1 passo
    while (heapSize > 1) {
        swap(array, 0, --heapSize); // 2 passo
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(Array.length / 2); i >= 0; 9 -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array
}

const array = [7, 6, 3, 5, 4, 1, 2];
console.log('Before Sorting: ', array)
console.log('After sorting: ', heapSort(array));