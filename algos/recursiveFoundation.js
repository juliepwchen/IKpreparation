/********************************************************************
* 19 Fundamental problems
/*******************************************************************
* learn Facotiral to help solve Permutation (No Repetition) problems
********************************************************************/

// Factorial mathematical definition
// Time Complexity T(n) = O(n) - Linear - Decrease & Conquer
function factorial(n) {
    if (n===0) return 1;
    else return n * factorial(n-1)
}
console.log('factorial= ', factorial(4));

// Time Complexity T(n) = O(n) - Linear
//
// HOW MANY ways can n distinct letters be arranged in a straight line?
// e.g. {a, b, c, d} or {b, c, d, a} or {c, d, a, b}, etc.
// hint: fill n blanks & each blank has decreasing # of choices
// hint: Permutation with No Repetition, Order Matters
function totalPermutesNoRepeatOfLen(n) {
    if (n===0) return 1;
    else return n * totalPermutesNoRepeatOfLen(n-1);
}
console.log('total # of permutations of n distincts, no repetition=', totalPermutesNoRepeatOfLen(4));

/*******************************************************************
* learn Raise an Integer to a Power ito help solve Subset problems
********************************************************************/

// Raise n to the kth powermathmatical definition 
// Time Complexity T(n) = O(k) - Linear - Decrease & Conquer
function raiseIntToPower(n, k) {
    if (k===0) return 1;
    else return n * raiseIntToPower(n, k-1);
}

// Time Complexity T(n) = O(n) - Linear - Decrease & Conquer
//
// HOW MANY subsets of a set of size n are there?
// e.g. {a, b, c} = {}, {a}, {b}, {c}, {a, b}, {b, c}, {a, c}, {a, b, c}
// hint: fill n blanks & each blank has 2 choices: include/exclude
// hint: Subsets with No Repetition, ORDER does NOT matter
function totalSubsetsOfLen(choices=2, n) {
    if (n===0) return 1;
    else return choices * totalSubsetsOfLen(choices, n-1);
}

console.log('raise integer to the power=', raiseIntToPower(2, 5));
console.log('total # of subsets of n size Set, no repetition =', totalSubsetsOfLen(2, 5));

/*******************************************************************
* learn Fibonacci Sequence to help solve Combination problems
********************************************************************/

// Fibonacci mathematical defintition
// Time Complexity T(n) upper bound = O(2 to nth power): Exponential
// Find fibonacci # at nth position.
// e.g. fibonacci(0) - fibonacci(10) = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
function fibonacci (n) {
    if (n===0 || n===1) return n;
    else return fibonacci(n-1) + fibonacci(n-2);
}

// Time Complexity T(n) = O(2 to the nth power) - Exponential
//
// HOW MANY ways to pick k students out of n students to be in a team?
// C(n, k) = C(n-1, k) + C(n-1, k-1)
// C(n, k) = C(n, n-k) = n! / k! * (n-k)!
// Base case: C(n, 0) = C(n, n) =1
function totalCombinations_NchooseK(n, k) {
    if (n<=1|| k===0 || k===n) return 1;
    else return totalCombinations_NchooseK(n-1, k) + totalCombinations_NchooseK(n-1, k-1);
    // else return (factorial(n) / (factorial(k)*factorial(n-k)));
}
console.log('total # of combinations from n distincts, choose k = ', totalCombinations_NchooseK(4, 2));

/*******************************************************************
* Improve Time Complexity using Fibonacci Sequence
* 1) Tope Down Memoization
* 2) Bottom Up Iterative
* 3) AddSeq: Recursion with Modified Base Cases
********************************************************************/

// Top Down Memoization
function memoize(fn) {
    let cache={};
    return function(...args){
        if (cache[args]) return cache[args];
        let result = fn.apply(null, args);
        cache[args] = result;
        return result;
    }
}
const memoizedFibonacci = memoize(fibonacci);

