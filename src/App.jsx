import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import { Toaster } from './components/ui/toaster';

const titles = {
  home: 'Axel Darren Suryanto — Portfolio',
  experience: 'Experience — Axel Darren Suryanto',
  projects: 'Projects — Axel Darren Suryanto',
  contact: 'Contact — Axel Darren Suryanto',
};

function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname === '/' ? 'home' : pathname.slice(1);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e0c0a' : '#f5f2ee');
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = titles[page] || titles.home;
  }, [pathname, page]);

  const goTo = (p) => navigate(p === 'home' ? '/' : `/${p}`);

  const toggleTheme = () => setTheme(v => v === 'light' ? 'dark' : 'light');

  return (
    <>
      <Cursor />
      <Navbar page={page} theme={theme} toggleTheme={toggleTheme} goTo={goTo} />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage goTo={goTo} />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer goTo={goTo} />
      <Toaster />
    </>
  );
}

export default App;
