-- Conectar a la base de datos gazel_db
\c gazel_db;

-- Definir tipos ENUM
CREATE TYPE status_enum AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TYPE role_enum AS ENUM ('USER', 'ADMIN');

CREATE TYPE cart_status_enum AS ENUM ('ACTIVE', 'CHECKED_OUT', 'ABANDONED');

CREATE TYPE order_status_enum AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

CREATE TYPE shipping_method_enum AS ENUM ('CORREOS_CR', 'UBER_FLASH', 'PICKUP');

CREATE TYPE payment_method_enum AS ENUM ('CARD', 'SINPE', 'CASH');

CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE users (
    id_user         SERIAL PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    phone           VARCHAR(20),
    role            role_enum NOT NULL DEFAULT 'USER',
    status          status_enum NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id_category SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    status      status_enum NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE products (
    id_product  SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    description TEXT,
    price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock       INTEGER NOT NULL CHECK (stock >= 0),
    image_url   TEXT,
    id_category INTEGER NOT NULL,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT fk_product_category
        FOREIGN KEY (id_category)
        REFERENCES categories (id_category)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE cart (
    id_cart     SERIAL PRIMARY KEY,
    id_user     INTEGER NULL,
    session_id  VARCHAR(100),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status      cart_status_enum NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT fk_cart_user
        FOREIGN KEY (id_user)
        REFERENCES users (id_user)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE cart_items (
    id_cart_item SERIAL PRIMARY KEY,
    id_cart      INTEGER NOT NULL,
    id_product   INTEGER NOT NULL,
    quantity     INTEGER NOT NULL CHECK (quantity > 0),
    unit_price   NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),

    CONSTRAINT fk_cartitem_cart
        FOREIGN KEY (id_cart)
        REFERENCES cart (id_cart)
        ON DELETE CASCADE,

    CONSTRAINT fk_cartitem_product
        FOREIGN KEY (id_product)
        REFERENCES products (id_product)
        ON DELETE RESTRICT,

    CONSTRAINT uq_cart_product UNIQUE (id_cart, id_product)
);

CREATE TABLE orders (
    id_order     SERIAL PRIMARY KEY,
    id_user      INTEGER NULL,
    order_date   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
    status       order_status_enum NOT NULL DEFAULT 'PENDING',

    CONSTRAINT fk_order_user
        FOREIGN KEY (id_user)
        REFERENCES users (id_user)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE order_items (
    id_order_item SERIAL PRIMARY KEY,
    id_order      INTEGER NOT NULL,
    id_product    INTEGER NOT NULL,
    quantity      INTEGER NOT NULL CHECK (quantity > 0),
    unit_price    NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),

    CONSTRAINT fk_orderitem_order
        FOREIGN KEY (id_order)
        REFERENCES orders (id_order)
        ON DELETE CASCADE,

    CONSTRAINT fk_orderitem_product
        FOREIGN KEY (id_product)
        REFERENCES products (id_product)
        ON DELETE RESTRICT
);

CREATE TABLE shipping_info (
    id_shipping     SERIAL PRIMARY KEY,
    id_order        INTEGER NOT NULL,
    full_name       VARCHAR(150) NOT NULL,
    identification VARCHAR(30) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    email           VARCHAR(150),
    province        VARCHAR(50) NOT NULL,
    canton          VARCHAR(50) NOT NULL,
    district        VARCHAR(50) NOT NULL,
    address_details TEXT NOT NULL,
    delivery_notes  TEXT,
    shipping_method shipping_method_enum NOT NULL,

    CONSTRAINT fk_shipping_order
        FOREIGN KEY (id_order)
        REFERENCES orders (id_order)
        ON DELETE CASCADE
);

CREATE TABLE payments (
    id_payment     SERIAL PRIMARY KEY,
    id_order       INTEGER NOT NULL,
    payment_method payment_method_enum NOT NULL,
    payment_status payment_status_enum NOT NULL DEFAULT 'PENDING',
    payment_date   TIMESTAMP,
    amount         NUMERIC(12,2) NOT NULL CHECK (amount >= 0),

    CONSTRAINT fk_payment_order
        FOREIGN KEY (id_order)
        REFERENCES orders (id_order)
        ON DELETE CASCADE
);

CREATE INDEX idx_products_category ON products (id_category);
CREATE INDEX idx_products_status ON products (status);
CREATE INDEX idx_cart_user ON cart (id_user);
CREATE INDEX idx_orders_user ON orders (id_user);
CREATE INDEX idx_orders_date ON orders (order_date);
CREATE INDEX idx_payments_status ON payments (payment_status);
