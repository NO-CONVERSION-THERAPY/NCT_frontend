(() => {
    const i18n = window.I18N;
    const formRules = window.FORM_RULES;
    const AGENT_IDENTITY = '受害者的代理人';
    const OTHER_SEX_OPTION = '__other_option__';
    const CUSTOM_OTHER_SEX_OPTION = '__custom_other_sex__';
    const CUSTOM_AGENT_RELATIONSHIP_OPTION = '__custom_agent_relationship__';
    const CUSTOM_PARENT_MOTIVATION_OPTION = '__custom_parent_motivation__';
    const CUSTOM_VIOLENCE_CATEGORY_OPTION = '__custom_violence_category__';
    const CUSTOM_EXIT_METHOD_OPTION = '__custom_exit_method__';
    const CUSTOM_LEGAL_AID_OPTION = '__custom_legal_aid__';
    const mainForm = document.getElementById('mainForm');

    if (!mainForm || !i18n || !formRules) {
        return;
    }

    const identitySelect = document.getElementById('identitySelect');
    const birthFieldLabel = document.getElementById('birthFieldLabel');
    const birthYearSelect = document.getElementById('birthYearSelect');
    const experienceSectionHeading = document.getElementById('experienceSectionHeading');
    const sexLabel = document.getElementById('sexLabel');
    const sexSelect = document.getElementById('sexSelect');
    const otherSexFields = document.getElementById('otherSexFields');
    const otherSexTypeInputs = Array.from(document.querySelectorAll('input[name="sex_other_type"]'));
    const otherSexTypeValidityTarget = otherSexTypeInputs[0] || null;
    const otherSexInput = document.getElementById('otherSexInput');
    const provinceSelect = document.getElementById('provinceSelect');
    const citySelect = document.getElementById('citySelect');
    const countySelect = document.getElementById('countySelect');
    const preInstitutionProvinceSelect = document.getElementById('preInstitutionProvinceSelect');
    const preInstitutionCitySelect = document.getElementById('preInstitutionCitySelect');
    const schoolNameInput = document.getElementById('school_input');
    const dateStartInput = document.getElementById('date_start');
    const dateEndInput = document.getElementById('date_end');
    const contactInformationInput = document.getElementById('contactInformationInput');
    const submitButton = mainForm.querySelector('button[type="submit"]');
    const agentRelationshipGroup = document.getElementById('agentRelationshipGroup');
    const agentRelationshipSelect = document.getElementById('agentRelationshipSelect');
    const agentRelationshipOtherWrap = document.getElementById('agentRelationshipOtherWrap');
    const agentRelationshipOtherInput = document.getElementById('agentRelationshipOtherInput');
    const parentMotivationInputs = Array.from(document.querySelectorAll('input[name="parent_motivations"]'));
    const parentMotivationValidityTarget = parentMotivationInputs[0] || null;
    const parentMotivationOtherWrap = document.getElementById('parentMotivationOtherWrap');
    const parentMotivationOtherInput = document.getElementById('parentMotivationOtherInput');
    const exitMethodGroup = document.getElementById('exitMethodGroup');
    const exitMethodSelect = document.getElementById('exitMethodSelect');
    const exitMethodOtherWrap = document.getElementById('exitMethodOtherWrap');
    const exitMethodOtherInput = document.getElementById('exitMethodOtherInput');
    const legalAidSelect = document.getElementById('legalAidSelect');
    const legalAidOtherWrap = document.getElementById('legalAidOtherWrap');
    const legalAidOtherInput = document.getElementById('legalAidOtherInput');
    const violenceCategoryInputs = Array.from(document.querySelectorAll('input[name="violence_categories"]'));
    const violenceCategoryOtherWrap = document.getElementById('violenceCategoryOtherWrap');
    const violenceCategoryOtherInput = document.getElementById('violenceCategoryOtherInput');
    let preInstitutionCityRequestId = 0;
    let areaSelectorPayload = null;
    let areaSelectorRequest = null;

    function clearValidity(input) {
        if (input) {
            input.setCustomValidity('');
        }
    }

    function clearValidityList(inputs) {
        inputs.forEach((input) => clearValidity(input));
    }

    function formatMessage(template, variables = {}) {
        return String(template || '').replace(/\{(\w+)\}/g, (_, key) => (
            Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : `{${key}}`
        ));
    }

    function renderOptions(select, options, placeholder) {
        if (!select) {
            return;
        }

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
            headers: { Accept: 'application/json' }
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

    async function updatePreInstitutionCityOptions(provinceCode) {
        if (!preInstitutionCitySelect) {
            return;
        }

        const currentRequestId = ++preInstitutionCityRequestId;
        preInstitutionCitySelect.disabled = true;
        renderOptions(
            preInstitutionCitySelect,
            [],
            provinceCode ? i18n.common.loading : i18n.form.placeholders.preInstitutionCityCode
        );

        if (!provinceCode) {
            return;
        }

        try {
            const payload = await loadAreaSelectorPayload();
            const cityOptions = Array.isArray(payload && payload.citiesByProvinceCode && payload.citiesByProvinceCode[provinceCode])
                ? payload.citiesByProvinceCode[provinceCode]
                : [];
            if (currentRequestId !== preInstitutionCityRequestId) {
                return;
            }

            preInstitutionCitySelect.disabled = cityOptions.length === 0;
            renderOptions(
                preInstitutionCitySelect,
                cityOptions,
                cityOptions.length === 0
                    ? i18n.form.placeholders.preInstitutionCityCode
                    : i18n.form.fields.preInstitutionCityCode
            );
        } catch (_error) {
            if (currentRequestId !== preInstitutionCityRequestId) {
                return;
            }

            preInstitutionCitySelect.disabled = true;
            renderOptions(preInstitutionCitySelect, [], i18n.form.placeholders.preInstitutionCityCode);
        }
    }

    function isAgentMode() {
        return identitySelect.value === AGENT_IDENTITY;
    }

    function clearOtherSexTypeValidity() {
        clearValidityList(otherSexTypeInputs);
    }

    function getSelectedOtherSexType() {
        const selectedInput = otherSexTypeInputs.find((input) => input.checked);
        return selectedInput ? selectedInput.value : '';
    }

    function getCheckedValues(inputs) {
        return inputs.filter((input) => input.checked).map((input) => input.value);
    }

    function syncSelectOtherInputState({
        select,
        customValue,
        inputWrap,
        input
    }) {
        if (!select || !inputWrap || !input) {
            return;
        }

        const shouldShow = !select.disabled && select.value === customValue;
        inputWrap.hidden = !shouldShow;
        input.disabled = !shouldShow;

        if (!shouldShow) {
            input.value = '';
            clearValidity(input);
        }
    }

    function syncCheckboxOtherInputState({
        inputs,
        customValue,
        inputWrap,
        input
    }) {
        if (!inputWrap || !input) {
            return;
        }

        const shouldShow = inputs.some((checkbox) => checkbox.checked && checkbox.value === customValue);
        inputWrap.hidden = !shouldShow;
        input.disabled = !shouldShow;

        if (!shouldShow) {
            input.value = '';
            clearValidity(input);
        }
    }

    function syncOtherSexInputState() {
        const shouldEnableInput = sexSelect.value === OTHER_SEX_OPTION
            && getSelectedOtherSexType() === CUSTOM_OTHER_SEX_OPTION;

        otherSexInput.disabled = !shouldEnableInput;

        if (!shouldEnableInput) {
            otherSexInput.value = '';
            clearValidity(otherSexInput);
        }
    }

    function getBirthFieldLabelText() {
        return isAgentMode() ? i18n.form.fields.victimBirthYear : i18n.form.fields.birthYear;
    }

    function getSexLabelText() {
        return isAgentMode() ? i18n.form.fields.victimSex : i18n.form.fields.sex;
    }

    function getBirthRequiredMessage() {
        return isAgentMode() ? i18n.form.validation.fillVictimBirthYear : i18n.form.validation.fillBirthDate;
    }

    function getSexRequiredMessage() {
        return isAgentMode() ? i18n.form.validation.selectVictimSex : i18n.form.validation.selectSex;
    }

    function bindRequiredMessage(input, messageOrFactory) {
        if (!input) {
            return;
        }

        input.addEventListener('invalid', () => {
            if (input.validity.valueMissing) {
                input.setCustomValidity(
                    typeof messageOrFactory === 'function' ? messageOrFactory() : messageOrFactory
                );
            } else {
                input.setCustomValidity('');
            }
        });
        input.addEventListener('input', () => clearValidity(input));
        input.addEventListener('change', () => clearValidity(input));
    }

    function updateIdentityDependentFields() {
        birthFieldLabel.textContent = getBirthFieldLabelText();
        birthFieldLabel.htmlFor = 'birthYearSelect';
        sexLabel.textContent = getSexLabelText();
        experienceSectionHeading.textContent = isAgentMode()
            ? i18n.form.sections.victimExperience
            : i18n.form.sections.experience;

        if (agentRelationshipGroup && agentRelationshipSelect) {
            const showAgentRelationship = isAgentMode();
            agentRelationshipGroup.hidden = !showAgentRelationship;
            agentRelationshipSelect.disabled = !showAgentRelationship;

            if (!showAgentRelationship) {
                agentRelationshipSelect.value = '';
                clearValidity(agentRelationshipSelect);
                syncSelectOtherInputState({
                    select: agentRelationshipSelect,
                    customValue: CUSTOM_AGENT_RELATIONSHIP_OPTION,
                    inputWrap: agentRelationshipOtherWrap,
                    input: agentRelationshipOtherInput
                });
            }
        }

        clearValidity(birthYearSelect);
        clearValidity(sexSelect);
    }

    function toggleOtherSex() {
        const showOtherInput = sexSelect.value === OTHER_SEX_OPTION;
        otherSexFields.hidden = !showOtherInput;
        otherSexTypeInputs.forEach((input) => {
            input.disabled = !showOtherInput;
        });
        clearOtherSexTypeValidity();
        clearValidity(otherSexInput);

        if (!showOtherInput) {
            otherSexTypeInputs.forEach((input) => {
                input.checked = false;
            });
            otherSexInput.value = '';
            otherSexInput.disabled = true;
            return;
        }

        syncOtherSexInputState();
    }

    function toggleExitMethod() {
        if (!exitMethodGroup || !exitMethodSelect) {
            return;
        }

        const shouldShow = Boolean(dateEndInput.value);
        exitMethodGroup.hidden = !shouldShow;
        exitMethodSelect.disabled = !shouldShow;

        if (!shouldShow) {
            exitMethodSelect.value = '';
            clearValidity(exitMethodSelect);
        }

        syncSelectOtherInputState({
            select: exitMethodSelect,
            customValue: CUSTOM_EXIT_METHOD_OPTION,
            inputWrap: exitMethodOtherWrap,
            input: exitMethodOtherInput
        });
    }

    function validateBirthField() {
        clearValidity(birthYearSelect);

        if (!birthYearSelect.value) {
            return;
        }

        const year = Number(birthYearSelect.value);
        const isValid = Number.isInteger(year)
            && year >= formRules.birthYear.min
            && year <= formRules.birthYear.max;

        if (!isValid) {
            birthYearSelect.setCustomValidity(
                formatMessage(i18n.form.validation.invalidBirthDate, {
                    label: getBirthFieldLabelText()
                })
            );
        }
    }

    function validateCrossFields() {
        clearOtherSexTypeValidity();
        clearValidity(otherSexInput);
        clearValidity(dateEndInput);
        clearValidity(agentRelationshipOtherInput);
        clearValidity(parentMotivationOtherInput);
        clearValidity(exitMethodOtherInput);
        clearValidity(legalAidOtherInput);
        clearValidity(violenceCategoryOtherInput);

        if (parentMotivationValidityTarget) {
            clearValidity(parentMotivationValidityTarget);
        }

        if (sexSelect.value === OTHER_SEX_OPTION) {
            const selectedOtherSexType = getSelectedOtherSexType();

            if (selectedOtherSexType && selectedOtherSexType !== CUSTOM_OTHER_SEX_OPTION && otherSexInput.value) {
                otherSexInput.value = '';
            }

            if (!selectedOtherSexType && otherSexTypeValidityTarget) {
                otherSexTypeValidityTarget.setCustomValidity(i18n.form.validation.specifyOtherSex);
            } else if (selectedOtherSexType === CUSTOM_OTHER_SEX_OPTION && !otherSexInput.value.trim()) {
                otherSexInput.setCustomValidity(i18n.form.validation.fillOtherSex);
            }
        }

        if (
            agentRelationshipSelect
            && !agentRelationshipSelect.disabled
            && agentRelationshipSelect.value === CUSTOM_AGENT_RELATIONSHIP_OPTION
            && agentRelationshipOtherInput
            && !agentRelationshipOtherInput.value.trim()
        ) {
            agentRelationshipOtherInput.setCustomValidity(i18n.form.validation.fillAgentRelationshipOther);
        }

        const selectedParentMotivations = getCheckedValues(parentMotivationInputs);
        if (parentMotivationValidityTarget && selectedParentMotivations.length === 0) {
            parentMotivationValidityTarget.setCustomValidity(i18n.form.validation.fillParentMotivations);
        }

        if (
            selectedParentMotivations.includes(CUSTOM_PARENT_MOTIVATION_OPTION)
            && parentMotivationOtherInput
            && !parentMotivationOtherInput.value.trim()
        ) {
            parentMotivationOtherInput.setCustomValidity(i18n.form.validation.fillParentMotivationOther);
        }

        if (
            exitMethodSelect
            && !exitMethodSelect.disabled
            && exitMethodSelect.value === CUSTOM_EXIT_METHOD_OPTION
            && exitMethodOtherInput
            && !exitMethodOtherInput.value.trim()
        ) {
            exitMethodOtherInput.setCustomValidity(i18n.form.validation.fillExitMethodOther);
        }

        if (
            legalAidSelect
            && legalAidSelect.value === CUSTOM_LEGAL_AID_OPTION
            && legalAidOtherInput
            && !legalAidOtherInput.value.trim()
        ) {
            legalAidOtherInput.setCustomValidity(i18n.form.validation.fillLegalAidOther);
        }

        const selectedViolenceCategories = getCheckedValues(violenceCategoryInputs);
        if (
            selectedViolenceCategories.includes(CUSTOM_VIOLENCE_CATEGORY_OPTION)
            && violenceCategoryOtherInput
            && !violenceCategoryOtherInput.value.trim()
        ) {
            violenceCategoryOtherInput.setCustomValidity(i18n.form.validation.fillViolenceCategoryOther);
        }

        validateBirthField();

        const start = dateStartInput.value;
        const end = dateEndInput.value;
        if (end && start && new Date(end) < new Date(start)) {
            dateEndInput.setCustomValidity(i18n.form.validation.endDateBeforeStart);
        }
    }

    bindRequiredMessage(identitySelect, i18n.form.validation.selectIdentity);
    bindRequiredMessage(birthYearSelect, getBirthRequiredMessage);
    bindRequiredMessage(sexSelect, getSexRequiredMessage);
    bindRequiredMessage(provinceSelect, i18n.form.validation.selectProvince);
    bindRequiredMessage(citySelect, i18n.form.validation.selectCity);
    bindRequiredMessage(schoolNameInput, i18n.form.validation.fillSchoolName);
    bindRequiredMessage(dateStartInput, i18n.form.validation.fillDateStart);
    bindRequiredMessage(contactInformationInput, i18n.form.validation.fillContactInformation);

    identitySelect.addEventListener('change', () => {
        updateIdentityDependentFields();
        validateCrossFields();
    });
    birthYearSelect.addEventListener('change', validateCrossFields);
    citySelect.addEventListener('change', () => clearValidity(countySelect));

    sexSelect.addEventListener('change', () => {
        toggleOtherSex();
        validateCrossFields();
    });
    otherSexTypeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (getSelectedOtherSexType() !== CUSTOM_OTHER_SEX_OPTION) {
                otherSexInput.value = '';
            }
            syncOtherSexInputState();
            validateCrossFields();

            if (input.checked && input.value === CUSTOM_OTHER_SEX_OPTION && !otherSexInput.disabled) {
                otherSexInput.focus();
            }
        });
    });
    otherSexInput.addEventListener('input', validateCrossFields);
    otherSexInput.addEventListener('change', validateCrossFields);

    if (agentRelationshipSelect) {
        agentRelationshipSelect.addEventListener('change', () => {
            syncSelectOtherInputState({
                select: agentRelationshipSelect,
                customValue: CUSTOM_AGENT_RELATIONSHIP_OPTION,
                inputWrap: agentRelationshipOtherWrap,
                input: agentRelationshipOtherInput
            });
            validateCrossFields();
        });
    }

    if (agentRelationshipOtherInput) {
        agentRelationshipOtherInput.addEventListener('input', validateCrossFields);
        agentRelationshipOtherInput.addEventListener('change', validateCrossFields);
    }

    parentMotivationInputs.forEach((input) => {
        input.addEventListener('change', () => {
            syncCheckboxOtherInputState({
                inputs: parentMotivationInputs,
                customValue: CUSTOM_PARENT_MOTIVATION_OPTION,
                inputWrap: parentMotivationOtherWrap,
                input: parentMotivationOtherInput
            });
            validateCrossFields();
        });
    });

    if (parentMotivationOtherInput) {
        parentMotivationOtherInput.addEventListener('input', validateCrossFields);
        parentMotivationOtherInput.addEventListener('change', validateCrossFields);
    }

    if (exitMethodSelect) {
        exitMethodSelect.addEventListener('change', () => {
            syncSelectOtherInputState({
                select: exitMethodSelect,
                customValue: CUSTOM_EXIT_METHOD_OPTION,
                inputWrap: exitMethodOtherWrap,
                input: exitMethodOtherInput
            });
            validateCrossFields();
        });
    }

    if (exitMethodOtherInput) {
        exitMethodOtherInput.addEventListener('input', validateCrossFields);
        exitMethodOtherInput.addEventListener('change', validateCrossFields);
    }

    if (legalAidSelect) {
        legalAidSelect.addEventListener('change', () => {
            syncSelectOtherInputState({
                select: legalAidSelect,
                customValue: CUSTOM_LEGAL_AID_OPTION,
                inputWrap: legalAidOtherWrap,
                input: legalAidOtherInput
            });
            validateCrossFields();
        });
    }

    if (legalAidOtherInput) {
        legalAidOtherInput.addEventListener('input', validateCrossFields);
        legalAidOtherInput.addEventListener('change', validateCrossFields);
    }

    violenceCategoryInputs.forEach((input) => {
        input.addEventListener('change', () => {
            syncCheckboxOtherInputState({
                inputs: violenceCategoryInputs,
                customValue: CUSTOM_VIOLENCE_CATEGORY_OPTION,
                inputWrap: violenceCategoryOtherWrap,
                input: violenceCategoryOtherInput
            });
            validateCrossFields();
        });
    });

    if (violenceCategoryOtherInput) {
        violenceCategoryOtherInput.addEventListener('input', validateCrossFields);
        violenceCategoryOtherInput.addEventListener('change', validateCrossFields);
    }

    dateStartInput.addEventListener('change', validateCrossFields);
    dateEndInput.addEventListener('change', () => {
        toggleExitMethod();
        validateCrossFields();
    });

    if (preInstitutionProvinceSelect && preInstitutionCitySelect) {
        preInstitutionCitySelect.disabled = true;
        renderOptions(preInstitutionCitySelect, [], i18n.form.placeholders.preInstitutionCityCode);

        loadAreaSelectorPayload()
            .then((payload) => {
                renderOptions(
                    preInstitutionProvinceSelect,
                    getLocalizedProvinces(payload),
                    i18n.form.placeholders.preInstitutionProvinceCode
                );
            })
            .catch(() => {
                renderOptions(preInstitutionProvinceSelect, [], i18n.form.placeholders.preInstitutionProvinceCode);
            });

        preInstitutionProvinceSelect.addEventListener('change', () => {
            updatePreInstitutionCityOptions(preInstitutionProvinceSelect.value);
        });
    }

    updateIdentityDependentFields();
    toggleOtherSex();
    toggleExitMethod();
    syncCheckboxOtherInputState({
        inputs: parentMotivationInputs,
        customValue: CUSTOM_PARENT_MOTIVATION_OPTION,
        inputWrap: parentMotivationOtherWrap,
        input: parentMotivationOtherInput
    });
    syncCheckboxOtherInputState({
        inputs: violenceCategoryInputs,
        customValue: CUSTOM_VIOLENCE_CATEGORY_OPTION,
        inputWrap: violenceCategoryOtherWrap,
        input: violenceCategoryOtherInput
    });
    syncSelectOtherInputState({
        select: legalAidSelect,
        customValue: CUSTOM_LEGAL_AID_OPTION,
        inputWrap: legalAidOtherWrap,
        input: legalAidOtherInput
    });
    validateCrossFields();

    mainForm.addEventListener('submit', (event) => {
        validateCrossFields();
        if (!mainForm.checkValidity()) {
            event.preventDefault();
            mainForm.reportValidity();
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = i18n.form.buttons.submitting || i18n.common.loading;
        }
    });
})();
