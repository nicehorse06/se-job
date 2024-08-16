# HTTP



# HTTP methood
## GET
* 用於請求從伺服器取得資源（資料）
* 範例：取得某用戶的資料 GET /users/123
## POST
* 用於將新的資源提交到伺服器
* 範例：創建新用戶 POST /users
## PUT
* 用於更新伺服器上的現有資源
* 範例：更新用戶資料 PUT /users/123
## PATCH
* 用於部分更新伺服器上的現有資源。
* 範例：更新用戶的部分資料 PATCH /users/123
## DELETE
* 用於刪除伺服器上的資源。
* 範例：刪除某用戶 DELETE /users/123

## HEAD
* 用於請求資源的元數據（類似 GET，但不返回資源本身）。
* 範例：檢查資源是否存在 HEAD /users/123

## OPTIONS
* 用於請求伺服器支持的 HTTP methods。
* 範例：查詢伺服器支持的請求方法 OPTIONS /users

# HTTP 結構
* HTTP 請求和回應都由三個部分組成：起始行（start line）、標頭（headers）、主體（body）。
## HTTP 請求結構
### 起始行（start line）
* 包含 HTTP method、資源 URL 以及 HTTP 版本。
* 範例：GET /users/123 HTTP/1.1

### 標頭（Headers）
* 包含一些元數據，例如請求的主機、用戶代理、內容類型等。
```
Host: example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
```
### 主體（Body）
* 包含請求的實際數據，常用於 POST、PUT 和 PATCH 請求。
``` json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```


## HTTP 回應結構
### 起始行
* 包含 HTTP 版本、狀態碼和狀態描述。
* 範例：HTTP/1.1 200 OK
### 標頭（Headers）
* 包含一些元數據，例如伺服器類型、內容類型、內容長度等。
```
Server: Apache/2.4.1
Content-Type: application/json
Content-Length: 123
```
### 主體（Body）
* 包含回應的實際數據，通常是 HTML、JSON 或 XML 格式。
``` json
{
  "id": 123,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```



# RESTful API 
* RESTful API 是一種基於 REST（Representational State Transfer）架構設計的應用程式介面

## 特性
* 無狀態（Stateless）
  * 每個請求都包含所有必要的信息（例如認證資訊），伺服器不會保存客戶端的狀態。
  * 無狀態的設計使系統更加可擴展和可靠。
* 統一接口（Uniform Interface）
  * 通過統一和標準化的 URI 和 HTTP methods 來訪問資源。
  * 這種設計使得 API 更加可預測和易於使用。
* 可尋址資源（Addressable Resources）
  * 每個資源都有一個唯一的 URI，客戶端可以通過 URI 訪問和操作資源。
* 基於表示的操作（Representation-based Operations）
  * 客戶端和伺服器通過資源的表示進行通信，通常以 JSON 或 XML 格式傳輸數據。
* 超媒體作為應用狀態引擎（HATEOAS, Hypermedia As The Engine Of Application State）
  * 回應中包含了相關資源的連結，使得客戶端可以根據連結來導航和操作資源。

## RESTful API 的 HTTP Methods 和 URI 設計
### GET
讀取資源。
範例：GET /users 取得所有用戶，GET /users/123 取得 ID 為 123 的用戶。

### POST
創建新資源。
範例：POST /users 創建新用戶。

### PUT
更新資源。
範例：PUT /users/123 更新 ID 為 123 的用戶。

### PATCH
部分更新資源。
範例：PATCH /users/123 部分更新 ID 為 123 的用戶。

### DELETE
刪除資源。
範例：DELETE /users/123 刪除 ID 為 123 的用戶。





# Set-Cookie

# cache

## Cache-Control 


## ETag
## Last-Modified
## TTL（Time-to-Live）

# HTTP code
## 200 OK
* 請求成功
## 201 Created
* 請求成功，並因此創建了一個新的資源。
* 這通常是在 POST 請求或某些 PUT 請求之後發送的回應。
## 202 Accepted
* 已接收請求，但尚未對其進行處理。
* 由於在 HTTP 中沒有後續發送表示請求結果的非同步回應的方法，因此此回應是非承諾性的。
* 它適用於另一個處理請求的進程或伺服器，或用於批處理。
## 301 Moved Permanently
* 永久重定向，以後瀏覽器看到這個URL都會直接被轉去其他URL
* 用在短網址上以降低負載
## 302 Found
* 臨時重定向，還是會先經過原先的URL發送請求，再來才轉去其他URL
* 短網址server可以方便分析點擊率跟來源

