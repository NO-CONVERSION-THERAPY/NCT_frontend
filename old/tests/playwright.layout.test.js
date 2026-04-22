const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { chromium } = require('playwright');

const { paths } = require('../config/fileConfig');
const {
  loadApp,
  projectRoot,
  startServer
} = require('./helpers/appHarness');

const SCREENSHOT_DIR = path.join(projectRoot, 'test-results', 'playwright-layout');
const NAVIGATION_TIMEOUT_MS = 30000;
const POST_RENDER_SETTLE_MS = 550;
const COLOR_SCHEMES = ['dark', 'light'];
const VIEWPORTS = [
  {
    height: 1200,
    name: 'desktop',
    width: 1440
  },
  {
    height: 844,
    isMobile: true,
    name: 'mobile',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    width: 390
  }
];
const MOCK_MAP_PAYLOAD = {
  source: 'playwright-layout',
  isSourceFallback: false,
  preferredSource: 'google-script',
  last_synced: 1775565960000,
  avg_age: 17.4,
  schoolNum: 2,
  formNum: 2,
  statistics: [
    { province: '110000', count: 2 },
    { province: '310000', count: 1 }
  ],
  statisticsForm: [
    { province: '110000', count: 1 },
    { province: '310000', count: 1 }
  ],
  data: [
    {
      name: 'Playwright 测试机构',
      province: '110000',
      prov: '东城区',
      county: '',
      addr: '北京市东城区测试路 1 号',
      experience: '这是用于布局巡检的测试经历，用来覆盖地图卡片、列表和详情排版。',
      scandal: '这是用于布局巡检的测试丑闻说明。',
      else: '这是用于布局巡检的其他说明。',
      contact: 'layout@example.com',
      HMaster: '测试负责人',
      inputType: '受害者本人',
      dateStart: '2024-01-01',
      dateEnd: '',
      lat: 39.9042,
      lng: 116.4074
    },
    {
      name: 'Playwright 第二测试机构',
      province: '310000',
      prov: '浦东新区',
      county: '',
      addr: '上海市浦东新区测试路 2 号',
      experience: '另一条记录用于覆盖列表和筛选排版。',
      scandal: '',
      else: '',
      contact: 'second@example.com',
      HMaster: '第二测试负责人',
      inputType: '受害者的代理人',
      dateStart: '2024-02-01',
      dateEnd: '2024-03-01',
      lat: 31.2304,
      lng: 121.4737
    }
  ]
};

function ensureScreenshotDirectory() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function sanitizeFileName(value) {
  return String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'page';
}

function getFirstBlogArticleRoute() {
  const articleFileName = fs.readdirSync(paths.blog)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort((left, right) => left.localeCompare(right, 'zh-Hans-CN'))[0];

  assert.ok(articleFileName, 'Expected at least one markdown article for layout testing');
  return `/port/${encodeURIComponent(articleFileName.replace(/\.md$/i, ''))}`;
}

function buildAuditPages() {
  return [
    {
      pathName: '/',
      readySelector: '.showcase-grid'
    },
    {
      pathName: '/map',
      readySelector: '.records-list .map-record-card'
    },
    {
      pathName: '/form',
      readySelector: '.report-form'
    },
    {
      pathName: '/form/standalone',
      renderMode: 'legacy',
      readySelector: '.standalone-report-form .form-section'
    },
    {
      pathName: '/blog',
      readySelector: '.blog-grid'
    },
    {
      pathName: '/debug',
      readySelector: '.debug-grid-react .debug-card-react'
    },
    {
      pathName: '/debug/submit-preview',
      readySelector: '.glass-table'
    },
    {
      pathName: '/debug/submit-confirm',
      readySelector: '.confirm-form'
    },
    {
      pathName: '/debug/submit-error',
      readySelector: '.page-shell__content .glass-panel'
    },
    {
      pathName: '/debug/correction-submit-success',
      readySelector: '.diagnostics-card'
    },
    {
      pathName: '/debug/correction-submit-error',
      readySelector: '.page-shell__content .glass-panel'
    },
    {
      pathName: '/privacy',
      readySelector: '.showcase-grid'
    },
    {
      pathName: '/map/correction',
      readySelector: '.report-form'
    },
    {
      pathName: getFirstBlogArticleRoute(),
      readySelector: '.blog-article-shell'
    }
  ];
}

