# [淺複製(shallow copy)與深複製(deep copy)](https://ithelp.ithome.com.tw/articles/10221255)
* 可變物件：該物件所指向記憶體中的值可以被改變
* 不可變物件：該物件所指向記憶體中的值不可以被改變，
    * 所以當變數指向的值改變時，等於將原來的值複製一份後存於一個新的地址，變數再指向這個新的地址


## todo
在 Python 中，复制对象可以通过浅拷贝（shallow copy）和深拷贝（deep copy）两种方式进行。浅拷贝和深拷贝的区别在于它们如何处理嵌套对象（如列表中的列表，或者字典中的字典）。

浅拷贝（Shallow Copy）
浅拷贝创建一个新的对象，但不会递归复制对象中的嵌套对象。也就是说，新的对象会引用原对象中嵌套的对象。

浅拷贝的几种方式
使用切片操作
适用于列表等可切片的对象。

python
複製程式碼
original_list = [1, 2, [3, 4]]
shallow_copied_list = original_list[:]
使用 copy 模块
适用于各种可复制的对象。

python
複製程式碼
import copy

original_list = [1, 2, [3, 4]]
shallow_copied_list = copy.copy(original_list)
使用 list 函数
适用于列表对象。

python
複製程式碼
original_list = [1, 2, [3, 4]]
shallow_copied_list = list(original_list)
使用 dict 函数
适用于字典对象。

python
複製程式碼
original_dict = {'a': 1, 'b': {'c': 2}}
shallow_copied_dict = dict(original_dict)
深拷贝（Deep Copy）
深拷贝创建一个新的对象，并递归复制所有嵌套的对象。新对象与原对象完全独立，修改新对象不会影响原对象。

深拷贝的方式
使用 copy 模块
适用于各种可复制的对象。

python
複製程式碼
import copy

original_list = [1, 2, [3, 4]]
deep_copied_list = copy.deepcopy(original_list)
浅拷贝和深拷贝的区别示例
python
複製程式碼
import copy

original_list = [1, 2, [3, 4]]

# 浅拷贝
shallow_copied_list = copy.copy(original_list)
# 深拷贝
deep_copied_list = copy.deepcopy(original_list)

# 修改原始列表的嵌套列表
original_list[2][0] = 99

print("Original List:", original_list)  # Output: [1, 2, [99, 4]]
print("Shallow Copied List:", shallow_copied_list)  # Output: [1, 2, [99, 4]]
print("Deep Copied List:", deep_copied_list)  # Output: [1, 2, [3, 4]]
在这个示例中，修改原始列表中的嵌套列表后，浅拷贝的列表也受到了影响，而深拷贝的列表则保持不变。

总结
浅拷贝：创建一个新的对象，但不递归复制嵌套对象，引用的是原对象中的嵌套对象。
方式：切片操作、copy.copy()、list()、dict()
深拷贝：创建一个新的对象，并递归复制所有嵌套的对象，新对象与原对象完全独立。
方式：copy.deepcopy()
根据需要选择合适的拷贝方式，以确保数据的独立性和一致性。

## 等號 = 賦值
* a, a_ref 是完全相同的
* a 和 a_ref 的記憶體位置相同
* 故 a_ref 只是 a 的引用
* 對 a 做修改，a_ref 也會被改變
```python
a = [1,2,3]
a_ref = a
a.append(4)
```

## 淺複製與深複製 Shallow copy and deep copy
* 淺複製僅複製容器中元素的地址
* 深複製完全複製了一份副本，容器與容器中的元素地址都不一樣

## 一般 copy
* b = list(a)
* b = a[:]
* b = a.copy() 
    * PS: 淺複製Shallow copy

## 深複製 deep copy
```python
import copy
a = [1, [2,3]]
a_deepcopy = copy.deepcopy(a)
```

## 淺複製與深複製的差別
* 淺複製與深複製的關鍵差別在於，複製的變數中是否有可變型別
```python
import copy
a = [1, [2,3]]
a_ref = a
a_shallowcopy = copy.copy(a)
a_deepcopy = copy.deepcopy(a)
```
* 淺/深複在製第一層變數均已指向不同記憶體
* 淺複製在第二層變數仍與原始變數指向相同記憶體
* 深複製在第二層變數已指向不同記憶體
* 深複製 (deep copy) 建立一份完全獨立的變數