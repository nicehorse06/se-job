# Python 3 的主要變化 (3.0 到 3.15)

## python 2 vs python3
### 1. Syntax and Print Statement
- **Python 2**: `print` is a statement, and parentheses are optional.
    ```python
    print "Hello, World!"
    ```
- **Python 3**: `print` is a function, and parentheses are required.
    ```python
    print("Hello, World!")
    ```

### 2. Integer Division
- **Python 2**: Dividing two integers performs floor division, returning an integer result. 
    ```python
    5 / 2  # Output: 2
    ```
- **Python 3**: Dividing two integers returns a float. Use `//` for floor division.
    ```python
    5 / 2  # Output: 2.5
    5 // 2  # Output: 2
    ```

### 3. Unicode Support
- **Python 2**: Strings are ASCII by default, and Unicode strings require a `u` prefix.
    ```python
    u"Hello"
    ```
- **Python 3**: Strings are Unicode by default, so no prefix is needed.

### 4. `xrange()` vs `range()`
- **Python 2**: `range()` returns a list, and `xrange()` returns an iterator.
- **Python 3**: `range()` returns an iterator, equivalent to Python 2's `xrange()`.

### 5. `input()` Function
- **Python 2**: `input()` evaluates input as a Python expression, use `raw_input()` to read strings safely.
    ```python
    raw_input("Enter: ")  # Safely reads strings
    ```
- **Python 3**: `input()` always returns a string.

### 6. Exception Handling
- **Python 2**: Uses `except Exception, e` syntax.
    ```python
    except Exception, e:
        print e
    ```
- **Python 3**: Requires `as` keyword for exceptions.
    ```python
    except Exception as e:
        print(e)
    ```

### 7. Built-in Functions
- In **Python 2**, `zip()`, `map()`, and `filter()` return lists.
- In **Python 3**, they return iterators, improving memory efficiency.

### 8. Modules and Libraries
- Some modules have been reorganized or renamed in **Python 3**. For example, `urllib` and `urllib2` in Python 2 are combined into `urllib` in Python 3.

### 9. Community Support
- **Python 2**: Official support ended in January 2020. No more security updates.
- **Python 3**: Actively maintained with ongoing improvements and features.

### 10. `__future__` Module
- In **Python 2**, you can use `from __future__ import` to enable some Python 3 features.

---

### Summary
Python 3 is the current standard, offering better syntax consistency, performance, memory handling, and Unicode support.


## Python 3.0 (2008年)
- **除法運算符**：`/` 進行浮點除法，`//` 進行整數除法。
- **`print` 函數**：`print` 由語句變為函數，要求使用括號，例如 `print("Hello World")`。
- **字符串類型**：字符串分為 `str`（文本字符串，Unicode）和 `bytes`（二進制數據）。
- **移除舊功能**：移除了一些過時的 Python 2 功能，如 `<>`、`long` 類型、`reduce()` 等。
- **`range()` 函數**：返回 `range` 對象，而不是列表，減少內存使用。

## Python 3.1 到 Python 3.2
- **`collections.OrderedDict`**：在字典中保持插入順序。
- **`io` 模塊**：優化了 I/O 操作，提升了性能。
- **數值類型增強**：引入 `math.isclose()` 用於浮點數比較。
- **新格式化字符串**：支持 `{}` 風格的字符串格式化。

## Python 3.3 到 Python 3.4
- **`yield from` 語法**：簡化生成器的委托，改進協程的編寫。
- **`pathlib` 模塊**：提供面向對象的文件路徑處理。
- **內存管理改進**：移除了 `PyMalloc` 內存分配器的 GIL，提升了多線程性能。
- **異步 I/O**：引入 `asyncio` 模塊，用於異步編程。

## Python 3.5
- **`async` 和 `await`**：引入了 `async` 和 `await` 關鍵字，用於原生協程，簡化異步編程。
- **`type hints`**：通過 `PEP 484` 引入了類型注解，為類型檢查提供支持。
- **矩陣乘法運算符**：新增了 `@` 運算符，用於矩陣乘法。

## Python 3.6
- **`f-strings`**：引入了格式化字符串字面量 (`f"Hello {name}"`)，提供更簡潔的字符串格式化方法。
- **`secrets` 模塊**：用於生成安全的隨機數，用於密碼學用途。
- **異步生成器和推導式**：支持異步生成器函數和異步推導式 (`async for` 和 `async with`)。

