# 全局解釋器鎖（英語：Global Interpreter Lock，縮寫GIL）


* TODO 還要再整理

* 避免在在執行 multiple threads 時，CPython memory 會有 thread-safe 的問題，所以在 Python Source Code 直譯成 bytecodes 時增加 GIL (Global Interpreter Lock) 的全域鎖。
    * 也就是說 GIL 可以用於確保在 Python 運行時僅運行一個 Thread 來保證 Thread-safe。
* 是語言解釋器用於同步執行緒的一種機制
    * 任何時刻僅有一個執行緒在執行。
    * 即便在多核心處理器上，使用 GIL 的解釋器也只允許同一時間執行一個執行緒
* CPython的執行緒是作業系統的原生執行緒
    * GIL不是Python特性，是CPython的實現
* 一個Python解釋器進程內有一個主執行緒，以及多個用戶程序的執行執行緒。即便使用多核心CPU平台，由於GIL的存在，也將禁止多執行緒的並行執行
* Python解釋器進程內的多執行緒是以協作多任務方式執行。
    * 當一個執行緒遇到I/O任務時，將釋放GIL。
* 為什麼會有GIL
* 什麼是 thread-safe？
    * 有GIL的原因是為了保證thread-safe
    * 當多執行緒同時運行，並對同一資源進行讀寫操作的修改時，必須保證其執行緒與執行緒間不會發生衝突，和數據修改不會發生錯誤，稱為 thread-safe。
    * 而了解了 thread 的切換時機和 thread-safe 後，如何避免執行緒執行到一半就被其他執行緒，就要討論原子操作。
* Python的多线程在多核CPU上，只对于IO密集型计算产生正面效果；
    * 而当有至少有一个CPU密集型线程存在，那么多线程效率会由于GIL而大幅下降。
* 因为GIL的存在，只有IO Bound场景下得多线程会得到较好的性能
    * GIL就是限制Python同一時間只能有一個thread運算,
    * 多個thread還是會快一點是因為第一個thread在IO時會釋放給第二個thread
    * 可以使用 Multiprocess library & Celery plus Broker 解決問題


## ref

* [全局解釋器鎖](https://zh.wikipedia.org/wiki/%E5%85%A8%E5%B1%80%E8%A7%A3%E9%87%8A%E5%99%A8%E9%94%81)\
* [Python的GIL是什么鬼，多线程性能究竟如何](http://cenalulu.github.io/python/gil-in-python/)
* [global interpreter lock](https://wiki.python.org/moin/GlobalInterpreterLock)
* [The Python GIL (Global Interpreter Lock)](https://python.land/python-concurrency/the-python-gil)
* [【Python教學】淺談 GIL & Thread-safe & Atomic operation](https://www.maxlist.xyz/2020/03/15/gil-thread-safe-atomic/)
* [Python threading 5 不一定有效率 GIL (多线程 教学教程tutorial)](https://www.youtube.com/watch?v=2511-7VR4nQ)