function buildScreenshotPath(pageLabel, viewportName) {
  return path.join(SCREENSHOT_DIR, `${sanitizeFileName(`${viewportName}-${pageLabel}`)}.png`);
}

async function createContext(browser, baseUrl, viewport, colorScheme) {
  const context = await browser.newContext({
    colorScheme,
    deviceScaleFactor: viewport.isMobile ? 3 : 1,
    hasTouch: Boolean(viewport.isMobile),
    isMobile: Boolean(viewport.isMobile),
    userAgent: viewport.userAgent,
    viewport: {
      height: viewport.height,
      width: viewport.width
    }
  });

  await context.route('**/map-data**', async (route) => {
    await route.fulfill({
      body: JSON.stringify(MOCK_MAP_PAYLOAD),
      contentType: 'application/json; charset=utf-8',
      status: 200
    });
  });

  return context;
}

function attachPageDiagnostics(page, baseUrl) {
  const consoleErrors = [];
  const pageErrors = [];
  const requestFailures = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    const location = message.location();
    const sourceUrl = typeof location.url === 'string' ? location.url : '';
    if (sourceUrl && !sourceUrl.startsWith(baseUrl)) {
      return;
    }

    consoleErrors.push(message.text());
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error && error.stack ? error.stack : String(error));
  });

  page.on('requestfailed', (request) => {
    if (!request.url().startsWith(baseUrl)) {
      return;
    }

    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure() && request.failure().errorText}`);
  });

  return {
    assertClean(pageLabel) {
      assert.deepEqual(pageErrors, [], `${pageLabel} triggered uncaught page errors:\n${pageErrors.join('\n\n')}`);
      assert.deepEqual(consoleErrors, [], `${pageLabel} logged console.error messages:\n${consoleErrors.join('\n\n')}`);
      assert.deepEqual(requestFailures, [], `${pageLabel} had failed same-origin requests:\n${requestFailures.join('\n\n')}`);
    }
  };
}

async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition: none !important;
      }
    `
  });
}

async function waitForReactPage(page, readySelector) {
  await page.waitForFunction(() => Boolean(window.__NCT_BOOTSTRAP__ && document.getElementById('root')), null, {
    timeout: NAVIGATION_TIMEOUT_MS
  });
  await page.waitForSelector(readySelector, { timeout: NAVIGATION_TIMEOUT_MS });
  await page.evaluate(() => (
    document.fonts && document.fonts.ready
      ? document.fonts.ready.then(() => true)
      : true
  ));
}

async function waitForLegacyPage(page, readySelector) {
  await page.waitForSelector(readySelector, { timeout: NAVIGATION_TIMEOUT_MS });
  await page.evaluate(() => (
    document.fonts && document.fonts.ready
      ? document.fonts.ready.then(() => true)
      : true
  ));
}

async function waitForAuditPage(page, pageConfig) {
  if (pageConfig.renderMode === 'legacy') {
    await waitForLegacyPage(page, pageConfig.readySelector);
    return;
  }

  await waitForReactPage(page, pageConfig.readySelector);
}

async function settlePage(page, pathName) {
  await page.waitForTimeout(POST_RENDER_SETTLE_MS);

  if (pathName === '/form' || pathName === '/blog') {
    await page.waitForFunction(() => window.scrollY > 100, null, {
      timeout: NAVIGATION_TIMEOUT_MS
    });
  }

  await page.waitForTimeout(250);
}

