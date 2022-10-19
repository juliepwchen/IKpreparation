/**************************************************************************************************
*
* learn General Template => DP is useful in Optimization problems (Minimum or Maximum)
* 1) Identify Optimization problem 2) Come up a Recurrance Equation via Decrease & Conquer Strategy
* 3) Identify all possible distinct subproblems 4) build Dependency Graph 
* => vertices as subproblems & edges points to subproblem solutions (neighbors) required to calculate solutions
* 
***************************************************************************************************/
//
// Climbing n stairs - Counting problem
// A Child is trying to climb the steps. The maximum # of steps he can climb at a time is two.
// He can climb 1 or 2 steps at a time. Givne n steps in total, count # of WAYS he can cllimb the staircase.
//
class ClimbStairCases {
    constructor() {
        this.globalbag=[];
    }
    // T(n) = O(n), S(n) = O(n) - stairs climbing starts at 1 step or 2 steps, calculation starts at n=3
    dp_maxTwoSteps(n) {
        const table =['none', 1, 2];                           // f(3) depend on f(2)=2, f(1)=1
        for (let i=3; i<= n; i++) {
            table[i]=table[i-1] + table[i-2];                  // f(n) depend on solutions from previouss 2 subproblems
        }
        console.log(table);
        return table[n];                                       // table size = n+1
    }
    dfs_maxTwoSteps(n) {
        this.helper(0, [], n);
        return this.globalbag.length;
    }
    helper(i, slate, n) {
        //backtrack
        if (i >n) return;
        //base
        if (i === n) {
            this.globalbag.push([...slate]);
            return;
        }
        //recursive - 2 choices (1 step or 2 steps)
        let choice = i+1;
        slate.push(choice);
        this.helper(choice, slate, n);
        slate.pop();

        choice=i+2;
        slate.push(choice);
        this.helper(choice, slate, n);
        slate.pop();
    }

}
const sc = new ClimbStairCases();
console.log('Count Ways to Climb N Stairs, maximum 2 steps, DP style', sc.dp_maxTwoSteps(9));      // 8 steps to the top
console.log('Count Ways to Climb N Stairs, maximum 2 steps, DFS style', sc.dfs_maxTwoSteps(9));    

//
// Coin Change Problem
// You work as a Cashier spending your day giving back change to customers (only coins).
// You need to use the fewest coins possible whenever you give change.
// Given: coins of different denominations and a total amount of money, compute
// the fewest number of coins that you need to make up that amount.
//
// T(a, k) = O(a, k), S(a, k)=O(a)
//
// Ex: # of blanks = # of coin denominations = Branching Factor of 3 to the height of the tree (Subset Sum problem)
// f(a) stores fewest # of coins needed to construct amount a for coins [C1, C2, C3, ... Ck] denominations
// Subproblem Solutions has choices (neighbors) f(a-C1), f(a-C2), f(a-C3), ... f(a-Ck)
// f(a) = Minimum of # of f(a-Ck) + 1 (additional coin counting myself)
// 
class CoinChange {
    constructor() {}
    dp(amount, coins) {
        let table = Array(amount+1).fill(Infinity);
        //base case
        table[0]=0;
        //initialize the rest of table to INFINITE value
        for (let i=1; i< amount+1; i++) {
            //compute & cache
            for (let coin of coins) {
                if (i-coin >=0) table[i]=Math.min(table[i], table[i-coin]);
            }
            table[i]++;
        }
        return table[amount];
    }
}
const cc = new CoinChange();
console.log('Coin Change', cc.dp(10, [1, 5, 7]));

