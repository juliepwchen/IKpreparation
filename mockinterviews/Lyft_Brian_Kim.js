/***************************************************************************************************/
/* Brian Kim - Lyft
/***************************************************************************************************/
/*
    Custom sort string based on order. Given 2 string inputs:  str and order.
    Ex: input: "abcd", order: "fcba", output: "cbad" Ex: input: "aaaabbbzzzz", order: "cba", output: "bbbaaaazzzz"
*/
class CustomSort {
    constructor() {}
    customSort(str, order) {
        let result=[], hmap={};
        for (let i=0; i< str.length; i++) {
            if (hmap[str[i]]) hmap[str[i]]++;
            else hmap[str[i]] = 1;
        }
        for (let i=0; i<order.length; i++) {
            if (hmap[order[i]] >=0) {
                for (let num=1; num <= hmap[order[i]]; num++) {
                    result.push(order[i]);
                    hmap[order[i]]--;
                }
            } 
        }
        for (let key in hmap) {
            if (hmap[key] >0) {
                for (let num=1; num <= hmap[key]; num++) result.push(key);
            }
        }
        return result.join('');
    }
}
const cs = new CustomSort();
console.log('Custom Sort', cs.customSort("abcd", "fcba"));