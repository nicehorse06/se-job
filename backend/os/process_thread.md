# OS

## todo
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
## program, process, thread
* Program (程式)
  * 存儲在設備中。程式本身是靜態的，不會執行任何動作。
  * 只是一個文件，通常包含可執行代碼。
  * 是靜態的，無法自己執行，需要操作系統加載後才能成為一個進程。
* Process (進程)
  * 進程是程式的一次執行實例。當程式被操作系統加載到記憶體中並開始執行時，它就成為了一個進程。
  * 有自己獨立的記憶體空間
  * 進程之間是相互隔離的，一個進程無法直接訪問另一個進程的記憶體空間。
  * 可以由操作系統管理，例如分配資源、調度執行等。
  * 進程之間的通信（IPC）需要特定的機制，例如管道、共享記憶體、訊號等。
  * 在多工作業系統中，可以同時運行多個進程，但由於CPU數量少於進程數量，需要通過排程分配CPU時間。
* Thread (線程)
    * 線程是進程中的一個執行單元，是進程的一部分。
    * 線程之間共享進程的資源和記憶體空間，例如程式碼段、資料段。
    * 線程有自己的stack，但與同一進程中的其他線程共享堆空間和全局變數。
    * 線程之間的切換比進程之間的切換開銷更小，因為線程共享同一個記憶體空間。
    * 線程之間可以直接通信，因為它們共享同一個地址空間。
      * 但這可能導致競爭條件（Race Condition）問題，需要同步機制來解決。


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

## ref
* https://www.explainthis.io/zh-hant/swe-questions/backend
* https://hackmd.io/@SupremeEJ/SkcsCUGh8
* https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view
* [內容很充實的面試整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)