// 
// Counting subsets of size k => C(n, k) = C(n-1, k) + C(n-1, k-1)
//
// T(n)=O(nk) <= O((n-k)k) = O(nk - k squared), S(n)=O(nk) <= K squared < nk
// (n choose k) = (n choose n-k)
//
class Count_Subsets_NChooseK {
    constructor() {
        this.globalbag=[];
    }
    dp(n, k) {
        const table = Array(n+1).fill().map(()=>Array(k+1).fill(0));    // n+1 rows x k+1 columns
        // base case
        if (k===0 || k===n) return 1;
        for (let row=0; row <=n; row++) table[row][0]=1;       // base case: n choose k, k=0                                       
        for (let col=0; col<=k; col++) table[col][col]=1;      // diagonal n choose n, k=n, when k>n, cell values are invalid
        // recursive case
        for (let row=2; row<=n; row++) {                       // starts at 2, (0,0)=1, (1,0)=1, (1,1)=1
            let colsize=Math.min(row, k);                      // only need to fill values below diagonal base case                  
            for (let col=1; col <= colsize; col++) {           // 2 edges coming to vertex (n, k) = (n-1, k-1) & (n-1, k)
                table[row][col] = table[row-1][col] + table[row-1][col-1];  // O(1)
            }
        }
        return table[n][k];                                    // table size rowss x columns = (n+1) x (k+1)            
    }
    dfs(n, k) {
        this.helper(1, [], n, k);
        return this.globalbag.length;
    }
    helper(i, slate, n, k) {
        //backtrack
        if (slate.length === k) {
            this.globalbag.push([...slate]);
            return;
        }
        //base
        if (i===n+1) return;;
        //recursive include
        slate.push(i)
        this.helper(i+1, slate, n, k);
        slate.pop()
        //exclude
        this.helper(i+1, slate, n, k);
    }
}
const subsetNChooseK = new Count_Subsets_NChooseK();
console.log('Subsets N Choose K DP', subsetNChooseK.dp(5, 2));    // 4 rows x 2 columns matrix
console.log('Subsets N Choose K DFS', subsetNChooseK.dfs(5, 2));   

//
// Counting Unique Paths in a Grid (Decrease & Conquer)
// Given a 2D grid with m rows and n columns, count the number of unique paths 
// starting at the top-left corner and getting to the bottom-right corner.
// All (Robot) moves must either go right or down.
//
// T(m,n) = O(mn), S(m,n)=O(mn), total # of moves: (m+n -2), # of subproblems: mxn
// (m+n -2 choose n-1) = (m+n-2 choose m-1) => pick which of these moves go right
//
// Recurrance Equation: f(m-1, n-1) stores # of Unique Paths from Source (0,0) to Destination (m-1, n-1)
// f(m-1, n-1) = f(m-2, n-1) + f(m+1, n-2)
//
class CountUniquePaths {
    constructor() {}
    dp(m, n) {
        const table = Array(m).fill().map(()=>Array(n).fill(0));
        // base case
        for (let i=0; i<m; i++) table[i][0]=1;               // (0...m, 0)=1, 1st column of grid =1 unique path
        for (let j=0; j<n; j++) table[0][j]=1;               // (0, 0...n)=1, 1st row of grid =1 unique path
        // recursive case
        for (let row=1; row < m; row++) {                    // row by row, top to bottom
            for (let col=1; col<n; col++) {                  // each row, left to right
                table[row][col]=table[row-1][col]+table[row][col-1];  // (1,1) = (0, 1) + (1, 0)
                                                                      // (0,0)(0,1)
            }                                                         // (1,0)(1,1)
        }
        return table[m-1][n-1];
    }
}
const cup = new CountUniquePaths();
console.log('Count Unique Paths from top-left to bottom-right in a 2D table', cup.dp(7, 7))

