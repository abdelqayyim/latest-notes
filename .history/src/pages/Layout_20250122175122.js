import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './styles/Layout.module.css';
import FormsContainer from '../components/Forms/FormsContainer';

const Layout = () => (
  <body className={styles["body"]}>
    <Sidebar />
    <main style={{
        flex: 1,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column', // Default for vertical layout
        // justifyContent: 'center',
        alignItems: 'stretch', // Ensure children stretch to full width
        width: '100%', // Explicitly set full width
    }}>
      <Form
      <Outlet /> {/* Render child routes here */}
    </main>
  </body>
  
);

export default Layout;
