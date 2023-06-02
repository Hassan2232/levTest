import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { useRoute } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLogin = !!token;
  const Route = useRoute(isLogin);

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          { Route }
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
