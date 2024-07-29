# CSRF

* CSRF 就是在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」
* 瀏覽器的機制，你只要發送 request 給某個網域，就會把關聯的 cookie 一起帶上去

## 防範
CSRF Token 和 SameSite=Strict 確實都有助於防止 CSRF（跨站請求偽造）攻擊，但它們是不同的技術，各有其適用範圍和局限性。使用兩者可以提供更全面的防護

### CSRF Token
* CSRF Token 是一種隨機生成的值，會在每次發送敏感請求（如表單提交、狀態變更等）時附加到請求中。
* 伺服器端會在收到請求時驗證 CSRF Token 是否正確，以確保該請求是由合法用戶發起的。

* 優點
  * 有效防止 CSRF 攻擊，因為攻擊者無法獲取或猜測合法的 CSRF Token。
  * 與任何瀏覽器屬性無關，適用於所有請求。
* 缺點
  * 需要額外的開發和維護工作，包括生成和驗證 Token。
  * 要求前端和後端協同工作，在每次請求中都附加和驗證 Token。

### set cookie SameSite=Strict
* SameSite 屬性限制了 Cookie 的跨站請求行為。
* SameSite=Strict 意味著 Cookie 僅在同一站點的請求中發送，從而防止跨站點請求攜帶 Cookie。
* 優點
  * 簡單易用，只需在設置 Cookie 時添加相應的屬性。
  * 不需要額外的開發工作，無需改動應用程序邏輯。
* 缺點
  * SameSite=Strict 會限制一些合法的跨站請求場景。
    * 例如，從第三方站點鏈接到你站點的情況下，會話 Cookie 不會被發送，可能影響用戶體驗。
  * 有些舊的瀏覽器可能不支持 SameSite 屬性。


### 雙重身份驗證（2FA）
* 增加第二層身份驗證（如短信驗證碼、Google Authenticator 等），確保只有經過雙重驗證的用戶才能執行敏感操作。
* 在用戶登錄後，要求用戶輸入第二層身份驗證碼。

### Referer 檢查
* 檢查請求的 Referer 標頭，確保請求來自同一站點

### CAPTCHA
* 使用 CAPTCHA 驗證碼來區分人和機器，防止自動化攻擊。

## 結論
* CSRF Token
  * 更強大，能防止所有類型的 CSRF 攻擊，無論是跨站點鏈接還是跨站點表單提交。
  * 適用於所有瀏覽器，無論是否支持 SameSite 屬性。
* SameSite=Strict
  * 提供了一層基本的防護，能阻止大部分簡單的 CSRF 攻擊。
  * 對合法的跨站請求有一定限制，因此可能不適用於所有場景。
* 最好的安全策略是綜合使用多種防範方法，這樣可以提供多層次的保護，確保應用程序的安全性。


## ref
* [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
