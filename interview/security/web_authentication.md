# web client server驗證

## todo
* cookie 和 session的關係
  * 怎麼保護cookie
    * http有哪些狀態  
  * session id
* JWT解決什麼問題
* 有什麼資安問題
  * XSS`
* api token
  * 放在header什麼地方
* 結合Oauth 2.0
* CORS

### todo
* sessionid也寫在裡面
* 資料存放在客戶端，不會造成伺服器端的過載
* 主要是記錄著，在 web server 上的使用者訊息（一個SessionID對應一筆SessionID）。
* Session 機制會在一個用戶完成身分認證後，存下所需的用戶資料，接著產生一組對應的對應的id，存入 cookie 後傳回用戶端。
* 
## HTTP
* 無狀態協議，每次請求都是獨立，需要使用cookie/session
* 

## cookie
* Cookie 是由伺服器發送並儲存在用戶端的文本文件，用來儲存用戶的相關資訊。
* 每次用戶發送請求時，瀏覽器會自動帶上相應的 Cookie。
  * 只會針對原本網域
* 優點
  * 能夠在用戶端儲存數據。
  * 支持跨多個請求持續存儲數據。
  * 可以設定過期時間。
* 應用場景
  * 用戶身份識別
  * 記住用戶偏好設置（如語言選擇）
  * 追蹤用戶行為（如購物車功能）
* 主要屬性
  * name: Cookie 的名稱。
  * value: Cookie 的值。
  * domain: Cookie 的適用域。
  * path: Cookie 的適用路徑。
  * expires: Cookie 的過期時間。
  * secure: 只有在 HTTPS 協議下才傳輸 Cookie。

### 缺點
* 伺服器端可修改cookie，無法確保真實性

### 防止串改
* 使用簽章 (Signed Cookies)
  * 簽章是將 Cookie 的內容和密鑰結合生成的哈希值，每次讀取都可以用這個哈希值來驗證 Cookie 是否被竄改過。
* 使用 HTTPS
  * 防止 Cookie 在傳輸過程中被竄改或截取。
  * secure=True, httponly=True
*  設置 HttpOnly 和 Secure 屬性
*  設置過期時間


## Session
* Session 是伺服器端用來存儲用戶數據的機制。
  * 如果cookie存的資料太多影響傳輸，可以放在session
* Session 的數據儲存在伺服器端，而client只會持有一個 Session ID。
* 優點
  * 安全性較高，數據儲存在伺服器端。
  * 適合存儲較大的數據。
* 應用場景
  * 用戶登入狀態管理。
  * 多頁面交互中的狀態保持。
* 主要屬性
  * Session ID: 用戶端與伺服器之間的唯一標識符。
  * session data: 儲存在伺服器端的數據。

## cookie session比較
* 存儲位置：Cookie 儲存在用戶端，Session 儲存在伺服器端。
* 安全性：Session 比 Cookie 更安全，因為數據不直接暴露在用戶端。
* 容量限制：Cookie 容量有限（約 4KB），Session 沒有此限制。
* 生命周期：Cookie 可以設置過期時間，Session 在伺服器端並不會自動失效，除非session已經超過設置的失效時間。



## session cookie 驗證流程
> 當用戶使用帳號密碼登入時，最陽春的驗證模式通常使用 Session 和 Cookie 來維持用戶的登入狀態。

### 原理與流程

1. 用戶登入請求（Login Request）：
   - 用戶在登入頁面輸入帳號和密碼，並提交表單。
   - 例如：
     ```http
     POST /login
     Content-Type: application/x-www-form-urlencoded

     username=USERNAME&password=PASSWORD
     ```

2. 伺服器驗證用戶身份（Server-side Authentication）：
   - 伺服器接收到登入請求後，驗證用戶提供的帳號和密碼是否正確。
   - 通常會查詢數據庫以檢查帳號和密碼是否匹配。

3. 建立 Session（Create Session）：
   - 驗證成功後，伺服器會為該用戶創建一個 Session。
   - Session 包含用戶的相關資訊，如用戶 ID、登入時間等。
   - 伺服器會生成一個唯一的 Session ID 並將其存儲在伺服器端（如內存或數據庫）。

4. 發送 Cookie（Send Cookie）：
   - 伺服器將 Session ID 通過 Set-Cookie 標頭發送給用戶端，並將其存儲在用戶的瀏覽器中。
   - 例如：
     ```http
     HTTP/1.1 200 OK
     Set-Cookie: session_id=UNIQUE_SESSION_ID; HttpOnly; Secure
     ```

5. 後續請求攜帶 Cookie（Subsequent Requests with Cookie）：
   - 在後續的請求中，用戶端會自動將 Cookie 中的 Session ID 發送給伺服器，以識別用戶身份。
   - 例如：
     ```http
     GET /protected-resource
     Cookie: session_id=UNIQUE_SESSION_ID
     ```

6. 伺服器驗證 Session ID（Server-side Session Validation）：
   - 伺服器接收到請求後，根據 Session ID 查找並驗證對應的 Session，確定用戶身份。
   - 如果 Session 有效，伺服器將允許用戶訪問受保護的資源。

### 缺點與挑戰

1. 擴展性（Scalability）：
   - Session 存儲在伺服器端，當伺服器數量增加時，需要確保所有伺服器能夠共享 Session 資料（例如使用集中式存儲如 Redis）。
   - 這增加了系統的複雜性和運行成本。

2. 安全性（Security）：
   - Session ID 存儲在 Cookie 中，容易受到 XSS（跨站腳本）攻擊。攻擊者可以通過惡意腳本竊取用戶的 Session ID。
   - 可以使用 HttpOnly 標記來防止 JavaScript 訪問 Cookie，並使用 Secure 標記確保 Cookie 僅在 HTTPS 連接中傳輸。

3. 會話劫持（Session Hijacking）：
   - 如果 Session ID 被攻擊者竊取（例如通過網路攔截或 XSS 攻擊），攻擊者可以冒充合法用戶進行操作。
   - 可以通過使用短期 Session ID 並定期刷新，以及在用戶敏感操作時重新驗證用戶身份來減少風險。

4. 存儲空間（Storage）：
   - 大量的 Session 會佔用伺服器的存儲空間，特別是在高並發環境中。
   - 需要定期清理過期的 Session，以釋放存儲空間。
### 總結

Session / Cookie 驗證模式簡單易用，適合小型應用。但隨著應用規模的擴大，擴展性、安全性等問題會變得更加突出。現代應用中，許多開發者選擇使用 JWT（JSON Web Token）等無狀態的驗證方式來替代傳統的 Session / Cookie 驗證，以提高應用的擴展性和安全性。


## HTTP cookie屬性

### domain

### path

### Max-Age

### HttpOnly
* 防止 Cookie 被客戶端腳本（JavaScript）讀取，從而減少跨站腳本攻擊（XSS）的風險。
* 當 Cookie 設置了 HttpOnly 屬性後，它不能被 JavaScript 的 document.cookie 訪問或修改，只能通過 HTTP 請求和回應傳輸。

### Secure
* 確保 Cookie 只能通過 HTTPS 傳輸，防止 Cookie 在傳輸過程中被攔截和篡改。
* 當 Cookie 設置了 Secure 屬性後，瀏覽器會在傳輸該 Cookie 時強制使用 HTTPS，從而加密傳輸數據。

### SameSite
* 限制 Cookie 的跨站傳輸，防止跨站請求偽造（CSRF）攻擊。
* SameSite 屬性有三個值：Strict、Lax 和 None。
  * Strict：Cookie 只在同站點請求時發送，不包括跨站點的情況，即使是來自不同站點的鏈接。
  * Lax：允許GET跨站，其他不行，適度防止大多數 CSRF 攻擊，同時保持用戶體驗。
  * None：允許跨站傳輸 Cookie，但必須與 Secure 屬性一起使用。

## Session Hijacking 防範
*  全程使用HTTPS
   * 確保 Session Cookie 使用 Secure 屬性，使其只能通過 HTTPS 傳輸。
*  設置 Cookie 屬性
   *  使用 HttpOnly 屬性，使得 Cookie 不能通過 JavaScript 訪問，減少 XSS 攻擊風險。
   *  使用 Secure 屬性，確保 Cookie 只能通過 HTTPS 傳輸。
   *  設置 SameSite 屬性，限制 Cookie 的跨站傳輸
   *  `Set-Cookie: session_id=UNIQUE_SESSION_ID; HttpOnly; Secure; SameSite=Strict`
*  Session 超時和重新認證
   *  設置 Session 的有效期，定期過期
   *  長時間不活動的用戶需要重新登錄。
   *  每次身份驗證成功就重新生成id
*  Session 固定攻擊防護
   *  在用戶成功登入後，重新生成一個新的 Session ID。
   *  使用JWT（JSON Web Token）
*  監控和檢測異常活動
   *  檢測異常的會話行為，例如同一會話在短時間內從不同 IP 地址或地理位置進行訪問。
   *  設置異常活動的警報和會話終止機制。
*  雙重身份驗證（2FA）：
*  限制 Session 範圍
   *  使用 IP 綁定限制 Session 的使用範圍
*  防範 XSS 攻擊：
   * 使用 Content Security Policy (CSP) 來限制可執行的腳本來源。




# JWT（JSON Web Token）簡介

JWT（JSON Web Token）用於在各方之間傳遞請求時進行身份驗證和信息交換。
與傳統的 Session/Cookie 驗證不同，JWT 是無狀態的，不需要在伺服器端存儲會話信息。
JWT 中儲存的資訊是經過數字簽名的，因此可以被信任和理解。

## 原理與流程

### JWT 結構

JWT 由三部分組成，這三部分用點（`.`）分隔：
1. Header（標頭）：包含令牌的類型（JWT）和簽名算法（如 HMAC SHA256 或 RSA）。
2. Payload（有效載荷）：包含聲明（claims），即用戶的身份信息和其他數據。
3. Signature（簽名）：用來驗證令牌的真實性和完整性。

### JWT 驗證流程

1. 用戶登入請求：
   - 用戶在登入頁面輸入帳號和密碼，並提交表單。

2. 伺服器驗證用戶身份：
   - 伺服器接收到登入請求後，驗證用戶提供的帳號和密碼是否正確。

3. 生成 JWT：
   - 驗證成功後，伺服器會生成一個 JWT，包含用戶身份信息和其他必要的數據。

4. 發送 JWT：
   - 伺服器將生成的 JWT 發送給客戶端，通常在 HTTP 回應中包含該令牌。

5. 後續請求攜帶 JWT：
   - 客戶端在後續的請求中，將 JWT 作為 Authorization 標頭的一部分發送給伺服器。

6. 伺服器驗證 JWT：
   - 伺服器接收到請求後，驗證 JWT 的真實性和完整性，並解析其中的用戶信息。

7. 授權訪問資源：
   - 如果 JWT 有效，伺服器將允許用戶訪問受保護的資源。

## 好處

1. 無狀態（Stateless）：
   - JWT 是無狀態的，不需要在伺服器端存儲會話信息，這使得應用更容易橫向擴展。
   - 簡化伺服器：伺服器只需驗證 JWT，而不需要儲存和管理會話數據。
   - 跨域使用：JWT 可以在不同域之間傳遞，適合微服務架構和單頁應用（SPA）。

2. 減少伺服器負擔（Reduced Server Load）：
   - 由於伺服器不需要維護會話狀態，減少了伺服器的存儲和計算負擔。
   - 所有的信息都包含在 Token 中。當用戶每次請求時，伺服器只需要驗證 JWT 的簽名和有效性，而不需要每次都查詢資料庫來驗證用戶身份。

3. 安全性（Security）：
   - JWT 使用簽名技術來確保令牌的真實性和完整性。
   - 支持多種簽名算法（如 HMAC 和 RSA），可以根據需求選擇合適的安全強度。

4. 自包含（Self-contained）：
   - JWT 自包含必要的用戶信息和權限數據，伺服器可以直接從令牌中提取相關信息，減少了數據庫查詢。

## 缺點與挑戰

1. 令牌大小（Token Size）：
   - 由於 JWT 包含許多信息，其大小比 Session ID 大，可能增加網路傳輸負擔。

2. 令牌失效管理（Token Revocation）：
   - JWT 一旦簽發，除非其過期，否則無法輕易使其失效。需要設計額外的機制來處理令牌失效（如黑名單）。

3. 安全性管理（Security Management）：
   - 必須妥善管理簽名密鑰，防止密鑰洩露。
   - 使用 HTTPS 傳輸 JWT，以防止令牌被攔截。
  
4. 信息暴露：JWT 的 Payload 是 Base64 編碼的，任何人都可以解碼並查看其中的信息，因此不要在 JWT 中存儲敏感信息。


# 防止 JWT 被竊取的措施

如果 JWT 被竊取，攻擊者可以使用這個令牌在其有效期內模仿合法用戶進行操作，這會帶來嚴重的安全風險。為了防止 JWT 被竊取，必須採取多種安全措施。

## JWT 被竊取的風險

1. 模仿合法用戶：
   - 攻擊者可以使用竊取的 JWT 獲取受保護的資源，執行用戶的操作，甚至進行惡意活動。

2. 會話劫持：
   - 攻擊者可以持續使用被竊取的 JWT，直到令牌過期或被撤銷。

## 防止 JWT 被竊取的措施

1. 使用 HTTPS：
   - 原理：HTTPS（HyperText Transfer Protocol Secure）使用 TLS（Transport Layer Security）來加密通信，防止中間人攻擊和數據攔截。
   - 實踐：所有傳輸 JWT 的通信必須使用 HTTPS，確保 JWT 在傳輸過程中不被攔截。

2. HttpOnly 標記：
   - 原理：`HttpOnly` 標記阻止 JavaScript 訪問 Cookie，有效防止跨站腳本攻擊（XSS）。
   - 實踐：將 JWT 存儲在設置了 `HttpOnly` 標記的 Cookie 中。

3. Secure 標記：
   - 原理：`Secure` 標記確保 Cookie 僅在 HTTPS 連接中傳輸，防止在未加密的 HTTP 連接中洩露。
   - 實踐：將 JWT 存儲在設置了 `Secure` 標記的 Cookie 中。

4. 短期令牌和刷新令牌：
   - 原理：使用短期有效的存取令牌（Access Token），並通過長期有效的刷新令牌（Refresh Token）來獲取新的存取令牌，減少令牌被竊取後的風險。
   - 實踐：設置較短的存取令牌有效期，並實現刷新令牌機制。

5. 令牌撤銷機制：
   - 原理：在伺服器端保留撤銷令牌的列表，一旦發現令牌被濫用，立即將其加入撤銷列表。
   - 實踐：實現令牌撤銷機制，允許伺服器在必要時無效化特定的令牌。

6. 定期輪換密鑰：
   - 原理：定期更換簽名和驗證 JWT 的密鑰，可以提高安全性，防止長期使用同一密鑰帶來的風險。
   - 實踐：設置密鑰輪換策略，定期更換密鑰並確保新舊密鑰可以同時使用一段時間，以處理未過期的 JWT。

## 總結

在瀏覽器中存儲 JWT 的最佳實踐包括使用 HTTPS、設置 HttpOnly 和 Secure 標記，以及實施短期令牌和刷新令牌機制等。這些措施可以顯著降低 JWT 被竊取的風險，確保應用的安全性。


# Session 與 JWT 的主要差異

## 主要差異

1. 狀態管理：
   - Session：伺服器端存儲會話信息。每個用戶都有一個唯一的 Session ID，伺服器根據 Session ID 存取對應的用戶數據。
   - JWT：無狀態。所有用戶信息和權限數據都被編碼成令牌（token），由客戶端存儲並在每次請求時發送給伺服器。

2. 存儲位置：
   - Session：會話數據存儲在伺服器端（例如內存、數據庫、分佈式緩存等）。
   - JWT：令牌存儲在客戶端（例如瀏覽器的 LocalStorage 或 Cookie 中）。

## 優缺點比較

### Session 優缺點

優點：
- 簡單易用：適合小型應用，容易實現。
- 安全性較高：伺服器端控制所有會話數據，可以更嚴格地管理會話。

缺點：
- 擴展性差：會話數據存儲在伺服器，當用戶數量增加時，伺服器負擔也會增加。多伺服器部署時，需要共享會話數據，增加了複雜性。
- 伺服器負擔重：每個會話都佔用伺服器資源，對於高並發應用來說負擔較大。
- 

### JWT 優缺點

優點：
- 無狀態：伺服器不需要存儲會話數據，所有信息都在令牌中，自包含（self-contained）。
- 擴展性好：由於伺服器不存儲會話數據，增加伺服器節點非常容易，適合分佈式架構。
- 跨域支持：適合 SPA 和行動應用，令牌可以在不同域名間傳遞。

缺點：
- 安全性管理：需要妥善管理簽名密鑰，防止密鑰洩露。使用 HTTPS 傳輸 JWT 以防止令牌被攔截。
- 令牌大小：JWT 包含較多信息，令牌較大，可能增加網路傳輸負擔。
- 令牌失效管理：JWT 一旦簽發，除非過期，否則無法輕易使其失效。需要設計額外的機制來處理令牌失效（如黑名單）。

### 總結

Session：
- 優點在於簡單易用和安全性較高，但擴展性差且伺服器負擔重。

JWT：
- 優點在於無狀態、擴展性好和跨域支持，但需要注意安全性管理和令牌失效管理。


## ref
* GPT
* [淺談面試考題之一：Cookie 與 Session 的差異](https://guiblogs.com/cookie-session/)
* [Cookie 和 Session 究竟是什麼？有什麼差別？](https://tw.alphacamp.co/blog/cookie-session-difference)
* [白話 Session 與 Cookie：從經營雜貨店開始](https://hulitw.medium.com/session-and-cookie-15e47ed838bc)