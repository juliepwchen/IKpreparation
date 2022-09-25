/***************************************************************************************************/
/* Leetcode Eassy: 1 problem => Medium: 8 problems => Hard: 1 problem
/***************************************************************************************************/
/*  Learn General Template
*  1) Build the Graph  2) BFS or DFS  3) Outer Loop
/***************************************************************************************************/

// Leetcode #323 Mediumm - Number of connected component in an undirected graph
// Given n nodes labeled from 0 to n-1 and a list of undirected edges (each edge is a pair of node),
// writie a function to find the number of connected components in an undirected graph
// Ex: input n=5, edges=[[0,1], [1,2], [3,4]], output=2
// Ex: input n=5, edges=[[0,1], [1,2], [2, 3], [3,4]], output=1
class NumberOfConnectedComponents {
    constructor(n, edges) {
        this.n=n;                                           // n = # of vertices, 0...n-1
        this.edges=edges;
        this.adjList=Array(n).fill().map(()=>[]);
        this.visited=Array(n).fill(-1);
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
    // T(n) = O(m+n) = O(n) for push/pop vertices on queue + O(m) for looking up adjList for each vertex
    // S(n) = O(n) for auxiliary space = size of queue
    bfs(source) {
        let q=[source];
        this.visited[source]=1;
        while (q.length >0) {
            let vertex = q.shift();
            for (let neighbor of this.adjList[vertex]) {
                if (this.visited[neighbor]===-1) {
                    this.visited[neighbor] =1;
                    q.push(neighbor);
                }
            }
        }
    }
    // T(n) = O(m+n) = O(n) for push/pop vertices on callstack + O(m) for looking up adjList for each vertex
    // S(n) = O(n) for auxiliary space = size of callstack
    dfs(source) {
       this.helper(source);
       return this.visited;
    }
    helper(vertex) {
        this.visited[vertex]=1;
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited[neighbor]===-1) this.helper(neighbor);
        }
    }
    outerloop() {
        this.buildGraph();
       
        let components =0;
        for (let vertex=0; vertex<this.n; vertex++) {
            if (this.visited[vertex]===-1) {
                components++;
                this.dfs(vertex);                             // either bfs or dfs = marking visited array
            }
        }
        return components;
    }
}
const ncc= new NumberOfConnectedComponents(5, [[0,1], [1,2],[3,4]]);
console.log('Number of connected Components', ncc.outerloop());

// Leetcode #261 Medium - Graph Valid Tree
// Given n nodes labeled from 0 to n-1, and a list of undirected edges (each edge is a pair of nodes),
// write a function to check whether these edges make up a valid tree
// Ex: input n=5, edges= [[0, 1], [0, 2], [0, 3], [1, 4]], output = true
// Ex: input n=5, edges=[[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], output = false
//
// Tree = a connected graph with no cycles
//
class GraphIsATree {
    constructor(n, edges) {
        this.n=n;
        this.edges=edges;
        this.adjList=Array(n).fill().map(()=>[]);
        this.visited=Array(n).fill(-1);
        this.parents=Array(n).fill(-1);
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
    bfs(source) {
        let q=[source];
        this.visited[source]=1;
        while (q.length >0) {
            let vertex = q.shift();
            for (let neighbor of this.adjList[vertex]) {
                if (this.visited[neighbor]===-1) {                  // tree edge
                    this.parents[neighbor] = vertex;
                    this.visited[neighbor]=1;
                    q.push(neighbor);
                } else {                                            // neightbor is visited
                    if (neighbor !== this.parents[vertex]) return true;   // is a cross edge => a cycle
                }   
            }
        }
        return false;
    }
    dfs(source){
        return this.helper(source);
    }
    helper(vertex) {                                                // Bottom Up DFS
        this.visited[vertex]=1;
        for (let neighbor of this.adjList[vertex])  {
            if (this.visited[neighbor]===-1) {
                this.parents[neighbor] = vertex;
                if (this.helper(neighbor)) return true;             // my subordinate discovered a Back Edge => return to parent
            } else {                                                // neighbor has been visited
                if (neighbor !== this.parents[vertex]) return true; // I discovered a Back Edge => a Cycle
            }
        }
        return false;                                               // no Back Edge => no cycle
    }
    outerloop() {
        this.buildGraph();

        let components=0;
        for (let vertex=0; vertex < this.n; vertex++) {
            if (this.visited[vertex]===-1) {
                components++;
                if (components > 1) return false;       // this graph is not connected
                if (this.dfs(vertex)) return false;     // this graph has found a cycle => NOT a tree
            }
        }
        return true;                                    // this graph is connected
    }
}
const git = new GraphIsATree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]);
console.log('Graph is a Tree', git.outerloop());

