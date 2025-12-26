#  GAZEL Database - Inicio Rápido

##  Comandos Esenciales

```powershell
# Desde el directorio DB/
cd c:\Users\sebas\OneDrive\Desktop\Escritorio\Work\GAZEL\DB

# Iniciar
docker-compose up -d

# Detener
docker-compose stop

# Ver logs
docker-compose logs -f

# Reiniciar desde cero (BORRA TODOS LOS DATOS)
docker-compose down -v
docker-compose up -d
```

##  Información de Conexión

```
Host: localhost
Puerto: 5432
Database: gazel_db
Usuario: postgres
Contraseña: gazel_password

Connection String:
postgresql://postgres:gazel_password@localhost:5432/gazel_db
```

##  Datos de Prueba Incluidos

 **4 Categorías**
- Licras
- Shorts  
- Parte Superior
- Accesorios

 **15 Productos** (distribuidos en las categorías)

 **2 Usuarios de prueba**
- demo@gazel.com (USER)
- admin@gazel.com (ADMIN)
- Contraseña: password123 (debes hashear con bcrypt)

##  Estructura de Tablas

1. `users` - Usuarios del sistema
2. `categories` - Categorías de productos
3. `products` - Catálogo de productos
4. `cart` - Carritos de compra
5. `cart_items` - Items en carritos
6. `orders` - Órdenes de compra
7. `order_items` - Productos en órdenes
8. `shipping_info` - Información de envío
9. `payments` - Pagos

##  Comandos SQL Útiles

```powershell
# Conectarse a la DB
docker exec -it gazel_postgres psql -U postgres -d gazel_db

# Ver todas las tablas
docker exec gazel_postgres psql -U postgres -d gazel_db -c "\dt"

# Ver tipos ENUM
docker exec gazel_postgres psql -U postgres -d gazel_db -c "\dT+"

# Ver productos
docker exec gazel_postgres psql -U postgres -d gazel_db -c "SELECT * FROM products;"

# Ver categorías
docker exec gazel_postgres psql -U postgres -d gazel_db -c "SELECT * FROM categories;"
```

##  Para el Backend

### Node.js + Express

```javascript
// .env
DATABASE_URL=postgresql://postgres:gazel_password@localhost:5432/gazel_db

// Ejemplo con pg
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

### Prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### TypeORM

```typescript
// ormconfig.json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "gazel_password",
  "database": "gazel_db"
}
```

##  Verificar Estado

```powershell
# Ver si está corriendo
docker ps | findstr gazel

# Ver health status
docker inspect gazel_postgres --format='{{.State.Health.Status}}'
# Debe devolver: healthy
```

##  Solución de Problemas

**Error: Puerto 5432 en uso**
- Cambiar puerto en docker-compose.yml: `"5433:5432"`
- Actualizar connection string al puerto 5433

**Los scripts no se ejecutan**
- Los scripts solo corren en la primera creación
- Para re-ejecutar: `docker-compose down -v` luego `docker-compose up -d`

**No puedo conectarme**
- Verificar que Docker Desktop esté corriendo
- Verificar que el contenedor esté healthy
- Verificar firewall de Windows

##  Documentación Completa

Ver [README.md](README.md) para documentación detallada.
