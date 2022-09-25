/***************************************************************************************************/
/* Leetcode Eassy: 1 problem => Medium: 10 problems => Hard: 1 problem
/**************************************************************************************************
*
* learn General Template to help to solve Cominatorial Enumeration problems
* 1) Understand the Problem first => Try out smaller problems => Find out INPUT & OUTPUT if possible.
* 2) Approach?  => Permutation (order), Subsets (no order)
* 3) Choices? How many blanks? How many choices? => 2xN blanks, 2 Choices each
* 4) What Decision Tree looks alike? Try out i levels => i=0, i=1, i=2, ... each level.
*   - Appoximate Time Complexity O(2 to 2nth) + Space Complexity Aux O(2n) * n for validation
*   - Write helper function Pseudo Code - arr, i, slate, n
* 5) Formalize Constraints => size, sum, etc.
*****************************************************************************************************/

// LeetCode #784 - Easy - Letter Case Permutation
// Given a string S (a set of n objects), we can transform eachh letter 
// individually to be lowercase or uppercase to create another string. 
// Return a list of all possible strings we could create.
// Ex: input S string = "a1b2" => ["a1b2", "a1B2", "A1b2", "A1B2"]

// Space Complexity S(2 to nth * n) = input O(n) + auxiliary O(n) + output O(2 to nth * n)
// Time Complexity T(2 to nth) = leaf nodes O(2 to nth * n) + internal nodes O(2 to nth * 1)
class PermuteLetterCaseOnly {
    constructor() {
        this.globalBag =[];
    }
    overall(str) {           
        this.helper(str, 0, []);
        return this.globalBag;
    }
    helper(str, i, sequence) {  
        if (i=== str.length) {                              // when i iterate pass n Blanks
            this.globalBag.push(sequence.join(''));   
            return;
        } 
         // 2 Choices (Upper & Lower casse ) for the same Blank if the Picked value from the input str, is a character.
         if ((/[a-zA-Z]/).test(str[i])) {                   // when Picked str[i] is a character
            sequence.push(str[i].toLowerCase());            // Choice #1, add str[i].toLowerCase() to sequence
            this.helper(str, i+1, sequence);                // go to next Blank i+1 & next Picked value
            sequence.pop();

            sequence.push(str[i].toUpperCase());            // Choice #2, add str[i].toUpperCase() to sequence
            this.helper(str, i+1, sequence);                
            sequence.pop();  
        // Otherwise, 1 Choice, the same Picked value for the same Blank
        } else  {                                           // when Picked str[i] is a digit
            sequence.push(str[i]);                          // Choice #1 add original Picked value str[i] to sequence
            this.helper(str, i+1, sequence);                
            sequence.pop();                 
        }
    }
}
const plco = new PermuteLetterCaseOnly();
console.log('permute letter cases = ', plco.overall("a1b2"));

// LeetCode #78 Medium - Subsets I
// Givn a set of DISTINCT integers, nums, return all possible subsets (the power set)
// note: the solution set must not contain duplicate subsets.
// Ex: input nums = [1, 2, 3]
// output: [ [3], [1], [2], [1, 2, 3], [1, 3], [2, 3], [1, 2], []]

// Space Complexity S(2 to nth * n) = input O(n) + auxiliary O(n) + output (2 to nth * n)
// Time Complexity T(2 to nth) = leaf node O(2 to nth * n) + internal nodes O(2 to nth * 1)
class EnumerateSubsetsOfDistincts {
    constructor() {
        this.globalBag = [];
    }
    overall (arr) {
        this.helper(arr, 0, []);
        return this.globalBag;
    }
    helper(arr, i, sequence) {
        if (i===arr.length) {
            this.globalBag.push([...sequence]);
            return; 
        }
        // 2 Choices (Exclude & Include the Picked one from the original array) for the same Blank
        //include
        sequence.push(arr[i]);                      // Choice #1, Include Picked arr[i] to sequence
        this.helper(arr, i+1, sequence);            // go to next Blank i+1 & next Picked value
        sequence.pop();

         //exclude 
         this.helper(arr, i+1, sequence);           // Choice #2, Exclude Picked arr[i] from sequence
    }
}
const esod = new EnumerateSubsetsOfDistincts();
console.log('enumerate all subsets of distincts, no repetiton = ', esod.overall([1, 2, 3]))