// Leetcode #785 Medium - Is Graph Bipartite?
// Given an undirected graph, return true if and only if it is a bipartite.
// Ex: input [[1, 3], [0, 2], [1, 3], [0, 2] ], output: true
// NOTE: n=length of input for building the graph (0...n-1 vertices) => v0 -> [1, 3], v1 -> [0, 2], etc.s
//
// Model this as a Graph problem => Build the Graph (adjList) => BFS/DFS => Outer Loop
// All trees are Bipartite <= no cycles; Bipartite = Even length Cycle
// Cross Edges on the same layer => Odd length Cycle; on adjacent layer => Even length Cycle
//
class GraphIsBipartite {
    constructor(edges) {
        this.n = edges.length;
        this.edges = edges;
        this.adjList=Array(this.n).fill().map(()=>[]);
        this.visited=Array(this.n).fill(-1);
        this.parents=Array(this.n).fill(-1);
        this.distance=Array(this.n).fill(-1);
        this.color=Array(this.n).fill(-1);
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
    bfs(source) {
        let q=[source];
        this.visited[source]=1;
        this.distance[source]=0;
        while (q.length >0) {
            let vertex = q.shift();
            for (let neighbor of this.adjList[vertex]) {
                if (this.visited[neighbor]===-1) {                                          // Tree Edge
                    this.visited[neighbor]=1;
                    this.parents[neighbor]=vertex;
                    this.distance[neighbor]=this.distance[vertex]+1;
                    q.push(neighbor);
                } else {
                    if (neighbor !== this.parents[vertex]) {                                // Cross Edge => Cycle
                        if (this.distance[neighbor]===this.distance[vertex]) return false;  // Odd length Cycle => NOT Bipartite
                    }
                }
            }
        }
        return true;
    }
    dfs(source) {
        return this.helper(source);
    }
    helper(vertex) {
        this.visited[vertex]=1;
        if (this.parents[vertex] === -1) this.color[vertex]=0;
        else this.color[vertex]=1-this.color[this.parents[vertex]];
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited[neighbor]===-1) {
                this.parents[neighbor]=vertex;
                this.distance[neighbor]=this.distance[vertex]+1;
                if (!this.helper(neighbor)) return false;
            } else {
                if (neighbor !== this.parents[vertex]) {                                    // Back Edge => Cycle
                    if (this.color[neighbor]===this.color[vertex]) return false;            // same color => NOT Bipartite
                }
            }
        }
        return true;
    }
    outerloop() {
        this.buildGraph();

        let components=0;
        for (let vertex=0; vertex<this.visited.length; vertex++) {
            if (this.visited[vertex]===-1) {
                components++;
                //if (!this.bfs(vertex)) return false;
                if (!this.dfs(vertex)) return false;
            }
        }
        return true;
    }
}
const gib = new GraphIsBipartite([[1, 3], [0, 2], [1, 3], [0, 2] ]);
console.log('Graph is Bipartite', gib.outerloop());

