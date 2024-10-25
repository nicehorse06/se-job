# blind75筆記

# Array

## [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/)
* 使用two pointer
  * left, right 表示x軸的位置，height[left], height[right]表示y軸的高
* 有x軸跟y軸的長高就知道容器的體積，算體積的高取 min(height[left], height[right])
  * 然後依據比較矮的高移動 pointer


## [15. 3Sum](https://leetcode.com/problems/3sum/description/)
* 排序後，使用two pointer
* 對nums做迴圈，每個i代表左邊界，由i+1代表左指標left，n-1代表右指標right
  * 三個指標的值相加sum為零就儲存結果
  * 大於零就right -= 1 讓sum接近零，繼續跑迴圈 
  * 小於零就left += 1 讓sum接近零，繼續跑迴圈 
* 剩下的細節就是排序後要跳過重複項增加效率

## [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/)
* 二分搜尋的變體
* 可以先寫出二分搜尋再修改
* 這題的訣竅是nums雖然旋轉，但左右側至少有一邊順序是對的，就只在順序對的那側寫判斷式
``` python
if nums[mid] == target:
    return mid
# 確定nums右側順序是對的
elif nums[mid] <= nums[right]:
    # 確定target在右半邊
    if nums[mid] < target <= nums[right]:
        left = mid + 1
    else:
        right = mid - 1
else:
    if nums[left] <= target < nums[mid]:
        right = mid - 1
    else:
        left = mid + 1
```

## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/description/)
* Kadane演算法: 
  * 維護max_current和max_global，for迴圈中 
    * max_current = max(max_current + nums[i], nums[i])
    * max_global = max(max_global, max_current) 最後回傳max_global

## [121.Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
* 一個for每次都紀錄最小值和現值減去最小值就得到獲利

## [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/description/)
* Kadane演算法: 
  * 因為是乘法，所以要維護最大值和最小值
  * 最小值乘了負號就會變最大值

## [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)
* 用二分搜尋法
* 藉由探查中間比右邊小的可能，去替換左右位置
* 使用 `if nums[mid] > nums[right]:` 去偵測旋轉點是關鍵，這樣就知道做小值在哪裡

``` python
# 如果 mid 的值大於 right 的值，說明最小值在 mid 右側
if nums[mid] > nums[right]:
    left = mid + 1
else:
    # 否則，最小值在 mid 左側或就是 mid
    right = mid
```

## [217.Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
* 用map或set去記錄每個值，for有重複到就回傳

## [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/description/)
* 題目限制不能用除法
* 建立left list，每個i存左邊所有數的乘積
* 建立right list，每個i存右邊所有數的乘積
* 再把left和right相乘的list就是答案，每個i為除了自己的所有數的乘積

# String

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)
* sliding window
  * 滑動區間為 `i - left + 1`
* 要定一個last_dict，存上一次字元出現的位置
* 每個for都是檢查跟更新last_dict，還有依據邏輯更新left狀態紀錄最大長度

``` python
for i in range(n):
    # last_dict[s[i]] >= left 表示left只會往右移動，不會往左
    if s[i] in last_dict and last_dict[s[i]] >= left:
        left = last_dict[s[i]] + 1

    last_dict[s[i]] = i
    max_len = max(max_len, i - left + 1)
```

## [424. Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/description/)
* sliding window
   * 滑動區間為 `i - left + 1`
``` python
for i in range(n):
    # count用來紀錄曾經的次數
    count[s[i]] = count.get(s[i], 0) + 1
    # max_count用來紀錄區間內出現最多的次數，不用是連續
    max_count = max(max_count, count[s[i]])

    # 只要 i - left + 1 - max_count <= k代表是有效滑動區間，可紀錄max_len，故要特別處理 > k的情形
    # 當前窗口的長度 - 窗口內出現最多次數的字符的次數 > k，說明需要移動左指針
    if i - left + 1 - max_count > k:
        count[s[left]] -= 1
        left += 1

    max_len = max(max_len, i - left + 1)
```

## [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
* 先建立一個list，模擬Stack
* 用for
  * 如果是 `({[` 就append 進去 stack
  * 如果是`]})`就 pop stack，看值有沒有跟符號做對應
* 最後檢查空Stack，才是 Valid Parentheses

## [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/description/)
* 用for跑每個str，每個都變成list再排序存在一個dict
  * dict的key是排序過後的str，value是原本的str
* 最後回傳dict的value即可

## [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/description/)
* 先建立一個dict
* for第一個string，把每個值出現的次數存進去dict
* 再for第二個string扣掉出現的次數
* 只要dict完美變成空的場景，才是合格Valid Anagram

