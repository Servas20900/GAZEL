# 🔗 Integración Frontend-Backend GAZEL

## 📡 Configuración Básica

### En el Frontend (GAZEL_Web)

```typescript
// src/config/api.ts o similar
export const API_BASE_URL = 'http://localhost:3000';

// O usar variable de entorno
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

En `package.json` del frontend:
```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

### Variables de Entorno Frontend

Crear `.env` en GAZEL_Web:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=GAZEL
```

---

## 🔐 Servicio de Autenticación (Frontend)

```typescript
// src/services/authService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: API_URL });

// Agregar token a todas las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (email: string, password: string, fullName: string) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      full_name: fullName,
      phone: ''
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
};

export default api;
```

---

## 🛍️ Servicio de Productos (Frontend)

```typescript
// src/services/productService.ts
import api from './authService';

export const productService = {
  // Obtener todos los productos
  getAll: async (filters?: { categoryId?: number; search?: string }) => {
    const response = await api.get('/products', { params: filters });
    return response.data;
  },

  // Obtener producto por ID
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Obtener productos por categoría
  getByCategory: async (categoryId: number) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  }
};

export default productService;
```

---

## 🏷️ Servicio de Categorías (Frontend)

```typescript
// src/services/categoryService.ts
import api from './authService';

export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;
```

---

## 🛒 Servicio de Carrito (Frontend)

```typescript
// src/services/cartService.ts
import api from './authService';

export const cartService = {
  // Obtener carrito del usuario
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Agregar item al carrito
  addItem: async (productId: number, quantity: number) => {
    const response = await api.post('/cart/items', {
      id_product: productId,
      quantity
    });
    return response.data;
  },

  // Actualizar cantidad de item
  updateItem: async (itemId: number, quantity: number) => {
    const response = await api.put(`/cart/items/${itemId}`, {
      quantity
    });
    return response.data;
  },

  // Eliminar item del carrito
  removeItem: async (itemId: number) => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  // Vaciar carrito
  clear: async (cartId: number) => {
    const response = await api.delete(`/cart/${cartId}/clear`);
    return response.data;
  }
};

export default cartService;
```

---

## 📋 Servicio de Órdenes (Frontend)

```typescript
// src/services/orderService.ts
import api from './authService';

export const orderService = {
  // Crear orden
  create: async (orderData: {
    id_cart: number;
    full_name: string;
    phone: string;
    email: string;
    province: string;
    canton: string;
    district: string;
    address_details: string;
    shipping_method: string;
    payment_method: string;
    total_amount: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obtener mis órdenes
  getMyOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Obtener orden por ID
  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

export default orderService;
```

---

## 💳 Servicio de Pagos (Frontend)

```typescript
// src/services/paymentService.ts
import api from './authService';

export const paymentService = {
  // Obtener información de pago
  getPayment: async (orderId: number) => {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  },

  // Procesar pago
  processPayment: async (orderId: number, paymentData: {
    payment_method: string;
    amount: string;
  }) => {
    const response = await api.post(
      `/payments/order/${orderId}/process`,
      paymentData
    );
    return response.data;
  }
};

export default paymentService;
```

---

## 🔄 Actualizar AuthContext (Frontend)

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export interface User {
  id_user: number;
  email: string;
  full_name: string;
  role: 'USER' | 'ADMIN';
  access_token: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('access_token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register(email, password, fullName);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
```

---

## 🛒 Actualizar CartContext (Frontend)

```typescript
// src/context/CartContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

export interface CartItem {
  id_cart_item: number;
  id_product: number;
  quantity: number;
  unit_price: string;
  product?: {
    id_product: number;
    name: string;
    price: string;
  };
}

export interface Cart {
  id_cart: number;
  id_user: number;
  status: string;
  items: CartItem[];
  total: string;
}

export interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (productId: number, quantity: number) => {
    try {
      await cartService.addItem(productId, quantity);
      await getCart();
    } catch (error) {
      throw error;
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    try {
      await cartService.updateItem(itemId, quantity);
      await getCart();
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await cartService.removeItem(itemId);
      await getCart();
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    if (cart) {
      try {
        await cartService.clear(cart.id_cart);
        setCart(null);
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      isLoading,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      getCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
```

---

## 📝 Ejemplo de Uso en Componente

```typescript
// src/pages/ProductDetail/ProductDetail.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirigir a login
      window.location.href = '/auth';
      return;
    }

    setIsLoading(true);
    try {
      await addItem(product.id_product, quantity);
      alert('¡Agregado al carrito!');
    } catch (error) {
      alert('Error al agregar al carrito');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      
      <div>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button 
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
};
```

---

## ✅ Checklist de Integración

- [ ] Instalar axios o fetch en frontend
- [ ] Crear servicios para cada entidad
- [ ] Actualizar AuthContext con API
- [ ] Actualizar CartContext con API
- [ ] Probar login/registro
- [ ] Probar agregar productos al carrito
- [ ] Probar crear orden
- [ ] Probar pagos
- [ ] Configurar CORS correcto en backend
- [ ] Configurar variables de entorno

---

## 🔒 Manejo de Errores

```typescript
// En cada servicio, capturar errores
try {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
} catch (error: any) {
  if (error.response?.status === 401) {
    throw new Error('Credenciales inválidas');
  }
  if (error.response?.status === 409) {
    throw new Error('El email ya está registrado');
  }
  throw new Error(error.response?.data?.message || 'Error desconocido');
}
```

---

## 🚀 Deploy

Cuando despliegues a producción:

```env
# Backend .env
CORS_ORIGIN="https://tudominio.com"
JWT_SECRET="secreto_seguro_muy_largo"
NODE_ENV="production"

# Frontend .env
VITE_API_URL="https://api.tudominio.com"
```

---

¡Ahora tu frontend y backend están completamente integrados! 🎉
