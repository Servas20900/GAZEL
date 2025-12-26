# GAZEL Backend - Guía de Inicio Rápido

## 🚀 Instalación Rápida

### En Windows:
```powershell
.\setup.bat
```

### En macOS/Linux:
```bash
bash setup.sh
```

### O Manualmente:
```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Generar tipos de Prisma
npm run prisma:generate

# 4. Ejecutar migraciones (asegúrate que PostgreSQL está corriendo)
npm run prisma:migrate

# 5. Iniciar el servidor
npm run start:dev
```

## ✅ Verificar que todo funciona

Una vez que el servidor esté corriendo, visita:
- http://localhost:3000 - Respuesta básica
- http://localhost:3000/health - Estado del servidor

## 📚 Endpoints Principales

### Autenticación
```bash
POST /auth/register
POST /auth/login
GET /auth/profile (requiere token)
```

### Productos
```bash
GET /products
GET /products/:id
GET /products/category/:categoryId
POST /products (solo admin)
```

### Categorías
```bash
GET /categories
GET /categories/:id
POST /categories (solo admin)
```

### Carrito
```bash
GET /cart (requiere token)
POST /cart/items (requiere token)
PUT /cart/items/:itemId (requiere token)
DELETE /cart/items/:itemId (requiere token)
```

### Órdenes
```bash
POST /orders (requiere token)
GET /orders (requiere token)
GET /orders/:id (requiere token)
```

### Pagos
```bash
GET /payments/order/:orderId (requiere token)
POST /payments/order/:orderId/process (requiere token)
```

## 🔐 Ejemplo de Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

Respuesta:
```json
{
  "id_user": 1,
  "email": "usuario@ejemplo.com",
  "full_name": "Juan Pérez",
  "role": "USER",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🛒 Ejemplo de Agregar al Carrito

```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "id_product": 1,
    "quantity": 2
  }'
```

## 🎯 Próximos Pasos

1. **Completar integraciones de pagos**: Integrar Stripe, Wompi o PayU
2. **Agregar Swagger/OpenAPI**: Para documentación automática de API
3. **Implementar búsqueda avanzada**: Filtros, paginación, ordenamiento
4. **Agregar imágenes de productos**: Integración con Cloudinary o S3
5. **Implementar notificaciones**: Emails de confirmación de orden
6. **Testing**: Agregar tests unitarios e integración

## 🆘 Solución de Problemas

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
PostgreSQL no está corriendo. En la carpeta DB:
```bash
docker-compose up -d
```

### Error: "No pg_hba.conf entry for..."
Las credenciales de la BD son incorrectas. Verifica `.env`:
```env
DATABASE_URL="postgresql://postgres:gazel_password@localhost:5432/gazel_db"
```

### Prisma no genera tipos
```bash
npm run prisma:generate
```

## 📖 Documentación Útil

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Authentication](https://jwt.io/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
