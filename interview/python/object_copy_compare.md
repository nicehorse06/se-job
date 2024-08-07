# Python 物件拷貝/pass by ref

# 可變物件（Mutable Objects）
* 可變物件是指可以在原地修改其值的對象。
  * 不需要創建新的對象，其內部狀態可以直接改變。
* 常見的可變物件
  * 列表（list）
  * 字典（dictionary）
  * 集合（set）
  * instance

# 不可變物件（Immutable Objects）
* 不可變物件是指一旦創建其值就不能改變的對象。
  * 對這些對象的任何操作都會創建一個新的對象，而不會改變原來的對象。
* 常見的不可變物件：
  * 整數（int）
  * 浮點數（float）
  * 字符串（str）
  * 元組（tuple）

# 可變物件與不可變物件的比較
| 特性      | 可變物件 (Mutable Objects)         | 不可變物件 (Immutable Objects)   |
|--|----------|-----|
| 定義      | 可以在原地修改其值的對象  | 一旦創建後其值就不能被改變的對象|
| 常見類型  | 列表 (list), 字典 (dictionary), 集合 (set)    | 整數 (int), 浮點數 (float), 字符串 (str), 元組 (tuple), 冻结集合 (frozenset) |
| 內存管理  | 原地修改，不創建新對象    | 修改操作創建新對象，原對象不變  |
| 例子      | `my_list.append(4)`      | `new_str = my_str.upper()`      |
| 修改後的影響        | 影響到所有引用該對象的地方| 不影響其他引用該對象的地方      |
| 多線程安全性        | 需要額外的同步措施來保證線程安全     | 天生線程安全，因為值不能被改變  |
| 用作集合或字典的鍵  | 不能用作鍵（因為其哈希值可變）       | 可以用作鍵（因為其哈希值不可變）|
| 使用場景  | 需要頻繁修改其內容的場景，如列表和字典        | 需要確保數據不被改變的場景，如字符串和元組|
| 參數傳遞  | 函數內的修改會影響原對象  | 函數內的修改創建新對象，不影響原對象      |


# 賦值操作
* 賦值操作使用等號 `=`
* `a` 和 `a_ref` 是完全相同的，兩者的記憶體位置相同。
* `a_ref` 只是 `a` 的引用，對 `a` 做修改，`a_ref` 也會被改變。

```python
a = [1, 2, 3]
a_ref = a
a.append(4)
```
# 淺複製(shallow copy)與深複製(deep copy) 區別
在 Python 中，複製對象可以通過淺拷貝（shallow copy）和深拷貝（deep copy）兩種方式進行。
淺拷貝和深拷貝的區別在於它們如何處理嵌套對象（如列表中的列表，或者字典中的字典）。

## 淺拷貝（Shallow Copy）
淺拷貝創建一個新的對象，但不會遞歸複製對象中的嵌套對象。
新的對象會引用原對象中嵌套的對象。
淺複製：僅複製容器中元素的地址。

## 淺拷貝的幾種方式
``` python
# 1.使用切片操作
original_list = [1, 2, [3, 4]]
shallow_copied_list = original_list[:]


# 2.使用 copy 模組
import copy

original_list = [1, 2, [3, 4]]
shallow_copied_list = copy.copy(original_list)


# 3.使用 list 函數
original_list = [1, 2, [3, 4]]
shallow_copied_list = list(original_list)


# 4.使用 dict 函數
original_dict = {'a': 1, 'b': {'c': 2}}
shallow_copied_dict = dict(original_dict)

# 5. 使用 set() 函數
original_set = {1, 2, (3, 4)}
shallow_copied_set = set(original_set)


# 6. 使用 copy() 方法
# 適用於字典、列表、集合等對象。

original_dict = {'a': 1, 'b': {'c': 2}}
shallow_copied_dict = original_dict.copy()

original_list = [1, 2, [3, 4]]
shallow_copied_list = original_list.copy()

original_set = {1, 2, (3, 4)}
shallow_copied_set = original_set.copy()

```


## 深拷貝（Deep Copy）
深拷貝創建一個新的對象，並遞歸複製所有嵌套的對象。新對象與原對象完全獨立，修改新對象不會影響原對象。
深複製：完全複製一份副本，容器與容器中的元素地址都不一樣。

## 深拷貝的方式

``` python
# 使用 copy 模組中的 deepcopy() 函數
# 適用於各種可複製的對象。
import copy

original_list = [1, 2, [3, 4]]
deep_copied_list = copy.deepcopy(original_list)
```

## is 跟 == 的區別
* is 用來比較兩個變數是否引用同一個物件（即記憶體地址是否相同）。
* == 用來比較兩個變數所引用的物件的值是否相等。
``` python
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)  # True，因為 a 和 b 引用同一個物件
print(a is c)  # False，因為 a 和 c 引用不同的物件，即使它們的值相同

print(a == b)  # True，因為 a 和 b 的值相同
print(a == c)  # True，因為 a 和 c 的值相同

```

# pass by reference issue
* 使用可變對象（Mutable Objects）當作參數時要注意，引用的修改會影響原本的變數
* 不可變對象不影響，因為每次改變都創見新對象
## 函數中的可變默認參數
``` python
def add_student(student, student_list=[]):
    student_list.append(student)
    return student_list

# 添加學生
class_a = add_student('Alice')
class_b = add_student('Bob')
class_c = add_student('Charlie', [])

print(class_a)  # 結果: ['Alice', 'Bob']
print(class_b)  # 結果: ['Alice', 'Bob']
print(class_c)  # 結果: ['Charlie']
```
## 直接修改傳入的列表
``` python
def modify_list(a_list):
    a_list.append(1)

my_list = [0]
modify_list(my_list)

print(my_list)  # 結果: [0, 1]
```

## 可變對象作為類屬性
``` python
class MyClass:
    def __init__(self, items=[]):
        self.items = items

a = MyClass()
b = MyClass()

a.items.append(1)
b.items.append(2)

print(a.items)  # 結果: [1, 2]
print(b.items)  # 結果: [1, 2]
```

## 多個變數指向同一列表
``` python
list1 = [1, 2, 3]
list2 = list1

list2.append(4)

print(list1)  # 結果: [1, 2, 3, 4]
print(list2)  # 結果: [1, 2, 3, 4]
```

## 嵌套列表或字典的修改
``` python
def modify_nested_list(nested_list):
    nested_list[0].append(1)

nested = [[0], [1], [2]]
modify_nested_list(nested)

print(nested)  # 結果: [[0, 1], [1], [2]]
```

## 將可變對象存儲在類的類屬性中
``` python
class MyClass:
    shared_list = []

    def __init__(self, value):
        self.value = value
        MyClass.shared_list.append(value)

a = MyClass(1)
b = MyClass(2)

print(MyClass.shared_list)  # 結果: [1, 2]
```

##  在多線程或多進程環境中共享可變對象
``` python
import threading

def append_to_list(shared_list):
    shared_list.append(1)

shared_list = []
threads = [threading.Thread(target=append_to_list, args=(shared_list,)) for _ in range(10)]

for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(shared_list)  # 結果: 共享列表的值可能會不一致
```