# interface
* todo

# Golang 的接口與多態性
* 接口定義了一組方法，任何實現了這些方法的類型都可以被視為該接口。這提供了一種靈活的多態性。
``` golang
type Animal interface {
    Speak() string
}
```

* 接口變量類型轉換的原理是什麼？ Golang 提供了類型斷言來將接口轉換為具體類型：
``` golang
var i interface{} = "hello"
s, ok := i.(string) // 類型斷言

```