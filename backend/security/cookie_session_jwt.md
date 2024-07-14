# Session / Cookie 驗證的原理與流程

當用戶使用帳號密碼登入時，最陽春的驗證模式通常使用 Session 和 Cookie 來維持用戶的登入狀態。以下是這種驗證模式的原理與流程，以及其缺點：

## 原理與流程

1. **用戶登入請求（Login Request）**：
   - 用戶在登入頁面輸入帳號和密碼，並提交表單。
   - 例如：
     ```http
     POST /login
     Content-Type: application/x-www-form-urlencoded

     username=USERNAME&password=PASSWORD
     ```

2. **伺服器驗證用戶身份（Server-side Authentication）**：
   - 伺服器接收到登入請求後，驗證用戶提供的帳號和密碼是否正確。
   - 通常會查詢數據庫以檢查帳號和密碼是否匹配。

3. **建立 Session（Create Session）**：
   - 驗證成功後，伺服器會為該用戶創建一個 Session。
   - Session 包含用戶的相關資訊，如用戶 ID、登入時間等。
   - 伺服器會生成一個唯一的 Session ID 並將其存儲在伺服器端（如內存或數據庫）。

4. **發送 Cookie（Send Cookie）**：
   - 伺服器將 Session ID 通過 Set-Cookie 標頭發送給用戶端，並將其存儲在用戶的瀏覽器中。
   - 例如：
     ```http
     HTTP/1.1 200 OK
     Set-Cookie: session_id=UNIQUE_SESSION_ID; HttpOnly; Secure
     ```

5. **後續請求攜帶 Cookie（Subsequent Requests with Cookie）**：
   - 在後續的請求中，用戶端會自動將 Cookie 中的 Session ID 發送給伺服器，以識別用戶身份。
   - 例如：
     ```http
     GET /protected-resource
     Cookie: session_id=UNIQUE_SESSION_ID
     ```

6. **伺服器驗證 Session ID（Server-side Session Validation）**：
   - 伺服器接收到請求後，根據 Session ID 查找並驗證對應的 Session，確定用戶身份。
   - 如果 Session 有效，伺服器將允許用戶訪問受保護的資源。

## 缺點與挑戰

1. **擴展性（Scalability）**：
   - Session 存儲在伺服器端，當伺服器數量增加時，需要確保所有伺服器能夠共享 Session 資料（例如使用集中式存儲如 Redis）。
   - 這增加了系統的複雜性和運行成本。

2. **安全性（Security）**：
   - Session ID 存儲在 Cookie 中，容易受到 XSS（跨站腳本）攻擊。攻擊者可以通過惡意腳本竊取用戶的 Session ID。
   - 可以使用 HttpOnly 標記來防止 JavaScript 訪問 Cookie，並使用 Secure 標記確保 Cookie 僅在 HTTPS 連接中傳輸。

3. **會話劫持（Session Hijacking）**：
   - 如果 Session ID 被攻擊者竊取（例如通過網路攔截或 XSS 攻擊），攻擊者可以冒充合法用戶進行操作。
   - 可以通過使用短期 Session ID 並定期刷新，以及在用戶敏感操作時重新驗證用戶身份來減少風險。

4. **存儲空間（Storage）**：
   - 大量的 Session 會佔用伺服器的存儲空間，特別是在高並發環境中。
   - 需要定期清理過期的 Session，以釋放存儲空間。

## 總結

Session / Cookie 驗證模式簡單易用，適合小型應用。但隨著應用規模的擴大，擴展性、安全性等問題會變得更加突出。現代應用中，許多開發者選擇使用 JWT（JSON Web Token）等無狀態的驗證方式來替代傳統的 Session / Cookie 驗證，以提高應用的擴展性和安全性。


# JWT（JSON Web Token）簡介

JWT（JSON Web Token）是一種基於 JSON 的開放標準（RFC 7519），用於在各方之間傳遞請求時進行身份驗證和信息交換。與傳統的 Session/Cookie 驗證不同，JWT 是無狀態的，不需要在伺服器端存儲會話信息。

