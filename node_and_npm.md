# Node.js 的 npm 基本介紹

## 參考資料
* [從零開始: 使用NPM套件](https://medium.com/html-test/%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B-%E4%BD%BF%E7%94%A8npm%E5%A5%97%E4%BB%B6-317beefdf182)
* [弄懂 npm install 的 –save 與 –save-dev](https://chriskang028.wordpress.com/2017/07/05/%E5%BC%84%E6%87%82-npm-install-%E7%9A%84-dependencies-v-s-devdependencies/)
* [npm 全面介绍](https://neveryu.github.io/2017/04/10/npm/)

## 什麼是`Node.js`?
* 一個能讓Javascirpt運行在伺服器上的套件
* 幾乎所有伺服器上的Javascirpt都適用`Node.js`
* `node`上的JS語法為`(核心JS)`-`(瀏覽器上的JS)`+`(Node提供的JS)`
* 提供`node`平台，讓開發人員上傳套件
* 提供`npm`，讓JS前後端人員可以管理套件

## 什麼是`npm`
* `npm`為node.js package management的縮寫，主要用於js的套件管理
* 可下載、安裝、升級、升級他人的`node.js`套件
* 也上傳自己的套件

## 使用流程
* 執行`npm init`，產生package.json
* 執行`npm install`，下載套件

## Node版本檢查(npm -v)
* `npm -v`可查看目前Node版本
* 如果版本太舊，可執行`npm install -g npm`更新版本

## 初始化
* `npm init`
	* 使用時機為要建立新的node專案時
	* 執行後，會詢問專案的基本資料，並產生`package.json`記錄此訊息
	* `package.json`除了基本訊息，還會記錄此專案所用到的套件，和特殊命令設定
* `npm install`
	* 語法為後面不帶參數，使用時機為拿到舊有的專案
	* 依據該專案的`package.json`安裝所需套件到`node_modules/`
	* 如git clone新專案時，因為.gitignore ,不會有 `node_modules/`，需要此命令安裝套件

## 套件安裝(npm install)
* 執行後會從`http://npmjs.org`下載套件
* 基本語法為 `npm install [套件名]`
	* 如`npm install express`
	* 也可以從github下載如`npm install [github地址]`
* 在JS中通過`require()`來引入套件
	* 如`var express = require('express');`
	* 範例如以下node.js檔案
```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

```

### 本地安裝
* 套件會儲存在該專案的`node_modules/`
	* 如果專案底下沒有`node_modules/`目錄，會創建一個，位置和`package.json`同一層
	* 每一個`node`專案都會有一個`node_modules/`，專案間的套件、版本不互相干擾
* `node_modules/`不應被記錄在git中，需建立`.gitignore`忽略該檔案

### 全局安裝
* 全局安裝，需加上`-g`，語法為`npm install -g [套件名稱]`
	* 如 `npm install -g express`
* 全局安裝會把套件裝在電腦中node的安裝目錄
* 可以直接在命令行使用，如`npm`命令本身就是一全局套件

## 套件刪除(npm uninstall)
* 語法為`npm uninstall [套件名稱]`
	* 如`npm uninstall express`

## package.json 專案狀態管理
* 用json儲存
	* json為一類似JS物件的型態的檔案
	* 攥寫的原則為一個key配上一個value
	* http協定普遍使用json格式來傳送檔案
* `npm install`和`npm uninstall`加上參數`--save`即可同步更新於`package.json`
	* 語法為 `npm install [套件名] --save`
	* 最新版本似乎預設為命令皆有`--save`
* `npm install`預設會把套件寫到`dependencies`中
	* 代表此套件是此專案的相依套件，專案最後發布後要有此套件才會運行
* `npm install [套件名稱] --save-dev`會把此專案寫到`devDependencies`中
	* 代表此套件只會在開發時需要，發布專案時用不到此套件
	* 在發布前的套件安裝可忽略此欄位的套件
* `npm run [腳本名稱]`
	* 可在`package.json`中的`"scripts"`註冊腳本名稱
	* `"scripts": { "[腳本名稱]": "[在命令行運行的命令]"}`
		* 如 `"scripts": { "test": "echo \"Error: no test specified\" && exit 1"}`
	* 上式中`test`已註冊，即可在命令行中執行`node run test`