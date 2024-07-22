# design pattern

## 1. 創建型設計模式（Creational Design Patterns）
> 這類模式主要關注對象的創建方式，旨在隱藏對象創建的複雜性，並提高創建過程的靈活性。

* 工廠模式（Factory Pattern）：提供一個創建對象的接口，而不是具體的類。由子類決定要實例化的類。
* 抽象工廠模式（Abstract Factory Pattern）：提供一個創建相關或依賴對象的接口，而不需要指定具體類。
* 單例模式（Singleton Pattern）：確保一個類只有一個實例，並提供全局訪問點。
* 建造者模式（Builder Pattern）：將一個複雜對象的構建過程與其表示分離，使得同樣的構建過程可以創建不同的表示。
* 原型模式（Prototype Pattern）：使用原型實例指定創建對象的種類，並通過拷貝這些原型創建新的對象。

## 2. 結構型設計模式（Structural Design Patterns）
> 這類模式關注類和對象的組合，旨在確保系統各部分之間的結構更加靈活和高效。

* 適配器模式（Adapter Pattern）：將一個類的接口轉換成客戶希望的另一個接口，使得原本由於接口不兼容而不能一起工作的類可以一起工作。
* 裝飾者模式（Decorator Pattern）：動態地給對象添加一些額外的職責。
* 代理模式（Proxy Pattern）：為其他對象提供一個代理以控制對這個對象的訪問。
* 外觀模式（Facade Pattern）：為子系統中的一組接口提供一個一致的接口，使得子系統更容易使用。
* 享元模式（Flyweight Pattern）：通過共享技術來有效地支持大量細粒度的對象。
* 組合模式（Composite Pattern）：將對象組合成樹形結構以表示部分-整體的層次結構，使得客戶可以一致地處理單個對象和對象組合。

## 3. 行為型設計模式（Behavioral Design Patterns）
> 這類模式主要關注對象之間的通信和算法，旨在使對象間的交互更靈活和易於擴展。

* 策略模式（Strategy Pattern）：定義一系列算法，並將每一個算法封裝起來，使得它們可以互換。
* 觀察者模式（Observer Pattern）：定義對象間的一對多依賴關係，使得每當一個對象改變狀態，則所有依賴於它的對象都會得到通知並自動更新。
* 命令模式（Command Pattern）：將請求封裝成對象，使得可以用不同的請求對客戶參數化，對請求排隊或記錄請求日誌，並支持可撤銷操作。
* 迭代器模式（Iterator Pattern）：提供一種方法順序訪問一個聚合對象中的各個元素，而不暴露該對象的內部表示。
* 模板方法模式（Template Method Pattern）：定義一個操作中的算法的骨架，將一些步驟延遲到子類中，使得子類可以不改變算法結構即可重新定義該算法的某些步驟。
* 狀態模式（State Pattern）：允許一個對象在其內部狀態改變時改變其行為，看起來像改變了其類。
* 責任鏈模式（Chain of Responsibility Pattern）：使多個對象都有機會處理請求，從而避免請求的發送者和接收者之間的耦合。將這些對象連成一條鏈，並沿著這條鏈傳遞請求，直到有對象處理它為止。
* 中介者模式（Mediator Pattern）：用一個中介對象來封裝一系列對象的交互。中介者使各對象不需要顯式地相互引用，從而使其耦合鬆散，而且可以獨立地改變它們之間的交互。


## 工廠模式（Factory Pattern）
* 原本應該直接使用繼承後的class來實例化instance
* Factory Pattern會使用工廠class加上參數來實做instance
``` python
# 定義一個基礎類，所有動物類型都將繼承自這個基礎類
class Animal:
    def speak(self):
        raise NotImplementedError("Subclass must implement abstract method")

# 定義具體的動物類型
class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# 定義一個工廠來創建動物對象
class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else:
            raise ValueError("Unknown animal type")

# 使用工廠來創建動物對象
if __name__ == "__main__":
    factory = AnimalFactory()

    dog = factory.create_animal("dog")
    print(f"Dog: {dog.speak()}")  # Dog: Woof!

    cat = factory.create_animal("cat")
    print(f"Cat: {cat.speak()}")  # Cat: Meow!

```

## 單例模式（Singleton Pattern）
* 使用場景
  * 日誌記錄：確保所有的日誌都被寫入同一個文件。
  * 配置管理：在整個應用程序中共享配置信息。
  * 數據庫連接池：確保只有一個數據庫連接池實例，以便管理連接。
### 方法一：使用類變量
``` python
class Singleton:
    # 自定義類變量，用來存儲單例實例
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            # 只要實例過一次就會存起來，之後都只會返回cls._instance
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
        return cls._instance

# 測試單例模式
if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    print(s1 is s2)  # True
    print(id(s1), id(s2))  # 相同的id

```
### 方法二：使用裝飾器
``` python
def singleton(cls):
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance

@singleton
class Singleton:
    pass

# 測試單例模式
if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    print(s1 is s2)  # True
    print(id(s1), id(s2))  # 相同的id

```

### 方法三：使用元類
```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(SingletonMeta, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    pass

# 測試單例模式
if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    print(s1 is s2)  # True
    print(id(s1), id(s2))  # 相同的id

```

### 觀察者模式 （Observer Pattern）
### 策略模式（Strategy Pattern）
### 裝飾者模式 （Decorator Pattern）
### 適配器模式（Adapter Pattern
