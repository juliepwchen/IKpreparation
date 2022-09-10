const { MinHeap, MaxHeap } = require('./Heap');

/***************************************************************************************************/
/* Leetcode Easy: 5 problems => Medium: 1 problems => Hard: 1 problem
/***************************************************************************************************/

// Leetcode #1 Easy - 2 Sum
// Given an array of integers, return indices of the two numbers such that they add up to a special target.
// Each input has exactly 1 solution & cannot use the same element twice.
// Ex: input: [2, 7, 11, 15], target: 9, output: [0, 1]
class TwoSum_UnSorted {
    constructor() {}

    // Brute Force - return indices
    // T(n) = O(n squared), S(n)=O(1)
    // Only Brute Force returns correct indices in an unsorted input array. Sorting messes up order.
    twoSum_BruteForceForIndices(nums, target) {
        let result=[];
        for (let i=0; i< nums.length; i++) {
            for (let j=i+1; j< nums.length; j++) {
                if ( nums[i] + nums[j]===target ) result.push(i, j);
            }
        }
        return result;
    }
    // Brute Force - return True or False
    // T(n) = O(n squared), S(n)= O(1) - T(n) = n-1 + n-2 + n-2 + ... + 1 = n(n-1) / 2 (arithmetic series)
    twoSum_BruteForceForDecision(nums, target) {
        for (let i=0; i< nums.length; i++) {
            for (let j=i+1; j<nums.length; j++) {
                if ( nums[i] + nums[j]===target ) return true;
            }
        }
        return false;
    }
    // Divide & Conquer does not help with Time Complexity.
    // T(n) = O(n squared) => T(n/2) + T(n/2) + O(n squared) for merge = at least O(n squared)
    // S(n) = input + output + Aux space + callstack if recursive

    // Decrease * Conquer does not help with Time Complexity.
    // T(n) = = O(n squared) => O(n) + T(n-1) = O(n) + O(n-1) + T(n-2) = O(n) + O(n-1) + O(n-2) + ... O(1) 
    twoSum_DecreaseConquer(nums, target) {
        for (let i=0; i< nums.length; i++) {

            // Work TBD on each nums[i] general worker => Search for pairvallue via Linear Scan
            let pairvalue = target - nums[i];
            for (let j=i+1; j< nums.length; j++) {
                if (nums[j]===pairvalue) return true;
            }
        }
        return false;
    }
    // Transform & Conquer (Representation Change) improves Time Complexity.
    // Extra Aux Space: T(n)=O(n), S(n)=O(n) Hashtable
    twoSum_TransformConquer(nums, target) {
        let hmap = {};
        for (let i=nums.length-1; i>=0; i--) {          // Bottom up, n workers, O(n)

            // Work TBD for each nums[i] general worker, O(1) for Search in Hashtable
            let pairvalue = target - nums[i];
            if (hmap[pairvalue] !== undefined) return [ i, hmap[pairvalue] ];  // pair found, no need for the rest of loop
            hmap[ nums[i] ] = i;                          // end of Work TBD for each general worker
  
        }
        return [];
    }
}
const ts = new TwoSum_UnSorted();
console.log('Two Sum Brute Force return indices', ts.twoSum_BruteForceForIndices([2, 7, 11, 15], 9));
console.log('Two Sum Brute Force return a decision', ts.twoSum_BruteForceForDecision([2, 7, 11, 15], 9));
console.log('Two Sum Decrease & Conquer return a decision', ts.twoSum_DecreaseConquer([2, 7, 11, 15], 9));
console.log('Two Sum Transform & Conquer w Hashtable return indices', ts.twoSum_TransformConquer([2, 7, 11, 15], 9));

// Leetcode #167 Easy - 2 Sum II - Input Array is sorted
// Given an array of integers that are already sorted in Ascending Order. find 2 numbers such that they add up to a special target.
// The function should return two indices where index 1 < index 2.
// Ex: input: [2, 7, 11, 15], target: 9, output: [1, 2]
class TwoSum_Sorted {
    constructor() {}

