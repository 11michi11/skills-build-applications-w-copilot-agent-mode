import { useEffect, useState } from 'react'
import { fetchResource, getApiEndpoint, normalizeItems } from '../lib/api.js'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('leaderboard')
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Leaderboard</p>
        <h2 className="h3 mb-1">Performance ranking</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint('leaderboard')}</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Participant</th>
                <th>Type</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? `${item.participantName}-${item.rank}`}>
                  <td>{item.rank ?? '—'}</td>
                  <td>{item.participantName ?? 'Unknown'}</td>
                  <td>{item.participantType ?? 'user'}</td>
                  <td>{item.points ?? '—'}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-secondary">No leaderboard entries found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
