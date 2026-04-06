(() => {
  const areaSelectorData = window.AREA_SELECTOR_DATA || { provinces: [] };
  const i18n = window.I18N;
  const provinceSelect = document.getElementById('provinceSelect');
  const citySelect = document.getElementById('citySelect');
  const countySelect = document.getElementById('countySelect');
  let cityRequestId = 0;
  let countyRequestId = 0;

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

  async function requestAreaOptions(queryKey, queryValue) {
    const requestUrl = new URL('/api/area-options', window.location.origin);
    requestUrl.searchParams.set(queryKey, queryValue);
    requestUrl.searchParams.set('lang', window.APP_LANG || '');

    const response = await window.fetch(requestUrl.toString(), {
      headers: {
        Accept: 'application/json'
      }
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error((payload && payload.error) || 'Failed to load area options');
    }

    return Array.isArray(payload.options) ? payload.options : [];
  }

  async function updateCityOptions(provinceCode) {
    const currentRequestId = ++cityRequestId;

    citySelect.disabled = true;
    renderOptions(citySelect, [], provinceCode ? i18n.common.loading : i18n.form.placeholders.city);
    await updateCountyOptions('');

    if (!provinceCode) {
      return;
    }

    try {
      const cityOptions = await requestAreaOptions('provinceCode', provinceCode);
      if (currentRequestId !== cityRequestId) {
        return;
      }

      citySelect.disabled = cityOptions.length === 0;
      renderOptions(
        citySelect,
        cityOptions,
        cityOptions.length === 0 ? i18n.form.placeholders.city : i18n.form.fields.city
      );
    } catch (_error) {
      if (currentRequestId !== cityRequestId) {
        return;
      }

      citySelect.disabled = true;
      renderOptions(citySelect, [], i18n.form.placeholders.city);
    }
  }

  async function updateCountyOptions(cityCode) {
    if (!countySelect) {
      return;
    }

    const currentRequestId = ++countyRequestId;

    if (!cityCode) {
      countySelect.disabled = true;
      renderOptions(countySelect, [], i18n.form.placeholders.countyInitial);
      return;
    }

    countySelect.disabled = true;
    renderOptions(countySelect, [], i18n.common.loading);

    try {
      const countyOptions = await requestAreaOptions('cityCode', cityCode);
      if (currentRequestId !== countyRequestId) {
        return;
      }

      countySelect.disabled = countyOptions.length === 0;
      renderOptions(
        countySelect,
        countyOptions,
        countyOptions.length === 0 ? i18n.form.placeholders.countyUnavailable : i18n.form.placeholders.county
      );
    } catch (_error) {
      if (currentRequestId !== countyRequestId) {
        return;
      }

      countySelect.disabled = true;
      renderOptions(countySelect, [], i18n.form.placeholders.countyInitial);
    }
  }

  if (provinceSelect && citySelect) {
    renderOptions(provinceSelect, areaSelectorData.provinces || [], i18n.form.placeholders.province);
    citySelect.disabled = true;
    if (countySelect) {
      countySelect.disabled = true;
      renderOptions(countySelect, [], i18n.form.placeholders.countyInitial);
    }

    provinceSelect.addEventListener('change', () => {
      updateCityOptions(provinceSelect.value);
    });

    citySelect.addEventListener('change', () => {
      updateCountyOptions(citySelect.value);
    });
  }
})();