// LeetCode Medium #46 - Permutations I
// Given a collection of DISTINCT integers, return all possible permutations
// Ex: Input [1, 2, 3]
// ouput: [ [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2,1]]
//
// WHY swap: see my recursiveFoundation.js - function permuteAllStringsNoRepetitionOf
// Ex: partial solution array to be passed down to children => [ ...array.slice(0, i), ...array.slice(i+1)]
// allows partial solution to be passed down as 1 consecutive array vs 2 broken arrays
//
// Space Complexity: S(n! * n) dominate = Input O(n) + Aux O(n) + Outputs O(n! * n)
// Time Complexity: T(n! * n) domoinate, upper bound = Leaf Nodes O(n! * n) + Internal Nodes (much less)
class PermuteDistinctsWithNoRepetition {
    constructor() {
        this.globalBag =[];
    }
    overall(arr) {
        this.helper(arr, 0, []);
        return this.globalBag;
    
    }
    helper(arr, i, slate) {
        if (i===arr.length) {
            this.globalBag.push([...slate]);
            return;
        }
        // Choices # for the same Blank = Picks # left in the input array
        for (let choice=i; choice < arr.length; choice++) {
            // swap = [arr[i], arr[choice]] = [arr[choice], arr[i]];
            this.swap(arr, choice, i);                              
            
            slate.push(arr[i]);                      // Choice #i, add Picked arr[i] to sequence
            this.helper(arr, i+1, slate);            // go to next Blank i+1 & next Picked value
            slate.pop();
    
            // unswap = [arr[i], arr[choice]] = [arr[choice], arr[i]];
            this.swap(arr, choice, i);                             
        }
    }
    swap(array, picked, i) {
        let temp = array[picked];
        array[picked] = array[i];
        array[i] = temp;
    }
}
const pdwnr = new PermuteDistinctsWithNoRepetition();
console.log('permute all from a set of distincts, no repetition = ', pdwnr.overall([1, 2, 3]));

// LeetCode Medium #47 - Permutations II 
// Given a collection of integers that might contain DUPLICATES, return all possible UNIQUE permutations
// Ex: Input [1, 1, 2]
// ouput: [ [1, 1, 2], [1, 2, 1], [2, 1, 1] ]

// Space Complexity: S(n! * n) dominate = Input O(n) + Aux O(n) + Outputs O(n! * n)
// Time Complexity: T(n! * n) domoinate, upper bound = Leaf Nodes O(n! * n) + Internal Nodes (much less)
class PermuteUniquesWithDuplicates {
    constructor() {
        this.globalBag =[];
    }
    overall(S) {
        this.helper(S, 0, []);
        return this.globalBag;
    
    }
    helper(arr, i, sequence) {
        if (i===arr.length) {
            this.globalBag.push([...sequence]);
            return;
        }
        // Branches are identical when Picked value is a duplicate.
        // Use Set to eliminate duplicate values in input array
        let set = new Set();

        // Choices # for the same Blank = Picks # left in the input array
        for (let choice=i; choice< arr.length; choice++) {
            if (set.has(arr[choice])) continue;                // if Picked arr[choice] exists in Set, don't build the tree branch
            else set.add(arr[choice]);                         // else, add the Picked arr[choice] to Set for the record

            //swap()
            [arr[i], arr[choice]] = [arr[choice], arr[i]];

            sequence.push(arr[i]);                             // Choice #i, add Picked arr[i], to sequence
            this.helper(arr, i+1, sequence);                   // go to next Blank i+1 & next Picked value
            sequence.pop();

            //unswap()
            [arr[i], arr[choice]] = [arr[choice], arr[i]];
        }
    }
}
const pdo = new PermuteUniquesWithDuplicates();
console.log('permute a set contains duplicatees, no repetition= ', pdo.overall([1, 1, 2]));

