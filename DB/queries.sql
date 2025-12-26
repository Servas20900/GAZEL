-- GAZEL Database - Queries Útiles

-- CONSULTAS DE PRODUCTOS

-- Ver todos los productos con su categoría
SELECT 
    p.id_product,
    p.name AS producto,
    p.price,
    p.stock,
    c.name AS categoria,
    p.status
FROM products p
JOIN categories c ON p.id_category = c.id_category
ORDER BY c.name, p.name;

-- Productos por categoría
SELECT 
    p.id_product,
    p.name,
    p.price,
    p.stock
FROM products p
JOIN categories c ON p.id_category = c.id_category
WHERE c.name = 'Licras'
ORDER BY p.name;

-- Productos con bajo stock (menos de 10)
SELECT 
    p.name,
    p.stock,
    c.name AS categoria
FROM products p
JOIN categories c ON p.id_category = c.id_category
WHERE p.stock < 10
ORDER BY p.stock;

-- Buscar productos por nombre
SELECT 
    id_product,
    name,
    price,
    stock
FROM products
WHERE name ILIKE '%deportivo%'
ORDER BY name;

-- CONSULTAS DE CARRITOS

-- Ver carrito de un usuario con items
SELECT 
    c.id_cart,
    u.full_name AS usuario,
    p.name AS producto,
    ci.quantity,
    ci.unit_price,
    (ci.quantity * ci.unit_price) AS subtotal
FROM cart c
LEFT JOIN users u ON c.id_user = u.id_user
JOIN cart_items ci ON c.id_cart = ci.id_cart
JOIN products p ON ci.id_product = p.id_product
WHERE c.status = 'ACTIVE'
ORDER BY c.id_cart, p.name;

-- Total de un carrito específico
SELECT 
    c.id_cart,
    SUM(ci.quantity * ci.unit_price) AS total
FROM cart c
JOIN cart_items ci ON c.id_cart = ci.id_cart
WHERE c.id_cart = 1
GROUP BY c.id_cart;

-- CONSULTAS DE ÓRDENES

-- Ver todas las órdenes con detalles
SELECT 
    o.id_order,
    u.full_name AS cliente,
    o.order_date,
    o.total_amount,
    o.status AS estado_orden,
    COUNT(oi.id_order_item) AS cantidad_productos
FROM orders o
LEFT JOIN users u ON o.id_user = u.id_user
JOIN order_items oi ON o.id_order = oi.id_order
GROUP BY o.id_order, u.full_name, o.order_date, o.total_amount, o.status
ORDER BY o.order_date DESC;

-- Detalle de una orden específica
SELECT 
    o.id_order,
    u.full_name AS cliente,
    u.email,
    o.order_date,
    p.name AS producto,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS subtotal,
    o.total_amount AS total_orden
FROM orders o
LEFT JOIN users u ON o.id_user = u.id_user
JOIN order_items oi ON o.id_order = oi.id_order
JOIN products p ON oi.id_product = p.id_product
WHERE o.id_order = 1
ORDER BY p.name;

-- Órdenes por estado
SELECT 
    status,
    COUNT(*) AS cantidad,
    SUM(total_amount) AS monto_total
FROM orders
GROUP BY status
ORDER BY cantidad DESC;

-- CONSULTAS DE USUARIOS

-- Todos los usuarios con sus órdenes
SELECT 
    u.id_user,
    u.full_name,
    u.email,
    u.role,
    COUNT(o.id_order) AS total_ordenes,
    COALESCE(SUM(o.total_amount), 0) AS monto_total_gastado
FROM users u
LEFT JOIN orders o ON u.id_user = o.id_user
GROUP BY u.id_user, u.full_name, u.email, u.role
ORDER BY monto_total_gastado DESC;

-- ESTADÍSTICAS Y REPORTES

-- Productos más vendidos
SELECT 
    p.name AS producto,
    SUM(oi.quantity) AS unidades_vendidas,
    SUM(oi.quantity * oi.unit_price) AS ingresos_totales
FROM order_items oi
JOIN products p ON oi.id_product = p.id_product
GROUP BY p.id_product, p.name
ORDER BY unidades_vendidas DESC
LIMIT 10;

-- Ventas por categoría
SELECT 
    c.name AS categoria,
    COUNT(oi.id_order_item) AS productos_vendidos,
    SUM(oi.quantity * oi.unit_price) AS ingresos
FROM categories c
JOIN products p ON c.id_category = p.id_category
JOIN order_items oi ON p.id_product = oi.id_product
GROUP BY c.id_category, c.name
ORDER BY ingresos DESC;

-- Ingresos por mes
SELECT 
    DATE_TRUNC('month', order_date) AS mes,
    COUNT(*) AS total_ordenes,
    SUM(total_amount) AS ingresos_totales
FROM orders
WHERE status != 'CANCELLED'
GROUP BY mes
ORDER BY mes DESC;

-- 
-- QUERIES DE ADMINISTRACIÓN

-- Verificar integridad de stock
SELECT 
    p.id_product,
    p.name,
    p.stock AS stock_actual,
    COALESCE(SUM(ci.quantity), 0) AS en_carritos_activos
FROM products p
LEFT JOIN cart_items ci ON p.id_product = ci.id_product
LEFT JOIN cart c ON ci.id_cart = c.id_cart AND c.status = 'ACTIVE'
GROUP BY p.id_product, p.name, p.stock
HAVING p.stock < COALESCE(SUM(ci.quantity), 0)
ORDER BY p.name;

-- Carritos abandonados (más de 7 días sin actividad)
SELECT 
    c.id_cart,
    c.created_at,
    COUNT(ci.id_cart_item) AS items_en_carrito,
    SUM(ci.quantity * ci.unit_price) AS valor_potencial
FROM cart c
JOIN cart_items ci ON c.id_cart = ci.id_cart
WHERE c.status = 'ACTIVE'
  AND c.created_at < NOW() - INTERVAL '7 days'
GROUP BY c.id_cart, c.created_at
ORDER BY valor_potencial DESC;

-- Productos sin ventas
SELECT 
    p.id_product,
    p.name,
    p.price,
    p.stock,
    c.name AS categoria
FROM products p
JOIN categories c ON p.id_category = c.id_category
LEFT JOIN order_items oi ON p.id_product = oi.id_product
WHERE oi.id_product IS NULL
  AND p.status = 'ACTIVE'
ORDER BY c.name, p.name;

-- QUERIES PARA INSERTS/UPDATES

-- Agregar un producto al carrito (ejemplo)
INSERT INTO cart_items (id_cart, id_product, quantity, unit_price)
VALUES (1, 1, 2, 18500.00)
ON CONFLICT (id_cart, id_product) 
DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity;

-- Actualizar stock después de una venta
UPDATE products 
SET stock = stock - 2
WHERE id_product = 1 AND stock >= 2;

-- Crear una nueva orden
INSERT INTO orders (id_user, total_amount, status)
VALUES (1, 37000.00, 'PENDING')
RETURNING id_order;

-- Actualizar estado de orden
UPDATE orders 
SET status = 'PAID'
WHERE id_order = 1;

-- QUERIES DE LIMPIEZA

-- Eliminar carritos abandonados (más de 30 días)
DELETE FROM cart
WHERE status = 'ACTIVE'
  AND created_at < NOW() - INTERVAL '30 days';

-- Marcar productos sin stock como INACTIVE
UPDATE products
SET status = 'INACTIVE'
WHERE stock = 0;
