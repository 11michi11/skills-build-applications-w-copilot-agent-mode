import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

const logoPath = '/docs/octofitapp-small.png'

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark border-bottom border-success border-opacity-25 shadow-sm">
        <div className="container py-2">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={logoPath} alt="OctoFit Tracker" width="32" height="32" />
            <span>OctoFit Tracker</span>
          </Link>
          <div className="navbar-nav ms-auto gap-lg-3">
            <Link className="nav-link" to="/">Dashboard</Link>
            <Link className="nav-link" to="/activity">Activity</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="row align-items-center g-4">
                <div className="col-lg-7">
                  <p className="text-uppercase text-success fw-semibold mb-2">Multi-tier fitness platform</p>
                  <h1 className="display-4 fw-bold text-dark mb-3">Track workouts, teams, and leaderboard progress in one place.</h1>
                  <p className="lead text-secondary mb-4">
                    React 19 and Bootstrap power the presentation tier, while the API tier is ready for Express, TypeScript, and Mongoose.
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link className="btn btn-success btn-lg" to="/activity">Start tracking</Link>
                    <Link className="btn btn-outline-secondary btn-lg" to="/teams">Manage teams</Link>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <img src={logoPath} alt="OctoFit logo" width="56" height="56" />
                        <div>
                          <h2 className="h4 mb-1">OctoFit Tracker</h2>
                          <p className="text-secondary mb-0">Frontend ready on port 5173</p>
                        </div>
                      </div>
                      <ul className="list-unstyled mb-0 text-secondary">
                        <li className="mb-2">React 19 + Vite</li>
                        <li className="mb-2">Bootstrap styling</li>
                        <li>react-router-dom navigation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/activity"
            element={<section className="card border-0 shadow-sm"><div className="card-body p-4"><h2 className="h3">Activity</h2><p className="text-secondary mb-0">Workout logging will connect to the backend API.</p></div></section>}
          />
          <Route
            path="/teams"
            element={<section className="card border-0 shadow-sm"><div className="card-body p-4"><h2 className="h3">Teams</h2><p className="text-secondary mb-0">Team management and leaderboard views will be built here.</p></div></section>}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
