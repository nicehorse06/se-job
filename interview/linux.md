# Linux 系統操作的面試

## 可能會考的問題 todo prepare
* mac address
* signal
* !!
* MMO killer
* zombie
* tcpdump
* ip指令
* apt/dekg
* ps 
* ssh user@hostname: 遠程登錄到指定主機。
* df
  * df -h: 以人類可讀格式顯示文件系統磁盤使用情況。
  * df: 顯示文件系統的總體磁盤使用情況。
* du: 顯示特定目錄或文件的磁盤使用情況。
* free
* top
* chmod
* chown
* ps 
* linux登入log
* bash
* 看log
* kill PID
* ln
* sort
* grep
* 如何掛載和卸載文件系統？
* mount
  * 掛載：sudo mount /dev/sdXN /mnt/point
  * 卸載：sudo umount /mnt/point
* top有哪些資訊
* swap
* find
* how if TCP port 8000 is occupied
* process ID (PID), PPID, PGID and SID
* sigkill and sigterm
* What is PID 1
* process管理
  * ps aux: 顯示所有用戶的所有進程
  * top: 實時顯示系統進程
* 如何終止一個進程
  * kill PID: 終止指定進程（PID 為進程 ID）。   
* ifconfig 或 ip addr show: 顯示網絡接口配置和 IP 地址。  
* ping: 檢查網絡連通性。
* netstat: 顯示網絡連接、路由表、接口統計等。
* dmesg: 顯示和控制內核環境的訊息
* tail -f /var/log/syslog: 實時查看系統日誌。
* 如何啟動和停止系統服務？
  * sudo systemctl start servicename: 啟動服務。
  * sudo systemctl stop servicename: 停止服務。
* 請解釋 systemctl 和 service 命令的用途。
  * systemctl: 用於管理 systemd 系統和服務管理器。
  * service: 用於管理 SysVinit 和 Upstart 服務。
* 如何查看服務的運行狀態？
  * sudo systemctl status servicename: 查看服務狀態。
* 請解釋 && 和 || 在 Bash 中的作用。
    * &&: 前一個命令成功時執行後一個命令。
    * ||: 前一個命令失敗時執行後一個命令。

* 如何使用 cron 設置定時任務？
  * 使用 crontab -e 編輯定時任務列表。
* 如何查看系統的 CPU 和內存使用情況？
  * top 或 htop: 實時查看系統性能。
  * free -h: 查看內存使用情況。
* 如何診斷系統性能問題？
  * 使用 top、htop、iostat、vmstat 等工具監控系統資源。
  * 查看系統日誌文件，找出可能的錯誤信息。
* 請說明 iostat 和 vmstat 命令的用途。
  * iostat: 報告 CPU 和 I/O 設備的使用情況。
  * vmstat: 報告虛擬內存、進程、CPU 活動等系統性能指標。
* stat [filename]
* iptables -L 
* route -n 查看路由表
* ubuntu
  * Ubuntu init daemon
  * How to check init and service log within Ubuntu
  * apt install
  * apt-cache search
  * apt-get remove
  * apt-get build-dep
  * add-apt-repository
  * /etc/apt/sources.list
* Kernel版本
  * uname -r
* Linux Distro版本
* dmesg
  *  dump Linux Kernel messages
* insmod module.ko
* modprobe module
* grep "pattern" file.txt > output.txt 2>&1
* find / -name "*.log" > /dev/null 2>&1

## ref
* [常用Linux Shell指令](https://hackmd.io/@a110605/S1NuXFEjG?type=view)