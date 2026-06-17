import { useEffect, useState } from 'react'
import { fetchResource, getApiEndpoint, normalizeItems } from '../lib/api.js'

function Teams() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('teams')
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Teams</p>
        <h2 className="h3 mb-1">Team roster</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint('teams')}</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="row g-3">
          {items.map((item) => (
            <div className="col-lg-6" key={item._id ?? item.name}>
              <div className="border rounded-3 p-3 bg-light h-100">
                <h3 className="h5 mb-2">{item.name ?? 'Team'}</h3>
                <p className="text-secondary mb-2">{item.challengeFocus ?? 'Challenge focus not set.'}</p>
                <div className="small text-secondary">Members: {(item.memberIds ?? []).length}</div>
              </div>
            </div>
          ))}
          {items.length === 0 ? <div className="text-secondary">No teams found.</div> : null}
        </div>
      </div>
    </section>
  )
}

export default Teams
