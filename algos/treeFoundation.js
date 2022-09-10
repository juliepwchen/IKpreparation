/*******************************************************************
 * 12 Tree Fundamentals
 * *****************************************************************/
class Node {
    constructor(key) {
        this.key=key;
        this.left=null;
        this.right=null;
    }
}
class BSTree {
    // T(n) = O(log n)
    search(root, key) {
        let current = root;
        while (current !== null) {
            if (key === current.key) return current;
            else if (key < current.key) current = current.left;
            else current = current.right;
         }
         return null;
    }
    // T(n) = O(height) = O(log n) <= if the tree is balanced
    // NOTE: Insert as a leaf node
    insert(root, key) {
        if (!key) return root;

        let newnode = new Node(key);
        if (!root) return newnode;                      // root node becomes 1st node

        let current = root, parent = null;              // maintain 2 pointers
        while (current !== null) {
            if (key===current.key) return root;            //found the same key                            
            else if (key < current.key) {
                parent = current;                       // save parent before traverse
                current = current.left;  
            }                                           // traverse left subtree
            else {
                parent = current;
                current = current.right;                // traverse right subtree
            }
        }
        if (key < parent.key) parent.left = newnode;    //current is @ leaf node, === null, need parent to make the links
        else if (key > parent.key) parent.right = newnode;

        return root;
    }
    // T(n) = O(log n)
    delete (root, key) {
        let current = root, parent=null;
       
        while (current !== null) {
            if (key === current.key) break;    // Search First & find the key
            else if (key > current.key) {
                parent = current;
                current = current.right;
            }
            else {
                parent = current;
                current = current.left;
            }
        }
        
        if (!current) return root;            // root = null or current @ leaf node but key not found
        // if (!parent) return null;          // key found but current (root) is a one-node tree & has no parent => delete node & return null
        
        // Key Found
        // Case 1: key node is a leaf
        if (!current.left && !current.right)  {   
            if (!parent) return null; 
            if (current === parent.left) parent.left=null;      // delete current node by reassign parent to point to null children
            else parent.right=null;   
            
            return root;                                        
        }     
        // Case 2: key node has 1 child
        let child=null;
        if (!current.left && current.right) child = current.right; 
        if (current.left && !current.right) child = current.left;
        if (child) {
            if (!parent) { 
                root = child;                                   // current's child becomes root as a new one node tree
                return root;
            }
            if (current === parent.left) parent.left = child;   // delete current node by linking parent to either child directly
            else parent.right = child;

            return root;
        }
        // Case 3: key node has both children
        let successor=null;
        
        if (current.left && current.right) {
            successor = current.right;                          // current node Right Subtree = successor (as root) Subtree
            parent = current;                                   // current becomes successor's parent if successor is current.right
            while (successor.left != null) {                    
                parent = successor;                             // successor node = find mininum (leftmost node) of the Right Subtree
                successor = successor.left;                     // maintain 2 pointers
            }
            current.key = successor.key;                        // delete current node by overwrite value with successor value
            if (successor === parent.left) parent.left = successor.right;  // successor node has no Left Child
            else parent.right = successor.right;                // delete current node by linking parent to successor's Right Child
            
            return root;
        }
    }
    findMin(root) {
        if (!root) return null;
        let current = root;                                     // use a temporay pointer to traverse the tree
        while (current.left) current = current.left;            // leftmost child is the minimum
        return current.key;
    }
    findMax(root) {
        if (!root) return null;
        let current = root;
        while (current.right) current = current.right;         // rightmost child is the maximum
        return current.key;
    }
    // T(n) = O(height) = O(log n)
    // Find next largest key of node.key
    successor(root, node) {                                    
        if (root === null) return null;
        
        // Case 1: node has a Right Subtree => find minimum using node.right as root
        if (node.right) {                                       
            let current = node.right;                           
            while (current.left) current = current.left;
            return current;
        }
        // Case #2: node has NO Right Subtree
        let ancestor = null, current = root;                    
        while (current !== node) {                              // Search for node starting from root => Find deepest such event
            if (node.key < current.key) {                       
                ancestor = current;                             // node before current node's last Left befor remaining Rights => shape like '<'s
                current = current.left;
            } else current = current.right; 
        }
        return ancestor;                                    
    }
    // Find previous smallest key of node.key
    predecessor(root, node) {                                   
        if (!root) return null;

        // Case 1: node has a Left Subtree => find maximum using node.left as root
        if (node.left) {
            let current = node.left;
            while (current.right) current = current.right;      
            return current;
        }
        // Case #2: node has NO Left Subtree
        let ancestor = null, current = root;
        while (current !== node) {                             // Search for node starting from root => Find deepest such event
            if (node.key > current.key) {                      
                ancestor=current;                              // node before current node's last Right before remaining Lefts => shape like '>'s
                current = current.right;
            } else current = current.left;
        }
        return ancestor;                                        
    }
    // T(n) = O(n) = n nodes * constant time for push/pop 
    // S(n) = O(n) = n size array = all leaf nodes for BST (50% leaf nodes) or n-arry tree (root + all children)
    levelOrderTraversal(root) {
        let result=[];
        if (!root) return;
        let q=[ root ];
        while (q.length > 0) {
            let node = q.shift();                               // FIFO
            // console.log('level-order traversal', node.key);
            result.push(node.key);
            if (node.left) q.push(node.left);          // for n children: for (let child of children) q.push(child);
            if (node.right) q.push(node.right);    
        }
        return result;
    }
    // T(n) = O(n) <= # of nodes in hierarchy, each doing constant work
    // max callstaxk = height of tree O(log n) if tree is balanced
    dfs_BST(root) {
        if (root===null) return;
        // console.log('BST Pre Order Traversal = ', root.key);
        this.dfs_BST(root.left);
        console.log('BST In Order Traversal = ', root.key);
        this.dfs_BST(root.right);
        // console.log('BST Post Order Traversal = ', root.key);
    }
}

