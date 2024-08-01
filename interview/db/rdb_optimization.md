# 關聯資料庫

# 查找和優化慢查詢

## 以PostgreSQL為例

* 使用SELECT * FROM pg_stat_activity;
  * 查看當前所有查詢的狀態，尋找是否有長時間執行的查詢或者阻塞其他查詢的交易。
* 使用SELECT * FROM pg_locks WHERE NOT granted
  * 來檢查是否有未授予的鎖，這可能導致查詢延遲。
* 執行VACUUM（清理死條目、回收空間）和ANALYZE（更新統計信息以幫助查詢優化器制定更好的查詢計劃）。

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

### Sharding
* 物理上的分割到不同機器：將數據水平分割成多個獨立的數據庫，每個數據庫稱為一個「分片」（shard）。
  * 這些分片可以分佈在不同的物理機器上，以減少單個數據庫的負載，提高存儲和計算能力。
* 應用層需要感知：應用層需要知道數據存儲在哪個分片，需要處理數據路由和合併查詢。
* 優點：
  * 水平擴展：可以通過增加更多的數據庫分片來處理更多的數據量和更高的並發量。
  * 負載均衡：數據和流量被分散到多個數據庫，減少了單個數據庫的負載。
  * 高可用性：每個分片可以部署在不同的物理機器上，提高了整體系統的可靠性和可用性
* 缺點：
  * 應用層複雜度：需要在應用層實現數據路由和合併查詢邏輯，增加了開發和維護的複雜度。
  * 跨分片查詢性能：跨分片的查詢需要在多個數據庫之間合併數據，可能會降低查詢性能。
  * 數據一致性：在多個分片之間維護數據一致性變得更加困難。
* 適用場景
  * 超大數據量和高並發訪問的應用，如大型社交媒體平台、大型網絡遊戲等。
  * 需要分佈式存儲和高可用性的應用。

### Partitioning
* 數據庫支持的功能：將單個大表水平或垂直分割成多個較小的分區。
  * 每個分區是邏輯上的分割，而非物理上的分割。這些分區存儲在同一個數據庫中，但數據庫引擎會優化存儲和查詢。
* 應用層無需感知：應用層無需特別處理分區，只需適當修改 SQL 查詢。例如，可以在查詢中指定特定的分區條件（如日期範圍）。
* Partitioning是db支持的功能
  * 把一張表依據某個欄位分成多張表，比如依據時間切成多份
  * 應用層上沒有差別，會體現在SQL查詢上
* 查詢範例
```SQL
CREATE TABLE your_table_part (
      column1 TYPE,
      column2 TYPE
) PARTITION BY RANGE (column1);

CREATE TABLE your_table_part_1 PARTITION OF your_table_part
FOR VALUES FROM (start_value) TO (end_value);
```
* 優點：
   * 查詢性能提升：查詢可以針對特定的分區進行，減少了掃描整個表的時間，提高了查詢性能。
   * 數據管理方便：可以針對不同的分區進行獨立的備份、恢復和維護，簡化了數據管理工作。
   * 應用層簡單：應用層無需特別處理分區，只需修改 SQL 查詢即可。
* 缺點：
   * 有限的擴展性：雖然分區可以提升單個數據庫內部的性能，但無法實現真正的水平擴展，數據仍然存儲在單個數據庫中。
   * 複雜的分區策略：需要設計合理的分區策略，選擇不當可能會導致某些分區過大或過小，影響性能。
   * 分區管理成本：隨著數據量的增長，分區的數量和管理成本也會增加。
* 適用場景
  * 單個數據庫內的大表管理，特別是當查詢主要針對特定範圍的數據時
    * 如電商網站的訂單表、金融系統的交易記錄等。
  * 需要提升查詢性能和簡化數據管理的應用。


### 系統調整

1. **配置參數優化**：
   - 調整 `shared_buffers`、`work_mem`、`maintenance_work_mem` 等參數。

2. **硬體升級**：
   - 增加內存、使用更快的磁碟。
  * 根據需要增加硬件資源，如CPU、記憶體和硬碟空間。
* 考慮實施高效的存儲解決方案，例如SSD。

### 監控和診斷工具

1. **pg_stat_statements**：
   CREATE EXTENSION pg_stat_statements;

2. **第三方監控工具**：
   - 使用 pgBadger、pgAdmin、PostgreSQL Enterprise Manager 等。


### 讀寫分離和負載均衡
* 實施負載均衡，將讀取操作分配到一個或多個從屬資料庫（replica）。
* 設置專用的資料庫伺服器處理報表或分析型查詢。

## MySQL為例

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
