# ✅ GAZEL Backend - Checklist y Comandos Rápidos

## 🎯 Checklist de Instalación

### Primera Vez
- [ ] Clonar/Descargar el proyecto
- [ ] `npm install` - Instalar dependencias
- [ ] `cp .env.example .env` - Copiar variables de entorno
- [ ] Verificar PostgreSQL corriendo en Docker (`docker-compose ps` en carpeta DB)
- [ ] `npm run prisma:generate` - Generar tipos de Prisma
- [ ] `npm run prisma:migrate` - Ejecutar migraciones
- [ ] `npm run start:dev` - Iniciar servidor
- [ ] Visitar http://localhost:3000 ✨

### Verificación
- [ ] Endpoint `/` responde
- [ ] Endpoint `/health` responde
- [ ] Puedo hacer POST a `/auth/register`
- [ ] Puedo hacer POST a `/auth/login`
- [ ] Puedo acceder a `/auth/profile` con token

---

## 🚀 Comandos Más Usados

### Desarrollo
```bash
npm run start:dev          # Inicia servidor con watch (recompila al guardar)
npm run build              # Compila para producción
npm run start              # Inicia servidor compilado
```

### Base de Datos
```bash
npm run prisma:generate    # Genera tipos TypeScript de Prisma
npm run prisma:migrate     # Ejecuta migraciones pendientes
npm run prisma:studio      # Abre GUI de Prisma (visualizar BD)
npm run prisma:db:push     # Sincroniza schema con BD (sin migraciones)
```

### Testing
```bash
npm test                   # Ejecuta tests una vez
npm run test:watch         # Ejecuta tests en modo watch
npm run test:cov           # Tests con cobertura
```

### Linting y Formato
```bash
npm run lint               # Revisa código con eslint
npm run lint:fix           # Arregla automáticamente issues
npm run format             # Formatea con prettier
```

---

## 🔍 Verificación Rápida

### Verificar que PostgreSQL está corriendo
```bash
# En la carpeta DB
docker-compose ps

# Resultado esperado:
# NAME        STATUS
# gazel_postgres  Up
```

### Verificar conexión a BD
```bash
npm run prisma:studio
# Si abre GUI → conexión OK
```

### Verificar servidor está corriendo
```bash
curl http://localhost:3000/health
# Respuesta esperada:
# {"status":"ok","timestamp":"2024-...","version":"1.0.0"}
```

---

## 🧪 Testing Endpoints Rápidos

### Test 1: Registrarse
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "password":"Test123!",
    "full_name":"Test User",
    "phone":"5555555555"
  }'
```

### Test 2: Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "password":"Test123!"
  }'
# Guardar el access_token que regresa
```

### Test 3: Ver Perfil (con token)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <PEGA_TOKEN_AQUI>"
```

### Test 4: Listar Productos
```bash
curl -X GET http://localhost:3000/products
```

### Test 5: Listar Categorías
```bash
curl -X GET http://localhost:3000/categories
```

---

## 🐛 Solución Rápida de Problemas

### Problema: "connect ECONNREFUSED 127.0.0.1:5432"
```bash
# PostgreSQL no está corriendo
cd ../DB
docker-compose up -d
docker-compose logs -f  # Ver logs para confirmar
```

### Problema: "password authentication failed"
```bash
# Credenciales incorrectas
# En .env, verifica:
DATABASE_URL="postgresql://postgres:gazel_password@localhost:5432/gazel_db"
```

### Problema: "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
npm install
```

### Problema: "EADDRINUSE :::3000" (puerto ocupado)
```bash
# El puerto 3000 ya está en uso
# Cambiar en .env:
PORT=3001  # O cualquier otro puerto disponible
```

### Problema: Migraciones fallando
```bash
# Resetear BD completamente
cd ../DB
docker-compose down -v  # ⚠️ Elimina datos
docker-compose up -d
npm run prisma:migrate
```

---

## 📋 Estructura de Respuestas

### Respuesta Exitosa (200)
```json
{
  "id_product": 1,
  "name": "Licra Deportiva",
  "price": "29.99",
  "status": "ACTIVE"
}
```

### Error (400) - Bad Request
```json
{
  "statusCode": 400,
  "message": "Stock insuficiente",
  "error": "Bad Request"
}
```

### Error (401) - Unauthorized
```json
{
  "statusCode": 401,
  "message": "Credenciales inválidas",
  "error": "Unauthorized"
}
```

### Error (404) - Not Found
```json
{
  "statusCode": 404,
  "message": "Producto no encontrado",
  "error": "Not Found"
}
```

---

## 🎁 Ejemplos de Requests Completos

### 1. Flujo Completo de Compra