//
// Maximum Path Sum - Find a path from top-left to bottom-right with Maximum Sum
//
// T(m,n)= O(mn), S(m,n)= O(mn)
//
// Recurrance Equation: f(i, j) stores maximum points of f(i-1, j) and f(i, j-1) + points in my own cell
// 
class MaximumPathSum {
    dp(grid) {
        let m=grid.length, n=grid[0].length;
        let table = Array(m).fill().map(()=>Array(n.length).fill(0));
        //base case = points from left + points in my own cell or points from top + points in my own cell
        table[0][0]=grid[0][0];
        for (let col=1; col<m; col++) table[0][col]=table[0][col-1]+grid[0][col];       // fill all columns in row 0 
        for (let row=1; row<n; row++) table[row][0] = table[row-1][0] + grid[row][0];   // fill all cells in column 0
        // recrusive case
        for (let row=1; row < m; row++) {
            for (let col=1; col<n; col++) {         // table[i][j] stores values of Maximum Sum Path from (0,0) to (i, j)
                table[row][col]= Math.max(table[row-1][col], table[row][col-1]) + grid[row][col]; 
            }
        }
        return table[m-1][n-1];
    }
}
const mps = new MaximumPathSum();
console.log('Find Maximum Path Sum', mps.dp(
    [
        [1, 3, 1],              // table (0,0)=1 => table(0, 1)=table(0, 0)+grid(0, 1)=1+3=4
        [1, 5, 1],              // table (1, 0)=table(0, 0)+grid(1, 0)=1+1=2
        [4, 2, 1]               // table (1, 1)=Max of table(0,1) & table(1,0) + grid(1,1)=4+5=9
    ]
));                             // output: 12

//
// Minimum Cost Stair Climbing - Optimization problem
//
// T(n) = O(n), S(n)=O(n) - Optimal Structure property
//
// Recurrance Equation: f(i) stores total value of Minimum Cost Path from Source to i
// f(n) = Minimum of costs between f(n-1) and f(n-2) + cost in my own cell
//
class MinimumCostStairClimbing {
    constructor() {}
    dp(costs) {
        let n=costs.length;
        let table = Array.from({length:n+2}, ()=>0);    // need 2 extra space for Floor Below & Floor Above
        // base case
        table[0]=0;                                     // set Floor Below =0
        table[1]=costs[0];                              // 1st step has cost of costs[0]
        costs.push(0);                                  // set Floor Above =0 cost
        // recursive case
        for (let i=2; i<n+2; i++) {
            table[i]=Math.min(table[i-1], table[i-2]) + costs[i-1];  // n step has a cost of costs[n-1]
        }
        return table[n+1];
    }
}
const mcsc = new MinimumCostStairClimbing();
console.log('Minimum Cost Stair Climbing', mcsc.dp([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));

///////////////////////////
class Fibonacci {
    constructor() {}
    // T(n) = O(n), S(n) = S(n) - Top Down DFS
    fib_memo(n) {
        const memo={ 0:0, 1:1 };
        if (memo[n]) return memo[n];
        if (n <=1) return n;
        memo[n] = this.fib_memo(n-1) + this.fib_memo(n-2);
        return memo[n];
    }
    // T(n) = O(n), S(n) = O(n) - Fib sequence starts at 0, calculation starts at n=2
    fib_bottomup(n) {                                           
        const table = [0, 1];                                   // f(2) depend on fib(0)=0, fib(1)=1
        for (let i=2; i<=n; i++) {
            table[i] = table[i-1]+ table[i-2];                  // fib(2)=fib(1)+fib(0)
        }
        return table[n];                                        // table size = n+1
    }
    // T(n) = O(n), S(n) = O(1) - use only 3 spaces of an array
    fib_optimized(n) {
        const table=[0, 1]; 
        for (let i=2; i<= n; i++) {
            // table[2%3]=table[2], table[3%3]=table[0], table[4%3]=table[1], table[5%3]=table[2], etc.
            // table[2%3]=table[(2-1)%3] + table[(2-2)%3] => table[2]= table[1] + table[0]
            table[i%3] = table[(i-1) %3] + table[(i-2) %3];   
        }
        console.log(table);
        return table[n%3];                                      //ex: table[8%3]=table[2] = 21
    }
}
const fib = new Fibonacci();
console.log('Fibonacci Bottomm Up', fib.fib_bottomup(8));
console.log('Fibonacci Memo', fib.fib_memo(8));
console.log('Fibonacci Optimized', fib.fib_optimized(8));