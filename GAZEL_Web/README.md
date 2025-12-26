# GAZEL - Tienda en Línea de Ropa Deportiva Femenina

![GAZEL](https://via.placeholder.com/1200x300/ef4444/FFFFFF?text=GAZEL+-+Ropa+Deportiva+Femenina)

##  Descripción

GAZEL es una aplicación web SPA (Single Page Application) desarrollada con React + TypeScript que ofrece una experiencia de compra completa para ropa deportiva femenina. Inspirada en las mejores prácticas de e-commerce de plataformas como Amazon y Shopify.

##  Características Principales

###  Funcionalidades de E-commerce
- **Catálogo de Productos**: Navegación por categorías (Licras, Shorts, Parte Superior, Accesorios)
- **Búsqueda de Productos**: Sistema de búsqueda en tiempo real
- **Detalles de Producto**: Galería de imágenes, descripción, selector de cantidad
- **Carrito de Compras**: Gestión completa con modificación de cantidades
- **Proceso de Checkout**: Formulario de información de entrega
- **Autenticación**: Sistema de login/registro con autocompletado de datos

###  Diseño y UX
- **Diseño Responsive**: Optimizado para móvil, tablet y escritorio
- **Layout Persistente**: Header fijo y menú lateral desplegable
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Feedback Visual**: Notificaciones de acciones del usuario

###  Arquitectura
- **Componentes Reutilizables**: Arquitectura modular y escalable
- **Context API**: Gestión de estado global (Carrito y Autenticación)
- **TypeScript**: Tipado estático para mayor confiabilidad
- **React Router**: Navegación SPA sin recargas de página

##  Tecnologías Utilizadas

- **React 18+**: Biblioteca principal de UI
- **TypeScript**: Superset de JavaScript con tipado estático
- **React Router DOM**: Manejo de rutas
- **Vite**: Build tool y servidor de desarrollo
- **CSS3**: Estilos personalizados con diseño responsive

##  Estructura del Proyecto

```
GAZEL_Web/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header/         # Barra de navegación superior
│   │   ├── Aside/          # Menú lateral de categorías
│   │   ├── Layout/         # Layout principal con Outlet
│   │   └── ProductCard/    # Tarjeta de producto
│   ├── pages/              # Vistas/Páginas principales
│   │   ├── Home/           # Página de inicio
│   │   ├── CategoryView/   # Vista de categoría
│   │   ├── ProductDetail/  # Detalle de producto
│   │   ├── Cart/           # Carrito de compras
│   │   ├── Checkout/       # Proceso de pago
│   │   ├── Auth/           # Login/Registro
│   │   ├── SearchResults/  # Resultados de búsqueda
│   │   └── OrderSuccess/   # Confirmación de orden
│   ├── context/            # Context API para estado global
│   │   ├── AuthContext.tsx # Contexto de autenticación
│   │   └── CartContext.tsx # Contexto del carrito
│   ├── types/              # Definiciones de TypeScript
│   │   └── index.ts        # Interfaces y tipos
│   ├── data/               # Datos mockeados
│   │   └── products.ts     # Productos de ejemplo
│   ├── App.tsx             # Componente principal con rutas
│   └── main.tsx            # Punto de entrada
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

##  Instalación y Configuración

### Prerrequisitos
- Node.js 16+ instalado
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias** 
   npm install

2. **Iniciar servidor de desarrollo**
   npm run dev

3. **Abrir en el navegador**
   http://localhost:5173

##  Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Vista previa de build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

##  Funcionalidades Detalladas

### 1. Navegación y Layout
- **Header fijo**: Siempre visible con búsqueda, carrito y usuario
- **Menú lateral (Aside)**: Se despliega/oculta con botón hamburguesa
- **Categorías**: Licras, Shorts, Parte Superior, Accesorios Deportivos

### 2. Productos
- **15 productos mockeados** organizados en 4 categorías
- **Búsqueda**: Busca por nombre o descripción
- **Filtrado**: Por categoría
- **Detalles completos**: Imágenes, descripción, precio, stock

### 3. Carrito de Compras
- **Agregar productos**: Desde detalle o card
- **Modificar cantidad**: Incrementar/decrementar
- **Eliminar productos**: Desde el carrito
- **Persistencia**: Guardado en localStorage
- **Cálculo automático**: Subtotal, envío, total

### 4. Checkout
- **Formulario validado**: Nombre, email, teléfono, dirección
- **Autocompletado**: Si el usuario está autenticado
- **Resumen de orden**: Productos, cantidades, totales
- **Confirmación**: Página de éxito con detalles

### 5. Autenticación
- **Login/Registro**: Formulario dual
- **Validación**: Email, contraseña, campos requeridos
- **Persistencia**: Usuario guardado en localStorage

##  Diseño Responsive

### Breakpoints
- **Desktop**: > 968px - Layout completo
- **Tablet**: 768px - 968px - Ajustes de grid
- **Mobile**: < 768px - Layout adaptado, menú overlay

### Características Responsive
- Grid adaptativo de productos (4 → 2 columnas)
- Menú lateral se convierte en overlay móvil
- Barra de búsqueda se reposiciona en móvil
- Imágenes y textos escalables

##  Integración con Backend (Futuro)

El código está preparado para integración con backend. Endpoints necesarios:

- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Detalle de producto
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/orders` - Crear orden

##  Estado Global

### CartContext
- `items`: Productos en el carrito
- `itemCount`: Total de items
- `total`: Total en pesos
- Métodos: addToCart, removeFromCart, updateQuantity, clearCart

### AuthContext
- `user`: Usuario actual
- `isAuthenticated`: Estado de autenticación
- Métodos: login, register, logout, updateProfile

##  Flujo de Compra

1. Usuario navega por categorías o busca productos
2. Selecciona un producto y ve detalles
3. Agrega producto al carrito
4. Revisa carrito y modifica si necesita
5. Procede al checkout y llena información
6. Confirma compra y ve página de confirmación


**GAZEL** - Ropa Deportiva Femenina 
