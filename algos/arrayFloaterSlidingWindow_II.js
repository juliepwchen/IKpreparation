/***************************************************************************************************/
/* Leetcode Easy: 0 problems => Medium: 6 problem => Hard: 1 problem
/***************************************************************************************************/

// Leetcode #567 Medium - Permutation in String
// Given 2 strings, s1 and s1, write a function return TRUE if s2 contains the permutation of s1.
// In other words, one of s1's permutations is the substring of s1. 
// Ex: s1: "ab", s2: "eidbaooo", output: TRUE, Ex: s1: "ab", s2: "eidboaoo", output: FALSE
class StringPermutation {
    constructor() {}
    containsPermutation(s1, s2) {
        // create Frequencey table: see LC 1100 in arrayFloaterSlidingWindow_I.js
        let hmap_s1={}; 
        for (let i=0; i<s1.length; i++) {
            if (hmap_s1[s1[i]]) hmap_s1[s1[i]]++;
            else hmap_s1[s1[i]]=1;
        }
        let hmap_s2={}, k=s1.length;
        for (let i=0; i<k; i++) {
            if (hmap_s2[s2[i]]) hmap_s2[[s2[i]]]++;
            else hmap_s2[s2[i]] =1;
        }
        if (this.compareHmap(hmap_s1, hmap_s2)) return true;
        for (let i=k; i<s2.length; i++) {
            if (hmap_s2[s2[i]]) hmap_s2[s2[i]]++;
            else hmap_s2[s2[i]]=1;

            hmap_s2[s2[i-k]]--;
            if (hmap_s2[s2[i-k]]===0) delete hmap_s2[s2[i-k]];

            if (this.compareHmap(hmap_s1, hmap_s2)) return true;
        }
        return false;
    }
    compareHmap(m1, m2) {
        let arr1 = Object.entries(m1), arr2 = Object.entries(m2);
        if (arr1.length !== arr2.length) return false;
        arr1.sort(); arr2.sort();
        for (let i=0; i<arr1.length; i++) {
            if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) return false;
        }
        return true;
    }
}
const p = new StringPermutation();
console.log('S2 contains permutation of S1', p.containsPermutation("ab", "eidbaooo"))
console.log('S2 contains permutation of S1', p.containsPermutation("ab", "eidboaoo"))

// Leetcode #438 Medium - Find All Anagrams in a String
// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
// Ex: s: "cbaebabacd", p: "abc", output: [0, 6], Ex: s: "abab", p: "ab", output: [0, 1, 2]
class StringAnagrams {
    constructor() {}
    findstartindices(s, p) {
        let hmap_p={}, result=[];
        for (let i=0; i< p.length; i++) {
            if (hmap_p[p[i]]) hmap_p[p[i]]++;
            hmap_p[p[i]]=1;
        }
        let hmap_s ={}, k=p.length;
        for (let i=0; i<k; i++) {
            if (hmap_s[s[i]]) hmap_s[s[i]]++;
            hmap_s[s[i]]=1;
        }
        if (this.compareHmap(hmap_p, hmap_s)) result.push(0);
        for (let i=k; i<s.length; i++) {
            if (hmap_s[s[i]]) hmap_s[s[i]]++;
            else hmap_s[s[i]]=1;

            hmap_s[s[i-k]]--;
            if (hmap_s[s[i-k]]===0) delete hmap_s[s[i-k]];

            if (this.compareHmap(hmap_p, hmap_s)) result.push(i-k+1);   // i-k+1: start index for k length ending @ index i
        }
        return result;
    }
    compareHmap(m1, m2) {
        let arr1 = Object.entries(m1), arr2 = Object.entries(m2);
        if (arr1.length !== arr2.length) return false;
        arr1.sort(); arr2.sort();
        for (let i=0; i<arr1.length; i++) {
            if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) return false;
        }
        return true;
    }
} 
const sa = new StringAnagrams();
console.log('S contains P anagram starting indices are', sa.findstartindices("cbaebabacd",  "abc"));
console.log('S contains P anagram starting indices are', sa.findstartindices("abab",  "ab"));

