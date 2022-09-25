/***************************************************************************************************/
/* Leetcode Easy: 2 problems => Medium: 7 problem => Hard: 0 problem
/***************************************************************************************************/

// Leetcode #1480 Easy - Running Sum of 1D array
// Given an array nums. We define a running sum of an array as runningSum[i]=sum(num[0]-num[i]).
// return the running sum of nums.
// Ex: input nums=[1, 2, 3,4], output: [1, 3, 6, 10], runningSum = [1, 1+2, 1+2+3, 1+2+3+4]
// Ex: input nums=[1, 1, 1, 1, 1], output: [1, 2, 3, 4, 5], runningSum=[1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1]
// Ex: inptu nums=[3, 1, 2, 10, 1], output: [3, 4, 6, 16, 17]
class RunningSum_OneDArray {
    constructor() {};

    // Brute Force: T(n)=O(n)
    runningSum(nums) {
        let prefixsums = [], prefixsum=0;
        for (let i=0; i< nums.length; i++) {
            prefixsum += nums[i];
            prefixsums.push(prefixsum);
        }
        return prefixsums;
    }
}
const rs = new RunningSum_OneDArray();
console.log('Running Sum of 1D Array', rs.runningSum([1, 2, 3,4]));
console.log('Running Sum of 1D Array', rs.runningSum([1, 1, 1, 1, 1]));
console.log('Running Sum of 1D Array', rs.runningSum([3, 1, 2, 10, 1]));

// Leetcode #303 Easy - Range Sum Query - Immutable (input array won't be modified with insert or delete or re-arrange.)
// Given an integer array, nums, find the sum of the elements between indices i and j (i & j), inclusive.
// Implement the NumArray Class: NumArray(int[] nums). Initialize the object with the integer array nums.
// int sumRange(int i, int j), Return the sum of the elements of the nums array in the range [i, j], inclusive.
// i.e. sum(num[i] + nums[i+1]... + nums[j])
// Ex: input nums [-2, 0, 3, -5, 2, -1], calling sumRange(range): [0, 2] => [2, 5] => [0, 5], output: 1 => -1 => -3 
class RangeSumQuery {
    constructor(nums) {
        this.prefixsums=[];
        let prefixsum=0;
        for (let i=0; i< nums.length; i++) {
            prefixsum += nums[i];
            this.prefixsums.push(prefixsum);
        }
    }
    // 1) Brute Force: T(n)=O(n) per query, S(n)=O(1)
    //
    // 2) every query can be specified as a pair of numbers (i & j), 
    // - how many possible queries are there? (N choose 2) = n(n-1)/2 ways = O(n^2)
    // 1) Preprocessing: T(n)=O(1), S(n)=O(n^2)
    // - Use more space & store all answers to the n(n-1)/2 queries in advance, like in hashtable.
    // 
    // 3) Optimized version: T(n)=O(1), S(n)=O(n) - math trick
    // => adding 1+2+3+...+n = n(n+1)/2 => adding 1+2+3+...+100 = 100(101)/2 
    // => adding {1+2+3+...+108} 109+110+...+216 => 216(217)/2 - 108(109)/2

    // Enhance & Conquer Strategy (preprocess input & sotre) vs. Transform & Conquer (store input directly)
    sumRange(i, j) {
        return (i===0) ? this.prefixsums[j] : this.prefixsums[j] - this.prefixsums[i-1];
    }
}
const rsq = new RangeSumQuery([-2, 0, 3, -5, 2, -1]);
console.log('Range Sum Query 1D', rsq.sumRange(0, 2));
console.log('Range Sum Query 1D', rsq.sumRange(2, 5));
console.log('Range Sum Query 1D', rsq.sumRange(0, 5));