## 303 See Other
* 伺服器發送此回應以指示用戶端使用 GET 請求在另一個 URI 獲取所請求的資源。

## 304 Not Modified
* 這用於緩存目的。
* 它告訴用戶端回應未被修改，因此用戶端可以繼續使用回應的相同緩存版本。

## 400 Bad Request
* 由於被認為是用戶端錯誤的原因（例如，錯誤的請求語法、無效的請求訊息框架或欺騙性的請求路由），伺服器無法或不會處理該請求。

## 401 Unauthorized
* 儘管 HTTP 標準指定為「未授權」，但從語義上講，此回應意味著「未經身份驗證」。
* 也就是說，用戶端必須進行身份驗證才能獲取所請求的回應。

## 403 Forbidden
* 用戶端沒有訪問內容的權限；即未經授權，因此伺服器拒絕提供所請求的資源。
* 與 401 Unauthorized 不同，伺服器已知道用戶端的身份。

## 404 Not Found
* 伺服器找不到所請求的資源。在瀏覽器中，這意味著 URL 不被識別。
* 在 API 中，這也可能表示端點是有效的，但資源本身不存在。
* 伺服器可能會發送此回應代碼，而不是 403 Forbidden，以隱藏未經授權的用戶端的資源存在。 

## 405 Method Not Allowed
* 伺服器知道請求方法，但不支援目標資源。
* 例如，API 可能不允許調用 DELETE 來刪除資源。

## 413 Payload Too Large
* 請求實體大於伺服器定義的限制。
* 伺服器可能會關閉連接或返回 Retry-After 標頭欄位。
帽恰恰》監製三井秀樹2019年時就曾經在 X 提到，美麗聖潔弓箭是以另一部魔法少女動畫《歡歡仙子》的弓箭作為延伸而設計而成。外界也推測是因為弓箭已經大量開模，所以就讓恰恰得使用弓箭作為標配，原來，魔法的世界終究與商業脫不了關係啊！（來自大人的哀號）
◉ 漫畫裡，恰恰最後竟然有配對！　　　
動畫發展到中期之後，與漫畫幾乎是截然不同的兩套劇情，但各有支持者，漫畫更加日常爆笑，動畫的戰鬥路線則是讓整體劇情增加了主線。
動畫中的結局停在師傅賽拉維與桃樂絲結婚失敗￼，而漫畫中倒是有給出恰恰最後與 _____ 在一起（這邊就不暴雷，有興趣的大家歡迎再去看￼）。
結局後的13年，漫畫也有推出續集《小紅帽恰恰 N1》、《小紅帽恰恰 N2》，故事從恰恰與里亞、席奈的東京生活開始，久違的三人結局後再
## 414 URI Too Long
* 用戶端所請求的 URI 長度超過伺服器願意解釋的範圍。

## 500 Internal Server Error
* 伺服器遇到一個它不知道如何處理的情況。

## 501 Not Implemented
* 伺服器不支援請求方法，無法處理。
* 伺服器需要支援的唯一方法（因此不應返回此代碼）是 GET 和 HEAD。

## 502 Bad Gateway
* 此錯誤回應表示，伺服器在作為閘道器以獲取處理請求所需的回應時，收到了無效的回應。

## 503 Service Unavailable
* 伺服器尚未準備好處理該請求。常見原因是伺服器正在進行維護或負載過重。
* 需要注意的是，除了此回應外，還應該發送一個用戶友好的頁面來解釋問題。
* 此回應應該用於暫時的情況，並且如果可能，Retry-After HTTP 標頭應包含服務恢復之前的估計時間。
* 網站管理員還必須注意與此回應一起發送的與緩存相關的標頭，因為這些暫時的狀態回應通常不應該被緩存。

## 504 Gateway Timeout
* 當伺服器充當閘道器且無法及時獲得回應時，將提供此錯誤回應。


# ref
* [MDN HTTP 回應狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)

