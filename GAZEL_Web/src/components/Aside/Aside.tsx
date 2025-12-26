import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Aside.css';

interface AsideProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { name: 'Licras', path: '/category/licras' },
  { name: 'Shorts', path: '/category/shorts' },
  { name: 'Parte Superior', path: '/category/parte-superior' },
  { name: 'Accesorios Deportivos', path: '/category/accesorios' },
];

const Aside: React.FC<AsideProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="aside-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`aside ${isOpen ? 'aside-open' : ''}`}>
        <div className="aside-header">
          <h2>Categorías</h2>
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="aside-nav">
          <Link
            to="/"
            className={`aside-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Inicio</span>
          </Link>

          <div className="aside-divider">
            <span>Productos</span>
          </div>

          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`aside-link ${location.pathname === category.path ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{category.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Aside;