// Leetcode #304 Medium - Range Sum Query 2D
// Given 2D matrix, matrix, find the sum of the elements inside the rectangle defined by its upper left
// corner (row1, col1), and lower right corner (row2, col2)
// Given matrix: [
// [3, 0, 1, 4, 2],
// [5, 6, 3, 2, 1],
// [1, 2, 0, 1, 5],
// [4, 1, 0, 1, 7],
// [1, 0, 3, 0, 5] ]
// sumRange(2, 1, 4, 3) = 8, sumRange(1, 1, 2,2)=11, sumRange(1, 2, 2 4)=12
// 
class RangSumeQuery_2D {
    constructor(matrix) {
        if (matrix.length===0) { this.prefixsums=[]; return; }     //empty matrix

        this.prefixsums = Array(matrix.length).fill().map(()=>Array(matrix[0].length));
        this.prefixsums[0][0]=matrix[0][0];

        // Pre-Processing
        for (let row=1; row<matrix.length; row++) {                 // populate leftmost column
            this.prefixsums[row][0] = this.prefixsums[row-1][0] + matrix[row][0];
        }
        for (let col=1; col<matrix[0].length; col++) {             // populate topmost row
            this.prefixsums[0][col] = this.prefixsums[0][col-1] + matrix[0][col];
        }

        for (let row=1; row< matrix.length; row++) {
            for (let col=1; col<matrix[0].length; col++) {
                this.prefixsums[row][col] = matrix[row][col] + this.prefixsums[row][col-1] + this.prefixsums[row-1][col] - this.prefixsums[row-1][col-1];
            }
        }  // Complete Pre-Processing
    }
    // T(n)=O(1), S(m, n)=O(m * n)
    sumRange(row1, col1, row2, col2) {
        if (this.prefixsums.length===0) return 0;            //matrix is empty

        if (row1===0 && col1===0) return this.prefixsums[row2][col2];
        else if (row1===0) return this.prefixsums[row2][col2]- this.prefixsums[row2][col1-1];
        else if (col1===0) return this.prefixsums[row2][col2]- this.prefixsums[row1-1][col2];

        return this.prefixsums[row2][col2]-this.prefixsums[row2][col1-1]-this.prefixsums[row1-1][col2]+this.prefixsums[row1-1][col1-1];
    }
}
const rsqtowD = new RangSumeQuery_2D([
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5] ]);
console.log('Range Sum Query 2D', rsqtowD.sumRange(2, 1, 4, 3));
console.log('Range Sum Query 2D', rsqtowD.sumRange(1, 1, 2,2));
console.log('Range Sum Query 2D', rsqtowD.sumRange(1, 2, 2, 4));
const emptyD = new RangSumeQuery_2D([]);
console.log('Empty Range Sum Query 2D', emptyD.sumRange(2, 1, 4, 3));

// Leetcode #560 Medium - Subarray Sum Equals K
// Given an array of integers, nums, and integer k, return the total number of continuous subarrays whose sum equals to k.
// Ex: input: [1, 1, 1], k=2, output: 2, Ex: input: [1, 2, 3], k=3, output: 2 ([1, 2], [3])
// Constraints: array contains negative numbers & k can be negative.
//
// Think How Weaklings would approach this problem!
// Brute Force: what immediate come to mind or try to do things exhaustively compute sum of all subarrays (N choose 2 subarrays)
// - bring down Time Complexity to O(n^2) using precomputed Prefix Sums
// 
class SubarrySumEqualsK {
    constructor() {}

