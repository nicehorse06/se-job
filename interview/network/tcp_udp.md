## TCP
* TODO
    * 握手的過程有點複雜 待繼續看
    * [一条视频讲清楚TCP协议与UDP协议-什么是三次握手与四次挥手?](https://www.youtube.com/watch?v=Iuvjwrm_O5g)
### 三向交握(Three-way handshake)
* Client ----SYN(x)----> Server
* Client <---SYN-ACK(y, x+1)--- Server
* Client ----ACK(y+1)----> Server

### TCP 的四向交握（Four-Way Handshake）
* Client ----FIN----> Server
* Client <----ACK---- Server
* Client <----FIN---- Server
* Client ----ACK----> Server

## UDP
* 基於非連結
* 性能損耗少
* 資源照用少
* 穩定性弱
* 適用場景
  * 域名查詢
  * 通話
  * 視訊
  * VPN
  * VXLAN

## TCP vs UDP
* TCP
  * 連接
* UDP
  * 非連接
  * 