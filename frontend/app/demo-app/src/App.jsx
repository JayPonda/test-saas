import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionId, clearSessionId } from './store'; // Import actions
import { sessionService } from './service'; // Import sessionService
import Users from './components/Users';
import Subscriptions from './components/Subscriptions';
import Payments from './components/Payments';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sessionUser, setSessionUser] = useState(null);
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.session.sessionId); // Get sessionId from Redux

  useEffect(() => {
    // Initialize sessionUser from localStorage (if any)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setSessionUser(storedUserId);
    }
    // No need to set sessionId here, Redux store handles it from localStorage directly
  }, []);

  const handleLogin = async () => {
    try {
      // Hardcoded user_id for demonstration purposes
      const userIdToLogin = 1;
      await sessionService.createSession(userIdToLogin); // This dispatches setSessionId internally
      localStorage.setItem('userId', userIdToLogin);
      setSessionUser(userIdToLogin);
      alert('Logged in successfully!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Check console for details.');
    }
  };

  const handleLogout = async () => {
    try {
      if (sessionId) {
        await sessionService.deleteSession(sessionId); // This dispatches clearSessionId internally
      }
      localStorage.removeItem('userId');
      setSessionUser(null);
      setCurrentPage('dashboard');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Check console for details.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <Users />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'payments':
        return <Payments />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>⚙️ SaaS Admin Dashboard</h1>
            <p>Enterprise Management System</p>
          </div>
          {sessionUser ? (
            <div className="user-session">
              <span>User ID: {sessionUser}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="user-session">
              <button className="login-btn" onClick={handleLogin}>Login as User 1</button>
            </div>
          )}
        </div>
      </header>

      <div className="app-layout">
        <aside className="app-sidebar">
          <nav className="sidebar-nav">
            <h3 className="nav-title">DASHBOARD</h3>
            <button
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Analytics</span>
            </button>

            <h3 className="nav-title">MANAGEMENT</h3>
            <button
              className={`nav-item ${currentPage === 'users' ? 'active' : ''}`}
              onClick={() => setCurrentPage('users')}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">Users</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'subscriptions' ? 'active' : ''}`}
              onClick={() => setCurrentPage('subscriptions')}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-label">Subscriptions</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'payments' ? 'active' : ''}`}
              onClick={() => setCurrentPage('payments')}
            >
              <span className="nav-icon">💳</span>
              <span className="nav-label">Payments</span>
            </button>
          </nav>
        </aside>

        <main className="app-main">
          {renderPage()}
        </main>
      </div>

      <footer className="app-footer">
        <p>© 2026 SaaS Admin Dashboard. Backend API: http://localhost:8080/api</p>
      </footer>
    </div>
  );
}

export default App;
