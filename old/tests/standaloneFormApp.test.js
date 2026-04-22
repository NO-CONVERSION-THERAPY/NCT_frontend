const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const {
  clearProjectModules,
  loadStandaloneFormApp,
  projectRoot,
  requestApp,
  requestPath
} = require('./helpers/appHarness');

function loadStandaloneFormAppWithPatchedFormService(envOverrides = {}, patchFormService) {
  const effectiveEnvOverrides = {
    MAINTENANCE_MODE: 'false',
    MAINTENANCE_NOTICE: '',
    MAP_DATA_NODE_TRANSPORT_OVERRIDES: 'false',
    FORM_ID: 'test-form-id',
    FRONTEND_VARIANT: 'legacy',
    ...envOverrides
  };

  const originalValues = Object.fromEntries(
    Object.keys(effectiveEnvOverrides).map((key) => [key, process.env[key]])
  );

  Object.entries(effectiveEnvOverrides).forEach(([key, value]) => {
    process.env[key] = value;
  });

  clearProjectModules();
  const formService = require(path.join(projectRoot, 'app/services/formService'));
  const restorePatch = typeof patchFormService === 'function'
    ? patchFormService(formService)
    : null;
  const app = require(path.join(projectRoot, 'app/standaloneFormServer'));

  Object.entries(originalValues).forEach(([key, value]) => {
    if (typeof value === 'undefined') {
      delete process.env[key];
      return;
    }

    process.env[key] = value;
  });

  return {
    app,
    restore() {
      if (typeof restorePatch === 'function') {
        restorePatch();
      }
    }
  };
}

function responseBodyMatch(body, pattern) {
  const match = String(body || '').match(pattern);
  assert.ok(match, `Expected response body to match ${pattern}`);
  return match;
}

function buildValidSubmissionBody(overrides = {}) {
  const basePayload = {
    identity: '受害者本人',
    agent_relationship: '',
    agent_relationship_other: '',
    birth_year: '2008',
    sex: '男性',
    sex_other_type: '',
    sex_other: '',
    pre_institution_province_code: '',
    pre_institution_city_code: '',
    provinceCode: '110000',
    cityCode: '110101',
    countyCode: '',
    school_name: '独立表单测试机构',
    school_address: '北京市东城区测试路 1 号',
    date_start: '2024-01-01',
    date_end: '',
    parent_motivations: ['不清楚/从未被告知原因'],
    parent_motivation_other: '',
    exit_method: '',
    exit_method_other: '',
    experience: '',
    legal_aid_status: '',
    legal_aid_other: '',
    headmaster_name: '',
    abuser_info: '',
    contact_information: 'standalone@example.com',
    violence_categories: [],
    violence_category_other: '',
    scandal: '',
    other: '',
    website: '',
    form_token: ''
  };

  const params = new URLSearchParams();
  const payload = {
    ...basePayload,
    ...overrides
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    params.append(key, value);
  });

  return params.toString();
}

test('standalone form app serves the form at the worker root path', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'false' });
  const response = await requestPath(app, '/');

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /action="\/submit"/);
  assert.match(response.body, /class="standalone-shell standalone-form-shell"/);
  assert.match(response.body, /\/css\/standalone-form\.css/);
  assert.doesNotMatch(response.body, /standalone-hero__meta/);
  assert.match(response.body, /填写过程中如感不适可随时停止/);
  assert.match(response.body, /全国统一心理援助：12356/);
});

test('standalone form app keeps /form/standalone as a compatibility alias', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'false' });
  const response = await requestPath(app, '/form/standalone');

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /action="\/submit"/);
});

test('standalone form debug routes stay hidden when debug mode is disabled', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'false' });
  const debugResponse = await requestPath(app, '/debug');
  const successResponse = await requestPath(app, '/debug/submit-success');
  const errorResponse = await requestPath(app, '/debug/submit-error');

  assert.equal(debugResponse.statusCode, 404);
  assert.equal(successResponse.statusCode, 404);
  assert.equal(errorResponse.statusCode, 404);
});