// Time Complexity T(n) = O(n) - Linear
// Space Complexity O(n)
// Bottom Up Iterative
function bottomUpFibonacci(n) {
    let arr =[0, 1];
    for (let i=2; i<=n; i++) {
        arr[i] = arr[i-1]+arr[i-2]; //populate Fib values in the array
    }
    return arr[n];
}
// Find only the fibonnaci of N
// T(n) = O(n), S(n) = O(1)
function bottomUpFibonacci2(n){
    if (n < 2) return n;
    let minus2 = 0, minus1=1, fibN= 1;  // [0, 1, 1]
    for (let i = 2; i <= n; i++) {
        minus1 = fibN;       
        fibN = minus1 + minus2;  
        minus2 = minus1;         
    }
    return fibN;
}

// Time Complexity T(n) = O(n) - Linear - Decrease & Conquer
// Recursion by Modifying Base Cases
function addSeqFibonacci(n, base1, base2) {
    if (n===0) return base1;
    else return addSeqFibonacci(n-1, base2, base1+base2)
}

console.log('fibonacci= ', fibonacci(7));    
console.log('momoize= ', memoizedFibonacci(7));
console.log('iterative= ', bottomUpFibonacci(7));
console.log('iterative w/o array = ', bottomUpFibonacci2(7));
console.log('addSeq= ', addSeqFibonacci(7, 0, 1));

/*******************************************************************
* learn Tower of Hanoi to help understand Lazy Manager concept.
* Think only the Base Case 
*   - move 1 disk from A to B
* Delegate n-1 work to subordinate
*   - mvoe n-1 disks from A to C
*   - move n-1 disks from C to B
********************************************************************/

// Time Complexity T(n) = O(2 to nth power) - Exponential
// Tower of Hanoi Game - move 1 disk at a time + place only smaller disk on top of larger disk
function towerOfHanoi(n, A, B, C) {
    if (n===1) {
        console.log('Tower of Hanoi: base: move disk from ', A, 'to ', B);
    }
    else {
        towerOfHanoi(n-1, A, C, B);
        console.log('Tower of Hanoi: recursive: move disk from ', A, 'to ', B)
        towerOfHanoi(n-1, C, B, A)
    }
}
towerOfHanoi(3, 'A', 'B', 'C');     

/*****************************************************************************
* learn Combinatorial Enumeration to help solve Tree Traversal problems
* - Binary Tree (0, 1) vs. N Children Branches Tree (decimal: 0 to 9)
* - BFS traversal vs DFS
* - Time Complexity (does not change) vs Space Complexity (callstack)
******************************************************************************/

/*******************************************************************
* Permutation - Ordere matters + Repetition
********************************************************************/

// Time Complexity T(n)= O(2 to nth power) - Exponential - Divide & Conquer (DFS)
//
// DFS improves Space Complexity S(n) for callstack = O(n) max depth of callstack
// Print all permutation of Binary String of SAME LENGTH n, Repeition allowed
function topDownDFS_binaryStringsOfLen(n) {
    bshelperDFS('', n);
}
function bshelperDFS(slate, n) {
    if (n ===0) return console.log('permute all binary strs DFS, w repetition = ', slate);
    else {
        bshelperDFS(slate+'0', n-1)
        bshelperDFS(slate+'1', n-1)
    }
}
topDownDFS_binaryStringsOfLen(3);

// Time Complexity T(n)= O(2 to nth * n), Space Complexity S(n) = O(2 to nth)
// BFS recursion
function topDownBFS_binarystringsOfLen(n) {
    let result =[];
    if (n===1) return ['0', '1'];
    else {
        let prev = topDownBFS_binarystringsOfLen(n-1);
        for (let s of prev) {
            result.push(s+'0');
            result.push(s+'1');
        }
    }
    return result;
}
console.log('permute all binary strs BFS, w repetition = ', topDownBFS_binarystringsOfLen(3));

