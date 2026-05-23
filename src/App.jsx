import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import { SiteProvider, useSiteData } from './context/SiteContext';

// --- ROUTE GUARDS ---
// 1. Protects routes that require ANY logged-in user
const RequireAuth = ({ children }) => {
  const { currentUser, loading } = useSiteData();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to="/signin" replace />;
  
  return children;
};

// 2. Protects routes that require ADMIN privileges
const RequireAdmin = ({ children }) => {
  const { currentUser, isAdmin, loading } = useSiteData();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser || !isAdmin) return <Navigate to="/" replace />;
  
  return children;
};

export default function App() {
  return (
    <SiteProvider> 
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            
            {/* User Protected Routes */}
            <Route 
              path="/account" 
              element={
                <RequireAuth>
                  <Account />
                </RequireAuth>
              } 
            />
            
            {/* Admin Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <RequireAdmin>
                  <AdminPanel />
                </RequireAdmin>
              } 
            />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </SiteProvider>
  );
}