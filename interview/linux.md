# Linux 系統操作的面試

## 可能會考的問題
* MAC address
* Signal
* !!
* MMO killer
* Zombie process
* tcpdump
* ip 指令
* apt/dpkg
* ps：顯示進程狀態
  * `ps aux`: 顯示所有用戶的所有進程
* ssh user@hostname：遠程登錄到指定主機
* df：
  * `df -h`: 以人類可讀格式顯示文件系統磁盤使用情況
  * `df`: 顯示文件系統的總體磁盤使用情況
* du：顯示特定目錄或文件的磁盤使用情況
* free：顯示內存使用情況
* top：實時顯示系統進程和資源使用情況
  * 包括 CPU、內存使用、進程資訊
* chmod：改變文件權限
* chown：改變文件所有權
* Linux 登入 log
* Bash：常見指令及操作
* 查看 log：
  * `tail -f /var/log/syslog`: 實時查看系統日誌
* kill PID：終止進程
* ln：建立符號連結
* sort：排序文件內容
* grep：文本搜索
* 如何掛載和卸載文件系統：
  * 掛載：`sudo mount /dev/sdXN /mnt/point`
  * 卸載：`sudo umount /mnt/point`
* swap：交換分區及其用途
* find：查找文件
* 如何檢查 TCP 端口是否被佔用
* Process ID (PID), PPID, PGID, SID：進程 ID、父進程 ID、進程組 ID、會話 ID
* SIGKILL vs SIGTERM：強制終止與正常終止進程的區別
* PID 1：解釋它的角色
* 如何終止進程：
  * `kill PID`: 終止指定進程
* ifconfig 或 ip addr show：查看網絡接口配置和 IP 地址
* ping：檢查網絡連通性
* netstat：顯示網絡連接、路由表、接口統計等
* dmesg：顯示並控制內核訊息
* 如何啟動和停止系統服務：
  * `sudo systemctl start servicename`: 啟動服務
  * `sudo systemctl stop servicename`: 停止服務
* systemctl 和 service 命令：管理 systemd 和 SysVinit 服務
* 查看服務狀態：`sudo systemctl status servicename`
* Bash 中的 && 和 ||：
  * `&&`: 前一個命令成功時執行後一個命令
  * `||`: 前一個命令失敗時執行後一個命令
* cron 定時任務：`crontab -e` 編輯定時任務列表
* 如何查看系統的 CPU 和內存使用情況：
  * `top` 或 `htop`: 實時查看系統性能
  * `free -h`: 查看內存使用情況
* 如何診斷系統性能問題：
  * 使用 `top`、`htop`、`iostat`、`vmstat` 監控系統資源
  * 查看系統日誌文件，找出錯誤信息
* iostat：報告 CPU 和 I/O 設備使用情況
* vmstat：報告虛擬內存、進程、CPU 活動等系統性能指標
* stat [filename]：查看文件詳細信息
* iptables -L：顯示防火牆規則
* route -n：查看路由表
* apt-get 操作：
  * `apt-get install`: 安裝軟件
  * `apt-get remove`: 卸載軟件
  * `apt-get build-dep`: 安裝編譯依賴
  * `apt-cache search`: 搜索軟件包
  * `add-apt-repository`: 添加軟件源
  * `/etc/apt/sources.list`: 配置軟件源
* Kernel 版本：`uname -r`
* Linux 發行版版本資訊：查詢操作系統版本
* dmesg：查看並控制內核訊息
* insmod：插入內核模組
* modprobe：加載內核模組
* grep "pattern" file.txt > output.txt 2>&1：搜索並重定向輸出到文件
* find / -name "*.log" > /dev/null 2>&1：查找文件並忽略輸出

## ref
* [常用Linux Shell指令](https://hackmd.io/@a110605/S1NuXFEjG?type=view)