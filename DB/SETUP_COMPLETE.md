#  GAZEL Database - Configuración Completada

##  Estado: FUNCIONANDO

La base de datos PostgreSQL está completamente configurada y operativa para el proyecto GAZEL.

###  Componentes Instalados

1. **Docker Compose configurado** 
   - PostgreSQL 16
   - Contenedor: `gazel_postgres`
   - Puerto: 5432
   - Network: `gazel_network`
   - Volume persistente: `postgres_data`
   - Healthcheck configurado

2. **Base de datos creada**: `gazel_db`

3. **9 Tablas creadas**:
   - ✓ users
   - ✓ categories
   - ✓ products
   - ✓ cart
   - ✓ cart_items
   - ✓ orders
   - ✓ order_items
   - ✓ shipping_info
   - ✓ payments

4. **7 Tipos ENUM definidos**:
   - status_enum
   - role_enum
   - cart_status_enum
   - order_status_enum
   - shipping_method_enum
   - payment_method_enum
   - payment_status_enum

5. **6 Índices creados** para optimización

6. **Datos de prueba insertados**:
   - ✓ 4 Categorías
   - ✓ 15 Productos
   - ✓ 2 Usuarios demo

##  Archivos Creados

```
DB/
├── docker-compose.yml          # Configuración de Docker
├── .env.example               # Variables de entorno (template)
├── README.md                  # Documentación completa
├── QUICKSTART.md             # Guía de inicio rápido
├── DATABASE_SCHEMA.md        # Diagrama y estructura
├── queries.sql               # Queries útiles
├── SETUP_COMPLETE.md         # Este archivo
└── init/
    ├── 00-createDB.sql       # Crea la base de datos
    ├── initDB.sql            # Crea tablas y estructura
    └── 02-seedData.sql       # Inserta datos de prueba
```

##  Información de Conexión

```
Host:     localhost
Port:     5432
Database: gazel_db
User:     postgres
Password: gazel_password

Connection String:
postgresql://postgres:gazel_password@localhost:5432/gazel_db
```

##  Próximos Pasos para el Backend

### 1. Crear el proyecto backend

```powershell
# Opción 1: Node.js + Express
cd ../GAZEL_Back
npm init -y
npm install express pg dotenv cors bcrypt jsonwebtoken

# Opción 2: Node.js + Express + TypeScript
npm install -D typescript @types/node @types/express ts-node nodemon
npx tsc --init

# Opción 3: Con Prisma ORM
npm install prisma @prisma/client
npx prisma init
```

### 2. Configurar variables de entorno

Crear archivo `.env` en GAZEL_Back:

```env
# Database
DATABASE_URL=postgresql://postgres:gazel_password@localhost:5432/gazel_db

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu-secret-key-super-segura

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Estructura sugerida del Backend

```
GAZEL_Back/
├── src/
│   ├── config/
│   │   └── database.ts       # Configuración de conexión DB
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Cart.ts
│   │   └── Order.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   └── orders.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── cartController.ts
│   │   └── orderController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── services/
│   │   └── emailService.ts
│   └── index.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

### 4. Ejemplo de conexión a la DB

#### Opción A: Con pg (PostgreSQL driver)

```javascript
// src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
```

#### Opción B: Con Prisma

```bash
# 1. Inicializar Prisma
npx prisma init

# 2. Actualizar DATABASE_URL en .env
DATABASE_URL="postgresql://postgres:gazel_password@localhost:5432/gazel_db"

# 3. Generar schema desde la DB existente
npx prisma db pull

# 4. Generar cliente de Prisma
npx prisma generate
```

### 5. Endpoints sugeridos

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile

Products:
GET    /api/products              # Listar todos
GET    /api/products/:id          # Ver detalle
GET    /api/products/category/:name # Por categoría
GET    /api/products/search?q=    # Búsqueda

Categories:
GET    /api/categories            # Listar todas

Cart:
GET    /api/cart                  # Ver carrito actual
POST   /api/cart/items            # Agregar item
PUT    /api/cart/items/:id        # Actualizar cantidad
DELETE /api/cart/items/:id        # Eliminar item
DELETE /api/cart                  # Vaciar carrito

Orders:
POST   /api/orders                # Crear orden
GET    /api/orders                # Listar órdenes del usuario
GET    /api/orders/:id            # Ver detalle de orden
PUT    /api/orders/:id/status     # Actualizar estado (admin)

Payments:
POST   /api/payments              # Procesar pago
GET    /api/payments/:orderId     # Info de pago
```

##  Testing de la DB

Puedes probar las queries desde la terminal:

```powershell
# Ver productos
docker exec gazel_postgres psql -U postgres -d gazel_db -c "SELECT * FROM products LIMIT 5;"

# Ver categorías
docker exec gazel_postgres psql -U postgres -d gazel_db -c "SELECT * FROM categories;"

# Conectarse interactivamente
docker exec -it gazel_postgres psql -U postgres -d gazel_db
```

##  Documentación Disponible

- **README.md** - Documentación completa con comandos y troubleshooting
- **QUICKSTART.md** - Guía rápida para iniciar
- **DATABASE_SCHEMA.md** - Estructura y relaciones de tablas
- **queries.sql** - Colección de queries útiles para desarrollo

##  Comandos Esenciales

```powershell
# Iniciar
cd DB
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose stop

# Reiniciar desde cero
docker-compose down -v
docker-compose up -d

# Ver estado
docker ps | findstr gazel
```

##  Verificación Final

Estado actual del sistema:

-  Contenedor corriendo: `gazel_postgres`
-  Estado: Healthy
-  Puerto: 5432 abierto
-  Base de datos: gazel_db creada
-  Tablas: 9 tablas creadas
-  Datos: 15 productos + 4 categorías
-  Conexión: Verificada y funcional

##  ¡Listo para el Backend!

La base de datos está completamente funcional y lista para que comiences a desarrollar el backend de GAZEL.

**Fecha de configuración**: 22 de Diciembre, 2025
**Configurado por**: GitHub Copilot
**Proyecto**: GAZEL - Tienda de Ropa Deportiva Femenina

---

Para cualquier duda, consulta los archivos de documentación en la carpeta DB/ o revisa los logs:
```powershell
docker-compose logs
```
