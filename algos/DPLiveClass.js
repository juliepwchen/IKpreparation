// LeetCode #139 Medium - Word Break
// Givn a non-empty string s and a dictionary wordDict containing a list of non-empty words,
// determine if s can be segmented into a space-seperted sequence of one or more dictionary words.
// note: the solution set must not contain duplicate subsets.
// Ex: input s = "leetcode", wordDict=["leet", "code"], output: true
// Ex: input s = "applepenapple", wordDict=["apple", "pen"], output: true
// Ex: input s = "catsandog", wordDict=["cats", "dog", "sand", "and", "cat"], output: false

// Space Complexity S(2 to nth * n) = input O(n) + auxiliary O(n) + output (2 to nth * n)
// Time Complexity T(2 to nth) = leaf node O(2 to nth * n) + internal nodes O(2 to nth * 1)
