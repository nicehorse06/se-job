# CAP and noSQL

# CAP 原理

CAP 原理指出，在一個分布式數據存儲系統中，以下三個特性不可能同時滿足：

1. Consistency（一致性）：每次讀取操作都能獲得最新的數據，所有節點在同一時間看到相同的數據。

2. Availability（可用性）：每次請求都能收到一個（不一定是最新的）回應，系統始終處於可操作狀態。

3. Partition Tolerance（分區容忍性）：系統能夠在任意網絡分區的情況下繼續運行，即使有部分節點之間的通信失敗，整體系統仍然可以運行。

## 只可能滿足兩個
CAP 原理指出，在這三個特性中，任何分布式系統只能同時滿足其中的兩個，而無法三者兼得。
因此，我們通常會看到以下幾種系統設計取向：

1. CP（Consistency + Partition Tolerance）：
   - 系統保證數據的一致性和分區容忍性，但是在某些情況下可能無法保證可用性。
   - 例如：HBase、MongoDB（在某些配置下）。
   
2. AP（Availability + Partition Tolerance）：
   - 系統保證可用性和分區容忍性，但數據可能會有短暫的不一致。
   - 例如：Cassandra、CouchDB。

3. CA（Consistency + Availability）：
   - 系統保證一致性和可用性，但無法在網絡分區的情況下保持這兩者。
   - 這種情況在現實中幾乎不存在，因為網絡分區是分布式系統中不可避免的情況。

CAP 原理在設計分布式系統時提供了一個有用的框架，幫助工程師理解和權衡不同的設計選擇，從而根據具體的應用需求選擇合適的系統架構。

# Redis
* CP
# Cassandra
# MongoDB
* CP

# [DynamoDB](https://aws.amazon.com/tw/dynamodb/)

# ref
* gpt
* [[淺談]-NoSQL資料庫怎麼選？](https://xiang753017.gitbook.io/zixiang-blog/database/qian-tan-nosql-zi-liao-ku-zen-me-xuan)
* [Cassandra 和 MongoDB 有何區別？](https://aws.amazon.com/tw/compare/the-difference-between-cassandra-and-mongodb/)