// Leetcode #886 Medium - Possible Bipartition
// Given a set of N people (numbered 1 ... N), we'd like to split everyone into 2 groups of any size.
// Eech person may dislike some other people, and they should not go into the same group.
// Formally, if dislikes[i]=[a, b], it means it is not allowed to put the people numbered a and b in the same group.
// Return true if and only if it is possible to split everyone into two groups in this way.
// Ex: input N=4, dislikes=[[1,2], [1,3], [2,4]], output: true
// Ex: input N=3, dislikes=[[1, 2], [1, 3], [2, 3]], output: false
// Ex: input N=5, dislikes=[[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]], output: false
// 
class PossibleBipartition {
    constructor(n, edges) {
        this.n=n+1;
        this.edges=edges;
        this.adjList=Array(this.n).fill().map(()=>[]);
        this.visited=Array(this.n).fill(-1);
        this.parents=Array(this.n).fill(-1);
        this.distance=Array(this.n).fill(-1);
        this.color=Array(this.n).fill(-1);
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
    bfs(source) {
        let q=[source];
        this.visited[source]=1;
        while(q.length>0) {
            let vertex=q.shift();
            for (let neighbor of this.adjList[vertex]) {
                if (this.visited[neighbor]===-1) {                                          // Tree Edge
                    this.visited[neighbor]=1;
                    this.parents[neighbor]=vertex;
                    this.distance[neighbor]=this.distance[vertex]+1;
                    q.push(neighbor);
                } else {                                                
                    if (neighbor !== this.parents[vertex]) {                                // Cross Edge => Cycle
                        if (this.distance[neighbor]===this.distance[vertex]) return false;  //Odd Length Cycle => NON Bipartitee
                    }
                }
            }
        }
        return true;
    }
    dfs(source) {
        return this.helper(source);
    }
    helper(vertex) {
        this.visited[vertex]=1;
        if (this.parents[vertex]===-1) this.color[vertex]=0;
        else this.color[vertex]=1-this.color[this.parents[vertex]];
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited[neighbor]===-1) {
                this.parents[neighbor]=vertex;
                this.distance[neighbor]=this.distance[vertex]+1;
                if (!this.helper(neighbor)) return false;                               // subordinate returns false => return false to parent
            } else {
                if (neighbor !== this.parents[neighbor]) {                              // Back Edge => Cycle
                    if (this.color[neighbor]===this.color[vertex]) return false;        // Same Color => NON Bipartite
                }
            }
        }
        return true;
    }
    outerloop() {
        this.buildGraph();

        let components=0;
        for (let vertex=0; vertex < this.n; vertex++) {
            if (this.visited[vertex]===-1) {
                components++;
                // if (!this.bfs(vertex)) return false; 
                if (!this.dfs(vertex)) return false;           
            }
        }
        return true;
    }
}
const pb = new PossibleBipartition(4, [ [1,2], [1,3], [2,4] ]);
console.log('Possilbe Bipartitie - seperate Dislikes', pb.outerloop());

// Leetcode #200 Medium - Number of Islands
// Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. 
// An island is surrounded by water and is formed by connecting adjacent lands horizontally
// or vertically. You may assume all four edges of the grid are all surrounded by water.
// Ex: input, output: 1             input, output:3
// 11110                            11000
// 11010                            11000
// 11000                            00100
// 00000                            00011
//
// T(n) = O(n) for each vertex to find its neighbor in a grid, need to scan the whole row for a '1' edge => O(n*n)
// S(n) = O(n squared), does not depend on # of edges in the graph, space allocation is fixed for a grid
class NumberOfIslands {
    constructor(grid) {
        this.grid=grid;                           // grid = grid.length (X) by grid[0].length (Y)
    }
    getNeighbors(vx, vy) {                        // for vertex (x, y), its neighbors = (x+1, y),  (x, y+1), (x-1, y), (x, y-1)
        let neighbors=[];
        if (vx+1 < this.grid.length) neighbors.push( [vx+1, vy] );      // going counter clock wise - 4 directionally
        if (vy+1 < this.grid[0].length) neighbors.push( [vx, vy+1] );
        if (vx-1 >= 0) neighbors.push( [vx-1, vy] );
        if (vy-1 >= 0) neighbors.push( [vx, vy-1]);
        return neighbors;                       // ex: [ [2, 3], [1, 4], [0, 3], [1, 2] ]
    } 
    bfs(sx, sy) {                               // start bfs traversal from source vertex (sx, sy)
        let q=[ [sx, sy] ];
        this.grid[sx][sy] = 0;                  // mark source vertex (sx, sy) as visited 0
        while (q.length >0) {
            let [vx, vy] = q.shift();
            let neighbors = this.getNeighbors(vx, vy);
            for (let [nx, ny] of neighbors) {
                if (this.grid[nx][ny] !==0) {   // if neighbor has not been visited => Tree Edge
                    this.grid[nx][ny]=0;        
                    q.push( [nx, ny] );         
                }
            }
        }
    }
    dfs(sx, sy) {
        this.helper(sx, sy);                    // source vertex (x, y)
    }
    helper(vx, vy) {                            // for each vertex (x, y)
        this.grid[vx][vy]=0;
        let neighbors = this.getNeighbors(vx, vy);
        for (let [nr, nc] of neighbors) {
            if (this.grid[nr][nc] !== 0) this.helper(nr, nc);   // if neighbor has not been visited => Tree Edge
        }
    }
    outerloop() {
        let components=0;
        for (let vx=0; vx<this.grid.length; vx++) {
            for (let vy=0; vy< this.grid[0].length; vy++) {
                if (this.grid[vx][vy] !== 0) {
                    components++;
                    //this.bfs(vx, vy);
                    this.dfs(vx, vy);
                }
            }
        }
        return components;
    }
}
const noi = new NumberOfIslands([ 
    [1, 1,1,1,0], 
    [1,1,0,1,0], 
    [1,1,0,0,0], 
    [0,0,0,0,0]
]);
const noi2 = new NumberOfIslands([ 
    [1,1,0,0,0], 
    [1,1,0,0,0], 
    [0,0,1,0,0], 
    [0,0,0,1,1] 
]);
console.log('Number of Islands', noi.outerloop());
console.log('Number of Islands', noi2.outerloop());