    // Transform & Conquer - Pre-Sort O(n log n) + Two Pointer Pass O(n) => T(n)= O( n log n), faster than doing indepedant BST
    // No Aux Space: Pre-sort (in-place) + Two Pointer Pass (in-place)
    twoSum_TwoPointerPass(nums, target) {
        let i=0, j=nums.length-1;                           // Two Pointer Pass on 1 SAME array
        while (i < j) {                                     // when 2 pointers have not crossed each other
            let pairvalue = target-nums[i];
            if (nums[j] === pairvalue) return [i+1, j+1];   // LC#167: ask to return index starts at 1, so add 1 to indices
            else if (nums[j] > pairvalue) j--;
            else i++;                                       // if (nums[j] < pairvalue) means did n't find pairvalaue, go to next #
        }
        return [];
    }

    // Transform & Conquer - PreSort O(n log n) + BST O(n log n) => T(n)=O(n log n)
    // No Aux Space, each BST Search, Delete, Insert taks O(log n)
    twoSum_BST() {}

    // Transform & Conquer - PreSort O(n log n) + delete from MinHeap O(n log n) => T(n)=O(n log n)
    // No Aux Space: Pre-sort MinHeap (in-place), each Search, Delete, Insert for MinHeap taks O(log n) 
    twoSum_MinHeap() {}

}
const tss = new TwoSum_Sorted();
console.log('Two Sum Presort + Two Pointer Pass return indices', tss.twoSum_TwoPointerPass([2, 7, 11, 15], 9));

// Leetcode #349 Easy - Intersedtion of 2 Arrays 
// Given two arrays, write a function compute the intersection.
// Ex: input: nums1:[1, 2, 2, 1], nums2: [2, 2], output: [2]
// Ex: input: nums1:[4, 9, 5], nums2: [9, 4, 9, 8, 4], output: [9, 4]
class TwoArrays {
    constructor() {}

    // T(n) = O(m * n)
    intersection_BruteForce(nums1, nums2) {
        const result=new Set();
        for (let i=0; i< nums1.length; i++) {
            for (let j=0; j< nums2.length; j++) {
                if (nums1[i]===nums2[j]) result.add( nums1[i] );
            }
        }
        return result;
    }
    // T(n) = O(n log n = O(n log n) Presort + O( max(m, n))
    intersection_TwoPointerPass(nums1, nums2) {
        nums1.sort((a, b)=>a-b);
        nums2.sort((a, b)=>a-b);
        let i=0, j=0, result=new Set();
        while (i < nums1.length && j<nums2.length) {
            if (nums1[i] === nums2[j]) {
                result.add(nums1[i]);
                i++; j++;
            }
            else if (nums1[i] < nums2[j]) i++;
            else j++;
        }
        return result;
    }
}
let ta = new TwoArrays();
console.log('Two Arrays intersection Brute Force', ta.intersection_BruteForce( [1, 2, 2, 1], [2, 2] ));
console.log('Two Arrays intersection Two Pointer Pass', ta.intersection_TwoPointerPass( [4, 9, 5], [9, 4, 9, 8, 4] ));
console.log('Two Arrays intersection Two Pointer Pass', ta.intersection_TwoPointerPass( [1, 2, 2, 1],  [2, 2] ));

// Leetcode #252 Easy - Meeting Rooms
// Given an array of meeting time intervals consisting of start and end time [ [s1, e1], [s2, e2], ... ]
// (Si < Ei) determine if a person could attend all meetings.
// Ex: inpput: [[0, 30], [5, 10], [15, 20]], output: false
// Ex: input: [[7, 10], [2, 4]], output: true
class MeetingRooms {
    constructor() {}

