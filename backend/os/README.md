# OS

## CPU Pipeline
* Pipeline 是一種技術，用於提高 CPU 的指令處理效率
* 將指令執行過程分為多個階段，並使每個階段同時處理不同的指令。
* 這樣就像流水線作業一樣，增加了指令的吞吐量，從而提升了 CPU 的整體性能。
* 每個階段都有專門的硬件單元進行處理，當一條指令進入下一個階段時，新的指令可以進入先前的階段。
  * 例如，當第一條指令在進行 Decode 階段時，第二條指令已經可以進入 Fetch 階段。
  * 用並行處理的方式加CPU使用效率

### Pipeline Stages

* Fetch：從內存中取出指令。
* Decode：解碼指令，確定指令的操作和操作數。
* Execute：執行指令的操作。
* Memory：如果指令需要訪問內存，則在這個階段進行讀寫操作。
* Write-back：將結果寫回寄存器或內存

### pipeline hazard
* 在使用 Pipeline 技術時，可能會遇到以下幾種問題，稱為 Pipeline Hazards：
  * Data Hazard：當一條指令需要使用前一條指令尚未處理完的數據時，會產生數據冒險。
  * Control Hazard：當指令流的控制方向改變（例如分支指令）時，會產生控制冒險。
  * Structural Hazard：當多條指令同時需要使用同一硬件資源時，會產生結構冒險。

## Signal（信號）
* 信號是一種進程間通信（IPC）機制，用於通知進程發生了異步事件。信號可以用來處理異常條件、同步進程、進程控制等。
* 
## DMA
  * DMA是一種允許外設直接讀寫系統內存，而不需要CPU介入的技術。DMA控制器負責管理內存和外設之間的數據傳輸，從而減少CPU的負擔，提高系統效率。
  * 高效數據傳輸：DMA允許大塊數據快速傳輸，適合於磁盤I/O、網絡數據等大數據量操作。
  * 減少CPU負擔：CPU只需發起DMA傳輸，實際傳輸由DMA控制器完成。

## ref
* https://www.explainthis.io/zh-hant/swe-questions/backend
* https://hackmd.io/@SupremeEJ/SkcsCUGh8
* https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view
* [內容很充實的面試整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)