# IP

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

## Netmask 或稱 Subnet mask (子網路遮罩)

* 定義 net_id和host_id的範圍
* 二進位中全部為1代表不能變，全部為0代表可以變
* class C: 255.255.255.0
  * 代表前面三個為net_id不能變
* 子網路切分
  * 藉由擴大net_id的位數，減少host_id，把原本的ip分成多份管理
    * net_id每增加一位，就會產生兩個子網域
* 1的數量代表掩碼
  * 255.255.255.0 = > 24
  * 192.168.1.0/24 代表有255個IP

* 劃分
  * IP & Netmask 如果結果相同代表同一子網
* 調整子網IP數量
  * 擴大IP數量，調小網路遮罩
  * 減少UP數量，調大網路遮罩
* 不同子網是不能通信的


