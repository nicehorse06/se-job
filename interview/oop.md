# Python OOP(Object-oriented programming)

## Python的物件
* Python裡的一切型態都是物件
    * Python建立string變數，不是真的只在記憶位置存string，而是建立一個物件儲存string，調用時回傳string
    * 物件可以有屬性與方法
        * 用`variable.__dir__()` 或 dir(variable) 即可查看該變數的所有屬性與方法
        * 如variable.upper() 可以把string變大寫
```python
# Everything in python is object.
# Classes, functions, and even simple data types, such as integer and float

text = 'hello'
dir(text)
text.upper()
```

## 類別(class)和物件(Object)
* 類別(class)
    * 定義抽象的特點，包含資料的形式和操作資料的方法
    * 類別是一個藍圖、可參考的文件，沒有實體的概念，是靜態的。
    * class的資料稱做屬性(field, attribute, data member)
    * class的函式稱做方法(method)
* 物件(Object)
    * 物件是具有實體概念，狀態會隨時改變，是動態的，但架構不會改變。
    * object是實例化的class
        * 實例化的結果也稱作instnace
        * 範例: 有一隻台灣土狗叫小黑
            * 小黑object是台灣土狗class實例化的instance
    * isinstance(object_name, class_name)可以推斷class跟object的關係
```python
# True
isinstance(7,int)
# False
isinstance(7.0,int)

# 沒有使用物件的情境
item1 = 'phone'
item1_price = 100
item1_quantity = 5 
item1_price_total = item1_price * item1_quantity

# 以下三種class宣告等效
class Item:
    pass

class Item(object):
    # 這種宣告方式可以同時支援Python3和2
    pass

class Item():
    pass

# 執行class就會實例化成instance
# item1是class Item的instance
item1 = Item()
# 設定屬性
item1.name = 'Phone'
item1.price = 100
item1.quantity = 5
item1.total = item1.price * item1.quantity
```


## 建構式(Constructor) __init__
* magic method: `__<method>__` 
    * `__`開頭的名稱在Python裡是有意義的
    * 可以覆寫，但不能發明
* `__init__`會在class實例化時執行，並把class的參數帶入
* 方法在實例化時會帶入instance當作第一參數(self)

```python
class Item:
    def __init__(self, name, price, quantity=0) -> None:
        self.name = name
        self.price = price
        self.quantity = quantity

    def calculate_total_price(self):
        return self.price * self.quantity

    def check_self(self, this_instance):
        return self == this_instance

item1 = Item('jimmy', 100, 1)

print(item1.calculate_total_price())

# 確認self為object
print(item1.check_self(item1))
```

## 屬性和方法 
* 屬性就是class, object中的變數
* 方法就是class, object中的函式
* 有三種定義方法
    * 在class層級
    * 設定在class的`__init__`方法，實例化時定義屬性
    * 在object層級

```python
class Item:
    def __init__(self, name='', price='', quantity=0) -> None:
        self.name = name
        self.price = price
        self.quantity = quantity

    def multiply(self, x, y):
        return x * y

    def calculate_total_price(self):
        return self.price * self.quantity


# 不用屬性的方法運算
item1 = Item()
# object動態增加屬性
item1.name = 'Phone'
item1.price = 100
item1.quantity = 5
print(item1.multiply(item1.price, item1.quantity))

# 使用屬性的方法運算
item2 = Item('jimmy', 100, 1)
print(item2.calculate_total_price())

# object動態增加函式
item1.hello_world = lambda self = None: print("hello world")
item1.hello_world()
```

## class, object的屬性、方法使用範例
* class的屬性、方法不用實例化就可以讀取
* object可以使用class定義的屬性
    * object優先使用自定義屬性
    * object中找不到該屬性、方法就會往class去找
* `__dict__` 可以顯示所有屬性和方法的值


```Python
class Item:
    pay_rate = 0.8 # 打折

    def __init__(self, name: str, price: float, quantity=0) -> None:
        # 用assert檢查型態，當使用錯誤時就抱錯
        assert price >= 0, f'Price {price} is not great than or equal to zero'
        assert quantity >= 0, f'Quantity {quantity} is not great than or equal to zero'
        
        # assign to self object
        self.name = name
        self.price = price
        self.quantity = quantity

    def calculate_total_price(self):
        return self.price * self.quantity

    def apply_discount(self):
        self.price  = self.price * self.pay_rate

item1 = Item('jimmy', 100, 1)

print(Item.pay_rate)  # 屬性不用實例化就可以讀取
print(item1.pay_rate) # 如果instance 層級沒有該屬性就會往class層級找

print(Item.__dict__)  # All the attribute for Class level，pay_rate有
print(item1.__dict__)  # All the attribute for instance level，可以看到沒有pay_rate

# 用object method打折
item1.apply_discount()
print(item1.price)

# 用object method打折
Item.apply_discount(item1)
print(item1.price)

# 更改object屬性打折
item2 = Item('jimmy', 100, 1)
item2.pay_rate = 0.7
item2.apply_discount()
print(item2.price)

```

