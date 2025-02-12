import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LanguagePage from './pages/LanguagePage';
import NotePage from './pages/NotePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoute><Home /></PrivateRoute> } /> 
            <Route path=":language" element={ <PrivateRoute><LanguagePage /></PrivateRoute>}/>
            <Route path=":language/:note" element={<PrivateRoute><NotePage /></PrivateRoute>} />
        </Route>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<NotFound page="Page" redirect="/" />} />
        </Routes>
      </Router>
  );
}

export default App;
