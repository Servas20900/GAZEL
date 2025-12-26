#  Estructura de Base de Datos GAZEL

## Diagrama de Relaciones

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ id_user (PK)    │
│ full_name       │
│ email           │
│ password_hash   │
│ phone           │
│ role            │──┐
│ status          │  │
│ created_at      │  │
└─────────────────┘  │
        │            │
        │            │
        ├────────────┼───────────────┐
        │            │               │
        ▼            ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌──────────────┐
│    CART     │  │   ORDERS    │  │   SHIPPING   │
├─────────────┤  ├─────────────┤  │     INFO     │
│ id_cart(PK) │  │id_order(PK) │  ├──────────────┤
│ id_user(FK) │  │id_user(FK)  │  │id_shipping(PK)│
│ session_id  │  │ order_date  │  │id_order(FK)  │
│ created_at  │  │total_amount │  │ full_name    │
│ status      │  │ status      │  │identification│
└─────────────┘  └─────────────┘  │ phone        │
        │               │          │ email        │
        │               │          │ province     │
        │               │          │ canton       │
        ▼               ▼          │ district     │
┌─────────────┐  ┌─────────────┐  │address_details│
│ CART_ITEMS  │  │ORDER_ITEMS  │  │delivery_notes│
├─────────────┤  ├─────────────┤  │shipping_method│
│id_cart_item │  │id_order_item│  └──────────────┘
│ (PK)        │  │ (PK)        │
│id_cart(FK)  │  │id_order(FK) │  ┌──────────────┐
│id_product   │  │id_product   │  │   PAYMENTS   │
│ (FK)        │  │ (FK)        │  ├──────────────┤
│ quantity    │  │ quantity    │  │id_payment(PK)│
│ unit_price  │  │ unit_price  │  │id_order(FK)  │
└─────────────┘  └─────────────┘  │payment_method│
        │               │          │payment_status│
        │               │          │payment_date  │
        │               │          │ amount       │
        │               │          └──────────────┘
        │               │
        └───────┬───────┘
                │
                ▼
        ┌─────────────┐
        │  PRODUCTS   │
        ├─────────────┤
        │id_product   │
        │ (PK)        │
        │ name        │
        │ description │
        │ price       │
        │ stock       │
        │ image_url   │
        │id_category  │
        │ (FK)        │
        │ status      │
        └─────────────┘
                │
                ▼
        ┌─────────────┐
        │ CATEGORIES  │
        ├─────────────┤
        │id_category  │
        │ (PK)        │
        │ name        │
        │ description │
        │ status      │
        └─────────────┘
```

##  Descripción de Tablas

###  USERS
Almacena información de usuarios (clientes y administradores)
- **Relaciones**: 
  - 1:N con CART
  - 1:N con ORDERS

###  CATEGORIES
Categorías de productos (Licras, Shorts, Parte Superior, Accesorios)
- **Relaciones**: 
  - 1:N con PRODUCTS

###  PRODUCTS
Catálogo de productos de la tienda
- **Relaciones**: 
  - N:1 con CATEGORIES
  - 1:N con CART_ITEMS
  - 1:N con ORDER_ITEMS

###  CART
Carritos de compra (activos, finalizados o abandonados)
- **Relaciones**: 
  - N:1 con USERS
  - 1:N con CART_ITEMS

###  CART_ITEMS
Items individuales dentro de cada carrito
- **Relaciones**: 
  - N:1 con CART
  - N:1 con PRODUCTS

###  ORDERS
Órdenes de compra generadas
- **Relaciones**: 
  - N:1 con USERS
  - 1:N con ORDER_ITEMS
  - 1:1 con SHIPPING_INFO
  - 1:N con PAYMENTS

###  ORDER_ITEMS
Productos incluidos en cada orden
- **Relaciones**: 
  - N:1 con ORDERS
  - N:1 con PRODUCTS

###  SHIPPING_INFO
Información de envío para cada orden
- **Relaciones**: 
  - 1:1 con ORDERS

###  PAYMENTS
Información de pagos realizados
- **Relaciones**: 
  - N:1 con ORDERS

##  Tipos ENUM

### status_enum
- `ACTIVE` - Activo
- `INACTIVE` - Inactivo

### role_enum
- `USER` - Usuario normal
- `ADMIN` - Administrador

### cart_status_enum
- `ACTIVE` - Carrito activo
- `CHECKED_OUT` - Carrito procesado
- `ABANDONED` - Carrito abandonado

### order_status_enum
- `PENDING` - Pendiente
- `PAID` - Pagada
- `SHIPPED` - Enviada
- `COMPLETED` - Completada
- `CANCELLED` - Cancelada

### shipping_method_enum
- `CORREOS_CR` - Correos de Costa Rica
- `UBER_FLASH` - Uber Flash
- `PICKUP` - Recoger en tienda

### payment_method_enum
- `CARD` - Tarjeta
- `SINPE` - SINPE Móvil
- `CASH` - Efectivo

### payment_status_enum
- `PENDING` - Pendiente
- `APPROVED` - Aprobado
- `REJECTED` - Rechazado

##  Índices Creados

Para optimizar las consultas más frecuentes:

```sql
idx_products_category    -- Búsqueda de productos por categoría
idx_products_status      -- Filtrado de productos activos
idx_cart_user            -- Carritos de un usuario
idx_orders_user          -- Órdenes de un usuario
idx_orders_date          -- Órdenes por fecha
idx_payments_status      -- Filtrado de pagos por estado
```

##  Flujo Típico de Compra

1. **Usuario navega productos** → `PRODUCTS` + `CATEGORIES`
2. **Agrega al carrito** → `CART` + `CART_ITEMS`
3. **Procede al checkout** → `CART.status = 'CHECKED_OUT'`
4. **Crea orden** → `ORDERS` + `ORDER_ITEMS`
5. **Completa info de envío** → `SHIPPING_INFO`
6. **Realiza pago** → `PAYMENTS`
7. **Orden procesada** → `ORDERS.status = 'PAID'`
8. **Actualiza stock** → `PRODUCTS.stock -= quantity`

##  Constraints y Reglas

### Check Constraints
- `products.price >= 0` - Precio no puede ser negativo
- `products.stock >= 0` - Stock no puede ser negativo
- `cart_items.quantity > 0` - Cantidad debe ser mayor a 0
- `order_items.quantity > 0` - Cantidad debe ser mayor a 0

### Foreign Keys
- `ON DELETE CASCADE` - Eliminar en cascada (cart_items, order_items, shipping_info, payments)
- `ON DELETE RESTRICT` - Prevenir eliminación (products en cart_items/order_items)
- `ON DELETE SET NULL` - Establecer NULL (users en cart/orders)

### Unique Constraints
- `users.email` - Email único por usuario
- `categories.name` - Nombre único de categoría
- `(cart_items.id_cart, cart_items.id_product)` - Un producto solo una vez por carrito
