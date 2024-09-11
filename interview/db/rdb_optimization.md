# 優化RDBMS 以PostgreSQL為例




# 查找和優化慢查詢
* 使用 pg_stat_activity 和 pg_locks 來查看當前查詢的狀態以及是否有阻塞或未授予的鎖。
  * 使用SELECT * FROM pg_stat_activity;
    * 查看當前所有查詢的狀態，尋找是否有長時間執行的查詢或者阻塞其他查詢的交易。
  * 使用SELECT * FROM pg_locks WHERE NOT granted
    * 來檢查是否有未授予的鎖，這可能導致查詢延遲。
* 啟用慢查詢日誌，通過設定 log_min_duration_statement，記錄執行時間過長的 SQL 查詢。
* 使用 EXPLAIN 和 EXPLAIN ANALYZE 分析查詢計劃，找出哪些查詢性能較差並進行調整。

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

# 優化查詢

* 索引優化：為經常查詢的列建立索引，通過索引加速查詢。
CREATE INDEX idx_your_table_column ON your_table(column);

* 查詢改寫：優化查詢，避免使用 SELECT *，只選取需要的欄位，減少不必要的數據傳輸。

* 統計信息更新：定期執行 ANALYZE，保持資料庫統計信息的準確，幫助查詢優化器做出更好的決策。
ANALYZE your_table;

# 分片（Sharding）
* 水平擴展：將數據分割到不同的分片（shard）中，實現水平擴展。這可以通過將數據分佈到多個數據庫實例來減少單個數據庫的負載。
* 應用層數據路由：應用層需知道如何將查詢路由到正確的分片，以減少跨分片的查詢負載。
* 負載均衡與高可用性：透過分片，可以實現更好的負載均衡和容錯，提升系統的高可用性。

# 分區（Partitioning）
* 分區表：將大表根據某個字段（如日期）進行水平或垂直分割，優化查詢性能。
* 優化查詢性能：透過分區查詢，資料庫只需掃描特定的分區而非整個表，從而提升查詢效率。
* 分區管理：可以針對不同分區進行獨立的備份、恢復和維護，簡化數據管理工作。

# Redis 提升 PostgreSQL 效能的方法

## 緩存優化
* 使用 Redis 減少資料庫壓力：通過 Redis 將經常查詢的結果緩存起來，減少對資料庫的讀取壓力。
* 快取熱點查詢：將頻繁訪問的數據（如熱門文章、用戶資料等）存儲在 Redis 中，優化查詢響應時間。

## 分佈式鎖
* 當需要進行一些高成本或避免併發衝突的操作時，可以使用 Redis 的分佈式鎖來保證只有一個進程/執行緒在執行操作，避免多個操作同時修改資料庫，造成一致性問題。

## 作業排程（Task Queue）：
* 如果某些操作較耗時，並且不需要立即回應（如匯總報告、批量數據更新等），可以將這些操作放到 Redis 支持的作業排程工具中（如 Celery），在後台異步執行，避免應用程式直接壓力集中在 PostgreSQL 上。

## 減少高頻讀取的負載
* 例如一些像是系統配置、字典資料等很少變動的資料，放在 Redis 中進行快取，避免每次都去 PostgreSQL 查詢。

## Redis 的好處
* 減少 PostgreSQL 的讀取負載：查詢頻繁但不常變動的數據可以透過 Redis 快取，減少 PostgreSQL 讀取壓力。
* 提高併發處理能力：Redis 基於記憶體的高效能存取特性，使得高併發應用能夠更快地取得資料，減少查詢資料庫的延遲。
* 避免資源競爭與衝突：通過 Redis 的分佈式鎖，可以避免多個應用同時修改相同的數據，保持資料庫的數據一致性。
* 提供更好的擴展性：當資料庫壓力過大時，Redis 可以分擔部分資料存取的負擔，從而提升整體系統的可擴展性與效能。


# 系統配置優化
* 配置參數調整：調整 PostgreSQL 的配置參數，如 shared_buffers（控制內存緩衝區大小）、work_mem（每個工作記憶體大小）等來提升性能。
* VACUUM 和 ANALYZE：定期執行 VACUUM 清理死條目，釋放空間，並執行 ANALYZE 更新表的統計信息，優化查詢計劃。


# 硬體升級
* 增加內存和使用更快的存儲設備：如 SSD，提升資料庫的 I/O 性能。
* 增加 CPU 和磁碟空間：當系統瓶頸出現在硬體資源不足時，可以通過升級硬體來緩解性能壓力。

# 監控和診斷工具

* pg_stat_statements：通過安裝 pg_stat_statements 擴展，監控 PostgreSQL 中最耗時的查詢。
CREATE EXTENSION pg_stat_statements;

* 第三方監控工具：使用工具如 pgBadger、pgAdmin 或 PostgreSQL Enterprise Manager 進行性能監控和診斷。
使用 pgBadger、pgAdmin、PostgreSQL Enterprise Manager 等。


