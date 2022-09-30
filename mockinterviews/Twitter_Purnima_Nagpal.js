// Twitter Mock Interview - Purnima Nagpal 
//
// PART I: 
// Binary Tree Right Side View 
// Given a Binary Tree, imagine yourself standing on the right side of it, 
// return the values of nodes you can see ordered from top to bottom.
//
// Input:
//                _10_
//             _/      \_          
//             5        15
//             / \       / \
//            3   8     12  20
//           / \             \
//          2   4             30
//   Output: 20
//   Input:
//                  10
//                 /  
//                 5
//                / \
//              3   7
//  
//  Output: 7

const { timeStamp } = require("console");

//
class TreeNode {    
    constructor(key, left, right){         
        this.key = key;        
        this.left = left ? left :null;
        this.right = right ? right : null;
     }  
}
let root = new TreeNode(10); root.left=new TreeNode(5); root.right = new TreeNode(15);
root.right.right = new TreeNode(20); root.right.left = new TreeNode(12); 
root.left.left = new TreeNode(3); root.left.right = new TreeNode(8);
root.left.left.left= new TreeNode(2); root.left.left.right= new TreeNode(4); root.right.right.right= new TreeNode(30);

class BFS {
    constructor() {}

    rightview(root) {
        if (!root) return [-1];
    
        let q=[root], result=[];
        while (q.length > 0) {
            let levelsize =q.length, rightmost=0;
            for (let i=0; i< levelsize; i++) {
                let node = q.shift();

                rightmost = node.key;

                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            result.push(rightmost);
        }
        return result;
    }
}
const bfsroot = new BFS();
console.log('Right Most view', bfsroot.rightview(root));

// PART II: Find the second largest node in a binary search tree
//
class DFS {
    constructor() {
        this.max=[0, 0];                    // max @ index 0, second max @ index 1
    }
    secondlargest(root) {
        if(!root) return 0;

        this.helper(root);
        return this.max[1];
    }
    helper(node) {
        if (!node.left && !node.right) {
            if (node.key > this.max[0]) {
                this.max[1] = this.max[0];
                this.max[0]=node.key;
            }
        }
        if (node.key > this.max[0]) {
            this.max[1] = this.max[0];
            this.max[0]=node.key;
        }
        if (node.left) this.helper(node.left);
        if (node.right) this.helper(node.right);
    }
}
const sln = new DFS();
console.log('Second Largest Node', sln.secondlargest(root));
