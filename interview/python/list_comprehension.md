# 列表生成式（List Comprehension）

# intro
列表生成式（List Comprehension）是 Python 提供的一種簡潔且高效的語法，用於從其他可迭代對象（如列表、元組、字典等）創建新列表。它通常比使用傳統的 for 迴圈更簡潔且可讀性更高。

## 基本語法：
``` python
'''
expression：表示每個元素在最終列表中的表達式，可以是原元素或經過某些操作後的值。
item：來自可迭代對象（如列表、範圍）的每個元素。
iterable：你想要遍歷的可迭代對象。
condition（可選）：過濾條件，只有滿足條件的元素才會被加入列表。
'''
[expression for item in iterable if condition]
```

## 適合使用情境
* 簡單且直觀的操作
  * 如果列表生成過程不包含太多複雜邏輯，比如單純的篩選、映射操作
  * squares = [x**2 for x in range(10)]
* 條件篩選
  * 篩選數據時，List Comprehension 通常能夠直接在一行中完成篩選和數據生成的工作。
  * evens = [x for x in range(20) if x % 2 == 0]
* 多層迭代
  * 進行簡單的嵌套迭代時，它能大幅提高代碼的可讀性。
  * combinations = [(x, y) for x in range(3) for y in range(3)]

## 不適合的情境
* 過於複雜的邏輯
  * 如 result = [x**2 if x % 2 == 0 else x for x in range(100) if x % 3 == 0 if x > 10]
* 可讀性較差
  * 如果生成的列表操作過於複雜或不直觀，這可能會使代碼的可讀性變差，尤其是在團隊開發中，應該避免過於複雜的一行代碼。
* 處理大數據集
  * List Comprehension 會立即創建整個列表，這在處理非常大的數據集時會消耗大量內存。此時應考慮使用生成器表達式來節省內存。

# 以下是範例

# 基本列表生成式
* 生成一個包含數字的列表，將一個範圍內的所有數字存入新列表。
``` python
# 這是一個最簡單的列表生成式，將 range(5) 中的每個數字 x 加入新列表。有能
numbers = [x for x in range(5)]
print(numbers)  # Output: [0, 1, 2, 3, 4]
```

# 加入條件的列表生成式
* 生成一個包含偶數的列表。
``` python
even_numbers = [x for x in range(10) if x % 2 == 0]
print(even_numbers)  # Output: [0, 2, 4, 6, 8]
```

# 嵌套的列表生成式
* 生成乘法表（例如，1-3的乘法表）。
* 外部生成 y 的範圍，內部生成 x * y 的值，最終得到一個2D列表，表示1到3的乘法表。
``` python
multiplication_table = [[x * y for x in range(1, 4)] for y in range(1, 4)]
print(multiplication_table)
# Output: [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

# 帶有條件和運算的列表生成式
* 將數字平方，但僅針對偶數。
``` python
squared_evens = [x**2 for x in range(10) if x % 2 == 0]
print(squared_evens)  # Output: [0, 4, 16, 36, 64]
```

# 多條件篩選的列表生成式
* 生成一個列表，篩選1到50內的數字，條件是偶數且大於20。
``` python
filtered_numbers = [x for x in range(1, 51) if x % 2 == 0 and x > 20]
print(filtered_numbers)  # Output: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
```

# 列表生成式與函數結合
* 對一組名字進行格式化，將所有名字的首字母轉為大寫。
``` python
names = ['alice', 'bob', 'charlie']
formatted_names = [name.capitalize() for name in names]
print(formatted_names)  # Output: ['Alice', 'Bob', 'Charlie']
```

# 多層嵌套的列表生成式
* 展平一個二維列表（將嵌套列表中的元素提取出來）。
* 這個列表生成式先遍歷每個子列表，再提取每個子列表中的元素。
* todo 要再看
``` python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

# 生成字典的列表生成式
* 生成一個數字的平方字典，將數字與其平方對應。
``` python
squared_dict = {x: x**2 for x in range(5)}
print(squared_dict)  # Output: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

# 條件表達式（Ternary Operator）
* 條件表達式允許在列表生成式中根據條件動態地選擇不同的結果。
``` python
result = ['Even' if x % 2 == 0 else 'Odd' for x in range(6)]
print(result)  # Output: ['Even', 'Odd', 'Even', 'Odd', 'Even', 'Odd']
```

# 帶條件的表達式
* 創建一個列表，元素為 0 到 9 的平方數，如果平方數是偶數，則保留平方數；否則，將其替換為原數。
``` python
result = [i ** 2 if (i ** 2) % 2 == 0 else i for i in range(10)]
print(result)  # 輸出: [0, 1, 4, 3, 16, 5, 36, 7, 64, 9]
```

# 字典轉列表
* 從一個字典中提取鍵和值，並創建一個包含鍵值對的列表。
``` python
my_dict = {'a': 1, 'b': 2, 'c': 3}
items = [(key, value) for key, value in my_dict.items()]
print(items)  # 輸出: [('a', 1), ('b', 2), ('c', 3)]
```

# 多條件嵌套列表生成式
* 目標：生成一個包含所有 1 到 3 之間數字組合的列表，但排除相同的數字組合。
``` python
combinations = [(i, j) for i in range(1, 4) for j in range(1, 4) if i != j]
print(combinations)  # 輸出: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```

# 帶有函數的嵌套生成式
* 列表生成式可以與自定義函數結合使用，將迭代的值通過函數進行處理。
``` python
def double(x):
    return x * 2

doubled_numbers = [double(x) for x in range(5)]
print(doubled_numbers)  # Output: [0, 2, 4, 6, 8]
```

# ref
* GPT