# Networking


## todo
* HTTPS
* HTTP code
* TCP/UDP
* DNS 機制
* 3 / 4 way handshake
* route/gateway
* LAN/WAN
* 全雙工/半雙工(full-duplex, half-duplex)
* loopback IP
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
  

## ipv4
* Net_ID 與 Host_ID 的限制
  * 在同一個網段內，Net_ID 是不變的，而 Host_ID 則是不可重複
  * Host_ID 在二進位的表示法當中，不可同時為 0 也不可同時為 1 
  * 因為全為 0 表示整個網段的位址 (Network IP)，而全為 1 則表示為廣播的位址 (Broadcast IP)
* 當 Host_ID 所佔用的位元越大，亦即 Host_ID 數量越多時，表示同一個網域內可用以設定主機的 IP 數量越多。
* IP 的分級
  * 主要使用 Class A B C
    * class A 0xxxxxxx.xxxxxxxx.xxxxxxxx.xxxxxxxx
      * NetI_D 的開頭是 0
      * 第1位是net 第2 3 4位是host
      * 0.xx.xx.xx ~ 127.xx.xx.xx
    * class B 10xxxxxx.xxxxxxxx.xxxxxxxx.xxxxxxxx
      * NetI_D 的開頭是 10
      * 第1 2位是net 第3 4位是host
      * 十進位 128.xx.xx.xx ~ 191.xx.xx.xx
    * class C 110xxxxx.xxxxxxxx.xxxxxxxx.xxxxxxxx
      * NetI_D 的開頭是 110
      * 第1 2 3位是net 第4位是host
      * 192.xx.xx.xx ~ 223.xx.xx.xx
  * D 用在特殊功能 E不使用
* Private IP
  * Class A：10.0.0.0    - 10.255.255.255
  * Class B：172.16.0.0  - 172.31.255.255
  * Class C：192.168.0.0 - 192.168.255.255
* Netmask 或稱 Subnet mask (子網路遮罩)
  * 定義 net_id和host_id的範圍
  * 二進位中全部為1代表不能變，全部為0代表可以變
  * class C: 255.255.255.0
    * 代表前面三個為net_id不能變
* 子網路切分
  * 藉由擴大net_id的位數，減少host_id，把原本的ip分成多份管理
    * net_id每增加一位，就會產生兩個子網域

## TCP
* 三向交握(Three-way handshake)
  * Client ----SYN(x)----> Server
  * Client <---SYN-ACK(y, x+1)--- Server
  * Client ----ACK(y+1)----> Server
* TCP 的四向交握（Four-Way Handshake）
  * Client ----FIN----> Server
  * Client <----ACK---- Server
  * Client <----FIN---- Server
  * Client ----ACK----> Server

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


## protocol

## ref
* [不錯的面試資料整理](https://hackmd.io/@g9tdU4gDSTiEZrerd0g7-w/SyCXEfsSE?type=view)
* [鳥哥 基礎網路概念](https://linux.vbird.org/linux_server/centos6/0110network_basic.php)