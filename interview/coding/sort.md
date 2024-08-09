# sort interview

# [Sorting algorithm demo note](https://github.com/nicehorse06/sort_demo_note)
* 方便sorting測試的專案

# 插入排序 (Insertion Sort)
* 插入排序是一種簡單直觀的排序算法，適合於小型數據集。
* 它的平均和最壞情況的時間複雜度是`O(n^2)` ，但在近乎排序好的數據集上效率非常高。

# 選擇排序 (Selection Sort)
* 選擇排序是一種容易實現的排序方法，不斷選擇未排序部分的最小（或最大）元素，放到已排序序列的末尾。
* `O(n^2)`

# 快速排序 (Quick Sort)
* 快速排序是最常用的排序算法之一，使用分治策略來將數據分割成較小的兩部分，然後遞歸地排序。
* 平均 `O(nlogn)`，最壞`O(n^2)`

# 合併排序 (Merge Sort)
* 合併排序是一種高效且穩定的排序方法，特別適合於需要穩定排序或大量數據的場景。
* 平均和最壞都 `O(nlog2n)`
* 空間複雜度 `O(n)`

# 堆積排序 (Heap Sort)
* 原地排序算法，但是不穩定，即相同的元素可能在排序後改變原來的順序。
  * 用在內存有限的場合
* 平均和最壞都 `O(nlog2n)`
* 空間複雜度 `O(1)`


# ref
* [排序(sorting)](http://spaces.isu.edu.tw/upload/18833/3/web/sorting.htm)