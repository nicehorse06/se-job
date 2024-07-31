# blind75筆記


## dynamic program
* 要建立DP表
* 要有狀態轉移方程

### [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
* 費波納切數列

### [322. Coin Change](https://leetcode.com/problems/coin-change/)
* 一維的DP表去存i為某個amount時的硬幣可能數，要處理dp[0] = 1
* 狀態轉移方程: `dp[i] = min(dp[i], dp[i - coin] + 1)`
  * dp[ i - coin ] + 1 這個代表小的表+1枚硬幣

### [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)
* 一維的DP表去存位置i的最長Subsequence
* 用兩個for，外面的for 是定位 dp[i] 時候的可能，裡面的for是計算 dp[i]  最長的Subsequence
  * 因為無法用dp[i-x]直接求得dp[i]，所以要用裡面的for重算
* 狀態轉移方程: dp[i] = max(dp[i], dp[j] + 1)
   * Subsequence的現象是只要 nums[i] > nums[j] 就至少多出現一組小到大的數列，所以直接+1

### [139. Word Break](https://leetcode.com/problems/word-break/)
* 一維的dp表去存長度為i時的s是否可Word Break，要處理dp[0] = True
* 用兩個for計算
* 狀態轉移方程: 此處表s[:j] 和 s[j:i]都在 wordDict_set，當然dp[i]就是True，進入下個i直接break
``` python
if dp[j] and s[j:i] in wordDict_set:
    dp[i] = True
    break
```

### [377. Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/)
* 可重複拿錢版本的零錢問題 322. Coin Change
* 一維的dp表去存，i為某個target的可能組合數，要處理dp[0] = 1
* 狀態轉移方程:
``` python
# 類似jump game，把上一步的所有可能加到dp[i]
if i - num >= 0:
    # 將 dp[i - num] 的值加到 dp[i] 上
    dp[i] += dp[i - num]
```

### [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)


### 198. House Robber
* 一維的DP表去存第i個房子搶劫的最大值
* 狀態轉移方程: ` dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
  * 不搶劫當前房屋，則最大金額為 dp[i-1]
  * 搶劫當前房屋，則最大金額為 dp[i-2] + nums[i]。

### [213. House Robber II](https://leetcode.com/problems/house-robber-ii/description/)

### [91. Decode Ways](https://leetcode.com/problems/decode-ways/description/)

### [62. Unique Paths](https://leetcode.com/problems/unique-paths/description/)

### [55. Jump Game](https://leetcode.com/problems/jump-game/description/)
* TODO
  * 貪心策略
  * DP
