

# Golang 的 goroutine 和 thread 有何不同？
* goroutine 是 Go 的輕量級執行單元，比傳統的 thread 更高效。每個 goroutine 占用的內存更少，而且 Go runtime 會自動管理 goroutine 調度，因此不需要像操作系統 thread 那樣大量的系統資源。

# 如何使用 channel 在 goroutine 之間進行通信？
* channel 用於在 goroutine 之間進行同步或通信，通過 <- 操作符傳遞數據。
``` go
c := make(chan int)
go func() {
    c <- 5
}()
val := <-c // 接收值
```


* select 用於等待多個 channel 的操作，當一個 channel 準備好時，對應的代碼塊會執行。
``` golang
select {
case val := <-c1:
    fmt.Println("Received from c1:", val)
case val := <-c2:
    fmt.Println("Received from c2:", val)
default:
    fmt.Println("No data received")
}
```