import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './redux/AppProvider';
import Home from './pages/Home';
import Layout from './pages/Layout';
import LanguagePage from './pages/LanguagePage';
import NotePage from './pages/NotePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider> {/* Wrap the app with AppProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Default page */}
            <Route path=":language" element={<LanguagePage />}/>
            <Route path=":language/:note" element={<NotePage />} />
          </Route>
          <Route path="*" element={<NotFound page="Page" redirect="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
