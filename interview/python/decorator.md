# Decorator introduction

## 函數中定義函數
``` python
def hi():
    print("now you are inside the hi() function")
 
    def greet():
        return "now you are in the greet() function"
 
    def welcome():
        return "now you are in the welcome() function"
 
    print(greet())
    print(welcome())
    print("now you are back in the hi() function")
 
hi()
# error
greet()

```

## 函數返回函數
``` python
def hi(is_greet=True):
    def greet():
        return "now you are in the greet() function"
 
    def welcome():
        return "now you are in the welcome() function"
 
    if is_greet:
        return greet
    else:
        return welcome
 
a = hi()
print(a)
#outputs: <function greet at 0x7f2143c01500>
#  
print(a())
#outputs: now you are in the greet() function

hi()()
```


## 函數當作函數的參數
```python
def hi():
    return "hi yasoob!"
 
def doSomethingBeforeHi(func):
    print("Doing something before func()")
    print(func())
 
doSomethingBeforeHi(hi)
```

## decorator 簡介
* 為語法糖
* 幫助函式、方法的執行前後添加新功能
* 應用如紀錄log、確認函數授權
* 好處
    * 降低程式碼重複率
    * 易讀性高
    * 靈活度高


## decorator 使用
``` python
# decorator定義
def print_hello_decorator(func):
    def wrap():
        print('Hello')
        func()
        print('!!!')
    return wrap

# 等效於 print_world = print_hello_decorator(print_world)
@print_hello_decorator 
def print_world():
    print('World')
```

## decorator架構
```python
# print_hello_decorator 用來定義 decorator
def print_hello_decorator(func):
    print('使用decorator就會執行(1)')

    # wrapper用來實際執行decorator，且在func呼叫時使用
    def wrapper():
        print(f'使用函式({func.__name__})前執行')
        print('Hello')
        result = func()
        print(f'使用函式({func.__name__})後執行')
        return result

    print('使用decorator就會執行(2)')
    return wrapper

@print_hello_decorator
def print_world():
    print('World')


def print_world():
    print('World')
print_world = print_hello_decorator(print_world)

print_world()
```

## 空白裝飾器推導
0. 現有一函式`def old_func(ori_arg)`
1. `@decorator`等效於`new_func = decorator(old_func)`
    * 而空白的裝飾器`new_func == old_func`
2. decorator裡會定義一個函式`wrapper`
    * 且decorator回傳 `wrapper`，`wrapper = decorator(decorator_arg)`
3. `old_func`的執行會在`wrapper`中
4. 由`1.`得知decorator的參數`decorator_arg`為`old_func`
5. 由`1.`、`2.`得知`new_func == old_func == wrapper`
    * `new_func(ori_arg)` 和 `wrapper(ori_arg)` 執行時帶入一樣的參數
    * 且 `old_func()` 和 `wrapper()` 回傳結果一樣

```python
def decorator(old_func):
    def wrapper(ori_arg):
        this_result = old_func(ori_arg)
        return this_result
    return wrapper
```

## 有參數的函式
```python
def print_hello_decorator(func):
    def wrapper(arg):
        print('Hello')
        return func(arg)
    return wrapper

@print_hello_decorator
def printArg(arg):
    print(arg)

printArg('World')
printArg('Kitty')
```

## 任意數量參數的函式
* `*args`: `args`為能輸入任何數量參數的list
* `**kwargs`: `kwargs`為能輸入任何名字參數的dict

```python
def print_hello_decorator(func):
    def wrapper(*args, **kwargs):
        print('Positional arguments:', args)
        print('Keyword arguments:', kwargs)
        return func(*args, **kwargs)
    return wrapper

@print_hello_decorator
def printDouble(*args, **kwargs):
    print(args)
    print(kwargs)

printDouble(1, arg2=2)
printDouble(arg1=1, arg2=2)
```

### 帶有參數的decorator
* 上面`@decorator`使用時，不帶`()`
* 如果想要參數`@decorator(arg)`，需在decorator額外再包一層funciton

```python
def printArg(decorator_arg):
    print(111)
    def decorator(func):
        print(222)
        def wrapper(*args, **kwargs):
            print(333)
            print(decorator_arg)
            return func(*args, **kwargs)
        return wrapper
    return decorator

# decorator = printArg('Hi')
@printArg('Hi')
def sayHiAndPrintArg(arg):
    print(arg)

sayHiAndPrintArg('World')
```

## 多層decorator
* `d = b(c(d))`等效於以下
    * 執行順序為b c d c b      

```python
@b
@c
def d():
    pass
```