    // T(n) = O(n) - Linear Time
    // Decrease & Conquer: how does my element, nums[i], contribute to the answer?
    // - total # of subarrays addinhg up to k ending at index i (ending at last element @ index n-1)
    // - option #1 naive apporach: 
    //   - check each subarray length where sum = k & counter++ (len 1 @ index i, len 2 @ i-1 to i, len 3 @ i-2, to i ...to length i+1)
    //   - check subfix sum stored in each i, i-1, i-2, i-3 ... 0 = O(n^2) = just for index i
    // - option #2: each prefixsum ending @ index i = Red subfix + Yellow prefix
    //   - prefix j...i => prefixsums[i] - k = prefixsums[0...j-1]
    // (LC53) ask for prefixmaxsum @ index i vs. (LC 560) need prefixsum = k - nums[i] up to index i-1 (subordinate answer) 
    subarraySum(nums, k) {
        let hmap={ 0:1 }, count=0, prefixsum=0;               // hmap: key=prefixsum, value=count
        for (let i=0; i < nums.length; i++) {                       
            prefixsum += nums[i];                             // prefixsum[i] = k (prefixsum from subordinate @ i-1 + nums[i])                                
            if (hmap[prefixsum-k]) count += hmap[prefixsum-k];// prefixsum[i]-k= prefix [0...size j-1]

            if (hmap[prefixsum]) hmap[prefixsum]++;                
            else hmap[prefixsum]=1;                           // update hmap prefixsum ending at nums[i] 
        }
        return count;                                         
    }
}
const ssek = new SubarrySumEqualsK();
console.log('Subarray Sum Equals to K', ssek.subarraySum([1, 1, 1], 2));
console.log('Subarray Sum Equals to K', ssek.subarraySum([1, 2, 3], 3));

// Leetcode #974 Medium - Subarray Sum Divisible by K
// Given an array, A, of integers, return the numbers (contiguous, non-empty) subarrays that
// have a sum divisible by k.
// Ex: input: A=[4, 5, 0, -2, -3, 1], K=5, output: 7
// Ex: [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2. -3], [-2, -3]
// Goal: do this problem Linear Time: O(n) 
// Decrease & Conquer: # of subarrays have a sum divisble by k [ending at index i] => total i+1 subarrays
// - if we check every subarray (total i+1) ending @ each index i, T(n)=O(n^2) 
// Q: how many Red subfix are divisible by K? 
// 
// T(n)=O(n), S(k)=O(k) for hmap, hmap has entries upto index i-1
class SubarrayDivisible {
    constructor() {}

    subarrayDivisible(nums, k) {
        // hmap: key=prefixsum % k, value=count
    }
}

// Leetcode #325 Medium - Maximum Size Subarray Sum Equals K
// Given an array, nums, and a target value k, find the maximum length of a subarray that sums up to k.
// If there is none, return 0.
// Ex: input: [1, -1, 5, -2, 3], k=3, output: 4, Ex: [1, -1, 5, -2] sums to 3 is longest array.
// Ex: input: [-2, -1, 2, 1], k=1, output: 2, Ex: [-1, 2] sums upto 1 is longest array.
//
// Optimization problem: T(n)=O(n), S(n)=O(n)
class MaxSizeSubarray {
    // hmap: key=prefixsum, value=shortest length of subarray with sum adds upto (prefixsum-k)
    // (i+1) - hmap[prefixsum-k] = longest length subarray sums upto k
}

// Leetcode #1524 Medium - Number of Subarray with Odd Sum
// Given an array of integers, nums, return the number of subarrays with Odd Sum.
// As the number grows, the number needs to computed modulo 10^9+7 => % 1000000007
// Ex: input: [1, 3, 5], output: 4, Ex: all-subarrays: [[1], [1, 3], [1, 3, 5], [3], [3, 5], [5]], sums: [1, 4, 9, 3, 8, 5], odd-sums:4
// Ex: input: [2, 4, 6], output: 0, Ex: all-subarrays: [[2], [2, 4], [2, 4, 6], [4], [4, 6], [6]], sums: [2, 6, 12, 4, 10, 6], odd-sums:0
// Ex: input: [1, 2, 3, 4, 5, 6, 7], output: 16
// Ex: input: [100, 100, 99, 99], output: 4
// Ex: input: [7], output: 1
//
// Counting problem vs. Optimization problem => we are not always storing Prefixsum in Hmap => store count, "even/odd" count, etc.
// T(n)=O(n), (constant space) S(2)= 2 values in hmap or 2 variables


// Leetcode #525 Medium - Contiguous Array
// Given a binary array, find the maximum length of a 


// Leetcode #523 Medium - Contiguous SubArray Sum
// Given a list of non-negative numbers and a target ...
//
// @ index i, add prefixsum @ index i-1 in hmap???