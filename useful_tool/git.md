# Git基礎中的基礎指令

## 什麼是`Git`
* 為一種分散式的版本控制系統
* 可記錄某資料夾檔案的所有改變
* git的原理為在目標資料夾產生一個隱藏檔案`.git`，監視並記錄該資料夾的改變和紀錄
* 可用git把程式上傳到git server，通常是`github`

## 執行步驟流程
1. 產生`.git`
2. 記錄修改
3. 上傳記錄
4. 繼續第二步

## 產生`.git`
* git init
	* 功能為新建新的`.git`
	* 使用時機為要自行建立新的git時
	* 進入一個要使用git的資料夾輸入指令`git init`，即可產生`.git`

* git clone [目標git網址]
	* 功能為複製下載別人的專案
	* 使用時機為從目標網址的git 伺服器下載檔案，會包含其`.git`
	* 範例：`git clone git@github.com:nicehorse06/se-job.git`
	* `目標git網址`在該git 伺服器網站皆可找到

## 記錄變更狀態
* git add [檔案名稱]
	* 功能為讓git關注並暫時記錄該檔案的變化
	* 使用時機為專案底下有新增/刪除/修改檔案時，讓git做暫時記錄，供後續`git commit`做正式紀錄
	* 用`git status`可觀察專案底下的變化狀態
		* 尚未被`git add`記錄的綠色為紅色
		* 被`git add`記錄的檔案為綠色，綠色表暫時記錄
	* 範例：`git add index.html`，即可暫時記錄`index.html`的狀態
	* 可寫一個`.gitignore檔案`，來忽略要不打算記錄的檔案
		* 如一些db檔案、log檔案，不應被git記錄的檔案

* git commit -m '[輸入註解]'
	* 功能為正式紀錄`git add`新增的暫時記錄
	* 使用時機為使用一到多次`git add`時，功能完成到一個階段，可以正式做一個記錄，並寫入變化註解
	* 記錄git的變化的最小單位為一個`commit`
	* `-m`的參數表示後面要接一串文字當作註解，如果只輸入`git commit`會進入`Vim`文字編輯器寫註解，新手不建議
	* 用`git status`可觀察專案底下的變化狀態
		* `git commit`完畢，所有`git add`產生的暫存綠色檔案皆會被正式儲存而消失，進入一個沒有改變記錄的狀態
		* `git status`會跟使用者說有多少筆沒有上傳的`git commit`被記錄
	* 範例：`git commit -m '新增index.html'`

## 傳送、下載檔案到git server
* git pull
	* 功能為從git server下載最新的`commit`
	* 使用時機為多人協作時，下載別人已經上傳的`commit`
	* 如果沒有下載別人最新的`commit`，會無法用`git push`上傳修改
	* `git pull`可能會跟本地端檔案有衝突，git會要求使用者解決衝突

* git push
	* 功能為上傳本地端的`commit`
	* 使用時機為上傳本地端`commit`，如果多人協作需要用`git pull`確認有無他人的`commit`才能上傳

## 查看git狀態
* git log
	* 功能為查看歷史`commit`狀態
	* 資訊包含該`commit`的號碼、作者、註解、操作時間
	* 可用`git checkout [commit 號碼]`指令切檔案到的過去的`commit`，可以想成讀取舊記錄
	* 使用時機為查看過去的`commit`記錄

* git diff
	* 功能為查看檔案變更的差別
	* 使用時機為修改檔案，且尚未`git add`前，可查看做了哪些修改

* git status
	* 功能為查看目前git的狀態
	* 資訊有所有變更的檔案、暫存的檔案、commit數量、目前的branch位置
	* 設定`.gitignore`可以讓`git status`忽略一些不想被記錄的檔案，如本地的設定檔、每次程式執行都會跑出來的垃圾檔

## 一些進階功能概述
* branch
	* git的一種狀態，目的為對應到不同的場景會需要到不同的`commit`記錄
		* 比如最穩定的產品其branch上的`commit`皆要非常穩定
		* 開發中的產品就會基於穩定的`commit`加上一些開發中額外功能`commit`
	* 需學習一些從其他branch合併其`commit`的指令
	* 有更多博大精深的指令在此
* git checkout
	* 可把目前git狀態切換到別的branch
	* 可以除所有未被暫存跟commit記錄的修改，用法為`git checkout [檔案名稱]`

## 參考資料
* [廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
* [為你自己學 Git](https://gitbook.tw/)
* [twtrubiks/Git-Tutorials](https://github.com/twtrubiks/Git-Tutorials) Git-Tutorials 
* [什麼是 Git？為什麼要學習它？](https://gitbook.tw/chapters/introduction/what-is-git.html)