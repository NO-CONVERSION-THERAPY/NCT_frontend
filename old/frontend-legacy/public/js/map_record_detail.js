(function attachMapRecordDetail(globalObject, factory) {
    const exports = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = exports;
    }

    globalObject.MapRecordDetail = exports;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatMessage(template, values) {
        return Object.entries(values || {}).reduce((result, [key, value]) => {
            return result.replaceAll(`{${key}}`, value);
        }, String(template || ''));
    }

    function formatFieldLabel(label) {
        const normalizedLabel = String(label || '').trim().replace(/[：:]\s*$/, '');
        return normalizedLabel ? `${normalizedLabel}：` : '';
    }

    function normalizeDetailText(value) {
        return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function readPath(source, path, fallback = '') {
        let cursor = source;

        for (const segment of path) {
            if (!cursor || typeof cursor !== 'object') {
                return fallback;
            }

            cursor = cursor[segment];
        }

        return cursor == null ? fallback : cursor;
    }

    function getRecordRegionParts(record) {
        const city = String(record && (record.city || record.prov) || '').trim();
        const county = String(record && record.county || '').trim();

        return {
            city,
            county
        };
    }

    function getRecordRegionSummary(record, getProvinceDisplay) {
        const province = typeof getProvinceDisplay === 'function'
            ? getProvinceDisplay(record && record.province)
            : String(record && record.province || '').trim();
        const regionParts = getRecordRegionParts(record);

        return [province, regionParts.city, regionParts.county].filter(Boolean).join(' / ');
    }

    function buildRecordFieldRowHtml(label, value, { preserveWhitespace = false } = {}) {
        const text = String(value || '').trim();
        if (!text) {
            return '';
        }

        return `
            <div class="map-record-field">
                <div class="map-record-field__label">${escapeHtml(formatFieldLabel(label))}</div>
                <div class="map-record-field__value${preserveWhitespace ? ' map-record-field__value--prewrap' : ''}">${escapeHtml(text)}</div>
            </div>
        `;
    }

    function buildDefaultLongTextField(fieldKey, label, sourceText) {
        const text = String(sourceText || '').trim();
        if (!text) {
            return '';
        }

        return `
            <div class="map-detail-block" data-detail-field="${escapeHtml(fieldKey)}">
                <strong>${escapeHtml(formatFieldLabel(label))}</strong>
                <span class="map-detail-block__value">${escapeHtml(text)}</span>
            </div>
        `;
    }

    function getRecordConfirmationFields(record, {
        i18n,
        getProvinceDisplay,
        getInputTypeDisplay
    } = {}) {
        const regionParts = getRecordRegionParts(record);
        const fields = [
            {
                key: 'identity',
                label: readPath(i18n, ['form', 'fields', 'identity'], 'Submission Role'),
                value: typeof getInputTypeDisplay === 'function' ? getInputTypeDisplay(record && record.inputType) : record && record.inputType
            },
            {
                key: 'dateStart',
                label: readPath(i18n, ['form', 'fields', 'dateStart'], 'First Date Sent There'),
                value: record && record.dateStart
            },
            {
                key: 'dateEnd',
                label: readPath(i18n, ['form', 'fields', 'dateEnd'], 'Departure Date'),
                value: record && record.dateEnd
            },
            {
                key: 'experience',
                label: readPath(i18n, ['form', 'fields', 'experience'], 'Personal Institutional Experience Description'),
                value: record && record.experience
            },
            {
                key: 'schoolName',
                label: readPath(i18n, ['form', 'fields', 'schoolName'], 'Institution Name'),
                value: record && record.name
            },
            {
                key: 'province',
                label: readPath(i18n, ['form', 'fields', 'province'], 'Province'),
                value: typeof getProvinceDisplay === 'function' ? getProvinceDisplay(record && record.province) : record && record.province
            },
            {
                key: 'city',
                label: readPath(i18n, ['form', 'fields', 'city'], 'City / District'),
                value: regionParts.city
            },
            {
                key: 'county',
                label: readPath(i18n, ['form', 'fields', 'county'], 'County / District'),
                value: regionParts.county
            },
            {
                key: 'schoolAddress',
                label: readPath(i18n, ['form', 'fields', 'schoolAddress'], 'Institution Address'),
                value: record && record.addr
            },
            {
                key: 'contactInformation',
                label: readPath(i18n, ['form', 'fields', 'contactInformation'], 'Institution Contact Information'),
                value: record && record.contact
            },
            {
                key: 'headmasterName',
                label: readPath(i18n, ['form', 'fields', 'headmasterName'], 'Principal / Person in Charge'),
                value: record && record.HMaster
            },
            {
                key: 'scandal',
                label: readPath(i18n, ['form', 'fields', 'scandal'], 'Detailed Description of Scandals and Violent Behavior'),
                value: record && record.scandal
            },
            {
                key: 'other',
                label: readPath(i18n, ['form', 'fields', 'other'], 'Other Notes'),
                value: record && record.else
            }
        ];

        return fields
            .map((field) => ({
                ...field,
                value: String(field.value || '').trim()
            }))
            .filter((field) => field.value);
    }

    function buildRecordPaginationHtml(i18n, currentPage, totalPages, {
        detailActionLabel = '',
        detailActionHref = '',
        previousHref = '',
        nextHref = ''
    } = {}) {
        const normalizedTotalPages = Math.max(1, Number(totalPages) || 0);
        const normalizedCurrentPage = Math.min(
            Math.max(0, Number(currentPage) || 0),
            normalizedTotalPages - 1
        );

        const paginationTemplate = readPath(i18n, ['map', 'list', 'pagination', 'form'])
            || readPath(i18n, ['map', 'list', 'pagination', 'page']);
        const previousLabel = readPath(i18n, ['map', 'list', 'pagination', 'previous'], 'Previous');
        const nextLabel = readPath(i18n, ['map', 'list', 'pagination', 'next'], 'Next');

        function buildPaginationControlHtml(label, action, href, disabled) {
            if (!disabled && String(href || '').trim()) {
                return `
                    <a
                        href="${escapeHtml(href)}"
                        class="map-record-pagination__button"
                        data-page-action="${escapeHtml(action)}"
                    >${escapeHtml(label)}</a>
                `;
            }

            return `
                <button
                    type="button"
                    class="map-record-pagination__button"
                    data-page-action="${escapeHtml(action)}"
                    ${disabled ? 'disabled' : ''}
                >${escapeHtml(label)}</button>
            `;
        }

        const detailActionHtml = String(detailActionLabel || '').trim()
            ? (
                String(detailActionHref || '').trim()
                    ? `<a href="${escapeHtml(detailActionHref)}" class="map-record-pagination__detail-button" data-record-detail-link="true">${escapeHtml(detailActionLabel)}</a>`
                    : `<button type="button" class="map-record-pagination__detail-button" data-record-detail-action="true">${escapeHtml(detailActionLabel)}</button>`
            )
            : '';

        return `
            <div class="map-record-pagination">
                <div class="map-record-pagination__side">
                    ${buildPaginationControlHtml(previousLabel, 'prev', previousHref, normalizedCurrentPage === 0)}
                </div>
                <div class="map-record-pagination__center">
                    ${detailActionHtml}
                    <span class="map-record-pagination__status">${escapeHtml(formatMessage(paginationTemplate, {
                        current: normalizedCurrentPage + 1,
                        total: normalizedTotalPages
                    }))}</span>
                </div>
                <div class="map-record-pagination__side map-record-pagination__side--end">
                    ${buildPaginationControlHtml(nextLabel, 'next', nextHref, normalizedCurrentPage >= normalizedTotalPages - 1)}
                </div>
            </div>
        `;
    }

    function buildRecordDetailHtml(record, {
        i18n,
        getProvinceDisplay,
        getInputTypeDisplay,
        omitFieldKeys = [],
        renderLongTextField = buildDefaultLongTextField
    } = {}) {
        const omittedFieldKeys = new Set(Array.isArray(omitFieldKeys) ? omitFieldKeys : []);
        const regionParts = getRecordRegionParts(record);
        const provinceLabel = readPath(i18n, ['form', 'fields', 'province'], 'Province');
        const cityLabel = readPath(i18n, ['form', 'fields', 'city'], 'City / District');
        const countyLabel = readPath(i18n, ['form', 'fields', 'county'], 'County / District');
        const detailFields = [
            {
                key: 'identity',
                label: readPath(i18n, ['form', 'fields', 'identity'], 'Submission Role'),
                value: typeof getInputTypeDisplay === 'function' ? getInputTypeDisplay(record && record.inputType) : record && record.inputType
            },
            {
                key: 'schoolName',
                label: readPath(i18n, ['form', 'fields', 'schoolName'], 'Institution Name'),
                value: record && record.name
            },
            {
                key: 'province',
                label: provinceLabel,
                value: typeof getProvinceDisplay === 'function' ? getProvinceDisplay(record && record.province) : record && record.province
            },
            {
                key: 'city',
                label: cityLabel,
                value: regionParts.city
            },
            {
                key: 'county',
                label: countyLabel,
                value: regionParts.county
            },
            {
                key: 'dateStart',
                label: readPath(i18n, ['form', 'fields', 'dateStart'], 'First Date Sent There'),
                value: record && record.dateStart
            },
            {
                key: 'dateEnd',
                label: readPath(i18n, ['form', 'fields', 'dateEnd'], 'Departure Date'),
                value: record && record.dateEnd
            },
            {
                key: 'schoolAddress',
                label: readPath(i18n, ['form', 'fields', 'schoolAddress'], 'Institution Address'),
                value: record && record.addr,
                preserveWhitespace: true
            },
            {
                key: 'contactInformation',
                label: readPath(i18n, ['form', 'fields', 'contactInformation'], 'Institution Contact Information'),
                value: record && record.contact,
                preserveWhitespace: true
            },
            {
                key: 'headmasterName',
                label: readPath(i18n, ['form', 'fields', 'headmasterName'], 'Principal / Person in Charge'),
                value: record && record.HMaster
            }
        ];
        const longTextFields = [
            {
                key: 'experience',
                label: readPath(i18n, ['form', 'fields', 'experience'], 'Personal Institutional Experience Description'),
                value: record && record.experience
            },
            {
                key: 'scandal',
                label: readPath(i18n, ['form', 'fields', 'scandal'], 'Detailed Description of Scandals and Violent Behavior'),
                value: record && record.scandal
            },
            {
                key: 'other',
                label: readPath(i18n, ['form', 'fields', 'other'], 'Other Notes'),
                value: record && record.else
            }
        ];

        const detailRowsHtml = detailFields
            .filter((field) => !omittedFieldKeys.has(field.key))
            .map((field) => buildRecordFieldRowHtml(field.label, field.value, {
                preserveWhitespace: field.preserveWhitespace === true
            }))
            .filter(Boolean)
            .join('');
        const longTextHtml = longTextFields
            .filter((field) => !omittedFieldKeys.has(field.key))
            .map((field) => renderLongTextField(field.key, field.label, field.value))
            .filter(Boolean)
            .join('');

        return `
            ${detailRowsHtml ? `<div class="map-record-fields">${detailRowsHtml}</div>` : ''}
            ${longTextHtml}
        `;
    }

    function getRecordDetailPageKey(record) {
        const regionParts = getRecordRegionParts(record);

        return [
            record && record.inputType,
            record && record.name,
            record && record.province,
            regionParts.city,
            regionParts.county,
            record && record.dateStart,
            record && record.dateEnd,
            record && record.addr,
            record && record.HMaster,
            record && record.contact,
            record && record.experience,
            record && record.scandal,
            record && record.else
        ]
            .map((value) => normalizeDetailText(value))
            .join('::');
    }

    function hashRecordDetailKey(detailKey) {
        let primaryHash = 5381;
        let secondaryHash = 52711;
        const normalizedDetailKey = String(detailKey || '');

        for (const character of normalizedDetailKey) {
            const codePoint = character.codePointAt(0) || 0;

            primaryHash = ((primaryHash << 5) + primaryHash) ^ codePoint;
            secondaryHash = ((secondaryHash << 5) + secondaryHash) ^ (codePoint * 97);
        }

        return `${(primaryHash >>> 0).toString(16).padStart(8, '0')}${(secondaryHash >>> 0).toString(16).padStart(8, '0')}`;
    }

    function getRecordDetailRouteToken(record) {
        return hashRecordDetailKey(getRecordDetailPageKey(record));
    }

    function buildRecordDetailRouteUrl(record, {
        basePath = '/map/record',
        queryEntries,
        returnTo = ''
    } = {}) {
        const normalizedBasePath = String(basePath || '/map/record').replace(/\/+$/, '') || '/map/record';
        const searchParams = new URLSearchParams();
        const normalizedReturnTo = String(returnTo || '').trim();
        const routeToken = getRecordDetailRouteToken(record);

        if (queryEntries && typeof queryEntries.forEach === 'function') {
            queryEntries.forEach((value, key) => {
                if (value != null && `${value}` !== '') {
                    searchParams.set(key, value);
                }
            });
        } else if (queryEntries && typeof queryEntries === 'object') {
            Object.entries(queryEntries).forEach(([key, value]) => {
                if (value != null && `${value}` !== '') {
                    searchParams.set(key, value);
                }
            });
        }

        if (normalizedReturnTo) {
            searchParams.set('returnTo', normalizedReturnTo);
        }

        const queryString = searchParams.toString();

        return `${normalizedBasePath}/${encodeURIComponent(routeToken)}${queryString ? `?${queryString}` : ''}`;
    }

    function findGroupedRecordLocationByRouteToken(groups, routeToken) {
        const normalizedRouteToken = String(routeToken || '').trim();

        if (!normalizedRouteToken || !Array.isArray(groups)) {
            return null;
        }

        for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
            const group = groups[groupIndex];
            const pages = Array.isArray(group && group.pages) ? group.pages : [];

            for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
                const record = pages[pageIndex];

                if (getRecordDetailRouteToken(record) === normalizedRouteToken) {
                    return {
                        group,
                        groupIndex,
                        pageIndex,
                        record
                    };
                }
            }
        }

        return null;
    }

    return {
        getRecordConfirmationFields,
        buildRecordDetailHtml,
        buildRecordPaginationHtml,
        buildRecordDetailRouteUrl,
        escapeHtml,
        findGroupedRecordLocationByRouteToken,
        formatFieldLabel,
        formatMessage,
        getRecordDetailPageKey,
        getRecordDetailRouteToken,
        getRecordRegionParts,
        getRecordRegionSummary
    };
});
