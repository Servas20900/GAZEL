-- Conectar a la base de datos gazel_db
\c gazel_db;

-- Insertar categorías
INSERT INTO categories (name, description, status, created_at, updated_at) VALUES
('Licras', 'Licras deportivas de alta calidad para entrenamiento y yoga', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Shorts', 'Shorts deportivos cómodos y funcionales', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Parte Superior', 'Tops deportivos, bras y camisetas', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Accesorios', 'Accesorios deportivos complementarios', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock, image_url, id_category, status, created_at, updated_at) VALUES
-- Licras (usar el ID que corresponda de la tabla categories)
('Licra Deportiva Negro', 'Licra de alto rendimiento con tecnología de compresión, ideal para entrenamiento intenso', 18500.00, 25, 'https://leonisa.cr/cdn/shop/files/033314_700_1200x1500_nueva_1_480x.jpg?v=1747177765', (SELECT id_category FROM categories WHERE name = 'Licras'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Licra Deportiva Azul', 'Licra con diseño ergonómico y tejido transpirable', 17500.00, 30, 'https://assets.adidas.com/images/w_450,f_auto,q_auto/8d2817feec4340afb902c8df3f272728_9366/JI5514_23_hover_model.jpg', (SELECT id_category FROM categories WHERE name = 'Licras'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Licra Deportiva Rosa', 'Licra con control de abdomen y diseño moderno', 19000.00, 20, 'https://racketball.vtexassets.com/arquivos/ids/250509-800-auto?v=638899111609030000&width=800&height=auto&aspect=true', (SELECT id_category FROM categories WHERE name = 'Licras'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Licra Deportiva Morada', 'Licra de secado rápido con cintura alta', 18000.00, 22, 'https://assets.adidas.com/images/w_450,f_auto,q_auto/c900bc0c5685424ca9e7b063bb41cfa4_9366/JW7649_23_hover_model.jpg', (SELECT id_category FROM categories WHERE name = 'Licras'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Shorts
('Short Deportivo Negro', 'Short ligero y cómodo para entrenamientos de alta intensidad', 12500.00, 35, 'https://www.pionier.pe/assets/upload/producto/5130900286_2.jpg', (SELECT id_category FROM categories WHERE name = 'Shorts'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Short Deportivo Gris', 'Short con bolsillos laterales y tejido de secado rápido', 13000.00, 28, 'https://plazavea.vteximg.com.br/arquivos/ids/29113481-1000-1000/imageUrl_1.jpg?v=638527460650830000', (SELECT id_category FROM categories WHERE name = 'Shorts'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Short Deportivo Rojo', 'Short deportivo con compresión interna', 14000.00, 25, 'https://http2.mlstatic.com/D_NQ_NP_2X_987696-MCO87462918735_072025-T.webp', (SELECT id_category FROM categories WHERE name = 'Shorts'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Parte Superior
('Top Deportivo Negro', 'Top deportivo con soporte medio y diseño elegante', 15000.00, 30, 'https://siman.vtexassets.com/arquivos/ids/3944514/104037492-1.jpg?v=638121804763630000', (SELECT id_category FROM categories WHERE name = 'Parte Superior'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sports Bra Blanco', 'Bra deportivo de alto soporte para entrenamientos intensos', 16500.00, 25, 'https://siman.vtexassets.com/arquivos/ids/3881094/104037496-1.jpg?v=638104322812300000', (SELECT id_category FROM categories WHERE name = 'Parte Superior'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Camiseta Deportiva Verde', 'Camiseta técnica con tecnología anti-olor', 11500.00, 40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAc-mDCEQL3A8Kg1kpSJ-WLgh3J2ySuK0-IQ&s', (SELECT id_category FROM categories WHERE name = 'Parte Superior'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Top Deportivo Rosa', 'Top con espalda cruzada y soporte medio', 14500.00, 32, 'https://img.freepik.com/foto-gratis/maqueta-ropa-deportiva-top-deportivo-rosa-mujer_53876-95145.jpg', (SELECT id_category FROM categories WHERE name = 'Parte Superior'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Accesorios
('Banda para Cabeza', 'Banda elástica anti-sudor', 3500.00, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwXThQhYK5gTydXevNOmMwBi9-yGxlRqQeQ&s', (SELECT id_category FROM categories WHERE name = 'Accesorios'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Guantes de Entrenamiento', 'Guantes con agarre antideslizante', 8500.00, 35, 'https://www.sportline.cr/media/catalog/product/s/7/s7-1369826-001_slf_sl.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg', (SELECT id_category FROM categories WHERE name = 'Accesorios'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Botella Deportiva', 'Botella de 750ml libre de BPA', 5500.00, 60, 'https://www.deportica.com/wp-content/uploads/2022/08/EVTB2U801.jpg', (SELECT id_category FROM categories WHERE name = 'Accesorios'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Toalla Deportiva', 'Toalla de microfibra de secado rápido', 7500.00, 45, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI6Gh-uB02E5YJU1nAhUEegTzG_IJSXfjTXw&s', (SELECT id_category FROM categories WHERE name = 'Accesorios'), 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Crear un usuario de prueba (contraseña: password123)
-- Nota: Esta es una contraseña hash de bcrypt con salt rounds 10
INSERT INTO users (full_name, email, password_hash, phone, role, status, created_at, updated_at) VALUES
('Usuario Demo', 'demo@gazel.com', '$2b$10$YourHashedPasswordHere', '8888-8888', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Admin Demo', 'admin@gazel.com', '$2b$10$YourHashedPasswordHere', '8888-8889', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verificar los datos insertados
SELECT 'Categorías insertadas:' as mensaje;
SELECT id_category, name, status FROM categories;

SELECT 'Productos insertados:' as mensaje;
SELECT p.id_product, p.name, p.price, p.stock, c.name as categoria 
FROM products p 
JOIN categories c ON p.id_category = c.id_category
ORDER BY c.id_category, p.id_product;

SELECT 'Usuarios insertados:' as mensaje;
SELECT id_user, full_name, email, role FROM users;





-- TRUNCATE TABLE
--     products,
--     categories,
--     users
-- RESTART IDENTITY
-- CASCADE;

-- COMMIT;
