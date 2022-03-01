# W3School CSS Flexbox 筆記
## 參考資料
* [W3School Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)

## layout
### 在學 Flexbox 前先了解既有的四種 layout:
* Block：每個網頁的一段區塊用
* Inline：文件用
* Table：二維的表格資料
* Positioned ：把每個元素放到指定位置

## Flexbox Elements
`以下有一個 flex container 還有三個 flex item`
```html
<style>
.flex-container {
  display: flex;
  background-color: DodgerBlue;
}
</style>
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```
### Parent Element (Container)

```
The flex container becomes flexible by setting the display property to flex:
```

`以下皆為 container 屬性:`
```css
.flex-container {
  display: flex;
}
```

#### flex 可加上以下幾種屬性
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

### The flex-direction Property
```
flex-direction 定義了 flex items 在 container 中堆疊的方向，有以下四種，而且顧名思義
```
* column
* column-reverse
* row
* row-reverse

### The flex-wrap Property
* flex-wrap 定義了在自適應的過程是否要換行
* wrap：換行
* nowrap 不換行
* wrap-reverse 反方向換行

### The justify-content Property
`跟 grid-container 的 justify-content有類似的用法, e.g.`
```css
.flex-container {
display: flex;
justify-content: center;
}
```
* space-around 代表把分散寬度到各 column 左右
* space-between 分散寬度到 column 到 column 之間
* space-around 讓column左右會有固定的寬度， 總寬度會分散到這些寬度
* center 全部 column 移到中間
* flex-start 全部 column 移到左側
* flex-end 全部 column 移到右邊

### The align-items Property
```
align-items 負責 flex 方向上下距離的調整，跟align-content有一點差別，比較是針對單一個item去調整的屬性,
會跟 align-content 搞混，尤其他們都有 center ，需要多研究
```
e.g.
```css
.flex-container {
display: flex;
height: 200px;
align-content: center;
}
```
* center:置中
* flex-start：置上
* flex-end：置下
* stretch：把 item 上下延伸塞滿 container
* baseline：對其所有 item 中的字來做上下管理，無視字的大小和欄位高低

### The align-content Property
align-content 用法同 justify-content，為row方向的版本

### Perfect Centering
只要設置 justify-content 和 align-items 為 center 即可完美置中
```css
.flex-container {
display: flex;
height: 300px;
justify-content: center;
align-items: center;
}
```

## child Element(Items)
`只要是flex container 的直接子屬性會自動成為 flexible 的 items
以下方法皆為 items 裡面的`
### The order Property
order 屬性指定了 flex item 之間的排列順序
``` html
<div class=”flex-container”>
<div style=”order: 3">1</div>
<div style=”order: 2">2</div>
<div style=”order: 4">3</div> 
<div style=”order: 1">4</div>
</div>
```

### The flex-grow Property
`flex-grow 設定了 item 在自適應的時 寬度的成長速度比率`
``` html
<div class=”flex-container”>
<div style=”flex-grow: 1">1</div>
<div style=”flex-grow: 1">2</div>
<div style=”flex-grow: 8">3</div> 
</div>
```
### The flex-shrink Property
`flex-shrink 設定了 item 在自適應的時 寬度的縮小速度比率，以下 3 那項縮小時關渡是固定不變的`
```html
<div class=”flex-container”>
<div>1</div>
<div>2</div>
<div style=”flex-shrink: 0">3</div>
<div>4</div>
<div>5</div>
<div>6</div>
<div>7</div>
<div>8</div>
<div>9</div>
<div>10</div>
</div>
```

### The flex-basis Property
`flex-basis 設定了item的起始寬度，可在自適應時被壓縮`
```html
<div class=”flex-container”>
<div>1</div>
<div>2</div>
<div style=”flex-basis: 200px”>3</div>
<div>4</div>
</div>
```

### The flex Property
`flex 可視為 flex-grow, flex-shrink 和 flex-basis 屬性的縮寫
以下 flex 意思為 flex-grow 為 0，flex-shrink為0，flex-basis 為 200px`
```html
<div class=”flex-container”>
<div>1</div>
<div>2</div>
<div style=”flex: 0 0 200px”>3</div>
<div>4</div>
</div>
```

### The align-self Property
`align-self 為 item 挑整上下對齊狀態的屬性，跟 align-items 用法一樣，會覆蓋 align-items`
```html
<div class=”flex-container”>
<div>1</div>
<div style=”align-self: flex-start”>2</div>
<div style=”align-self: flex-end”>3</div>
<div style=”align-self: center”>4</div>
</div>
```