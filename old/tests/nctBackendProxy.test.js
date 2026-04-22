const assert = require('node:assert/strict');
const test = require('node:test');

const {
  clearProjectModules,
  loadApp,
  requestApp,
  requestPath
} = require('./helpers/appHarness');

function extractBootstrapFromHtml(body) {
  const match = String(body || '').match(/window\.__NCT_BOOTSTRAP__ = ([\s\S]*?);\s*<\/script>/);
  assert.ok(match, 'Expected React bootstrap payload in response body');
  return JSON.parse(match[1]);
}

function buildRemoteFormValues(overrides = {}) {
  return {
    abuserInfo: '',
    agentRelationship: '',
    birthYear: '2008',
    city: '东城区',
    contactInformation: 'remote@example.com',
    county: '',
    dateEnd: '',
    dateStart: '2024-01-01',
    exitMethod: '',
    experience: '这是来自 nct-api-sql-sub 的远程确认内容。',
    googleFormAge: 18,
    headmasterName: '',
    identity: '受害者本人',
    legalAidStatus: '',
    other: '',
    parentMotivations: ['不清楚/从未被告知原因'],
    preInstitutionCity: '',
    preInstitutionProvince: '',
    province: '北京',
    scandal: '',
    schoolAddress: '北京市测试路 1 号',
    schoolName: '远程机构',
    sex: '男性',
    violenceCategories: [],
    ...overrides
  };
}

test('frontend runtime API proxies token issuance to nct-api-sql-sub', { concurrency: false }, async () => {
  const originalFetch = global.fetch;
  const fetchCalls = [];

  global.fetch = async (input, init = {}) => {
    fetchCalls.push({
      headers: init.headers || {},
      method: init.method || 'GET',
      url: String(input)
    });

    return new Response(JSON.stringify({
      formProtectionToken: 'remote-form-token',
      scope: 'form'
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  };

  try {
    const app = loadApp({
      FRONTEND_VARIANT: 'react',
      NCT_BACKEND_SERVICE_TOKEN: 'remote-service-token',
      NCT_BACKEND_SERVICE_URL: 'https://sub.example.com'
    });
    const response = await requestPath(app, '/api/frontend-runtime?scope=form');

    assert.equal(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.body), {
      formProtectionToken: 'remote-form-token',
      scope: 'form'
    });
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].method, 'GET');
    assert.equal(fetchCalls[0].url, 'https://sub.example.com/api/no-torsion/frontend-runtime?scope=form');
    assert.equal(fetchCalls[0].headers.Authorization, 'Bearer remote-service-token');
  } finally {
    global.fetch = originalFetch;
    clearProjectModules();
  }
});

