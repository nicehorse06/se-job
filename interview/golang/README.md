# golang 面試筆記


# 粗淺的note
##  var and := 的差異
* := 只能在函數裡面
* inferred代表編譯器判斷

## Go Formatting Verbs
* go輸出格式

## array
* Array Initialization
* 是否都要同樣型態?

```go
// [0 0 0 0 0]
arr1 := [5]int{} //not initialized
// [1 2 0 0 0]
arr2 := [5]int{1,2} //partially initialized
// [1 2 3 4 5]
arr3 := [5]int{1,2,3,4,5} //fully initialized

//[0 10 40 0 0] 
arr4 := [5]int{1:10,2:40}
```

## slice
* TODO 為什麼要有 slice??
* len() function - returns the length of the slice (the number of elements in the slice)
* cap() function - returns the capacity of the slice (the number of elements the slice can grow or shrink to)

### 宣告
``` go
// Create a Slice With []datatype{values}
slice_name := []datatype{values}

// Create a Slice From an Array
var myarray = [length]datatype{values} // An array
myslice := myarray[start:end] // A slice made from the array

  arr1 := [6]int{10, 11, 12, 13, 14,15}
  myslice := arr1[2:4]

//長度（length）是切片實際包含的元素數量，這裡是 2。
fmt.Printf("length = %d\n", len(myslice))
//容量（capacity）是從切片起始位置到原始陣列末尾的元素數量，這裡是 4。
fmt.Printf("capacity = %d\n", cap(myslice))


// Create a Slice With The make() Function
slice_name := make([]type, length, capacity)

myslice1 := make([]int, 5, 10)
fmt.Printf("myslice1 = %v\n", myslice1)
//5
fmt.Printf("length = %d\n", len(myslice1))
// 10 
fmt.Printf("capacity = %d\n", cap(myslice1))

// with omitted capacity
myslice2 := make([]int, 5)
fmt.Printf("myslice2 = %v\n", myslice2)
// 5
fmt.Printf("length = %d\n", len(myslice2))
// 5
fmt.Printf("capacity = %d\n", cap(myslice2))
```

# slice 跟 array差別


# slice 擴展機制
* 當 length == capacity 時，容量通常會擴展到原容量的兩倍，但在切片容量較大時，增長比例可能會變得更小。
* 當大小變小時capacity不會跟著變小
* len就跟python一樣就是item數目
``` go
package main
import ("fmt")

func main() {
  myslice1 := []int{1, 2, 3, 4, 5, 6}  // 定義一個包含 6 個元素的切片
  fmt.Printf("myslice1 = %v\n", myslice1)
  fmt.Printf("length = %d\n", len(myslice1))
  fmt.Printf("capacity = %d\n", cap(myslice1))

  myslice1 = append(myslice1, 20, 21)  // 向切片中追加 20 和 21 兩個元素
  fmt.Printf("myslice1 = %v\n", myslice1)
  // length = 8
  fmt.Printf("length = %d\n", len(myslice1))
  //capacity = 12 這裡是因為超出capacity範圍，自動兩倍擴展
  fmt.Printf("capacity = %d\n", cap(myslice1))
}

```
# copy()
* 如果只想使用一小部份的slice 建議用copy
*  底層數組都是指array  array都是最完整狀態的slice  slice只包含部份array的引用

# naked return
``` go
package main
import ("fmt")

func myFunction(x int, y int) (result int) {
  result = x + y
  // 此處會回傳result
  return
}

func main() {
  fmt.Println(myFunction(1, 2))
}
```

# struct
* Go 使用大小寫來控制 struct 字段的可見性。以大寫字母開頭的字段是導出的（public），而以小寫字母開頭的字段是未導出的（private）：
* ## 函數綁定到 struct
* 就是幫struct加一個method
``` go
type Person struct {
    Name   string
    Age    int
    Job    string
    Salary int
}

func (p Person) Print() {
    fmt.Println("Name: ", p.Name)
    fmt.Println("Age: ", p.Age)
    fmt.Println("Job: ", p.Job)
    fmt.Println("Salary: ", p.Salary)
}

func main() {
    pers := Person{Name: "Alice", Age: 30, Job: "Engineer", Salary: 5000}
    pers.Print()  // 直接通過 `Person` 的實例調用方法
}

```


# map
* 是 hash table
* map 必須要初始化
  * 給定初始值
  * 或用make建立空map
``` go
// Create Maps Using var and :=
var a = map[KeyType]ValueType{key1:value1, key2:value2,...}
b := map[KeyType]ValueType{key1:value1, key2:value2,...}


// Create Maps Using make()Function:
var a = make(map[KeyType]ValueType)
b := make(map[KeyType]ValueType)
```

## Allowed Key Types
> The map key can be of any data type for which the equality operator (==) is defined. These include:

Booleans
Numbers
Strings
Arrays
Pointers
Structs
Interfaces (as long as the dynamic type supports equality)

>Invalid key types are:

Slices
Maps
Functions

These types are invalid because the equality operator (==) is not defined for them.

## Check For Specific Elements in a Map
* val, ok :=map_name[key]
* ok為 true代表有值

## Iterate Over Maps
* 如果要對map Iterate有順序必須先定義一個slice裡面放key的順序，再去for他
``` go
package main
import ("fmt")

func main() {
  a := map[string]int{"one": 1, "two": 2, "three": 3, "four": 4}

  for k, v := range a {
    fmt.Printf("%v : %v, ", k, v)
  }
}
```

# Pointers
* todo

# Interfaces
* todo

# goroutine


# ref
* [w3schools](https://www.w3schools.com/go/)