// Leetcode #695 Medium - Maximum Area of Island
// Given a non-empty 2D array, grid, of '0's and '1's. An islan is a group of '1's connected 4-directionly.
// You may assume all four edges of grid are surrounded by water.
// Find the maximum area of an island in the given 2D array. If there is no island, the max area is 0.
// Ex: input: [
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
// [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
// [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
//]
// output: 6
// 
// Ex: input: [ [0, 0, 0, 0, 0, 0, 0, 0]], output: 0
//
// T(n) = O(n) for each vertex to find its neighbor in a grid, need to scan the whole row for a '1' edge => O(n*n)
// S(n) = O(n squared), does not depend on # of edges in the graph, space allocation is fixed for a grid
class MaxAreaIsland {
    constructor(grid) {
        this.grid=grid;
    }
    getNeighbors(vx, vy) {
        let neighbors=[];
        if ((vx+1) < this.grid.length) neighbors.push([vx+1, vy]);          // going counter clock wise - 4 directionally
        if ((vy+1) < this.grid[0].length) neighbors.push([vx, vy+1]);
        if ((vx-1) >=0) neighbors.push([vx-1, vy]);
        if ((vy-1) >=0) neighbors.push([vx, vy-1]);
        return neighbors;
    }
    bfs(sx, sy) {
        let q=[ [sx, sy]];
        this.grid[sx][sy]=0;
        let area=1;
        while (q.length >0) {
            let [vx, vy] = q.shift();
            let neighbors = this.getNeighbors(vx, vy);
            for (let [nx, ny] of neighbors) {
                if (this.grid[nx][ny] !== 0) {
                    this.grid[nx][ny]=0;
                    area++;
                    q.push([nx, ny]);
                }
            }
        }
        return area;
    }
    dfs(sx, sy) {
        return this.helper(sx, sy);
    }
    helper(vx, vy) {
        this.grid[vx][vy]=0;            // mark as visited
        let area=1;
        let neighbors = this.getNeighbors(vx, vy);
        for (let [nx, ny] of neighbors) {
            if (this.grid[nx][ny] !== 0) {
                area += this.helper(nx, ny);
            }
        }
        return area;
    }
    outerloop() {
        let components=0;
        let area=0, max=0;
        for (let vx=0; vx < this.grid.length; vx++) {
            for (let vy=0; vy < this.grid[0].length; vy++) {
                if (this.grid[vx][vy] !== 0) {
                    components++;
                    area = this.dfs(vx, vy);
                    max = Math.max(max, area);
                }
            }
        }
        return max;
    }
}
const mai = new MaxAreaIsland([ 
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
]);
// const mai = new MaxAreaIsland([ [0, 0, 0, 0, 0, 0, 0, 0]]);
console.log('Maximmum Area of an Island', mai.outerloop());

