# 後端side project idea

## Todo List API
* 實作一個有CRUD功能的todo list API

### 基本
* 有一個DB建立Todo的表，有ID、待做事項、是否完成
* API充分使用HTTP方法來區分動作

### 進階
* 為API新增使用者權限，某些帳號才能做某些功能
* 新增登入功能取得token來做API使用認證
* 新增API rate limiter，限制API使用次數
* 為API建立cache，應付短時間重複請求
* 為DB建立replica，讀寫分離
* 為API紀錄log
* 把API server包到container中，方便部屬
* 為API新增備援機制
* 串接金流，讓API可以收費
* 用非同步任務執行通知發信，像Celery
* 為API做load balance
* 用容器包API，建立一套部屬流程
* 完善的文檔可以參考，為API新增官網
* 新增測試
* CI/CD流程

## 其他
* 縮網址

### ref
* Java
    * [Day 17 - Spring Boot Todo List RESTful API 實作](https://ithelp.ithome.com.tw/articles/10244715)