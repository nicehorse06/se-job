// 更換狗圖記數器
let dog_img_counter = 0;

// 建立函式存到一變數中，帶有一參數，此參數有預設值，使用方法為 http_dog(目標網址)
var http_dog = function (targetUrl = 'https://dog.ceo/api/breeds/image/random') {
    //建立 XMLHttpRequest 實例才能發送http請求
    var ourRequest = new XMLHttpRequest();

    // 設定http方法和目標網址，設定好open()即可發送http請求一次，需要用send()才會正式發出請求
    ourRequest.open('GET', targetUrl)

    // 一但發出http請求後執行該函式，並得到回傳值responseText
    ourRequest.onload = () => {
        // 回傳的json為字串，需用JSON.parse轉換成可讀物件
        let ourData = JSON.parse(ourRequest.responseText);
        // 測試用列印資料
        // onsole.log('ourData的資料為:', ourData)
        // 抓HTML上的img tag的src替換為別張圖
        document.querySelector('img').src = ourData.message

        dog_img_counter = dog_img_counter + 1
        document.querySelector('div.counter').textContent = '目前更換狗狗圖片第' + dog_img_counter + '次'
    }
    // 使用send()才會發出http請求
    ourRequest.send()
}

// 檔案載入後，第一次執行
http_dog()

// setInterval為循環執行函式，第一個參數為想執行的函式，第二個參數為毫秒，目前是五秒做一次
setInterval(http_dog, 5000)