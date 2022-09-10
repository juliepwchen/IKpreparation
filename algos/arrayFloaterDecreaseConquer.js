/***************************************************************************************************/
/* Leetcode Easy: 2 problems => Medium: 5 problem => Hard: 0 problem
/***************************************************************************************************/
/***************************************************************************************************/
// Decrease & Conquer Template/Thought Process: 
// Sort:
// 1) Top Down: lazy manager focus on "Work TO DO" of leftmost element => reduces problem from n to n-1
// 2) Bottom Up: lazy manager assumes n-1 problem has been solved => incorporate n element into sollution
// Search on 2D sortedd Matrix:
// 1) reduce Time Complexity from Brute Force, O(n squred) to O(n) by looking at each row/coluumn O(1) time
// 2) reduce problem from n to n-1 by looking at only 1 value at each row => reduce 1 row or 1 column
// Optimization: 
// 1) Bottom Up: lazy manager assumes n-1 problem has been solve => subordinates come back with answers
// 2) each subordinate works on 1 local answer to return to its manager + 1 global answer
// 3) as a lazy manager, I check if my answer would overturn my subordinate's answer.
/***************************************************************************************************/

// Leetcode #969 Medium - Pancake Sorting
// Given an array of integers, arr, sort the array by performing a series of pancake flips.
// In one pancake flip we do the following steps: 1) choose an integer k where 1<= k <= arr.length
// 2) Reverse the sub-array, arr[1..k]; Return the k-values cooresponding to a sequence of pancake flips 
// that sort arr. Any valid answer that sorts that array within 10 * arr.length flips will be judged as correct. 
// Ex: input arr=[3, 2, 4, 1], output: [4, 2, 4, 3] - from the problem
class PancakeSort {
    constructor(pancakes) {
        this.pancakes = pancakes;
    }
    // T(n)= O(n squared), S(n)=O(1), take 2(n-1) flips to sort array
    // ideally, when sorted, pancakes array consists of pancake size 1, 2, 3, ... n @ index 0, 1, 2,3, ... n-1
    pancakeSort() {
        let flipsIndex=[];
        
        for (let i=this.pancakes.length-1; i >0; i--) {      // Flip from Bottom Up
            // Each Manager needs to find largest pancake & move it to the bottom layer
            // Ex: move n size pancake to nth index
            if (this.pancakes[i] !== i+1) {                  // if ith pancake is not the right size
                let j=Infinity;                         
                for (j=i-1; j>=0; j--) {                     // find pancake with right size
                    if (this.pancakes[j] === i+1) break;     // @ index j, right size (i+1) pancake is found
                }                   
                this.pancakeFlip(this.pancakes, j);          // flip pancake (reverse) stack 0...j
                this.pancakeFlip(this.pancakes, i);          // flip pancake (reverse) stack 0...i
                flipsIndex.push(j+1);                        // 2 flips to move jth pancake to ith index
                flipsIndex.push(i+1);                        // 2 flips: record # of pancakes being flipped from from jth & ith
            }
        }
       return flipsIndex;
    }
    pancakeFlip(pancakes, flipPos) {
        let subarr = pancakes.slice(0, flipPos+1);           // slice(start, end), non-inclusive, +1 to include j element
        subarr.reverse();
        pancakes.splice(0, subarr.length, ...subarr);
    }
}
const ps = new PancakeSort([3, 2, 4, 1]);
console.log('Pancake Sort', ps.pancakeSort(), 'sorted array', ps.pancakes);   // 2(n-1) = 6 flips: [3, 4, 2, 3, 1, 2]

// Leetcode #280 Medium - Wiggle Sorting
// Given an unsorted array, nums, reorder it in-place such that nums[0] <= nums[1] >= nums[2] <= nums[3]...
// Ex: input: nums = [3, 5, 2, 1, 6, 4], output: [3, 5, 1, 6, 2, 4]
class WiggleSort {
    constructor() {}

