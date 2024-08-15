# unpacking operators

`*` (asterisk)運算符用於解包可迭代物件，如列表、元組、範圍等。


# * 運算符
## unpacking operator 在函式參數中解包
* 在函式參數中解包
```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # 等同於 add(1, 2, 3)
print(result)  # Output: 6
```

## 在列表或元組中解包

``` python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined_list = [*list1, *list2]
print(combined_list)  # Output: [1, 2, 3, 4, 5, 6]
```

## 在函式定義中收集多餘的參數
``` python
def my_function(a, b, *args):
    print(a, b)
    # args是tuple
    print(args)

my_function(1, 2, 3, 4, 5)
# Output:
# 1 2
# (3, 4, 5)
```

# ** 運算符

** 運算符用於解包字典，它將字典中的鍵值對解包並作為命名參數傳遞給函式，或將多個字典合併。

##  在函式參數中解包
* 使用 ** 可以將字典中的鍵值對作為命名參數傳遞給函式。

``` python
def greet(name, age):
    print(f"Hello, my name is {name} and I am {age} years old.")

info = {'name': 'Alice', 'age': 30}
greet(**info)  # 等同於 greet(name='Alice', age=30)
# Output: Hello, my name is Alice and I am 30 years old.
```

## 在函式定義中收集多餘的命名參數
* 在函式定義中，使用 **kwargs 來收集多餘的命名參數，這些參數將被收集成一個字典。

``` python
def my_function(a, b, **kwargs):
    print(a, b)
    print(kwargs)

my_function(1, 2, c=3, d=4)
# Output:
# 1 2
# {'c': 3, 'd': 4}
```
## 合併字典
* 你可以使用 ** 運算符來合併多個字典。

``` python
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
combined_dict = {**dict1, **dict2}
print(combined_dict)  # Output: {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

# 與zip合用
``` python
list_of_lists =[[1, 4, 7], [2, 5, 8], [3, 6, 9]]
# [(1, 2, 3), (4, 5, 6), (7, 8, 9)]
list(zip(*list_of_lists))
```

# keyword-only arguments
* 在*args後面的參數，都只能帶入key
* `help(sorted)`可看到sorted就是用此方式實作
```python
def get_multiple(*keys, dictionary, default=None):
    # dictionary 只能用keyword 帶入參數
    return [dictionary.get(key, default) for key in keys ]

# 在此例中，*後面的通通只能帶入keyword 而且不能帶入任意數量的參數
def with_previous(iterable, *, fillvalue=None):
    """Yield each iterable item along with the item before it."""
    previous = fillvalue
    for item in iterable:
        yield previous, item
        previous = item
```


# Asterisks in tuple unpacking，解構tuple的傳值
```python
fruits = ['lemon', 'pear', 'watermelon', 'tomato']
# remaining 得到後面兩個值
first, second, *remaining = fruits
# remaining得到後面三個值
first, *remaining = fruits
# middle得到中間一個值
first, *middle, last = fruits
# 為lemon第一個字元的list，remaining為lemon後面四個字元的list
((first_letter, *remaining), *other_fruits) = fruits
```

## ref
* [Python – Star or Asterisk operator ( * )](https://www.geeksforgeeks.org/python-star-or-asterisk-operator/)
* [What does ** (double star/asterisk) and * (star/asterisk) do for parameters?](https://stackoverflow.com/questions/36901/what-does-double-star-asterisk-and-star-asterisk-do-for-parameters)
* [[Python] ** 雙星號(double star/asterisk) vs *單星號(star/asterisk) 用法](https://e8859487.pixnet.net/blog/post/403127384-%5bpython%5d-%2a%2a-%e9%9b%99%e6%98%9f%e8%99%9f%28double-star-asterisk%29-vs-%2a%e5%96%ae%e6%98%9f%e8%99%9f%28st)
* [Asterisks in Python: what they are and how to use them](https://treyhunner.com/2018/10/asterisks-in-python-what-they-are-and-how-to-use-them/)