## [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
* 中心擴展法
* 另外定義一個中心擴展函數 expand_around_center
* 要帶入偶數跟奇數的可能到 expand_around_center中
``` python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""
        max_len = 0
        start = 0

        for i in range(len(s)):
            len1 = self.expand_around_center(s, i, i)       # 奇数长度回文
            len2 = self.expand_around_center(s, i, i + 1)   # 偶数长度回文
            curr_len = max(len1, len2)

            if curr_len > max_len:
                max_len = curr_len
                start = i - (curr_len - 1) // 2             # 更新起始索引

        return s[start:start + max_len]

    def expand_around_center(self, s: str, left: int, right: int) -> int:
        # 从中心向两边扩展，寻找最大回文长度
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        # 返回找到的回文子串的长度
        # 此處-1是因為長度計算為 right - left + 1，但上面的while最後一次失敗中left跟right的差距多了2
        # 故要把2減回來 right - left + 1 - 2 => right - left - 1
        return right - left - 1
```

## [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/description/)

## [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

# dynamic program
* 要建立DP表
* 要有狀態轉移方程

## [55. Jump Game](https://leetcode.com/problems/jump-game/description/)
* 兩種作法
  * Greedy
  * DP
### DP
* 一維dp列表，每個i代表在dp[i]是否可以到達
* 狀態轉移方程:
``` python
# 如果dp[i]可以到達，就取出nums[i]的點從dp的 i＋1到i+nums[i]設為可以到達
for i in range(n):
    if dp[i]:
        for j in range(1, nums[i] + 1):
            if i + j >= n:
                break
            dp[i + j] = True
```
### Greedy
* 藉由對nums跑for，計算max_arrive最後能否超出nums的長度
  * max_arrive = max(max_arrive, nums[i] + i)

## [62. Unique Paths](https://leetcode.com/problems/unique-paths/description/)
* 建立二維dp，dp[i][j]代表長寬到i,j的所有可能數
* 二維dp表的建立要類似  `dp = [[0] * n for _ in range(m)]`
  * 錯誤的使用 `dp = [[0] * n] * m` 會讓每個row都是同一個引用，修改一個值所有list都會變化
* 要把i=0和j=0的所有步數設為1，因為真的只有一種可能
``` python
# 從dp[1][1]開始填充動態規劃表
for i in range(1, m):
    for j in range(1, n):
        dp[i][j] = dp[i-1][j] + dp[i][j-1]

# 返回右下角的值
return dp[m-1][n-1]
```

## [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
* 費波納切數列

## [91. Decode Ways](https://leetcode.com/problems/decode-ways/description/)
* 題目是想要計算編碼可能數量
* 見一個一維DP表，此表每個i代表，s長度到i時的編碼可能

``` python
# 查看前一位數是否符合編碼規則
if 0 < int(s[i - 1]) <= 9:
    dp[i] += dp[i-1]

# 查看前兩位數是否符合編碼規則
if 9 < int(s[i-2:i]) <= 26:
    dp[i] += dp[i-2]
```

## 198. House Robber
* 一維的DP表去存第i個房子搶劫的最大值
* 狀態轉移方程: ` dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
  * 不搶劫當前房屋，則最大金額為 dp[i-1]
  * 搶劫當前房屋，則最大金額為 dp[i-2] + nums[i]。


## [139. Word Break](https://leetcode.com/problems/word-break/)
* 一維的dp表去存長度為i時的s是否可Word Break，要處理dp[0] = True
* 用兩個for計算
* 狀態轉移方程: 此處表s[:j] 和 s[j:i]都在 wordDict_set，當然dp[i]就是True，進入下個i直接break
``` python
if dp[j] and s[j:i] in wordDict_set:
    dp[i] = True
    break
```

## [213. House Robber II](https://leetcode.com/problems/house-robber-ii/description/)
* 先寫一個完整的198. House Robber
* 再回傳 max(normal_rob(nums[1:]), normal_rob(nums[:-1])) 就是答案
  * 把兩個連續的點拿出來討論，一次只選一個，都去算198. House Robber，看哪邊大
  * 此處是一種不搶最後一筆，一種不搶第一筆

## [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)
* 一維的DP表去存位置i的最長Subsequence
* 用兩個for，外面的for 是定位 dp[i] 時候的可能，裡面的for是計算 dp[i]  最長的Subsequence
  * 因為無法用dp[i-x]直接求得dp[i]，所以要用裡面的for重算
* 狀態轉移方程: dp[i] = max(dp[i], dp[j] + 1)
   * Subsequence的現象是只要 nums[i] > nums[j] 就至少多出現一組小到大的數列，所以直接+1

## [322. Coin Change](https://leetcode.com/problems/coin-change/)
* 一維的DP表去存i為某個amount時的硬幣可能數，要處理dp[0] = 1
* 狀態轉移方程: `dp[i] = min(dp[i], dp[i - coin] + 1)`
  * dp[ i - coin ] + 1 這個代表小的表+1枚硬幣

## [377. Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/)
* 可重複拿錢版本的零錢問題 322. Coin Change
* 一維的dp表去存，i為某個target的可能組合數，要處理dp[0] = 1
* 狀態轉移方程:
``` python
# 類似jump game，把上一步的所有可能加到dp[i]
if i - num >= 0:
    # 將 dp[i - num] 的值加到 dp[i] 上
    dp[i] += dp[i - num]
```

## [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
* todo