    // T(n)=O(n), S(n)=O(1)
    // nums[evenIndex] < nums[oddIndex]
    wiggleSort(nums) {
        let n=nums.length;
        for (let i=n-1; i>=0; i--) {                        // Bottom Up 
            if ((i %2 ===0 && nums[i] > nums[i-1]) || (i%2===1 && nums[i] < nums[i-1])) 
                this.swap(nums, i, i-1);
        }
        return nums;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
const ws=new WiggleSort();
console.log('Wiggle Sort', ws.wiggleSort([3, 5, 2, 1, 6, 4]));

// Leetcode #240 Medium - Search a 2D Matrix 
// Write an efficient algorithm that searches for a target value in an m * n integer matrix.
// The matrix has the following properties:
// 1) Integers in each row are sorted in ascending order from leftr to right; 
// 2) Integer in each column are sorted in ascending order from top to bottom.
// Ex: input matrix: [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
// target 5, output: true
class SearchMatrix {
    constructor() {}

    // T(m, n)=O(m * n), S(n)=O(1)
    search(matrix, target) {
        let rowSize=matrix.length, columnSize=matrix[0].length, row=0, column=columnSize-1;
        while (row < rowSize && column >=0) {
            if (target === matrix[row][column]) return true;
            if (target > matrix[row][column]) row++;        // eliminate 1 row
            else column--;                                  // eliminate 1 column
        }
        return false;
    }
}
const som = new SearchMatrix();
console.log('Search Matrix', som.search([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5));

// Leetcode #227 Medium - Find the Celebrity (Universal Sink Problem)
// Suppose you are at a party with n people (labled from 0 to n-1) and among them, there may exist one celebrity.
// The definition of a celebrity is that all the other n-1 people know him/her, but he/she does not any of them.
// Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed
// to do is to ask questions like: 'Hi, A, Do you know B?' to get information about whether A knows B. You need to
// find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).
// You are given a helper funtion, bool knows(a, b), which tells you whether A knows B. Implement a funciton
// int findCelebrity(n). There will be exactly 1 celebrity if he/she is in the party. Return the celebrity's label
// if there is a celebrity in the party.  If there is no celebrity, return -1.
// Ex: input graph: [[1, 1, 0], [0, 1, 0], [1, 1, 1]], output: 1; input graph: [[1, 0, 1], [1, 1, 0], [0, 1, 1]], output: -1
class FindCelebrity {
    constructor() {}

    // T(n) = O(n), S(n)=O(1)
    findCelebrity(matrix) {
        let survivor=0;                                             // start @ Person index 0
        let n=matrix.length;                                        // n=number of Persons (Ex: 3 people in 3x3 matrix)
        // O(n)
        for (let i=1; i<n; i++) {
            if (this.knows(matrix, survivor, i)) survivor=i;        // if survivor knows i => i survives as a potential celebrity
        }                                                           // otherwise, i is out & survivor is a potential celebrity
        // O(n)                                               
        for (let p=0; p<n; p++) {                                   // survivor = nth element => need to validate survivor is a celebrity
            if (p !== survivor) {
                if (this.knows(matrix, survivor, p) 
                || (!this.knows(matrix, p, survivor))) return -1;  // if survivor knows p||p doesn't know survivor, survivor not a celebrity
            }
        } 
        return survivor;
    }
    knows(table, a, b) {
        if (table[a][b]===1) return true;
        return false;
    }
}
const fc = new FindCelebrity();
console.log('Find Celebrity', fc.findCelebrity([[1, 1, 0], [0, 1, 0], [1, 1, 1]]));
console.log('Find Celebrity', fc.findCelebrity([[1, 0, 1], [1, 1, 0], [0, 1, 1]]));

// Leetcode #53 Easy - Maximum Subarray
// Given an integer array, nums, find the contiguous subarray (contain at least one number) which
// has the largest sum and return its sum.
// Ex: input: nums=[-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6; Ex: input: nums=[1], output: 1; 
// Ex: input: nums=[0], output: 0; Ex: input: nums=[-1], output: -1; Ex: input: nums=[-2147483647], output: -2147483647
//
// Brute Force: T(n) = n Choose 2 = O(n squred) * n = O(n cube)
class MaximumSubarray {
    // Thought Process: 
    // 1) consider there will be many arrays & sums to compare with each other => so we need a global max variable
    // 2) to calculate a local sum in 1 array => we need to acculmulate sum up to that point 
    // => to calculate max sum of a subarray 
    constructor(nums) {
        this.nums = nums;
        this.globalmax= this.nums[0];
    }
    // assume n-1 is solved before my number
    // incorporate my number with answer return from previous subordinate & check if it overturn global max
    // T(n) = O(n)
    findMaxSum() {
        let prevmax = this.nums[0];
        for (let i=1; i< this.nums.length; i++) {
            // local manager Work TBD: incorporating nums[i] to get answer for subproblem nums[0...i]
            // compare (nums[i] + prevmax (max subarray sum ending @ index i-1)) = max sum ending @ index i, with globalmax
            prevmax = Math.max(prevmax + this.nums[i], this.nums[i]);            // for manager's satisfaction
            this.globalmax = Math.max(prevmax, this.globalmax);          
        }
        return this.globalmax;
    }
}
const ms = new MaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log('Maximum Subarray', ms.findMaxSum());
const ms2 = new MaximumSubarray([1]);
console.log('Maximum Subarray', ms2.findMaxSum());
const ms3 = new MaximumSubarray([0]);
console.log('Maximum Subarray', ms3.findMaxSum());
const ms4 = new MaximumSubarray([-1]);
console.log('Maximum Subarray', ms4.findMaxSum());
const ms5 = new MaximumSubarray([-2147483647]);
console.log('Maximum Subarray', ms5.findMaxSum());

// Leetcode #121 Easy - Best Time to Buy and Sell Stock
// Say you have an array for which the ith element is the price of a given stock on day i.
// If you were only permitted to complete at most one trasaction (i.e. buy one and sell one share of the stock),
// design the algorithm to find the maximum profit. NOTE: you cannot sell a stock before buying one.
// Ex: input: [7, 1, 5, 3, 6, 4], output: 5; Ex: input: [7, 6, 4, 3, 1], output: 0
class MaxProfit {
    constructor(stocks) {
        this.stocks = stocks;
        this.globalMaxProfit=0;
    }
    // T(n) = O(n), S(n)=O(1)
    // assume n-1 problem is solved => now I need to extend the solution to size of n
    // focus on ith element => how to incorporate ith into i-1 solution
    // check if my element overturns the subordinate's solution
    // my element needs to be a sell price => keep track of buy price => buy price needs to be smallest
    // global maximum profit => largest difference between the smallest buy number & largest sell number
    findMaxProfit() {
        let premin = this.stocks[0];
        for (let i=1; i< this.stocks.length; i++) {
            premin = Math.min(premin, this.stocks[i]);                                 // O(1)
            this.globalMaxProfit = Math.max(this.stocks[i]-premin, this.globalMaxProfit);
        }
        return this.globalMaxProfit;
    }
}
const mp = new MaxProfit([7, 1, 5, 3, 6, 4]);
console.log('Maximum Profit', mp.findMaxProfit());
const mp2 = new MaxProfit( [7, 6, 4, 3, 1]);
console.log('Maximum Profit', mp2.findMaxProfit())

// Leetcode #221 Medium - Maximal Square
// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
// Ex: input: [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]], output: 4
// Ex: input: [["0", "1"], ["1", "0"]], output: 1; input: [["0"]], output: 0
class MaximalSquare {
    constructor(matrix) {
        this.matrix = matrix;
        this.globalmax = 0;
    }

    // General Manager: I'm the cell @ right most bottom corner => need to consider the squares above, adjacent & diagonal to my squares
    // 
    findMaximalSquare() {
        let m=this.matrix.length, n=this.matrix[0].length;
        let table=Array(m).fill().map(()=>[]);                  // construct a table of m x n
        
        // Base case
        // start the right most bottom corner @ 1st row/ 1st column = maximun square size since there is no squares above, adjacent or diagonal
        for (let col=0; col<n; col++) {                         // fill 1st row
            if (this.matrix[0][col]==='1') {
                table[0][col]=1;
                this.globalmax=1;
            }
            else table[0][col]=0;
        }
        for (let row=0; row<m; row++) {                         // fill 1st column
            if (this.matrix[row][0]==='1') {
                table[row][0]=1;
                this.globalmax=1;
            }
            else table[row][0]=0;
        }
        // T(n)=O(n squared) - an improvement from exponential time complexity
        // table[row][col] = n = size of square side n * n
        for (let row=1; row<m; row++) {
            for (let col=1; col<n; col++) {
                if (this.matrix[row][col]==='1') {
                    table[row][col]= 1+ Math.min(table[row][col-1], table[row-1][col-1], table[row-1][col]);
                    this.globalmax= Math.max(this.globalmax, table[row][col]);
                }
                else table[row][col]=0;
            }
        }
        return this.globalmax * this.globalmax;
    }
}
const fms = new MaximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);
console.log('Maximal Square', fms.findMaximalSquare());
const fms2 = new MaximalSquare([["0", "1"], ["1", "0"]]);
console.log('Maximal Square', fms2.findMaximalSquare());
const fms3 = new MaximalSquare([["0"]]);
console.log('Maximal Square', fms3.findMaximalSquare());