## 物件導向設計
* 優點
    1. 使程式碼的維護和擴充更容易
    2. 使人更容易閱讀理解程式碼邏輯
* 特性
    * 封裝 (encapsulation)
    * 抽象 (abstraction)
    * 繼承 (inheritance)
    * 多型 (polymorphism)

## 抽象 abstraction 和 封裝 encapsulation
* 抽象
    * 只關注object的數據，高層次抽象的概念，隱藏無關的細節
    * 比如修車去修車廠，只需要告訴車廠車哪裡壞掉了，不用關注車內部的細節
    * API使用無須知道實作細節
* 封裝
    * 隱藏程式實現細節、過程、數據，用戶只能使用的已定義的接口。
    * 封裝為抽象的實作
* 前雙底線 (`__double_leading_underscore`)的變數無法被物件取用
    * 封裝的過程可加入雙底線變數，讓外界無法使用
        * 如要取用，須改用`物件._類別名__變數名`讀取
        * Python無真正的private(私有成員)
```python
class Teams:
    def __init__(self, string: str) -> None:
        self.__string = string

    def __prepare_body(self):
        '''準備內容'''
        print(f'今天值日生是{self.__string}')
        return f'今天值日生是{self.__string}'
    
    def __send_http(self):
        '''發送HTTP到Teams server'''
        pass

    def send_teams(self):
        self.__prepare_body()
        self.__send_http()


this_teams = Teams('jimmy')
# teams傳送資訊邏輯都封裝到方法之中，使用者不需要知道其中的邏輯
this_teams.send_teams()

# 錯誤讀取
# this_teams.__prepare_body()
# 正確讀取方式
this_teams._Teams__prepare_body()
```

## 繼承 inheritance
* 繼承就是把一個class當作template複製出另一個class
    * 範例: 台灣土狗class繼承於狗的class
* child class 可以繼承 parent class的屬性和方法
    * 使用關鍵字super可以調用parent class的屬性和方法
* 多重繼承: 一個子class可以同時繼承多個父class
    * 範例: mix犬class繼承於多種狗的class


```Python
class A:
    def __init__(self, base_num=0):
        self.__base_num = base_num

    def add(self, x):
        self.__base_num = self.__base_num + x

    def print_base_num(self):
        print(self.__base_num)

class B:
    def print_test(self):
        print('test')

class C(A):
    def __init__(self, base_num=0):
        # 複寫__init__的同時，調用parent class的屬性和方法
        super().__init__(
            base_num
        )
        print('do something in C class')

    def add(self, x):
        super().add(x)
        print('do something in C add()')

class D(A, B):
    pass

this_num = C(1)
this_num.add(2)

this_num2 = D(0)
this_num2.add(1)
this_num2.print_test()

# 檢測繼承關係
print(issubclass(D, D))
print(issubclass(D, B))
print(issubclass(D, C))
```

## 多型 polymorphism
* 同一個介面或方法(Method)可以有多個實作型態。
    * `ABC`強迫class只能被繼承
    * `abstractmethod`強迫繼承的object要有自定義的方法

```python
from abc import ABC, abstractmethod
# 登入抽象類別
class Login(ABC):
    @abstractmethod
    def login(self):
        pass

# Facebook登入機制
class FacebookLogin(Login):
    def login(self):
        print("Facebook login implementation.")

#Google登入機制
class GoogleLogin(Login):
    def login(self):
        print("Google login implementation.")

def website_login(this_object):
    print("Do something")
    this_object.login()

fb = FacebookLogin()
fb.login()


google = GoogleLogin()
google.login()

website_login(fb)
website_login(google)

```

## 鴨子型別(duck typing)
* 動態型別的一種風格，一個物件有效的語意，不是由繼承自特定的類或實現特定的介面，而是由"當前方法和屬性的集合"決定
    * 關注於物件的方法，而非物件本身
* `「當看到一隻鳥走起來像鴨子、游泳起來像鴨子、叫起來也像鴨子，那麼這隻鳥就可以被稱為鴨子。」`


```python
class Duck:
    def quack(self):
        print("這鴨子呱呱叫")

    def feathers(self):
        print("這鴨子擁有白色和灰色的羽毛")

class Person:
    def quack(self):
        print("這人正在模仿鴨子")

    def feathers(self):
        print("這人在地上拿起1根羽毛然後給其他人看")

def in_the_forest(duck):
    # 需要通過鴨子測試，帶入的object需要有quack、feathers方法，才能確定是鴨子，能使用in_the_forest
    duck.quack()
    duck.feathers()


donald = Duck()
john = Person()
in_the_forest(donald)
in_the_forest(john)
```

