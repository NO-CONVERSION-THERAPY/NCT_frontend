const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const {
  clearProjectModules,
  loadApp,
  projectRoot,
  requestApp,
  requestPath
} = require('./helpers/appHarness');

function extractBootstrapFromHtml(body) {
  const match = String(body || '').match(/window\.__NCT_BOOTSTRAP__ = ([\s\S]*?);\s*<\/script>/);
  assert.ok(match, 'Expected React bootstrap payload in response body');
  return JSON.parse(match[1]);
}

function buildReactEnhancedSubmissionBody(overrides = {}) {
  const basePayload = {
    form_variant: 'react_portal_enhanced',
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
    school_name: 'React 表单测试机构',
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
    contact_information: 'react@example.com',
    violence_categories: [],
    violence_category_other: '',
    scandal: '',
    other: '',
    website: '',
    form_token: ''
  };

  const payload = {
    ...basePayload,
    ...overrides
  };
  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    params.append(key, value);
  });

  return params.toString();
}

test('react /form bootstrap includes enhanced questionnaire options', async () => {
  const app = loadApp({ FRONTEND_VARIANT: 'react' });
  const response = await requestPath(app, '/form?lang=en');

  assert.equal(response.statusCode, 200);

  const bootstrap = extractBootstrapFromHtml(response.body);
  const formConfig = bootstrap.pageProps && bootstrap.pageProps.form;

  assert.equal(bootstrap.pageType, 'portal');
  assert.equal(bootstrap.lang, 'en');
  assert.ok(Array.isArray(formConfig.agentRelationshipOptions));
  assert.ok(Array.isArray(formConfig.parentMotivationOptions));
  assert.ok(Array.isArray(formConfig.exitMethodOptions));
  assert.ok(Array.isArray(formConfig.legalAidOptions));
  assert.ok(Array.isArray(formConfig.violenceCategoryOptions));
  assert.match(JSON.stringify(formConfig.agentRelationshipOptions), /"label":"Friend"/);
  assert.match(JSON.stringify(formConfig.parentMotivationOptions), /"label":"Other reason"/);
  assert.match(JSON.stringify(formConfig.exitMethodOptions), /__custom_exit_method__/);
  assert.match(JSON.stringify(formConfig.legalAidOptions), /__custom_legal_aid__/);
  assert.match(JSON.stringify(formConfig.violenceCategoryOptions), /__custom_violence_category__/);
});

test('default submit flow accepts the React enhanced questionnaire marker', async () => {
  clearProjectModules();
  const { issueFormProtectionToken } = require(path.join(projectRoot, 'app/services/formProtectionService'));
  const app = loadApp({
    FORM_DRY_RUN: 'true',
    FORM_PROTECTION_SECRET: 'react-portal-form-protection-secret',
    FORM_PROTECTION_MIN_FILL_MS: '3000',
    FRONTEND_VARIANT: 'legacy'
  });
  const response = await requestApp(app, {
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: buildReactEnhancedSubmissionBody({
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
      abuser_info: 'React 测试施暴者',
      violence_categories: ['虚假/非法宣传', '__custom_violence_category__'],
      violence_category_other: '其它测试暴力',
      form_token: issueFormProtectionToken({
        secret: 'react-portal-form-protection-secret',
        issuedAt: Date.now() - 5000
      })
    })
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /填表人为受害人的朋友。/);
  assert.match(response.body, /进入机构前位于北京东城区。/);
  assert.match(response.body, /被送去机构的原因为：性别认同相关（如跨性别等）；其它测试原因/);
  assert.match(response.body, /已知施暴者\/教官基本信息与描述：React 测试施暴者/);
  assert.match(response.body, /机构丑闻及暴力行为包括：虚假\/非法宣传；其它测试暴力/);
  assert.match(response.body, /离开机构的方式为：其它离开方式/);
  assert.match(response.body, /举报和寻求法律援助情况：其它法律援助情况/);
  clearProjectModules();
});
