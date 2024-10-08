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
### 事件（Event）
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
* 禁止搶占（no preemption）：系統資源不能被強制從一個行程中退出。
* 持有和等待（hold and wait）：一個行程可以在等待時持有系統資源。
* 互斥（mutual exclusion）：資源只能同時分配給一個行程，無法多個行程共享。
* 循環等待（circular waiting）：一系列行程互相持有其他行程所需要的資源。
### 預防死結
* 死結只有在四個條件同時滿足時發生，預防死結必須至少破壞其中一項。
### 活結（livelock）
* 與死結相似，死結是行程都在等待對方先釋放資源；
* 活結則是行程彼此釋放資源又同時占用對方釋放的資源。
  * 當此情況持續發生時，儘管資源的狀態不斷改變，但每個行程都無法取得所需資源，使得事情沒有任何進展。

## virtual memory
* 記憶體碎片化（Memory Fragmentation）
  * 程式的執行需要一段連續記憶體，記憶體會隨著程式的開啟和啟動碎片化
* virtual memory可以給每個 process 一塊獨立的虛擬記憶體
  * 程式宣告一個 array，邏輯上確實拿到連續空間，但實際上那個 array 在實體記憶體中是分散的，只是程式感覺不到
* Memory Management Unit(MMU)
  * 這個硬體可以做虛擬位址（Virtual Address）轉成實體位址（Physical Address）的轉換
* share memory，Process 間共享實體記憶體
  * 比如python和VScode都執行app.py，OS就只需要載入一次app.py，兩個process的Virtual Address會對應到同一塊記憶體
  * 常用的系統library也會常駐在記憶中，如ls cat node go python
* 不需要載入整個程式（Demand Paging）
  * 可以在virtual mem載入全部，但實體記憶體只先載入要用的部份
  * 等真的需要再載入
    * lazy loading
* Swapping
  * 曾經用過，但之後不需要的記憶體丟出去，如init()
  * 這樣又省下空間了 :D

### ref
* [從作業系統的角度來談為什麼需要「虛擬記憶體」](https://medium.com/starbugs/why-do-os-need-virtual-memory-b47d6eeecbce)

## Starvation
* 是一種資源分配問題，指的是某些進程或線程長時間得不到所需的資源
  * 導致它們無法繼續執行，甚至可能永遠無法完成。

### 饑餓的原因
* 優先級調度
  * 在優先級調度系統中，高優先級的進程或線程總是比低優先級的進程或線程先獲得資源
  * 足夠多的高優先級任務，低優先級的任務可能長時間得不到資源，從而發生饑餓。
* 資源不足
  * 系統中的某些資源（如CPU時間、內存、I/O設備等）非常稀缺，導致某些進程或線程長時間無法獲得這些資源。
* 不公平的鎖機制
  * 某些同步機制，如互斥鎖，在未能合理安排等待隊列時，可能會導致某些線程長時間得不到鎖，從而發生饑餓。

### 避免饑餓的方法
* 老化（Aging）：逐漸提高等待時間長的進程或線程的優先級，確保它們最終能夠獲得資源。
* 公平鎖：使用公平鎖機制，確保鎖的獲取是按照線程的請求順序進行的，避免某些線程長時間得不到鎖。
* 公平調度算法：使用公平調度算法，如公平分享（Fair-Share）調度，確保每個進程或線程都能公平地獲得資源。

## User Mode & Kernel Mode
* 現代操作系統將CPU的操作分為兩種模式：用戶模式和內核模式，以提供保護和隔離機制。
  * 希望OS可以壟斷所有操作，但不希望一般程式亂搞
  * Kernel mode 只要是 CPU 能管的硬體都能操作
  * User mode 是受限的，除了一些沒有傷害的行為之外什麼都不能做。

### 用戶模式（User Mode）
* 特性：用戶模式下運行的應用程序無法直接訪問硬件資源或操作系統內核數據結構。
  * 應用程序只能通過系統呼叫(system call)請求內核服務。
* 安全性：通過限制直接訪問特權操作，用戶模式可以防止應用程序對系統的潛在危害。
### 核模式（Kernel Mode）
* 特性：內核模式下運行的操作系統內核和驅動程序具有完全的訪問權限，可以執行任何CPU指令並訪問所有內存地址。
* 權限：內核模式允許操作系統直接控制硬件並管理系統資源。

## System Call
* 是 process 與作業系統之間的介面。
* 是應用程序請求操作系統服務的接口。
  * 使應用程序可以訪問操作系統內核提供的服務和資源，例如文件操作、進程控制、內存管理和設備管理等。

## 中斷 CPU Interrupt
* 中斷(Interrupt)，是機器的一個「特別狀態」，當中斷產生時，正
在執行的工作會暫停下來，CPU 會先執行對應的 Exception handler。
* 硬件中斷（Hardware Interrupt）
  * 如鍵盤、鼠標、網卡、硬盤
  * I/O操作完成
  * 鍵盤輸入
  * 網絡數據到達
* 軟件中斷（Software Interrupt）
  * 系統呼叫：應用程序請求操作系統服務，如文件操作、內存分配等，會引發軟件中斷進入內核模式。
  * 異常處理：程序執行過程中發生異常（如除零錯誤、非法內存訪問）
* 處理器中斷（Processor Interrupt）
  * 處理器中斷由CPU自身發出，用於處理特殊條件或異常情況。
  * 除零錯誤：當CPU嘗試執行除以零的操作時，發出中斷通知操作系統處理這個異常。
  * 非法指令：當CPU嘗試執行非法或無效指令時，發出中斷通知操作系統處理。
  * 頁面錯誤：當程序訪問未分配的內存頁時，發出中斷通知操作系統進行內存管理操作，如頁面調入。
* 中斷處理流程
  * 保存上下文：CPU保存當前執行的上下文，包括寄存器狀態和程序計數器。
  * 切換到內核模式：CPU切換到內核模式，以便操作系統能夠訪問特權指令和資源。
  * 中斷處理：操作系統根據中斷向量表（Interrupt Vector Table）找到對應的中斷處理程序，並執行。
  * 恢復上下文：中斷處理完成後，操作系統恢復被中斷的程序的上下文，使其繼續執行。

## ref
* https://www.explainthis.io/zh-hant/swe-questions/backend
* https://hackmd.io/@SupremeEJ/SkcsCUGh8
* https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view
* [內容很充實的面試整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)
* [進程 (Process)、線程 (Thread)、協程 (Coroutine) 的概念講解](https://blog.kennycoder.io/2020/05/16/%E9%80%B2%E7%A8%8B-Process-%E3%80%81%E7%B7%9A%E7%A8%8B-Thread-%E3%80%81%E5%8D%94%E7%A8%8B-Coroutine-%E7%9A%84%E6%A6%82%E5%BF%B5%E8%AC%9B%E8%A7%A3/)
* [[系程] 教學: 簡介 Kernel/User Mode 的概念](https://www.ptt.cc/bbs/b97902HW/M.1267018497.A.3B1.html)
