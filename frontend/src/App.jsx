import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import Chatbot from './components/shared/Chatbot'
import { authService } from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = authService.getCurrentUser();
    if (loggedUser) {
      setUser(loggedUser);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleNavigate('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return <DashboardPage 
          user={user}
          onOpenChat={() => setIsChatOpen(true)} 
          onLogout={handleLogout} 
        />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-gold/30">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} user={user} />
      
      <main>
        {renderPage()}
      </main>

      {['home'].includes(currentPage) && <Footer onNavigate={handleNavigate} />}
      
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default App