// LeetCode #90 Medium - Subsets II 
// Given a collection of integers that might contain DUPLICATES, nums,
// return all possible subsets (the poer set)
// NOTE: the solution must not contain duplicate subsets.
// Ex: Input [1, 2, 2]
// output: [[2], [1], [1, 2, 2], [2, 2], [1, 2], []]

// Space Complexity: S(n)=O(2 to nth *n) = input O(n) + aux (n) + output (2 to n * n)
// Time Complexity: T(n) = O(2 to nth * n) = Leaf nodes (2 to nth * n) + Internal Nodes (2 to nth * )
class EnumerateSubsetsOfDuplicates {
  constructor() {
      this.globalBag=[];
  }
  overall (arr) {
    arr.sort();                                             // IMPORTANT: sort first!
    this.helper(arr, 0, []);
    return this.globalBag;
  }
  helper(arr, i, sequence) {
    if (i===arr.length) {
        this.globalBag.push([...sequence]);
        return;
    }
    
    let count=0;                                            //count # of same copies in the remaining array
    for (let index=i; index<arr.length; index++) if (arr[index]===arr[i]) count++;

    // 2 Choices (Exclude or Include the Picked one from the original array) for same Blank 
    // multiple includes due to multiple copies of same value
    for (let c=1; c<=count; c++) {                           
        sequence.push(arr[i]);                              // Choice #i added multiple copies from the same Picked arr[i]
        this.helper(arr, i+count, sequence);                // go to next Blank by skipping duplicate of Picked values
    }
    for (let c=1; c<=count; c++) sequence.pop();

    // exclude 
    this.helper(arr, i+count, sequence);
  }
}
const esdo = new EnumerateSubsetsOfDuplicates();
console.log('enumerate all unique subsets of a set contains duplicates, no repetition', esdo.overall([1, 2, 2]))

// Leetcode #17 Medium - Letter Combinations of a Phone Number 
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations
// that the number could represent. A mapping of digit to letteres (just like on the telepone buttons)
// is given below. Note: 1 does not map to any letters.
// Ex: Input: "2, 3"
// output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
class PermuteLetterCombinationOfPhoneNumbers {
    constructor () {
        this.map = {
            '1': [],
            '2': ['a', 'b', 'c'], 
            "3": ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': [ 'j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z'],
            '0': []
        }
        this.globalBag =[];
    }
    overall(str) {
        this.helper(str.split(','), 0, [])
        return this.globalBag;
    }
    //input array has # digits = # blanks to fill
    helper (arr, i, sequence) {
        if (i === arr.length) {                              
            if (sequence.length > 0) {                       // if input digits do not have valid letters, sequence can be empty
                this.globalBag.push(sequence.join(''));        
                return;
            }
        } 
        // # of Choices for the same Blank = # of mapped letters for the digit
        // JS: plus sign converts str to numbers
        for (let letter of this.map[+(arr[i])]){            
            sequence.push(letter);                          // add Choices (letters) to sequence
            this.helper(arr, i+1, sequence);                // go next Blank i+1 & next Picked digit in the input array
            sequence.pop();
        }
    }
}
const plcpn = new PermuteLetterCombinationOfPhoneNumbers();
console.log('Permute letter combinations of phone numbres =', plcpn.overall("2, 3"))

