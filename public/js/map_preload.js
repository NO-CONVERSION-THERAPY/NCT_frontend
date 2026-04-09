(() => {
    // 首页静默预加载只做“加速下一跳”，不应抢占用户当前首屏的主线程与带宽。
    function schedulePreload(callback) {
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(callback, { timeout: 2000 });
            return;
        }

        window.setTimeout(callback, 300);
    }

    function shouldSkipPreload() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return Boolean(connection && connection.saveData);
    }

    if (typeof window.getSharedMapData !== 'function' || shouldSkipPreload()) {
        return;
    }

    const startPreload = () => {
        window.getSharedMapData().catch((error) => {
            console.debug('首页静默预加载地图数据失败:', error);
        });
    };

    if (document.readyState === 'complete') {
        schedulePreload(startPreload);
        return;
    }

    window.addEventListener('load', () => {
        schedulePreload(startPreload);
    }, { once: true });
})();
