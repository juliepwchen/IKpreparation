const collections = require('pycollections');
const MinHeap = require('./Heap');
/***************************************************************************************************/
/* Leetcode Easy: 0 problems => Medium: 1 problem => Hard: 0 problem
/***************************************************************************************************/

// Leetcode #912 Mediumm - Sort an array
// Given an array of integers, nums, sort the array in ascending order
// Ex: iput = [5, 2, 3, 1], output: [1, 2, 3, 5]
// Ex: input=[  5, 1, 1, 2, 0, 0], output: [0, 0, 1, 1, 2, 5]

// Brute Forece - Selection Sort
// T(n) = O(n squared)
// Not Stable - in-place
class SelectionSort {
    constructor() {}

    selectionSort_string(S) {
        let n=S.length;
        let sArr = S.split('');
        for (let i=0; i<n; i++) {
            let miniindex=i;
            for (let j=i+1; j < n; j++) {
                if (sArr[j]< sArr[miniindex]) miniindex=j;
            }
            this.swap(sArr, i, miniindex);
        }
        return sArr.join('');
    }
    selectionSort_digits(A) {
        let n=A.length;
        for (let i=0; i<n; i++) {
            let minindex=i;
            for (let j=i+1; j < n; j++) {
              if (A[j] < A[minindex]) minindex=j;
            }
            this.swap(A, i, minindex);
        }
        return A;
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y]= temp;
    }
}
let ss = new SelectionSort();
console.log('Selection Sort', ss.selectionSort_string("SORTEXAMPLE"));
console.log('Selection Sort with digits', ss.selectionSort_digits([2, 5, 4, 10, 7]));
console.log('Selection Sort with digits', ss.selectionSort_digits([5, 2, 3, 1]));
console.log('Selection Sort with digits', ss.selectionSort_digits([ 5, 1, 1, 2, 0, 0]));

// Brute Force - Bubble Sort
// T(n) = O(n squared)
// Stable - in-place
class BubbleSort {
    constructor() {}

    bubbleSort(A) {
        let n=A.length;
        for (let i=0; i<n; i++) {
            for (let j=n-1; j > i; j--) {
                if (A[j] < A[j-1]) this.swap(A, j, j-1);
            }
        }
        return A; 
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y]= temp;
    }
}
let bs = new BubbleSort();
console.log('Bubble Sort with digits', bs.bubbleSort([2, 5, 4, 10, 7]));
console.log('Bubble Sort with digits', bs.bubbleSort([5, 2, 3, 1]));
console.log('Bubble Sort with digits', bs.bubbleSort([ 5, 1, 1, 2, 0, 0]));

// Decrease & Conquer - Insertion Sort
// Worst T(n)=O(n squared), Best T(n)=O(n), array sorted & small array
// Stable - in-place
class InsertionSort {
    constructor() {}

    insertionSort(A) {
        let n=A.length;
        for (let i=0; i<n; i++) {
            let ielement = A[i];
            let j = i-1;
            while (j >=0 && ielement < A[j]) {
                A[j+1] = A[j];
                j--;
            }
            A[j+1] = ielement;
        }
        return A;
    }
}
let is = new InsertionSort();
console.log('Insertion Sort with digits', is.insertionSort([2, 5, 4, 10, 7]));
console.log('Insertion Sort with digits', is.insertionSort([5, 2, 3, 1]));
console.log('Insertion Sort with digits', is.insertionSort([ 5, 1, 1, 2, 0, 0]));

// Divide & Conquer - Merge Sort
// T(n) = O(n logn), S(n) = callstack O(logn), height of recursion tree + Aux space O(n)
// Stable - auxiliary space
class MergeSort {
    constructor() {}

    mergeSort(A) {
        this.helper(A, 0, A.length-1);
        return A;
    }
    helper(A, start, end) {
        if (start === end) return;

        let mid = Math.floor(start + (end-start)/2);    // (start+end)/2 causes overflow
        this.helper(A, start, mid);
        this.helper(A, mid+1, end);

        let i=start, j=mid+1, aux=[];
        while(i <=mid && j<=end) {
            if (A[i] <= A[j]) {
                aux.push(A[i]);
                i++;
            } else if (A[j] < A[i]) {
                aux.push(A[j]);
                j++;
            }
        }
        while (i <= mid) {
            aux.push(A[i]);
            i++;
        }
        while (j <= end) {
            aux.push(A[j]);
            j++;
        }
        A.splice(start, aux.length, ...aux);            // copy aux to A[start...end]
    }
}
let ms = new MergeSort();
console.log('Merge Sort with digits', ms.mergeSort([2, 5, 4, 10, 7]));
console.log('Merge Sort with digits', ms.mergeSort([5, 2, 3, 1]));
console.log('Merge Sort with digits', ms.mergeSort([ 5, 1, 1, 2, 0, 0]));

// Divide & Conquer - Quick Sort
// T(n) = O(n log n) best, O(n squared) worst case (Ex: reversed sorted array)
// Not Stable - in-place
class QuickSort {
    constructor() {}

