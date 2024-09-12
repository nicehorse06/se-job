# 系統設計筆記

## 可能要問的問題
* 目的?
* 每個月的數量？
    * 每年/月/日的數量
* 包含檔案類型？
    * 文字/圖片/影片
* 保存年限？
* 重複內容？
* 在意是否即時或有延遲
* 使用的外部API或方法有哪些
* 支援的設備或是平台
    * app/web
* 使用者能否停止功能
* 需要做哪些功能
* 資料時間的權重順序
    * 時間/主題/好友
* 一個使用者有多少好友
* 會有多少流量
    * DAU, Daily Active UUsers 每日活要使用者
* 查詢是否為英文 或有大寫或符號


## 重點
* 防止單點故障
* 服務是否需要快速回應
* 效能瓶頸
* 可擴展性
* 穩健性
* 粗略計算
* 靈活延伸性
* 沒有固定答案
    * 每種設計都有trade off
* 重點是跟面試官的溝通
* 自動水平擴展
    * 讓伺服器無狀態
* 資料庫複寫機制與分片
* 資料庫儲存商業邏輯必要資訊
* 用queue 協助解偶
* 錯誤處理 增加可靠性
    * 怕queue資料掉了 就用DB存一次可以重試
    * 重試機制 一直出錯要警報
* 網路限速
* 資料庫前都要配cache
* 重複的東西 弄範本 或是 cache
* 採用的網路協定 重要
* 記憶體比磁碟快
* 網路傳輸前先壓縮
* 使用特定資料結構
    * Trie
* 禮貌限速機制
    * 網站爬蟲
    * 通知訊息數量
    * 讓使用者可以不使用
* API 被使用
    * 安全性 身份驗證 api key
    * 限速
* 分析服務 追蹤 監視
    * 找到關鍵的指標參數做分析
    * 可能是功能的各個面向
    * 找到該監視的指標 比如待通知的數量過大
    * 任何階段都可以實做出這個功能
* 如果還有時間，可討論擴展性
    * 擴展資料庫
        * 垂直擴展 水平擴展
        * SQL vs NoSQL
            * 聊天系統建議採用key/value 系統
                * 水平擴展
                * 低延遲
        * 主從架構
        * 讀取副本
        * 分片
        * 一致性模型
    * web stateless
    * 盡可能cache常用資料
    * 用queue降低個元件耦合度
    * 監控QPS/新訊息延遲時間


## 架構從0到1
* 單一伺服器
    * web server + db in one vm
* 分開seb server 和 db 於不同VM
* 擴展
    * 垂直擴展
        * 單一VM加CPU和RAM
        * 擴展有上限
        * 沒有failover和redundancy 故障麻煩
        * 如果流量太大資源不夠可能會慢
    * 水平擴展
        * 比較好的做法
        * 用load balance
* 為VM加上有load balance的反向代理，如nginx
    * 使用者藉由外網ip連線到反向代理，不直接連到web server
    * web server彼此用內網ip
    * 如果server pool中的web server一台掛了，可以把流量導到好的web server
    * 因應流量成長的vm Auto-scaling，load balance可以把流量導到新機器
* 資料庫複寫機制
    * 如果只用一個資料庫，會不支援故障轉移
    * 利用只寫入的master db和只讀的slave副本db實做複寫機制
    * 好處
        * 寫入在master，讀取分散到多個節點增加查詢效能
        * 如果一個DB資料被事故破壞，資料不怕丟失
        * 如果一個DB離線，網站還是正常運作
    * 如果DB離線
        * 一個slave離線，讀取流量移到其他好的slave
        * 所有slave離線，會把讀取暫時移到master
        * master離線，會把一個slave升為master取代舊的
            * 新舊master的資料差異要合併比較複雜，TODO
* 加上快取
    * 快取的速度比資料快能很多
    * rea-through
        * 可以在讀DB前先去確認快取有沒有，沒有的話就去DB讀取並複製一份到快取
    * 判斷快取時機，重要的資料不宜長期存在cache
    * 適當的過期策略，時間太長可能導致資料過時
    * 一致性，如果要讓快取跟資料庫同步就要另外做了 TODO
    * 快取也可能會單點故障，可設定多個cache server
    * 逐出策略Eviction Policy: 一旦cache滿了可以用LRU, LFU, FIFO去移除舊cache
* CDN
    * 在地理位置上做靜態內容的cache
        * 讓JS, CSS, static file的內容效能更好
        * 減輕server負擔
    * 設定過期時間 確保最新
    * 可在file名稱加入版本號 讓上板時舊內容無效，不被cache
* stateless layer
    * 把如session的資料移除web，集中一起儲存方便web server擴展
    * 如果web server是有狀態的，會讓原本使用的http只能發向當初登入的那台seb server
        * 連到別台會沒資料
        * Load Balancing中的Sticky Session可以確保用戶的請求都到同一台server
            * 但這樣會增加開銷
    * 把session拉出web server獨立開來，即可讓web server變成 stateless
        * 用redis/NoSQL
        * stateless 會更容易擴展
