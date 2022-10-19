// Diksha Gohlyan - Voxel (ex-Google), https://medium.com/@diksha.gohlyan/cracking-the-coding-interview-72b693749419
//
// You are given an array of people, which are the attributes of some people in a queue (not necessarily in order). 
// Each people[i] = [hi, ki] represents the ith person of height hi with exactly ki other people in front who have
// a height greater than or equal to hi. Reconstruct and return the queue that is represented by the input array people. 
// The returned queue should be formatted as an array queue, 
// where queue[j] = [hj, kj] is the attributes of the jth person in the queue (queue[0] is the person at the front of the queue).
//
// Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
// Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
//
// Suggested Thought Process: 
// 1. Sort (Height descending, ascending position) 7,0 7,1 6,1 5,0 5,2 4,4
// 2. Insert
// Ex: [5,0]
// [7,0][5,2][6,1][4,4][7,1]

/*
function orderHeight(people) {
    // Sort 
    people.sort(sort_comparator(a, b));
    // Insert
    let result=[];
    for (let i=0; i<people.length; i++){  
        position = people[i][1]
        for(j=result.length;j>=position;j--) {
            result[j+1] = result[j]
        }
        result[j] = people[i]
    }
        
        [
        if (result[people[i][1]] !== undefined) {
            
        }
        
        }
    
}
        
function insert() {

        for (let i=; i< people.length; i++) {
            let j=i-1
            while (
        }
        
        }



sort_comparator(a,b){
  if(a[0]==b[0]) {
      return a[1]-b[1];
  } else {
      return b[0]-a[0];
  }
}
*/
// loop people 0... people.length
// => people[i] = [7,0] => hmap[people[i][0]]
// hmap[order] => hmap[0]=[5, 7] => 5 < 7 => [5, 7]
// hmap[1] = [6, 7] => [7, 6] => 
// hmap[2] = [5] => 
 

// hmap[0]=[7, 5] => hmap[4]=[4] => hmap[1]=[7, 6]=>hmap[2]=[5]
// for key in entries 
//   let arr = hmap[key]

