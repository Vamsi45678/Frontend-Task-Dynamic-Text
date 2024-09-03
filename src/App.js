import React from 'react';
import Home from './Home';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Text Overlay App</h1>
      </header>
      <main className="app-main">
        <Home />
      </main>
    </div>
  );
};

export default App;
