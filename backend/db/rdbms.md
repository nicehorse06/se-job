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


# 觸發器（Triggers）

## 定義

觸發器（Triggers）是一種資料庫對象，是一段特定的 SQL 程序，在資料庫中的某些事件（如插入、更新或刪除操作）發生時，自動執行預先定義的動作。觸發器通常用於強制執行業務規則、數據完整性和審計要求。

## 特性

1. **自動執行**：
   - 一旦設置，觸發器會在指定事件發生時自動執行，無需顯式調用。

2. **事件驅動**：
   - 觸發器基於特定的資料庫事件（如 INSERT、UPDATE、DELETE）進行觸發。

3. **可用於強制數據完整性**：
   - 觸發器可用於檢查和強制數據庫規則，確保數據的一致性和完整性。

## 觸發器類型

1. **行級觸發器（Row-Level Triggers）**：
   - 對每一行數據的變更進行觸發。例如，每次插入、更新或刪除一行記錄時，觸發器會執行一次。

2. **語句級觸發器（Statement-Level Triggers）**：
   - 對整個 SQL 語句進行觸發。例如，當執行一個更新語句時，即使語句影響多行，觸發器也只執行一次。

## 觸發時間

1. **BEFORE 觸發器**：
   - 在指定的事件（如插入、更新或刪除）發生之前執行。這類觸發器通常用於對即將插入或更新的數據進行檢查或修改。

2. **AFTER 觸發器**：
   - 在指定的事件（如插入、更新或刪除）發生之後執行。這類觸發器通常用於記錄變更或執行複雜的業務邏輯。

## 使用範例

1. **保持審計記錄**：
   - 可以使用觸發器來記錄數據的變更歷史。例如，每次對某個表進行更新時，觸發器可以將變更前的數據記錄到審計表中。

    ```sql
    CREATE TRIGGER audit_log
    AFTER UPDATE ON employees
    FOR EACH ROW
    BEGIN
        INSERT INTO audit_table (emp_id, old_salary, new_salary, update_time)
        VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
    END;
    ```

2. **維護數據一致性**：
   - 使用觸發器來檢查和強制數據的一致性。例如，確保某個列的值在插入或更新時符合特定條件。

    ```sql
    CREATE TRIGGER check_salary
    BEFORE INSERT OR UPDATE ON employees
    FOR EACH ROW
    BEGIN
        IF NEW.salary < 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Salary cannot be negative';
        END IF;
    END;
    ```

## 優點

- **自動化**：減少手動操作的需求，自動執行重要的數據檢查和業務邏輯。
- **即時性**：在指定事件發生時立即執行，保證數據的一致性和完整性。
- **集中管理**：可以集中管理業務規則和數據完整性檢查，避免分散在應用程序代碼中。

## 缺點

- **性能影響**：過多或過於複雜的觸發器可能會對資料庫性能造成影響。
- **調試困難**：觸發器的執行是自動的，可能會使調試過程變得複雜。
- **依賴性**：應用程序過度依賴觸發器可能會降低可移植性。

總之，觸發器（Triggers）是資料庫中強大且靈活的工具，用於自動執行重要的業務邏輯和數據檢查，確保數據的一致性和完整性。

# ref
* GPT
