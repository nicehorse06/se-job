# asterisk ( * )

## 基本
```python
# 乘法
mul = 5 * 7
# 指數
result = 3 ** 2
# 列表的乘法
list = ['geeks '] * 3
```

## 解構list
* 把list的`[]`拿掉
```python
numbers = [2, 1, 3, 4, 7]
```

## 解構list帶入函式當參數
```python
arr = ['sunday', 'monday', 'tuesday', 'wednesday']
  
# without using asterisk
print(' '.join(map(str,arr))) 
  
# using asterisk
print (*arr)
# 等同於print('sunday', 'monday', 'tuesday', 'wednesday')
```

## 與zip合用
``` python
list_of_lists =[[1, 4, 7], [2, 5, 8], [3, 6, 9]]
# [(1, 2, 3), (4, 5, 6), (7, 8, 9)]
list(zip(*list_of_lists))
```


## *args，讓函式可以接收任意個非keyword arguments
```python
# using asterisk
def addition(*args):
    # args 為 (5, 10, 20, 6)
    return sum(args)
  
print(addition(5, 10, 20, 6))
```

## keyword-only arguments
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

## **kwargs，讓函式可以接收任意個keyword arguments
```python
# using asterisk
def food(**kwargs):
    # kwargs為dict，{'fruit': 'cherry', 'vegetable': 'potato', 'boy': 'srikrishna'}
    for items in kwargs:
        print(f"{kwargs[items]} is a {items}")
      
      
food(fruit = 'cherry', vegetable = 'potato', boy = 'srikrishna')

dict = {'fruit' : 'cherry', 'vegetable' : 'potato', 'boy' : 'srikrishna'}
# using asterisk，也可以用 **來解構dict當作函式的key value帶入
food(**dict)
```

## args kwargs 補充

* `*args`是一個list指的是不論個數的輸入參數
* `**kwargs`是一個dict指的是任何名子的參數
```python
def func(*args, **kwargs):
    for item in args:
        print("I'm args and value is {0}".format(item))
    for key, value in kwargs.items():
        print("I'm kwargs and key and value is {0}={1}".format(key, value))


func([{
    'name': 10,
    'value': 20
}, 1, 2, 3], 12364)

func(name=1023)
```
## [Python __init__(self,**kwargs) takes 1 positional argument but 2 were given [duplicate]](https://stackoverflow.com/questions/44183175/python-init-self-kwargs-takes-1-positional-argument-but-2-were-given)
```
把dict帶入函數中的**kwargs，需要用**解開打包
```

## Asterisks in tuple unpacking，解構tuple的傳值
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

## Asterisks in list literals
```python
fruits = ['lemon', 'pear', 'watermelon', 'tomato']
# 調換item之間的順序
(*fruits[1:], fruits[0])
# 在set中合併兩個tuple
uppercase_fruits = (f.upper() for f in fruits)
{*fruits, *uppercase_fruits}
```
## Double asterisks in dictionary literals 合併dict
```python
date_info = {'year': "2020", 'month': "01", 'day': "01"}
track_info = {'artist': "Beethoven", 'title': 'Symphony No 5'}
# {'year': '2020', 'month': '01', 'day': '01', 'artist': 'Beethoven', 'title': 'Symphony No 5'}
{**date_info, **track_info}

# 在此 new_info 的day會變成14
new_info = {**date_info, 'day': "14"}
```

## ref
* [Python – Star or Asterisk operator ( * )](https://www.geeksforgeeks.org/python-star-or-asterisk-operator/)
* [What does ** (double star/asterisk) and * (star/asterisk) do for parameters?](https://stackoverflow.com/questions/36901/what-does-double-star-asterisk-and-star-asterisk-do-for-parameters)
* [[Python] ** 雙星號(double star/asterisk) vs *單星號(star/asterisk) 用法](https://e8859487.pixnet.net/blog/post/403127384-%5bpython%5d-%2a%2a-%e9%9b%99%e6%98%9f%e8%99%9f%28double-star-asterisk%29-vs-%2a%e5%96%ae%e6%98%9f%e8%99%9f%28st)
* [Asterisks in Python: what they are and how to use them](https://treyhunner.com/2018/10/asterisks-in-python-what-they-are-and-how-to-use-them/)