    // Brute Force: T(n)=O(n squared)
    meetingRooms_BruteForce(intervals) {
        let nooverlap=true;
        for (let i=0; i< intervals.length; i++) {
            for (let j=i+1; j<intervals.length; j++) {
                // overlap checks: a-b...c-d OR c-d...a-b (2 meetings non-overlapping)
                // if (b-end <= c-start) OR (d-end <=  a-start) no overlap, else overlap
                if ( (intervals[i][1] <= intervals[j][0]) || intervals[j][1] <= intervals[i][0] ) nooverlap=true;
                else return false;                  // if any overlap, person coud not attend ALL meetings
            }
        }
        return nooverlap;
    }
    // Transform & Conquer: T(n)=O(n log n)
    meetingRooms(intervals) {
        intervals.sort((a, b)=> a[0]-b[0]);   // Transform: sort by start time, O(n log n)
        let nextstart=0;
        for (let i=0; i< intervals.length; i++) {
            // each manager handles interval[i] upto start of n next interval
            if (i === intervals.length-1) nextstart = Infinity;
            else nextstart = intervals[i+1][0];
            // start my intervaal
            if (intervals[i][1] > nextstart) return false;          // Conquer: O(n)
            // end all intervals before start of next intervals     // Not applicalbe for this LC problem
        }
        return true;
    }
}
let mr = new MeetingRooms();
console.log('Meeting Room Brute Force', mr.meetingRooms_BruteForce(  [[0, 30], [5, 10], [15, 20]] ));
console.log('Meeting Room Transform & Conquer', mr.meetingRooms(  [[0, 30], [5, 10], [15, 20]] ))
console.log('Meeting Room Brute Force', mr.meetingRooms_BruteForce(  [[7, 10], [2, 4]] ));
console.log('Meeting Room Transform & Conquer', mr.meetingRooms( [[7, 10], [2, 4]] ))

// Leetcode #215 Medium - kth largest element in an array
// Find the kth largest element in an unsorted array.
// Note that it is the largest element in the sorted order, not the kth distint element.
// Ex: input: [3, 2, 1, 5, 6, 4], k=2, output: 5
// Ex: input:: [3, 2, 3, 1, 2, 4, 5, 5, 6], k=4, output: 4
// Note: kth element always exist
class KthLargest {
    constructor() {}