## Python 3.7
- **數據類 (`dataclasses`)**：引入 `dataclass` 裝飾器，簡化了數據類的定義。
- **上下文變量**：引入 `contextvars` 模塊，改進了異步編程中的上下文管理。
- **`asyncio` 改進**：進一步優化異步 I/O 的性能和 API。

## Python 3.8
- **賦值表達式 (`:=`)**：引入“海象操作符”，用於在表達式中賦值。
- **`positional-only` 參數**：允許強制位置參數，使函數定義更加明確。
- **`f-strings` 增強**：支持 `=` 符號，用於調試輸出。

## Python 3.9
- **集合運算符**：字典合併和更新操作符 (`|` 和 `|=`)。
- **類型注解改進**：引入 `List`、`Tuple`、`Dict` 等容器的原生泛型類型注解支持。
- **字符串方法增強**：增加了字符串中的新方法，如 `str.removeprefix` 和 `str.removesuffix`。

## Python 3.10
- **模式匹配**：引入結構化模式匹配 (`match` 和 `case`)，類似於其他語言中的 `switch-case` 語法。
- **錯誤消息增強**：改進了錯誤消息，提供了更多上下文，幫助開發者更快地找到問題。
- **類型注解改進**：引入了 `Union` 類型的簡化語法 (`|`)。

## Python 3.11
- **顯著的性能提升**：通過 PEP 659，引入了自適應的解釋器，提升了執行速度。
- **異常鏈改進**：改進了異常處理鏈，使調試時更加直觀。
- **類型注解改進**：進一步增強了 `typing` 模塊，使其更易用。

## Python 3.12（2023-10-02）
- **泛型語法升級（PEP 695）**：可直接在函式與類別定義 type parameters，並新增 `type` 別名語句。
- **f-string 更完整（PEP 701）**：移除許多過去限制，語法更一致、可讀性更高。
- **每個子解譯器獨立 GIL（PEP 684）**：為多解譯器隔離與平行能力打基礎。
- **`distutils` 移除**：正式從標準函式庫刪除，改用 `setuptools` / `pyproject.toml` 生態。

## Python 3.13（2024-10-07）
- **新版 REPL 互動體驗**：互動式解譯器更好用，錯誤提示與可讀性再提升。
- **實驗性自由執行緒模式（PEP 703）**：提供不依賴 GIL 的實驗路徑（需特定建置）。
- **實驗性 JIT（PEP 744）**：CPython 加入實驗性 JIT，持續探索效能上限。
- **移除更多已棄用標準庫（PEP 594）**：清理歷史包袱，降低維護成本。

## Python 3.14（2025-10-07）
- **延遲求值註解（PEP 649 / 749）**：註解預設改為需要時才評估，改善效能與前向引用體驗。
- **標準庫多解譯器（PEP 734）**：新增 `concurrent.interpreters`，更容易做真並行工作分配。
- **模板字串（PEP 750）**：新增 template string literals，提供更彈性的字串模板能力。
- **新增 `compression.zstd`（PEP 784）**：標準庫原生支援 Zstandard 壓縮格式。

## Python 3.15（開發中，3.15.0a6 文件）
- **`lazy import`（PEP 810）**：可顯式延後 import 到第一次使用時，改善大型專案啟動速度。
- **`frozendict` 內建不可變映射（PEP 814）**：可雜湊、可當 key 用，適合不可變設定資料。
- **profiling 套件整合（PEP 799）**：新增 `profiling` 命名空間，並加入 Tachyon 高頻取樣 profiler。
- **Comprehension 支援 unpack（PEP 798）**：推導式語法更彈性，可直接展開元素。
- **預設文字編碼改為 UTF-8（PEP 686）**：未指定 encoding 的 I/O 預設 UTF-8，跨平台一致性更高。
- **JIT 再升級**：3.15 對 JIT 編譯器做了較大幅優化，官方基準顯示在部分場景有可觀提升。
- **錯誤訊息持續改進**：診斷訊息更清楚，降低除錯成本。

> 註：官方文件目前明確標示為 draft（預發布版本會持續變動），面試時可先說「3.15 方向」而非「最終定案」。


## ref
* GPT promp: `現在面試有一問題是 python3帶來什麼變化，請講從python3.0到最新的python新增了什麼`
* [What’s New in Python](https://docs.python.org/3/whatsnew/index.html)
