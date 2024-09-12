# Networking


## todo
* HTTP code
* TCP/UDP
* DNS 機制
* 3 / 4 way handshake
* route/gateway
* LAN/WAN
* 全雙工/半雙工(full-duplex, half-duplex)
* loopback IP
* CDN
  * 緩存策略
    * Cache-Control標頭：了解如何設置緩存策略（如public、private、no-cache等）。
    * ETag和Last-Modified：了解如何使用這些標頭來實現內容的條件請求和緩存更新。
    * TTL（Time-to-Live）：設定緩存內容的有效時間。
    * 緩存策略：包括緩存命中、緩存失效、緩存更新等策略。
  * 負載均衡
    * DNS負載均衡：了解如何通過DNS分配請求。
    * 反向代理：了解反向代理伺服器的作用以及常見工具（如Nginx）的配置。
  * 邊緣計算
  * DDoS防護：了解如何通過CDN防止分佈式拒絕服務攻擊。
  * WAF（Web應用防火牆）：了解如何保護應用程式免受常見的Web攻擊（如SQL注入、XSS攻擊等）。
* 通訊協定
  * websocket
  * SMTP
  * POP3/IMAP
  * ping 使用的是 ICMP (Internet Control Message Protocol)
  * HTTP/HTTPS
    * 加密
    * 身份驗證
  * REST/GraphQL
  * gRPC (Google Remote Procedure Call)
  

## OSI 七層協定 (Open System Interconnection)
* Layer 1 實體層 Physical Layer
  * 0101
* Layer 2 資料鏈結層 Data-Link Layer
  * 軟硬溝通
  * MAC (Media Access Control)
    * 偏硬體
    * mac address
  * 邏輯連結層 (logical link control, LLC)
    * 偏軟體
* Layer 3 網路層 Network Layer
  * IP
    * 送到目的地
  * route
* Layer 4 傳送層 Transport Layer
  * TCP/UDP
* Layer 5 會談層 Session Layer
  * 兩個位址之間的連線通道之連接與掛斷
  * 確定網路服務建立連線的確認。
* Layer 6 表現層 Presentation Layer
  * 將來自本地端應用程式的資料格式轉換成為網路的標準格式
  * 定義的是網路服務之間的資料格式的轉換， 包括資料的加解密。
* Layer 7 應用層 Application Layer
  * 定義應用程式如何進入此層的溝通介面
    * 一些通訊協定
  * HTTP，HTTPS，FTP，TELNET，SSH，SMTP，POP3

## TCP/IP 四層模型
* 應用層
  * Layer 5 會談層 Session Layer
  * Layer 6 表現層 Presentation Layer
  * Layer 7 應用層 Application Layer
* 傳送層
* 網路層
* 連結層
  * Layer 1 實體層 Physical Layer
  * Layer 2 資料鏈結層 Data-Link Layer


## 交換機
* 交換機中，會把接口跟mac address做成一張對應表

## 路由器
* LAN
  * WIfi
  * 
* WAN
  * internet
  * 如果沒有WAN口，router就是一台交換機


## ref
* [不錯的面試資料整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)
* [鳥哥 基礎網路概念](https://linux.vbird.org/linux_server/centos6/0110network_basic.php)
* [交换机和路由器有什么区别？网关和路由又是什么意思？简单说网络](https://www.youtube.com/watch?v=HmscVF3vKQs)
* [後端工程師面試考什麼 — Load Balancer vs. Reverse Proxy vs. API Gateway vs. HAProxy](https://www.myapollo.com.tw/blog/backend-load-balancer-reverse-proxy-api-gateway/)