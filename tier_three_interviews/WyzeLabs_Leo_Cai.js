// Leetcode # 394 Medium: Decode String
//
// Given an encoded string, return its decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.
// Note that k is guaranteed to be a positive integer.
// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. 
// You may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.
// Ex: Input: s = "3[a]2[bc]", Output: "aaabcbc", Ex: Input: s = "3[a2[c]]", Output: "accaccacc" 
class DecodeString {
  constructor() {
    this.i=-1;
  }
  decode(s) {
    let sArr=s.split('');
    return this.bfs(sArr);
  }
  dfs(arr) {
    let k=0, decodedStr=[];
    while (++this.i < arr.length) {
      if (arr[this.i] <= 9 && arr[this.i] >=0){ k = arr[this.i];  }
      else if (arr[this.i]==='[') {                       // if char is '[', compose the node
        let node = this.helper(arr);                      // recurse until leaf node & returns str of most inner bracket
        while (--k >=0) decodedStr.push(node);            // compose decode str based on frequency
        k=0;                                              // reset frequency before next char
      } else if (arr[this.i] === ']') return decodedStr.join(""); // return decode string when char is ']'
      else decodedStr.push( arr[this.i]  );               // compose decode str when char is a alphabet
    }
    return decodedStr.join("");
  }
  bfs(s) {
    let stack=[]; 
    for (let i=0; i<s.length; i++) {
      if (s[i] !== ']') { stack.push(s[i]); }                                   // push everything except ']'
      else {
        let substr=[];
        while (stack[stack.length-1] !== "[") { substr.unshift(stack.pop()); }  // concat char inside of bracket
        stack.pop();                                                            // pop "["
        let k=0;                                                                // pop frequency (1+ digits)
        while (stack && stack[stack.length-1] >=0 && stack[stack.length-1] <=9) k += parseInt(stack.pop());
        for (let i=0; i<k; i++) stack.push(substr.join(""));                    // concat inner str with outer str
      }
    }
    return stack.join("");
  }
}        
const ds = new DecodeString();
console.log('Decode String', ds.decode("3[a]2[bc]"));
const ds2 = new DecodeString();
console.log('Decode String', ds2.decode( "3[a2[c]]")); 

// i=-1
// i=0, '3', frequency=3
// i=1, '[', helper
// i=2, 'a', decodedStr=[a]
// i=3, '2', frequency=2
// i=4, '[', helper
// i=5, 'c', decodedStr=[c]
// i=6, ']', decodeStr = c
// node = 'c', decodedStr = 'cc'
// 
  