## todo
* 各種key
* SQL
* RDBMS vs noSQL
* PostgrSQL/MySQL的特性
* Redis/MongoDB 應用場景
* 資料庫正規化
* 什麼是transaction? Transaction失敗了怎麼辦？
* db Sharding ？
* 資料庫cache會遇到什麼問題？
* composite index?
* 為什麼一般來說不建議使用 SELECT * ?
* 如果要用MongoDB紀錄一個人的點擊log，你會怎麼設計？
  * MongoDB有哪些常用的優化措施？
* 假設今天有一模一樣的query，前幾天只要500ms就能跑完，今天突然要5s才跑完，你會怎麼解決這個問題？
* 某生產環境，有node.js一台、DB一個，尖峰時刻請求都卡在DB，請問短期、長期各有什麼策略？



## cache
* LRU（Least Recently Used）
* FIFO (First In, First Out)
* LFU (Least Frequently Used)
* MFU (Most Frequently Used)
* Random Replacement (RR)
* ARC (Adaptive Replacement Cache)

### ref

## N + 1 Problem
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


## ref
* [[轉職] Junior 後端工程師面試技術題](https://johnnychang25678.medium.com/junior-%E5%BE%8C%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%AB%E9%9D%A2%E8%A9%A6%E6%8A%80%E8%A1%93%E9%A1%8C-ef39b902eda8)