// LeetCode #77 Medium - Knapsack (Backtracking Case) - Combinations 
// Given two integers, n and k, return all possible combinations of k numbers out of 1...n
// Ex: input = n=4, k=2
// output: [[2, 4], [3, 4], [2, 3], [1, 2], [1, 3], [1, 4]]
// hint: enumerate ALL subsets, then backtrack on subsets = k size
class KnapsackNchooseK {
    constructor() {
        this.globalBag =[];
    }
    // if n=4, arr = [1, 2, 3, 4]
    overall(n, k) {  
        this.helper(n, 1, [], k);            // i starts @ 1 since n is not an array vs. in arr[i], i starts @ 0 in an array
        return this.globalBag;
    }
    helper(n, i, slate, target) {            // n = 1, 2, 3, 4 ..., n
        // backtracking             
        if (slate.length===target) {         // when subset size === target size
            this.globalBag.push([...slate]); // add to globalbag
            return;
        } 
        // base case
        // slate.length < k
        if (i===n+1) return;                 // stop when i=5, pass n vs. i===arr.length pass last index
        
        // 2 Choices (Exclude and Include i) for the same Blank
        //include
        slate.push(i);                       // Choice #1, add i vs arr[i] to sequence
        this.helper(n, i+1, slate, target);  // go to next Blank i+1 & next Picked value
        slate.pop();

        // exclude
        this.helper(n, i+1, slate, target);  // Choice #2, skip adding Picked value i
    }
}
const ks = new KnapsackNchooseK();
console.log('Knapsack N choose K, return unique subsets of a len k from a set of len n', ks.overall(4, 2));

// LeetCocde #40 Medium - Knapsack (Backtracking Case) - Combinations Sum II 
// Given a collection of candidate numbers (candidates) and a target number (target),
// find all unique combinations in candidates where candidate numbers sums up to target.
// Eech number in candidates may only be used once in the combination.
// Note: all numbers (include target) >=0
// Note: the solution set must not contain duplicate combinations
// Ex: input candidates = [10, 1, 2, 7, 6, 1, 5], target =8
// output: [[1, 7], [1, 2, 5], [2, 6], [1, 1, 6]]
class SubsetSumOfDuplicates {
    constructor() {
        this.globalBag=[];
    }
    overall(candidates, target) {
        candidates.sort();                              // IMPORTANT: sort first!      
        this.helper(candidates, 0, [], target);
        return this.globalBag;
    }
    helper(arr, i, sequence, target, sum=0) {
        //backtracking
        if (sum > target) return;                       // this optimization statement only works for positive #s
        if (sum === target) {
            this.globalBag.push([...sequence]);
            return;
        }
        // base: sum of slate values < target
        if (i===arr.length) return;

        let count=0;
        for (let index=i; index<arr.length; index++) if (arr[index]===arr[i]) count++;
        
        // 2 Choices (Exclude & Include)
        // Multiple includes
        for (let c=1; c<=count; c++) {
            sequence.push(arr[i]);                                              // Choice #i added multiple copies from the same Picked arr[i]
            this.helper(arr, i+count, sequence, target, sum + ( c * arr[i]) );  // (c*arr[i]) = need to sum up multiple copies of the same #
        }
        for (let c=1; c<=count; c++) sequence.pop();

        //exclude
        this.helper(arr, i+count, sequence, target, sum);
    }
}
const ss = new SubsetSumOfDuplicates();
console.log('Subset Sum of duplicates, return all subsets of values sum up to target', ss.overall([10, 1, 2, 7, 6, 1, 5], 8));

// Timed Test: Possilbe to Achieve Target Sum
// Given a set of target integers and a target value k, 
// find whether there is a non-emmpty subset that sums up to k. 
// return a boolean
//
// Time Complexity: O(B to h power) = Branching factor to the power of height = O( 2 to nth) <= 2 decision each stage
// Space Commplexity: O(n)
class SubsetSumWithNegatives {
    constructor() {
        this.globalBag=[];
    }
    overall(candidates, target) {
        this.helper(candidates, 0, [], target);
        return (this.globalBag.length) ? true : false;
    }
    helper(arr, i, sequence, target, sum=0) {
        // backtracking case
        // if (sum > k) return;                                 <= this statement does not work for negative numbers!!
        if ((sum===target) && (sequence.length >0)) {
            this.globalBag.push([...sequence]);
            return;
        }
        if (i===arr.length) return;

        // See SubsetSumOfDuplicates() for further Optimization for Duplicate Copies of the same number

        // 2 Choices (Exlcude & Include) for the same Blank
        //exclude
        this.helper(arr, i+1, sequence, target, sum);
        //include
        sequence.push(arr[i]);
        this.helper(arr, i+1, sequence, target, sum+arr[i]);    // go to next Blank & next Picked value & sum up Picked value before pass it to child
        sequence.pop();
    
    }
}
const ssn = new SubsetSumWithNegatives();
console.log('Subset Sum With Negatives 1.', ssn.overall([10, 20], 0), '2.', ssn.overall([1], 0), '3.', ssn.overall([-5, -15], -15), '4.', ssn.overall([-3, -3, -3, -3], -12), '5.', ssn.overall([-2, -3, 1], -4));

