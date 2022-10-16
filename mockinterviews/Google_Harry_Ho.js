// Harry Ho - Google
//
// PART I
// Given a list of floats and a distance (float)
// we want to find and output any three values in our list that are witin distance apart.
// if found, we remove the values in the list, each value can only be used once.
// input:  [1.2, 2.3, 15.0, 3.0, 11.0], distance=10.0, output: 1.2, 2.3, 3.0 => [11.0, 15.0]
//
function findWithinDistance(arr, distance, k) {
    // Presort: T(n)=O(n log n) using Quicksort
    arr.sort((a, b)=>a-b);
    if (arr.length < k) return arr;  

    for (let i=0; i< arr.length-k; i++) {
        if (arr[ i+ k-1 ] - arr[i] <= distance) arr.splice(i, k);
    }
    return arr;
} 
console.log('Find Within Distance', findWithinDistance([1.2, 2.3, 15.0, 3.0, 11.0], 10.0, 3)); 

// PART II 
// Modify the function to handle data streams.
// Store the data if there are no 3 values within d distance, else return and remove those 3 values in the list.
class MovingNums {
    constructor(k, distance) {
        this.k=k;
        this.q=[];
        this.distance=distance;
    }
    next(num) {
         this.q.push(num);                                  // insert: O(1)
         if (this.q.length < this.size) return this.q;

         this.q.sort((a,b)=>a-b);                           // T(n)=O(n log n) 
         this.findWithinDistance();                         // T(n)=O(n), not counting Time Complexity for splice()

         return this.q
    }
    // Sliding Window Pattern
    findWithinDistance() {
        if (this.q.length < this.k) return this.q;  

        for (let i=0; i<this.q.length-this.k; i++) {
            if (this.q[i+this.k-1]-this.q[i] <= this.distance) this.q.splice(i, this.k);
        }
    }
}
const m = new MovingNums(3, 10.0);
console.log('Moving Numbers from Data Stream', m.next(1.2));
console.log('Moving Numbers from Data Stream', m.next(2.3));
console.log('Moving Numbers from Data Stream', m.next(15.0));
console.log('Moving Numbers from Data Stream', m.next(3.0));
console.log('Moving Numbers from Data Stream', m.next(11.0));
console.log('Moving Numbers from Data Stream', m.next(1.0));
console.log('Moving Numbers from Data Stream', m.next(5.0));
console.log('Moving Numbers from Data Stream', m.next(105.0));
console.log('Moving Numbers from Data Stream', m.next(200.0));
console.log('Moving Numbers from Data Stream', m.next(300.0));
console.log('Moving Numbers from Data Stream', m.next(106.0));
console.log('Moving Numbers from Data Stream', m.next(207.0));
console.log('Moving Numbers from Data Stream', m.next(210.0));

// Interviewer suggested thought process - Brute Force or Sliding Window
//
// i.       i+2. <= d
// l <= m <= r
// 1.2, 2.3, 3.0, 11.0, 15.0]
//        ^         ^
// 
// for l in list:
//    for m in list:
//        for r in list:
//           check l, m, r is within distance
//

