# 全局解釋器鎖（英語：Global Interpreter Lock，縮寫GIL）


## 為什麼有 GIL？
* GIL 的存在是為了解決 Python 的內存管理問題，特別是 CPython 中的引用計數
  * 引用計數與GC有關，multi thread的racing condition，會讓引數不好管理
* 當多執行緒同時運行，並對同一資源進行讀寫操作的修改時，必須保證其執行緒與執行緒間不會發生衝突，和數據修改不會發生錯誤，稱為 thread-safe。
  
## GIL 的影響
* GIL並不是限制一個進程只能有一個執行緒，而是限制同一時刻只有一個執行緒在執行 Python 的字節碼。
* 在一個進程中，可以創建多個執行緒（threads），這些執行緒都可以在不同的時間執行。
* 由於 GIL 的存在，即使有多個執行緒，同一時刻只有一個執行緒可以獲得 GIL 並運行 Python 的字節碼。


### 多執行緒的性能限制
* GIL 對 CPU 密集型多執行緒程序有明顯的性能影響。
* 即使在多核處理器上，由於 GIL 的存在，只有一個執行緒能夠執行 Python 字節碼，這限制了多執行緒程序充分利用多核 CPU 的能力。

### I/O 密集型程序的表現較好
* 在 I/O 密集型程序中，例如處理網絡請求、文件讀寫，因為執行緒會經常進行等待操作（如等待 I/O 完成），此時 GIL 會釋放，允許其他執行緒執行。這使得多執行緒在 I/O 密集型程序中可以提升效能。

## 解決 GIL 限制的方法
### 多進程（multiprocessing）
* 多進程技術不受 GIL 的影響，因為每個進程都有自己的 Python 解釋器和 GIL，因此可以在多核處理器上真正並行執行任務。這是解決 CPU 密集型任務時常用的方法。

### 使用其他 Python 實現
* 某些 Python 的替代實現，如 Jython（基於 Java）、IronPython（基於 .NET），以及 PyPy，它們不使用 GIL 或有不同的內存管理策略，因此可能不受 GIL 的限制。

### 使用協程（asyncio）
* 對於 I/O 密集型任務，使用協程（async/await）的非同步編程方式可以避免 GIL 的影響，因為協程不需要進行執行緒切換。

### Celery

## 多執行緒 原理
* 當一個執行緒遇到I/O任務時，將釋放GIL。


## ref
* [全局解釋器鎖](https://zh.wikipedia.org/wiki/%E5%85%A8%E5%B1%80%E8%A7%A3%E9%87%8A%E5%99%A8%E9%94%81)\
* [Python的GIL是什么鬼，多线程性能究竟如何](http://cenalulu.github.io/python/gil-in-python/)
* [global interpreter lock](https://wiki.python.org/moin/GlobalInterpreterLock)
* [The Python GIL (Global Interpreter Lock)](https://python.land/python-concurrency/the-python-gil)
* [【Python教學】淺談 GIL & Thread-safe & Atomic operation](https://www.maxlist.xyz/2020/03/15/gil-thread-safe-atomic/)
* [Python threading 5 不一定有效率 GIL (多线程 教学教程tutorial)](https://www.youtube.com/watch?v=2511-7VR4nQ)
* [【python】天使还是魔鬼？GIL的前世今生。一期视频全面了解GIL！](https://www.youtube.com/watch?v=XjBsk8JGHhQ)