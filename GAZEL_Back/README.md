# GAZEL Backend

Backend API para GAZEL - Tienda de Ropa Deportiva Femenina

## 🛠️ Tecnologías

- **Node.js** + **TypeScript**
- **NestJS** - Framework backend
- **Prisma** - ORM para manejo de BD
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- PostgreSQL corriendo (ver instrucciones en `../DB/README.md`)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Iniciar servidor en desarrollo
npm run start:dev
```

## 📊 Configuración de Base de Datos

La conexión está configurada en el archivo `.env`. La conexión por defecto es:

```
postgresql://postgres:gazel_password@localhost:5432/gazel_db
```

## 🗂️ Estructura del Proyecto

```
src/
├── auth/                  # Módulo de autenticación
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── dtos/
├── categories/            # Módulo de categorías
├── products/              # Módulo de productos
├── users/                 # Módulo de usuarios
├── cart/                  # Módulo de carrito
├── orders/                # Módulo de órdenes
├── payments/              # Módulo de pagos
├── shipping/              # Módulo de envíos
├── common/                # Utilidades comunes
│   ├── guards/
│   ├── decorators/
│   └── pipes/
├── config/                # Configuración
│   └── database.config.ts
├── app.module.ts          # Módulo principal
└── main.ts                # Punto de entrada
```

## 📚 API Endpoints

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login
- `GET /auth/profile` - Perfil del usuario autenticado

### Productos
- `GET /products` - Listar productos
- `GET /products/:id` - Detalle de producto
- `GET /products/category/:categoryId` - Productos por categoría
- `POST /products` - Crear producto (solo admin)
- `PUT /products/:id` - Actualizar producto (solo admin)

### Categorías
- `GET /categories` - Listar categorías
- `GET /categories/:id` - Detalle de categoría
- `POST /categories` - Crear categoría (solo admin)

### Carrito
- `GET /cart` - Obtener carrito del usuario
- `POST /cart` - Crear/actualizar carrito
- `POST /cart/items` - Agregar item al carrito
- `PUT /cart/items/:itemId` - Actualizar cantidad del item
- `DELETE /cart/items/:itemId` - Eliminar item del carrito

### Órdenes
- `GET /orders` - Listar órdenes del usuario
- `GET /orders/:id` - Detalle de orden
- `POST /orders` - Crear orden

### Pagos
- `POST /payments` - Procesar pago
- `GET /payments/:id` - Detalle de pago

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluir el token en el header:

```
Authorization: Bearer <tu_token_aqui>
```

## 📝 Variables de Entorno

```env
# Base de datos
DATABASE_URL="postgresql://user:password@host:port/dbname"

# JWT
JWT_SECRET="tu_secreto_aqui"
JWT_EXPIRATION="24h"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

## 🧪 Tests

```bash
# Ejecutar tests
npm run test

# Tests en watch mode
npm run test:watch

# Coverage
npm run test:cov
```

## 🔨 Comandos Útiles

```bash
# Generar tipos de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Abrir Prisma Studio (GUI para BD)
npm run prisma:studio

# Compilar para producción
npm run build

# Iniciar en producción
npm run start:prod
```

## 📚 Documentación

Para más detalles sobre la estructura de la base de datos, ver [DATABASE_SCHEMA.md](../DB/DATABASE_SCHEMA.md)

## 👥 Equipo

Team GAZEL
