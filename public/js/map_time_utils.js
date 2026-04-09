(function attachMapTimeUtils(globalObject, factory) {
    const exports = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = exports;
    }

    globalObject.MapTimeUtils = exports;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
    // 地图页多个位置都要用到“最后同步多久前”，单独抽成纯函数方便测试和复用。
    function formatMessage(template, values) {
        return Object.entries(values).reduce((result, [key, value]) => {
            return result.replaceAll(`{${key}}`, value);
        }, String(template || ''));
    }

    function isValidTimestamp(value) {
        return Number.isFinite(value) && value > 0;
    }

    function getElapsedSeconds(lastSyncedTime, currentTimestamp = Date.now()) {
        if (!isValidTimestamp(lastSyncedTime)) {
            return null;
        }

        return Math.max(0, Math.floor((currentTimestamp - lastSyncedTime) / 1000));
    }

    function renderLastSyncedValue(lastSyncedElement, {
        elapsedSeconds,
        refreshInProgress,
        onRefresh,
        i18n,
        refreshIntervalSeconds = 300,
        documentRef = typeof document === 'undefined' ? null : document
    }) {
        if (!lastSyncedElement || !documentRef) {
            return;
        }

        lastSyncedElement.replaceChildren();

        const valueElement = documentRef.createElement('b');
        valueElement.textContent = elapsedSeconds === null
            ? i18n.common.loading
            : formatMessage(i18n.map.stats.secondsAgo, { seconds: elapsedSeconds });
        lastSyncedElement.appendChild(valueElement);

        if (elapsedSeconds === null || elapsedSeconds <= refreshIntervalSeconds) {
            return;
        }

        // 超过正常刷新周期后再展示按钮，避免用户一看到页面就误以为必须手动刷新。
        lastSyncedElement.appendChild(documentRef.createTextNode(', '));

        const refreshButton = documentRef.createElement('button');
        refreshButton.type = 'button';
        refreshButton.className = 'map-refresh-button';
        refreshButton.textContent = refreshInProgress ? i18n.common.loading : i18n.map.stats.refresh;
        refreshButton.disabled = refreshInProgress;
        refreshButton.addEventListener('click', onRefresh);
        lastSyncedElement.appendChild(refreshButton);
    }

    return {
        getElapsedSeconds,
        isValidTimestamp,
        renderLastSyncedValue
    };
});
