"""
# Prisma Migrations

Este archivo documenta las migraciones de la base de datos.

Las migraciones se ejecutan automáticamente con:
```
npm run prisma:migrate
```

## Historial de Migraciones

### Migration 1 - Initial Schema (2024-01-01)
- Crea todas las tablas principales
- Define relaciones entre tablas
- Crea índices para optimización
- Define tipos ENUM para estados

Tabla: users
- id_user (PK)
- email (UNIQUE)
- password_hash
- full_name
- phone
- role (USER/ADMIN)
- status (ACTIVE/INACTIVE)

Tabla: categories
- id_category (PK)
- name (UNIQUE)
- description
- status

Tabla: products
- id_product (PK)
- name
- description
- price
- stock
- image_url
- id_category (FK)
- status

Tabla: cart
- id_cart (PK)
- id_user (FK)
- session_id
- status (ACTIVE/CHECKED_OUT/ABANDONED)

Tabla: cart_items
- id_cart_item (PK)
- id_cart (FK)
- id_product (FK)
- quantity
- unit_price

Tabla: orders
- id_order (PK)
- id_user (FK)
- order_date
- total_amount
- status (PENDING/PAID/SHIPPED/COMPLETED/CANCELLED)

Tabla: order_items
- id_order_item (PK)
- id_order (FK)
- id_product (FK)
- quantity
- unit_price

Tabla: shipping_info
- id_shipping (PK)
- id_order (FK, UNIQUE)
- full_name
- identification
- phone
- email
- province
- canton
- district
- address_details
- delivery_notes
- shipping_method

Tabla: payments
- id_payment (PK)
- id_order (FK)
- payment_method
- payment_status
- amount
- payment_date
"""
