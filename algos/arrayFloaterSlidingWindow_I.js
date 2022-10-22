/***************************************************************************************************/
/* Leetcode Easy: 3 problems => Medium: 4 problem => Hard: 1 problem
/***************************************************************************************************/

// Leetcode #346 Easy - Moving Average from Data Stream
// Given a stream of integers and a windwo size, calculate the moving average of all integers in the sliding window.
// 
// Ex: MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1+10) /2
// m.next(3) = (1+10+3) / 3
// m.next(5) = (10+3+5) /3
class MovingAverage {
    constructor(windowsize) {
        this.q = [];
        this.totalsofar =0; 
        this.windowsize=windowsize;
    }
    next(num) {
        this.totalsofar += num;
        this.q.push(num);
        if (this.q.length > this.windowsize) this.totalsofar -= this.q.shift();
          
        return this.totalsofar/this.q.length;
    }
}
const m = new MovingAverage(3);
console.log('Moving Average from Data Stream', m.next(1));
console.log('Moving Average from Data Stream', m.next(10));
console.log('Moving Average from Data Stream', m.next(3));
console.log('Moving Average from Data Stream', m.next(5));

// Leetcode #643 Easy - Maximum Average Subarray I
// Given an array consisting of n integers, find the continguous subarray of given length k that has the
// maximum average value. And you need to output the maximum average value.
// 
// Ex: [ 1, 12, -5, -6, 50, 3 ], k=4, output: 12.75
// 
class MaximumAveSubarray {
    constructor() {}

    // T(n)=O(n), S(n)=O(1)
    maxave(nums, k) {
        // Initialize 1st window
        let windowsum =0;
        for (let i=0; i<k; i++) windowsum += nums[i];
        let maxwindowsum = windowsum;
         
        for (let i=k; i < nums.length; i++) {
            // Work TBD on subarray ending @ index i
            windowsum += nums[i] - nums[i-k];
            maxwindowsum = Math.max(maxwindowsum, windowsum);
        }
        return maxwindowsum / k;
    }
}
const max = new MaximumAveSubarray();
console.log('Maximum Average Subarray', max.maxave([ 1, 12, -5, -6, 50, 3 ], 4));

// Leetcode #1343 Medium - Number of Subarrays of Size K and Average Greater than or Equal to Threshold
// Given an array of integers, arr, and two integers k and threshold.
// Return the number of subarrays of size k, and average greater than or equal to threshold.
//
// Ex: arr [2, 2, 2, 2, 5, 5, 5, 8], k=3, threshold=4, output: 3
// Ex: arr [1, 1, 1, 1, 1], k=1, threshold=0, output: 5
// Ex: arr [11, 13, 17, 23, 29, 31, 7, 5, 2, 3], k=3, threshold=5, output: 6
class CountSubarrays {
    constructor() {}

    // T(n)=O(n), S(n)=O(1)
    countsubarrays(nums, k, threshold) {
        // Initialize 1st window
        let windowsum =0, count=0;
        for (let i=0; i<k; i++) windowsum += nums[i];
        if (windowsum >= threshold * k) count++;
 
        for (let i=k; i<nums.length; i++) {
            // Work TBD on subarray ending @ index i
            windowsum += nums[i] - nums[i-k];
            if (windowsum >= threshold * k) count++;
        }
        return count;
    }
}
const cs = new CountSubarrays();
console.log('Count Number of Subarrays of Size K >= Threshold', cs.countsubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4));
console.log('Count Number of Subarrays of Size K >= Threshold', cs.countsubarrays([1, 1, 1, 1, 1], 1, 0));
console.log('Count Number of Subarrays of Size K >= Threshold', cs.countsubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5));

