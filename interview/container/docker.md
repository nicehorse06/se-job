# Container (docker) 面試準備

* Docker Image 和 Docker Container 的區別
* 為什麼要使用docker

## 什麼是 Container
* 容器技術在作業系統層進行虛擬化，將執行環境打包，方便應用程式在不同平台上移動
* 不同Container之間共享Linux kernel，所以啟動速度很快
  * docker間用`uname -r`查閱會一樣

## Container vs VM
* Container
  * 虛擬化層次：Docker 使用的是操作系統層級的虛擬化技術。
  * 虛擬化內容：Docker 容器虛擬化的是操作系統上的應用環境，包括目錄結構、文件系統、系統庫和應用程序
  * 運行層：容器運行在宿主操作系統的內核上，共享相同的內核
  * 隔離性：使用操作系統級的虛擬化技術（如 Docker），每個容器運行在獨立的進程中，彼此隔離
  * 啟動速度：由於沒有啟動完整的操作系統，容器的啟動速度非常快，通常在秒級
* VM
  * 虛擬化層次：虛擬機使用的是硬體層級的虛擬化技術。
  * 虛擬化內容：虛擬機虛擬的是整個硬體資源，包括 CPU、內存、硬碟、網絡設備等。每個虛擬機都運行一個完整的操作系統。
  * 運行層：VM 在 Hypervisor（如 VMware、Hyper-V 或 KVM）上運行，每個 VM 都有自己的操作系統內核和應用層。
  * 隔離性：使用硬體級的虛擬化技術，每個 VM 都是完全獨立的，擁有完整的操作系統。
  * 啟動速度：由於需要啟動完整的操作系統，VM 的啟動速度較慢，通常在分鐘級。
* 為什麼要使用Container
  * Docker 容器虛擬化應用程序環境，共享宿主操作系統內核，具有輕量級、高效能的特點。
  * 而 VM 虛擬化整個硬體環境，每個 VM 運行一個完整的操作系統，隔離性強，但資源開銷較大。
    * 重要且機密的資料可以放VM如DB

## container 原理
> 使用linux kernel的cgroup Namespace去模擬一個獨立隔離的process形成虛擬環境
### Namespace
> namespace 提供環境隔離
* PID namespace：進程 ID 隔離。
* Network namespace：網絡資源隔離。
* Mount namespace：文件系統掛載點隔離。
* UTS（UNIX Timesharing System）namespace：主機名和域名隔離。
* IPC（Inter-Process Communication） namespace：進程間通信隔離。
* User namespace：用戶和組 ID 隔離。
### cgroup（control group）
> cgroup 分配硬體資源
* cgroup 可以管理process的以下資源
  * CPU、內存、磁盤 I/O 和網絡
* 資源限制：限制 CPU、內存等資源的使用量。
* 資源隔離：確保進程組之間的資源使用互不影響。
* 統計信息：收集資源使用的統計信息。
* 優先級控制：設定不同進程組的優先級。

### Union Filesystems
> Union file system 讓container可以共享重複資源
* Union file system（如 OverlayFS）允許將多個文件系統層疊在一起，使得容器可以共享基礎文件系統，同時又可以在自己的層上進行修改而不影響其他容器。


## docker Image
* 基底OS:僅包含各Linux distributing的目錄結構、依賴庫、套件管理系統、shell
## docker Container
## docker Registry


## Docker 基本操作
* todo 再整理
* docker 命令簡介
``` sh
# 查看所有images
docker images
# 建立 image
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
# 刪除 Image
docker rmi [OPTIONS] IMAGE [IMAGE...]
# 目前運行的container
docker ps
# 新建並啟動 Container
docker run -d -p 80:80 --name my_image nginx
# 啟動 Container
docker start -a [OPTIONS] CONTAINER [CONTAINER...]
# 停止 Container
docker stop [OPTIONS] CONTAINER [CONTAINER...]
# 重新啟動 Container
docker restart [OPTIONS] CONTAINER [CONTAINER...]
# 删除 Container
docker rm [OPTIONS] CONTAINER [CONTAINER...]
# 進入 Container
docker exec -it <Container ID> bash
# 建立image by dockerfile
docker build

# 可以把一個修改過的container變成image
docker commit

# todo
docker volume
docker network ls [OPTIONS]
docker pull
docker cp 
```
## Dockerfile
* ENTRYPOINT
  * 指令用於設定容器啟動時執行的主命令。與 CMD 不同的是，ENTRYPOINT 是固定的，不能被容器運行時的參數所覆蓋。
  * ENTRYPOINT ["echo", "Hello, World!"]
* CMD
  * 指令用於設定容器啟動時的默認命令或參數，可以被容器運行時提供的參數覆蓋。
  * CMD ["echo", "Hello, World!"]
