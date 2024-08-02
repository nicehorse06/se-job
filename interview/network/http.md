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
## 301
* 永久重定向，以後瀏覽器看到這個URL都會直接被轉去其他URL
* 用在短網址上以降低負載
## 302
* 臨時重定向，還是會先經過原先的URL發送請求，再來才轉去其他URL
* 短網址server可以方便分析點擊率跟來源