import { useEffect, useState } from 'react'

const localhostBaseUrl = 'http://localhost:8000'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (!codespaceName) {
    return localhostBaseUrl
  }

  return `https://${codespaceName}-8000.app.github.dev`
}

function getApiEndpoint() {
  return `${getApiBaseUrl()}/api/activities/`
}

function normalizeItems(payload) {
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

function Activities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(getApiEndpoint())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load activities')
        }

        return response.json()
      })
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
          <div>
            <p className="text-uppercase text-success fw-semibold mb-2">Activities</p>
            <h2 className="h3 mb-1">Activity log</h2>
            <p className="text-secondary mb-0">Loaded from {getApiEndpoint()}</p>
          </div>
        </div>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Minutes</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? `${item.activityType}-${item.performedAt}`}>
                  <td>{item.userId ?? item.user ?? 'Unknown'}</td>
                  <td>{item.activityType ?? item.type ?? 'Activity'}</td>
                  <td>{item.durationMinutes ?? item.duration ?? '—'}</td>
                  <td>{item.caloriesBurned ?? item.calories ?? '—'}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-secondary">No activities found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Activities