// LeetCode #22 Medium - Generate Paranthesis (Backtracking Case) 
//
// see my recursiveFoundation.js - function topDownDFS_binaryStringsOfLen(n) => function bshelperDFS(slate, n)
//
// Given n pair of paratheses, write a function to generate all combinations of well-formed parantheses.
// Ex: given n=3
// output: ['((()))', '(()())', '(())()', '()(())', '()()()'] 
// hint: Constraint Filter = "well formed paratheses"
// hint: permutation with repetition of given length(order does matter)
//
// Time Complexity = nth Catlan # (Heavy Left Tree) => 2 branching factors, maximum height is 2n => O( 2 to the power 2n)
// sholdd not expect tight bound
class GenerateWellFormedParentheses {
    constructor() {
        this.globalBag=[];
    }
    overall(n) {
        this.helper(n, n, []);
        return this.globalBag;
    }
    helper(nLeft=0, nRight=0, sequence=[]) {   // sd: # of "(" and ")" left vs. # of blanks left to fill

        // Backtracking - as soon as 1 extra ")" is used, no need to continue building the sequence
        // exam the subproblem definition: # of "(" and ")" vs. partial solution: slate
        if (nLeft > nRight) return;      

        if (nLeft===0 && nRight===0) {
            this.globalBag.push(sequence.join(''));
            return;
        }
        // 2 Choices for the same Blank
        if (nLeft >0) {
            sequence.push('(');
            this.helper(nLeft-1, nRight, sequence);    //nLeft & nRight can be viewed as # of blanks left for "(" or ")"??
            sequence.pop();
        }
        if (nRight >0) {
            sequence.push(')');
            this.helper(nLeft, nRight-1, sequence);
            sequence.pop();
        }
    }
}
const gwfp = new GenerateWellFormedParentheses();
console.log('generate well formed parentheses of given length', gwfp.overall(3));

// Leetcode #51 Hard - N-Queens Puzzle
// Place N queens on a N * N chessboard such that no 2 Queens attachk each other.
// Given an integer N, return all distinct solutions to the n-quuens puzzle.
// hint: Queens can attack anyone on the same Row, same Column, samd 2 Diagonals.
//
// Time Complexity O(n!) w backtracking vs. O(n to nth)
// hint: print format: [ [2, 0, 3, 1], [...] ], convert array into a string denoting the board.
// " . . Q .
//   Q . . .
//   . . . Q
//   . Q . .", 
// "...."
class PermuteNQueenOnNxNBoard {
    constructor() {
        this.globalBag=[];

        //this.out=[];                      // for buildBoard
    }
    overall (n) {
        this.helper(0, [], n);              // row=# of remaining Queens, slate = colummn indexes of a Queen

        // for buildBoard
        // for (let i=0; i< this.globalBag.length; i++) {
        //     this.out.push(this.buildBoard(this.globalBag[i], n));
        // }
        // return this.out;

        return this.globalBag.length;
    }
    helper(nQueen, sequence, n) {
        // backtracking: exam slate - detect conflicts between Qi-1 and earlier queens
        let lastQ = sequence.length-1;                                   // i-1
        for (let earlierQ=0; earlierQ < lastQ; earlierQ++) {  
            if (sequence[earlierQ] === sequence[lastQ]) return;          // check for column conflict
            let rowdiff = Math.abs(lastQ - earlierQ);                    // check for diagonal conflict
            let coldiff = Math.abs(sequence[lastQ]-sequence[earlierQ]);
            if (rowdiff===coldiff) return;                               // DIAGONAL ATTACK => # of row difference = # of column difference
        }
        // base
        if (nQueen===n) {
            this.globalBag.push([...sequence]);
            return;
        }
        // Choices # = column # for same Queen position on seperate row
        for (let column=0; column<n; column++) {    
            sequence.push(column);                      // Choices # from 0 ... n column positions
            this.helper(nQueen+1, sequence, n);         // go to next Blank (Queen position) 
            sequence.pop();
        }
    }
    //[ [2, 0, 3, 1], [....], [....] ]
    //Array(65537).join('x')
    //Array.from(Array(n), ()=> Array(n).fill('-'));
    buildBoard(arr, n) {
        let matrix = Array.from(Array(n), ()=> Array(n).fill('-'));
        let board=[];
        for (let i=0; i< n; i++) {
            matrix[i][arr[i]] = 'q';
            board.push(matrix[i].join(''));
        }
        return board;
    }
}
const pn = new PermuteNQueenOnNxNBoard();
console.log('N-Queens Puzzle: all distinct solution ', pn.overall(8) );

