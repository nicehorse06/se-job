# python multi process/thread/Coroutine

## todo
Coroutine 和 Thread 的區別：
協程是協作式的異步任務，更適合 I/O 密集型操作。
線程是搶占式的同步任務，更適合 CPU 密集型操作。



* 線程是同步的
  * 雖然線程允許多個任務並發執行，但它們的運行是同步的
  * 同時執行：多個線程可以同時運行在多個處理器核心上，這實現了真正的並行處理。
* 搶占式多任務
  * 搶占式多任務意味著操作系統可以在任意時刻打斷一個線程的執行，並切換到另一個線程。
  * 線程調度：操作系統內核使用調度算法來決定何時切換線程，以確保所有線程都能得到執行機會。
  * 這種搶占式調度可以在任何時間點發生，無論線程是否準備好切換。
* 上下文切換開銷較高
  * 上下文切換是指操作系統從一個線程切換到另一個線程的過程。
  * 過程包括保存當前線程的狀態（如 CPU 寄存器、程序計數器等），並加載下一個線程的狀態。
  * thread且換涉及OS與硬體操作，因此開銷較Coroutine高
  * 協程切換通常只需要保存和恢復少量的應用層狀態，而線程切換需要進行完整的 CPU 狀態保存和恢復，這增加了系統開銷。


## CPU密集型任務時，可以使用多進程、多線程或單個線程來執行。這三種方法各有優缺點
### 單個線程 (Single Thread):
* 優點
  * 編程簡單，沒有同步問題
  * 不需要處理進程間通信。
* 缺點
  * 無法充分利用多核CPU，因為單個線程在任何時間點只能在一個CPU核心上執行。
### 多線程 (Multithreading):
* 優點
  * 對於I/O密集型任務（例如網絡請求或文件讀寫）有顯著的性能提升，因為它可以在I/O操作等待時切換線程繼續其他任務。
  * 相比多進程，線程間共享內存，通信成本低。
* 缺點
  * ython的GIL（全局解釋器鎖）限制了多線程在CPU密集型任務中的效果，因為同一時間只能有一個線程在執行Python字節碼。
  * 複雜的同步問題，可能會引發死鎖和競態條件。
### 多進程 (Multiprocessing)
* 優點
  * 能夠充分利用多核CPU，因為每個進程都有自己的Python解釋器和GIL，可以真正並行地執行CPU密集型任務。
  * 獨立的進程間不會共享內存，減少了同步問題。
* 缺點
  * 創建進程的開銷較大，尤其在Windows系統上
  * 進程間通信（IPC）相對複雜且開銷大（例如使用multiprocessing.Queue或multiprocessing.Pipe）。
### 協程 (Coroutines)
* 優點
  * 非常高效的I/O操作，因為協程幾乎沒有上下文切換的開銷
  * 可以處理大量的並發I/O操作，性能表現優越
  * 代碼相對簡潔，容易讀寫和維護
* 缺點
  * 不適合CPU密集型任務，因為它並不能真正並行執行計算任務
  * 需要重寫代碼以支持async/await語法

## 性能測試與比較
* 單個線程: 適合簡單的任務，不需要高性能。
* 多線程: 適合I/O密集型任務，受GIL限制，不建議用於CPU密集型任務。
* 多進程: 適合CPU密集型任務，可以充分利用多核CPU的性能。
* 協程: 非常適合I/O密集型任務，但不適合CPU密集型任務。

## 選擇建議
* I/O密集型任務: 使用協程或多線程來提高性能和響應速度。協程在大規模I/O操作時尤其高效。
* CPU密集型任務: 使用多進程來充分利用多核CPU，避免GIL的限制。

## I/O密集型任務的選擇
### 選擇協程
* 當需要處理大量並發I/O操作，並且可以使用支持異步的庫時，協程是更好的選擇。協程的低開銷和高效資源管理使其在處理大量I/O操作時性能優越。
* 如果有異步I/O就使用，異步I/O代表是跟async有相關的語法，python3.5後才引入的功能
### 選擇多線程
* 當現有代碼使用同步I/O操作且不希望重構代碼時，使用多線程是一種實際的選擇。
* 當需要處理的I/O操作不支持異步編程時，多線程是一個有效的替代方案。

### thread的比較
* 線程是同步的
  * 雖然線程允許多個任務並發執行，但它們的運行是同步的
  * 同時執行：多個線程可以同時運行在多個處理器核心上，這實現了真正的並行處理。
