import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const logoPath = '/docs/octofitapp-small.png'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

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
                    <Link className="btn btn-success btn-lg" to="/activities">View activities</Link>
                    <Link className="btn btn-outline-secondary btn-lg" to="/leaderboard">View leaderboard</Link>
                  </div>
                  {!codespaceName ? (
                    <div className="alert alert-warning mt-4 mb-0" role="alert">
                      Define <strong>VITE_CODESPACE_NAME</strong> in <code>.env.local</code> to build Codespaces API URLs. A localhost fallback is used when it is unset.
                    </div>
                  ) : null}
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
                        <li className="mb-2">react-router-dom navigation</li>
                        <li>Codespaces-aware API URLs with localhost fallback</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/activities"
            element={<Activities />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
