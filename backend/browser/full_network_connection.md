# 網絡連接的完整過程

## 從輸入網址列到渲染畫面，過程經歷了什麼事？
* 域名解析 (DNS Lookup)
* 建立 TCP 連接
* 瀏覽器發起 HTTP(S) 請求
* 伺服器處理請求並返回
* 瀏覽器渲染 (render) 頁面
  * HTML渲染
    * HTML變成DOM Tree
    * CSS變成CSSOM Tree
    * 兩者合併程render Tree繪製在畫面上


### ref
* [在瀏覽器第一次渲染之前](https://otischou.tw/2018/01/11/resouce-prioritization-in-browser.html)
* [[熱門面試題] 從輸入網址列到渲染畫面，過程經歷了什麼事？](https://medium.com/hannah-lin/%E7%86%B1%E9%96%80%E9%9D%A2%E8%A9%A6%E9%A1%8C-%E5%BE%9E%E8%BC%B8%E5%85%A5%E7%B6%B2%E5%9D%80%E5%88%97%E5%88%B0%E6%B8%B2%E6%9F%93%E7%95%AB%E9%9D%A2-%E9%81%8E%E7%A8%8B%E7%B6%93%E6%AD%B7%E4%BA%86%E4%BB%80%E9%BA%BC%E4%BA%8B-4a6cafefe78a)
* [30. [WEB] 從輸入網址列到渲染畫面，過程經歷了什麼事情？](https://ithelp.ithome.com.tw/articles/10228442)
* [經典前端面試題：從瀏覽器網址列輸入 URL 按下 enter 發生了什麼？](https://www.shubo.io/what-happens-when-you-type-a-url-in-the-browser-and-press-enter/)