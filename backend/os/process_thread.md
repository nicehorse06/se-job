# OS

## todo
* 協程
*  Muti-thread
* Context Switch
* Shared Memory，不然就是透過 OS Message passing，?
*       然而一個CPU一次只能做一件事情，但CPU的數量永遠少於運行中的Process數，因此每個Process使用的時間需要被排程(Scheduling) 
*       又每個Process間在記憶體中，如果擺放的方式不當，就會在記憶體中產生很多
*          另外，每個Process所需要的記憶體總合，也可能大於實體記憶體，因此需要另
         外用二次儲存裝置充當虛擬記憶體(Virtual Memory)，但是二次儲存裝置的速
         度肯定很慢，因此如何做到對虛擬記憶體最小的依賴，盡量避免Page Fault(電
         腦在主記憶體中找不到資料，而要去二次記憶體找，就稱為Page Fault)
         防止Thrashing的發生(因為Virtual Memory演算法不當，造成幾乎每次存取都要
         依賴二次記憶體，就是Thrashing)，以達到效能最佳化，也是個學問 
* 如果有兩個Thread要存取同一個Global Variable，有可能發生問題，
         也就是說可能會存取到錯的值(例如兩個Thread同時要對一個Variable做加減，
         最後那個答案可能會是錯的)，這就是Synchronization問題 =>
* 每一個Thread之間可能會互搶資源，而造成死結(Deadlock)，
## program, process, thread, coroutine
* Program (程式)
  * 存儲在設備中。程式本身是靜態的，不會執行任何動作。
  * 只是一個文件，通常包含可執行代碼。
  * 是靜態的，無法自己執行，需要操作系統加載後才能成為一個進程。
* Process (進程)
  * 適合 CPU 密集型任務，但創建和切換進程的開銷更大。
  * 進程是程式的一次執行實例。當程式被操作系統加載到記憶體中並開始執行時，它就成為了一個進程。
  * 有自己獨立的記憶體空間
  * 進程之間是相互隔離的，一個進程無法直接訪問另一個進程的記憶體空間。
  * 可以由操作系統管理，例如分配資源、調度執行等。
  * 進程之間的通信（IPC）需要特定的機制，例如管道、共享記憶體、訊號等。
  * 在多工作業系統中，可以同時運行多個進程，但由於CPU數量少於進程數量，需要通過排程分配CPU時間。
  * OS 分配資源的基本單位。它會拿到哪些資源呢？有 CPU Time、Memory、I/O Devices 
  * 有獨立資源，相對安全穩定
  * context switching 開銷大，因為涉及到OS資源，process之間通信也複雜
* Thread (線程)
    * 線程是進程中的一個執行單元，是進程的一部分。
    * 線程之間共享進程的資源和記憶體空間，例如程式碼段、資料段。
    * 線程有自己的stack，但與同一進程中的其他線程共享堆空間和全局變數。
    * 線程之間的切換比進程之間的切換開銷更小，因為線程共享同一個記憶體空間。
    * 線程之間可以直接通信，因為它們共享同一個地址空間。
      * 但這可能導致競爭條件（Race Condition）問題，需要同步機制來解決。
    * 一個進程中至少會有一個線程
    * 一個標準的線程組成主要會有
      * Thread ID
      * Programming Counter
      * CPU registers
      * stack
* coroutine
  * 是一種比線程更輕量級的並發編程方式
  * 協程允許函數在執行過程中暫停，並在稍後的某個時間點恢復執行
  * 與線程不同的是，協程由用戶級程式控制，並且在單一線程中運行，這意味著它們不需要操作系統的上下文切換，因此開銷更小。
  * 非阻塞：協程可以在遇到 I/O 操作時讓出控制權，允許其他協程繼續執行，從而提高程序的並發性能。
  * 協作式多任務：協程的切換是由程序本身控制的，通常通過await或yield來讓出控制權。
  * 協程是用戶級的，支持大量並發操作，開銷低，適合 I/O 密集型任務
  * 支持真正的並行計算。
  * 非搶佔式調度：協程的切換是由程序本身控制的，而不是由操作系統搶奪控制權。協程必須顯式地讓出控制權，這通常通過await或yield來實現。


## Race Condition
### 鎖（Locks）
* 使用鎖來確保同一時間只有一個線程可以訪問共享資源。常見的鎖機制包括互斥鎖（Mutex）和讀寫鎖（Read-Write Lock）。
* 互斥鎖（Mutex）：一個線程在訪問共享資源前先獲取鎖，訪問完後釋放鎖，其他線程在此期間無法訪問該資源。
* 讀寫鎖（Read-Write Lock）
  * 多讀單寫：讀寫鎖允許多個讀者同時訪問資源，但寫者在寫入時會獨占資源。
  * 讀寫互斥：寫者線程在寫入資源時，所有其他讀者和寫者都會被阻塞，這樣可以保證數據的一致性。
  * 提高併發性：相比互斥鎖，讀寫鎖能夠在有大量讀操作且寫操作較少的情況下提高系統的併發性和性能。
### 信號量（Semaphore）
* 信號量是計數器，限制同時訪問資源的線程數量，可以用來控制對共享資源的訪問數量。
### 事件（Event
* 在多線程編程中，事件（Event）是一種用於線程之間協作的同步原語。
* 事件可以用來讓一個線程等待另一個線程完成某個操作，類似於JavaScript中的回調函數機制，但它在多線程環境中使用。
### 條件變量（Condition Variable
* 條件變量提供了一種線程間等待某個條件成立的機制，常用於生產者-消費者模式中。
### 原子操作（Atomic Operations）
* 使用原子操作來確保對共享資源的操作是不可分割的，從而避免競爭條件。


## 並發 (Concurrent) vs 並行 (Parallel)
* Concurrent 
  * 好幾個process在搶相同的 CPU，
  * 搶到就優先執行
  * 一個時間點只會有一個任務
  * 藉由time slicing 感覺好像同一時間很多任務在進行
* Parallel 
  * 則是每個 CPU 各自負責其任務，而且是同時進行的
  * 無所謂切換的問題。
  * 真正的同時運行，需要多核CPU或多處理器系統

## deadlock
* process利用資源的三種階段
  * 要求資源
  * 使用資源
  * 釋放資源

### deadlock滿足的四個條件

## virtual memory


## System Call
* 是 process 與作業系統之間的介面。

## user mode & kernel mode

## Process Control



## ref
* https://www.explainthis.io/zh-hant/swe-questions/backend
* https://hackmd.io/@SupremeEJ/SkcsCUGh8
* https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view
* [內容很充實的面試整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)
* [進程 (Process)、線程 (Thread)、協程 (Coroutine) 的概念講解](https://blog.kennycoder.io/2020/05/16/%E9%80%B2%E7%A8%8B-Process-%E3%80%81%E7%B7%9A%E7%A8%8B-Thread-%E3%80%81%E5%8D%94%E7%A8%8B-Coroutine-%E7%9A%84%E6%A6%82%E5%BF%B5%E8%AC%9B%E8%A7%A3/)