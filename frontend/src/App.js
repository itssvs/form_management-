import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './modules/auth/context/AuthContext';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import Navbar from './shared/components/Navbar';
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/Register';
import UserDashboard from './modules/user/pages/UserDashboard';
import FormSubmission from './modules/user/pages/FormSubmission';
import MyForms from './modules/user/pages/MyForms';
import AdminDashboard from './modules/admin/pages/AdminDashboard';

// Home redirect component
function HomeRedirect() {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/user/dashboard"} replace />;
  }
  
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <Navbar />
          <Routes>
            {/* Home route with smart redirect */}
            <Route path="/" element={<HomeRedirect />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user/submit-form" 
              element={
                <ProtectedRoute>
                  <FormSubmission />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user/my-forms" 
              element={
                <ProtectedRoute>
                  <MyForms />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
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