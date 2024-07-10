# 將本地端高流量分散式系統搬到AWS的對應分析

## Load Balancer
- **AWS對應服務**：Elastic Load Balancer (ELB)
- **用途**：將流量均衡地分配到多個EC2實例上，確保系統的高可用性和可靠性。
- **建議**：根據需求選擇Application Load Balancer (ALB) 或 Network Load Balancer (NLB)。

## API Gateway

## DNS
- **AWS對應服務**：Route 53
- **用途**：管理域名解析，提供高可用性和可擴展的DNS服務。
- **建議**：配置Route 53來管理你的域名，並與ELB或其他服務結合使用以達到流量分配。

## Content Delivery Network (CDN)
- **AWS對應服務**：CloudFront
- **用途**：將內容分發到全球各地，提高用戶的訪問速度。
- **建議**：將靜態和動態內容分佈在CloudFront，以降低延遲和提高性能。

## Compute Instances
- **AWS對應服務**：EC2 (Elastic Compute Cloud)
- **用途**：提供可調整大小的計算能力，可以根據流量需求隨時擴展或縮減。
- **建議**：使用Auto Scaling來自動調整EC2實例的數量，確保在流量高峰期能夠應對負載。

## Database
- **AWS對應服務**：RDS (Relational Database Service)
- **用途**：管理和運行關聯數據庫，例如MySQL、PostgreSQL、MariaDB、Oracle和SQL Server。
- **建議**：根據應用需求選擇合適的RDS引擎，並配置多可用區部署以提高可用性。

## Queue
- **AWS對應服務**：SQS (Simple Queue Service)
- **用途**：消息隊列服務，用於解耦和擴展分散式系統中的不同組件。
- **建議**：使用SQS來處理任務隊列，確保系統各組件之間的高效通信和負載分擔。

## Storage
- **AWS對應服務**：S3 (Simple Storage Service)
- **用途**：存儲和檢索任意數量的數據，適用於備份、恢復、存檔和數據湖等用途。
- **建議**：將所有靜態資源和備份數據存儲在S3中，並配置適當的存儲類別以優化成本。

## Monitoring and Logging
- **AWS對應服務**：CloudWatch
- **用途**：監控和管理AWS資源和應用程序，收集和跟蹤度量，生成警報。
- **建議**：使用CloudWatch監控系統性能，設置警報和自動化操作來確保系統穩定運行。

## Security
- **AWS對應服務**：IAM (Identity and Access Management)、VPC (Virtual Private Cloud)、WAF (Web Application Firewall)
- **用途**：管理用戶訪問權限，保護網絡基礎設施和應用程序。
- **建議**：配置IAM來控制訪問權限，使用VPC隔離網絡環境，並部署WAF保護應用程序免受網絡攻擊。

這樣的架構可以確保你的高流量分散式系統在AWS上運行得更加高效、可靠和安全。根據具體需求，還可以使用其他AWS服務進一步優化系統，例如Elasticache進行分佈式緩存，或使用Lambda實現無服務器計算。


## ref
* [AWS 分散式雲端：全方位入門教程 | 架構、程式、應用](https://www.youtube.com/watch?v=_WCjqokBGbg)