# 讀寫分離和負載均衡
* 讀寫分離：將寫操作集中到主資料庫，讀操作則分散到一個或多個從資料庫，從而減少主資料庫的壓力，提升整體讀取性能。
* 負載均衡：實施讀寫分離後，使用負載均衡來合理分配查詢請求，提升整體效能。


# 觸發器（Triggers）
* 觸發器允許在數據插入、更新或刪除時自動執行預定義的操作。
* 審計和一致性檢查：透過觸發器，可以自動記錄資料變更或強制資料庫一致性。
* 缺點：過多使用觸發器可能影響性能，因此需要謹慎使用。

## 定義

觸發器（Triggers）是一種資料庫對象，是一段特定的 SQL 程序，在資料庫中的某些事件（如插入、更新或刪除操作）發生時，自動執行預先定義的動作。觸發器通常用於強制執行業務規則、數據完整性和審計要求。

## 特性

1. **自動執行**：查找和優化慢查詢
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


# N + 1 Problem
* N+1問題是指在使用ORM（對象關係映射）查詢數據庫時，因為未能有效地使用聯合查詢（JOIN），導致系統發出N+1次查詢。
* N+1問題是在查詢關聯對象時，未能有效地使用聯合查詢，導致大量的數據庫查詢，從而影響性能
### 範例
* django ORM使用 select_related和prefetch_related是 避免N + 1 Problem

#### select_related
* select_related：使用SQL JOIN語句在一個查詢中獲取相關對象
  * 適用於“一對一”和“多對一”關係。它通過JOIN操作將多表數據一次性加載到內存中。

```python
# models.py
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)


books = Book.objects.select_related('author').all()
```
* 上面這段產生以下查詢
```SQL
SELECT book.id, book.title, author.id, author.name
FROM book
JOIN author ON book.author_id = author.id;
```

#### prefetch_related
* prefetch_related：發出兩個獨立的查詢，然後在內存中將結果關聯起來，
  * 適用於“一對多”和“多對多”關係。它通過預取關聯對象的數據，避免在每次訪問關聯對象時發出新的查詢。
```python
class User(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)


users = User.objects.prefetch_related('posts').all()
```
* 上面這段產生以下查詢，Django會在內存中將這兩個查詢的結果關聯起，
```SQL
SELECT * FROM user;
SELECT * FROM post WHERE user_id IN (1, 2, 3, ...);

```

# ORDER BY RAND()
* 是用來隨機排列結果集的一種方式，通常用於選擇隨機記錄。
* 問題：使用 ORDER BY RAND() 來隨機排列結果會導致全表掃描，影響性能
* 改善方式
  * 使用主鍵範圍隨機選擇
    * 先取得主鍵的最大值和最小值，然後在此範圍內生成隨機數，選取記錄。
  * 預先計算隨機排序 (Precomputed Random Order):
    * 建立一個額外的隨機索引欄位，在插入或更新記錄時進行隨機排序。查詢時直接使用此欄位進行排序，避免即時計算。


# LIMIT N, 20
* LIMIT N, 20 用來從查詢結果的第 N+1 條記錄開始，返回 20 條記錄。
* 這種方法在處理大量數據時也會有性能問題，特別是當 N 很大時。
* 其主要原因是：
  * 偏移量 (Offset) 過大: 資料庫需要掃描並跳過前 N 條記錄，這會浪費大量資源。
  * 無效掃描 (Inefficient Scanning): 即使只需要後面的記錄，資料庫仍必須處理所有之前的記錄。
* 改善方式
  * 基於索引的分頁查詢 (Pagination Using Index):
  * Cursor-Based Pagination: 使用游標進行分頁查詢，每次查詢使用上次結果的最後一條記錄作為起點。


# 連線池（Connection Pooling）
* 定義：連線池是一種資源管理技術，用來在應用程式與資料庫之間保持多個連線，以避免頻繁的連線開啟與關閉所帶來的資源消耗。
* 工具與實踐：使用 pgbouncer 或 pgpool-II 等工具來管理資料庫連線，確保在高併發下減少連線的建立和關閉。
* 參數設置
  * max_connections: 設置資料庫的最大連線數，避免連線過多導致性能瓶頸。
  * pool_size: 控制連線池的大小，優化連線的使用效率。


# WAL（Write-Ahead Logging）優化
* 定義：WAL 是 PostgreSQL 用來確保數據安全和一致性的技術。通過將數據變更記錄到 WAL 日誌中，保證在系統崩潰時可以恢復數據。

# 物理備份和邏輯備份
* 物理備份：通過工具（如 pg_basebackup）進行整個資料庫的物理備份，適用於大規模數據。
* 邏輯備份：使用 pg_dump 進行單個資料表或資料庫的備份，適用於小範圍資料。
* 優化備份策略：針對不同的資料大小和備份需求，選擇合適的備份方式，以避免影響正常查詢操作。

