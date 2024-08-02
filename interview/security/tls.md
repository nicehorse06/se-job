# TLS和https 介紹

# HTTPS作用
* 加密傳輸：
  * HTTPS 對數據在客戶端和伺服器之間的傳輸進行加密，防止數據在傳輸過程中被攔截和竊取。
* 數據完整性：
  * HTTPS 保證數據在傳輸過程中不會被篡改。如果數據被篡改，接收方會發現並拒絕這些數據。
* 身份驗證：
  * HTTPS 通過 SSL/TLS 證書驗證伺服器的身份，確保客戶端連接到的是合法的伺服器，而不是中間人攻擊者。
# TLS 握手
* client ---隨機數(random1) + 支援的加密方式 ---> server
  * 支援的加密方式是為後面對稱式加密準備
* client <---隨機數(random2) + 選一個加密方式 + CA憑證(含公鑰) --- server
  * 若CA無效怎警告使用者是否繼續訪問
* client ---隨機數(pre-master)(CA公鑰加密) ---> server
  * client 已知random1+random2+pre-master生成 master-secret
* server 用私鑰解開client傳來的加密，得到pre-master
  * server 已知random1+random2+pre-master生成 master-secret
* client <---生成master-secret完畢後彼此發送finished ---> server
* client 與 server 皆使用該 master-secret 加密的資料來進行通信，稱為對稱式加密。

## ref
* [什麽是 TLS 握手？](https://www.cloudflare.com/zh-tw/learning/ssl/what-happens-in-a-tls-handshake/)
* [淺談 HTTPS 的 TLS 四次握手](https://klj40702.medium.com/%E6%B7%BA%E8%AB%87-https-%E7%9A%84-tls-%E5%9B%9B%E6%AC%A1%E6%8F%A1%E6%89%8B-ee8fc721b)
  * 簡單詳細