test('standalone form debug page renders success and error preview links when debug mode is enabled', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'true' });
  const response = await requestPath(app, '/debug');

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /调试|Debug|調試/);
  assert.match(response.body, /href="\/debug\/submit-success"/);
  assert.match(response.body, /href="\/debug\/submit-error"/);
});

test('standalone pages respect explicit language selection for standalone-specific labels', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'true' });
  const englishFormResponse = await requestPath(app, '/form/standalone?lang=en');
  const traditionalChineseFormResponse = await requestPath(app, '/form/standalone?lang=zh-TW');
  const englishSuccessResponse = await requestPath(app, '/debug/submit-success?lang=en');
  const traditionalChineseErrorResponse = await requestPath(app, '/debug/submit-error?lang=zh-TW');

  assert.equal(englishFormResponse.statusCode, 200);
  assert.match(englishFormResponse.body, /Survey on Harm Experienced in Conversion Institutions/);
  assert.match(englishFormResponse.body, /<label for="website">Website<\/label>/);
  assert.match(englishFormResponse.body, /data-standalone-language-link="en"/);
  assert.doesNotMatch(englishFormResponse.body, /class="standalone-back-link">← Back to Home<\/a>/);

  assert.equal(traditionalChineseFormResponse.statusCode, 200);
  assert.match(traditionalChineseFormResponse.body, /扭轉機構受害者情況問卷調查/);
  assert.match(traditionalChineseFormResponse.body, /<label for="website">網站<\/label>/);

  assert.equal(englishSuccessResponse.statusCode, 200);
  assert.match(englishSuccessResponse.body, /<p class="glass-eyebrow">Success<\/p>/);
  assert.match(englishSuccessResponse.body, /Back to Form/);
  assert.doesNotMatch(englishSuccessResponse.body, />Back to Home<\/a>/);

  assert.equal(traditionalChineseErrorResponse.statusCode, 200);
  assert.match(traditionalChineseErrorResponse.body, /<p class="glass-eyebrow">重試<\/p>/);
});

test('standalone form debug preview routes render the standalone success and error pages', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'true' });
  const successResponse = await requestPath(app, '/debug/submit-success');
  const errorResponse = await requestPath(app, '/debug/submit-error');

  assert.equal(successResponse.statusCode, 200);
  assert.match(successResponse.body, /standalone-state-card--success/);
  assert.match(successResponse.body, /href="\/debug"/);

  assert.equal(errorResponse.statusCode, 200);
  assert.match(errorResponse.body, /standalone-state-card--error/);
  assert.match(errorResponse.body, /href="\/debug"/);
  assert.match(errorResponse.body, /viewform\?usp=pp_url/);
});

