# SQL injection

# 防範方式

* 所有防止 SQL Injection都是經由其他程式語言的輔助

## 參數化查詢
* SQL 語句和用戶輸入的數據是分開處理的
* 資料庫引擎會將 SQL 語句編譯並解析成語法樹，輸入的參數則被視為數據，而不是 SQL 語句的一部分。

## 特殊字符轉義
* 當你在 SQL 查詢中插入包含特殊字符（例如單引號或雙引號）的輸入時，參數化查詢會自動轉義這些字符，從而避免它們被解釋為 SQL 語句的一部分。這適用於原生 SQL 和 ORM 查詢。
* 在原生 SQL 中，參數化查詢會自動處理輸入的特殊字符，確保它們不會干擾 SQL 語句的結構。
* ORM 同樣會自動進行轉義，例如，處理包含單引號的名稱 O'Brian，它不會被解釋為 SQL 語句的一部分，而是作為一個安全的字串處理。

## ORM 避免 SQL 注入的主要機制包括：
* 參數化查詢：將 SQL 語句和輸入數據分離，防止惡意數據被直接執行。
* 自動轉義特殊字符：處理數據中的特殊字符，避免破壞 SQL 語句結構。
* 限制原生 SQL 查詢：鼓勵使用 ORM 的查詢語法來減少手寫不安全的 SQL。
* 數據驗證：在模型層對輸入數據進行類型和格式驗證，防止不符合預期的數據進入資料庫操作。
