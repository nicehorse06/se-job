# 關聯資料庫

# 查找和優化慢查詢

## PostgreSQL

### 找出慢查詢

1. **啟用慢查詢日誌**：
   - 編輯 `postgresql.conf` 文件，設置以下參數：
     log_min_duration_statement = 1000  # 記錄超過1秒的查詢
     logging_collector = on
     log_directory = 'pg_log'          # 日誌保存目錄
     log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
   - 重啟 PostgreSQL 服務使配置生效。

2. **查詢日誌文件**：
   - 檢查日誌文件，找到執行時間較長的查詢。

### 分析慢查詢

1. **使用 `EXPLAIN` 分析查詢計劃**：
   EXPLAIN ANALYZE SELECT * FROM your_table WHERE conditions;
   - `EXPLAIN` 顯示查詢計劃，`EXPLAIN ANALYZE` 顯示實際執行時間。

### 優化查詢

1. **索引優化**：
   CREATE INDEX idx_your_table_column ON your_table(column);

2. **查詢改寫**：
   - 只選取需要的欄位，避免使用 `SELECT *`。

3. **統計信息更新**：
   ANALYZE your_table;

4. **分區表**：
   CREATE TABLE your_table_part (
       column1 TYPE,
       column2 TYPE
   ) PARTITION BY RANGE (column1);

   CREATE TABLE your_table_part_1 PARTITION OF your_table_part
   FOR VALUES FROM (start_value) TO (end_value);

### 系統調整

1. **配置參數優化**：
   - 調整 `shared_buffers`、`work_mem`、`maintenance_work_mem` 等參數。

2. **硬體升級**：
   - 增加內存、使用更快的磁碟。

### 監控和診斷工具

1. **pg_stat_statements**：
   CREATE EXTENSION pg_stat_statements;

2. **第三方監控工具**：
   - 使用 pgBadger、pgAdmin、PostgreSQL Enterprise Manager 等。

## MySQL

### 找出慢查詢

1. **啟用慢查詢日誌**：
   - 編輯 `my.cnf` 或 `my.ini` 文件，設置以下參數：
     slow_query_log = 1
     slow_query_log_file = /var/log/mysql/mysql-slow.log  # 日誌文件路徑
     long_query_time = 1  # 記錄超過1秒的查詢
   - 重啟 MySQL 服務使配置生效。

2. **查詢日誌文件**：
   - 檢查慢查詢日誌文件，找到執行時間較長的查詢。

### 分析慢查詢

1. **使用 `EXPLAIN` 分析查詢計劃**：
   EXPLAIN SELECT * FROM your_table WHERE conditions;

### 優化查詢

1. **索引優化**：
   CREATE INDEX idx_your_table_column ON your_table(column);

2. **查詢改寫**：
   - 只選取需要的欄位，避免使用 `SELECT *`。

3. **統計信息更新**：
   ANALYZE TABLE your_table;

4. **分區表**：
   ALTER TABLE your_table PARTITION BY RANGE (column) (
       PARTITION p0 VALUES LESS THAN (1991),
       PARTITION p1 VALUES LESS THAN (1992),
       ...
   );

### 系統調整

1. **配置參數優化**：
   - 調整 `innodb_buffer_pool_size`、`query_cache_size`、`tmp_table_size` 等參數。

2. **硬體升級**：
   - 增加內存、使用更快的磁碟。

### 監控和診斷工具

1. **Performance Schema**：
   UPDATE performance_schema.setup_instruments SET ENABLED = 'YES', TIMED = 'YES';

2. **第三方監控工具**：
   - 使用 MySQL Enterprise Monitor、Percona Toolkit、phpMyAdmin 等。


# ref
* GPT
