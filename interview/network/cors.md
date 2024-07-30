# CORS（Cross-Origin Resource Sharing）

CORS（Cross-Origin Resource Sharing） 是一種網絡瀏覽器技術標準，它允許瀏覽器從不同的來源（域）請求資源。
它解決了瀏覽器的同源策略（Same-Origin Policy）限制，允許瀏覽器安全地從一個域名向另一個域名請求資源。


## 為什麼需要 CORS？
* 現代瀏覽器出於安全考慮，實施了同源策略
  * 一個網頁只能向與它相同域名、協議和端口的資源請求數據。
* CORS是一種允許網頁從不同來源請求資源的機制，但它本身也帶來了一些潛在的安全風險

## 預檢請求（Preflight Requests）
* 對於那些修改了請求方法或使用了自定義頭部的請求，瀏覽器會先發送一個預檢請求，以確定服務器是否允許真正的請求。
* 如果預檢請求獲得批准，瀏覽器將發送實際請求。
  
## 設置 CORS
* 在服務器端，可以通過設置 HTTP 頭部來允許跨域請求
* Access-Control-Allow-Origin：指定允許哪些來源可以訪問資源。
* Access-Control-Allow-Methods：指定允許哪些 HTTP 方法（如 GET、POST）。
* Access-Control-Allow-Headers：指定允許哪些自定義頭部。
* Access-Control-Allow-Credentials：指示是否允許攜帶憑證（如 Cookie）。
* Access-Control-Max-Age：指定預檢請求的結果可以被緩存多長時間。

## 安全風險
* 敏感信息泄露
  * 可能會導致敏感信息被泄露給未授權的第三方網站
* 跨站腳本攻擊（XSS）
  * XSS 腳本可以利用 CORS 發送跨域請求並竊取敏感數據。
* 憑證和身份驗證
  * 瀏覽器會攜帶用戶的憑證（如 Cookie）進行跨域未授權的請求


## 安全實踐
* 限制允許的來源域名。
* 驗證來源請求。
* 正確處理預檢請求。
* 控制 Access-Control-Allow-Credentials 的使用。
