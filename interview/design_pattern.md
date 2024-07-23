# design pattern

## 1. 創建型設計模式（Creational Design Patterns）
> 這類模式主要關注對象的創建方式，旨在隱藏對象創建的複雜性，並提高創建過程的靈活性。

* 工廠模式（Factory Pattern）：提供一個創建對象的接口，而不是具體的類。由子類決定要實例化的類。
  * 常考
* 抽象工廠模式（Abstract Factory Pattern）：提供一個創建相關或依賴對象的接口，而不需要指定具體類。
* 單例模式（Singleton Pattern）：確保一個類只有一個實例，並提供全局訪問點。
  * 常考
* 建造者模式（Builder Pattern）：將一個複雜對象的構建過程與其表示分離，使得同樣的構建過程可以創建不同的表示。
* 原型模式（Prototype Pattern）：使用原型實例指定創建對象的種類，並通過拷貝這些原型創建新的對象。

## 2. 結構型設計模式（Structural Design Patterns）
> 這類模式關注類和對象的組合，旨在確保系統各部分之間的結構更加靈活和高效。

* 適配器模式（Adapter Pattern）：將一個類的接口轉換成客戶希望的另一個接口，使得原本由於接口不兼容而不能一起工作的類可以一起工作。
  * 常考
* 裝飾者模式（Decorator Pattern）：動態地給對象添加一些額外的職責。
  * 常考
* 代理模式（Proxy Pattern）：為其他對象提供一個代理以控制對這個對象的訪問。
* 外觀模式（Facade Pattern）：為子系統中的一組接口提供一個一致的接口，使得子系統更容易使用。
* 享元模式（Flyweight Pattern）：通過共享技術來有效地支持大量細粒度的對象。
* 組合模式（Composite Pattern）：將對象組合成樹形結構以表示部分-整體的層次結構，使得客戶可以一致地處理單個對象和對象組合。

## 3. 行為型設計模式（Behavioral Design Patterns）
> 這類模式主要關注對象之間的通信和算法，旨在使對象間的交互更靈活和易於擴展。

* 策略模式（Strategy Pattern）：定義一系列算法，並將每一個算法封裝起來，使得它們可以互換。
  * 常考
* 觀察者模式（Observer Pattern）：定義對象間的一對多依賴關係，使得每當一個對象改變狀態，則所有依賴於它的對象都會得到通知並自動更新。
  * 常考
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

### 觀察者模式 （Observer Pattern
* 定義了一種一對多的依賴關係，使得一個對象的狀態發生改變時，所有依賴於它的對象都會得到通知並自動更新。
* 這種模式常用於實現事件處理系統，例如 GUI 事件處理、訂閱-發布系統等。
* 觀察者模式的結構，包括以下主要角色
  * Subject（主體）：主體維護一個觀察者列表，並在自身狀態發生改變時通知所有觀察者。
  * Observer（觀察者）：觀察者對主體的變化做出反應，更新自身狀態。
  * ConcreteSubject（具體主體）：具體的主體實現。
  * ConcreteObserver（具體觀察者）：具體的觀察者實現。
``` python
class Subject:
    '''
    主體類 Subject 包含一個觀察者列表 _observers，
    並提供 attach 和 detach 方法來添加或移除觀察者。
    notify 方法負責通知所有觀察者狀態的改變。
    '''
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

class Observer:
    # 觀察者接口 Observer 定義了一個抽象方法 update，所有具體觀察者必須實現這個方法。
    def update(self, message):
        raise NotImplementedError("Subclass must implement abstract method")

class ConcreteSubject(Subject):
    '''
    具體主體類 ConcreteSubject 繼承自 Subject，並維護自身的狀態 _state。當狀態改變時，通過 state 屬性設置器通知所有觀察者。
    '''
    def __init__(self):
        super().__init__()
        self._state = None

    @property
    def state(self):
        return self._state

    @state.setter
    def state(self, value):
        self._state = value
        self.notify(value)

class ConcreteObserver(Observer):
    '''
    具體觀察者類 ConcreteObserver 實現了 Observer 接口的 update 方法，並在收到通知時進行處理。
    '''
    def __init__(self, name):
        self._name = name

    def update(self, message):
        print(f"{self._name} received message: {message}")

if __name__ == "__main__":

    # 創建一個具體主體和兩個具體觀察者
    subject = ConcreteSubject()
    observer1 = ConcreteObserver("Observer 1")
    observer2 = ConcreteObserver("Observer 2")

    # 將觀察者附加到主體上
    subject.attach(observer1)
    subject.attach(observer2)

    # 移除一個觀察者後，再次改變狀態，只有剩下的觀察者會收到通知
    subject.state = "State has changed"  # Both observers will be notified
    subject.detach(observer1)
    subject.state = "Another state change"  # Only Observer 2 will be notified

```
### 策略模式（Strategy Pattern
* 策略模式（Strategy Pattern）是一種行為設計模式，它定義了一系列算法，並將每個算法封裝起來，使它們可以互換。
* 策略模式讓算法的變化不會影響到使用算法的客戶端，使得算法可以獨立於使用它的客戶端而變化。
* 策略模式的優點
  * 開閉原則：策略模式符合開閉原則，允許在不修改現有代碼的情況下新增策略。
  * 可替換性：不同的策略可以互換，方便在運行時動態切換算法。
  * 獨立變化：策略模式使得算法可以獨立於使用它們的上下文變化，減少了類之間的耦合。
