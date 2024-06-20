# 後端程式入門、面試整理

## Client Server 架構
* Client(前端)
    * 為使用者端如網頁、app，使用者身邊的裝置
    * 會發出請求(如HTTP協定)到Server的API
* Server(後端)
    * 為伺服器端，工程師能控制的主機
    * 會執行一個網頁伺服器並連結資料庫，開放API給外界呼叫

## 後端工程師需求門檻
* 對基本Linux指令的了解，Mac有一樣的指令，系出同源
* 對資料庫操作(SQL)的了解，使用者的資料都會存在後端
* 後端語言或框架的熟悉
* 門檻相對前端高，但也比較不容易被取代

## 常見的伺服器後端語言
* Python
    * 被用在AI實踐、伺服器運維管理、刷題語言
    * 學習上語法最簡單
    * 伺服器後端相對少，大多新創、蒸蒸日上的公司在用
    * 推薦沒有就業壓力、不確定目標、什麼方向可嘗試的新手
* Java：
    * 穩定，大企業、銀行、傳產愛用，新創相對少
    * 資工資管系通常都會，很多演算法、物件導向的書也是基於Java
    * 使用上有Oracle的版權疑慮
    * 推薦想找穩定工作、打好程式基礎的新手
* PHP：
    * 如果是後端語言的職缺，PHP大概是最多的了，很多舊網站在用
    * 推薦急著想找工作的新手
* Node.js
    * 使用JavaScript撰寫，建議已經熟悉前端的工程師從Node切入
        * JavaScript不是Java，名稱很像是歷史原因
    * 因前後端語言一樣，很多新創使用
    * 推薦短時間想拿高薪以全端為目標的工程師
* Go(Golang)
    * 現代化高性能編譯語言
    * 新創、高薪缺愛用，未來成長性高
    * 通常不建議Golang為第一語言，推薦老手再學
* C#
    * 全微軟工作環境下使用(不需要會Linux)，也可以寫Unity遊戲
    * 很多銀行、傳產、政府單位愛用
    * 推薦想找穩定工作的新手
* Ruby:
    * 有點冷門，開發快速，某些特定公司會用，如果以那些公司為目標可以學
    * 除非到職的公司會帶，不然可以不用學

### 其他語言
* C
    * 軟體界最經典的語言    
        * 常見用在工作的語言90%都是參考C的語法
    * 天生被用來撰寫作業系統，為寫UNIX而生
        * 所有作業系統都離不開C
        * 要了解資工的資料結構、作業系統、編譯器從C開始不會錯
    * 通常C的工作都跟了解硬體、作業系統的domain綁在一起，所以門檻比較高
* C++
    * 通常做需要高效能的事情如遊戲引擎 交易系統 EDA
    * 需要的工作通常要求高學歷理工背景
    * 學生刷題比賽愛用
* Rust
    * 在台灣非主流，在Linux開發 韌體開發 後端開發 前端開發領域持續成長
    * 簡單來說是記憶體管理更安全的C/C++
    * 很難寫，語法對機器友善，編譯器很嚴格
    * 難學易精，跟JavaScript反過來


## System Design
* [Design Gurus](https://www.designgurus.io/)
  * 要付費
* [system-design-primer](https://github.com/donnemartin/system-design-primer?tab=readme-ov-file#system-design-topics-start-here)
* [System Design Interview – An insider's guide](https://www.books.com.tw/products/0010903454)
  * 大部分都會推這個
* [System Design roadmap](https://roadmap.sh/system-design)
* [Youtuber 土妹土妹](https://www.youtube.com/@user-im1sg1zx1j)
* [Youtuber 古城算法](https://www.youtube.com/@user-my5in2fq5c)
* [Youtuber 花花醬](https://www.youtube.com/@HuaHuaLeetCode)

## Distributed Systems
* Designing Data-Intensive Application
  * [DDIA中文翻译](https://github.com/Vonng/ddia)

## API Design
* [API Design design](https://roadmap.sh/api-design)

## OS
* deadlock
* process thread

## Networking
* OSI的7層架構
* HTTPS
* HTTP code

## Python
### 面試常見問題
1. **dict 安全取值**
   - 使用 `get()` 方法，可以在鍵不存在時返回一個預設值，避免 `KeyError`。

2. **裝飾器 (Decorator)**
   - 函數或類別，用於在不修改原始函數代碼的情況下，添加新的功能。

3. **Context Manager (`with` 語句)**
   - 用於管理資源，例如檔案操作，確保資源被正確處理（如自動關閉）。

4. **Generator**
   - 使用 `yield` 產生一系列的值，可以逐一產生值而不需要一次性將所有值載入內存。

5. **GIL鎖 (Global Interpreter Lock)**
   - Python 中的機制，用於限制一個 Python 解釋器在多執行緒環境中同時執行多個原生執行緒。

6. **Multi-process/thread/task 的模組**
   - 如 `multiprocessing`, `threading`, `asyncio`。
   - **非同步與同步的區別**：非同步操作允許程式在等待外部事件（如 I/O）完成時繼續執行，同步操作則需等待操作完成。

7. **單元測試/功能測試**
   - 使用 `unittest` 或 `pytest` 模組來進行測試確保程式碼的可靠性。

8. **Python Debugger**
   - 如 `pdb`，用於逐步執行代碼以找出錯誤和問題。

9. **異常處理**
   - `try`, `except`, `finally`, `raise` 用於處理和拋出異常。

10. **import 原理**
    - Python 加載和初始化模組的過程，包括尋找模組路徑、編譯成位元組碼、執行模組代碼。

11. **List Comprehension**
    - 簡潔的語法結構，用於從其他列表創建列表，表達式既直觀又高效。

12. **變數的「引用」與「複製」**
    - 包括對變數的直接賦值（引用）和通過淺複製或深複製創建獨立副本的概念。

13. **標準庫模組（collections, itertools, functools）**
    - `collections` 提供多種資料結構，`itertools` 用於創建有效的迭代器，`functools` 提供函數式編程支持。

## Linux

## DevOps

## Cloud
* AWS

## SRE

## Kubernetes

## DB
* 各種index
* SQL
* RDBMS vs noSQL
* PostgrSQL/MySQL的特性
* Redis/MongoDB 應用場景