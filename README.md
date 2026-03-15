# NO TORSION

[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)]()

**我們致力於記錄、曝光並抵制所有形式的「扭轉治療」機構。** 每一份真實的聲音，都是終結傷害的力量。你的簽名與參與，將幫助更多人避開深淵。

---

## 聯署簽名 (Public Signatures)

我們誠邀所有支持「取代扭轉治療」的夥伴在此留下你的聲音。你可以選擇使用網路ID、筆名甚至真名。

### 如何參與簽名？
1. 點擊本倉庫右上角的 `Fork`。
2. 編輯 `README.md` 文件，在下方 **「簽名列表」** 末尾添加你的信息。
3. 提交 `Pull Request`。

### 簽名列表

您可以在下面添加你的簽名。

[HosinoNeko](https://github.com/HosinoEJ)

---

## 我爲什麼要這麼做？

1. **信息對稱**：打破非法人格糾正機構的信息壟斷。
2. **證據固定**：為受害者提供一個經歷記錄平台。
3. **地圖瀏覽**：讓所有人看到那些溝槽的物件在國内的覆蓋程度
4. **法律推動**：wc這個好像有點難，但是我們在做了！！！！

## 表單收集

如果你曾是受害者或知情者，請通過我們的網站匿名提交詳細信息。我們會根據您的表單匯總出一個地圖：
 **[填寫表單](https://notorsion.hosinoneko.me)**

原表單LINK:[Google From](https://forms.gle/eHwkmNCZtmZhLjzh7)

*我承諾我不會以任何理由收集您的個人資訊*

---

## 開發與貢獻

若出現國家級的域名封鎖，各位可以自行部署。

本專案基於 **Node.js + Express + EJS** 構建，並部署於 Vercel。

### 環境要求
- Node.js 18.x 

### 快速開始

Build command
```bash
npm install
```

環境變數：
```bash
TITLE="NO TORSION"
```

*一般就填 NO TORSION就可以了，除非...你幹嘛（*

若想在本地開發
```bash
git clone https://github.com/HosinoEJ/No-Torsion.git
cd No-Torsion
npm install
```
最後就可以啓動了：
```bash
npm start
```
警告：在本地運行時，發送表單功能可能會受到GFW的影響。

### API部署：

如果你想在你的網站顯示網站地圖，或者用來分析數據，可以使用我們的api，這在一定程度上可以促進去中心化。

api：
```
https://no-torsion.vercel.app/api/map-data
```

api會回傳一個get類型的JSON，以下是案例：

```JSON
[
  {
    "name": "學校名稱",
    "addr": "學校地址",
    "province": "省份",
    "prov": "區、縣",
    "else": "其他補充内容",
    "lat": 36.62728,
    "lng": 118.58882,
    "experience": "經歷描述",
    "HMaster": "負責人/校長姓名",
    "scandal": "已知醜聞",
    "contact": "學校聯繫方式"
  }
]
```

其中，lat和lng是經緯度。

### API案例：機構地圖

本網站其實已經是一個案例了：https://notorsion.hosinoneko.me/map

當然我也鼓勵大家去自己製作：

我們在這裏使用的是[LEAFLETJS](https://leafletjs.com)這個項目實現的在綫地圖查看，html程式碼在此處：

```HTML
<!DOCTYPE html>
<html>
<head>
    <title>机构综合地图</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        #map { height: 80vh; width: 100%; border-radius: 8px; }
        .custom-popup b { color: #e63946; }
    </style>
</head>
<body>
    <h1>机构综合地图</h1>
    <div id="map"></div>
    <p><a href="/">返回首页</a></p>
    <details close>
        <summary style="color: blue;">想要调用API？</summary>
        我们明确表示：我们永远不会泄露受访者的任何敏感性资料。<br>
        在调用api之前，我们要明白：HosinoNeko站长只允许自己正在使用的资料，这些资料全部会在map上显示。<br>
        <hr>
        我们如何实现的？<br>
        首先你的表单会透过vercel上传到google forms，在那里会生成一个excel表格，站长在其表格的AppScript部署了应用程式，会将地址一栏转化为经纬度并保存在表格中。然后会生成一个JSON在google为其创建的api中，值得注意的是这个api因为包含着所有资讯，所以我会对其保密。本站会将其中需要的讯息传送到本站，并再次生成一个api。而这个api是允许你们存取的。<br>
        <hr>
        我们的看法：<br>
        我们可太希望你们可以使用我的api并接入到你们的网站上了！因为如果中国国安局封禁了我的网站，你们还可以透过api继续在国内网路中传播。换言之这是一种去中心化。<br>
        知道了这些，你就可以使用我们的api了！快去放在你们的网站上吧！<br>
        <a href="https://no-torsion.vercel.app/api/map-data">https://no-torsion.vercel.app/api/map-data</a>
    </details>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        const map = L.map('map').setView([36.06, 120.38], 6); // 預設視角

        // 選用簡潔的底圖風格
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

        const apiLabels = 'https://no-torsion.vercel.app/api/map-data';

        fetch(apiLabels)
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    const marker = L.marker([item.lat, item.lng]).addTo(map);

                    // 1. 鼠標指到圖標：顯示標題 (Tooltip)
                    marker.bindTooltip(`<strong>${item.name}</strong>`, { 
                        sticky: true, 
                        direction: 'top' 
                    });

                    // 2. 點擊：顯示所有詳細資訊 (Popup)
                    const popupContent = `
                        <div class="custom-popup">
                            <b>${item.name}</b><br>
                            <small>${item.prov}</small>
                            <p>${item.HMaster}</p><hr>
                            <p>${item.experience}</p>
                            <p>${item.scandal}</p>
                            <p>${item.else}</p>
                            <address>${item.addr}</address>
                        </div>
                    `;
                    marker.bindPopup(popupContent);
                });
            });
    </script>
</body>
</html>
```

就這樣沒啦！你完全不需要搞什麽複雜的伺服器編寫，只需要你寫一個html頁面，上傳到github pages就可以了！