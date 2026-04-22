(() => {
  // 省市县选项已经迁移到静态 JSON，由前端直接读取，不再走后端 area-options API。
  const i18n = window.I18N;
  const formI18n = window.FORM_UI_TEXT || i18n.form || { fields: {}, placeholders: {} };
  const provinceSelect = document.getElementById('provinceSelect');
  const citySelect = document.getElementById('citySelect');
  const countySelect = document.getElementById('countySelect');
  let cityRequestId = 0;
  let countyRequestId = 0;
  let areaSelectorPayload = null;
  let areaSelectorRequest = null;

  function renderOptions(select, options, placeholder) {
    select.innerHTML = '';

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    options.forEach((option) => {
      const element = document.createElement('option');
      element.value = option.code;
      element.textContent = option.name;
      select.appendChild(element);
    });
  }

  function getLocalizedProvinces(payload) {
    const provincesByLanguage = payload && payload.provincesByLanguage && typeof payload.provincesByLanguage === 'object'
      ? payload.provincesByLanguage
      : {};
    const language = window.APP_LANG || 'zh-CN';

    return Array.isArray(provincesByLanguage[language])
      ? provincesByLanguage[language]
      : (Array.isArray(provincesByLanguage['zh-CN']) ? provincesByLanguage['zh-CN'] : []);
  }

  async function loadAreaSelectorPayload() {
    if (areaSelectorPayload) {
      return areaSelectorPayload;
    }

    if (areaSelectorRequest) {
      return areaSelectorRequest;
    }

    areaSelectorRequest = window.fetch('/content/area-selector.json', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(async (response) => {
        const payload = await response.json();

        if (!response.ok) {
          throw new Error((payload && payload.error) || 'Failed to load area options');
        }

        areaSelectorPayload = payload;
        return payload;
      })
      .finally(() => {
        areaSelectorRequest = null;
      });

    return areaSelectorRequest;
  }

  async function updateCityOptions(provinceCode) {
    const currentRequestId = ++cityRequestId;

    citySelect.disabled = true;
    renderOptions(citySelect, [], provinceCode ? i18n.common.loading : formI18n.placeholders.city);
    await updateCountyOptions('');

    if (!provinceCode) {
      return;
    }

    try {
      const payload = await loadAreaSelectorPayload();
      const cityOptions = Array.isArray(payload && payload.citiesByProvinceCode && payload.citiesByProvinceCode[provinceCode])
        ? payload.citiesByProvinceCode[provinceCode]
        : [];
      // 用户快速切换省份时，只保留最后一次请求结果，避免旧响应覆盖新选择。
      if (currentRequestId !== cityRequestId) {
        return;
      }

      citySelect.disabled = cityOptions.length === 0;
      renderOptions(
        citySelect,
        cityOptions,
        cityOptions.length === 0 ? formI18n.placeholders.city : formI18n.fields.city
      );
    } catch (_error) {
      if (currentRequestId !== cityRequestId) {
        return;
      }

      citySelect.disabled = true;
      renderOptions(citySelect, [], formI18n.placeholders.city);
    }
  }

  async function updateCountyOptions(cityCode) {
    if (!countySelect) {
      return;
    }

    const currentRequestId = ++countyRequestId;

    if (!cityCode) {
      countySelect.disabled = true;
      renderOptions(countySelect, [], formI18n.placeholders.countyInitial);
      return;
    }

    countySelect.disabled = true;
    renderOptions(countySelect, [], i18n.common.loading);

    try {
      const payload = await loadAreaSelectorPayload();
      const countyOptions = Array.isArray(payload && payload.countiesByCityCode && payload.countiesByCityCode[cityCode])
        ? payload.countiesByCityCode[cityCode]
        : [];
      // 县区请求同样做“最后一次生效”，避免异步返回顺序打乱界面状态。
      if (currentRequestId !== countyRequestId) {
        return;
      }

      countySelect.disabled = countyOptions.length === 0;
      renderOptions(
        countySelect,
        countyOptions,
        countyOptions.length === 0 ? formI18n.placeholders.countyUnavailable : formI18n.placeholders.county
      );
    } catch (_error) {
      if (currentRequestId !== countyRequestId) {
        return;
      }

      countySelect.disabled = true;
      renderOptions(countySelect, [], formI18n.placeholders.countyInitial);
    }
  }

  if (provinceSelect && citySelect) {
    citySelect.disabled = true;
    if (countySelect) {
      countySelect.disabled = true;
      renderOptions(countySelect, [], formI18n.placeholders.countyInitial);
    }

    loadAreaSelectorPayload()
      .then((payload) => {
        renderOptions(provinceSelect, getLocalizedProvinces(payload), formI18n.placeholders.province);
      })
      .catch(() => {
        renderOptions(provinceSelect, [], formI18n.placeholders.province);
      });

    provinceSelect.addEventListener('change', () => {
      updateCityOptions(provinceSelect.value);
    });

    citySelect.addEventListener('change', () => {
      updateCountyOptions(citySelect.value);
    });
  }
})();