// Leetcode #733 Easy - Flood Fill
// An image is represented by a 2D array of integers, each integer representing the pixel value of an image (from 0 to 65535)
// Given a coordinate (sr, sc) representing the start pixel (row and column) of the flood fill, and the pixel value, newColor,
// "flood fill" the image - consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of
// the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color of 
// the starting pixel), and so on. Replace the color of all of the aformentioned pixels with the newColor.
// Return the modified image.
// Ex: input image: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr=1, sc=1, newColor=2, output: [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
//
// T(n) = O(n) for each vertex to find its neighbor in a grid, need to scan the whole row for a '1' edge => O(n*n)
// S(n) = O(n squared), does not depend on # of edges in the graph, space allocation is fixed for a grid
class FloodFill {
    constructor(grid, sx, sy, ncolor) {
        this.grid=grid;
        this.ncolor=ncolor;
        this.sx = sx;
        this.sy = sy;
    }
    getNeighbors(vx, vy) {
        let neighbors=[];
        if ((vx+1) < this.grid.length) neighbors.push([vx+1, vy]);
        if ((vy+1) < this.grid[0].length) neighbors.push([vx, vy+1]);
        if ((vx-1) >=0) neighbors.push([vx-1, vy]);
        if ((vy-1) >=0) neighbors.push([vx, vy-1]);
        return neighbors;
    }
    bfs() {
        let q= [[this.sx, this.sy]];
        let ocolor=this.grid[this.sx][this.sy];
        if (ocolor === this.ncolor) return;
        this.grid[this.sx][this.sy]=this.ncolor;
        while (q.length >0) {
            let [vx, vy] = q.shift();
            let neighbors = this.getNeighbors(vx, vy);
            for (let [nx, ny] of neighbors) {
                if (this.grid[nx][ny] === ocolor) {
                    this.grid[nx][ny] =this.ncolor;
                    q.push([nx, ny]);
                }
            } 
        }
    }
    dfs() {
        this.helper(this.sx, this.sy);
    }
    helper(vx, vy) {
        let ocolor = this.grid[vx][vy];
        if (ocolor===this.ncolor) return;
        this.grid[vx][vy] = this.ncolor;
        let neighbors = this.getNeighbors(vx, vy);
        for (let [nx, ny] of neighbors) {
            if (this.grid[nx][ny] === ocolor) {
                this.grid[nx][ny]= this.ncolor;
                this.helper(nx, ny);
            }
        }
    }
    outerloop() {
        //let components=0;
        for (let vx=0; vx< this.grid.length; vx++) {
            for (let vy=0; vy < this.grid[0].length; vy++) {
                if (vx === this.sx && vy=== this.sy) {
                    this.dfs(vx, vy);
                    break;
                }
            }
        }
        return this.grid;
    }

}
const ff = new FloodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2);
console.log('Flood Fill', ff.outerloop());

// Leetcode #207 Medium - Course Schedule I
// There are a total of n courses you have to take, labeled from 0 to n-1.
// Some courses may have pre-requisites, for example, to take course 0, you have to take course 1,
// which is expressed as a pair: [0,1]. Given a total number of courses, and a list of pre-requisites
// pairs, is it possible for you to finish all the courses?
// Ex: input 2, [[1, 0]], output: true, there are a total of 2 courses to take & finish course 0 before 1.
// Ex: input 2, [[1,0], [0,1]], output: false.
//
// HINT: Detect a Cycle in an Directed Graph => Only Back Edges create a Cycle.
//
class CourseScheduleI {
    constructor(n, edges) {
        this.n=n;
        this.edges = edges;
        this.adjList = Array(n).fill().map(()=>[]);
        this.visited=Array(n).fill(-1);
        this.arrivals=Array(n).fill(-1);
        this.departures=Array(n).fill(-1);
        this.timestamp=0;
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[dest].push(src);
        }
    }
    dfs(source) {
        return this.helper(source);
    }
    helper(vertex) {
        this.visited[vertex]=1;
        this.arrivals[vertex]=this.timestamp++;
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited[neighbor]===-1) {
                this.visited[neighbor]=1;
                if (this.helper(neighbor)) return true;
            } else {
                if (this.departures[neighbor]===-1) return true;    //Back Edge: departure time not set => a Cycle
            }
        }
        this.departures[vertex]=this.timestamp++;
        return false;
    }
    outerloop() {
        this.buildGraph();

        for (let vertex=0; vertex< this.visited.length; vertex++) {
            if (this.visited[vertex]===-1) {
                if (this.dfs(vertex)) return false;                 // Connot Graduate => Cycle found in components
            }
        }   
        return true;     
    }                                                              // Can graduate => Cycle not found
}
const cs = new CourseScheduleI(2, [[1,0], [0,1]]);
console.log('Can you graudate?', cs.outerloop());