* thread是搶占式多任務
  * 搶占式多任務意味著操作系統可以在任意時刻打斷一個線程的執行，並切換到另一個線程。
  * 線程調度：操作系統內核使用調度算法來決定何時切換線程，以確保所有線程都能得到執行機會。
  * 這種搶占式調度可以在任何時間點發生，無論線程是否準備好切換。
* 上下文切換開銷較高
  * 上下文切換是指操作系統從一個線程切換到另一個線程的過程。
  * 過程包括保存當前線程的狀態（如 CPU 寄存器、程序計數器等），並加載下一個線程的狀態。
  * thread且換涉及OS與硬體操作，因此開銷較Coroutine高
  * 協程切換通常只需要保存和恢復少量的應用層狀態，而線程切換需要進行完整的 CPU 狀態保存和恢復，這增加了系統開銷。

### 使用協程的基本步驟
* 定義協程：使用 async def 關鍵字來定義協程函數。
* 獲取或創建事件循環：使用 asyncio.get_event_loop() 或 asyncio.new_event_loop() 來獲取或創建事件循環。
* 運行協程：使用 loop.run_until_complete() 方法來運行協程。
* 關閉事件循環：運行完協程後，需要顯式關閉事件循環。
``` python
import asyncio

# 定義協程
async def my_coroutine():
    print("Start coroutine")
    await asyncio.sleep(1)
    print("End coroutine")

# 獲取事件循環
loop = asyncio.get_event_loop()

# 運行協程
loop.run_until_complete(my_coroutine())

# 關閉事件循環
loop.close()

# 在 Python 3.7 及以後的版本中，引入了更簡單的高級 API asyncio.run()
import asyncio

# 定義協程
async def my_coroutine():
    print("Start coroutine")
    await asyncio.sleep(1)
    print("End coroutine")

# 使用高級 API 運行協程
# 可以自動創建和關閉事件循環。 這樣可以簡化代碼，避免手動管理事件循環。
asyncio.run(my_coroutine())
```

### coruntine語法
* 事件循環的獲取和創建：
  * asyncio.get_event_loop()：獲取當前的事件循環，如果不存在，則創建一個新的。
  * asyncio.new_event_loop()：創建一個新的事件循環，不影響當前的事件循環。
* 運行協程：
  * loop.run_until_complete(coroutine)：運行協程，直到它完成。
  * loop.run_forever()：運行事件循環，直到顯式調用 stop()。
* 關閉事件循環：
  * loop.close()：關閉事件循環，釋放資源。
* 多協程管理
  * 用 asyncio.gather
``` python
import asyncio

async def my_coroutine_1():
    print("Coroutine 1: Start")
    await asyncio.sleep(1)
    print("Coroutine 1: End")

async def my_coroutine_2():
    print("Coroutine 2: Start")
    await asyncio.sleep(2)
    print("Coroutine 2: End")

async def main():
    # 並行運行多個協程
    await asyncio.gather(my_coroutine_1(), my_coroutine_2())

# 使用高級 API 運行主協程
asyncio.run(main())
```

### 讓出控制權
> Coroutine間互相讓出控制權，直到有一個可以執行
* 任務開始執行：協程開始執行，遇到await關鍵字。
* 掛起任務：遇到await後，目前協程掛起，其上方（包括局部變數和執行位置）保存下來。
* 讓出控制權：控制權回傳給事件循環，事件循環可以調度其他準備好的任務執行。
* 任務恢復完成：當等待的非同步操作後，事件循環恢復之前掛起的協程，從其掛起的地方繼續執行。
### Coroutine 總結
* 協程需要在事件循環中運行。
* 可以手動創建和管理事件循環，也可以使用高級 API asyncio.run() 自動管理。
* 事件循環負責調度和執行協程，並處理異步 I/O 操作。
* 在復雜場景中，可以使用 asyncio.gather() 或其他方法並行運行多個協程。

## Event Loop
* Event Loop 是異步編程的核心。
* 它負責調度和運行異步任務（coroutines）以及處理事件。
* Python 的 asyncio 庫提供了事件循環的實現。
  * 需要顯式地啟動和關閉事件循環
* 主要功能
  * 調度和執行異步任務。
  * 處理回調。
  * 管理 I/O 操作。


### 結論
* 能用coroutine就用coroutine，程式裡不方便用coroutine就用multi thread
* 跟CPU運算有關的就用multi process
* 跟多個任務要彼此等待有關的用multi thread或coroutine

## ref
* [进程，线程和协程 (Process, Thread and Coroutine)](https://leovan.me/cn/2021/04/process-thread-and-coroutine-python-implementation/)