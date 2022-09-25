const { Node, BSTree } = require('../algos/treeFoundation');
/***************************************************************************************************/
/* Krishna Kondaka (Meta)
/***************************************************************************************************/
/* PART I 
    Write a function that returns whether a list of strings is sorted given a specific alphabet.
    A list of N words and the K-sized alphabet are given.
    input:  words =    ["cat", "bat", "tab"], alphabet = ['c', 'b', 'a', 't'], output: True
    input:  words =    ["alice", "eve", "bob"], alphabet = ['a', 'b', 'c', ..., 'z'], output: False
    input:  words =    ["alice", "bob", "eve"], alphabet = ['a', 'b', 'c', ..., 'z'], output: True
    input:  words =    ["alice", "apple", "andy", "aaron"], alphabet = ['a', 'b', 'c', ..., 'z'], output: false
    Ex: hell, hello --> true, hello, hell  --> false
*/
class isSorted {
    constructor() {
        this.hmap={};
    }
    // Decrease & Conquer - assume N-1 elementts are sorted 'cause if not, my suboridniate would have returned false; 
    // I as a Lazy Manager need to check if by adding my element, is the overall array sorted?
    sorted(words, alphabet) {
        for (let i=0; i<alphabet.length; i++) this.hmap[alphabet[i]] = i;     // key: 'c', 'b', 'a' .., & value: 0, 1, 2, 3 ... n

        for (let i = 0; i < words.length-1; i++) {
            if (!this.ordered(words[i], words[i+1])) return false;
        }
        return true;
    }
    ordered(word1, word2) {
        for (let i = 0; i < Math.min(word1.length, word2.length); i++) {
            // need both conditions - word1 char order comes before or after word2 char
            if (this.hmap[word1[i]] > this.hmap[word2[i]]) return false;      // with only this condition: ["act", "bat"] would error
            if (this.hmap[word1[i]] <= this.hmap[word2[i]]) return true;      // with only this condition: ["baa", "abb"] would error
        }
        return word1.length < word2.length;
    }
}
const s = new isSorted();
console.log('isSorted', s.sorted( ["cat", "bat", "tab"], ['c', 'b', 'a', 't'] ));
console.log('isSorted same strings', s.sorted( ["cat", "cat", "cat"], ['c', 'b', 'a', 't'] ));
console.log('isSorted', s.sorted( ["alice", "eve", "bob"], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] ));
console.log('isSorted', s.sorted( ["alice", "bob", "eve"], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] ));
console.log('isSorted', s.sorted([ "alice", "andy", "apple", "aaron" ], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']))
                               
/* PART II
    Write methods to do binary tree serialization and de-serialization
    class Node:
      int val;
      Node left, right;
    Ex:
                    1
                 2        3
              4  null  null 5
*/  
class BT {
    constructor() {
        this.serial_array=[];
        this.inorderMap={};
    }
    // assume final data structure for above example: ["1", "2", "4", "#", "#", "#", "3", "#", "5", "#", "#"]
    // represent null with "#"
    serialization(root) {
        if (!root) return [];
        this.serial_helper(root);
        return this.serial_array;
    }
    //1. Using BFS -- this require queue (ot more lines of code)
    //2. Two traversal (DFS) - either pre-order/post-order => create 2 arrays & re-build the tree 
    //   (complicated coding) - 2N space complexity
    //3. One traversal (DFS) - pre-order (post-order would also work) => need to remember NULL children
    serial_helper(node) {
        if (!node.left && !node.right) {
            this.serial_array.push(node.key);
            //this.serial_array.push('#');
            return;
        }
        this.serial_array.push(node.key);
        if (node.left) this.serial_helper(node.left);
        if (node.right) this.serial_helper(node.right);
    }
    deserialization(preorder) {
        let preorderNew = [...preorder];
        let inorder = preorderNew.sort((a, b)=>a-b);
        for (let i=0; i<inorder.length; i++) this.inorderMap[inorder[i]] = i;
        return this.deserial_helper(preorderNew, 0, preorderNew.length-1, inorder, 0, inorder.length-1);
    }
    // Reminder: 
    // preorder array: x [startP+1 ... startP+numLeft] [startP+numLeft+1 ... endP] where x=startP
    // inorder array: [startI ... rootIndex -1] x [rootIndex+1 + endI] where x=rootIndex and 1st half size=numLeft, 2nd half size=numRight
    deserial_helper(P, startP, endP, I, startI, endI) {
        if (startP > endP) return null;
        if (startP === endP) return new Node(P[startP]);

        let root = new Node(P[startP]);
        let rootIndex = this.inorderMap[ P[startP] ];
        let numleft = rootIndex - startI;
        let numright = endI - rootIndex;
        root.left = this.deserial_helper(P, startP+1, startP+numleft, I, startI, rootIndex-1);
        root.right = this.deserial_helper(P, startP+numleft+1, endP, I, rootIndex+1, endI);
        
        return root;
    }
}

const tree = new BSTree();
let root = tree.insert(null, 1); 
root = tree.insert(root, 2); root = tree.insert(root, 3); root = tree.insert(root,4); root=tree.insert(root,5); 

const pbst= new BT();
console.log('BT Serialization', pbst.serialization(root));
let root2 = pbst.deserialization([1, 2, 4, 3, 5]) ;
//console.log('BT deserializaion root', root.key, 'root.left', root.left.key, 'root.right', root.right.key, 'root.left.left', root.left.left);

/* Interviewer Suggested Python code
def ser(root):
        if not root:
                return ["#"]
        ret = []
        ret.append(str(root.val))
        ret.extend(ser(root.left))
        ret.extend(ser(root.right))
        return ret

def deserialize_helper(l, i):
        if i >= len(l):
                return None, i
        if l[i] == "#":
                return None, i+1
        root = TreeNode(l[i])
        root.left, i = deserialize_helper(l, i+1)
        root.right, i = deserialize_helper(l, i)
        return root, i

def deserialize(l):
      r, idx = deserialize_helper(l, 0);
      return root
                    
new_tree = deserialize(serialize(old_tree))    */ 