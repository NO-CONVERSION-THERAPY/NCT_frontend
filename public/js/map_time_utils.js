(function attachMapTimeUtils(globalObject, factory) {
    const exports = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = exports;
    }

    globalObject.MapTimeUtils = exports;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
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
