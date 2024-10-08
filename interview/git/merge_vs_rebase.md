# Merge Rebase

# git merge
* 概念: git merge 是將兩個分支的變更合併，保留兩個分支各自的歷史記錄，並在合併點產生一個合併提交（merge commit）。
* 操作方式: 當你使用 git merge 時，Git 會把目標分支的變更與當前分支的變更進行整合，並產生一個新的合併提交。這會導致 Git 的歷史記錄顯示一個合併點，保留了所有的歷史變更。
## 優點:
歷史記錄完整，能夠看到合併過程。
容易跟蹤不同分支之間的變更。
## 缺點:
合併可能會創建額外的合併提交，讓歷史記錄變得較為複雜。


# git rebase
* 概念: git rebase 是將一個分支上的變更重新應用（重寫）到另一個分支的基礎上，將分支的歷史重組。這不會產生新的合併提交，而是將所有的提交「搬移」到另一個分支的最新提交之後。
* 操作方式: 當你進行 git rebase 時，Git 會將當前分支的變更暫存起來，然後將這些變更一個接一個地重新應用到目標分支的最新提交之上，歷史記錄會被「平鋪」。
## 優點:
歷史記錄更加乾淨且線性，沒有合併點。
提交順序更加清晰，方便閱讀和理解。
## 缺點:
可能會重寫歷史，尤其是在共享分支上，這可能會造成問題（如提交丟失或衝突）。


# 差異總結
## git merge:
* 將兩個分支的歷史記錄合併，保留所有歷史，產生一個合併提交。
* 適合需要保留完整歷史、尤其是共享分支的場景。
## git rebase:
* 將當前分支的提交「重寫」到另一個分支之上，重組歷史記錄，沒有合併提交。
* 適合想要保持歷史記錄乾淨、線性但不適合在已經公開的分支上使用。

# 圖形化說明

## git merge
* merge 前：
  
A---B---C feature
 \        \
  D---E----F main
* merge 後
  
A---B---C---G feature (merge commit)
 \        /
  D---E---F main

## git rebase

* rebase 後
  
A---B---C feature
 \      
  D---E---F main

* rebase 後
D---E---F---A'---B'---C' feature