// Leetcode #209 Medium - Minimum Size Subarray Sum
// Given an array of n positive integers and a positive integer s, find the minimal length of a 
// contiguous subarray of which the sum >= s. If there isn't one, return 0 instead.
// Ex: s=7, nums=[2, 3, 1, 2, 4, 3], output: 2
// 
class MinSizeSum {
    constructor() {}
    // Prefix Sum Pattern: see LC 325 in arrayFloaterPrefixSum.js where prefixsum === k exactly
    findminlen(nums, k) {
        let prefixsum=0, minlen=Infinity, hmap={0:0};
        for (let i=0; i< nums.length; i++) {
            prefixsum += nums[i];

            if (hmap[prefixsum-k] !== undefined) minlen = Math.min(minlen, i+1-hmap[prefixsum-k]);
            if (hmap[prefixsum]===undefined) hmap[prefixsum] = i+1;
        }
        return minlen;
    }
    // Vary-Length Sliding Window Pattern
    findminsubs(nums, k) {
        let windowsum=0, minlen=Infinity, left=0;
        for (let i=0; i< nums.length; i++) {
            windowsum += nums[i];
            while (left <= i && windowsum >= k) {
                windowsum -= nums[left];
                minlen = Math.min(minlen, i+1-left);
                left++;
            }
        }
        return (minlen===Infinity) ? 0 : minlen;
    }
}
const mss = new MinSizeSum();
console.log('Minimum Size Subarray >= Sum', mss.findminsubs([2, 3, 1, 2, 4, 3], 7));

// Leetcode #713 Medium - Subarray Product Less Than K
// Givine an array of positive integers, nums, count the number of contiguous subarray where
// the product of all the elements in the array is less than k.
// Ex: nums: [10, 5, 2, 6], k=100, output: 8
class SubarrayProduct {
    constructor() {}
    // Vary-length Sliding Window Pattern
    conuntsubsproduct(nums, k) {
        let windowproduct=1, count=0, left=0;
        for (let i=0; i< nums.length; i++) {
            windowproduct *= nums[i];
            while (left <=i && windowproduct >= k) {
                windowproduct = windowproduct / nums[left];
                left++;
            }
            count += i - left +1;
        }
        return count;
    }
    // Prefixsum Pattern: see LC 974 in arrayFloaterPrefixSum.js
    countsubs(nums, k) {
        let prefixproduct =0, count=0, hmap={0:1};
        for (let i=0; i< nums.length; i++) {
            prefixproduct *= nums[i];
            if (hmap[prefixproduct]) count += hmap[prefixproduct];
            
            if (hmap[prefixproduct]) hmap[prefixproduct]++;
            else hmap[prefixproduct]=1;
        }
        return count;
    }
}
const sp = new SubarrayProduct();
console.log('Subarray Product Less Than K', sp.conuntsubsproduct([10, 5, 2, 6], 100))

// Leetcode #1658 Medium - Minimum Operations to Reduce X to Zero
// Given an integer array nums and an integer x. In one operation, you can remove either 
// the leftmost or rightmost element from the array and subtract its value from x. 
// Note that this modifies the array. Return the minimum number of operations to reduce
// x to exactly 0. If not possible, return -1.
// Ex: nums: [1, 1, 4, 2, 3], x=5, output: 2, Ex: nums: [5, 6, 7, 8, 9], x=4, output: -1
// Ex: nums: [3, 2, 20, 1, 1, 3], x=10, output: 5
class MinOpsReduceZero {
    constructor() {}
    minops(nums, X) {
        let windowsum=0, globalmax=-1, left=0;
        let k = nums.reduce((num, sum)=> sum += num, 0) - X;
        for (let i=0; i< nums.length; i++) {
            // Work TBD to solve the subproblem ending at index i
            windowsum += nums[i];
            while (left <= i && windowsum > k) {
                windowsum -= nums[left];
                left++;
            }
            if (windowsum === k) globalmax = Math.max(globalmax, i-left + 1);
        }
        return (globalmax===-1) ? -1 : nums.length - globalmax;
    }
}
const morz = new MinOpsReduceZero();
console.log('Minimum Ops to Reduce X to Zero', morz.minops([1, 1, 4, 2, 3], 5))
console.log('Minimum Ops to Reduce X to Zero', morz.minops([5, 6, 7, 8, 9], 4))
console.log('Minimum Ops to Reduce X to Zero', morz.minops([3, 2, 20, 1, 1, 3], 10))

// Leetcode #1004 Medium - Maximum Consecutive Ones III
// Given an array of A of 0s and 1s, we may change up to K values of 0 to 1.
// Return the length of longest contiguous subarray containing 1s.
// Ex: A: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], K=2, output: 6, starting at index 5
// Ex: A: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], K=3, output: 10, starting at index 2
class MaxConsecutiveOnes {
    constructor() {}
    maxones(A, K) {
        let windowzeros=0, globalmax=0, left=0;
        for (let i=0; i< A.length; i++) {
            // Work TBD to solve local problem ending at index i, include A[i] into the window
            if (A[i] === 0) windowzeros++;
            while (left <= i && windowzeros > K) {
                if (A[left]===0) windowzeros--;
                left++;
            }
            if ((i-left+1) > globalmax) globalmax = i-left +1;
        }
        return globalmax;
    }
}
const mco = new MaxConsecutiveOnes();
console.log('Maximum Consecutive Ones changing up to K values', mco.maxones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))
console.log('Maximum Consecutive Ones changing up to K values', mco.maxones([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3))