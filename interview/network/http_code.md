
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