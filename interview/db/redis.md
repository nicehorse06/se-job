# todo
* Redis 持久化
* redis緩存設計

# Redis data type
* 字串 (String)
* 哈希 (Hash)
* 列表 (List)
* 集合 (Set)
* 有序集合 (Sorted Set)
* 位圖 (Bitmaps)
* HyperLogLog 是一種用於基數估計的概率性資料結構，適合用於計算唯一訪問數。
* 地理空間資料結構用於存儲和操作地理位置數據，如經緯度。
* 流 (Streams)

# System design的redis

## 快取 (Caching)
* 作為快取來加速讀取操作，減少對後端數據庫的壓力。
* 應用場景: 頻繁讀取的數據，如商品信息、用戶會話數據等。
* Redis 功能: GET, SET, EXPIRE (設置鍵的過期時間)。
``` python
# Example in Python using redis-py
import redis

r = redis.Redis()

# Set a cache with an expiration of 10 minutes
r.setex('product_123', 600, 'product details')
```

## 分布式鎖 (Distributed Lock)
* 用來實現分布式鎖，以避免多個進程同時操作共享資源，防止數據不一致。
* 應用場景: 多個進程/線程需要互斥訪問的資源，如訂單生成、庫存扣減等。
* Redis 功能: SETNX, EXPIRE, DEL
``` python
# Example in Python using redis-py for distributed lock
import redis
import time

r = redis.Redis()

lock_key = 'resource_lock'
lock_timeout = 10

# Acquire lock
if r.setnx(lock_key, time.time() + lock_timeout):
    try:
        # Critical section
        pass
    finally:
        # Release lock
        r.delete(lock_key)
```


## 計數器 (Counters)
* 高效的計數器操作，適用於實時統計，如計算點擊量、訪問量等。
* 應用場景: 網頁點擊數、API 調用次數等。
* Redis 功能: INCR, DECR

``` python
# Example in Python using redis-py for counters
import redis

r = redis.Redis()

# Increment counter
r.incr('page_view_count')
```

## 訊息隊列 (Message Queue)
* 實現簡單的訊息隊列系統，用於解耦和分散處理任務。
* 應用場景: 任務隊列、事件流處理、即時通知系統等。
* Redis 功能: LPUSH, RPOP, BLPOP, BRPOP

``` python
# Example in Python using redis-py for message queue
import redis

r = redis.Redis()

# Producer
r.lpush('task_queue', 'task_data')

# Consumer
task = r.brpop('task_queue', timeout=5)
```


## 即時數據分析 (Real-time Analytics)
*  Redis 的數據結構（如 Sorted Sets），可以實現即時數據分析和排行榜等功能。
* 應用場景: 實時排行榜、用戶行為分析等。
* Redis 功能: ZADD, ZRANGE, ZREVRANGE

``` python
# Example in Python using redis-py for real-time analytics
import redis

r = redis.Redis()

# Add score for user
r.zadd('leaderboard', {'user1': 100, 'user2': 200})

# Get top 10 users
top_users = r.zrevrange('leaderboard', 0, 9)
```


## Pub/Sub (發布/訂閱)
* Redis 提供發布/訂閱功能，用於實時訊息分發。
* 應用場景: 即時聊天、訊息廣播等。
* Redis 功能: PUBLISH, SUBSCRIBE

``` python
# Example in Python using redis-py for Pub/Sub
import redis

r = redis.Redis()

# Publisher
r.publish('channel', 'message')

# Subscriber
pubsub = r.pubsub()
pubsub.subscribe('channel')

for message in pubsub.listen():
    print(message)
```

# 單一 Thread
* Redis 是單一 thread 的，這意味著所有的操作都是在一個單一的 thread 中處理的。
* Redis 的設計哲學是基於事件驅動模型和非阻塞 I/O。
* 這樣的架構使得 Redis 不需要處理多 thread 下的競爭條件和鎖問題，從而可以實現高效的性能。
## 為什麼 Redis 使用單一 thread？
* 簡化設計：單一 thread 避免了多 thread 的同步問題，比如鎖定與死鎖，減少了代碼的複雜度。
* 高效的 I/O 處理：Redis 使用epoll 等高效的 I/O 多路復用技術來處理大量的連接，因此即使是單一 thread 也能夠很好地應對高併發請求。
* 避免上下文切換的開銷：多 thread 通常會帶來 CPU 上下文切換的成本，Redis 利用單一 thread 避免了這個問題，從而提高了 CPU 的利用率。