    // T(n)= O(n log n) - Presort O(n log n) + Index Lookup O(1)
    kthLarget_BruteForce(nums, k)  {
        nums.sort((a, b)=>a -b);
        return nums[nums.length -k];
    }
    // T(n)=O(n) best, ave case, good randomiized pivot reduces problem by a Percentile Factor (Geometric Series)
    // vs. O(n squared) worst case when bad Pivot only reduces problem size only by 1 (Arithmetic Series)
    //
    // To find (n-k) element, Selection Sort T(n)=O(n squared), Bubble Sort O(n squared), Insertion Sort O(n squared)
    // Merge Sort O(n log n) to merge at final merge stage worst case
    // MinHeaap T(n)=O(n) build heap + O(log n) * k, where k=n worst case = O( n log n)
    // Space-Time Tradeoff T(n)= O(n * k) = O(n squared) worst case, M1...Mk O(k) per update via Linear Scan the array
    // MinHeap on Top K T(n)=O( n * log k) = O(n log n) worst case, O(log k) per Insert, Extract, O(1) per Peek
    // (BEST) Quick Select - only need to sort the side where (n-k) element located, O(n) best, ave case.
    // Quick Select: O( n squared) worst case when Decrease & Conquer by 1 vs. by a fraction of percentage (Ex: 5%)
    kthLargest_QuickSelect(nums, k) {
        let n=nums.length;
        this.helper(nums, 0, n-1, n-k);

        return nums[n-k];
    }
    helper(nums, start, end, kthIndex) {
        if (start === end) return;

        let pivotIndex = Math.floor(start + (end-start) * Math.random());
        this.swap(nums, start, pivotIndex);
        let smaller=start, pivot=nums[start];
        for (let larger=start+1; larger <= end; larger++) {
            if (nums[larger] <= pivot) {
                smaller++;
                this.swap(nums, smaller, larger);
            }
        }
        this.swap(nums, start, smaller);

        if (smaller === kthIndex) return;
        else if ((kthIndex) < smaller) this.helper(nums, start, smaller-1, kthIndex);
        else this.helper(nums, smaller+1, end, kthIndex);
    }
    swap(arr, x, y) {
        let temp = arr[x];
        arr[x]=arr[y];
        arr[y]= temp;
    }
}
let kl = new KthLargest();
console.log('Kth Largest element in one unsorted array', kl.kthLarget_BruteForce([3, 2, 1, 5, 6, 4], 2));
console.log('Kth Largest element in one unsorted array', kl.kthLargest_QuickSelect([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
console.log('Kth Largest element in one unsorted array', kl.kthLargest_QuickSelect([3, 2, 1, 5, 6, 4], 2));

// Leetcode #703 Easy - Kth largest element in a Stream
// Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the 
// sorted order. not the kth distinct element. Your constructor will accept an integer k & an integer array, nums, 
// which contains initial elements from the stream. For each call to the method KthLargest.add, returns the element
// representing the kth largest element in the stream.
// Ex: input: k=3, arr=[4, 5, 8, 2], kthLargest.add(3) returns 4; kthLargest.add(5) returns 5; 
// Ex: kthLargest.add(10) returns 5; kthLargest.add(9) returns 8; kthLargest.add(4) returns 8.
// NOTE: Stream vs. Array = 1) numbers coming in one at a time; 2) cannot access past or future numbers; 3) Need to
// answer the question after seeing each number.
//
// Time Complexity apply only to the nth number after it coming in. 
// Insertion Sort: store all numbers in sorted order, insert a number takes T(n)=O(n) + Look up  kth largest O(1) = total O(n), S(n) = O(n)
// Quick Select: store all numbers S(n)=O(n), no presort needed => Insert in array & takes T(n)=O(n) for nth number 
// MaxHeap: buildheap O(n), Insert a number O(log n) + Extract K times O(k log n) + reInsert k elements O(k log n), k is constant, total O(log n), S(n)=O(n)
// (BEST) Space-Time Tradeoff (MinHeap): store top K numbers M1...Mk in MinHeap, time per number = O(log k), S(k)=O(k) vs. store in Array O(k), S(k)=O(k)
class KthLargest_Stream {
    constructor(A, k) {
        this.minheap = new MinHeap(A);
        this.k = k;
    }
    // T(n)= O(log n)
    add(num) {
        this.minheap.insert(num);
        while (this.minheap.originalSize > this.k) {
            this.minheap.delete();
        }
        return this.minheap.peekAtRoot();
    }
}
let kthLargest = new KthLargest_Stream([4, 5, 8, 2], 3);
console.log('KthLargest in a stream', kthLargest.add(3));
console.log('KthLargest in a stream', kthLargest.add(5));
console.log('KthLargest in a stream', kthLargest.add(10));
console.log('KthLargest in a stream', kthLargest.add(9));
console.log('KthLargest in a stream', kthLargest.add(4));

// Leetcode #295 Hard - Find Median from Data Stream
// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. 
// So the Median is the mean of the two middle value. 
// Ex: input: [2, 3,4 ], median: 3; Ex: input: [2, 3], median: (2+3)/2 = 2.5
// Design a data structure that support 2 operations: addNum(num) - add an integer from data stream to the data structure
// findMedian() - return median of all elements so far
//
// Tip: need to store all numbers
// QuickSelect - insert num into unsorted array + QuickSelect on middle index = O(n) for each number
// Insertion Sort - insert into sorted array O(n) for each new num
// (Best) Minheap for top n/2 numbers + MaxHeap for bottom n/2 numbers => Median = ave of 2 Roots if sizes are equal
class Median_Stream {
    constructor(nums) {
        this.median=0.0, this.nums = nums;
        this.minheap = new MinHeap([]), this.maxheap = new MaxHeap([]);

        // Stream
        for (let i=0; i< nums.length; i++) this.addNum(nums[i]);
    }
    addNum(num) {
        if (num > this.median) {
            this.minheap.insert(num);
            //Rebalance
            if (this.minheap.originalSize - this.maxheap.size === 2) {
                this.maxheap.insert( this.minheap.delete() );        // extract Root from minheap & insert it into maxheap
            }
        } else {                                                     // num is <= median
            this.maxheap.insert(num);
            //Rebalance
            if (this.maxheap.size - this.minheap.originalSize === 2) {
                this.minheap.insert( maxheap.delete() );
            }
        }
    }
    findMedian() {
        if (this.minheap.originalSize === this.maxheap.size) return(this.minheap.peekAtRoot() + this.maxheap.peekAtRoot())/2;
        else if (this.minheap.originalSize > this.maxheap.size) return this.minheap.peekAtRoot();
        else return this.maxheap.peekAtRoot();                       // when maxheap.size > minheap.size
    }
}
const ms = new Median_Stream( [2, 3,4 ]);
console.log('Find Median in a Stream', ms.findMedian());
const ms2 = new Median_Stream( [2, 3]);
console.log('Find Median in a Stream', ms2.findMedian());