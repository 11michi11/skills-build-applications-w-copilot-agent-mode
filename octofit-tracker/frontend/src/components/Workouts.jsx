import { useEffect, useState } from 'react'
import { fetchResource, getApiEndpoint, normalizeItems } from '../lib/api.js'

function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('workouts')
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Workouts</p>
        <h2 className="h3 mb-1">Workout library</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint('workouts')}</p>
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
