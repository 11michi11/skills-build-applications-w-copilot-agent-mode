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
  return `${getApiBaseUrl()}/api/leaderboard/`
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

function Leaderboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(getApiEndpoint())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load leaderboard')
        }

        return response.json()
      })
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Leaderboard</p>
        <h2 className="h3 mb-1">Performance ranking</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint()}</p>
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
