//記錄當前頁數
let currentPage = 0;
//確保每次ajax玩才會再發一次
let isLoading = false;

// window.onload為如果HTML的資源全都載入後觸發
window.onload = () => {
  // 首次載入前20項，後續的畫面移動會再確認是否需要載入額外項目
  appendData();

  // 滑動時執行該函式
  window.onscroll = () => {
    // 頁面倒底前預先載入的距離
    const pre_load_height = 200;
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.offsetHeight,
      body.scrollHeight,
      html.clientHeight,
      html.offsetHeight,
      html.scrollHeight
    );
    // infinite scroll 為偵測 scrollTop + window height === document height 時觸發載入
    if (scrollTop + window.innerHeight >= height - pre_load_height) {
      // 做載入的動作
      if (!isLoading) {
        appendData();
      }
    }
  }
}

// 對twitch發出 ajax，且遊戲指定LOL
let sendHttpRequest = (callback) => {
  const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd';
  const game = 'League%20of%20Legends';
  let basetUrl = 'https://api.twitch.tv/kraken/streams/';
  let urlPara = {
    'game': game,
    'client_id': client_id,
    'offset': currentPage,
  }
  let targetUrl = url_maker(basetUrl, urlPara);

  let request = new XMLHttpRequest();
  isLoading = true;
  request.open("GET", targetUrl);
  // v5 API的用法要在HTTP Header上加上 Accept:application/vnd.twitchtv.v5+json
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    data = JSON.parse(request.responseText);
    callback(null, data);
  };
  request.send();
};

// 用來結合 HttpRequest 和 插入 HTML 內容的函式
let appendData = () => {
  sendHttpRequest((err, data) => {
    // data 中需要的key有preview、channel
    const { streams } = data;
    const row = document.querySelector('.row');
    // 抽取streams中的每一項為stream做處理
    for (let stream of streams) {
      //插入element string到row的最後一個子項，
      // beforeend是insertAdjacentHTML的特殊參數，表加在後面，insertAdjacentHTML第二個參數為要加入的項目
      row.insertAdjacentHTML('beforeend', getColumn(stream));
    }
    currentPage += 20;
    isLoading = false;
  });
}

// 準備用來增加HTML的載入動作
let getColumn = (stream) => {
  return `
    <div class='col'>
      <div class='preview'>
        <div class='placeholder'></div>
        <img src='${stream.preview.medium}' onload='this.style.opacity=1'/>
      </div>
      <div class='bottom'>
        <div class="avatar">
          <img class='avatar_img' src='${stream.channel.logo}' />
        </div>
        <div class='intro'>
          <div class='channel_name'>${stream.channel.display_name}</div>
          <div class='owner_name'>${stream.channel.name}</div>
        </div>
      </div>
    </div>  
    `
}

// 依據參數產生對應url，把para的每一個參數寫入到http get的後方，para為一個物件，key為要帶入http的參數，value為值
// 像是https://hostname?para1=value1&para2=value2
let url_maker = (url, para) => {
  let first_item = true;
  for (let key of Object.keys(para)) {
    let prefix = '&'
    if (first_item) {
      prefix = '?'
      first_item = false
    }
    url += `${prefix}${key}=${para[key]}`
  }
  return url
}