* 資料中心
    * geoDNS，地理路由，可以讓請求轉送到最近的資料中心
        * 比如美東一個 美西一個
    * 當美東掛了 所有流量就會去美西
        * 要克服資料同步
* message queue
    * 在記憶體，可支援非同步通訊的緩衝區
        * redis
        * RabbitMQ
    * [製造者] --(發布)--> [message queue] <--(消費/訂閱)--> [消費者]
    * queue天生解偶
        * 製造者產生訊息，消費者不馬上讀取也沒關係
        * 製造者暫時無法運作，消費者還是可以讀取
    * 有一些額外處理比如圖檔修正 文字檔要做處理，都需要花時間
        * 這時候就可以請queue拿給worker做處理，做非同步客製化任務
* 讓大系統變得更穩定
    * 日誌紀錄
        * 錯誤日誌監看
    * 衡量指標
        * CPU, ram, disk io
        * db, cache效能表現
        * 每日使用者數量 滯留率 營業收入
    * 自動化
        * CI/CD
* 資料庫擴展
    * 垂直擴展
        * 加CPU, RAM, 空間
            * 擴充終究有上限
        * 可能單點故障
        * 成本很高
    * 水平擴展(sharding)
        * 採用多台server
        * sharding就是把大資料庫拆分成很多小的資料庫(shard)
            * shard間schema一樣，但資料都是不重複的
        * sharding策略有很多種
            * 依據user_id，可能四台，分別存4的餘數 0 1 2 3 平均分配
                * 以上user_id是 sharding key/partition key
                * sharding key可以把資料庫導向正確資料庫，均勻分散資料
        * 如果資料增加太快shard都滿了就要重新sharding
        * 名人問題，如果把名人都集中在同一個shard會造成該DB讀取過多
            * 可能要再shard中再進一部分區
        * sharding後JOIN會相當困難

## 系統設計進行的四步驟
* 了解問題，確立設計範圍
    * 不假思索就回答，很危險，因為沒有正確答案
    * 認真思考，釐清條件和架設
        * 哪些特定功能?
        * 多少使用者?
        * 多快速度擴張? N個月之後預計規模多大?
        * 目前公司有哪些服務可以簡化設計?
* 提出高階設計並取得認可
    * 與面試官合作
    * 提出設計藍圖，請面試官提供意見，把面試官當作是團隊一員溝通
    * 用一些方框圖當作每一種元件的草圖
    * 使用粗略估算藍圖是否符合規模上限
* 深入設計
    * 已達到下列目標
        * 商定總體功能
        * 勾勒出設計藍圖
        * 已從面試官得到高階設計的意見，已了解要聚焦的領域
    * 應該跟面試官確認功能的優先順序
        * 有的喜歡高階設計，有的喜歡效能優化
    * 不要在小地方的討論花太多時間
* 彙整總結
    * 面試官可能會希望評斷系統瓶頸，如何改善
    * 把前面的討論再總結一次，可以幫助面試官回憶
    * 討論各種出錯情形，網路斷線 server掛了
    * 怎麼看監控指標跟日誌
    * 規模曲線，100萬上升到1000萬使用者時，該做什麼改變


## 粗略計，以社群為例
* 用到的數據
    * QPS: query per second
    * 每月使用者
    * 有x%使用者會發文
    * 使用者平均每天發n則文章
    * m%的推文包含media file
        * 架設media file大小為1M
    * 資料會被存y年
    * DAU(Daily active users)
    * 每個月下載量
* DAU = 每月使用者 * x%
* QPS: DAU * n /30/24/3600
    * 30 * 24 * 3600 = 2592000
* 峰值QPS = 2 * QPS
* Media file每日儲存空間: DAU * x% * n * 1M
* y年所需儲存空間: Media file每日儲存空間 * y * 365

## ref
* [內行人才知道的系統設計面試指南 System Design Interview – An insider’s guide](https://www.books.com.tw/products/0010903454)
  * 推薦，很棒的一本書
* [Design Gurus](https://www.designgurus.io/)
  * 要付費
* [system-design-primer](https://github.com/donnemartin/system-design-primer?tab=readme-ov-file#system-design-topics-start-here)
* [System Design Interview – An insider's guide](https://www.books.com.tw/products/0010903454)
  * 大部分都會推這個
* [System Design roadmap](https://roadmap.sh/system-design)
* [Youtuber 土妹土妹](https://www.youtube.com/@user-im1sg1zx1j)
* [Youtuber 古城算法](https://www.youtube.com/@user-my5in2fq5c)
* [Youtuber 花花醬](https://www.youtube.com/@HuaHuaLeetCode)
* [後端工程師面試考什麼 - 系統設計(system design)心法篇](https://myapollo.com.tw/blog/interview-question-system-design-introduction/)