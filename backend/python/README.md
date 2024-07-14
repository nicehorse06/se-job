
# Python

## todo
* 多 process on cpu, 多thread, asyncio
## 面試常見問題
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

14. WSGI (Web Server Gateway Interface) 和 ASGI (Asynchronous Server Gateway Interface)

15. *args 與 **kwargs


## ref
* [码农高天](https://www.youtube.com/@minkoder)