// Print total sizes of all files starting from root directory
class TotalFileSpaces {
    overall(root) {
        console.log('Total File Space= ', this.helper(root));
    }
    helper(node) {
        if (!node) return 0;

        let diskusage = node.key;
        diskusage += this.helper(node.left);
        diskusage += this.helper(node.right);
        // for (let child of children) {
        //     diskusage=diskusage+this.helper(child);
        // }
        return diskusage;
    }
}

// Mock Interview - "Given a list of strings, print the whole file structure. 
// if there are multiple files or directories in a directory, 
// then order them based on the order in the input.

// Input files =
// [
//   "/app/components/header",
//   "/app/services",
//   "/app/tests/components/header",
//   "/images/image.png",
//   "/tsconfig.json",
//   "/index.html",
// ]

// Output:
// -- app
//   -- components
//     -- header
//   -- services
//   -- tests
//     -- components
//        -- header
// -- images
//   -- image.png
// -- tsconfig.json
// -- index.html
class FileStructure {
    constructor() {
        this.map = {};
        this.globalbag=[];
    }
    // O(n)
    overall(files) {
        let paths = this.permuteTreePaths(files);   
        for (let path of paths) {                   
            this.helper(path, 1, 0);                
        }
        return this.globalbag;
    }
    helper(arr, i, level, indent=[]) {
        if (i===arr.length) {
            return;
        }
        if (level === this.map[arr[i]]) {
            indent.push(' ');
            this.helper(arr, i+1, level+1, indent);
            indent.pop;
        } else {
            console.log(indent.join(''), '--', arr[i]);
            this.map[arr[i]]=level;
            indent.push(' ');
            this.helper(arr, i+1, level+1, indent);
            indent.pop();
        }
    }
    // O(n)
    permuteTreePaths(files) {
        let result=[];
        for (let i=0; i< files.length; i++) {
            let levelnodes = files[i].split('/');
            result.push(levelnodes);
        }
        return result;   // result = [ ['app', 'component', 'header'], ['app', 'servicess']...]
    }
}
// const fs = new FileStructure();
// console.log('File Structure', fs.overall([
//     "/app/components/header",
//     "/app/services",
//     "/app/tests/components/header",
//     "/images/image.png",
//     "/tsconfig.json",
//     "/index.html",
//   ]));

class TreeNode {
    constructor(key) {
        this.key=key;
        this.children=[];
    }
}
// Print Table of Content
// Indent as needed
class TOC {
    overall(root) {
        this.helper(root, 0);
    }
    // Pre-order traversal
    helper(node, level, indent='') {
        if (!node) return;
        console.log(indent, '--', node.key);
        for (let child of node.children) {
            this.helper(child, level+1, indent+' ');
        }
        // this.helper(node.left, level+1, indent+' ');
        // this.helper(node.right, level+1, indent+' ');
    }
}

// Leetcode #429 Easy
class N_Array_Tree {
    // Live Class
    // T(n) = O(n), S(n) = O(n)
    level_order_traversal(root) {
        if (!root) return null;
        let result=[];
        let q=[ root ];
        while (q.length > 0) {
            let levelsize = q.length, levelnodes=[];
            for (let i=1; i<= levelsize; i++) {
                let node = q.shift();
                levelnodes.push(node.key);
                for (let child of node.children) {
                    if (child) q.push(child);
                }
            }
            result.push(levelnodes);
        }
        return result;
    }

    // T(n) = O(n), S(n) = callstack O(height)
    dfs_N_Array_Tree(root) {
        if (!root) return;
        console.log('N-Array Tree Pre Order Traversal = ', root.key);
        for (let child of root.children) {
            this.dfs_N_Array_Tree(child);
        }
        console.log('N-Array Post Order Traversal = ', root.key);
    }
}

/*************************************************************************
 * uncomment this section for local unit testing - node treeFoundation.js
 ************************************************************************/
// const tree = new BSTree();
// let root = tree.insert(null, 44); 
// root = tree.insert(root, 88); root = tree.insert(root, 17); root = tree.insert(root,8); root=tree.insert(root,32); 
// root=tree.insert(root,28); root=tree.insert(root,29); root = tree.insert(root,65); root=tree.insert(root,97); 
// root=tree.insert(root,54); root=tree.insert(root,82); root=tree.insert(root,93); root=tree.insert(root,76); root = tree.insert(root,68); root=tree.insert(root,80); 
// console.log('search=', tree.search(root, 82).key);
// console.log('findMin=', tree.findMin(root));
// console.log('findMax=', tree.findMax(root));
// console.log('find successor= ', tree.successor(root, tree.search(root, 65)));
// console.log('find predesscor= ', tree.predecessor(root, tree.search(root, 82)));
// console.log('All nodes in Level Order Traversal', tree.levelOrderTraversal(root));
// root = tree.delete(root, 44);
// console.log('after deleteion...');
// console.log('All nodes in Level Order Traversal', tree.levelOrderTraversal(root));
// tree.dfs_BST(root);

// const tfs = new TotalFileSpaces();
// tfs.overall(root);

// let rootNarray = new TreeNode(5);
// rootNarray.children.push(new TreeNode(6)); rootNarray.children.push(new TreeNode(12)); rootNarray.children.push(new TreeNode(20)); 
// const toc=new TOC();
// toc.overall(rootNarray);

// const narrayTree = new N_Array_Tree();
// console.log('N array tree level ordere traversal ', narrayTree.level_order_traversal(rootNarray));

module.exports = { Node, BSTree }