## 原理與流程

### JWT 結構

JWT 由三部分組成，這三部分用點（`.`）分隔：
1. **Header（標頭）**：包含令牌的類型（JWT）和簽名算法（如 HMAC SHA256 或 RSA）。
2. **Payload（有效載荷）**：包含聲明（claims），即用戶的身份信息和其他數據。
3. **Signature（簽名）**：用來驗證令牌的真實性和完整性。

### JWT 驗證流程

1. **用戶登入請求**：
   - 用戶在登入頁面輸入帳號和密碼，並提交表單。

2. **伺服器驗證用戶身份**：
   - 伺服器接收到登入請求後，驗證用戶提供的帳號和密碼是否正確。

3. **生成 JWT**：
   - 驗證成功後，伺服器會生成一個 JWT，包含用戶身份信息和其他必要的數據。

4. **發送 JWT**：
   - 伺服器將生成的 JWT 發送給客戶端，通常在 HTTP 回應中包含該令牌。

5. **後續請求攜帶 JWT**：
   - 客戶端在後續的請求中，將 JWT 作為 Authorization 標頭的一部分發送給伺服器。

6. **伺服器驗證 JWT**：
   - 伺服器接收到請求後，驗證 JWT 的真實性和完整性，並解析其中的用戶信息。

7. **授權訪問資源**：
   - 如果 JWT 有效，伺服器將允許用戶訪問受保護的資源。

## 好處

1. **無狀態（Stateless）**：
   - JWT 是無狀態的，不需要在伺服器端存儲會話信息，這使得應用更容易橫向擴展。
   - 伺服器只需要驗證 JWT 的真實性和完整性，而不需要查詢會話存儲。

2. **減少伺服器負擔（Reduced Server Load）**：
   - 由於伺服器不需要維護會話狀態，減少了伺服器的存儲和計算負擔。

3. **跨域支持（Cross-domain Support）**：
   - JWT 可以輕鬆在不同域名間傳遞，適合用於 SPA（單頁應用）和行動應用。

4. **安全性（Security）**：
   - JWT 使用簽名技術來確保令牌的真實性和完整性。
   - 支持多種簽名算法（如 HMAC 和 RSA），可以根據需求選擇合適的安全強度。

5. **自包含（Self-contained）**：
   - JWT 自包含必要的用戶信息和權限數據，伺服器可以直接從令牌中提取相關信息，減少了數據庫查詢。

## 缺點與挑戰

1. **令牌大小（Token Size）**：
   - 由於 JWT 包含許多信息，其大小比 Session ID 大，可能增加網路傳輸負擔。

2. **令牌失效管理（Token Revocation）**：
   - JWT 一旦簽發，除非其過期，否則無法輕易使其失效。需要設計額外的機制來處理令牌失效（如黑名單）。

3. **安全性管理（Security Management）**：
   - 必須妥善管理簽名密鑰，防止密鑰洩露。
   - 使用 HTTPS 傳輸 JWT，以防止令牌被攔截。


# 防止 JWT 被竊取的措施

如果 JWT 被竊取，攻擊者可以使用這個令牌在其有效期內模仿合法用戶進行操作，這會帶來嚴重的安全風險。為了防止 JWT 被竊取，必須採取多種安全措施。

## JWT 被竊取的風險

1. **模仿合法用戶**：
   - 攻擊者可以使用竊取的 JWT 獲取受保護的資源，執行用戶的操作，甚至進行惡意活動。

2. **會話劫持**：
   - 攻擊者可以持續使用被竊取的 JWT，直到令牌過期或被撤銷。

## 防止 JWT 被竊取的措施

1. **使用 HTTPS**：
   - **原理**：HTTPS（HyperText Transfer Protocol Secure）使用 TLS（Transport Layer Security）來加密通信，防止中間人攻擊和數據攔截。
   - **實踐**：所有傳輸 JWT 的通信必須使用 HTTPS，確保 JWT 在傳輸過程中不被攔截。

