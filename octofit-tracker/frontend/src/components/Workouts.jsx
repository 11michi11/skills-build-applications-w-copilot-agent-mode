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

function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load workouts')
        }

        return response.json()
      })
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Workouts</p>
        <h2 className="h3 mb-1">Workout library</h2>
        <p className="text-secondary mb-4">Loaded from {apiEndpoint}</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="row g-3">
          {items.map((item) => (
            <div className="col-lg-4" key={item._id ?? item.title}>
              <div className="border rounded-3 p-3 bg-light h-100">
                <h3 className="h5 mb-2">{item.title ?? 'Workout'}</h3>
                <p className="text-secondary mb-2">{item.description ?? 'No description available.'}</p>
                <div className="small text-secondary">{item.focusArea ?? 'Focus'} · {item.durationMinutes ?? '—'} min · {item.difficulty ?? '—'}</div>
              </div>
            </div>
          ))}
          {items.length === 0 ? <div className="text-secondary">No workouts found.</div> : null}
        </div>
      </div>
    </section>
  )
}

export default Workouts
