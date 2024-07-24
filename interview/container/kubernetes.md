# Kubernetes (K8s)

## 基本概念
* Kubernetes 是什麼以及它的用途
* K8s 的架構（Master 和 Node 節點）
* 核心組件（如 API Server, etcd, Scheduler, Controller Manager, Kubelet, Kube-proxy）

## Kubernetes 資源
* Pod, ReplicaSet, Deployment, Service, ConfigMap, Secret
* 各種資源的用途和使用情境


## 部署和管理應用
* 使用 kubectl 命令進行基本操作
* 編寫和使用 YAML 文件部署資源
* 滾動更新和回滾部署

## 網路和服務發現
* Service 的類型（ClusterIP, NodePort, LoadBalancer, ExternalName）
* Ingress 和 Ingress Controller
* 網路插件（如 Flannel, Calico）

## 存儲
* Persistent Volumes (PV) 和 Persistent Volume Claims (PVC)
* Storage Class
* 動態供應存儲

## 安全性
* ServiceAccount, RBAC（角色基於訪問控制）
* Network Policies
* Secret 管理


## 進階主題
* Helm 和 Helm Charts
* Operator 模式
* 自動縮放（Horizontal Pod Autoscaler, Vertical Pod Autoscaler）
* 記錄和監控（如 Prometheus, Grafana）


## ref
* [Kubernetes k8s 十分钟快速入门](https://www.youtube.com/watch?v=ubz3cFgxeJA&t=449s)