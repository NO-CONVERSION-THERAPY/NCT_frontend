(() => {
    const i18n = window.I18N;
    const recordSlug = String(window.MAP_RECORD_PAGE && window.MAP_RECORD_PAGE.recordSlug || '').trim();
    const {
        buildRecordDetailRouteUrl,
        buildRecordPaginationHtml,
        escapeHtml,
        findGroupedRecordLocationByRouteToken,
        formatMessage,
        getRecordConfirmationFields,
        getRecordRegionSummary
    } = window.MapRecordDetail;
    const {
        buildSchoolReportStats,
        getSchoolReportStats,
        groupSchoolRecords
    } = window.MapRecordStats;
    const backLink = document.getElementById('mapRecordBackLink');
    const eyebrow = document.getElementById('mapRecordEyebrow');
    const title = document.getElementById('mapRecordTitle');
    const meta = document.getElementById('mapRecordMeta');
    const counts = document.getElementById('mapRecordCounts');
    const status = document.getElementById('mapRecordStatus');
    const tableWrap = document.getElementById('mapRecordTableWrap');
    const tableBody = document.getElementById('mapRecordDetailTableBody');
    const paginationBottom = document.getElementById('mapRecordPaginationBottom');
    const currentSearchParams = new URLSearchParams(window.location.search);
    const returnTo = String(currentSearchParams.get('returnTo') || '').trim();
    let currentLocation = null;

    function getInputTypeDisplay(value) {
        if (!value) {
            return i18n.data.inputTypes.bulk;
        }

        if (value === '受害者本人') {
            return i18n.data.inputTypes.self;
        }

        if (value === '受害者的代理人') {
            return i18n.data.inputTypes.agent;
        }

        if (value === '批量数据') {
            return i18n.data.inputTypes.bulk;
        }

        return value;
    }

    function getProvinceDisplay(value) {
        return i18n.data.provinceNames[value] || value || '';
    }

    function buildBackToMapUrl() {
        const backUrl = new URL('/map', window.location.origin);
        const params = new URLSearchParams(window.location.search);

        params.delete('returnTo');
        backUrl.search = params.toString();

        if (returnTo) {
            backUrl.hash = `#${returnTo}`;
        }

        return `${backUrl.pathname}${backUrl.search}${backUrl.hash}`;
    }

    function buildRecordPageUrl(record) {
        return buildRecordDetailRouteUrl(record, {
            queryEntries: currentSearchParams,
            returnTo
        });
    }

    function setStatusMessage(message) {
        status.textContent = message;
        status.hidden = false;
    }

    function hideStatusMessage() {
        status.hidden = true;
    }

    function buildTableRowsHtml(record) {
        const fields = getRecordConfirmationFields(record, {
            i18n,
            getProvinceDisplay,
            getInputTypeDisplay
        });

        return fields.map((field) => `
            <tr>
                <td>${escapeHtml(field.label)}</td>
                <td>${escapeHtml(field.value)}</td>
            </tr>
        `).join('');
    }

    function renderCounts(stats) {
        counts.innerHTML = `
            <span class="map-record-summary__count">${escapeHtml(i18n.map.list.reportCounts.self)} ${Number(stats && stats.selfCount || 0)}</span>
            <span class="map-record-summary__count">${escapeHtml(i18n.map.list.reportCounts.agent)} ${Number(stats && stats.agentCount || 0)}</span>
        `;
        counts.hidden = false;
    }

    function renderPagination(container, location) {
        if (!container || !location || !location.group) {
            return;
        }

        const pages = Array.isArray(location.group.pages) ? location.group.pages : [];
        const previousRecord = location.pageIndex > 0 ? pages[location.pageIndex - 1] : null;
        const nextRecord = location.pageIndex < pages.length - 1 ? pages[location.pageIndex + 1] : null;

        container.innerHTML = buildRecordPaginationHtml(i18n, location.pageIndex, pages.length, {
            previousHref: previousRecord ? buildRecordPageUrl(previousRecord) : '',
            nextHref: nextRecord ? buildRecordPageUrl(nextRecord) : ''
        });
    }

    function renderNotFoundState() {
        eyebrow.textContent = i18n.map.record.eyebrow;
        title.textContent = i18n.map.record.notFoundTitle;
        meta.textContent = '';
        tableWrap.hidden = true;
        paginationBottom.innerHTML = '';
        counts.hidden = true;
        setStatusMessage(i18n.map.record.notFoundBody);
    }

    function renderRecordLocation(location, statsBySchool) {
        const schoolStats = getSchoolReportStats(statsBySchool, location.record);
        const paginationText = formatMessage(i18n.map.list.pagination.form, {
            current: location.pageIndex + 1,
            total: location.group.pages.length
        });
        const regionSummary = getRecordRegionSummary(location.record, getProvinceDisplay);

        currentLocation = location;
        eyebrow.textContent = i18n.map.record.eyebrow;
        title.textContent = location.group.summaryRecord.name || location.record.name || i18n.map.record.eyebrow;
        meta.textContent = [paginationText, regionSummary].filter(Boolean).join(' · ');
        renderCounts(schoolStats);
        tableBody.innerHTML = buildTableRowsHtml(location.record);
        tableWrap.hidden = false;
        hideStatusMessage();
        renderPagination(paginationBottom, location);

        if (location.record && location.record.name) {
            document.title = formatMessage(i18n.map.record.documentTitle, {
                school: location.record.name,
                site: i18n.common.siteName
            });
        }
    }

    async function loadRecordPage() {
        backLink.href = buildBackToMapUrl();

        if (!recordSlug) {
            renderNotFoundState();
            return;
        }

        try {
            const payload = await window.getSharedMapData();
            const groups = groupSchoolRecords(payload.data);
            const location = findGroupedRecordLocationByRouteToken(groups, recordSlug);

            if (!location) {
                renderNotFoundState();
                return;
            }

            renderRecordLocation(location, buildSchoolReportStats(payload.data));
        } catch (error) {
            console.error('加载地图详情失败:', error);
            eyebrow.textContent = i18n.map.record.eyebrow;
            title.textContent = i18n.map.record.loadFailedTitle;
            meta.textContent = '';
            tableWrap.hidden = true;
            paginationBottom.innerHTML = '';
            counts.hidden = true;
            setStatusMessage(i18n.map.record.loadFailedBody);
        }
    }

    window.addEventListener('keydown', (event) => {
        if (
            !currentLocation
            || event.defaultPrevented
            || event.metaKey
            || event.ctrlKey
            || event.altKey
            || event.shiftKey
        ) {
            return;
        }

        const activeTagName = document.activeElement && document.activeElement.tagName;
        if (activeTagName === 'INPUT' || activeTagName === 'TEXTAREA' || activeTagName === 'SELECT') {
            return;
        }

        const pages = currentLocation.group && Array.isArray(currentLocation.group.pages)
            ? currentLocation.group.pages
            : [];
        const previousRecord = currentLocation.pageIndex > 0 ? pages[currentLocation.pageIndex - 1] : null;
        const nextRecord = currentLocation.pageIndex < pages.length - 1 ? pages[currentLocation.pageIndex + 1] : null;

        if (event.key === 'ArrowUp' && previousRecord) {
            event.preventDefault();
            window.location.href = buildRecordPageUrl(previousRecord);
        }

        if (event.key === 'ArrowDown' && nextRecord) {
            event.preventDefault();
            window.location.href = buildRecordPageUrl(nextRecord);
        }
    });

    loadRecordPage();
})();
