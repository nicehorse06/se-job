# 什麼是 Generator?
* Generator 是一種特殊的函數，它不會立即執行並返回結果，而是返回一個可以按需計算值的迭代器。
* 每次調用 generator 的 __next__() 方法時，它會執行到 yield 關鍵字並返回當前的值，然後暫停執行，等待下一次調用。

# Generator 的優點
* 節省內存: 與一次性創建整個列表相比，generator 僅在需要時生成一個值，這對於處理大數據非常有用。
* 延遲計算: Generator 允許延遲計算，即直到需要時才生成數據，這提高了效率。
* 易於實現自定義迭代邏輯: 通過使用 yield，可以輕鬆地控制生成值的順序和邏輯。

# 範例
``` python
def my_generator():
    yield 1  # 第一次調用 next() 時返回 1
    yield 2  # 第二次調用 next() 時返回 2
    yield 3  # 第三次調用 next() 時返回 3

# 創建 generator 對象
gen = my_generator()

# 使用 next() 獲取 generator 的值
print(next(gen))  # 輸出: 1
print(next(gen))  # 輸出: 2
print(next(gen))  # 輸出: 3

# 或者使用 for 迴圈遍歷
for value in my_generator():
    print(value)
```

# Generator Expression
* Generator expression 是生成器的簡單語法形式，類似於列表生成式 (list comprehension)，但使用 () 而不是 []。例如：

``` python
# list Expression
gen_exp_by_list = [x * x for x in range(10)]
# [0,1,4,16,25,36,49,64,81]
print(a)

# Generator Expression
gen_exp = (x * x for x in range(10))
# 跑出Generator物件
print(gen_exp)
print(next(gen_exp))  # 輸出: 0
print(next(gen_exp))  # 輸出: 1
```

# yield 和 return混用
* Generator不會返回return的值，會直接產生Generator結束的StopIteration錯誤
  * return返回的值可在捕捉異常中獲取

``` python
def countdown(n):
    while n > 0:
        yield n  # 每次迭代返回 n 的當前值
        n -= 1
    return "Countdown finished!"  # 在倒數結束後，返回一個訊息

# 創建 generator
gen = countdown(3)

# 使用 next() 迭代生成器
try:
    print(next(gen))  # 輸出: 3
    print(next(gen))  # 輸出: 2
    print(next(gen))  # 輸出: 1
    print(next(gen))  # 觸發 StopIteration 異常，異常的值是 "Countdown finished!"
except StopIteration as e:
    print(e.value)  # 輸出: Countdown finished!
```


# send()、 throw() 和 close() 方法
> todo more note
* send(value): 將值發送到生成器，並使其在暫停的地方繼續運行。可以用來動態改變生成器的行為。
* throw(type, value=None, traceback=None): 在生成器函數內部拋出異常，允許你在生成器內部處理異常。
* close(): 停止生成器，並引發 GeneratorExit 異常，終止生成器的迭代。

# 生成器與迭代器的區別
* 生成器是用 yield 關鍵字創建的特定類型的迭代器。
* 迭代器則是實現了 __iter__() 和 __next__() 方法的對象，可以用來遍歷元素。
``` python
class MyIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):* 
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        self.current += 1
        return self.current - 1

iterator = MyIterator(0, 5)
for num in iterator:
    print(num)  # 依次輸出 0, 1, 2, 3, 4

```

# Chaining Generators
* 通過將生成器鏈接起來，可以將多個數據生成步驟分解為多個生成器。
* 這個概念常見於處理流水線數據處理的情境中。

``` python
def first_gen():
    yield from range(3)

def second_gen():
    yield from range(3, 6)

def combined_gen():
    yield from first_gen()
    yield from second_gen()

for value in combined_gen():
    print(value)  # 輸出 0, 1, 2, 3, 4, 5
```

# 協程與生成器的區別
* 協程是 Python 中一種更高級的概念，通常與 async 和 await 一起使用來實現異步編程。
* 生成器可以被視為協程的基礎，但協程允許更加靈活的控制流，包括異步操作。