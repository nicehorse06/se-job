# 事件迴圈（Event Loop）

* Node.js 的 事件迴圈（Event Loop） 是其核心機制，使得 Node.js 能夠以非阻塞、事件驅動的方式執行 JavaScript 程式碼。
* 這個機制使得單執行緒的 Node.js 可以高效地處理大量的並發 I/O 操作。

# 一、基本概念
## 單執行緒與非阻塞 I/O
* 單執行緒：Node.js 使用單一的 JavaScript 執行緒來執行所有程式碼。
* 非阻塞 I/O：透過底層的 libuv 庫，Node.js 可以將 I/O 操作（如文件讀寫、網路請求）委派給作業系統，並在操作完成後透過回調函數處理結果。


## 事件驅動架構
* 事件迴圈：負責監控事件佇列，並按照特定的順序執行回調函數。
* 回調函數：在異步操作完成後，被調用以處理結果或錯誤。

# 二、事件迴圈的工作原理
事件迴圈可以被視為一個循環的機制，它持續地檢查是否有待處理的事件，如果有，則按照一定的順序執行對應的回調函數。整個過程可以分為以下幾個階段：
* Timers（計時器階段）
* Pending Callbacks（待定回調階段）
* Idle, Prepare（空閒、準備階段）
* Poll（輪詢階段）
* Check（檢查階段）
* Close Callbacks（關閉回調階段）

## 1. Timers（計時器階段）
* 作用：執行 setTimeout() 和 setInterval() 設定的回調函數。
* 特點：只有當指定的時間達到後，對應的回調函數才會被放入此階段的任務佇列中。
  
## 2. Pending Callbacks（待定回調階段）
作用：執行一些系統操作的回調函數，例如 TCP 錯誤類型的回調。
特點：處理延遲到下一個迴圈迭代的回調。

## 3. Idle, Prepare（空閒、準備階段）
作用：僅供 Node.js 內部使用，用於一些延遲執行的回調。
特點：一般開發者不會直接與這個階段交互。

## 4. Poll（輪詢階段）
作用：接收新的 I/O 事件，並將對應的回調函數加入任務佇列。
特點：
如果任務佇列不為空，事件迴圈會依次執行回調函數。
如果任務佇列為空，且沒有設定 setImmediate() 的回調，則事件迴圈可能會阻塞在這裡等待新的 I/O 事件。

## 5. Check（檢查階段）
作用：執行 setImmediate() 設定的回調函數。
特點：setImmediate() 的回調總是在 poll 階段之後執行。

## 6. Close Callbacks（關閉回調階段）
作用：處理關閉事件的回調，例如 socket.on('close', ...)。
特點：處理一些需要清理資源的回調函數。

# 三、執行順序與示例
執行順序
* 先執行主程式碼，將同步任務放入呼叫堆疊（Call Stack）中執行。
* 異步操作的回調函數被委派給對應的 API，並在完成後放入相應的任務佇列。
* 事件迴圈按照階段順序，依次檢查各個任務佇列，並將回調函數推入呼叫堆疊中執行。

## 示例程式碼
``` javaScript
const fs = require('fs');

setTimeout(() => {
  console.log('Timeout');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

fs.readFile(__filename, () => {
  console.log('File Read');

  setTimeout(() => {
    console.log('Timeout within ReadFile');
  }, 0);

  setImmediate(() => {
    console.log('Immediate within ReadFile');
  });
});

console.log('Main Thread');

```

## 可能的輸出
```
Main Thread
Timeout
Immediate
File Read
Immediate within ReadFile
Timeout within ReadFile
```

## 解釋
* console.log('Main Thread')：同步執行，首先輸出。
* setTimeout() 和 setImmediate()：都被調度為異步回調，執行順序取決於事件迴圈階段，但在主程式碼中，setImmediate() 通常比 setTimeout() 更早執行。
* fs.readFile()：文件讀取完成後，回調函數被執行，輸出 'File Read'。
  * 在這個回調中，再次設定了 setTimeout() 和 setImmediate()。
  * 由於事件迴圈的機制，setImmediate() 會比 setTimeout() 先執行。

# 四、特殊機制
process.nextTick()
* 作用：將回調函數放入下一個迴圈的 "microtask" 階段，在任何其他異步回調之前執行。
* 特點：優先級高於事件迴圈的各個階段。

``` javaScript
process.nextTick(() => {
  console.log('Next Tick');
});

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('Main Thread');

```

## 輸出：
Main Thread
Next Tick
Timeout


# 五、注意事項與最佳實踐
1. 避免阻塞主執行緒
原因：Node.js 是單執行緒的，長時間的同步操作會阻塞事件迴圈，導致無法處理其他請求。
解決方案：將耗時的計算任務交給子執行緒（如 Worker Threads）或使用異步方式處理。

2. 理解回調函數的執行順序
重要性：正確預測回調函數的執行順序，有助於避免潛在的競爭條件和錯誤。
建議：多使用 async/await 和 Promise 來處理異步流程，更易於閱讀和維護。

3. 小心使用 process.nextTick()
原因：過度使用可能導致事件迴圈飽和，影響性能。
建議：僅在必要時使用，避免在 process.nextTick() 中遞歸調用自身。

# 六、總結
事件迴圈是 Node.js 的核心機制，負責管理異步操作的執行。
理解事件迴圈的工作原理，有助於編寫高效、可靠的 Node.js 應用程式。
善用異步編程模式，如 Promise 和 async/await，可以使代碼更易於理解和維護。

# setImmediate() 和 setTimeout(..., 0)  誰會先執行？
## 1.在主程式碼中（非 I/O 回調）
* 當 setImmediate() 和 setTimeout(..., 0) 在主程式碼中調用時，setTimeout(..., 0) 通常會比 setImmediate() 先執行。
* 原因：
  * setTimeout(..., 0) 的回調函數會被放入 "Timers"（計時器）階段，這是事件迴圈的第一個階段。
  * setImmediate() 的回調函數會被放入 "Check"（檢查）階段，這是在 "Poll"（輪詢）階段之後。
``` js
setTimeout(() => {
  console.log('Timeout');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

console.log('Main Thread');

// 可能的輸出：
// Main Thread
// Timeout
// Immediate
```

## 2. 在 I/O 回調中
* 當 setImmediate() 和 setTimeout(..., 0) 在 I/O 操作（如文件讀取、網絡請求）的回調函數中調用時，setImmediate() 通常會比 setTimeout(..., 0) 先執行。

* 原因：
  * 當 I/O 操作完成後，事件迴圈進入 "Poll"（輪詢）階段，在該階段結束時，如果有 setImmediate() 的回調，會直接進入 "Check"（檢查）階段 執行 setImmediate() 的回調函數。
  *  setTimeout(..., 0) 的回調則需要等到下一個事件迴圈的 "Timers"（計時器）階段 才會執行。
``` js
const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('File Read');

  setTimeout(() => {
    console.log('Timeout within ReadFile');
  }, 0);

  setImmediate(() => {
    console.log('Immediate within ReadFile');
  });
});

// 可能的輸出：
// File Read
// Immediate within ReadFile
// Timeout within ReadFile
```