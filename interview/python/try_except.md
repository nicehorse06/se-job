# Python的錯誤處理

## todo
* 錯誤中止分析

## try except finally
* 如果在 except 或 finally 區塊內部發生了未捕捉的異常，程序將會終止，並輸出異常的追蹤信息。
  * 要在裡面再嵌套的異常處理，才能捕捉錯誤

``` python
try:
    # 嘗試執行可能會出錯的代碼
    pass
except Exception as e:
    # 處理特定的異常
    pass
finally:
    # 總是會執行的代碼，無論是否發生異常
    pass

```

## raise
* raise也會讓process停止，只是我可更確定什麼錯誤 錯誤還是會發生