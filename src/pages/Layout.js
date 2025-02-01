import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './styles/Layout.module.css';
import FormsContainer from '../components/Forms/FormsContainer';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  return (
    <body className={styles["body"]}>
      {isAuthenticated && <Sidebar />}
      <main style={{
        flex: 1,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column', // Default for vertical layout
        // justifyContent: 'center',
        alignItems: 'stretch', // Ensure children stretch to full width
        width: '100%', // Explicitly set full width
      }}>
        <FormsContainer />
        <Outlet /> {/* Render child routes here */}
      </main>
    </body>
  )
  
  
};

export default Layout;
