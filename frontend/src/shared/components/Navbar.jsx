import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    // Redirect based on user role
    if (user) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  };

  const navStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px'
  };

  const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '16px',
    transition: 'opacity 0.3s'
  };

  const buttonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={flexStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo - clickable */}
            <div
              onClick={handleLogoClick}
              style={{ 
                ...linkStyle, 
                fontSize: '20px', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Form Management
            </div>
            
            {user && (
              <>
                {isAdmin ? (
                  <Link to="/admin/dashboard" style={linkStyle}>
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/user/dashboard" style={linkStyle}>
                      Dashboard
                    </Link>
                    <Link to="/user/my-forms" style={linkStyle}>
                      My Forms
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <>
                <span style={{ fontSize: '14px' }}>
                  Welcome, {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} style={buttonStyle}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>
                  Login
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    backgroundColor: 'white',
                    color: '#3b82f6',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;