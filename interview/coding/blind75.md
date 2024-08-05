# blind75筆記

# Array

## [1. Two Sum](https://leetcode.com/problems/two-sum/description/)
* 用一個for把nums裡面取出num_1並藉由target推算num2，把這個值和index關係存到dict，如果nums存在num_2就知道答案

## [11. Container With Most Water]()

## [15. 3Sum](https://leetcode.com/problems/3sum/description/)
* 排序後，使用two point
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

## [217.Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
* 用map或set去記錄每個值，for有重複到就回傳

## [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/description/)
* 題目限制不能用除法
* 建立left list，每個i存左邊所有數的乘積
* 建立right list，每個i存右邊所有數的乘積
* 再把left和right相乘的list就是答案，每個i為除了自己的所有數的乘積

# dynamic program
* 要建立DP表
* 要有狀態轉移方程

## [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
* 費波納切數列

## [322. Coin Change](https://leetcode.com/problems/coin-change/)
* 一維的DP表去存i為某個amount時的硬幣可能數，要處理dp[0] = 1
* 狀態轉移方程: `dp[i] = min(dp[i], dp[i - coin] + 1)`
  * dp[ i - coin ] + 1 這個代表小的表+1枚硬幣

## [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)
* 一維的DP表去存位置i的最長Subsequence
* 用兩個for，外面的for 是定位 dp[i] 時候的可能，裡面的for是計算 dp[i]  最長的Subsequence
  * 因為無法用dp[i-x]直接求得dp[i]，所以要用裡面的for重算
* 狀態轉移方程: dp[i] = max(dp[i], dp[j] + 1)
   * Subsequence的現象是只要 nums[i] > nums[j] 就至少多出現一組小到大的數列，所以直接+1

## [139. Word Break](https://leetcode.com/problems/word-break/)
* 一維的dp表去存長度為i時的s是否可Word Break，要處理dp[0] = True
* 用兩個for計算
* 狀態轉移方程: 此處表s[:j] 和 s[j:i]都在 wordDict_set，當然dp[i]就是True，進入下個i直接break
``` python
if dp[j] and s[j:i] in wordDict_set:
    dp[i] = True
    break
```

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


## 198. House Robber
* 一維的DP表去存第i個房子搶劫的最大值
* 狀態轉移方程: ` dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
  * 不搶劫當前房屋，則最大金額為 dp[i-1]
  * 搶劫當前房屋，則最大金額為 dp[i-2] + nums[i]。

## [213. House Robber II](https://leetcode.com/problems/house-robber-ii/description/)
* 先寫一個完整的198. House Robber
* 再回傳 max(normal_rob(nums[1:]), normal_rob(nums[:-1])) 就是答案
  * 把兩個連續的點拿出來討論，一次只選一個，都去算198. House Robber，看哪邊大
  * 此處是一種不搶最後一筆，一種不搶第一筆

## [91. Decode Ways](https://leetcode.com/problems/decode-ways/description/)

## [62. Unique Paths](https://leetcode.com/problems/unique-paths/description/)

## [55. Jump Game](https://leetcode.com/problems/jump-game/description/)
* 兩種作法
  * Greedy
  * DP
## DP
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
## Greedy
* 藉由對nums跑for，計算max_arrive最後能否超出nums的長度
  * max_arrive = max(max_arrive, nums[i] + i)
