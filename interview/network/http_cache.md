# HTTP cache

# Cache-Control
* 用來定義緩存策略，包含多個指令來控制緩存的行為。

## 常見的指令
* public：資源可以被任何人緩存（包括代理伺服器和瀏覽器）。
* private：資源只允許瀏覽器（用戶端）緩存，代理伺服器不能緩存。
* no-cache：資源可以緩存，但每次請求都必須向伺服器重新驗證資源是否變更。
* no-store：禁止緩存，不論是瀏覽器還是代理伺服器都不能緩存資源。
* max-age=<seconds>：資源可以緩存的最大時間（以秒計算）。如 max-age=3600 表示資源可以緩存一個小時。
  * TTL（Time-to-Live）
* must-revalidate：一旦資源過期，必須向伺服器重新驗證資源是否仍然有效。
* immutable：資源永遠不會變更，瀏覽器可以無限期使用緩存，不需要重新檢查資源。

# Expires
* 設定一個具體的時間點，告訴瀏覽器資源的過期時間。在此時間點之前，瀏覽器可以直接從緩存讀取資源，不需要向伺服器請求。
* 示例：Expires: Wed, 21 Oct 2025 07:28:00 GMT，表示該資源在指定時間點之前都可以緩存使用。
* 注意：Cache-Control: max-age 比 Expires 更具優先權，且 max-age 是相對時間，而 Expires 是絕對時間。

## ETag（Entity Tag）
* 是資源的唯一標識符，用來檢查資源是否變更。
* 當瀏覽器下次請求相同資源時，會發送 If-None-Match header，伺服器根據 ETag 判斷資源是否有變化。如果沒有變化，伺服器返回 304 Not Modified，表示資源可以從緩存中讀取。
* 優點：當資源變更頻率較低或資源大小較大時，ETag 可以有效減少帶寬消耗。
  * 比如可以檢查CSS有沒有更新


# Last-Modified
* 表示資源的最後修改時間。
* 瀏覽器在後續請求中可以通過 If-Modified-Since header，請求伺服器判斷資源是否自該時間後有過更新。如果沒有更新，伺服器回傳 304 Not Modified。
* 示例：Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
* 與 ETag 類似，但 ETag 提供更精確的資源變更檢查，而 Last-Modified 的時間粒度較粗。

# Vary
* 指定在資源的緩存決定中，哪些請求頭應該被考慮。這個屬性常用於需要根據不同的用戶代理、語言或其他頭部內容來返回不同版本的資源時。
* 例如：Vary: User-Agent，表示伺服器根據不同的瀏覽器返回不同的資源，並根據 User-Agent 頭決定緩存是否有效。