// Time Complexity T(n)= O(2 to nth * n), Space Complexity S(n) = O(2 to nth)
// BFS Iterative
function bottomUpBFS_binaryStringsOfLen(n) {
    let result = ['0', '1'];        //start with leftmost blank
    for (let i=2; i<=n; i++) {      //FOR n blanks
        let partial=[];
        console.log('BFS result', result);
        for (let s of result) {     //FOR each partial string
            partial.push(s+'0');    //append choices (0, 1) to 1 more blank
            partial.push(s+'1');    
        }
        result = partial;
    }
    return result;
}
console.log('permute all binary strs BFS iterative, w repetition = ', bottomUpBFS_binaryStringsOfLen(3));

// Time Complexity T(n)lower bound = O(n! * n)
// DFS improves Space Complexity - O(n) max depth of callstack
// Print all permutation of Decimal Digit(s)of SAME LENGTH n, Repetition allowed
// Recursion + FOR loop
function topDownDFS_decimalStringsOfLen(n) {
    dsHelper('', n);
}
function dsHelper(slate, n) {
  if (n===0) console.log('permute all decimal strs, w repetition = ', slate);
  else {
      for (let i=0; i< 10; i++) {
          dsHelper(slate+i, n-1);
      }
  }
}
topDownDFS_decimalStringsOfLen(2);

/*******************************************************************
* Permutation - Order matters + No Repetition
********************************************************************/

// T(n) lower bound = O (n! * n)
// Space Complexity S(n)= O(n)
// Given a set (or a string) S with n distinct characters, 
// -  print all permutations of SAME LENGTH n, no repetition
function permuteAllStringsNoRepetitionOf(S) {
  pHelper('', [...S]);
}
function pHelper(slate, array) {
    if (array && array.length===0) console.log('permute all strings of same length - NO repetition {', slate, '}');
    else {
        for (let i=0; i< array.length; i++) {
            pHelper(slate + array[i], [ ...array.slice(0, i), ...array.slice(i+1)]);
        }
    }
}
permuteAllStringsNoRepetitionOf('julie');

/*******************************************************************
* Combination (Subsets) - Order does not matter + No Repetition
********************************************************************/
// Time Complexity T(n) = O(2 to nth power)
// Space Complexity S(n) = O(n)
// A set of S of n distinct numbers, enumerate (print) all its subsets.
function enumerateAllSubsetsOf(S) {
    subsetsHelper('', S)
}
function subsetsHelper(slate, array) {
  if (array && array.length===0) console.log('enumerate all subsets of n distincts= {', slate, '}');
  else {
      //exclude
      subsetsHelper(slate, array.slice(1));
      //include
      subsetsHelper(slate + (array[0]), array.slice(1));
  }
}
enumerateAllSubsetsOf([3, 4, 7]);

/*******************************************************************
* (Live Class) Permutation using General Template
* - Order matters + Repetition
* - using string concatenation vs char array (see recursiveLiveClass.js)
* - Due to immutable strings
*   - Aux Space Complexity = O(n to power of 2) 
*   - Time Complexity for Internal Node = O(2 to the nth * n)
********************************************************************/

// Letter Case Permutation (LeetCode Easy) 
//
// Given a string S (a set of n objects), we can transform eachh letter 
// individually to be lowercase or uppercase to create another string. 
// Return a list of all possible strings we could create.
// Ex: input S string = "a1b2" => ["a1b2", "a1B2", "A1b2", "A1B2"]
class PermuteLetterCaseOnly {
    constructor() {
        this.globalBag =[];
    }
    overall(S) {           
        this.helper(S, 0, '')
        return this.globalBag;
    }
    helper(str='', i=0, slate) {   

        if (i ===str.length) { 
            this.globalBag.push(slate);  
            return;
        } 
        if ((/[a-zA-Z]/).test(str[i])) {
            this.helper(str, i+1, slate+ str[i].toLowerCase()); 
            this.helper(str, i+1, slate+ str[i].toUpperCase());
        } else  {
            this.helper(str, i+1, slate);              
        }
    }
}
const plc = new PermuteLetterCaseOnly();
console.log('permuteLetterCase = ', plc.overall("a1b2"));





