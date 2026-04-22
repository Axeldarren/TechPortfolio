import { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import { Toaster } from './components/ui/toaster';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [page, setPage] = useState(() => localStorage.getItem('portfolio-page') || 'home');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-page', page);
  }, [page]);

  const goTo = (p) => {
    setPage(p);
    setTimeout(() => window.scrollTo(0, 0), 10);
  };

  const toggleTheme = () => setTheme(v => v === 'light' ? 'dark' : 'light');

  return (
    <>
      <Cursor />
      <Navbar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} goTo={goTo} />
      <main style={{ minHeight: '100vh' }}>
        {page === 'home'       && <HomePage goTo={goTo} />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'projects'   && <ProjectsPage />}
        {page === 'contact'    && <ContactPage />}
      </main>
      <Footer goTo={goTo} />
      <Toaster />
    </>
  );
}

export default App;