    quickSort_Lumoto(A) {
        this.helper_lumoto(A, 0, A.length-1);
        return A;
    }
    quickSort_Hoare(A) {
        this.helper_hoare(A, 0, A.length-1);
        return A;
    }
    helper_lumoto(A, start, end) {
        if (start >= end) return;

        //  Randomized Quicksort Algorithm
        let pivotIndex = Math.floor(start + (end-start) * Math.random());     // Ex: Math.floor(Math.random()*3) returns 0, 1, 2
        this.swap(A, start, pivotIndex);
        let pivot = A[start];
        let smaller=start;                                      
        for (let larger=start+1; larger <=end; larger++) {                    // Lumoto's Partitioning: O(n) tine, in-place
            if (A[larger] < pivot) {
                smaller++;
                this.swap(A, larger, smaller);
            }                                                   
        }
        this.swap(A, start, smaller);

        this.helper_lumoto(A, start, smaller-1);
        this.helper_lumoto(A, smaller+1, end);
    }
    // Hoare's Partition: T(n)=O(n), but overall Quicksort = O(n log n)
    helper_hoare(A, start, end) {
        if(start >= end) return;

        let pivot = A[start];
        let smaller=start+1, larger = end;
        while (smaller <= larger) {
            if (A[smaller] < pivot) smaller++;
            else if (A[larger] > pivot) larger--;
            else {
                this.swap(A, smaller, larger);
                smaller++; larger--;
            }
        }
        this.swap(A, start, larger);

        this.helper_hoare(A, start, larger-1);
        this.helper_hoare(A, larger+1, end);
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y] = temp;
    }
}
let qs = new QuickSort();
console.log('Quick Sort Lumoto', qs.quickSort_Lumoto([2, 5, 4, 10, 7]));
console.log('Quick Sort Hoare', qs.quickSort_Hoare([2, 5, 4, 10, 7]));
console.log('Quick Sort Lumoto', qs.quickSort_Lumoto([5, 2, 3, 1]));
console.log('Quick Sort Hoare', qs.quickSort_Hoare([5, 2, 3, 1]));
console.log('Quick Sort Lumoto', qs.quickSort_Lumoto([ 5, 1, 1, 2, 0, 0]));
console.log('Quick Sort Hoare', qs.quickSort_Hoare([ 5, 1, 1, 2, 0, 0]));

// Transform & Conquer - Heap Sort
// T(n)= O(n log n)
// Not Stable - in-place 
let hs = new MinHeap([7, 10, 4, 5, 2]);                        
console.log('Min Heap Extract', hs.delete());
console.log('MinHeap array after delete from Root', hs.A);
hs.insert(2);
console.log('MinHeap array After Insert', hs.A);
console.log('Min Heap Sort in-place', hs.heapSort_InPace());
let hs2 = new MinHeap([5, 1, 3, 2]);
console.log('Min Heap Sort in-place', hs2.heapSort_InPace());
let hs3 = new MinHeap([8, 11, 5, 6, 3]);
console.log('Min Heap Sort with Aux Space', hs.heapSort_ExtraAux(hs3));

// Counting Sort - non-omparison-based algorithm - best for narrow range values & lots of duplicates
// T(n)= O(n + k) = O(n) Linear Time Complexity, S(n)=O(k) for aux space
// Stable if implemented requires Aux space
class CountingSort {
    constructor() {}

    countingSort(A) {
        // create Counter array & increment count for duplicate values
        let counter = new collections.Counter(A);
        //console.log(counter.mostCommon())                 // Ex: k=4, [ [ 0, 2 ], [ 1, 2 ], [ 2, 1 ], [ 5, 1 ] ]
        let result=[];
        for (let i=-50000; i<=50000; i++) {
            if (counter.get(i) !== 0) {                     // check to see if i value is already in Counter & check # of duplicates
                for (let j=0; j< counter.get(i); j++) {     // add j times of duplicates of same value i - Ex: 2 times for zero
                    result.push(i);
                }
            }
        }
        return result;
    }
}
let cs = new CountingSort();
console.log('Counting Sort', cs.countingSort([ 5, 1, 1, 2, 0, 0, -10, -10, -100, -100]));

// Radix Sort - Best for 32 bits integer array using base 256 (2 to 8th) = 100000000 (9 bits)
// T(n)=O(n), 4n per integer, S(n)=O(256), when using base 256
// Stable if implemented - Aux space
//
// JS stores numbers as 64 bits floating point numbers, but all bitwise operations are performed on 32 bits binary numbers.
// Before a bitwise, JS converts numbers to 32 bits signed integers.
// After the bitwise, the result is converted back to 64 bits numbers.
// To get 2’s complement of a binary number, invert all bits & add 1 to the least significant bit (LSB).
// 255 = 8 bits = 11111111 -  - using bitmask to access individual bits
class RadixSort {
    constructor() {}

    radixSort(A) {
        for (let i=0; i<2; i++) {
            // Shifts left 8 bits by pushing zeros in from the right & let leftmost bits fall off
            let bitmask = (255 << (8*i));      
            let c = new collections.DefaultDict([].constructor);
            for (let index=A.length-1; index>=0; index--) {
                c.get( A[index] & bitmask ).push(A[index]);             //Bitwise &: set bits to 1 if both bits are 1
            }     
            let aux=[]; 
            for (let key=0; key<256; key++) {
                while (c.get( key << (8*i) ).length > 0) {
                    aux.push( c.get( key << (8*i) ).pop() );
                }
            }
            A = aux;
        }
        let negative=[], positive=[];
        for (let i=0; i< A.length; i++) {
            if (A[i] <0) negative.push(A[i]);
            else positive.push(A[i]);
        }
        negative = [...negative, ...positive];
        return negative;
    }

}
let rs = new RadixSort();
console.log('Radix Sort', rs.radixSort([ 5, 1, 1, 2, 0, 0, -100, -10, -10, -100]));