test('standalone form app renders the dry run preview at /submit', async () => {
  clearProjectModules();
  const { issueFormProtectionToken } = require(path.join(projectRoot, 'app/services/formProtectionService'));
  const app = loadStandaloneFormApp({
    DEBUG_MOD: 'false',
    FORM_DRY_RUN: 'true',
    FORM_PROTECTION_SECRET: 'standalone-form-protection-secret',
    FORM_PROTECTION_MIN_FILL_MS: '3000'
  });
  const response = await requestApp(app, {
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: buildValidSubmissionBody({
      form_token: issueFormProtectionToken({
        secret: 'standalone-form-protection-secret',
        issuedAt: Date.now() - 5000
      })
    })
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /表单 Dry Run 预览/);
  assert.match(response.body, /href="\/"/);
  clearProjectModules();
});

test('standalone dry run appends standalone-only answers into existing Google Form fields', async () => {
  clearProjectModules();
  const { issueFormProtectionToken } = require(path.join(projectRoot, 'app/services/formProtectionService'));
  const app = loadStandaloneFormApp({
    DEBUG_MOD: 'false',
    FORM_DRY_RUN: 'true',
    FORM_PROTECTION_SECRET: 'standalone-form-protection-secret',
    FORM_PROTECTION_MIN_FILL_MS: '3000'
  });
  const response = await requestApp(app, {
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: buildValidSubmissionBody({
      identity: '受害者的代理人',
      agent_relationship: '朋友',
      pre_institution_province_code: '110000',
      pre_institution_city_code: '110101',
      date_end: '2024-02-01',
      parent_motivations: ['性别认同相关（如跨性别等）', '__custom_parent_motivation__'],
      parent_motivation_other: '其它测试原因',
      exit_method: '__custom_exit_method__',
      exit_method_other: '其它离开方式',
      legal_aid_status: '__custom_legal_aid__',
      legal_aid_other: '其它法律援助情况',
      abuser_info: '测试施暴者',
      violence_categories: ['虚假/非法宣传', '__custom_violence_category__'],
      violence_category_other: '其它测试暴力',
      form_token: issueFormProtectionToken({
        secret: 'standalone-form-protection-secret',
        issuedAt: Date.now() - 5000
      })
    })
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /填表人为受害人的朋友。/);
  assert.match(response.body, /进入机构前位于北京东城区。/);
  assert.match(response.body, /被送去机构的原因为：性别认同相关（如跨性别等）；其它测试原因/);
  assert.match(response.body, /已知施暴者\/教官基本信息与描述：测试施暴者/);
  assert.match(response.body, /机构丑闻及暴力行为包括：虚假\/非法宣传；其它测试暴力/);
  assert.match(response.body, /离开机构的方式为：其它离开方式/);
  assert.match(response.body, /举报和寻求法律援助情况：其它法律援助情况/);
  clearProjectModules();
});

test('standalone form app confirms and submits through /submit/confirm', { concurrency: false }, async () => {
  clearProjectModules();
  const capturedCalls = [];

  try {
    const { issueFormProtectionToken } = require(path.join(projectRoot, 'app/services/formProtectionService'));
    const { app, restore } = loadStandaloneFormAppWithPatchedFormService({
      DEBUG_MOD: 'false',
      FORM_DRY_RUN: 'false',
      FORM_SUBMIT_TARGET: 'google',
      FORM_PROTECTION_SECRET: 'standalone-form-protection-secret',
      FORM_PROTECTION_MIN_FILL_MS: '3000'
    }, (formService) => {
      const originalSubmitToGoogleForm = formService.submitToGoogleForm;
      formService.submitToGoogleForm = async (...args) => {
        capturedCalls.push(args);
      };

      return () => {
        formService.submitToGoogleForm = originalSubmitToGoogleForm;
      };
    });
    const reviewResponse = await requestApp(app, {
      path: '/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: buildValidSubmissionBody({
        form_token: issueFormProtectionToken({
          secret: 'standalone-form-protection-secret',
          issuedAt: Date.now() - 5000
        })
      })
    });

    const confirmationTokenMatch = responseBodyMatch(reviewResponse.body, /name="confirmation_token" value="([^"]+)"/);
    const confirmationPayloadMatch = responseBodyMatch(reviewResponse.body, /<textarea name="confirmation_payload" hidden>([^<]*)<\/textarea>/);
    const confirmResponse = await requestApp(app, {
      path: '/submit/confirm',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        confirmation_token: confirmationTokenMatch[1],
        confirmation_payload: confirmationPayloadMatch[1]
      }).toString()
    });

    assert.equal(confirmResponse.statusCode, 200);
    assert.equal(capturedCalls.length, 1);
    assert.match(confirmResponse.body, /standalone-state-card--success/);
    assert.match(confirmResponse.body, /href="\/"/);
    restore();
  } finally {
    clearProjectModules();
  }
});

test('standalone form app exposes static area selector data and retires the old area API', async () => {
  const app = loadStandaloneFormApp({ DEBUG_MOD: 'false' });
  const staticResponse = await requestPath(app, '/content/area-selector.json');
  const retiredResponse = await requestPath(app, '/api/area-options?provinceCode=110000');

  assert.equal(staticResponse.statusCode, 200);
  assert.match(staticResponse.headers['content-type'], /application\/json/);
  assert.match(staticResponse.body, /东城区|東城區|Dongcheng/);

  assert.equal(retiredResponse.statusCode, 410);
  assert.match(retiredResponse.body, /retired/i);
});
