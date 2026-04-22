import { httpServerHandler } from 'cloudflare:node'
import { readFileSync } from 'node:fs'
import app from './app/server.js'
import runtimeContext from './app/services/runtimeContext.js'

// Workers 入口主要做两件额外工作：
// 1. 直接托管大体积 cn.json；
// 2. （已退役）旧版 /api/map-data 完整性修补逻辑保留注释，当前地图数据已改为前端直接读取公开 JSON。
const REFERRER_POLICY = 'strict-origin-when-cross-origin'
const CHINA_GEOJSON_PATH = '/bundle/public/cn.json'
const textEncoder = new TextEncoder()
let chinaGeoJsonPayload = null
let chinaGeoJsonBytes = null

// Workers 里仍显式拉起 nodeHandler，对维护者来说要牢记：
// 绝大多数业务逻辑仍跑在 Express 层，Workers 这里只做入口级补丁。
app.listen(3000)

const nodeHandler = httpServerHandler({ port: 3000 })

function fetchWithRuntimeContext(request, env, ctx) {
  return runtimeContext.runWithRuntimeContext({ env, ctx }, () => nodeHandler.fetch(request, env, ctx))
}

function getChinaGeoJsonPayload() {
  if (chinaGeoJsonPayload === null) {
    // 读出后立刻 parse + stringify，可把 bundle 中格式差异统一成稳定 JSON 字符串。
    const source = readFileSync(CHINA_GEOJSON_PATH, 'utf8')
    chinaGeoJsonPayload = JSON.stringify(JSON.parse(source))
  }

  return chinaGeoJsonPayload
}

function getChinaGeoJsonBytes() {
  if (chinaGeoJsonBytes === null) {
    chinaGeoJsonBytes = textEncoder.encode(getChinaGeoJsonPayload())
  }

  return chinaGeoJsonBytes
}

function buildIntegrityCacheControlHeader(existingValue) {
  const normalizedValue = String(existingValue || '').trim()

  if (!normalizedValue) {
    return 'no-transform'
  }

  if (normalizedValue.toLowerCase().includes('no-transform')) {
    return normalizedValue
  }

  return `${normalizedValue}, no-transform`
}

export default {
  async fetch(request, env, ctx) {
    const requestUrl = new URL(request.url)

    if (requestUrl.pathname === '/cn.json') {
      const body = getChinaGeoJsonBytes()

      return new Response(body, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=0, no-transform',
          'Content-Length': String(body.byteLength),
          'Referrer-Policy': REFERRER_POLICY
        }
      })
    }

    /*
    if (requestUrl.pathname === '/api/map-data') {
      // Retired: the application no longer proxies map aggregation through the backend.
      // Keep the previous integrity workaround here as a reference in case a backend map API returns.
      const response = await fetchWithRuntimeContext(request, env, ctx)

      return rebuildResponseWithHeaders(response, {
        'Cache-Control': buildIntegrityCacheControlHeader(response.headers.get('Cache-Control')),
        'Referrer-Policy': REFERRER_POLICY
      })
    }
    */

    return fetchWithRuntimeContext(request, env, ctx)
  }
}
