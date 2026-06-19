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
  return `${getApiBaseUrl()}/api/users/`
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

function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(getApiEndpoint())
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load users')
        }

        return response.json()
      })
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Users</p>
        <h2 className="h3 mb-1">Community members</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint()}</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Weekly goal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? item.email}>
                  <td>{`${item.firstName ?? ''} ${item.lastName ?? ''}`.trim() || 'Unknown'}</td>
                  <td>{item.email ?? '—'}</td>
                  <td>{item.role ?? 'member'}</td>
                  <td>{item.weeklyGoalMinutes ?? '—'} min</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-secondary">No users found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Users
