import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Beta, Landing, Login, Chat, Register, Account, Characters } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing /> } />
        <Route path="/beta" element={<Beta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account/>}/>
        <Route path="/characters" element={<Characters/>}/>
      </Routes>
    </Router>
  );
};

export default App;