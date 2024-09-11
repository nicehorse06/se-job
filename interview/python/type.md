# 型別

# type()
``` python
# int
type(1)
type((1))
type((((((1))))))

# tuple
type((1,))

# set
type({1})
```

# tuple vs. list
| 特性             | `list` (列表)                             | `tuple` (元組)                         |
|------------------|-------------------------------------------|---------------------------------------|
| **可變性**       | `list` 是可變的，可以修改、添加、刪除元素  | `tuple` 是不可變的，無法修改其內容    |
| **語法**         | 使用方括號 `[]` 創建                     | 使用小括號 `()` 創建                 |
| **效率**         | 因為是可變的，所以速度相對較慢              | 因為是不可變的，使用上相對較快         |
| **用途**         | 適用於需要頻繁改變內容的數據集合             | 適用於不會改變的資料集合，尤其適合作為常數|
| **內存使用**     | 占用較多內存                              | 占用較少內存                          |
| **方法數量**     | 提供更多的方法，例如 `append()`、`remove()`  | 方法較少，只能進行基本操作，如 `count()` 和 `index()` |


# set vs list
## 相似之處
都可以存放多個元素。
都可以進行迭代。
都支持基本的操作如添加元素、刪除元素等。

## 主要區別
| 特性             | `list` (列表)                             | `set` (集合)                          |
|------------------|-------------------------------------------|---------------------------------------|
| **有序性**       | 有序，可以根據索引存取元素                  | 無序，無法根據索引存取               |
| **可變性**       | 可變，可以修改、添加、刪除元素              | 可變，可以添加或刪除元素，但不允許重複值 |
| **重複性**       | 允許有重複的元素                           | 不允許有重複的元素                   |
| **訪問效率**     | 查找和檢索元素效率較低（O(n)），因為需要遍歷  | 查找和檢索元素效率高（O(1)），基於哈希表 |
| **使用場景**     | 適用於需要保持元素順序或允許重複的場景       | 適用於需要唯一元素的場景              |
| **語法**         | 使用方括號 `[]` 創建                      | 使用大括號 `{}` 或 `set()` 創建       |



# Python Type Conversion Guide

In Python, type conversion between `string`, `list`, and `dict` is a common task. Below are the common methods for converting between these types.

## 1. Conversion between `list` and `string`

### `list` to `string`
To convert a `list` to a string, you can use the `join()` method, but all elements in the `list` must be strings.

```python
words = ["hello", "world"]
sentence = " ".join(words)  # 'hello world'
```

### `string` to `list`
You can convert a string to a `list` using the `split()` method to split the string by a delimiter, or you can use `list()` to get each character as a list element.

```python
sentence = "hello world"
words = sentence.split()  # ['hello', 'world']

chars = list(sentence)  # ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
```


## 2. Conversion between `list` and `dict`

### `list` to `dict`
To convert a `list` to a `dict`, you can use `zip()` to pair up two lists as key-value pairs.

```python
keys = ["name", "age"]
values = ["Alice", 25]
person_dict = dict(zip(keys, values))  # {'name': 'Alice', 'age': 25}
```

### `dict` to `list`
To convert a `dict` to a `list`, you can extract the keys, values, or key-value pairs.

```python
person_dict = {'name': 'Alice', 'age': 25}

# List of keys
keys_list = list(person_dict.keys())  # ['name', 'age']

# List of values
values_list = list(person_dict.values())  # ['Alice', 25]

# List of key-value pairs
items_list = list(person_dict.items())  # [('name', 'Alice'), ('age', 25)]
```

## 3. Conversion between `string` and `dict`

### `string` to `dict`
To convert a string to a `dict`, the string needs to be in JSON format, and you can use `json.loads()` for the conversion.

```python
import json

person_str = '{"name": "Alice", "age": 25}'
person_dict = json.loads(person_str)  # {'name': 'Alice', 'age': 25}
```

### `dict` to `string`
To convert a `dict` to a string, typically in JSON format, you can use `json.dumps()`.

```python
import json

person_dict = {'name': 'Alice', 'age': 25}
person_str = json.dumps(person_dict)  # '{"name": "Alice", "age": 25}'
```

These are common type conversion methods between `string`, `list`, and `dict` in Python.