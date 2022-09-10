// Transform & Conquer - Heap Sort
// T(n)= O(n log n)
// Not Stable - in-place 
class MinHeap {
    constructor(A) {
        this.originalSize = A.length;               // # of elements in the heap
        A.unshift(-1);                              // underlying array contains elements from 1...n
        this.A = A;
        this.buildheap();                           // build heap O(n)
    }
    // T(n) = O(n), overall HeapSort is still O(n log n) 'cause delete n elements from a Heap: O(n log n)
    buildheap() {
        //for (let i=this.A.length-1; i >0; i--) {  // going up the tree nodes from right to left @ decreasing levels
        for (let i=this.originalSize; i >0; i--) { 
            this.heapify(i);                        // and fix subtree rooted at each node for heap property
        }
    }
    // T(n)=O(n log n) for extraction from Root & place at end of array
    // S(n)=O(n), in-place
    heapSort_InPace() {
        if (this.originalSize===0) return null;
    
        for (let i=1; i< this.A.length; i++) {
            this.swap (this.A, 1, this.A.length-i);
            this.originalSize--;
            if (this.originalSize >=1) this.heapify(1);
        }
        return this.A.slice(1);                     // For Min Heap, need to reverse array to print in Ascending Order
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // fix subtree rooted at index if heap property is violated - swap root with smaller child down the tree path
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    heapify(index) {
        let smallerchildindex = this.getsmallerchild(index);
        while (smallerchildindex !== -1 && this.A[index] > this.A[smallerchildindex]) {
            this.swap(this.A, index, smallerchildindex);
            index = smallerchildindex;
            smallerchildindex=this.getsmallerchild(index);
        }
    }
    getsmallerchild(i) {
        let res = -1;
        if (this.leftchild(i) !== -1) res = this.leftchild(i);
        if (this.rightchild(i) !== -1) {
            if (res === -1) res = this.rightchild(i);                                       // left child does not exist
            else if (this.A[res] > this.A[ this.rightchild(i) ]) res = this.rightchild(i);  // if left child > right child
        }
        return res;
    }
    // parent index: Math.floor( i/2 ), left child: 2i, right child: 2i+1 for Node at index i
    parent(i) {
        return Math.floor(i/2);                                 // return 0 if i=1 (Root)
    }
    leftchild(i) {
        if (2*i <= this.originalSize) return 2*i;               //if (2*i < this.A.length ) return 2*i;
        else return -1;
    }
    rightchild(i) {
        if ((2*i + 1) <= this.originalSize) return (2*i+1);     //if ((2*i + 1) < this.A.length) return (2*i+1);
        else return -1;
    }
    // Delete Root by swap with last element & pop last element => heapify from Root
    delete() {
        if (this.originalSize===0) return null;
        this.swap(this.A, 1, this.A.length-1);
        let popped = this.A.pop(); this.originalSize--;
        if (this.originalSize >=1) this.heapify(1);
        return popped;
    }
    insert(key) {
        this.A.push(key); this.originalSize++;
        let currentindex = this.A.length-1;                       // start @ end of array = A.length after size increases 1
        let parentindex = this.parent(currentindex);
        while (parentindex !==0 && this.A[parentindex] > this.A[currentindex] ) {
            this.swap(this.A, currentindex, parentindex);         // swim up smaller value by swap with parent
            currentindex = this.parent(currentindex);
            parentindex=this.parent(currentindex);
        }
    }
    peekAtRoot() {
        return this.A[1];
    }
    heapSort_ExtraAux(minheap) {
        let res = [];
        while (minheap.originalSize > 0) {
            res.push(minheap.delete());
        }
        return res;
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y] = temp;
    }
}

class MaxHeap {
    constructor(A) {
        this.size = A.length;
        A.unshift(-1);              // populate 1st element with -1
        this.A = A;                 // new array
        this.buildheap();
    }
    // T(n)=O(n)
    buildheap() {
        for (let i=this.size; i>0; i--) {
            this.heapify(i);
        }
    }
     // T(n)=O(n log n) for extraction from Root & place at end of array
     // S(n)=O(n), in-place
     heapSort_InPace() {
        if (this.size===0) return null;
    
        for (let i=1; i< this.A.length; i++) {
            this.swap (this.A, 1, this.A.length-i);
            this.size--;
            if (this.size >=1) this.heapify(1);
        }
        return this.A.slice(1);                     // For Min Heap, need to reverse array to print in Ascending Order
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // fix subtree rooted at index if heap property is violated - swap root with larger child down the tree path
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    heapify(index) {
        let largerchildindex = this.getlargerchild(index);
        while (largerchildindex !== -1 && this.A[index] < this.A[largerchildindex]) {
            this.swap(this.A, index, largerchildindex);
            index = largerchildindex;
            largerchildindex=this.getlargerchild(index);
        }
    }
    getlargerchild(i) {
        let res = -1;
        if (this.leftchild(i) !== -1) res = this.leftchild(i);
        if (this.rightchild(i) !== -1) {
            if (res === -1) res = this.rightchild(i);                                       // left child does not exist
            else if (this.A[res] > this.A[ this.rightchild(i) ]) res = this.leftchild(i);  // if left child > right child
        }
        return res;
    }
     // parent index: Math.floor( i/2 ), left child: 2i, right child: 2i+1 for Node at index i
    parent(i) {
        return Math.floor(i/2);                                 // return 0 if i=1 (Root)
    }
    leftchild(i) {
        if (2*i <= this.size) return 2*i;                       //if (2*i < this.A.length ) return 2*i;
        else return -1;
    }
    rightchild(i) {
        if ((2*i + 1) <= this.size) return (2*i+1);             //if ((2*i + 1) < this.A.length) return (2*i+1);
        else return -1;
    }
     // Delete Root by swap with last element & pop last element => heapify from Root
     // Sink Down operation => T(n) = O(log n)
     delete() {
        if (this.size===0) return null;
        this.swap(this.A, 1, this.A.length-1);
        let popped = this.A.pop(); this.size--;
        if (this.size >=1) this.heapify(1);
        return popped;
    }
    // Swim up Operation => T(n) = O(log n)
    insert(key) {
        this.A.push(key); this.size++;
        let currentindex = this.A.length-1;                       // start @ end of array = A.length after size increases 1
        let parentindex = this.parent(currentindex);
        while (parentindex !==0 && this.A[parentindex] < this.A[currentindex] ) {
            this.swap(this.A, currentindex, parentindex);         // swim up larger value by swap with parent
            currentindex = this.parent(currentindex);
            parentindex=this.parent(currentindex);
        }
    }
    peekAtRoot() {
        return this.A[1];
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y] = temp;
    }
}

// let hs = new MinHeap([7, 10, 4, 5, 2]);                        
// console.log('Min Heap Extract', hs.delete());
// console.log('MinHeap array after delete from Root', hs.A);
// hs.insert(2);
// console.log('MinHeap array After Insert', hs.A);
// console.log('Min Heap Sort in-place', hs.heapSort_InPace());
// let hs2 = new MinHeap([5, 1, 3, 2]);
// console.log('Min Heap Sort in-place', hs2.heapSort_InPace());
// let hs3 = new MinHeap([8, 11, 5, 6, 3]);
// console.log('Min Heap Sort with Aux Space', hs.heapSort_ExtraAux(hs3));

// let mh = new MaxHeap([7, 10, 4, 5, 2]);   
// mh.insert(8);
// console.log('Max Heap Sort in-place', mh.heapSort_InPace());

module.exports = { MinHeap, MaxHeap }