async function collectLayoutReport(page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const root = document.documentElement;
    const body = document.body;
    const selectorsToIgnore = [
      '.page-shell__aurora',
      '.page-shell__grid',
      '.leaflet-container',
      '.leaflet-container *',
      '.leaflet-pane',
      '.leaflet-pane *',
      '.leaflet-control-container',
      '.leaflet-control-container *',
      '.leaflet-popup',
      '.leaflet-popup *',
      'svg',
      'path'
    ];
    const ignoreSelector = selectorsToIgnore.join(', ');

    const offenders = Array.from(document.querySelectorAll('body *'))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) {
          return false;
        }

        if (element.matches(ignoreSelector) || element.closest(ignoreSelector)) {
          return false;
        }

        const style = window.getComputedStyle(element);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          Number(style.opacity || '1') === 0
        ) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) {
          return false;
        }

        return rect.left < -2 || rect.right > viewportWidth + 2;
      })
      .slice(0, 12)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          className: element.className,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          tagName: element.tagName.toLowerCase(),
          text: (element.innerText || element.textContent || '').trim().slice(0, 80)
        };
      });

    function collectOverlapOffenders() {
      const containerSelectors = [
        '.showcase-grid',
        '.stat-grid',
        '.ranking-grid',
        '.blog-grid',
        '.records-list',
        '.debug-grid-react',
        '.debug-tool-grid',
        '.form-grid',
        '.panel-actions',
        '.hero-actions',
        '.chip-row',
        '.detail-grid',
        '.site-nav',
        '.site-footer-react__links'
      ];

      function isVisible(element) {
        if (!(element instanceof HTMLElement)) {
          return false;
        }

        const style = window.getComputedStyle(element);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          Number(style.opacity || '1') === 0
        ) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.width >= 8 && rect.height >= 8;
      }

      const overlapOffenders = [];

      containerSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((container) => {
          const children = Array.from(container.children).filter(isVisible);

          for (let leftIndex = 0; leftIndex < children.length; leftIndex += 1) {
            for (let rightIndex = leftIndex + 1; rightIndex < children.length; rightIndex += 1) {
              const left = children[leftIndex];
              const right = children[rightIndex];
              const leftRect = left.getBoundingClientRect();
              const rightRect = right.getBoundingClientRect();
              const overlapWidth = Math.min(leftRect.right, rightRect.right) - Math.max(leftRect.left, rightRect.left);
              const overlapHeight = Math.min(leftRect.bottom, rightRect.bottom) - Math.max(leftRect.top, rightRect.top);

              if (overlapWidth > 4 && overlapHeight > 4) {
                overlapOffenders.push({
                  container: selector,
                  left: {
                    className: left.className,
                    text: (left.innerText || left.textContent || '').trim().slice(0, 60)
                  },
                  right: {
                    className: right.className,
                    text: (right.innerText || right.textContent || '').trim().slice(0, 60)
                  }
                });
              }
            }
          }
        });
      });

      return overlapOffenders.slice(0, 12);
    }

    return {
      bodyClientWidth: body ? body.clientWidth : 0,
      bodyScrollWidth: body ? body.scrollWidth : 0,
      documentClientWidth: root ? root.clientWidth : 0,
      documentScrollWidth: root ? root.scrollWidth : 0,
      hasHorizontalOverflow: Boolean(root && root.scrollWidth > root.clientWidth + 2),
      offenders,
      overlapOffenders: collectOverlapOffenders(),
      viewportWidth
    };
  });
}

async function assertMapHeight(page, pathName, viewportName) {
  if (pathName !== '/map') {
    return;
  }

  const mapHeight = await page.evaluate(() => {
    const mapElement = document.querySelector('.map-surface');
    if (!(mapElement instanceof HTMLElement)) {
      return 0;
    }

    return Math.round(mapElement.getBoundingClientRect().height);
  });

  const minimumHeight = viewportName === 'mobile' ? 320 : 400;
  assert.ok(
    mapHeight >= minimumHeight,
    `${viewportName} ${pathName} map height collapsed to ${mapHeight}px (expected at least ${minimumHeight}px)`
  );
}

