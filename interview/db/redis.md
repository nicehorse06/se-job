# todo
* Redis 持久化
* Redis 只有一個thread嗎
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

## ref
* [图解Redis介绍](https://xiaolincoding.com/redis/)
* [数据库和缓存如何保证一致性？](https://xiaolincoding.com/redis/architecture/mysql_redis_consistency.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8C%E7%BC%93%E5%AD%98%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E4%B8%80%E8%87%B4%E6%80%A7)