/***************************************************************************************************/
/* Leetcode Easy: 3 problems => Medium: 2 problem => Hard: 2 problem
/***************************************************************************************************/

/***************************************************************************************************/
// Cycle Sort template - Pigeon Hole Principle: Ex: n-size sorted array, 1, 2, 3...n, @ index 0, 1, 2... n-1
// Decrease & Conquer: each General Manager work (deflats cycles) until number is finalized in its correct spot.
// T(n) = O(n squared), rank(nums[i]) takes O(n)
//
// For a special case, when values are primitives & when rank takes O(1) => T(n)=O(n)
// For a 1st Pass: do Cycle Sort
// for i in 0 to n-1:
//   while nums[i] is not the values expected at that spot
//     let d = destination index to which nums[i] should be sent
//     if d passes Sanity Check, swap nums[i] & nums[d]
//     else break
//
// For a 2nd Pass: 
// for i in 0 to n-1:
//   construct the answer based on out-of-place element
/***************************************************************************************************/

// Leetcode #268 Easy - Missing Number
// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range 
// that is missing from the array. Code up using O(1) space & O(n) Time Complexity.
// Ex: input: nums=[3, 0, 1], output: 2 , Ex: input: nums=[0, 1], output: 2, Ex: input nums=[9, 1, 6, 4, 2, 3, 5, 7, 0], output: 8
// 
// Pigeon Hole Principle: Ex: n-size sorted array, 0, 1, 2, 3...n @ index 0, 1, 2... n-1, n is missing
class MissingNumber {
    constructor() {}
  
