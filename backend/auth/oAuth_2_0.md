# OAuth 2.0 介紹

OAuth 2.0 是一種常用的授權框架，主要用於讓第三方應用程式能夠在用戶授權的情況下，安全地存取用戶的資源。以下是 OAuth 2.0 的簡要介紹：

## 核心概念

1. **Resource Owner（資源所有者）**：通常是用戶，擁有資源伺服器上的數據。
2. **Client（客戶端）**：需要存取資源的應用程式，通常是第三方應用。
3. **Authorization Server（授權伺服器）**：負責驗證用戶身份並授予授權碼或存取令牌。
4. **Resource Server（資源伺服器）**：存放用戶數據的伺服器，根據授權伺服器頒發的令牌允許客戶端存取資源。

## 流程

OAuth 2.0 的授權流程通常包括以下幾個步驟：

1. **用戶授權（Authorization Grant）**：
   - 客戶端將用戶引導到授權伺服器的授權頁面，請求授權存取特定資源。
   - 用戶在授權頁面上進行身份驗證並同意授權。

2. **授權碼（Authorization Code）**：
   - 授權伺服器驗證用戶身份後，向客戶端返回一個授權碼（Authorization Code）。

3. **交換授權碼（Exchange Authorization Code for Access Token）**：
   - 客戶端使用授權碼向授權伺服器請求存取令牌（Access Token）。
   - 授權伺服器驗證授權碼並返回存取令牌。

4. **存取資源（Access Resource）**：
   - 客戶端使用存取令牌向資源伺服器請求存取用戶資源。
   - 資源伺服器驗證存取令牌後，允許客戶端存取資源。

## 授權模式

OAuth 2.0 提供了幾種不同的授權模式（Grant Types），以適應不同的應用場景：

1. **授權碼模式（Authorization Code Grant）**：適用於服務端應用，安全性最高。
2. **隱式授權模式（Implicit Grant）**：適用於純前端應用，無需後端服務器支持，但安全性較低， 因為無後端服務器支持access token無法不讓使用者端知道，導致安全性差，不建議使用。
3. **密碼模式（Resource Owner Password Credentials Grant）**：適用於高度信任的應用，直接使用用戶名和密碼換取存取令牌， 密碼由應用程式端維護， 。
4. **客戶端模式（Client Credentials Grant）**：適用於應用間直接通信，不涉及用戶授權。

## 安全性

OAuth 2.0 通過使用 HTTPS 保護所有的通信，並且存取令牌通常有一個有效期，過期後需要重新授權。這些措施能夠幫助減少安全風險。

## ref
* chatGPT
* [OAuth 2.0](https://oauth.net/2/)
* [OAuth 2.0 授權流程](https://ithelp.ithome.com.tw/articles/10291817)
* [https://www.technice.com.tw/experience/12520/](https://www.technice.com.tw/experience/12520/)