// Leetcode #131 Medium - Palindrome Partitioning
// Given a string s, partition s such that every substring of that partition is a palindrome.
// return all possible palindrome partitioning of s. (palindrome = a word read the same forward & backwards)
// Ex: Input: "aab"
// output: [ ["aa", "b"], ["a", "a", "b"] ] or [ 'a|a|b', 'aa|b' ] where '|' is the Partition Symbol.
//
// hint: "aab" of length n => a _ a_ b = n-1 blanks with 2 Choices each blank: join characters or "|" add partition symbol.
// hint: permutation of string of len n => order matters
// hint: backtracking => skip the whole branch when last string is NOT a Palindrome.
//
// Time Complexity: O(2 to n-1 power * n ) => what is maximum branching factor? O(B to power h)
// Space Complxity: O(2 to n-1 power * n)
class PalindromePartitioning {
    constructor() {
        this.globalBag=[];
    }
    overall(str) {
        this.helper(str.split(''), 1, [str[0]], str[0]);    // start on 1st letter
        return this.globalBag;
    }
    helper(arr, i, sequence, laststr) {                     // laststr = the substring after the last '|' partition symbol
        if (i===arr.length) {
            if (this.isPalindrome(laststr)) this.globalBag.push(sequence.join(''));
            return;
        }
        // 2 Choices (join the substring & '|' partition symbol) for the same Blank
        // Choice #1: join
        sequence.push(arr[i]);
        this.helper(arr, i+1, sequence, laststr+arr[i]);
        sequence.pop();

        // Choice #2: partition with '|' symbol
        if (!(this.isPalindrome(laststr))) return;          // if last string is not valid, no point to traverse whole branch
        sequence.push('|');
        sequence.push(arr[i]);
        this.helper(arr, i+1, sequence, arr[i]);
        sequence.pop();
        sequence.pop();
    }
    isPalindrome(str) {
        for (let i=0; i< str.length; i++) {
            if (str[i] !== str[str.length-1-i]) return false;
        }
        return true;
    }
}
const pp = new PalindromePartitioning();
console.log('Palindrome Partitioning = ', pp.overall("abracadabra"));

// Pow(x, n) - Leetcode Medium
// Implement pow(x, n) which calculates x raised to the power of nth.
// Input: 2.00000, 10 => output: 1024.00000
// Input: 2.10000, 3 => output: 9.26100
// Input: 2.00000, -2 => output; 0.25000 (1/ 2 to 2th = 1/4 = 0.25)
class Pow {
    pow(x, n) {
        if (n===0) return 1;
        if (n<0) { x = 1/x; n=-n; }
        return x * this.pow(x, n-1);
    }
}
const p = new Pow();
console.log('raise x to the nth power ', p.pow(2.00000, 10).toFixed(5), ' ', p.pow(2.10000, 3).toFixed(5), ' ', p.pow(2.00000, -2).toFixed(5));