# Race Condition
## 原子操作
Redis 提供了許多原子操作命令，這些操作是一次性完成的，無需使用鎖來防止數據競爭。
例如，INCR（自增）、DECR（自減）、LPUSH（往列表左邊插入）等命令在執行時都是原子的，不會受到其他操作的干擾。
## Redis 事務（Transactions）
* Redis 支持簡單的事務模型，通過 MULTI、EXEC 和 WATCH 命令來實現。當使用 MULTI 開啟一個事務時，所有的操作會被順序執行，並且 Redis 保證事務中的操作不會被其他命令打斷。
* WATCH 機制：WATCH 監控某些鍵，在事務提交前檢查這些鍵是否被修改過。如果有其他客戶端修改了這些鍵，Redis 會中止事務，防止競爭條件。
## 分布式鎖
* Redis 可以用作分布式鎖的實現工具，通過設置帶過期時間的鍵來控制資源的獲取和釋放。典型的實現方式是使用 SETNX（set if not exist） 命令來嘗試獲取鎖，並且設置過期時間以避免死鎖問題。
* Redlock 分布式鎖：Redis 官方提供了一個 Redlock 算法，專門用來實現更可靠的分布式鎖機制，特別是針對 Redis 集群或多節點系統。

# Redis 的優點
* 高效性能：基於內存的存儲，讀寫速度極快。
* 豐富數據結構：支持字符串、列表、哈希、集合等多種數據類型。
* 持久化支持：可選 RDB 和 AOF 進行數據持久化。
* 簡單易用：API 直觀，安裝和配置便捷。
* 高可用性：支持主從複製、集群和自動故障轉移。
* 靈活應用場景：適用於快取、消息隊列、分佈式鎖等多種場景。

# Redis 缺點
* 內存限制：基於內存存儲，數據量大時成本高。
* 單 thread 限制：在多核 CPU 上無法完全利用所有資源。
* 弱一致性：主從複製下可能導致數據不一致。
* 有限事務支持：事務模型簡單，缺乏複雜事務功能。

# 原子操作
* 原子操作 是指一個操作在執行過程中不可被中斷的，即操作要麼全部執行成功，要麼不執行。
* 原子性意味著該操作不會受到其他操作的影響，無論是否有其他請求同時進行，都保證操作的完整性和一致性。
* INCR 不被其他命令干擾的原理
  * Redis 是單一 thread 事件驅動模型，這意味著 Redis 的所有命令是按順序執行的。
  * 由於沒有多 thread 並行執行操作的情況，當 Redis 執行 INCR 這樣的命令時，其他命令不會在 INCR 執行過程中打斷它。
* 操作的原子性
  * INCR 命令會先讀取一個鍵的值，然後將該值自增並寫回，這一整個操作是不可分割的。
  * 當 INCR 開始執行時，直到它完成之前，不會有其他操作來修改該鍵的值。

# 結論 
* Redis 的優點在於它的高效內存操作、靈活數據結構、以及高性能的單 thread 處理模式，適合需要快速響應的應用場景。
* 然而，由於內存限制和相對簡單的事務支持，它更適合用作快取、分布式鎖、計數器等，而不適合大數據量和需要複雜事務的場景。
* 相比其他 NoSQL 競品，Redis 的優勢在於它的速度和靈活性，而 MongoDB、Cassandra 則更適合處理大規模數據存儲和複雜查詢的場景。


## ref
* [图解Redis介绍](https://xiaolincoding.com/redis/)
* [数据库和缓存如何保证一致性？](https://xiaolincoding.com/redis/architecture/mysql_redis_consistency.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8C%E7%BC%93%E5%AD%98%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E4%B8%80%E8%87%B4%E6%80%A7)