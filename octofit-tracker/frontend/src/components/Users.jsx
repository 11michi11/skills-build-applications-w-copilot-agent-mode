import { useEffect, useState } from 'react'
import { fetchResource, getApiEndpoint, normalizeItems } from '../lib/api.js'

function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('users')
      .then((payload) => setItems(normalizeItems(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <p className="text-uppercase text-success fw-semibold mb-2">Users</p>
        <h2 className="h3 mb-1">Community members</h2>
        <p className="text-secondary mb-4">Loaded from {getApiEndpoint('users')}</p>
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
