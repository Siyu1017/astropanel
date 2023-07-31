# AstroPanel

AstroPanel 是一個基於 [Next.js](https://nextjs.org/) 打造的Pterodactyl用戶面板

## 開始使用
### 編輯配置
首先，找到`config.js`(位於`@/data/functions/config`)\
需要編輯的有:

```javascript
const panel_info = {
    name: "AstroPanel",//你的面板的名稱
    discord: "https://discord.gg/hRueescnnN",//你的discord群組
    made_by: "Made By asteroid_owo",//不建議改
    made_by_link: "https://github.com/tooty-1135"//不建議改
}

const pterodactyl = {
    url: "https://ptero.example.com/",//pterodactyl的網址
    key: "ptla_.......gEuoHACtlJl2CLAPC"//pterodactyl的API Token
}

const discord = {
    'client_id': "10..........516",//discord app的id
    'client_secret': "moHp.........aTGfGmLB",//discord app的client_secret
    'redirect_uri': "https://panel.example.com/auth/callback"//登入後重新導到這邊`https://{你的網址}/auth/callback`
}

const nodes = [//要用的節點
    {id: 1, name: 'node1'},
    {id: 2, name: 'node2'},
]
```
接著，到 [這邊](https://astropanel.asteroid.tw/eggs) 把要用的egg拿去生成json，並儲存到`@/data/functions/config/eggs.json`\
提醒:這個專案我花了不少時間開發的，希望你可以把`Made By asteroid_owo`留著
### 啟動伺服器
首先，先安裝需要的套件:

```bash
npm i
```

接著，build專案

```bash
npm run build
```

完成後，開啟伺服器
```bash
npm run start
```

預設的位址是在 [http://localhost:3000](http://localhost:3000) 你可以打開瀏覽器查看\
如果需要更改port的話，到`package.json`找到這行
```
"start": "next start",
```
修改為
```
"start": "next start -p {你要的port}",
```

## 出現錯誤或不會裝?
可以到 [我的discord](https://discord.gg/hRueescnnN)

## 關於
這個專案我花了不少時間開發的，希望你可以把`Made By asteroid_owo`留著\
歡迎star這個專案\
本專案使用MIT License