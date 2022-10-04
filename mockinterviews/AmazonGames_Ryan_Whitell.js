// Ryan Whitell - Amazon Games
//
// Amazon has a catalog of internal training courses. Each course has a unique string name and a number of prerequisites.
// An example of a valid catalog might look like this:
//     *    "Databases", prerequisites: "Security" and "Logging"
//     *    "Security", prerequisites: "Logging"
//     *    "Logging", prerequisites: none
// Implement the catalog. Ensure it is always possible to take every course in some order.
// input: [
//         ['Databases', ['Security', 'Logging']],
//         ['Security', ['Loggin']],
//         ['Loggin', [] ]
//        ]
// output: [ 'Logging', 'Security', 'Databases' ] - topological sort
class AmazonCatelog {
    constructor(catelog) {
        this.catelog = catelog;
        this.adjList={};
        this.visited = {};
        this.arrivals = Array(catelog.length).fill().map(()=>[]);
        this.departures = Array(catelog.length).fill().map(()=>[]);
        this.timestamp=0;
        this.topsort=[];
    }
    buildGraph() {
        for (let [dest, prereq] of this.catelog) {
            this.visited[dest]=-1;
            if (!this.adjList[dest]) this.adjList[dest]=[];

            for (let src of prereq) {
                if (this.adjList[src]) this.adjList[src].push(dest);
                else this.adjList[src] = [dest];
            }
        }
    }
    dfs(src) {
       return this.helper(src);      
    }
    helper(vertex) {
        this.visited[vertex]=1;
        this.arrivals=this.timestamp++;
   
        for (let neighbor of this.adjList[vertex] ) {
            if (this.visited[neighbor]===-1) {
                if (this.helper(neighbor)) return true;
            } else {
                if (this.departures[neighbor]===-1) return true;
            }
        }
        this.departures[vertex]=this.timestamp++;
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
const ac = new AmazonCatelog([ ['Databases', ['Security', 'Logging']],['Security', ['Logging']], ['Logging', [] ] ]);
console.log('Amazon Catelog', ac.outerloop());

/* Interviewer Suggested Solution
   Kahn's Algorithm
*/
class AmazonCatelog_Kahn {
    constructor(catelog) {
        this.catelog=catelog;
        this.adjList={};
        this.indegree={};
        this.topsort=[];
        this.bag=[];
    }
    buildGraph() {
        for (let [dest, prereq] of this.catelog) {
            this.indegree[dest]=0;                                  // initialize in-degrees to zero for all dest
            if (!this.adjList[dest]) this.adjList[dest]=[];         // initialize all dest with empty array   

            for (let src of prereq) {
                if (this.adjList[src]) this.adjList[src].push(dest);
                else this.adjList[src] = [dest];

                this.indegree[dest]++;
            }
        }
    }
    zeroIndegreeBag() {
        for (let course in this.indegree) {
            if (this.indegree[course] === 0) this.bag.push(course);
        }
    }
    processBag() {
        this.buildGraph();
        this.zeroIndegreeBag();
   
        while (this.bag.length > 0) {
            let vertex = this.bag.shift();
            this.topsort.push(vertex);
          
            let neighbors = this.adjList[vertex];
            for (let neighbor of neighbors) {
                this.indegree[neighbor]--;
                if (this.indegree[neighbor]===0) this.bag.push(neighbor);
            }
        }
        if (this.topsort.length < this.catelog.length) return [];
        return this.topsort;
    }
}
const kahn = new AmazonCatelog_Kahn([ ['Databases', ['Security', 'Logging']],['Security', ['Logging']], ['Logging', [] ] ]);
console.log('Amazon Catelog', kahn.processBag());