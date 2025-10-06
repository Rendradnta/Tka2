import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TokenAuth from './components/TokenAuth';
import Dashboard from './components/Dashboard';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';
import SubjectSelectionPage from './pages/SubjectSelectionPage';
import NotFoundPage from './pages/NotFoundPage';
import LeaderboardPage from './pages/LeaderboardPage'
import HistoryPage from './pages/HistoryPage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authData = localStorage.getItem('userAuth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          setIsAuthenticated(true);
          setUserName(parsed.name);
        } else {
          localStorage.removeItem('userAuth');
        }
      } catch (error) {
        localStorage.removeItem('userAuth');
      }
    }
  }, []);

  const handleAuthenticated = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('examResults');
    setIsAuthenticated(false);
    setUserName('');
  };

  if (!isAuthenticated) {
    return <TokenAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard userName={userName} onLogout={handleLogout} />} />
        <Route path="/dashboard" element={<Dashboard userName={userName} onLogout={handleLogout} />} />
        {/* PERUBAHAN DI SINI: Menambahkan :category sebagai parameter */}
        <Route path="/subject-selection/:category" element={<SubjectSelectionPage />} />
        <Route path="/exam/:subjectId" element={<ExamPage />} />
        <Route path="/result/:subjectId" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;