## 多型在Python的應用
* `__len__`:str和list都有提供此方法顯示當前長度
    * 調用`len()`都可以顯示長度，不用處理資料型態
    * 同理`+`調用`__add__`, `==`調用`__eq__`, `!=`調用`__ne__`
```python
x = '123'
x.__len__()
y = [1,2,3,4]
y.__len__()
```

* `__repr__`: 客製化顯示，用在Python console中
* `__str__`: 客製化顯示，用在print中

```python
# 用class模擬成向量
class Vector:
    def __init__(self, d):
        self._coords = [0] * d

    def __len__(self):
        #len(object)
        return len(self._coords)

    def __getitem__(self, j):
        # 讓object可以用index取值，如object[1]
        return self._coords[j]

    def __setitem__(self, j, val):
        # 讓object可以用index賦值，如object[1]=2
        self._coords[j] = val

    def __add__(self, other):
        # object1 + object2
        if len(self) != len(other):
            raise ValueError('dimensions must agree')
        result = Vector(len(self))
        for j in range(len(self)):
            result[j] = self[j] + other[j]
        return result

    def __eq__(self, other):
        # object1 == object2
        return self._coords == other._coords

    def __ne__(self, other):
        # object1 != object2
        return not self == other

    def __str__(self):
        # print(object)
        return f's < {str(self._coords)[1:-1]} >'

    def __repr__(self):
        # python console顯示
        return f'r < {str(self._coords)[1:-1]} >'

v = Vector(3)
print(v)
v[1] = 3
v[-1] = 4
print(v[1])
u = Vector(3)
u[0] = 1
u[1] = -2
print(v, u)
print(v + u)
```


## classmethod / staticmethod 裝飾器
* 語法糖，可以釐清method的使用時機
    * 通常直接配class使用，不會在instance使用
* classmethod 會帶入class當第一個參數
    * 當method跟實例化的instance無關的時，可以使用
* staticmethod 不會帶入預設第一個參數
    * 當method跟其他attribute和method都無關時可使用

```python
class Item:
    def test_method(self, string):
        return self, string

    @classmethod
    def test_classmethod(cls, string):
        return cls, string
    
    @staticmethod
    def is_integer(num):
        if isinstance(num, float):
            return num.is_integer()
        elif isinstance(num, int):
            return True
        else:
            return False

# 測試一般method
print(Item.test_method(None, 'test'))
# 測試class method
print(Item.test_classmethod('test'))
# 測試static method
print(Item.is_integer(7.0))


```

## 客製化屬性的取值和賦值
* getter和setter為class的語法糖
    * 把method當作屬性用，用來客製屬性取值和賦值
* getter的語法為@property
    * 可以讓方法的不用()就可以呼叫，用法跟屬性一樣
* setter的語法為@<getter的方法名>.setter
    * 可以賦值給class方法，用法跟屬性一樣

```python
class User:
    def __init__(self, name=None):
        self._name = name

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

this_user = User(' jimmy ')

# get name
print(f'print name [{this_user.name}]')

# print('set driver')
this_user.name = 'other user'

# get name
print(f'print name [{this_user.name}]')
```


## 巢狀class
* class中有class
    * 可以有n層
* 能提高執行時間、好維護、封裝子class

```python
class Dept:
    def __init__(self, dname):
        self.dname = dname
    class Prof:
        def __init__(self,pname):
            self.pname = pname
            
math = Dept("Mathematics")
mathprof = Dept.Prof("Mark")

print(math.dname)
print(mathprof.pname)
```

## ref
* [Object Oriented Programming with Python - Full Course for Beginners](https://www.youtube.com/watch?v=Ej_02ICOIgs)
* [[Python 基礎教學] 一切皆為物件，到底什麼是物件 Object ?](https://www.maxlist.xyz/2021/01/11/python-object/)
* [[Python教學] 物件導向-Class類的封裝/繼承/多型](https://www.maxlist.xyz/2019/12/12/python-oop/)
* [[Python物件導向]淺談Python類別(Class)](https://www.learncodewithmike.com/2020/01/python-class.html)
* [抽象與封裝的區別](https://www.vsdiffer.com/abstraction-vs-encapsulation.html)
* [[Python物件導向]Python多型(Polymorphism)實用教學](https://www.learncodewithmike.com/2020/01/python-polymorphism.html)
* [鴨子型別](https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B)
* [Why do Python classes inherit object?](https://stackoverflow.com/questions/4015417/why-do-python-classes-inherit-object)
* [Python 中的巢狀類](https://www.delftstack.com/zh-tw/howto/python/nested-class-in-python/)