```bash
# 1. Registrarse
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@test.com","password":"Test123!","full_name":"Juan"}'
# Guardar access_token

# 2. Listar productos
curl -X GET http://localhost:3000/products

# 3. Agregar al carrito (con token)
curl -X POST http://localhost:3000/cart/items \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id_product":1,"quantity":2}'

# 4. Ver carrito
curl -X GET http://localhost:3000/cart \
  -H "Authorization: Bearer TOKEN"

# 5. Crear orden
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id_cart":1,
    "full_name":"Juan Pérez",
    "phone":"5555555555",
    "email":"juan@test.com",
    "province":"San José",
    "canton":"San José",
    "district":"Catedral",
    "address_details":"Calle 1 #123",
    "shipping_method":"CORREOS_CR",
    "payment_method":"CARD",
    "total_amount":"59.98"
  }'
```

---

## 📊 Variables de Entorno (Referencia)

```env
# 🔑 Base de Datos (REQUERIDA)
DATABASE_URL="postgresql://postgres:gazel_password@localhost:5432/gazel_db"

# 🔐 JWT (CAMBIAR en PRODUCCIÓN)
JWT_SECRET="tu_secreto_muy_seguro_aqui_cambiar_en_produccion"
JWT_EXPIRATION="24h"

# 🖥️ Servidor
PORT=3000
NODE_ENV="development"

# 🔗 CORS
CORS_ORIGIN="http://localhost:5173"
```

---

## ⚡ Atajos de Desarrollo

### Resetear Todo (⚠️ Borra datos)
```bash
cd ../DB
docker-compose down -v
docker-compose up -d
cd ../GAZEL_Back
npm run prisma:migrate
npm run start:dev
```

### Limpiar y Reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

### Ver Schema Actual
```bash
npm run prisma:studio
# Se abre GUI de Prisma en http://localhost:5555
```

### Hacer Build de Producción
```bash
npm run build
npm start
```

---

## 📝 Notas Rápidas

### JWT Token
- Válido por 24 horas (configurable)
- Se incluye en header: `Authorization: Bearer <token>`
- Contiene: id_user, email, role

### Roles
- `USER` - Usuario normal (puede comprar)
- `ADMIN` - Administrador (puede crear/editar productos)

### Estados de Órdenes
- `PENDING` - Pendiente de pago
- `PAID` - Pagada
- `SHIPPED` - Enviada
- `COMPLETED` - Completada
- `CANCELLED` - Cancelada

### Estados de Carrito
- `ACTIVE` - Activo y siendo usado
- `CHECKED_OUT` - Convertido en orden
- `ABANDONED` - Abandonado

---

## 🎯 Tareas Comunes

### Crear Usuario Admin
```bash
# 1. Registrar usuario normal
# 2. Abrir Prisma Studio
npm run prisma:studio

# 3. En la tabla users, cambiar role a ADMIN
```

### Agregar Productos de Prueba
```bash
# 1. Abrir Prisma Studio
npm run prisma:studio

# 2. Crear categoría primero
# 3. Luego crear producto con id_category

# O usar SQL en DB/init/02-seedData.sql
```

### Ver Logs en Tiempo Real
```bash
# Docker logs
cd ../DB
docker-compose logs -f postgres

# App logs
npm run start:dev
# Todos los console.log aparecen aquí
```

---

## 🔄 Workflow Típico Diario

```bash
# 1. Comenzar
npm run start:dev

# 2. Durante desarrollo
# - Edita código
# - Auto-recompila (gracias a --watch)
# - Prueba en http://localhost:3000

# 3. Cambios en BD
npm run prisma:migrate

# 4. Antes de hacer commit
npm run lint:fix
npm test

# 5. Finalizar
# Ctrl+C para detener servidor
```

---

## 📞 Contacto/Ayuda

Si hay problemas:
1. Revisa **QUICKSTART.md** para instalación
2. Revisa **API_EXAMPLES.md** para ejemplos de requests
3. Revisa **PROJECT_STRUCTURE.md** para entender arquitectura
4. Consulta documentación oficial:
   - https://docs.nestjs.com/
   - https://www.prisma.io/docs/

---

## ✨ Tips Profesionales

1. **Siempre generar migraciones después de cambiar schema.prisma**
   ```bash
   npm run prisma:migrate
   ```

2. **Usar Postman/Insomnia para probar endpoints**
   - Importa colecciones de requests
   - Guarda variables de ambiente
   - Reutiliza tokens fácilmente

3. **Mantener .env como secreto**
   - Nunca commitear .env al git
   - Usar .env.example para plantilla
   - En CI/CD, setear variables de forma segura

4. **Logs útiles para debugging**
   ```typescript
   console.log('Debug:', variable);
   this.logger.log('Info', 'mensaje');
   this.logger.error('Error', 'mensaje');
   ```

5. **Testing endpoints con curl**
   ```bash
   curl -X METHOD http://localhost:3000/endpoint \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"field":"value"}'
   ```

---

**¡Ahora tienes todo para trabajar con GAZEL Backend! 🚀**
