import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1>MKN Management System</h1>
      </div>

      <div className="navbar__actions">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button>Login</button>
        )}
      </div>
    </nav>
  )
}
