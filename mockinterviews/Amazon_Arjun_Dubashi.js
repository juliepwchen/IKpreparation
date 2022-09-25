/***************************************************************************************************/
/*  Arjun Dubashi (Amazon)
    Given an array of strings strs, group the anagrams together. You can return the answer in any order.
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
    typically using all the original letters exactly once.

    input strs = ["eat","tea","tan","ate","nat","bat"]
    Output: [["bat"],["nat","tan"],["ate","eat","tea"]] 
/***************************************************************************************************/
class Anagrams {
    constructor() {
        this.hmap = {};
    }
    // hmap = { sorted_key: array_of_words_matching_all_letters }
    buckets(words) {
        for (let i=0; i< words.length; i++) {
            let sorted_key = [...words[i].split('').sort()];
            if (this.hmap[sorted_key] !== undefined) this.hmap[sorted_key].push(words[i]);
            else this.hmap[sorted_key] = [words[i]];
        }
        return Object.values(this.hmap);
    }
}
const anagrams = new Anagrams();
console.log('Anagrams buckets', anagrams.buckets(["star", "rats", "car", "arc", "arts", "stars"]) );
const anagrams2 = new Anagrams();
console.log('Anagrams buckets', anagrams2.buckets(["eat","tea","tan","ate","nat","bat"]) );

/* Interviewer Suggested Solution:

    for(string str : strs){
    characterMap = getCharacterMap(str)
    map.includes(characterMap){
       map.put(characterMap, map.get(characterMap).add(str));
    } else{
      map.put(characterMap, List.of(str));
    }
    }
    ["eat","tea","tan","ate","nat","bat"]
    Map< Map<e:1,a:1,t:1>, List.of("eat", "tea","ate"));
*/