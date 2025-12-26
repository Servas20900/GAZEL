import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id_product}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className="product-image" />
          {product.stock < 5 && product.stock > 0 && (
            <span className="stock-badge low-stock">¡Últimas unidades!</span>
          )}
          {product.stock === 0 && <span className="stock-badge out-of-stock">Agotado</span>}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