2. **HttpOnly 標記**：
   - **原理**：`HttpOnly` 標記阻止 JavaScript 訪問 Cookie，有效防止跨站腳本攻擊（XSS）。
   - **實踐**：將 JWT 存儲在設置了 `HttpOnly` 標記的 Cookie 中。

3. **Secure 標記**：
   - **原理**：`Secure` 標記確保 Cookie 僅在 HTTPS 連接中傳輸，防止在未加密的 HTTP 連接中洩露。
   - **實踐**：將 JWT 存儲在設置了 `Secure` 標記的 Cookie 中。

4. **短期令牌和刷新令牌**：
   - **原理**：使用短期有效的存取令牌（Access Token），並通過長期有效的刷新令牌（Refresh Token）來獲取新的存取令牌，減少令牌被竊取後的風險。
   - **實踐**：設置較短的存取令牌有效期，並實現刷新令牌機制。

5. **令牌撤銷機制**：
   - **原理**：在伺服器端保留撤銷令牌的列表，一旦發現令牌被濫用，立即將其加入撤銷列表。
   - **實踐**：實現令牌撤銷機制，允許伺服器在必要時無效化特定的令牌。

6. **定期輪換密鑰**：
   - **原理**：定期更換簽名和驗證 JWT 的密鑰，可以提高安全性，防止長期使用同一密鑰帶來的風險。
   - **實踐**：設置密鑰輪換策略，定期更換密鑰並確保新舊密鑰可以同時使用一段時間，以處理未過期的 JWT。

## 總結

在瀏覽器中存儲 JWT 的最佳實踐包括使用 HTTPS、設置 HttpOnly 和 Secure 標記，以及實施短期令牌和刷新令牌機制等。這些措施可以顯著降低 JWT 被竊取的風險，確保應用的安全性。


# Session 與 JWT 的主要差異

## 主要差異

1. **狀態管理**：
   - **Session**：伺服器端存儲會話信息。每個用戶都有一個唯一的 Session ID，伺服器根據 Session ID 存取對應的用戶數據。
   - **JWT**：無狀態。所有用戶信息和權限數據都被編碼成令牌（token），由客戶端存儲並在每次請求時發送給伺服器。

2. **存儲位置**：
   - **Session**：會話數據存儲在伺服器端（例如內存、數據庫、分佈式緩存等）。
   - **JWT**：令牌存儲在客戶端（例如瀏覽器的 LocalStorage 或 Cookie 中）。

## 優缺點比較

### Session

**優點**：
- **簡單易用**：適合小型應用，容易實現。
- **安全性較高**：伺服器端控制所有會話數據，可以更嚴格地管理會話。

**缺點**：
- **擴展性差**：會話數據存儲在伺服器，當用戶數量增加時，伺服器負擔也會增加。多伺服器部署時，需要共享會話數據，增加了複雜性。
- **伺服器負擔重**：每個會話都佔用伺服器資源，對於高並發應用來說負擔較大。

### JWT

**優點**：
- **無狀態**：伺服器不需要存儲會話數據，所有信息都在令牌中，自包含（self-contained）。
- **擴展性好**：由於伺服器不存儲會話數據，增加伺服器節點非常容易，適合分佈式架構。
- **跨域支持**：適合 SPA 和行動應用，令牌可以在不同域名間傳遞。

**缺點**：
- **安全性管理**：需要妥善管理簽名密鑰，防止密鑰洩露。使用 HTTPS 傳輸 JWT 以防止令牌被攔截。
- **令牌大小**：JWT 包含較多信息，令牌較大，可能增加網路傳輸負擔。
- **令牌失效管理**：JWT 一旦簽發，除非過期，否則無法輕易使其失效。需要設計額外的機制來處理令牌失效（如黑名單）。

## 總結

**Session**：
- 優點在於簡單易用和安全性較高，但擴展性差且伺服器負擔重。

**JWT**：
- 優點在於無狀態、擴展性好和跨域支持，但需要注意安全性管理和令牌失效管理。


## ref
* GPT