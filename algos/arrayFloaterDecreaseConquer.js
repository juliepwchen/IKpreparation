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
    // 1) nums[evenIndex] <= nums[oddIndex]
    // 2) Top Down (mess up order as we traverse) vs. Bottom Up (keep order as we traverse)
    wiggleSort(nums) {
        let n=nums.length;
        for (let i=n-1; i>=0; i--) {                        
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

// Leetcode #53 Easy - Maximum Sum Subarray
// Given an integer array, nums, find the contiguous subarray (contain at least one number) which
// has the largest sum and return its sum.
// Ex: input: nums=[-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6; Ex: input: nums=[1], output: 1; 
// Ex: input: nums=[0], output: 0; Ex: input: nums=[-1], output: -1; Ex: input: nums=[-2147483647], output: -2147483647
//
// Brute Force: T(n) = n Choose 2 = O(n^2) * n = O(n^3)
class MaxSumSubarray {
    // Thought Process: 
    // 1) consider there will be many arrays & sums to compare with each other => so we need a global max variable
    // 2) to calculate a local sum in 1 array => we need to acculmulate sum up to that point 
    // => to calculate max sum of a subarray 
    constructor(nums) {
        this.nums = nums;
        this.maxsum= this.nums[0];
    }
    // assume n-1 is solved before my number
    // incorporate my number with answer return from previous subordinate & check if it overturn global max
    // T(n) = O(n)
    findMaxSum() {
        let prefixmaxsum = this.nums[0];
        for (let i=1; i< this.nums.length; i++) {
            // local manager Work TBD: incorporating nums[i] to get answer for subproblem nums[0...i]
            // compare (nums[i] + prevmax (max subarray sum ending @ index i-1)) = max sum ending @ index i, with globalmax
            prefixmaxsum = Math.max(prefixmaxsum + this.nums[i], this.nums[i]);            // for manager's satisfaction
            this.maxsum = Math.max(prefixmaxsum, this.maxsum);          
        }
        return this.maxsum;
    }
}
const ms = new MaxSumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log('Maximum Subarray', ms.findMaxSum());
const ms2 = new MaxSumSubarray([1]);
console.log('Maximum Subarray', ms2.findMaxSum());
const ms3 = new MaxSumSubarray([0]);
console.log('Maximum Subarray', ms3.findMaxSum());
const ms4 = new MaxSumSubarray([-1]);
console.log('Maximum Subarray', ms4.findMaxSum());
const ms5 = new MaxSumSubarray([-2147483647]);
console.log('Maximum Subarray', ms5.findMaxSum());

// Leetcode #121 Easy - Best Time to Buy and Sell Stock
// Say you have an array for which the ith element is the price of a given stock on day i.
// If you were only permitted to complete at most one trasaction (i.e. buy one and sell one share of the stock),
// design the algorithm to find the maximum profit. NOTE: you cannot sell a stock before buying one.
// Ex: input: [7, 1, 5, 3, 6, 4], output: 5; Ex: input: [7, 6, 4, 3, 1], output: 0
class MaxProfit {
    constructor(stocks) {
        this.stocks = stocks;
        this.maxprofit=0;
    }
    // T(n) = O(n), S(n)=O(1)
    // assume n-1 problem is solved => now I need to extend the solution to size of n
    // focus on ith element => how to incorporate ith into i-1 solution
    // check if my element overturns the subordinate's solution
    // my element needs to be a sell price => keep track of buy price => buy price needs to be smallest
    // global maximum profit => largest difference between the smallest buy number & largest sell number
    findMaxProfit() {
        let minbuy=this.stocks[0];
        for (let i=1; i< this.stocks.length; i++) {
            minbuy = Math.min(minbuy, this.stocks[i]);                                 // O(1)
            this.maxprofit = Math.max(this.stocks[i] - minbuy, this.maxprofit);
        }
        return this.maxprofit;
    }
    // Brute Force: O(n^2)
    findMaxProfit_BruteForce() {
        let profit=0;   
        for (let i=1; i< this.stocks.length; i++) {
            for (let j=i+1; j<this.stocks.length; j++) {
                profit = this.stocks[j] - this.stocks[i];
                if (profit >0) this.maxprofit = Math.max(this.maxprofit, profit);
            }
        }
        return this.maxprofit;
    }
}
const mp = new MaxProfit([7, 1, 5, 3, 6, 4]);
console.log('Maximum Profit', mp.findMaxProfit());
console.log('Maximum Profit Brute Force', mp.findMaxProfit_BruteForce());
const mp2 = new MaxProfit( [7, 6, 4, 3, 1]);
console.log('Maximum Profit', mp2.findMaxProfit())
console.log('Maximum Profit Brute Force', mp2.findMaxProfit_BruteForce());

// Leetcode #221 Medium - Maximal Square
// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
// Ex: input: 
// [
//    ["1", "0", "1", "0", "0"], 
//    ["1", "0", "1", "1", "1"], 
//    ["1", "1", "1", "1", "1"],
//    ["1", "0", "0", "1", "0"]
// ], output: 4
// Ex: input: 
// [
//    ["0", "1"], 
//    ["1", "0"]
// ], output: 1; 
//
// input: [["0"]], output: 0
//
// Thought Process:
// 1) find local largest square containing 1 & store in table[r][c] => this means my cell (matrix[r][c]) needds to 1 to be valid
// 2) 1st row & 1 column are the bases cases => populate table[r][0] & table[0][c] with 0 or 1 from matrix[r][0] & matrix[0][1]
// 3) initialize global max square to be 1 if matrix[r][0] or matrix[0][c] is 1
// 4) Only when my cell is 1, local max square, table[r][c] = 1 + max square from my subordinates
// 5) Once I found the local max square in table[r][c], compare it with global max to return a square.
class MaximalSquare {
    constructor(matrix) {
        this.matrix=matrix;
        this.table=Array(this.matrix.length).fill().map(()=>Array(this.matrix[0].length));
        this.maxsquare=0;
         
        // Base case: start the right most bottom corner @ 1st row/ 1st column 
        // = maximun square size since there is no squares above, adjacent or diagonal
        for (let r=0; r< this.matrix.length; r++) {
            if (this.matrix[r][0]==='1') {
                this.table[r][0]=1;
                this.maxsquare=1;
            } else this.table[r][0]=0;
        }
        for (let c=0; c< this.matrix[0].length; c++) {
            if (this.matrix[0][c] === '1') {
                this.table[0][c]=1;
                this.maxsquare=1;
            } else this.table[0][c]=0;
        }
    }
    // General Manager: I'm the cell @ right most bottom corner
    // => need to consider the squares above, adjacent & diagonal to my squares
    // 1) maxsquare size increases only when my cell is a 1 
    // 2) populate table with local maximum square compare to my subordinates
    // 3) compare my local max square value with global max square value
    findMaximalSquare() {
        for (let r=1; r<this.matrix.length; r++) {
            for (let c=1; c<this.matrix[0].length; c++) {
                if (this.matrix[r][c]==='1') {
                    this.table[r][c] = 1+ Math.min(this.table[r][c-1], this.table[r-1][c-1], this.table[r-1][c]);
                    this.maxsquare=Math.max(this.maxsquare, this.table[r][c]);
                } else this.table[r][c]=0;
            }
        }
        return this.maxsquare * this.maxsquare;
    }
}
const fms = new MaximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);
console.log('Maximal Square', fms.findMaximalSquare());
const fms2 = new MaximalSquare([["0", "1"], ["1", "0"]]);
console.log('Maximal Square', fms2.findMaximalSquare());
const fms3 = new MaximalSquare([["0"]]);
console.log('Maximal Square', fms3.findMaximalSquare());

