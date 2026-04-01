import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel'; // Import Admin
import { SiteProvider } from './context/SiteContext';
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

export default function App() {
  return (
    // Wrap the entire app in the Context Provider
    <SiteProvider> 
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </SiteProvider>
  );
}