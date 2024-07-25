# Python 物件拷貝與比較簡介

## 可變物件與不可變物件
* **可變物件**：該物件所指向記憶體中的值可以被改變。
* **不可變物件**：該物件所指向記憶體中的值不可以被改變。
  * 當變數指向的值改變時，實際上是將原來的值複製一份後存於一個新的地址，變數再指向這個新的地址。

## 賦值操作
* 賦值操作使用等號 `=`
* `a` 和 `a_ref` 是完全相同的，兩者的記憶體位置相同。
* `a_ref` 只是 `a` 的引用，對 `a` 做修改，`a_ref` 也會被改變。

```python
a = [1, 2, 3]
a_ref = a
a.append(4)
```
## 淺複製(shallow copy)與深複製(deep copy) 區別
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

