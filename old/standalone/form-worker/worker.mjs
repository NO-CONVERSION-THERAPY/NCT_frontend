import { httpServerHandler } from 'cloudflare:node'
import app from '../../app/standaloneFormServer.js'
import runtimeContext from '../../app/services/runtimeContext.js'
import { rebuildResponseWithHeaders } from '../../app/services/workerResponse.mjs'

const REFERRER_POLICY = 'strict-origin-when-cross-origin'
const MAP_DATA_API_PATH = '/api/map-data'

app.listen(3000)

const nodeHandler = httpServerHandler({ port: 3000 })

function fetchWithRuntimeContext(request, env, ctx) {
  return runtimeContext.runWithRuntimeContext({ env, ctx }, () => nodeHandler.fetch(request, env, ctx))
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

    if (requestUrl.pathname === MAP_DATA_API_PATH) {
      const response = await fetchWithRuntimeContext(request, env, ctx)

      return rebuildResponseWithHeaders(response, {
        'Cache-Control': buildIntegrityCacheControlHeader(response.headers.get('Cache-Control')),
        'Referrer-Policy': REFERRER_POLICY
      })
    }

    return fetchWithRuntimeContext(request, env, ctx)
  }
}
