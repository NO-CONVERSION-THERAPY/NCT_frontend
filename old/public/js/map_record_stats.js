(function attachMapRecordStats(globalObject, factory) {
    const exports = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = exports;
    }

    globalObject.MapRecordStats = exports;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
    // 地图列表页会把同一学校的多条记录聚合显示，但 marker 颜色仍要参考原始举报总量。
    const SELF_REPORT_INPUT_TYPE = '受害者本人';
    const AGENT_REPORT_INPUT_TYPE = '受害者的代理人';

    function normalizeSchoolStatsText(value) {
        return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function getSchoolStatsKey(record) {
        const normalizedName = normalizeSchoolStatsText(record && record.name);
        const normalizedProvince = normalizeSchoolStatsText(record && record.province);
        const normalizedAddress = normalizeSchoolStatsText(record && record.addr);

        if (normalizedName && normalizedProvince) {
            return `${normalizedName}::${normalizedProvince}`;
        }

        if (normalizedName) {
            return normalizedName;
        }

        if (normalizedProvince || normalizedAddress) {
            return `${normalizedProvince}::${normalizedAddress}`;
        }

        return '';
    }

    function buildSchoolReportStats(records) {
        const statsBySchool = new Map();

        (Array.isArray(records) ? records : []).forEach((record) => {
            const schoolKey = getSchoolStatsKey(record);
            if (!schoolKey) {
                return;
            }

            if (!statsBySchool.has(schoolKey)) {
                statsBySchool.set(schoolKey, {
                    selfCount: 0,
                    agentCount: 0
                });
            }

            const schoolStats = statsBySchool.get(schoolKey);

            if (record && record.inputType === SELF_REPORT_INPUT_TYPE) {
                schoolStats.selfCount += 1;
            } else if (record && record.inputType === AGENT_REPORT_INPUT_TYPE) {
                schoolStats.agentCount += 1;
            }
        });

        return statsBySchool;
    }

    function groupSchoolRecords(records) {
        const groupedRecords = [];
        const groupBySchoolKey = new Map();

        // 同一机构下每一份提交都保留为独立页面，保证地图详情可以逐份翻页查看。
        (Array.isArray(records) ? records : []).forEach((record, index) => {
            const schoolKey = getSchoolStatsKey(record) || `__unknown__:${index}`;
            let group = groupBySchoolKey.get(schoolKey);

            if (!group) {
                group = {
                    schoolKey,
                    summaryRecord: record,
                    pages: []
                };
                groupBySchoolKey.set(schoolKey, group);
                groupedRecords.push(group);
            }

            group.pages.push(record);
        });

        return groupedRecords.map((group) => ({
            schoolKey: group.schoolKey,
            summaryRecord: group.summaryRecord,
            pages: group.pages
        }));
    }

    function getSchoolReportStats(statsBySchool, record) {
        const schoolKey = getSchoolStatsKey(record);
        if (!schoolKey || !(statsBySchool instanceof Map) || !statsBySchool.has(schoolKey)) {
            return {
                selfCount: 0,
                agentCount: 0
            };
        }

        return statsBySchool.get(schoolKey);
    }

    return {
        buildSchoolReportStats,
        groupSchoolRecords,
        getSchoolReportStats,
        getSchoolStatsKey
    };
});
