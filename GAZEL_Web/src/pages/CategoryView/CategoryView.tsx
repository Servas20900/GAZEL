import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productsService } from '../../services/api';
import type { Product } from '../../types';
import './CategoryView.css';

const CategoryView: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('Productos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productsService.getAll() as Product[];
        
        // Si hay un parámetro de categoría, filtrar productos
        if (category) {
          // Convertir la URL slugificada a nombre normal
          // Ej: "parte-superior" -> "parte superior"
          const categorySearchTerm = category.replace(/-/g, ' ').toLowerCase();
          
          const filtered = allProducts.filter(p => 
            p.category.name.toLowerCase() === categorySearchTerm
          );
          setProducts(filtered);
          setCategoryName(filtered[0]?.category.name || 'Productos');
        } else {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="category-view">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="category-view">
      <div className="category-header">
        <h1 className="category-title">{categoryName}</h1>
        <p className="category-count">{products.length} productos encontrados</p>
      </div>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id_product} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No hay productos en esta categoría</h2>
          <p>Vuelve pronto para ver nuevos productos</p>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
