import { Node, BSTree } from './treeFoundation.js';

/***************************************************************************************************/
/* Leetcode Easy: 5 problems => Medium: 13 problems => Hard: 1 problem
/***************************************************************************************************/

// T(n) = O(n) = total # of nodes * constant O(1) each
// S(n) = O(n) worse case when all leaf nodes are in the queue
// Brute Force - Iterative
class BFS {
    // Leetcode #102 Medium - Binary Tree Level Order Traversal 
    // Given a Binary Tree, return the level order traversal of it's nodes values 
    // (i.e. from left to right, level by level)
    level_order_traversal(root) {
        if (!root) return [];
        const q=[ root ], result =[];
        while (q.length >0) {
            let levelsize = q.length, levelnodes =[];         // save # of nodes at a level before addidng more children
            for (let i=1; i<= levelsize; i++) {
                let node = q.shift();
                levelnodes.push(node.key);
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            result.push(levelnodes)
        }
        return result;
    }
    // Leetcode #107 Easy - Binary Tree Level Order Traversal II 
    // Given a Binary Tree, return the bottom-up level order traversal of its node's values.
    // i.e. from left to right, level by level from leaf to root
    bottomup_level_order_traversal(root) {
        if (!root) return [];
        const q=[root], result=[];
        while (q.length >0) {
            let levelsize = q.length, levelnodes=[];
            for (let i=1; i<= levelsize; i++) {
                let node = q.shift();
                levelnodes.push(node.key);
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            result.push(levelnodes);  
        }
        return result.reverse();
    }
    // Leetcode #103 Medium - Binary Tree ZigZag Level Order Traversal 
    // Given a Binary Tree, return the zigzag level order traversal of its nodes values.
    // i.e. from left to right, then right to left for the next level, and alternate in between.
    zigzag_level_order_traversal(root) {
        if (!root) return [];
        const q =[root], result=[];
        let zigzag=true;
        while (q.length >0) {
            let levelsize = q.length, levelnodes=[];
            for (let i=1; i<=levelsize; i++) {
                let node = q.shift();
                levelnodes.push(node.key);
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            if (!zigzag) levelnodes.reverse();
            zigzag = !zigzag;
            result.push(levelnodes)
        }
        return result;
    }
    // Leetcode #199 Medium - Binary Tree Right Side View 
    // Given a Binary Tree, imagine yourself standing on the right side of it, 
    // return the values of nodes you can see ordered from top to bottom.
    rightSideView_level_order_traversal(root) {
        if (!root) return [];
        const q=[ root ], result=[];
        while (q.length > 0) {
            let levelsize = q.length, rmost=0;
            for (let i=1; i<=levelsize; i++) {                  // loop thru each node @ current level
                let node = q.shift();                           
                rmost = node.key;                               // keep overwirte with next node @ current level => last node
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            result.push(rmost);                                 // push desired output from each level
        }
        return result;
    }
}

const tree = new BSTree();
let root = tree.insert(null, 44); 
root = tree.insert(root, 88); root = tree.insert(root, 17); root = tree.insert(root,8); root=tree.insert(root,32); 
root=tree.insert(root,28); root=tree.insert(root,29); root = tree.insert(root,65); root=tree.insert(root,97); 
root=tree.insert(root,54); root=tree.insert(root,82); root=tree.insert(root,93); root=tree.insert(root,76); root = tree.insert(root,68); root=tree.insert(root,80); 

const bfs = new BFS();
console.log('Level Order Traversal', bfs.level_order_traversal(root));
console.log('Bottom Up BFS', bfs.bottomup_level_order_traversal(root));
console.log('ZigZag', bfs.zigzag_level_order_traversal(root));
console.log('Right Sid View', bfs.rightSideView_level_order_traversal(root));

// Leetcode #112 Easy - Path Sum I
// Given a Binary Tree and a sum, determine if the tree has a root-to-leaf path 
// such that adding up all the values along the path equals the given sum.
// 
// T(n) = O(n), n nodes, traverse whole tree, S(n)=O(height)=O(log n) if balanced => O(n) worse case for callstack
class isPathSum_TopDownDFS {
    constructor() {
        this.globalbag=false;
    }
    // checking if root is null in overall function
    // can be confusing to check in recursive function 'cause internal node vs leaf node can have null children
    overall(root, target) {
        if (!root) return false;     
        this.helper(root, target);  
        return this.globalbag;
    }
    helper(node, target) {
        if (!node.left && !node.right) {
            if (target === node.key) this.globalbag=true;
            return;
        }
        if (node.left) this.helper(node.left, target-node.key);
        if (node.right) this.helper(node.right, target-node.key);
    }
}
const psdfs = new isPathSum_TopDownDFS();
console.log('is there a Path Sum from root to leaf?', psdfs.overall(root, 322));

// Leecode #113 Medium - Path Sum II 
// Given a binary tree and a sum, find all the leaf-to-root path's sum equals to the given sum.
// Ex: output: [ [5, 4, 11, 2], [5, 8, 4, 5] ], given sum = 22
//
// T(n) = O(n log n) <= n/2 nodes * log n slate size from root to leaf (copying)
// S(n) = O(n log n) 
class enumeratePathSum_TopDownDFS {
    constructor() {
        this.globalbag=[];
    }
    overall(root, sum) {
        if (!root) return [[-1]];
        this.helper(root, sum, []);
        return (!this.globalbag.length) ? [[-1]] : this.globalbag;
    }
    helper(node, target, path) {
        if (!node.left && !node.right) {
            if (target === node.key) {                                   // leaf node process its own value before deposit
                path.push(node.key);
                this.globalbag.push([...path]);
                path.pop();
            }
            return;
        }
        path.push(node.key);
        if (node.left) this.helper(node.left, target-node.key, path);     // info flowing downward, nothing being returnedd
        if (node.right) this.helper(node.right, target-node.key, path);
        path.pop();
    }
}
const psIIdfs = new enumeratePathSum_TopDownDFS();
console.log('Path Sum II: enumerate all root-to-leaf paths sum up to target= ', psIIdfs.overall(root, 322));

// Uplevel Homework - Print all paths of a tree
// Given a Binary Tree, return all paths from root to leaf
class PermuteAllPaths {
    constructor() {
        this.globalbag=[];
    }
    overall(root) {
        if (!root) return [];
        this.helper(root, []);
        return this.globalbag;
    }
    helper(node, path) {
        if (!node.left && !node.right) {
            path.push(node.key);
            this.globalbag.push([...path]);
            path.pop();
            return;
        }
        path.push(node.key);
        if (node.left) this.helper(node.left, path);
        if (node.right) this.helper(node.right, path);
        path.pop();
    }
}
const pap = new PermuteAllPaths();
console.log('Permute all Paths in a BT', pap.overall(root));

// Leetcode #543 Easy - Diameter of Binary Tree 
// Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary
// tree is the length of of the longest path between any two nodes in a tree. This path may or may not pass 
// through the root. (Find inverted V-paths)
// NOTE: the length of path between two nodes is represented by number of edges between them.
class TreeDiameter_BottomUpDFS {
    constructor() {
        this.globalsolution=0;
    }
    overall(root) {
        if (!root) return 0;
        this.helper(root);
        return this.globalsolution;
    }
    helper(node) {
        if (!node.left && !node.right) {
            return 0;                           // leaf node does not count => count edges = longest path
        }
        let LH=0, RH=0, mydia=0;
        if (node.left) {                    
            LH = this.helper(node.left);      
            mydia += LH+1;
        }
        if (node.right) {
            RH = this.helper(node.right);
            mydia += RH+1;                      // local solution = both sides of V path
        } 
        this.globalsolution = Math.max(this.globalsolution, mydia);
        
        let myHeight = Math.max(LH, RH) +1;     // height is only 1 side of V path
        return myHeight;
    }
}
const dot = new TreeDiameter_BottomUpDFS();
console.log('Diameter of Tree= ', dot.overall(root));

// Leetcode #250 Medium - Count Unival Subtree 
// Given a Binary Tree, count the values of uni-value subtrees
// A uni-val subtree means all nodes of the subtree have the same value.
class UniValTree_BottomUpDFS {
    constructor() {
        this.globalsolution=0;
    }
    overall(root) {
        if (!root) return 0;
        this.helper(root);
        return this.globalsolution;
    }
    helper(node) {
        if (!node.left && !node.right) {
            this.globalsolution +=1;
            return true;
        }
        let amIunival=false;
        if (node.left) {
            amIunival = this.helper(node.left);
            if (amIunival && node.key===node.left.key) amIunival=true;
        }
        if (node.right) {
            amIunival &= this.helper(node.right);
            if (amIunival && node.key===node.right.key) amIunival=true;    // both legs have to be unival && equal keys
        }

        if (amIunival) this.globalsolution+=1;

        return amIunival;
    }
}
const univalroot = new Node(5); univalroot.right = new Node(5); univalroot.left = new Node(1); univalroot.left.left = new Node(5); univalroot.left.right = new Node(5);
univalroot.right.right = new Node(5);
const uvt = new UniValTree_BottomUpDFS();
console.log('Uni-val tree= ', uvt.overall(univalroot));
console.log('Uni-val tree= ', bfs.level_order_traversal(univalroot));

// Leetcode #108 Easy - Convert Sorted Array to Binary Search Tree 
// Given an array where elements are sorted in ascending order, converted it to a height balanced BST.
// A height balanced binary tree (AVL Tree) is defined as a binary tree in which the depth of the two subtrees of 
// every node never differ by more than 1. 
class SortedArray_to_BST {
    overall(nums) {
        return this.helper(nums, 0, nums.length-1);
    }
    helper(A, start, end) {
        if (start>end) return null;
        if (start === end) return new Node(A[start]);

        let mid = Math.floor(start + (end-start)/2);
        let root = new Node(A[mid]);
        root.left = this.helper(A, start, mid-1);
        root.right = this.helper(A, mid+1, end);

        return root;
    }
}
const satbst = new SortedArray_to_BST();
let bstroot = satbst.overall([-10, -3, 0, 5, 9]);
console.log('Sorted Array to BST = ', bfs.level_order_traversal(bstroot));

// Leetcode #109 Medium - Converted Sorted List to Binary Search Tree (Tree Series #5)
// Given a Singly Linked List where elements are sorted in ascending order,
// convert it to a height-balanced BST. 
// EX: input [-10, -3, 0, 5, 9]
//
// T(n) = 2 T(n/2) + O(1) = O(n log n)
class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};
class SortedList_to_BST {
    overall(head) {
        return this.helper(head);
    }
    helper(head) {
        // base
        if (!head) return null;
        else if (!head.next) return new Node(head.value);

        //recursive
        let fast = head, slow=head, previous=null;
        while (fast.next && fast.next.next) {
            fast = fast.next.next;
            previous=slow;
            slow = slow.next;
        }
        let root = new Node(slow.value);            // root (slow.value) is at the middle
        if (previous) {
            previous.next = null;
            root.left = this.helper(head);
        }
        root.right = this.helper(slow.next);

        return root;
    }
}

// Leetcode #105 Medium - Construct Binary Tree from Preorder and Inorder Traversal
// Ex: preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7]
//
// T(n) = O(n) - n nodes doing O(1) constant work each task
// S(n) = Explicit: O(n) for hashmap + O(n) for tree itself, Implicity: O(n) callstack worst case for unbalanced tree
class PreAndInOrder_to_BT {
    constructor() {
        this.map = {};
    }
    overall(preorder, inorder) {
        // construct hashmap to help find rootindex 
        for (let i=0; i< inorder.length; i++) this.map[inorder[i]] = i;

        return this.helper(preorder, 0, preorder.length-1, inorder, 0, inorder.length-1);
    }
    helper(P, startP, endP, I, startI, endI) {
        if (startP > endP) return null;
        if (startP === endP) return new Node(P[startP]);

        let root = new Node(P[startP]);
        let rootIndex = this.map[P[startP]];        //O(1) to find rootIndex
        let numleft = rootIndex - startI;
        
        root.left = this.helper(P, startP+1, startP+numleft, I, startI, rootIndex-1);
        root.right = this.helper(P, startP+numleft+1, endP, I, rootIndex+1, endI);
        
        return root;
    }
}
const pibt = new PreAndInOrder_to_BT();                            
let rootbt = pibt.overall([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);            // This is a BT, not BST
console.log('Construct BT from Pre and In order traversal arrays = ', bfs.level_order_traversal(rootbt));

// Leetcode #106 Medium - Construct Binary Tree from Inorder and Postorder Traversal
// Given Inorder and Postorder traversal of a tree, construct Binary Tree.
//
// NOTE: assume no duplicates exists
// Ex: input: inorder [9, 3, 15, 20, 7], postorder [9, 15, 7, 20, 3]
//
class InAndPostorder_to_BT {
    constructor() {
        this.map =[];
    }
    overall(inorder, postorder) {
        for (let i=0; i< inorder.length; i++) this.map[inorder[i]] =i;
        return this.helper(postorder, 0, postorder.length-1, inorder, 0, inorder.legnth-1);

    }
    helper(P, startP, endP, I, startI, endI) {
        if (startP > endP) return null;
        if (startP === endP) return new Node(P[endP]);

        let root = new Node(P[endP]);
        let rootIndex = this.map[P[endP]];
        let numleft = rootIndex-startI;
        // startP ... endP (x) => startP -> startP + numleft-1 => startP+numleft -> endP-1
        // startI......endI => startI...rootIndex...endI
        root.left = this.helper(P, startP, startP+numleft-1, I, startI, rootIndex-1);
        root.right = this.helper(P, startP+numleft, endP-1, I, rootIndex+1, endI);

        return root;
    }
}
const ipbt = new InAndPostorder_to_BT();
let iprootbt = ipbt.overall([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);      // This is a BT, not BST
console.log('Construct BT from In and Post order traversal arrays = ', bfs.level_order_traversal(iprootbt));

// Leetcode #1008 Medium - Construct Binary Search Tree from Preorder Traversal
// Return the root node of a BST that matches the given Preorder traversal.
// 
// T(n) = O(n log n) => can be improved to be O(n) using Left-to-Right Tree Construction 
class Preorder_to_BST {
    constructor(preorder) {
        this.map=[];
        this.preorder=[...preorder];
        this.inorder=preorder.sort((a, b)=>a-b);        // sort first to create pre-order
    }
    overall() {
        let iLen=this.inorder.length;
        for (let i=0; i< iLen; i++) this.map[this.inorder[i]] =i;
        
        return this.helper(this.preorder, 0, this.preorder.length-1, this.inorder, 0, this.inorder.length-1);
    }
    helper(P, startP, endP, I, startI, endI) {
        if (startP > endP) return null;
        if (startP === endP) return new Node(P[startP]);

        let root = new Node(P[startP]);
        let rootindex = this.map[P[startP]];
        // X startP endP => X startP+1 -> startP+numleft -> startP+numleft+1 -> endP
        // startI...endI => startI...rootindex...endI
        let numleft = rootindex - startI;
        root.left = this.helper(P, startP+1, startP+numleft, I, startI, rootindex-1);
        root.right = this.helper(P, startP+numleft+1, endP, I, rootindex+1, endI);

        return root;
    }
}
const pbst= new Preorder_to_BST([8, 5, 1, 7, 10, 12]);
let prebstroot = pbst.overall();
console.log('Construct BST from Preorder traversal array = ', bfs.level_order_traversal(prebstroot));

// Leetcode #426 Medium - Convert Binary Search Tree to Sorted Doubly Linked List (Tree Series #4)
// Convert a BST to a sorted Circular Doubly-Linked List in place
// Note: Left & Right pointers are synonymous to the predecessor and successor pointers in a doubly-linked list.
// For a circular doubloy-linked list, the predecessor of the first element is the last element,  
// and the successor of the last element is the first element. 
//
// After transformation, the left pointer of the tree node should point to its predecessor, 
// and the right pointer should point to its successor.
// Return the pointer to the smallest element of the Linked List.
//
class BST_to_SortedDoublyLinkedList {
    constructor() {
        // Popular usage: Sentinel node (dummy node) as Head of list => no need to deal with Head being null or 0
        // start with non-empty list.
        this.Sentinel = new Node('stub');
    }
    overall(root) {
        if (root===null) return null;
    
        let tail = this.helper(root, this.Sentinel);
        let head = this.Sentinel.right;
        head.left = tail;
        tail.right = head;

        return head;
    }
    helper(node, pred) {
        // node.right => successor, node.left => predecessor
        // circular linked list pred points to node & node points to pred
        if (node.left===null && node.right===null) {
            pred.right = node;                                              // local compute
            node.left = pred;                       
            pred = node;
            return pred;                                                    // return to parent
        }
        // similar to Inorder Traversal boundary walk
        if (node.left !== null) pred = this.helper(node.left, pred);        // child returns
        pred.right = node;                                                  // local compute
        node.left = pred;
        pred = node;
        if (node.right !== null) pred = this.helper(node.right, pred);      // pass down to child
                                                    
        return pred;                                                        // return to parent
    }
}
const bstTodll = new BST_to_SortedDoublyLinkedList();
//let head =  bstTodll.overall(root);                               // root for BST is circular after this function.
//console.log('BST_to_SortedDoublyLinkedList', head.right.key);

// Leetcode #230 Medium - Kth Smallest Element in a BST (Tree Series #4, 1:43:29)
// Given a Binary Search Tree, write a function kthSmallest to find the kth smallest element in it.
// NOTE: k is always valid
class KthSmallest_in_BST {
    constructor() {
        this.globalbag=0;
    }
    overall(root, k) {
        this.helper(root, 0, k);
        return this.globalbag;
    }
    // calculate # of predecessors = # of smaller numbers before node
    // if (# of predecessors + 1 node itself === k), then node has kth smallest value.
    helper(node, numpred, k) {                                                      
        //backtracking
        if (numpred >=k) return numpred;
        //base
        if (!node.left && !node.right) {                              
            numpred +=1;                                                            // local compute
            if (numpred===k) this.globalbag = node.key;                             // add to globalbg
            return numpred;                                                         // return to parent
         }
         //recursive - similar to Inorder Traversal boundary walk
         if (node.left) numpred += this.helper(node.left, numpred, k);               // child returns
         numpred +=1;                                                               // local compute 
         if (numpred ===k) this.globalbag=node.key;                                 // add to globalbag
         if (node.right) numpred += this.helper(node.right, numpred, k);             // pass down to child
    
         return numpred;                                                            // return to paraent
    }

}
const ksto = new KthSmallest_in_BST();
console.log('Find kth smallest element in BST =', ksto.overall(root, 3));    // root4 & root5 are BT, not BST

// Leetcode #145 Hard - Binary Post Order Traversal - Iterative solution
// Given a Binary Tree, return Post Order traversal of its nodes' values
class BT_Traversal {
    constructor() {
        this.globalbag=[];
    }
    // Recursive solution
    postorder_recursive(root) {
        if (!root) return [];
        this.helper(root, []);
        return this.globalbag;
    }
    helper(node) {
        if (!node.left && !node.right) {
            this.globalbag.push(node.key);
            return;
        }
        if (node.left) this.helper(node.left);
        if (node.right) this.helper(node.right);
        this.globalbag.push(node.key);
    }
    // Iterative solution
    postorder_iterative(root) {
        if (!root) return [];
        let stack = [ [root, 'none'] ], result=[];
        while (stack.length > 0) { 
            let timestamp=stack[stack.length-1][1];
            let node = stack[stack.length-1][0];                      
            switch(timestamp) {                        // just peeking
                case 'none': stack[stack.length-1][1] = 'arrival';
                    // Arrival Zone
                    if (node.left) stack.push([ node.left, 'none' ]);
                break;
                case 'arrival': stack[stack.length-1][1] = 'interim';
                    // Interim Zone
                    if (node.right) stack.push([ node.right, 'none' ]);
                break;
                case 'interim': stack[stack.length-1][1] = 'departure';
                    // Departure Zone
                    result.push(node.key);       // the only statement that switch among pre, in, post order
                break;
                default: stack.pop();
                break;
            }
        }
        return result;
    }
}
const potbt = new BT_Traversal();
console.log('Post Order Traversal Recursively=', potbt.postorder_recursive(rootbt));
console.log('Post Order Traversal Iteratively=', potbt.postorder_iterative(rootbt));

// Leetcode #98 Medium - Validate Binary Search Tree - (Tree Series #3, 4:18:01) 
// Given a binary tree, determine if it is a valid binary search tree.
// Ex: input [2, 1, 3]
// output true
class IsValidBST_BottomUpDFS {
    constructor() {
        this.globalbag=true;
    }
    overall(root) {
        if (!root) return true;
        this.helper(root);
        return this.globalbag;
    }
    helper(node) {
        let amIBST=true, smallest=node.key, largest=node.key; 
        if (!node.left && !node.right) {}
        // local: I am a BST if my left subtree is a BST && my right subtree is a BST
        // local: all values from Left subtree needs to be smaller than my value & all values from Right subtree larger
        // calculate local solution: my node needs to be larger than largest value from Left & smaller than smallest value from Right
        if (node.left) {
            let [s, l, b] = this.helper(node.left);
            smallest = Math.min(smallest, s);
            largest = Math.max(largest, l);
            if (!b || l >= node.key ) amIBST = false;
        } 
        if (node.right) {
            let [s, l, b] = this.helper(node.right);
            smallest = Math.min(smallest, s);
            largest = Math.max(largest, l);
            if (!b || node.key >= s) amIBST &= false;
        }
        if (!amIBST) this.globalbag = false;
        return [smallest, largest, amIBST];
    }
}
const isbst = new IsValidBST_BottomUpDFS();
console.log('Is this a BST?', isbst.overall(root));

// Leetcode #617 Easy - Merge 2 Binary Trees (Tree Series #3) 
// Given 2 Binary Trees such that when you put one of them to cover the other, some nodes 
// of the two trees are overlapping while the others are not.
// The merge rule is that if 2 nodes overlap, then sum nodes values up as the new value of the 
// the merged node. Otherwise, the NOT null node will be used as the node of new tree.
class MergeTwoBT_TopDownDFS {
    overall(root1, root2) {
        if (!root1) return root2;
        if (!root2) return root1;

        this.helper(root1, root2);
        return root1;
     }  
     helper(node1, node2) {                                         // both nodes are non-null
        node1.key += node2.key;                                     // 1st node is the base, 2nd node merge with 1st node

        if (node1.left) {
            if (node2.left) this.helper(node1.left, node2.left);    // nothing to do if node2.left === null
        } else node1.left = node2.left;                             // if node1.left === null, link node2.left to the new tree
        if (node1.right) {
            if (node2.right) this.helper(node1.right, node2.right);
        } else node1.right = node2.right;
     }
}
console.log('Merging 1st BT ', bfs.level_order_traversal(root));
console.log('Merging 2nd BT ', bfs.level_order_traversal(rootbt));
const merge2BT = new MergeTwoBT_TopDownDFS();
let mergeroot = merge2BT.overall(root, rootbt);
console.log('Merged 2 BTs into 1 BT ', bfs.level_order_traversal(mergeroot));