// Leetcode #1176 Easy - Diet Plan Performance
// A dieter consumes calories[i] calories on the i-th day.
// Given an integer, k, for every consecutive sequence of k days (calories[i], calories[i+1]), ... calories[i+k-1]
// for all 0 <= 1 <= n-k), they look at T, the total calories consumed during that sequence of k days 
// (calories[i] + calories[i+1] + ... + calories[i+k-1]): 
// 1) if T < lower, they perform poorly on the diet and lose 1 point
// 2) if T > upper, they perform well and gain 1 point
// 3) otherwise, they perform normally and no change on points
//
// Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for calories.length days.
// Ex: calories [1, 2, 3, 4, 5], k=1, lower=3, upper=3, output=0
// Ex: calories [3, 2], k=2, lower=0, upper=1, output: 1
// Ex: calories [6, 5, 0, 0], k=2, lower=1, upper: 5, output: 0
class DietPerformance {
    constructor() {}

    countdiet(calories, k, lower, upper) {
        let T=0, points=0;
        for (let i=0; i<k; i++) T += calories[i];
        if (T < lower) points--;
        else if (T > upper) points++;
        
        for (let i=k; i<calories.length; i++) {
            T += calories[i] - calories[i-k];
            if (T < lower) points--;
            else if (T > upper) points++;
        }
        return points;
    }
}
const dp = new DietPerformance();
console.log('Diet Performance', dp.countdiet([1, 2, 3, 4, 5], 1, 3, 3));
console.log('Diet Performance', dp.countdiet([3, 2], 2, 0, 1));
console.log('Diet Performance', dp.countdiet([6, 5, 0, 0], 2, 1, 5));

// Leetcode #1052 Medium - Grumpy Bookstore Owner
// Today, the booksotre owner has a store open for customer.length minutes. Every minute, some
// number of customers ( customers[i] ) enters the store, and all of those customers leave after
// the end of that minute. On some minutes, the bookstore owner is grumpy.  If the bookstore owner
// is grumpy on the ith minute, grumpy[i]=1, otherwise, grumpy[i]=0. When the store owner is grumpy,
// the customers of that minute are not satisfied, otherwise they are satisfied.  The bookstore owner
// knows a secret technique to keep themselves not grumpy for X minutes straight, but can only use it once.
// Return the maximum number of customers that can be satisified throughout the day.
//
// Ex: customers [1, 0, 1, 2, 1, 1, 7, 5 ], grumpy [0, 1, 0, 1, 0, 1, 0, 1], X=3, output: 16
class GrumpyBookstore {
    constructor() {}

    maxSatisfied(customers, grumpy, X) {
        let counthappy=0, countgrumpy=0, max=0;
        for (let i=0; i<customers.length; i++) if (grumpy[i]===0) counthappy += customers[i];
        for (let i=0; i<X; i++) if (grumpy[i]===1) countgrumpy += customers[i];

        max = countgrumpy;
        for (let i=X; i<customers.length; i++) {
            // Work TBD: compute # of grumpy customers in X window ending @ index i
            // if grumpy, countgrumpy += customers[i] - customers[i-k]
            if (grumpy[i]===1) countgrumpy += customers[i];
            if (grumpy[i-X]===1) countgrumpy -= customers[i-X];
    
            max = Math.max(max, countgrumpy);        // Find max # of grumpy customers within X-sized window to convert
        }
        return max + counthappy;
    }
}
const gb = new GrumpyBookstore();
console.log('Grumpy Book Store', gb.maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5 ], [0, 1, 0, 1, 0, 1, 0, 1], 3));