    missingNumber(nums) {
        // 1st pass - Cycle Sort
        let n=nums.length;
        for (let i=0; i< n; i++) {
            while (nums[i] !== i) {
                let destIndex = nums[i];
                if (destIndex < n) this.swap(nums, i, destIndex); 
                else break;                                 // do nothing with this ith num & go to next i
            }
        }
        // 2nd Pass - find missing number or return n as missing number - O(n)
        for (let i=0; i< n; i++) {
            if (nums[i] !== i) return i;
        }
        return n;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
let mn = new MissingNumber();
console.log('Missing Number', mn.missingNumber([3, 0, 1]) );
console.log('Missing Number', mn.missingNumber([0, 1]) );
console.log('Missing Number', mn.missingNumber([9, 1, 6, 4, 2, 3, 5, 7, 0]));
console.log('Missing Number', mn.missingNumber([8, 9, 6, 3, 0, 2, 7, 5, 4, 1, 10]));

// Leetcode #448 Easy - Find all numbers disappeared in an arraay
// Given an array of integers where 1 <= a[i] <= n (n= size of array), some elements appear twice and other appear once.
// Find all elements of [1, n] inclusive that do not appear in this array.
// Could you do it without extra space and in O(n) runtime? 
// Ex: Input: [4, 3, 2, 7, 8, 2, 3, 1], output: [5, 6]
class FindAllDisappeared {
    constructor() {}

    // T(n)=O(n), S(n)=O(1) in-place where [1, 2, 3, 4, 5 ..., n] @ index 0, 1, 2, 3, ... n-1
    findDisappeared(nums) {
        //1st Pass - Cycle Sort
        let n=nums.length;
        for (let i=0; i< n; i++) {
            while (nums[i] !== i+1) {
                let destIndex = nums[i]-1;
                if (nums[destIndex] !== nums[i]) this.swap(nums, i, destIndex); 
                else break;
            }
        }
        // 2nd Pass - Find All Disappeared numbers
        let result=[];
        for (let i=0; i< n; i++) {
            if (nums[i] !== i+1) {
                result.push(i+1);          // missing numbers are represented by indices & values are noises
            }
        }
        return result;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
let fam = new FindAllDisappeared();
console.log('Find All Disappeared', fam.findDisappeared([4, 3, 2, 7, 8, 2, 3, 1]));

// Leetcode #287 Medium - Find the duplicate number
// Given an array of integers nums, containing n+1 integers where each integers is
// in the range (1, n) inclusive. There is only one duplicate number in nums, 
// return this duplicate number.
// Ex: input: nums=[1, 3, 4, 2, 2], output: 2; Ex: input nums=[3, 1, 3, 4, 2], output: 3
// Ex: input: nums=[1, 1], output: [1]
class FindOneDuplicate {
    constructor() {}

    // T(n)=O(n), S(n)=O(1) in-place, 
    // for n+1 elements: [1, 2, 3, ... n+1] @ index 0, 1, 2, 3, ... n (vs. n-1) where value n+1 is duplicate #.
    findOneDuplicate(nums) {
        // 1st Pass: Cycle Sort - value starts with 1, 2, 3, ... n+1
        let n=nums.length;
        for (let i=0; i< n+1; i++) {
            while (nums[i] !== i+1) {               
                let destIndex = nums[i]-1;
                if (nums[i] !== nums[destIndex]) this.swap(nums, i, destIndex);
                else break;
            }
        }
        // 2nd Pass: Find 1 duplicate number
        for (let i=0; i< n+1; i++) {
            if (nums[i] !== i+1) {
                return nums[i];
            } 
        }
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
let fod = new FindOneDuplicate();
console.log('Find One Duplicate', fod.findOneDuplicate([1, 3, 4, 2, 2]));
console.log('Find One Duplicate', fod.findOneDuplicate([3, 1, 3, 4, 2]));
console.log('Find One Duplicate', fod.findOneDuplicate([1, 1]));

// Leetcode #645 Easy - Set MisMatch
// The set nums originally contain numbers from 1 to n. Due to data error, one of the numbers in the set
// got duplicated to another number in the set, which result in repetition of one number and loss of 
// another number.  Given an array nums, representing the data status of this set after the error. 
// Your task is to firstly find the number occurs twice and then find the number that is missing.
// Return them in the form of array.
// Ex: input: nums=[1, 2, 2, 4], output: [2, 3]; 
class SetMismatch {
    constructor() {}

    // T(n)=o(n), S(n)=O(1) in-place, where 1, 2, 3, ... n @ index 0, 1, 2, 3... n-1
    findSetMismatch(nums) {
        // 1st Pass: Cycle Sort
        let n=nums.length;
        for (let i=0; i< n; i++) {
            while (nums[i] !== i+1) {
                let destIndex = nums[i]-1;
                if (nums[i] !== nums[destIndex]) this.swap(nums, i, destIndex);
                else break;
            }
        }
        // 2nd Pass: 
        let result=[];
        for (let i=0; i< n; i++) {
            if (nums[i] !== i+1) {
                result.push(nums[i], i+1);
            }
        }
        return result;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
let fsm = new SetMismatch();
console.log('Set Mismatch', fsm.findSetMismatch([1, 2, 2, 4]));

// Leetcode #442 Medium - Find all duplicates in an array
// Given an array of integers, 1 <= a[i] <= n, (n=size of array), some elements appeaars twice & some once.
// Find all elements that appears twice in the array.
// Ex: input: [4, 3, 2, 7, 8, 2, 3, 1], output: [2, 3]
class FindAllDuplicates {
    constructor() {}

    // T(n)=O(n), S(n)=O(1) in-place, where 1, 2, 3, ... n @ index 0, 1, 2, 3, ... n-1
    findAllDuplicates(nums) {
        // 1st Pass: Cycle Sort
        let n=nums.length;
        for (let i=0; i< n; i++) {
            while (nums[i] !== i+1) {
                let destIndex=nums[i]-1;
                if (nums[i] !== nums[destIndex]) this.swap(nums, i, destIndex);
                else break;
            }
        }
        // 2nd Pass: find all duplicates
        let set=new Set();                  // use Set to elimiate adding duplicate numbers more than once
        for (let i=0; i< n; i++) {
            if (nums[i] !== i+1) set.add(nums[i]);     
        }
        return set;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
let fad = new FindAllDuplicates();
console.log('Find All Duplicates', fad.findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));

// Leetcode #41 Hard - Find Missing Positive
// Given an unsorted integer array nums, find the smallest missing positive number.
// Ex: input: nums=[1, 2, 0], output: 3; Ex: nums=[3, 4, -1, 1], output: 2; Ex: nums=[7, 8, 9, 11, 12], output: 1
//
// NOTE: smallest missing postive number is in the range of 1 ... n+1 (smallest=1, largest=n+1)
// if all positive numbers are present from 1... n, then smallest missing number is n+1
class FindMissingPositive {
    constructor() {}

    // T(n)=O(n), S(n)=O(1) in-place, where positive #s 1, 2, 3, ... n @ index 0, 1, 2, 3... n-1
    findSmallestMissingPositive(nums) {
        // 1st Pass: Cycle Sort
        let n=nums.length;
        for (let i=0; i<n; i++) {
            while (nums[i] !== i+1) {
                let destIndex = nums[i]-1;
                if ((destIndex >=0 && destIndex < n) && (nums[i] !== nums[destIndex])) this.swap(nums, i, destIndex);
                else break;
            }
        }
        // 2nd Pass: find smallest missing positive
        for (let i=0; i< n; i++) {
            if (nums[i] !== i+1) return i+1;
        }
        return n+1;
    }
    // Cycle sort on subarray of positive # starting 1, 2,3 ... n @ index from orange+1... n-1
    // while positive number destination index = nums[i] - orange => ignore subarray @ index 0...orange
    findSmallestMissingPositive_WithPartition(nums) {
        let n=nums.length, orange=-1, green=-1;
        for (green=0; green<n; green++) {
            if (nums[green] <=0) {
                orange++;
                this.swap(nums, orange, green);
            }
        }
        for (let i=orange+1; i<n; i++) {
            // positive #s starts @ index @ i = orange+1 => nums[i]=1 = orange+1-orange  (i-orange)
            while (nums[i] !== i -orange) {           
                let destIndex = nums[i] + orange;                           // destination index = nums[i] = nums[i] + orange
                if (destIndex >=0 && destIndex < n && nums[destIndex] !== nums[i]) {  // destination index in between 0 ... n-1
                    this.swap(nums, i, destIndex);
                } else break;
            }
        }
        for (let i=0; i<n; i++) {
            if (nums[i] >0 && nums[i] !== i-orange) return i-orange;        // nums[i] needs to be positive
        }
        return n;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
const fmp = new FindMissingPositive();
console.log('Find Missing Positive', fmp.findSmallestMissingPositive([1, 2, 0]));
console.log('Find Missing Positive', fmp.findSmallestMissingPositive([3, 4, -1, 1]));
console.log('Find Missing Positive', fmp.findSmallestMissingPositive([7, 8, 9, 11, 12]));
console.log('Find Missing Positive with Partition', fmp.findSmallestMissingPositive_WithPartition([1, 2, 0]));
console.log('Find Missing Positive with Partition', fmp.findSmallestMissingPositive_WithPartition([3, 4, -1, 1]));
console.log('Find Missing Positive with Partition', fmp.findSmallestMissingPositive_WithPartition([7, 8, 9, 11, 12]));

// Leetcode #765 Hard - Couple holding hands
// N couples sit n 2N seats arrangedd in a row and want to hold hands. We want to know the minimum number of
// swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they
// stand up and switch seats. The people and seats are represented by an integer from 0 o 2N -1, the couples
// are numbered in order, the first couple being (0, 1), the second couple being (2, 3), and so on, with the 
// last couple being (2N-2, 2N-1). The couple's initial seating is given by row[i] being the value of the 
// person who is initially sitting in the ith seat.
// Ex: input: row=[0, 2, 1, 3], output: 1 (swap to switch 2nd, row[1], and 3rd, row[2], person.)
// Ex: intpu: row=[3, 2, 0, 1], output: 0 (swap, all couples are seated side by side)
class CoupleHoldingHands {
    constructor() {}

    getTotalSwaps(row) {
        let hmap={}, n=row.length/2;
        for (let i=0; i< 2*n; i++) hmap[row[i]] = i;
    
        let swaps=0, PRExpected=-1;
        for (let sofa=0; sofa < n; sofa++) {                                // each sofa seated 2 persons (1 couple: PL/PR)

            let PL = row[ 2* sofa], PR = row[ 2* sofa +1 ];                 // PL ID @ index 2*sofa & PR ID @ index 2*sofa +1 in row array
            if (PL % 2 ===0) PRExpected = PL + 1;                           // if PL ID is even, PR ID is Expected be odd 
            else PRExpected = PL -1;                                        // if PL ID is odd, PR ID is Expected be even

            // 1) Bring true PL partner to PL
            if (PR !== PRExpected) {
                let PLpairIndex = hmap[PRExpected];                         // Retrieve index of true PL pair in row
                this.swap(row, 2* sofa +1, PLpairIndex);                    // swap PR ID with true PL pair ID
                swaps++;
    
                hmap[ PR ] = 2* sofa +1;                                    // hmap updates new PR ID
                hmap[ row[ PLpairIndex ]] = PLpairIndex;                    // hmap updates ID of stranger being swap out
                PR = row[2* sofa +1];                                       // update PR ID
            }

            // 2) Bring PR to PR's true partner
            // Cycle Sort - deflating Cycles - switch out PR untiil PR matches orignal PL
            // let PRpair=-1, strangerIndex=-1;                             
            // while (PR !== PRExpected) {                                     // if PR ID is not the Expected PR for the PL
            //     if (PR %2 ===0) PRpair = PR+1;                              // calculate ID that PR should be paired with
            //     else PRpair = PR -1;

            //     let PRpairIndex = hmap[PRpair];                             // Retrieve index where PR's pair is seated
            //     if (PRpairIndex % 2 ===0) strangerIndex= PRpairIndex +1;    // calculate index of stranger sitting next to PR's pair 
            //     else strangerIndex = PRpairIndex -1;

            //     this.swap(row, 2* sofa +1, strangerIndex);                 
            //     swaps++;

            //     hmap[ PR ] = 2* sofa +1;                                    // hmap updates new PR ID @ index 2*sofa +1;
            //     hmap[row[strangerIndex]] = strangerIndex;                   // hmap updates new stranger ID @ index strangerIndex
            //     PR = row[2* sofa +1];                                       // PR = the new PR ID that was the ID of stranger
            // }
        }
        return swaps;
    }
    swap(arr, x, y) {
        let temp=arr[x];
        arr[x]=arr[y];
        arr[y]=temp;
    }
}
const chh = new CoupleHoldingHands();;
console.log('Couple Holding Hands', chh.getTotalSwaps([0, 2, 1, 3]));
console.log('Couple Holding Hands', chh.getTotalSwaps([3, 2, 0, 1]));