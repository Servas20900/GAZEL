# GAZEL Backend - API Examples

Ejemplos de requests para la API. Puedes usar Postman, Insomnia o curl.

## 1. AUTENTICACIÓN

### Registrarse
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Password123!",
    "full_name": "Juan Pérez",
    "phone": "5555555555"
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

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Password123!"
  }'
```

### Ver Perfil
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 2. CATEGORÍAS

### Listar todas las categorías
```bash
curl -X GET http://localhost:3000/categories
```

Respuesta:
```json
[
  {
    "id_category": 1,
    "name": "Licras",
    "description": "Pantalones deportivos",
    "status": "ACTIVE",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Obtener una categoría específica
```bash
curl -X GET http://localhost:3000/categories/1
```

### Crear categoría (solo admin)
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Accesorios",
    "description": "Accesorios deportivos"
  }'
```

### Actualizar categoría (solo admin)
```bash
curl -X PUT http://localhost:3000/categories/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Licras Premium",
    "description": "Licras de alta calidad"
  }'
```

### Eliminar categoría (solo admin)
```bash
curl -X DELETE http://localhost:3000/categories/1 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 3. PRODUCTOS

### Listar todos los productos
```bash
curl -X GET http://localhost:3000/products
```

### Listar productos con filtros
```bash
curl -X GET "http://localhost:3000/products?id_category=1&search=licras&status=ACTIVE"
```

### Obtener producto específico
```bash
curl -X GET http://localhost:3000/products/1
```

### Listar productos por categoría
```bash
curl -X GET http://localhost:3000/products/category/1
```

### Crear producto (solo admin)
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Licra Deportiva Negra",
    "description": "Licra de algodón y elastano",
    "price": "29.99",
    "stock": 50,
    "image_url": "https://ejemplo.com/licra.jpg",
    "id_category": 1
  }'
```

### Actualizar producto (solo admin)
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "price": "34.99",
    "stock": 45
  }'
```

### Eliminar producto (solo admin)
```bash
curl -X DELETE http://localhost:3000/products/1 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 4. CARRITO

### Ver carrito
```bash
curl -X GET http://localhost:3000/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Respuesta:
```json
{
  "id_cart": 1,
  "id_user": 1,
  "status": "ACTIVE",
  "items": [
    {
      "id_cart_item": 1,
      "id_product": 1,
      "quantity": 2,
      "unit_price": "29.99",
      "product": {
        "id_product": 1,
        "name": "Licra Deportiva",
        "price": "29.99"
      }
    }
  ],
  "total": "59.98",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Agregar item al carrito
```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_product": 1,
    "quantity": 2
  }'
```

### Actualizar cantidad de item
```bash
curl -X PUT http://localhost:3000/cart/items/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "quantity": 3
  }'
```

### Eliminar item del carrito
```bash
curl -X DELETE http://localhost:3000/cart/items/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Vaciar carrito
```bash
curl -X DELETE http://localhost:3000/cart/1/clear \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 5. ÓRDENES

### Ver mis órdenes
```bash
curl -X GET http://localhost:3000/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ver orden específica
```bash
curl -X GET http://localhost:3000/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Crear orden
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_cart": 1,
    "full_name": "Juan Pérez García",
    "identification": "12345678",
    "phone": "5555555555",
    "email": "juan@ejemplo.com",
    "province": "San José",
    "canton": "San José",
    "district": "Catedral",
    "address_details": "Calle 1, Avenida 2, Casa 123",
    "delivery_notes": "Entregar en la puerta",
    "shipping_method": "CORREOS_CR",
    "payment_method": "CARD",
    "total_amount": "59.98"
  }'
```

Respuesta:
```json
{
  "id_order": 1,
  "id_user": 1,
  "order_date": "2024-01-01T00:00:00.000Z",
  "total_amount": "59.98",
  "status": "PENDING",
  "items": [
    {
      "id_order_item": 1,
      "id_product": 1,
      "quantity": 2,
      "unit_price": "29.99",
      "product": {
        "id_product": 1,
        "name": "Licra Deportiva"
      }
    }
  ],
  "shipping": {
    "id_shipping": 1,
    "full_name": "Juan Pérez García",
    "phone": "5555555555",
    "province": "San José",
    "address_details": "Calle 1, Avenida 2, Casa 123"
  },
  "payments": [
    {
      "id_payment": 1,
      "payment_method": "CARD",
      "payment_status": "PENDING",
      "amount": "59.98"
    }
  ]
}
```

### Actualizar estado de orden (solo admin)
```bash
curl -X PUT http://localhost:3000/orders/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "status": "SHIPPED"
  }'
```

Estados válidos: PENDING, PAID, SHIPPED, COMPLETED, CANCELLED

---

## 6. PAGOS

### Ver pago de una orden
```bash
curl -X GET http://localhost:3000/payments/order/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Procesar pago
```bash
curl -X POST http://localhost:3000/payments/order/1/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "payment_method": "CARD",
    "amount": "59.98",
    "payment_reference": "TXN-123456"
  }'
```

### Actualizar estado de pago (solo admin)
```bash
curl -X PUT http://localhost:3000/payments/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "status": "APPROVED"
  }'
```

Estados válidos: PENDING, APPROVED, REJECTED

---

## 7. HEALTH CHECK

### Ver estado del servidor
```bash
curl -X GET http://localhost:3000/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

---

## Notas sobre los Tokens

1. Todos los endpoints que requieren autenticación necesitan el header:
   ```
   Authorization: Bearer <token>
   ```

2. El token se obtiene en login o register y es válido por 24 horas

3. Para admin endpoints, el usuario debe tener role: "ADMIN"

4. Si el token expira, recibirás error 401 y deberás hacer login nuevamente

---

## Errores Comunes

- **400 Bad Request**: Datos inválidos o incompletos
- **401 Unauthorized**: Token faltante o inválido
- **403 Forbidden**: No tienes permisos para esta acción
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: El recurso ya existe (email duplicado)
- **422 Unprocessable Entity**: Datos que no pasan la validación
- **500 Internal Server Error**: Error del servidor
