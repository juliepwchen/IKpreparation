/*
* T(n)= O(n) for n operations where each operation takes O(1)
* auxiliary space: O(min(capacity, n)) + input space: O(n) = total O(n)
*/
class DoublyLinkedListNode {
    constructor(k, v) {
        this.key = k;
        this.value = v;
        this.prev = null;
        this.next = null;
    }
}
class LRU_Cache {
    constructor(c=2) {
        this.capacity = c;
        this.head = null;                   // Linked list whose nodes store {key, value}
        this.tail = null;
        this.hmap = new Map();              // key -> pointer-to-ListNode (key to actual storage mapping)
    }
    // Add {key, value} to the front of the linked list.
    // Add to hmap { key : pointer to head where it is stored in linked list  }
    add_to_front(k=0, v=0) {
        let newnode = new DoublyLinkedListNode(k, v);
        if (!this.head) { this.head = newnode; this.tail = newnode; }
        else {
            newnode.next = this.head;
            this.head.prev = newnode;
            this.head = newnode;
        }
        this.hmap.set(k, this.head);          // update key with pointer to head of list
    }
    // Remove one {key, value} from the tail of the linked list
    // Remove the mapping (key -> pointer to where it is stored in the linked list)
    remove_least_recently_used() {
        let key = this.tail.key;
        this.hmap.delete(key);                // erase hmap[key] 
        if (this.head === this.tail) { delete this.tail; this.head = null; this.tail=null; }
        else {
            this.tail = this.tail.prev;
            delete this.tail.next;
            this.tail.next = null;
        }
    }
    // Remove given node from the linked list.
    erase_node(node) {
        if (!node) return;

        let prev_node = node.prev, next_node=node.next;  
        if (prev_node !== null) prev_node.next = next_node;     // connect previous node with next node
        if (next_node !== null) next_node.prev = prev_node;
        
        if (this.head === this.tail) { this.head=null; this.tail=null; }
        else if (this.head === node) this.head = next_node;
        else if (this.tail === node) this.tail = prev_node;

        this.hmap.delete(node.key);
        node=null;                                              //delete node;
    }
    // Once the node is accessed/read using get function, it becomes Most Recent Accessed/Used node & move it to front of list.
    get(key) {
        let value=0;
        if (!this.hmap.has(key)) return -1;       // key not found

        let node = this.hmap.get(key);
        if (node) value = node.value;
        this.erase_node(node);                    // remove from the original position
        this.add_to_front(key, value);            // add to the front of the list

        return value;
    }
    // Adds or updates the cached value for the given key.
    // Evicts the LRU cached value if necessary to avoid exceeding capacity of the cache.
    // Makes the newly added/updated cache entry the MRU one.
    set(key, value) {
        if (!this.hmap.has(key)) {         // key not found
            if (this.hmap.size === this.capacity) this.remove_least_recently_used();  // @ capacity, evict LRU element
        } else this.erase_node(this.hmap.get(key));     // key found => make it the MRU => remove first
            
        this.add_to_front(key, value);     // add to front of the list & hashmap
    }

}
const cache = new LRU_Cache();
cache.set(1, 11);
cache.set(3, 33);
cache.set(2, 22);
console.log('LRU Cache', cache.get(2));
console.log('LRU Cache', cache.get(1));
console.log('LRU Cache', cache.get(3));

// Potential LRU problem - Possible Amazon Interview Question
// 
// Leetcode #432 Hard - All O`one Data Structure
// Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.
//
// Implement the AllOne class:
//
// AllOne() Initializes the object of the data structure.
// inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
// dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
// getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
// getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
// Note that each function must run in O(1) average time complexity.
//
// Ex: input:  [
//    ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"],
//    [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
// output: [null, null, null, "hello", "hello", null, "hello", "leet"]
//
// explaination: 
// AllOne allOne = new AllOne();
// allOne.inc("hello");
// allOne.inc("hello");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "hello"
// allOne.inc("leet");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "leet"
 