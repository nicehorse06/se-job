# Context Manager

## 什麼是 Context Manager

Context Manager（上下文管理器）是一個 Python 對象，它定義了進入和退出某個運行上下文時需要執行的操作。上下文管理器使用 `with` 語句來確保資源的正確分配和釋放。

## 解決什麼問題

Context Manager 解決了資源管理的問題，確保資源（如文件、網絡連接）在使用完後能夠自動釋放，避免資源洩漏和相關的問題。

## 如果不用 Context Manager，原本該怎麼做

如果不用 Context Manager，需要手動管理資源的打開和關閉。例如：

```python
file = open('file.txt', 'r')
try:
    content = file.read()
finally:
    file.close()

client = httpx.AsyncClient()
try:
    response = await client.get("https://api.example.com/data")
    data = response.json()
finally:
    await client.aclose()
```

手動管理資源需要確保在每次操作後都能正確釋放資源，這樣會使代碼變得繁瑣且容易出錯。

## 什麼情境需要用 Context Manager

需要管理資源的情況下都應使用 Context Manager，例如：

- 打開和關閉文件
- 發送和接收網絡請求
- 連接和關閉數據庫
- 獲取和釋放鎖

## 為什麼這些情境不 close 會佔用資源

不正確關閉這些資源會導致：

- 內存消耗：未關閉的資源持續佔用內存，最終可能導致內存不足。
- 文件句柄耗盡：每個進程能夠打開的文件數量有限制，未關閉的文件會佔用文件句柄，導致無法打開新的文件。
- 網絡連接耗盡：未關閉的 HTTP 客戶端會佔用連接資源，導致無法建立新的連接。
- 數據完整性問題：未正確關閉文件可能導致數據未完全寫入文件中。
- 鎖未釋放：未正確釋放文件鎖會阻止其他進程訪問該文件。

## 不 close 有什麼好處

通常來說，資源不關閉沒有什麼好處，因為這會導致資源洩漏和相關的問題。唯一的情況是如果確保程序在資源用完後立即終止，那麼未釋放的資源會隨著程序終止而自動釋放，但這並不是一個好的做法，因為它會導致程序運行期間的資源管理問題。

## 補充

Context Manager 的基本工作原理：上下文管理器需要實現兩個方法：

- `__enter__`：當進入上下文時被調用。
- `__exit__`：當離開上下文時被調用，即使發生異常也會執行。

對於異步上下文管理器，對應的方法是 `__aenter__` 和 `__aexit__`。

通過使用 Context Manager 和 `with` 語句，可以確保資源在使用後被自動釋放，這不僅使代碼更簡潔，也提高了代碼的可靠性和可讀性。

## ref
* 參考GPT