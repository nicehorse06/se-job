## todo
* 各種key
* SQL
* RDBMS vs noSQL
* PostgrSQL/MySQL的特性
* Redis/MongoDB 應用場景
* 正規化
* 什麼是 Transaction
* db Sharding ？

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