* 應用場景
  * 算法的多樣性：需要使用不同算法來解決同一個問題時，例如不同的排序算法、壓縮算法等。
  * 動態決策：根據運行時條件動態選擇算法，例如支付方式選擇、路由選擇等。
* 策略模式包括以下主要角色
  * Context（上下文）：維護一個 Strategy 類的引用，用於設定和切換不同的策略。
  * Strategy（策略接口）：定義一個接口，所有具體策略都需要實現這個接口。
  * ConcreteStrategy（具體策略類）：實現策略接口的具體算法。

``` python
class Strategy:
    '''
    策略接口 Strategy 定義了一個抽象方法 execute，所有具體策略必須實現這個方法。
    '''
    def execute(self, data):
        raise NotImplementedError("Subclass must implement abstract method")

'''
具體策略類 ConcreteStrategyA 和 ConcreteStrategyB 實現了 Strategy 接口的 execute 方法，分別提供了不同的排序算法。
'''
class ConcreteStrategyA(Strategy):
    def execute(self, data):
        return sorted(data)

class ConcreteStrategyB(Strategy):
    def execute(self, data):
        return sorted(data, reverse=True)


class Context:
    '''
    上下文類 Context 維護一個策略引用 _strategy，並提供 set_strategy 方法來設置不同的策略。
    execute_strategy 方法調用當前策略的 execute 方法來執行算法。-
    '''
    def __init__(self, strategy: Strategy):
        self._strategy = strategy

    def set_strategy(self, strategy: Strategy):
        self._strategy = strategy

    def execute_strategy(self, data):
        return self._strategy.execute(data)


if __name__ == "__main__":
    data = [5, 2, 9, 1, 5, 6]

    # 創建一個上下文並設置初始策略為 ConcreteStrategyA，
    context = Context(ConcreteStrategyA())
    # 調用 execute_strategy 方法來執行排序算法。
    print("Ascending Sort:", context.execute_strategy(data))  # [1, 2, 5, 5, 6, 9]

    # 然後切換策略為 ConcreteStrategyB
    context.set_strategy(ConcreteStrategyB())
    # 再次調用 execute_strategy 方法來執行另一種排序算法。
    print("Descending Sort:", context.execute_strategy(data))  # [9, 6, 5, 5, 2, 1]

```
### 裝飾者模式 （Decorator Pattern）
* 裝飾者模式（Decorator Pattern）是一種結構型設計模式，它允許向一個對象動態地添加新的行為，而不改變其原有的結構。
* 裝飾者模式提供了一個靈活的替代繼承的方法，通過使用對象組合來實現功能擴展。
* 裝飾者模式的優點 
  * 開閉原則：可以在不修改現有代碼的情況下，向對象添加新的功能。
  * 可組合性：可以使用多個不同的裝飾者來組合出各種不同的行為。
  * 單一責任原則：可以將功能劃分到不同的類中，讓每個類只關注一個功能。
* 應用場景
  * 需要向對象動態地添加責任，且不影響其他對象的責任。
  * 需要給一個類的多種變體增加功能，且這些變體可以靈活組合。
* 裝飾者模式包括以下主要角色
  * Component（組件）：定義一個對象接口，可以動態地添加責任。
  * ConcreteComponent（具體組件）：實現組件接口的基本功能，裝飾者可以向其添加額外的功能。
  * Decorator（裝飾者）：維持一個指向組件對象的引用，並實現組件接口，通過該引用來調用被裝飾的對象。
  * ConcreteDecorator（具體裝飾者）：實現具體的裝飾功能，可以在被裝飾的對象調用前後增加行為。
