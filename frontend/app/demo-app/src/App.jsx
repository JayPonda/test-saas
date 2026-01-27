import React from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>SaaS Demo Application</h1>
        <p>Simple Chat Interface</p>
      </header>
      <main className="app-main">
        <Chat />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 SaaS Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
