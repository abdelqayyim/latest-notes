import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './styles/Layout.module.css';
import FormsContainer from '../components/Forms/FormsContainer';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  return (
    <div className={styles.body}>
      {isAuthenticated && <Sidebar />}
      <main className={styles.main}>
        <Navbar />
        <FormsContainer />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