``` python
class Component:
    """
    組件接口，定義了一個 operation 方法，裝飾者和具體組件都需要實現這個接口。
    """
    def operation(self):
        raise NotImplementedError("Subclass must implement abstract method")

class ConcreteComponent(Component):
    """
    具體組件實現了 Component 接口的基本功能，裝飾者可以向其添加額外-的功能。
    """
    def operation(self):
        return "ConcreteComponent"

class Decorator(Component):
    """
    裝飾者維持一個指向組件對象的引用，並實現組件接口，通過該引用來調用被裝飾的對象。
    """
    def __init__(self, component: Component):
        self._component = component

    def operation(self):
        return self._component.operation()

class ConcreteDecoratorA(Decorator):
    """
    具體裝飾者實現具體的裝飾功能，可以在被裝飾的對象調用前後增加行為。
    """
    def operation(self):
        return f"ConcreteDecoratorA({self._component.operation()})"

class ConcreteDecoratorB(Decorator):
    """
    具體裝飾者實現具體的裝飾功能，可以在被裝飾的對象調用前後增加行為。
    """
    def operation(self):
        return f"ConcreteDecoratorB({self._component.operation()})"

if __name__ == "__main__":
    # 創建一個具體組件
    component = ConcreteComponent()
    print("Original:", component.operation())  # Output: ConcreteComponent

    # 使用 ConcreteDecoratorA 來裝飾具體組件
    decorated_component_a = ConcreteDecoratorA(component)
    print("Decorated with A:", decorated_component_a.operation())  # Output: ConcreteDecoratorA(ConcreteComponent)

    # 使用 ConcreteDecoratorB 來裝飾具體組件
    decorated_component_b = ConcreteDecoratorB(component)
    print("Decorated with B:", decorated_component_b.operation())  # Output: ConcreteDecoratorB(ConcreteComponent)

    # 多重裝飾
    decorated_component_ab = ConcreteDecoratorB(decorated_component_a)
    print("Decorated with A and B:", decorated_component_ab.operation())  # Output: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))

```
### 適配器模式（Adapter Pattern)
* 適配器模式（Adapter Pattern）將一個類的接口轉換成客戶端期望的另一個接口，使得原本由於接口不兼容而不能一起工作的類可以一起工作。
  * 通過創建一個包裝對象，來改變已有對象的接口，從而使這些對象能夠兼容。
* 適配器模式的優點
  * 單一責任原則：不改變原有類的情況下，通過適配器實現兼容性，符合單一責任原則。
  * 開閉原則：可以在不修改原有代碼的情況下引入新接口，使系統更具靈活性。
  * 提高了類的重用性：通過適配器可以讓不相關的類一起工作，增加了類的重用性。
* 應用場景
  * 現有類的接口與需求不匹配，無法直接使用。
  * 需要將現有類集成到一個無法修改其源代碼的框架中。
  * 想要重用一些現有的類，但這些類的接口與目標接口不兼容。
* 適配器模式包括以下主要角色
  * Target（目標接口）：定義客戶端期望的接口。
  * Adaptee（適配者）：定義一個已經存在的接口，這個接口需要被適配。
  * Adapter（適配器）：實現目標接口，並將適配者的接口轉換為目標接口。

``` python
class Target:
    """
    目標接口，定義客戶端期望的接口。
    """
    def request(self):
        raise NotImplementedError("Subclass must implement abstract method")

class Adaptee:
    """
    適配者，定義了一個已經存在的接口，這個接口需要被適配。
    這裡的 specific_request 是需要被轉換的方法
    """
    def specific_request(self):
        return "Adaptee"

class Adapter(Target):
    """
    適配器實現目標接口，並將適配者的接口轉換為目標接口。
    Adapter 類實現了 Target 接口，並持有一個 Adaptee 類的引用。
    在 request 方法中，適配器調用了 Adaptee 類的 specific_request 方法，實現了接口的轉換。
    """
    def __init__(self, adaptee: Adaptee):
        self._adaptee = adaptee

    def request(self):
        return self._adaptee.specific_request()

if __name__ == "__main__":
    '''
    創建一個 Adaptee 的實例，並通過 Adapter 來使用它。
    客戶端代碼可以透明地使用 Adapter 來訪問 Adaptee 的功能，而不需要關心其內部的接口轉換。
    '''
    adaptee = Adaptee()
    adapter = Adapter(adaptee)
    
    # 客戶端使用目標接口的實例進行操作
    print("Using Adapter:", adapter.request())  # Output: Adaptee

```

## ref
* [軟體工程師為什麼要學 Design Pattern? | 物件導向 | SOLID | 工程師 Nic](https://www.youtube.com/watch?v=pkm5jQfnKGs)