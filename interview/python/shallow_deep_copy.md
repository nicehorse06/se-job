# [淺複製(shallow copy)與深複製(deep copy)](https://ithelp.ithome.com.tw/articles/10221255)
* 可變物件：該物件所指向記憶體中的值可以被改變
* 不可變物件：該物件所指向記憶體中的值不可以被改變，
    * 所以當變數指向的值改變時，等於將原來的值複製一份後存於一個新的地址，變數再指向這個新的地址

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