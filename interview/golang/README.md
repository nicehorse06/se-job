# golang 面試筆記

# todo
* Golang 的並發模型
  * Golang 的 goroutine 和 thread 有何不同？
  * 如何使用 channel 在 goroutine 之間進行通信？
  * 開 10 個process 跟 10 個 thread,哪一個耗資源
  * 說明 select 語句的作用，並舉例說明它在並發程式中的應用。
* Golang 的內存管理
  * 解釋 Golang 中的垃圾回收機制。
  * 如何優化內存管理？舉例說明什麼情況下可能需要手動優化內存。
* 錯誤處理
  * Golang 中如何處理錯誤？為什麼 Go 不使用 try-catch？
  * 解釋 defer、panic 和 recover 的用途和它們的工作原理。
* Golang 的接口與多態性：
  * 什麼是 Golang 中的接口？與其他語言（如 Java、Python）的接口或抽象類有何不同？
  * 接口的實現與接口變量類型轉換的原理是什麼？
* Golang 的項目管理：
  * 如何使用 go mod 管理依賴項？
  * 如何編譯和打包 Golang 程式？
* 如何處理 Golang 程式中的競態條件 (race condition)？
* interface的意義
*  go的型別，或使用上，舉兩個可能造成的效能問題
   *  slice 每次都用append自動擴張，會有效能問題
*  gRPC

