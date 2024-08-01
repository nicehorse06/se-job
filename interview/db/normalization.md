# 資料庫正規化

## 功能
* 一個將資料庫分解，經由無數關聯合併且訊息無損的過程

## 目的
* 減少資料庫中資料冗餘，增進資料的一致性
* 避免資料更新異常


## 第一正規化
* 目的為排除重複群，要求每一欄的值只能有單一值
    * 好處為可以確定每一欄固定的資料大小
* 資料表中有主鍵，其他所有欄位相依於主鍵
* 以下不符合第一正規化

ID|顧客|日期| 數量
-|-|-|-
1|Pete|Monday|19.00 <br />-28.20
2|Pete|Wednesday|-84.00
* 以下符合第一正規化

ID|顧客|日期| 數量
-|-|-|-
1|Pete|Monday|19.00
2|Pete|Monday|-28.20
3|Pete|Wednesday|-84.00


## 第二正規化
* 滿足第一正規化
* 去除資料部分相依
    * 每一個屬性必須完全相依於主鍵
    * 去除屬性對非鍵欄位的相依
* 減少重複資料的需要，增進維護功能
* 以下不符合第二正規化

零件ID(主鍵)|價格|供應商ID（外鍵）|供應商名稱|供應商住址
-|-|-|-|-
65|59.99|1|Stylized Parts|VA
73|20.00|1|Stylized Parts|VA
65|69.99|2|ACME Industries|CA

* 以下符合第二正規化

供應商ID(主鍵)|供應商名稱|供應商住址
-|-|-
1|Stylized Parts|VA
2|ACME Industries|CA

零件ID(主鍵)|價格|供應商ID（外鍵）
-|-|-
65|59.99|1
73|20.00|1
65|69.99|2

## 第三正規化
* 滿足第二正規化
* 要求非主鍵術性之間應獨立無關
* 以下不符合第三正規化

訂單編號(主鍵)|客戶名稱|單價|數量|小計
-|-|-|-|-
1000|David|$35.00|3|$105.00
1001|Jim|$25.00|2|$50.00
1002|Bob|$25.00|3|$75.00

* 以下符合第三正規化
    * 小計的值依賴於單價和數量，不符合正規化

訂單編號(主鍵)|客戶名稱|單價|數量
-|-|-|-
1000|David|$35.00|3
1001|Jim|$25.00|2
1002|Bob|$25.00|3

```python 
class Order(models.Model):
    id = models.AutoField(primary_key=True, verbose_name=u'訂單編號')
    quantity = models.PositiveIntegerField(verbose_name=u'數量')
    unit_price = models.PositiveIntegerField(verbose_name=u'單價')
    customer_name = models.CharField(max_length=5, verbose_name=u'客戶名稱')
    
    @property
    def totle(self):
    # 小計
        return self.quantity * self.unit_price
```