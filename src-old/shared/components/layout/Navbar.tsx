import { useAuth } from '../../../shared/hooks/useAuth'
import Button from '../ui/Button'

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
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </nav>
  )
}
