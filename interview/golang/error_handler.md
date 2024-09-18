# 錯誤處理

* 為什麼 Go 不使用 try-catch？ 
* Go 使用顯式的錯誤返回值，而非像其他語言的 try-catch 機制。
* 這樣的設計是為了強制開發者考慮錯誤處理，避免錯誤被忽視。

``` go
func doSomething() (string, error) {
    if err := someOperation(); err != nil {
        return "", err
    }
    return "Success", nil
}

```
* 解釋 defer、panic 和 recover 的用途。
  * defer 延遲函數執行，通常用於釋放資源。
  * panic 會中斷正常的程序執行，通常用於不可恢復的錯誤。
  * recover 用於捕獲 panic，讓程序從崩潰中恢復。

``` go
defer fmt.Println("Exiting function")
panic("Unexpected error")
recover()
```