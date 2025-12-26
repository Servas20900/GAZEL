# Base de Datos GAZEL

Base de datos PostgreSQL para el proyecto GAZEL - Tienda de Ropa Deportiva Femenina.

## 📋 Requisitos Previos

- Docker Desktop instalado
- Docker Compose

## 🚀 Iniciar la Base de Datos

```powershell
# Navegar al directorio DB
cd DB

# Levantar el contenedor
docker-compose up -d

# Ver logs para verificar que se inicializó correctamente
docker-compose logs -f
```

## 📊 Información de Conexión

- **Host**: localhost
- **Puerto**: 5432
- **Base de Datos**: gazel_db
- **Usuario**: postgres
- **Contraseña**: gazel_password

### String de Conexión

```
postgresql://postgres:gazel_password@localhost:5432/gazel_db
```

## 🛠️ Comandos Útiles

```powershell
# Ver estado de los contenedores
docker-compose ps

# Detener la base de datos
docker-compose stop

# Iniciar la base de datos
docker-compose start

# Detener y eliminar contenedores (mantiene los datos)
docker-compose down

# Eliminar todo incluyendo volúmenes (CUIDADO: borra todos los datos)
docker-compose down -v

# Ver logs en tiempo real
docker-compose logs -f postgres

# Conectarse a PostgreSQL desde línea de comandos
docker exec -it gazel_postgres psql -U postgres -d gazel_db
```

## 📁 Estructura de la Base de Datos

### Tablas Principales

1. **users**: Usuarios del sistema (clientes y administradores)
2. **categories**: Categorías de productos (Licras, Shorts, Parte Superior, Accesorios)
3. **products**: Catálogo de productos
4. **cart**: Carritos de compra
5. **cart_items**: Items en los carritos
6. **orders**: Órdenes de compra
7. **order_items**: Productos en cada orden
8. **shipping_info**: Información de envío
9. **payments**: Información de pagos

### ENUMs Definidos

- **status_enum**: ACTIVE, INACTIVE
- **role_enum**: USER, ADMIN
- **cart_status_enum**: ACTIVE, CHECKED_OUT, ABANDONED
- **order_status_enum**: PENDING, PAID, SHIPPED, COMPLETED, CANCELLED
- **shipping_method_enum**: CORREOS_CR, UBER_FLASH, PICKUP
- **payment_method_enum**: CARD, SINPE, CASH
- **payment_status_enum**: PENDING, APPROVED, REJECTED

## 🔧 Scripts de Inicialización

Los scripts SQL en la carpeta `init/` se ejecutan automáticamente al crear el contenedor por primera vez:

1. `00-createDB.sql`: Crea la base de datos gazel_db
2. `01-initDB.sql`: Crea todas las tablas, tipos e índices

## 🔄 Reiniciar la Base de Datos desde Cero

Si necesitas resetear completamente la base de datos:

```powershell
# Detener y eliminar todo (incluyendo volúmenes)
docker-compose down -v

# Levantar nuevamente (ejecutará los scripts de init)
docker-compose up -d
```

## 🩺 Health Check

El contenedor incluye un health check que verifica cada 10 segundos que PostgreSQL está funcionando correctamente.

```powershell
# Ver el estado de salud
docker inspect gazel_postgres --format='{{.State.Health.Status}}'
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Las credenciales en este archivo son para desarrollo local. 

Para producción:
- Cambiar contraseñas
- Usar variables de entorno o secrets
- Configurar SSL/TLS
- Restringir acceso por IP

## 🐛 Troubleshooting

### El puerto 5432 ya está en uso

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :5432

# Cambiar el puerto en docker-compose.yml
ports:
  - "5433:5432"  # Usar 5433 en vez de 5432
```

### Los scripts de inicialización no se ejecutan

Los scripts solo se ejecutan cuando el contenedor se crea por primera vez. Si ya existe el volumen de datos:

```powershell
docker-compose down -v  # Eliminar volúmenes
docker-compose up -d    # Recrear
```

### Errores de encoding

Si tienes problemas con caracteres especiales, verifica que tu terminal use UTF-8 y que los archivos SQL estén guardados en UTF-8.

## 🔗 Conexión desde el Backend

Ejemplo de configuración para Node.js:

```javascript
// .env
DATABASE_URL=postgresql://postgres:gazel_password@localhost:5432/gazel_db

// Ejemplo con pg o Prisma
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'gazel_db',
  user: 'postgres',
  password: 'gazel_password'
});
```