// Leetcode #210 Medium - Course Schedule II
// There are a total of n courses you have to take, labeled from 0 to n-1.
// Some courses may have pre-requisites, for example, to take course 0, you have to take course 1,
// which is expressed as a pair: [0,1]. Given a total number of courses, and a list of pre-requisites
// pairs, return the ordering of the courses you should take to finish all courses. If it is impossible 
// to finish all courses, return a empty array.
// Ex: input: 2, [[1, 0]], oupput: [0,1]
// Ex: input: 4, [[1, 0], [2, 0], [3, 1], [3, 2]], output: [0, 1, 2, 3] or [0, 2, 1, 3]
//
// T(n) = O(m+n)
class CourseSchedue_TopologicalSort {
    constructor(n, edges) {
        this.n=n;
        this.edges = edges;
        this.adjList = Array(n).fill().map(()=>[]);
        this.visited = Array(n).fill(-1);
        this.arrivals=Array(n).fill(-1);
        this.departures=Array(n).fill(-1);
        this.timestamp=0;
        this.topsort=[];                            // topsort accumulates vertices in increasing order of departure time
    }
    buildGraph() {
        for (let [src, dest] of edges) {
            this.adjList[dest].push(src);
        }
    }
    dfs(source) {
        return this.helper(source);
    }
    helper(vertex) {
        this.visited[vertex]=1;
        this.arrivals[vertex] = this.timestamp++;
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited(neighbor)===-1) {
                this.visited(neighbor)=1;
                if (this.helper(neighbor)) return true;
            } else {
                if (this.departures[neighbor]===-1) return true;
            }
        }
        this.departures[vertex]= this.timestamp++;
        this.topsort.push(vertex);

        return false;
    }
    outerloop() {
        for (let vertex=0; vertex<this.visited.length; vertex++) {
            if (this.visited[vertex]===-1) {
                if (this.dfs(vertex)) return [];
            }
        }
        return this.topsort;                        // return topsort.reverse() if needed       
    }
}
const csII = new CourseSchedue_TopologicalSort(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
console.log('Course Schedule Topological Sort', csII.outerloop());

// Kahn Algorithmm for Topological Sort (Course Schedule II)
// 1) Build the Graph 2) Find in-degree of each node 
// 3) Identify which node has zero in-degree & put them in a bag 4) process the bag
// 
// T(n) = O(m+n)
class Kahn {
    constructor(n, edges) {
        this.n=n;
        this.edges=edges;
        this.adjList=Array(n).fill().map(()=>[]);
        this.indegree=Array(n).fill(0);
        this.topsort=[];
        this.bag=[];
    }
    buildGraph() {                                                  // O(m+n)
        for (let [src, dest] of this.edges) {
            this.adjList[dest].push(src);
            if (this.indegree[src]===0) this.indegree[src]=1;
            else this.indegree[src]++;                              // O(m+n)
        }
    }
    zeroInDegreeBag() {                                             // O(n)
        for (let vertex=0; vertex<this.indegree.length; vertex++) { 
            if (this.indegree[vertex]===0) this.bag.push(vertex);
        }
    }
    process() {                 
        this.buildGraph();
        this.zeroInDegreeBag();

        while (this.bag.length >0) {
            let vertex = this.bag.shift();                          // O(n)
            this.topsort.push(vertex);
            for (let neighbor of this.adjList[vertex]) {            // sum of O(degree of V) = O(m)
                this.indegree[neighbor]--;
                if (this.indegree[neighbor]===0) this.bag.push(neighbor);
            }
        }
        if (this.topsort.length < this.n) return [];                // Cycle Found
        return this.topsort;
    }
}
const kahn = new Kahn(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
console.log('Kahn Topological Sort', kahn.process());

// Google problem - Flight Itinerary Problem
// Given a bunch of airlines tickets with [from, to], for example, [ [MUC, LHR], [CDG, MUC], [SFO, SJC], [LHR, SFO] ]
// please reconstruct the itinerary in order. For example: [CDG, MUC, LHR, SFO, SJC]
// tickets can be represented as nodes
class FlighItinerary {
    constructor(edges) {
        this.n=edges.length;
        this.edges=edges;
        this.adjList={};
        this.visited={};
        this.arrivals=Array(this.n).fill(-1);
        this.departures=Array(this.n).fill(-1);
        this.timestamp=0;
        this.topsort=[];
    }
    // Ex: {'MUC': ['LHR'], 'CDG': ['MUC'], 'SFO': ['SJC'], 'LHR': ['SFO']}
    buildGraph() {
        for (let [from, to] of this.edges) {
            if (this.adjList[from]) {
                this.adjList[from].push(to);
            } else this.adjList[from] = [ to ];
            this.visited[from]=-1;
            this.visited[to]=-1;
        }
    }
    dfs(source) {   
        return this.helper(source);          
    }
    helper(vertex) {
        this.visited[vertex]=1;
        this.arrivals=this.timestamp++;
        let neighbors = this.adjList[vertex];
        if (neighbors) {
            for (let neighbor of neighbors) {
                if (this.visited[neighbor]===-1) {
                    this.visited[neighbor]=1;
                    if (this.helper(neighbor)) return true;
                } else {
                    if (this.departures[neighbor]===-1) return true;   // Back Edge Found => Cycle Found 
                }
            }
        }
        this.departures=this.timestamp++;
        this.topsort.push(vertex);
        return false;
    }
    outerloop() {
        this.buildGraph();

        for (let vertex in this.visited) {
            if (this.visited[vertex]===-1) {
                if (this.dfs(vertex)) return [];
            }
        }
        return this.topsort.reverse();
    }
}
const ait = new FlighItinerary([ ['MUC', 'LHR'], ['CDG', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO'] ]);
console.log('Flight Itinerary', ait.outerloop());

// Leetcode #1192 Hard - Critial Connections in a Network
// There are n servers numbered from 0 to n-1 connected by undirected server-to-servers connections
// forming a network where connections[i] = [a, b], representing a connection between a and b.
// Any server can reach any other server directly or indirectly through the network.
// A Critical Connection is a connection that, if removed, will make some servers unable to reach 
// some other servers. Return all Critical Connections in the network in any order.
// Ex: input: n=4, connections=[[0, 1], [1, 2], [2,0], [1, 3]], output: [[1, 3]] or [[3, 1]]
//
class CriticalConnections {
    constructor(n, edges) {
        this.n=n;
        this.edges = edges;
        this.adjList=Array(n).fill().map(()=>[]);
        this.visited=Array(n).fill(-1);
        this.arrivals=Array(n).fill(-1);
        this.highestreach=Array(n).fill(-1);
        this.departures=Array(n).fill(-1);
        this.parents=Array(n).fill(-1);
        this.timestamp=0;

        this.result=[];
    }
    buildGraph() {
        for (let [src, dest] of this.edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
    dfs(source) {
        return this.helper(source);
    }
    helper(vertex) {
        this.arrivals[vertex]=this.timestamp++;
        this.highestreach[vertex]=this.arrivals[vertex];            // Smallest Arrival Time => Highest Reach of Back Edges
        this.visited[vertex]=1;
        for (let neighbor of this.adjList[vertex]) {
            if (this.visited[neighbor]===-1) {
                this.parents[neighbor]=vertex;
                this.highestreach[vertex]=Math.min(this.highestreach[vertex], this.helper(neighbor));
            } else {
                if (neighbor !== this.parents[vertex]) {            // Back Edges Found
                    this.highestreach[vertex] = Math.min(this.highestreach[vertex], this.arrivals[neighbor]);
                }
            }
        }
        if (this.highestreach[vertex]===this.arrivals[vertex] && vertex !==0) {    // vertex !===0 is not Root
            this.result.push([vertex, this.parents[vertex]]);       // Edge between myself & my parent is Critical
        }
        this.departures[vertex]=this.timestamp++;
        return this.highestreach[vertex];
    }
    outerloop() {
        this.buildGraph();

        this.dfs(0);                // it is a Connected Graph => no need for multiple DFS calls
        return this.result.length > 0 ? this.result : [[-1, -1]];
    }
}
const crit = new CriticalConnections(4, [[0, 1], [1, 2], [2,0], [1, 3]]);
console.log('Critical Connections', crit.outerloop());

//
// Knight's Tour On A Chessboard - IK Problem Set I
// Given a chessboard with rows and cols columns and a knight that moves like in normal chess - 
// located at the start_row-th row and start_col-th column. The knight needs to reach the position at the 
// end_row-th row and end_col-th column. Find minimum number of moves that knight needs to make to get 
// from starting position to ending position. 
// Ex: input below, 3 moves to reach from (0, 0) to (4, 1):(0, 0) → (1, 2) → (3, 3) → (4, 1).
// {
// "rows": 5,
// "cols": 5,
// "start_row": 0,
// "start_col": 0,
// "end_row": 4,
// "end_col": 1
// }
// Output:3
//
class KnightTourOnChessboard {
    constructor(data) {
        this.nrow=data.rows;
        this.ncol=data.cols;
        this.start_row = data.start_row;
        this.start_col= data.start_col;
        this.end_row = data.end_row;
        this.end_col = data.end_col;
        this.grid = Array(this.nrow).fill().map(()=>{
                return Array(this.ncol).fill().map(()=>{
                    return { visited:-1, distance:-1};
                });
            });
    }
    getNeighbors(x, y) {
        const neighbors=[];
        if ((x+1) < this.nrow && (y-2) >=0 ) neighbors.push([x+1, y-2]);      //start couter cloco-wise - horizontal L with leg to the left
        if ((x+1) < this.nrow && (y+2) < this.ncol ) neighbors.push([x+1, y+2]);  // horizontal L with leg to the right
        if ((y+1) < this.ncol && (x+2) < this.nrow) neighbors.push([x+2, y+1]);   // vertical L with leg to the bottom
        if ((y+1) < this.ncol && (x-2) >=0) neighbors.push([x-2, y+1]);           // vertical L with leg to the top
        if ((x-1) >=0 && (y+2) < this.ncol) neighbors.push([x-1, y+2]);           // horizontal L with leg to the right
        if ((x-1) >=0 && (y-2) >=0) neighbors.push([x-1, y-2]);                   // horizontal L with leg to the left
        if ((y-1) >=0 && (x-2) >=0) neighbors.push([x-2, y-1]);                   // vertical L with leg to the top
        if ((y-1) >=0 && (x+2) < this.nrow) neighbors.push([x+2, y-1]);           // vertical L with leg to the bottom
        return neighbors;
    }
    bfs(sx, sy) {
        this.grid[sx][sy] = {visited: 1, distance:0};
        let q=[ [sx, sy] ];
        while (q.length >0) {
            let [vx, vy] = q.shift();
            let neighbors = this.getNeighbors(vx, vy);
            for (let [nx, ny] of neighbors) {
                if (this.grid[nx][ny].visited===-1) {
                    this.grid[nx][ny].visited=1;
                    this.grid[nx][ny].distance=this.grid[vx][vy].distance+1;    // Every move maps to a single edge distance
                    q.push([nx, ny]);
                } 
            }
        }
    }
    outerloop() {
        this.bfs(this.start_row, this.start_col);                              // # of Moves from start cell to end cell
        return this.grid[this.end_row][this.end_col].distance;                  
    }
    
}
const kcb = new KnightTourOnChessboard({
    "rows": 5,
    "cols": 5,
    "start_row": 0,
    "start_col": 0,
    "end_row": 4,
    "end_col": 1
    });
console.log('Knight Tour on Chessboard', kcb.outerloop());

// Snake & Ladder Problem - similar to Leetcode #909 Medium but not exactly
// On a NxN board, the numbers from 1 to NxN are written boutstrophedonically starting from 
// bottom left of the board and alternating direction eeach row.  
// Find the minimum # of throws required to win the game. A dice throw ranges from 1 to 6 steps.
//
// With IK Mr. Omkar's version of this problem, the board is given as a hashmap.
// Ex: board[4] = 14 where when the player landed on a 4, it will take it up to 14 in a Ladder.
// Ex: board[64] = 60 where when the player landed on a 64, it will take it down to 60 in a Snake.
// Ex: board[37] = 37 where when the player landed on a 37, there is no extra steps to take.
//
// HINTS: 1) Directed Graph (unweighted) 2) Need to use BFS 3) Model the graph such that every Dice Throw maps to a Single Edge
//
class SnakeLadderBoard {
    overall(board, n) {
        this.size=n+1;                                                      // for 100x100, size=101
        this.board = board;
        this.adjList=Array(this.size).fill().map();
        this.visited=Array(this.size).fill(-1);
        this.distance=Array(this.size).fill(-1);
    }
    buildGraph() {
        for (let i=0; i<=this.size; i++) {
            for (let dice=1; dice<=6; dice++) {                             // add up 6 edges
                if (i+dice <=100) this.adjList.push(this.board[i+dice]);    // add 1 edge (i + (i+dice))
            }
        }
    }
    bfs(source) {
        let q=[ source ];
        this.visited[source] =1;
        while (q.length >0) {
            let vertex = q.shift();
            for (let neighbor of this.adjList[vertex]) {
                if (this.visited[neighbor]===-1) {
                    this.visited[neighbor]=1;
                    this.distance[neighbor] = this.distance[vertex] +1;
                    q.push(neighbor);
                }
            }
        }
    }
    outerloop() {
        this.bfs(0);
        return this.distance[100];
    }
}