```python
def document_it(func):
    def new_function(*args, **kwargs):
        print('document in')
        result = func(*args, **kwargs)
        print('document out')
        return result
    return new_function

def square_it(func):
    def new_function(*args, **kwargs):
        print('square in')
        result = func(*args, **kwargs)
        print('square out')
        return result * result
    return new_function

@document_it
@square_it
def add_ints(a, b):
    result = a + b
    print(f'plus {a} + {b} = {result}')
    return result

add_ints(3, 5)
```

## 多層decorator的順序推導

``` python
def B(func_b):
    def wrapper():
        print('Print before func_b')
        func_b()
        print('Print after func_b')
    return wrapper

def C(func_c):
    def wrapper():
        print('Print before func_c')
        func_c()
        print('Print after func_c')
    return wrapper

@B
@C
def test():
    print('run test function')
```

* 已知裝飾器的參數為原始函式
* 已知裝飾器會回傳一個新的函式
```python
@C
def test():
    print('run test function')

# test_c與上式test等效
test_c = C(test)
```
* 已知裝飾器功能為執行原始函式 + 前後執行額外的程式
    * 執行test_c的列印順序如下
        1. Print before func_c
        2. run test function
        3. Print after func_c

* 當處理多層裝飾器，可以先約化靠近原始函式的裝飾器
``` python
@B
@C
def test():
    print('run test function')

## test()等效於執行test_c()
## B變成test_c和test的decorator

@B
def test_c():
    @C
    def test():
        print('run test function')
    test()
```

## 範例

### Flask router
``` python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)
```



### 物件的封裝 - getter setter
* getter和setter為class的語法糖
    * 把method當作屬性用
    * 用來客製屬性取值和賦值
* getter 的語法為 @property
    * 可以讓方法的不用()就可以呼叫
* setter 的語法為 @<getter的方法名>.setter
    * 用來賦值


``` python
class User:
    def __init__(self, name=None):
        self._name = name

    def name_1(self):
        print(f'get name[{self._name}]')
        return self._name.strip()

    @property
    def name(self):
        print(f'get name[{self._name}]')
        return self._name.strip()

    @name.setter
    def name(self, new_name):
        if len(new_name) > 10:
            raise Exception('The name is too long!')
        else:
            print(f'set name[{new_name}]')
            self._name = new_name
```


### abc — Abstract Base Classes

``` python

# 限制該class只能被繼承，用來定義各類別的共同介面
from abc import ABC, abstractmethod

# 限制ABC只能被繼承
class Login(ABC):

    # 限制實例化的object一定要實做login方法，不能直接用
    @abstractmethod
    def login(self):
        pass

# TypeError:
test_loing = Login()

class FacebookLogin(Login):
    def login(self):
        print("Facebook login implementation.")

fb = FacebookLogin()
fb.login()
```


## classmethod / staticmethod 裝飾器

* classmethod
    * 該方法的第一個參數通常是`cls`，該class本身
    * 可以不實例化下呼叫
    * 可以訪問class的屬性和方法。

* staticmethod 不會帶入預設第一個參數
    * 可以不實例化下呼叫
    * 無法訪問類別本身的屬性和方法

```python
class Test_demo:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f'Hello! {self.name}')

    @staticmethod
    def is_integer(num):
        if isinstance(num, float):
            return num.is_integer()
        elif isinstance(num, int):
            return True
        else:
            return False

    @classmethod
    def plus(cls, num_1, num_2):
        # cls 為 Test_demo
        if cls.is_integer(num_1) and cls.is_integer(num_2):
            print(num_1 + num_2)
        else:
            print('The parameters need to be number')
    
    # 跟plus一樣
    @staticmethod
    def plus_by_staticmethod(num_1, num_2):
        if Test_demo.is_integer(num_1) and Test_demo.is_integer(num_2):
            print(num_1 + num_2)
        else:
            print('The parameters need to be number')


test = Test_demo('Jimmy')
test.say_hello()
Test_demo.is_integer(1)
Test_demo.plus(1,3)
Test_demo.plus_by_staticmethod(1,3)
```


## class實做Decorator
* class 來實現裝飾器通常適用於需要處理更複雜邏輯的情況，有以下優點
  * 狀態管理，Class 裝飾器可以方便地管理狀態。如計數、緩存結果
  * 多方法支持，不只是__call__，有更多輔助函數，讓程式更可讀
  * 繼承和多態
  * 初始化配置，__init__會在實例化時進行初始化配置

``` python
class CallCountDecorator:
    def __init__(self, func):
        self.func = func
        self.call_count = 0

    def __call__(self, *args, **kwargs):
        self.call_count += 1
        print(f"Function '{self.func.__name__}' has been called {self.call_count} times")
        return self.func(*args, **kwargs)

# 使用裝飾器
@CallCountDecorator
def my_function(x):
    return x * 2

# 測試函數
print(my_function(2))
print(my_function(3))
print(my_function(4))

```