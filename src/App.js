import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './redux/AppProvider';
import Home from './pages/Home';
import LanguagePage from './pages/LanguagePage';
import NotePage from './pages/NotePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AppProvider> {/* Wrap the app with AppProvider */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={ isAuthenticated? <Home/> : <LoginPage />}>
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
