
# PostgreSQL note

* todo 需要再整理

## 1. **PostgreSQL 擴展（Extensions）**
   - **pg_stat_statements**：用來收集查詢的執行統計信息，是性能調優的常用工具。
   - **PostGIS**：一個非常強大的地理空間資料處理擴展，用於處理 GIS（地理信息系統）應用。
   - **hstore** 和 **jsonb**：處理非結構化數據的擴展，適合用於結構化和半結構化數據混合處理的應用場景。

## 2. **事務隔離級別與鎖管理**
   - **事務隔離級別（Transaction Isolation Levels）**：PostgreSQL 支持四種標準的事務隔離級別，能影響資料庫的並發行為和一致性保證。在面試中，可能會被問及如何根據應用需求選擇適當的隔離級別，尤其是 `READ COMMITTED` 和 `SERIALIZABLE` 之間的區別。
   - **鎖機制與死鎖處理**：理解 PostgreSQL 的行級鎖、表級鎖，如何避免死鎖，如何診斷和解決鎖競爭問題。

## 3. **高可用性和故障恢復**
   - **Streaming Replication**：如何設置主從數據庫進行實時數據複製，保證數據的高可用性，特別是在系統故障或維護時。
   - **Patroni**：常見的 PostgreSQL 高可用解決方案，基於 etcd 或 Consul 來實現自動 failover 和 leader election。
   - **WAL（Write-Ahead Logging）與 PITR（Point-In-Time Recovery）**：利用 WAL 日誌來進行故障恢復，特別是在需要進行點時間恢復時。

## 4. **數據一致性與並發控制**
   - **MVCC（多版本並發控制）**：理解 PostgreSQL 如何通過 MVCC 實現高效的並發控制，並且避免鎖競爭。這是 PostgreSQL 在處理高併發應用中表現良好的原因之一。
   - **VACUUM 與 Autovacuum**：深入理解 Autovacuum 如何保持數據庫健康，並定期清理死元組來防止數據膨脹。

## 5. **Partitioning 與 Sharding 的具體應用**
   - **PostgreSQL Partitioning**：深入了解如何為大型表設計有效的分區策略，特別是針對時間序列數據。
   - **Sharding 的限制與擴展**：深入討論 Postgres-native sharding（Postgres-XL、Citus）或自定義 sharding 解決方案的應用，並理解其優劣勢。

## 6. **內建全文檢索（Full-Text Search）**
   - PostgreSQL 支持內建的全文檢索功能，適合處理文檔搜索和大型文本數據檢索。
   - **tsvector** 和 **tsquery** 的使用及其優化：如何利用這些功能來構建高效的搜索系統。

## 7. **外部數據封裝（Foreign Data Wrappers, FDW）**
   - PostgreSQL 支持通過 FDW 連接其他資料庫，如 MySQL、MongoDB、甚至是 CSV 文件。理解這些功能如何整合異構數據源，並處理跨資料庫查詢。

## 8. **流式查詢與實時數據處理**
   - 討論如何使用 PostgreSQL 來處理實時數據流，並與 Kafka 等消息系統整合進行數據管道設計。
   - 使用 `logical replication` 和 `decoding` 來捕捉變更數據並實時更新。

## 9. **性能優化的細節**
   - **I/O 性能調整**：如何優化資料庫的 I/O，包括調整 `random_page_cost` 和 `seq_page_cost`，這對於查詢優化至關重要。
   - **查詢計劃緩存**：PostgreSQL 自帶查詢計劃緩存，理解如何查看和優化查詢計劃緩存行為。

## 10. **多租戶架構的數據庫設計**
   - 討論在多租戶應用中如何利用 PostgreSQL 的 Schema 隔離數據，以及如何利用 Row-Level Security 來實現數據訪問控制。

## 11. **表繼承（Table Inheritance）**
   - PostgreSQL 支持表繼承，這是一個獨特的功能，可以用來建模類似面向對象的數據結構，適合某些層級結構數據管理需求。

## 12. **安全性與訪問控制**
   - **Row-Level Security (RLS)**：基於行級的安全策略，控制不同用戶對表中不同行的訪問權限。
   - **加密與認證**：PostgreSQL 支持 SSL 加密和多種身份驗證方式，討論如何設置和優化這些安全機制。

## 13. **時間序列數據庫（Time-series Database）應用**
   - 討論如何使用 PostgreSQL 優化時間序列數據處理，利用 Partitioning 和適當的索引來提升查詢性能。