# 數據庫複製（Replication）
* 主從複製（Master-Slave Replication）：設置主從數據庫進行讀寫分離，減輕主數據庫的讀取壓力。
* 同步與非同步複製
  * 同步複製：確保數據在所有從數據庫寫入後才返回操作結果，適合數據一致性要求高的場景。
  * 非同步複製：只要數據寫入主數據庫即可返回結果，適合對性能要求較高的場景。

# 表設計的最佳實踐
* 標準化（Normalization）與非標準化（Denormalization）：
  * 在數據量較小的情況下使用標準化來避免數據冗餘。
  * 當數據量增大或查詢頻繁時，考慮非標準化，將一些頻繁查詢的數據冗餘存儲在同一張表中，以減少 JOIN 操作。
* 避免過度索引
  * 雖然索引能夠加速查詢，但過多的索引會導致寫入性能下降。因此需要平衡讀寫操作的需求，針對頻繁查詢的列建立索引。

# 數據壓縮
* PostgreSQL 支持表空間和索引壓縮，通過使用 TOAST（The Oversized-Attribute Storage Technique）技術，能有效壓縮大字段的數據，減少存儲空間和 I/O 成本。
* 可以考慮設置列存格式或壓縮分區表來進一步減少 I/O 和儲存需求。

# 性能監控與預警
* 監控工具：如 Prometheus + Grafana 來監控 PostgreSQL 的性能，設置 CPU、內存、I/O 的使用情況報警，及時診斷問題。
* 慢查詢報告：定期收集和分析慢查詢日誌，使用像 pgBadger 這類工具生成可視化的報告，幫助持續優化。

# 批量操作優化
* 對於批量插入、更新和刪除操作，可以使用批量操作語句如 COPY 和批量 INSERT，以減少每次操作的開銷。
* 避免單次操作處理過大的數據集，可以分段處理，減少鎖競爭和內存消耗。


# 索引管理策略
* 定期重建索引：隨著表數據的變化，索引也會逐漸失效或變得臃腫，定期重建索引能保持查詢的高效性。
* 減少無效索引：確保每個索引都能真正為查詢服務，移除那些不常使用或影響性能的索引。

# 冷熱數據分離
* 冷熱數據分離是一種優化數據存儲與查詢性能的方法，通過將使用頻率高的熱數據和使用頻率低的冷數據分開存放，可以減少對高頻數據的查詢延遲。
* 可以使用表分區或表分片技術來管理冷熱數據，將歷史性數據放在單獨的分區中，減少日常查詢對整體表的負擔。


# 結論，時間優先複習
* 查詢優化（Query Optimization）：透過索引、查詢改寫、EXPLAIN 等工具找出並優化慢查詢。
* 存儲優化（Storage Optimization）：通過分區、壓縮、冷熱數據分離等技術，減少資料庫存儲和 I/O 的壓力。
* 系統配置（System Configuration）：調整參數如 shared_buffers、work_mem，優化資料庫效能。
* 讀寫分離（Read-Write Separation）：實現讀寫操作分離，將讀取操作分配到從資料庫，減輕主資料庫壓力。
* 連線池管理（Connection Pool Management）：減少頻繁建立連線的開銷，提高並發處理效能
* 備份（Backup）：確保資料安全的備份策略，使用物理或邏輯備份技術
* 監控（Monitoring）：透過監控工具及時發現和解決性能瓶頸。
* 索引管理（Index Management）：定期維護和優化索引，確保查詢效率。
* 冷熱數據分離（Hot/Cold Data Separation）：優化資料存儲和查詢性能，將頻繁訪問的熱數據與不常訪問的冷數據分開處理。


# ref
* GPT
* [Data Partitioning 資料分區是什麼？ – 系統設計 10](https://hogantechs.com/zh_tw/data-partition-system-design-database-interview/)
* [[架構設計] 高性能 DB 架構設計(RDBMS / NoSQL / Cache)](https://godleon.github.io/blog/Architecture_Design/Architecture-Design-High-Performance-db-nosql-cache/)
* [SQL指令優化SQL Tuning](https://www.cc.ntu.edu.tw/chinese/epaper/0031/20141220_3109.html)
* [20條Tips：高性能SQL查詢，優化取數速度方案](https://ithelp.ithome.com.tw/articles/10213001)
* [如何避免分析兩分鐘，運行兩小時？這是一份SQL優化大全](https://allaboutdataanalysis.medium.com/%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E5%88%86%E6%9E%90%E5%85%A9%E5%88%86%E9%90%98-%E9%81%8B%E8%A1%8C%E5%85%A9%E5%B0%8F%E6%99%82-%E9%80%99%E6%98%AF%E4%B8%80%E4%BB%BDsql%E5%84%AA%E5%8C%96%E5%A4%A7%E5%85%A8-49e6c36f2b5f)