test('submit route renders the remote confirmation page when backend service is enabled', { concurrency: false }, async () => {
  const originalFetch = global.fetch;
  const fetchCalls = [];

  global.fetch = async (input, init = {}) => {
    fetchCalls.push({
      body: init.body ? JSON.parse(String(init.body)) : null,
      headers: init.headers || {},
      method: init.method || 'GET',
      url: String(input)
    });

    return new Response(JSON.stringify({
      confirmationPayload: 'remote-confirmation-payload',
      confirmationToken: 'remote-confirmation-token',
      encodedPayload: 'entry.5034928=%E8%BF%9C%E7%A8%8B%E6%9C%BA%E6%9E%84',
      mode: 'confirm',
      values: buildRemoteFormValues()
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  };

  try {
    const app = loadApp({
      DEBUG_MOD: 'false',
      FRONTEND_VARIANT: 'react',
      NCT_BACKEND_SERVICE_TOKEN: 'remote-service-token',
      NCT_BACKEND_SERVICE_URL: 'https://sub.example.com'
    });
    const response = await requestApp(app, {
      body: new URLSearchParams({
        form_token: 'frontend-token',
        identity: '受害者本人',
        school_name: '前端提交的机构名称',
        website: ''
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      path: '/submit'
    });
    const bootstrap = extractBootstrapFromHtml(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(bootstrap.pageType, 'submit-confirm');
    assert.equal(bootstrap.pageProps.confirmationPayload, 'remote-confirmation-payload');
    assert.equal(bootstrap.pageProps.confirmationToken, 'remote-confirmation-token');
    assert.ok(bootstrap.pageProps.fields.some((field) => field.label === '机构名称' && field.value === '远程机构'));
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].method, 'POST');
    assert.equal(fetchCalls[0].url, 'https://sub.example.com/api/no-torsion/form/prepare');
    assert.equal(fetchCalls[0].headers.Authorization, 'Bearer remote-service-token');
    assert.equal(fetchCalls[0].body.requestContext.sourcePath, '/submit');
    assert.equal(fetchCalls[0].body.requestContext.lang, 'zh-CN');
    assert.equal(fetchCalls[0].body.body.school_name, '前端提交的机构名称');
  } finally {
    global.fetch = originalFetch;
    clearProjectModules();
  }
});

test('submit confirm route renders the remote success page when backend service handles delivery', { concurrency: false }, async () => {
  const originalFetch = global.fetch;
  const fetchCalls = [];

  global.fetch = async (input, init = {}) => {
    fetchCalls.push({
      body: init.body ? JSON.parse(String(init.body)) : null,
      headers: init.headers || {},
      method: init.method || 'GET',
      url: String(input)
    });

    return new Response(JSON.stringify({
      encodedPayload: 'entry.5034928=%E8%BF%9C%E7%A8%8B%E6%9C%BA%E6%9E%84',
      resultsByTarget: {
        d1: {
          ok: true,
          recordKey: 'no-torsion:form:test-record'
        }
      },
      successfulTargets: ['d1']
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  };

  try {
    const app = loadApp({
      DEBUG_MOD: 'false',
      FRONTEND_VARIANT: 'react',
      NCT_BACKEND_SERVICE_TOKEN: 'remote-service-token',
      NCT_BACKEND_SERVICE_URL: 'https://sub.example.com'
    });
    const response = await requestApp(app, {
      body: new URLSearchParams({
        confirmation_payload: 'remote-confirmation-payload',
        confirmation_token: 'remote-confirmation-token'
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      path: '/submit/confirm'
    });
    const bootstrap = extractBootstrapFromHtml(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(bootstrap.pageType, 'submit-success');
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].method, 'POST');
    assert.equal(fetchCalls[0].url, 'https://sub.example.com/api/no-torsion/form/confirm');
    assert.equal(fetchCalls[0].body.confirmationPayload, 'remote-confirmation-payload');
    assert.equal(fetchCalls[0].body.confirmationToken, 'remote-confirmation-token');
  } finally {
    global.fetch = originalFetch;
    clearProjectModules();
  }
});

test('institution correction submit proxies to nct-api-sql-sub and renders the success page', { concurrency: false }, async () => {
  const originalFetch = global.fetch;
  const fetchCalls = [];

  global.fetch = async (input, init = {}) => {
    fetchCalls.push({
      body: init.body ? JSON.parse(String(init.body)) : null,
      headers: init.headers || {},
      method: init.method || 'GET',
      url: String(input)
    });

    return new Response(JSON.stringify({
      encodedPayload: 'entry.270706445=%E6%99%A8%E6%98%9F%E6%88%90%E9%95%BF%E4%B8%AD%E5%BF%83',
      resultsByTarget: {
        d1: {
          ok: true,
          recordKey: 'no-torsion:correction:test-record'
        }
      },
      successfulTargets: ['d1'],
      values: {
        city: '东城区',
        cityCode: '110101',
        contactInformation: '',
        correctionContent: '请补充最新地址。',
        county: '',
        countyCode: '',
        headmasterName: '',
        province: '北京',
        provinceCode: '110000',
        schoolAddress: '',
        schoolName: '晨星成长中心'
      }
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  };

  try {
    const app = loadApp({
      DEBUG_MOD: 'false',
      FRONTEND_VARIANT: 'react',
      NCT_BACKEND_SERVICE_TOKEN: 'remote-service-token',
      NCT_BACKEND_SERVICE_URL: 'https://sub.example.com'
    });
    const response = await requestApp(app, {
      body: new URLSearchParams({
        correction_content: '请补充最新地址。',
        form_token: 'frontend-token',
        school_name: '晨星成长中心',
        website: ''
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      path: '/map/correction/submit'
    });
    const bootstrap = extractBootstrapFromHtml(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(bootstrap.pageType, 'correction-success');
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].method, 'POST');
    assert.equal(fetchCalls[0].url, 'https://sub.example.com/api/no-torsion/correction/submit');
    assert.equal(fetchCalls[0].body.requestContext.sourcePath, '/map/correction/submit');
    assert.equal(fetchCalls[0].body.body.school_name, '晨星成长中心');
  } finally {
    global.fetch = originalFetch;
    clearProjectModules();
  }
});
