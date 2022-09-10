class Graph_AdjacencyList {
    constructor(size) {
        this.adjList = Array(size).fill().map(()=>[]);
        this.size = size;

        this.visited =Array(this.size).fill(0);
        this.captured = Array(this.size).fill(0);
        this.parent = Array(this.size).fill(0);
    }
    addEdge(start, end, bidir=false) {
        this.adjList[start].push(end);
        if (bidir) this.adjList[end].push(start);
    }
    hasEulerianCycle() {
        let odd =0;                             // # of vertices with odd degrees
        for (let i=0; i< this.adjList.length; i++) {
            if (this.adjList[i].length % 2 === 1) odd++;
        }
        if (odd===0) return true;               // no vertices with odd degree = Eulerian Cycle
        else return false;
    }
    hasEulerianPath() {
        let odd =0;                             // # of vertices with odd degrees
        for (let i=0; i< this.adjList.length; i++){
            if (this.adjList[i].length % 2 ===1) odd++;
        }
        if (odd===0 || odd===2) return true;    // exactly 2 vertices with odd degree = Eulerian Path
        else return false;
    }
    // search(source) {
    //     // captured & parent initiallize to 0 and null
    //     let parent =null;
    //     this.captured[source] =1; 
    //     while (this.captured.length >0) {
    //         [u, v] = this.captured[next];
    //         this.captured[v] =1;
    //         parent[v] =u;
    //     }
    // }

    // T(n) = O(m+n) where m = sum of (degrees of each vertex), n=# of vertex
    bfs(source) {
        if (source === null) return [];

        this.captured[source] =1, this.visited[source] =1;

        let q = [source];
        while (q.length > 0) {
            let vertex = q.shift();
            this.captured[vertex] =1;
            for (let i=0; i < this.adjList[vertex].length; i++) {
                let neighbor = this.adjList[vertex][i];
                if (this.visited[neighbor]===0) {
                    this.visited[neighbor] =1;
                    this.parent[neighbor] = vertex;
                    q.push(neighbor);
                }
            }
        }
        return this.captured;
    }
    // T(n) = O(m+n) where m = sum of (degrees of each vertex), n=# of vertex
    dfs(source) {
        this.helper(source);
        return this.visited;
    }
    helper(vertex) {
        this.visited[vertex]=1;
        for (let i=0; i< this.adjList[vertex].length; i++) {
            let neighbor=this.adjList[vertex][i];
            if (this.visited[neighbor] ===0) {
                this.parent[neighbor] = vertex;
                this.helper(neighbor);
            }
        }
    }
    dfs_disconnect_components(source, components) {
        this.helper_disconnect_components(source, components);
        return thiis.visited;
    }
    helper_disconnect_components(vertex, components) {
        this.visited[vertex] = components;
        for (let i=0; i< this.adjList[vertex].length; i++) {
            let neighbor=this.adjList[vertex][i];
            if (this.visited[neighbor]===0) {
                this.parent[neighbor]=vertex;
                this.helper_disconnect_components(neighbor, components);
            }
        }
    }
    dfs_findComponents() {
        let components=0;
        for (let i=1; i< this.size; i++) {
            if (this.visited===0) {
                components++;
                this.dfs_disconnect_components(i, components);
            }
        }
        return components;
    }
    bfs_disconnect_components(source, components) {
        this.captured[source]=1, this.visited[source]=components;
        let q=[ source ];
        while (q.length > 0) {
            let vertex = q.shift();
            this.captured[vertex] = 1;
            for (let i=0; i< this.adjList[vertex]; i++) {
                let neighbor=this.adjList[vertex][i];
                if (this.visited[neighbor]===0) {
                    this.visited[neighbor] = components;
                    this.parent[neighbor]=vertex;
                    q.push(neighbor);
                }
            }
        }
    }
    bfs_findComponents() {
        let component=0;
        for (let i=0; i< this.size; i++) {
            if (this.visited[i]===0) {
                component++;
                this.bfs_disconnect_components(i, component)
            }
        }
        return component;
    }
}

const g = new Graph_AdjacencyList(15);
g.addEdge(0, 1); g.addEdge(0, 6); g.addEdge(0, 8); g.addEdge(0, 10); g.addEdge(1, 4); g.addEdge(1, 7); g.addEdge(2, 5);
console.log('Has Eulerian Cycle', g.hasEulerianCycle());
console.log('Has Eulerian Path', g.hasEulerianPath());
// console.log('BFS', g.bfs(0));
console.log('DFS', g.dfs(0));


