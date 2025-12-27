import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthContext';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import Navbar from './shared/components/Navbar';
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes - Will add later */}
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute>
                  <div className="container" style={{ padding: '32px 16px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>User Dashboard</h1>
                    <p style={{ marginTop: '16px' }}>Welcome to user dashboard!</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes - Will add later */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly>
                  <div className="container" style={{ padding: '32px 16px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Admin Dashboard</h1>
                    <p style={{ marginTop: '16px' }}>Welcome to admin dashboard!</p>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;