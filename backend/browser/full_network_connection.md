# 網絡連接的完整過程 note

## 從輸入網址列到渲染畫面，過程經歷了什麼事？
* 域名解析 (DNS Lookup)
  * 瀏覽器cache有沒有
  * OS cache有沒有
  * router cache有沒有
  * ISP cache
  * 最後才會DNS Lookup
  * 找到IP
* 建立 TCP 連接
  * TCP/IP three-way handshake
    * Client ----SYN(x)----> Server
    * Client <---SYN-ACK(y, x+1)--- Server
    * Client ----ACK(y+1)----> Server
  * TCP連線建立完成 開始傳資料
* 瀏覽器發起 HTTP(S) 請求
  * server反向代理如nginx設有CA憑證，建立HTTPS連線
  * 瀏覽器向server發起一個http request
* 伺服器處理請求並返回
  * server反向代理(如nginx)接到後經由WSGI傳給python server
  * python server經過處理後，將資料以 HTTP response 回應，包含
    * HTTP status code (狀態碼)
    * Content-Encoding, 
    * Cache-Control (瀏覽器如何快取頁面), 
    * Cookie
  * http code
    * 1XX 表示某種消息 (informational message)
    * 2XX 表示成功
    * 3XX 表示轉導
    * 4XX 表示客戶端出錯
    * 5XX 表示伺服器端出錯。
* 瀏覽器渲染 (render) 頁面
  * HTML渲染
    * HTML變成DOM Tree
    * CSS變成CSSOM Tree
    * 兩者合併程render Tree繪製在畫面上


## 英文回覆
* Check Cache: The browser first checks its local cache to see if the requested resource is stored and is still fresh. If it is, the browser uses this data and skips the following steps.
* Resolve Server Address: If the data is not in the cache or is outdated, the browser asks the operating system to resolve the server’s IP address. The OS performs a DNS lookup to obtain the IP address and returns it to the browser.
* Establish TCP Connection: With the IP address, the browser opens a TCP connection to the server. For HTTPS, this step involves a more complex process including a TLS handshake to ensure encryption and server authentication.
* Send HTTP Request: The browser sends an HTTP request to the server through the established TCP connection.
* Receive HTTP Response: The browser receives an HTTP response from the server. Depending on the server’s instruction, the browser may close the TCP connection or keep it open for reuse with future requests.
* Handle Special HTTP Responses: The browser checks if the response is a redirect, a conditional response (3xx status codes), an authorization request (401 status code), or an error (4xx and 5xx status codes). These are handled differently from normal responses (2xx status codes).
* Cache the Response: If the response is cacheable, it is stored in the cache.
* Process the Response: The browser determines how to deal with the response, for example, whether it's an HTML page, an image, or a sound clip. For unrecognized types, it may offer a download dialog.
* Render the Web Page: HTML content is parsed into the DOM Tree, and CSS is parsed into the CSSOM Tree. These two trees are combined into a render tree, which the browser then uses to run layout and paint operations, ultimately displaying the content on the screen.


## ref
* [在瀏覽器第一次渲染之前](https://otischou.tw/2018/01/11/resouce-prioritization-in-browser.html)
* [[熱門面試題] 從輸入網址列到渲染畫面，過程經歷了什麼事？](https://medium.com/hannah-lin/%E7%86%B1%E9%96%80%E9%9D%A2%E8%A9%A6%E9%A1%8C-%E5%BE%9E%E8%BC%B8%E5%85%A5%E7%B6%B2%E5%9D%80%E5%88%97%E5%88%B0%E6%B8%B2%E6%9F%93%E7%95%AB%E9%9D%A2-%E9%81%8E%E7%A8%8B%E7%B6%93%E6%AD%B7%E4%BA%86%E4%BB%80%E9%BA%BC%E4%BA%8B-4a6cafefe78a)
  * 這篇有英文回應
* [30. [WEB] 從輸入網址列到渲染畫面，過程經歷了什麼事情？](https://ithelp.ithome.com.tw/articles/10228442)
* [經典前端面試題：從瀏覽器網址列輸入 URL 按下 enter 發生了什麼？](https://www.shubo.io/what-happens-when-you-type-a-url-in-the-browser-and-press-enter/)