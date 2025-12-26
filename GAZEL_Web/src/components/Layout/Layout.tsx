import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import './Layout.css';

const Layout: React.FC = () => {
  const [asideOpen, setAsideOpen] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const closeAside = () => {
    setAsideOpen(false);
  };

  return (
    <div className="layout">
      <Header onMenuToggle={toggleAside} />
      <Aside isOpen={asideOpen} onClose={closeAside} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