// Leetcode #1456 Medium - Maximum number of vowels in a substring of given length
// Given a string, s, and a integer, k, return the maximum number of vowels in any substring of s with length=k.
// 
// Ex: "abciiidef", k=3, output: 3, Ex: "aeiou", k=2, output: 2, Ex: "leetcode", k=3, output: 2
// Ex: "rhythms", k=4, output: 0, Ex: "tryhard", k=4, output: 1
class MaxVowels {
    constructor() {
        this.vowels=new Set(['a', 'e', 'i', 'o', 'u']);
    }
    // T(n)=O(n), S(n)=O(1)
    maxVowels(s, k) {
        let max=0, count=0;
        for (let i=0; i<k; i++) if (this.vowels.has(s[i])) count++;
        
        max=count;
        for (let i=k; i<s.length; i++) {
            if (this.vowels.has(s[i])) count++;
            if (this.vowels.has(s[i-k])) count--;
            max = Math.max(max, count);
        }
        return max;
    }
}
const mv = new MaxVowels();
console.log("Max number of vowels in substring of length k", mv.maxVowels( "abciiidef", 3));
console.log("Max number of vowels in substring of length k", mv.maxVowels( "aeiou", 2));
console.log("Max number of vowels in substring of length k", mv.maxVowels( "leetcode", 3));
console.log("Max number of vowels in substring of length k", mv.maxVowels( "rhythms", 4));
console.log("Max number of vowels in substring of length k", mv.maxVowels( "tryhard", 4));

// Leetcode #1100 Medium - Find K length substrings with no repeated characters
// Given a string, s, return the number of substrings of length k, with no repeated characters.
// 
// Ex: "havefunonleetcode", k=5, output: 6
// Ex: "home", k=5, output: 0
class NoRepeatedVowels {
    constructor() {}

    countNoRepeats(s, k) {
        if (k > s.length) return 0;

        let hmap={}, count=0;
        for (let i=0; i<k; i++) {
            if (hmap[s[i]]) hmap[s[i]]++;
            else hmap[s[i]]=1;
        }
        // Pigeon Hole Principle: if (# of keys < k), some chars are repeated 
        if (Object.keys(hmap).length ===k) count++;
        for (let i=k; i<s.length; i++) {
            // Work TBD: subarray of length k ending at index i => does it have repeated characters?
            // my subordinate gives me a hmap with frequencies of chars
            if (hmap[s[i]]) hmap[s[i]]++;
            else hmap[s[i]]=1;

            hmap[s[i-k]]--;
            if (hmap[s[i-k]] ===0) delete hmap[s[i-k]];

            if (Object.keys(hmap).length ===k) count++;   
        }
        return count;
    }
}
const nr = new NoRepeatedVowels();
console.log('Number of Substring of Length K with No Repeated Chars', nr.countNoRepeats("havefunonleetcode", 5));
console.log('Number of Substring of Length K with No Repeated Chars', nr.countNoRepeats("home", 5));

// Leetcode #239 Hard - Sliding Window Maximum
// You are given an array of integers, nums, there is a sliding window of size k, which is moving from left
// to right. You can only see k numbers in the window. Return the max number of each sliding window.
//
// Ex: [1, 3, -1, -3, 5, 3, 6, 7], k=3, output: [3, 3, 5, 5, 6, 7], Ex: [4, -2], k=2, output: [4]
// Ex: [1], k=1, output: [1], Ex: [1, -1], k=1, output: [1, -1], Ex: [9, 11], k=2, output: [11]
class MaxOfWindow {
    constructor() {}

    maxOfK(nums, k) {
        let q=[], result=[];
        for (let i=0; i< k; i++) {
            while (q.length >0 && nums[i] > q[q.length-1]) q.pop();
            q.push(nums[i]);
        }
        result.push(q[0]);
        for (let i=k; i< nums.length; i++) {
            if (nums[i-k] === q[0]) q.shift();  // remove leftmost number, ELSE nums[i-k] would have been eliminated before
            while (q.length >0 && nums[i] > q[q.length-1]) q.pop();
            q.push(nums[i]);                    // add rightmost number
            result.push(q[0]);
        }
        return result;
    }
}
const mow = new MaxOfWindow();
console.log('Max number of each Sliding Window of K length', mow.maxOfK([1, 3, -1, -3, 5, 3, 6, 7], 3))
console.log('Max number of each Sliding Window of K length', mow.maxOfK([4, -2], 2))
console.log('Max number of each Sliding Window of K length', mow.maxOfK([1, -1], 1))
console.log('Max number of each Sliding Window of K length', mow.maxOfK([9, 11], 2))
console.log('Max number of each Sliding Window of K length', mow.maxOfK([1], 1))