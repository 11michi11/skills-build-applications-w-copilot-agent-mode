import { useEffect, useState } from 'react'

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
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    fetch(apiEndpoint)
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
            <p className="text-secondary mb-0">Loaded from {apiEndpoint}</p>
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