async function captureAuditScreenshot(page, pageLabel, viewportName) {
  await page.screenshot({
    path: buildScreenshotPath(pageLabel, viewportName)
  });
}

test('react frontend key pages stay within viewport bounds', async (t) => {
  ensureScreenshotDirectory();

  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const pages = buildAuditPages();

    for (const colorScheme of COLOR_SCHEMES) {
      await t.test(`${colorScheme} scheme`, async (schemeTest) => {
        for (const viewport of VIEWPORTS) {
          await schemeTest.test(`${viewport.name} viewport`, async (viewportTest) => {
            for (const pageConfig of pages) {
              await viewportTest.test(pageConfig.pathName, async () => {
                const context = await createContext(browser, server.baseUrl, viewport, colorScheme);
                const page = await context.newPage();
                const diagnostics = attachPageDiagnostics(page, server.baseUrl);

                try {
                  const response = await page.goto(`${server.baseUrl}${pageConfig.pathName}`, {
                    timeout: NAVIGATION_TIMEOUT_MS,
                    waitUntil: 'domcontentloaded'
                  });

                  assert.ok(response, `Expected navigation response for ${pageConfig.pathName}`);
                  assert.equal(response.status(), 200, `Expected ${pageConfig.pathName} to return HTTP 200`);

                  await waitForAuditPage(page, pageConfig);
                  await disableAnimations(page);
                  await settlePage(page, pageConfig.pathName);
                  await assertMapHeight(page, pageConfig.pathName, viewport.name);
                  await captureAuditScreenshot(page, `${colorScheme}-${pageConfig.pathName}`, viewport.name);

                  const layoutReport = await collectLayoutReport(page);
                  assert.equal(
                    layoutReport.hasHorizontalOverflow,
                    false,
                    [
                      `${colorScheme} ${viewport.name} ${pageConfig.pathName} has horizontal overflow.`,
                      JSON.stringify(layoutReport, null, 2)
                    ].join('\n')
                  );
                  assert.deepEqual(
                    layoutReport.overlapOffenders,
                    [],
                    [
                      `${colorScheme} ${viewport.name} ${pageConfig.pathName} has overlapping UI elements.`,
                      JSON.stringify(layoutReport, null, 2)
                    ].join('\n')
                  );

                  diagnostics.assertClean(`${colorScheme} ${viewport.name} ${pageConfig.pathName}`);
                } finally {
                  await context.close();
                }
              });
            }
          });
        }
      });
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('home easter egg swaps the brand mark after six title clicks', async () => {
  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await createContext(browser, server.baseUrl, VIEWPORTS[0], 'dark');
    const page = await context.newPage();

    await page.addInitScript(() => {
      class MockAudioNode {
        connect() {}
        disconnect() {}
      }

      class MockGainNode extends MockAudioNode {
        constructor() {
          super();
          this.gain = {
            exponentialRampToValueAtTime() {},
            linearRampToValueAtTime() {},
            setValueAtTime() {}
          };
        }
      }

      class MockOscillatorNode extends MockAudioNode {
        constructor() {
          super();
          this.frequency = {
            setValueAtTime() {}
          };
        }

        start() {}
        stop() {}
      }

      class MockAudioContext {
        constructor() {
          this.currentTime = 0;
          this.destination = {};
        }

        close() {
          return Promise.resolve();
        }

        createGain() {
          return new MockGainNode();
        }

        createOscillator() {
          return new MockOscillatorNode();
        }

        resume() {
          return Promise.resolve();
        }
      }

      window.AudioContext = MockAudioContext;
      window.webkitAudioContext = MockAudioContext;
    });

    try {
      const response = await page.goto(`${server.baseUrl}/?lang=zh-CN`, {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: 'domcontentloaded'
      });

      assert.ok(response, 'Expected navigation response for home page easter egg test');
      assert.equal(response.status(), 200, 'Expected home page to return HTTP 200');

      await waitForReactPage(page, '.showcase-grid');

      const title = page.locator('.hero-block__title--home');
      for (let clickCount = 0; clickCount < 6; clickCount += 1) {
        await title.click();
      }

      await page.waitForSelector('.brand-lockup__mark.is-easter-egg img[src="/media/easter-eggs/futarinomahou.png"]', {
        timeout: NAVIGATION_TIMEOUT_MS
      });
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('map province fill still renders when records use province names instead of codes', async () => {
  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await createContext(browser, server.baseUrl, VIEWPORTS[0], 'light');

    await context.route('**/map-data**', async (route) => {
      await route.fulfill({
        body: JSON.stringify({
          source: 'playwright-layout-province-names',
          isSourceFallback: false,
          preferredSource: 'google-script',
          last_synced: 1775565960000,
          avg_age: 17.4,
          schoolNum: 6,
          formNum: 6,
          statistics: [],
          statisticsForm: [],
          data: [
            {
              name: '四川测试机构 A',
              province: '四川',
              prov: '成都',
              addr: '成都市测试路 1 号',
              inputType: '受害者本人',
              lat: 30.67,
              lng: 104.06
            },
            {
              name: '四川测试机构 B',
              province: '四川',
              prov: '重庆',
              addr: '重庆市测试路 2 号',
              inputType: '受害者本人',
              lat: 29.56,
              lng: 106.55
            },
            {
              name: '河北测试机构',
              province: '河北',
              prov: '石家庄',
              addr: '石家庄市测试路 3 号',
              inputType: '受害者本人',
              lat: 38.04,
              lng: 114.51
            },
            {
              name: '广东测试机构 A',
              province: '广东',
              prov: '广州',
              addr: '广州市测试路 4 号',
              inputType: '受害者的代理人',
              lat: 23.13,
              lng: 113.26
            },
            {
              name: '广东测试机构 B',
              province: '广东',
              prov: '深圳',
              addr: '深圳市测试路 5 号',
              inputType: '受害者的代理人',
              lat: 22.54,
              lng: 114.05
            },
            {
              name: '北京测试机构',
              province: '北京',
              prov: '朝阳',
              addr: '北京市测试路 6 号',
              inputType: '受害者本人',
              lat: 39.9,
              lng: 116.4
            }
          ]
        }),
        contentType: 'application/json; charset=utf-8',
        status: 200
      });
    });

    const page = await context.newPage();
    const diagnostics = attachPageDiagnostics(page, server.baseUrl);

    try {
      const response = await page.goto(`${server.baseUrl}/map?lang=zh-CN`, {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: 'domcontentloaded'
      });

      assert.ok(response, 'Expected navigation response for province fill name mapping test');
      assert.equal(response.status(), 200, 'Expected map page to return HTTP 200');

      await waitForReactPage(page, '.records-list .map-record-card');
      await disableAnimations(page);
      await page.waitForTimeout(900);

      const nonTransparentPixelCount = await page.evaluate(() => {
        const fillCanvas = document.querySelector('.map-surface .leaflet-provinceFill-pane canvas');
        if (!(fillCanvas instanceof HTMLCanvasElement)) {
          return 0;
        }

        const context2d = fillCanvas.getContext('2d');
        if (!context2d) {
          return 0;
        }

        const imageData = context2d.getImageData(0, 0, fillCanvas.width, fillCanvas.height).data;
        let count = 0;

        for (let index = 0; index < imageData.length; index += 4) {
          if (imageData[index + 3] > 0) {
            count += 1;
          }
        }

        return count;
      });

      assert.ok(
        nonTransparentPixelCount > 8000,
        `Expected visible province fill pixels when using province names, received ${nonTransparentPixelCount}`
      );

      diagnostics.assertClean('map province fill name mapping');
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('form map picker shows a marker and writes coordinates after clicking the map', async () => {
  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await createContext(browser, server.baseUrl, VIEWPORTS[0], 'light');
    const page = await context.newPage();
    const diagnostics = attachPageDiagnostics(page, server.baseUrl);

    try {
      const response = await page.goto(`${server.baseUrl}/form?lang=zh-CN`, {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: 'domcontentloaded'
      });

      assert.ok(response, 'Expected navigation response for form map picker test');
      assert.equal(response.status(), 200, 'Expected form page to return HTTP 200');

      await waitForReactPage(page, '.report-form');
      await disableAnimations(page);

      await page.locator('.inline-actions .glass-button').first().click();
      await page.waitForSelector('.picker-map.leaflet-container', {
        timeout: NAVIGATION_TIMEOUT_MS
      });

      const pickerMap = page.locator('.picker-map');
      const pickerBox = await pickerMap.boundingBox();
      assert.ok(pickerBox, 'Expected the coordinate picker map to be visible');

      await pickerMap.click({
        position: {
          x: Math.round(Math.min(pickerBox.width - 48, Math.max(48, pickerBox.width * 0.5))),
          y: Math.round(Math.min(pickerBox.height - 48, Math.max(48, pickerBox.height * 0.45)))
        }
      });

      await page.waitForFunction(() => {
        const addressInput = document.querySelector('input[name="school_address"]');
        return Boolean(addressInput && /^latlng-?\d+\.\d+,-?\d+\.\d+$/.test(addressInput.value));
      }, null, {
        timeout: NAVIGATION_TIMEOUT_MS
      });

      const markerCount = await page.locator('.picker-map .picker-selected-point').count();
      assert.ok(markerCount >= 1, `Expected a visible picker marker after clicking the map, received ${markerCount}`);

      diagnostics.assertClean('form map picker interaction');
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('standalone form autocomplete panels stay hidden until suggestions are rendered', async () => {
  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await createContext(browser, server.baseUrl, VIEWPORTS[0], 'light');
    const page = await context.newPage();
    const diagnostics = attachPageDiagnostics(page, server.baseUrl);

    try {
      const response = await page.goto(`${server.baseUrl}/form/standalone?lang=zh-CN`, {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: 'domcontentloaded'
      });

      assert.ok(response, 'Expected navigation response for standalone autocomplete visibility test');
      assert.equal(response.status(), 200, 'Expected standalone form page to return HTTP 200');

      await waitForLegacyPage(page, '.standalone-report-form .form-section');
      await disableAnimations(page);

      const initialVisibility = await page.evaluate(() => {
        const schoolResults = document.getElementById('school_results_list');
        const addressResults = document.getElementById('address_results_list');

        function describe(element) {
          if (!(element instanceof HTMLElement)) {
            return null;
          }

          return {
            display: window.getComputedStyle(element).display,
            hidden: element.hidden,
            offsetHeight: element.offsetHeight,
            offsetWidth: element.offsetWidth
          };
        }

        return {
          address: describe(addressResults),
          school: describe(schoolResults)
        };
      });

      assert.deepEqual(initialVisibility.school, {
        display: 'none',
        hidden: true,
        offsetHeight: 0,
        offsetWidth: 0
      }, `Expected school autocomplete panel to stay hidden before input, received ${JSON.stringify(initialVisibility.school)}`);
      assert.deepEqual(initialVisibility.address, {
        display: 'none',
        hidden: true,
        offsetHeight: 0,
        offsetWidth: 0
      }, `Expected address autocomplete panel to stay hidden before input, received ${JSON.stringify(initialVisibility.address)}`);

      await page.fill('#school_input', 'Playwright');
      await page.waitForSelector('#school_results_list .result-item', {
        timeout: NAVIGATION_TIMEOUT_MS
      });

      const suggestionState = await page.evaluate(() => {
        const schoolResults = document.getElementById('school_results_list');
        const addressResults = document.getElementById('address_results_list');

        return {
          addressHidden: addressResults ? addressResults.hidden : null,
          schoolDisplay: schoolResults ? window.getComputedStyle(schoolResults).display : '',
          schoolHidden: schoolResults ? schoolResults.hidden : null,
          schoolItems: schoolResults ? schoolResults.querySelectorAll('.result-item').length : 0
        };
      });

      assert.equal(suggestionState.schoolHidden, false, 'Expected school autocomplete panel to become visible after input');
      assert.notEqual(suggestionState.schoolDisplay, 'none', 'Expected school autocomplete panel to render after input');
      assert.ok(suggestionState.schoolItems >= 1, `Expected at least one school suggestion, received ${suggestionState.schoolItems}`);
      assert.equal(suggestionState.addressHidden, true, 'Expected address autocomplete panel to remain hidden while school suggestions are open');

      await page.locator('body').click({
        position: { x: 16, y: 16 }
      });
      await page.waitForFunction(() => {
        const schoolResults = document.getElementById('school_results_list');
        const addressResults = document.getElementById('address_results_list');
        return Boolean(
          schoolResults
          && addressResults
          && schoolResults.hidden
          && addressResults.hidden
        );
      }, null, {
        timeout: NAVIGATION_TIMEOUT_MS
      });

      diagnostics.assertClean('standalone form autocomplete visibility');
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('standalone form birth year field does not stretch when other sex options expand', async () => {
  const app = loadApp({
    DEBUG_MOD: 'true',
    FRONTEND_VARIANT: 'react'
  });
  const server = await startServer(app);
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await createContext(browser, server.baseUrl, VIEWPORTS[0], 'light');
    const page = await context.newPage();
    const diagnostics = attachPageDiagnostics(page, server.baseUrl);

    try {
      const response = await page.goto(`${server.baseUrl}/form/standalone?lang=zh-CN`, {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: 'domcontentloaded'
      });

      assert.ok(response, 'Expected navigation response for standalone birth year field stretch test');
      assert.equal(response.status(), 200, 'Expected standalone form page to return HTTP 200');

      await waitForLegacyPage(page, '.standalone-report-form .form-section');
      await disableAnimations(page);

      await page.selectOption('#sexSelect', '__other_option__');
      await page.waitForFunction(() => {
        const otherSexFields = document.getElementById('otherSexFields');
        return Boolean(otherSexFields && !otherSexFields.hidden);
      }, null, {
        timeout: NAVIGATION_TIMEOUT_MS
      });

      const fieldMetrics = await page.evaluate(() => {
        const birthYearSelect = document.getElementById('birthYearSelect');
        const birthYearWrap = document.getElementById('birthYearSelectWrap');
        const sexSelect = document.getElementById('sexSelect');

        function rectOf(element) {
          if (!(element instanceof HTMLElement)) {
            return null;
          }

          const rect = element.getBoundingClientRect();
          return {
            height: Math.round(rect.height),
            width: Math.round(rect.width)
          };
        }

        return {
          birthYearSelect: rectOf(birthYearSelect),
          birthYearWrap: rectOf(birthYearWrap),
          sexSelect: rectOf(sexSelect)
        };
      });

      assert.ok(fieldMetrics.birthYearSelect, 'Expected the birth year select to exist');
      assert.ok(fieldMetrics.birthYearWrap, 'Expected the birth year wrapper to exist');
      assert.ok(fieldMetrics.sexSelect, 'Expected the sex select to exist');
      assert.ok(
        fieldMetrics.birthYearSelect.height <= 72,
        `Expected birth year select height to stay compact after expanding other sex options, received ${fieldMetrics.birthYearSelect.height}px`
      );
      assert.ok(
        fieldMetrics.birthYearWrap.height <= 80,
        `Expected birth year field wrapper height to stay compact after expanding other sex options, received ${fieldMetrics.birthYearWrap.height}px`
      );
      assert.ok(
        Math.abs(fieldMetrics.birthYearSelect.height - fieldMetrics.sexSelect.height) <= 8,
        `Expected birth year and sex selects to stay visually aligned, received ${JSON.stringify(fieldMetrics)}`
      );

      diagnostics.assertClean('standalone form birth year field stretch');
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
});
