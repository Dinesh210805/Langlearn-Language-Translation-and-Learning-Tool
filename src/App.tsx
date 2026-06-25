import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TextTranslation from './pages/TextTranslation';
import VoiceTranslation from './pages/VoiceTranslation';
import Learning from './pages/Learning';
import Practice from './pages/Practice';
import Chatbot from './pages/Chatbot';
import Achievements from './pages/Achievements';
import History from './pages/History';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-root min-h-screen">
        <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translate/text" element={<TextTranslation />} />
            <Route path="/translate/voice" element={<VoiceTranslation />} />
            <Route path="/learn" element={<Learning />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