* RUN
  * 指令用於在構建映像檔時執行命令，通常用於安裝軟件包或配置環境。
  * RUN apt-get update && apt-get install -y nginx
* EXPOSE
  * 設定要開放的PORT
``` Dockerfile
# 使用官方的 Python 基礎映像檔
FROM python:3.9-slim

# 設定工作目錄
WORKDIR /app

# 複製當前目錄的內容到容器中的 /app 目錄
COPY . /app

# 安裝依賴
RUN pip install --no-cache-dir -r requirements.txt

# 設定 ENTRYPOINT
ENTRYPOINT ["python", "app.py"]

# 設定 CMD
CMD ["--help"]

```

``` sh
# 當你運行容器時，會執行 python app.py --help。
docker run my-python-app

# 覆蓋默認參數
docker run my-python-app --version
```

## image layer
* 每個dockerfile指令都會產生一層 image layer
* image layer 可以存在cache中供image共用
* todo 待查


## Docker Compose
* docker run 指令太多時可以寫在docker compsoe的設定檔
  * 並且可以一次啟動多個容器


## 容器網路
* Docker 中的網路模式（Bridge, Host, None, Overlay 等）
* 容器之間如何進行通信
* 暴露容器端口和端口映射

```sh
docker network ls
## 用來查詢內部docker ip
docker inspect
```
### Bridge Network
* Docker 預設的網路模式
* Docker 會自動將其連接到一個 bridge 網路。
  * Docker daemon 會建立一個 docker0網路界面
* 優點
  * 容器之間可以互相通信。
  * 提供網路隔離，保障安全。
  * 支援容器和外部網路的通信
* 特點
  * 內部通信：自動分配的內部ip只有docker之間可以使用
  * 端口映射：外部要訪問docker，必須使用端口映射（-p 選項）才能讓服務暴露在主機指定端口
* 應用場景
  * 適用於大多數容器之間需要互相通信的情況。
  * 需要隔離容器網路的情境。
### Host Network
* 容器將不會擁有獨立的網路命名空間，而是直接共享主機的網路命名空間。
* 優點
  * 性能最佳，因為避免了網路堆棧的開銷。
  * 容器可以直接使用主機的網路接口和 IP 地址。
* 應用場景
  * 需要高性能網路通信的應用。
  * 容器需要直接訪問主機網路資源的場景。
* 特點
  * 無需端口映射：容器直接使用主機的網路堆疊，沒有內部 IP 地址的隔離。容器內的服務直接暴露在主機的網絡上。
  * 無內部 IP 地址：容器與主機共享相同的 IP 地址。
  * 性能：由於沒有網路橋接的開銷，Host Network 可能具有更好的網路性能，但缺乏網路隔離性。
### None Network
* 容器將不會被連接到任何網路，這意味著容器不會有網路接口。
* 優點
  * 完全隔離容器，無法進行網路通信。
  * 增加安全性，適用於不需要網路通信的容器。
* 應用場景
  * 需要完全隔離的應用或進行測試。
  * 容器不需要網路功能的情境。
### Overlay Network
* 用於跨多主機實現容器通信的網路模式。依賴於 Docker Swarm 或其他容器編排工具。
* 優點
  * 支持跨多主機的容器通信。
  * 提供了高度的網路隔離和安全性。
  * 容易擴展，適合大型分佈式應用。
* 應用場景
  * 分佈式應用，如微服務架構。
  * 需要跨多主機進行通信的容器集群。

## Docker Volume
### 特點
* 持久化數據：
  * 容器的數據存儲在主機的文件系統中，即使容器被刪除，數據依然存在。
* 數據共享
  * 多個容器可以共享同一個 Volume，這使得它們能夠訪問相同的數據。
* 簡化備份和恢復
  * 由於 Volume 存儲在主機文件系統中，備份和恢復數據變得更簡單。
* 分離應用和數據
  * 將數據與容器的生命周期分離，使得應用更新或重啟時不影響數據。

## Bind Mount
* 直接將主機上的某個目錄掛載到容器內。
* 需要指定完整的主機目錄路徑。
* 可能更適合開發環境下的臨時使用

## 進階操作
* 多階段構建（Multi-stage builds）
* 紀錄和監控 Docker 容器

## ref
* [twtrubiks/docker-tutorial](https://github.com/twtrubiks/docker-tutorial)
* [Play with Docker](https://www.docker.com/play-with-docker/)
* [Jennifer的Docker筆記本](https://cutejaneii.gitbook.io/docker)
* [docker的故事和原理](https://joshhu.gitbooks.io/docker_theory_install/content/index.html)
* [Docker Roadmap](https://roadmap.sh/docker)