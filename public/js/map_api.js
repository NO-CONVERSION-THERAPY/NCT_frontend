const map = L.map('map').setView([36.06, 120.38], 6); // 預設視角

// 選用簡潔的底圖風格
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

const apiUrl = 'https://no-torsion.vercel.app/api/map-data'
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {

        const totalCount = data.length; // 第一類：總提交數
        const provinceMap = {};

        data.forEach(item => {
            // 第二類：統計各省數量
            const prov = item.province || "NaN";
            provinceMap[prov] = (provinceMap[prov] || 0) + 1;
        });

        // 更新 UI
        document.getElementById('total-count').innerText = totalCount;

        // 將省份物件轉為易讀文字，例如 "山東 (2), 廣東 (1)"
        const distText = Object.entries(provinceMap)
            .map(([name, count]) => `${name} (${count})`)
            .join(', ');
        document.getElementById('province-dist').innerText = distText;


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