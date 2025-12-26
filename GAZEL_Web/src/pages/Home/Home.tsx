import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productsService } from '../../services/api';
import type { Product } from '../../types';
import './Home.css';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productsService.getAll() as Product[];
        // Tomar los primeros 8 productos como destacados
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">GAZEL</h1>
          <p className="hero-subtitle">Ropa Deportiva Femenina</p>
          <p className="hero-description">
            Descubre nuestra colección de ropa deportiva diseñada para mujeres activas y dinámicas.
            Comodidad, estilo y rendimiento en cada prenda.
          </p>
          <div className="hero-buttons">
            <Link to="/category/licras" className="btn btn-primary">
              Ver Colección
            </Link>
            <Link to="/category/parte-superior" className="btn btn-secondary">
              Explorar Tops
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <h2 className="section-title">Compra por Categoría</h2>
        <div className="categories-grid">
          <Link to="/category/licras" className="category-card">
            <div className="category-image" style={{ backgroundColor: '#1f2937' }}>
              <span className="category-icon">👖</span>
            </div>
            <h3>Licras</h3>
            <p>Alta compresión y comodidad</p>
          </Link>

          <Link to="/category/shorts" className="category-card">
            <div className="category-image" style={{ backgroundColor: '#ef4444' }}>
              <span className="category-icon">🩳</span>
            </div>
            <h3>Shorts</h3>
            <p>Libertad de movimiento</p>
          </Link>

          <Link to="/category/parte-superior" className="category-card">
            <div className="category-image" style={{ backgroundColor: '#8b5cf6' }}>
              <span className="category-icon">👕</span>
            </div>
            <h3>Parte Superior</h3>
            <p>Tops y camisetas deportivas</p>
          </Link>

          <Link to="/category/accesorios" className="category-card">
            <div className="category-image" style={{ backgroundColor: '#10b981' }}>
              <span className="category-icon">🎒</span>
            </div>
            <h3>Accesorios</h3>
            <p>Complementa tu outfit</p>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id_product} product={product} />
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/category/licras" className="btn btn-outline">
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Envío Gratis</h3>
            <p>En compras superiores a $100.000</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Cambios Fáciles</h3>
            <p>30 días para cambios y devoluciones</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Pago Seguro</h3>
            <p>Protegemos tus datos personales</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Múltiples Pagos</h3>
            <p>Aceptamos todas las tarjetas</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
