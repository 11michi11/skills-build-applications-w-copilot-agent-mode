const localhostBaseUrl = 'http://localhost:8000'

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (!codespaceName) {
    return localhostBaseUrl
  }

  return `https://${codespaceName}-8000.app.github.dev`
}

export function getApiEndpoint(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`
}

export async function fetchResource(resource) {
  const response = await fetch(getApiEndpoint(resource))

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}`)
  }

  return response.json()
}

export function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}
