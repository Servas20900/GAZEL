#!/usr/bin/env node

/**
 * ███████╗ █████╗ ███████╗███████╗██╗         ██████╗ █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██████╗ 
 * ██╔════╝██╔══██╗╚════██║██╔════╝██║         ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝████╗  ██║██╔══██╗
 * █████╗  ███████║    ██╔╝█████╗  ██║         ██████╔╝███████║██║     █████╔╝ █████╗  ██╔██╗ ██║██║  ██║
 * ██╔══╝  ██╔══██║   ██╔╝ ██╔══╝  ██║         ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║
 * ██║     ██║  ██║  ██╔╝  ███████╗███████╗    ██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║ ╚████║██████╔╝
 * ╚═╝     ╚═╝  ╚═╝  ╚═╝   ╚══════╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ 
 * 
 * 🎯 Tienda en Línea de Ropa Deportiva Femenina
 * 🚀 Backend API con NestJS, TypeScript, Prisma y PostgreSQL
 */

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                       🎉 GAZEL BACKEND - BIENVENIDO 🎉                       ║
║                                                                              ║
║  Tienda en Línea de Ropa Deportiva Femenina - Backend API                   ║
║  Desarrollado con: NestJS | TypeScript | Prisma | PostgreSQL                ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 DOCUMENTACIÓN DISPONIBLE:

┌─ 🚀 INICIO RÁPIDO
│  ├─ README.md ........................ Descripción general del proyecto
│  ├─ QUICKSTART.md .................... Guía rápida de instalación (5 min)
│  ├─ GETTING_STARTED.md ............... Guía completa de inicio
│  └─ COMMANDS.md ...................... Comandos más usados y checklist

┌─ 📖 API Y EJEMPLOS
│  ├─ API_EXAMPLES.md .................. Ejemplos de todos los endpoints
│  ├─ FILE_TREE.md ..................... Árbol completo del proyecto
│  └─ PROJECT_STRUCTURE.md ............. Estructura detallada

┌─ 🔧 CONFIGURACIÓN
│  ├─ .env.example ..................... Variables de entorno (copiar a .env)
│  ├─ package.json ..................... Dependencias y scripts
│  ├─ tsconfig.json .................... Configuración TypeScript
│  └─ nest-cli.json .................... Configuración NestJS

┌─ 🗄️  BASE DE DATOS
│  ├─ prisma/schema.prisma ............. Esquema de BD (Prisma)
│  ├─ prisma/MIGRATIONS.md ............. Documentación de migraciones
│  └─ ../DB/DATABASE_SCHEMA.md ......... Esquema detallado de BD

┌─ 🚀 SCRIPTS DE SETUP
│  ├─ setup.bat ........................ Para Windows (doble click)
│  └─ setup.sh ......................... Para Linux/Mac (bash setup.sh)

═══════════════════════════════════════════════════════════════════════════════

⚡ INICIO RÁPIDO (5 MINUTOS):

  1️⃣  npm install
  2️⃣  cp .env.example .env
  3️⃣  npm run prisma:generate
  4️⃣  npm run prisma:migrate
  5️⃣  npm run start:dev

  ✨ Servidor disponible en: http://localhost:3000

═══════════════════════════════════════════════════════════════════════════════

🎯 ENDPOINTS PRINCIPALES:

  🔐 AUTENTICACIÓN
     POST   /auth/register ................. Crear cuenta
     POST   /auth/login ................... Iniciar sesión
     GET    /auth/profile ................. Ver perfil (requiere token)

  📦 PRODUCTOS
     GET    /products ..................... Listar productos
     GET    /products/:id ................. Ver producto
     POST   /products ..................... Crear (solo admin)

  🏷️  CATEGORÍAS
     GET    /categories ................... Listar categorías
     POST   /categories ................... Crear (solo admin)

  🛒 CARRITO
     GET    /cart ......................... Ver mi carrito
     POST   /cart/items ................... Agregar al carrito
     DELETE /cart/items/:id ............... Eliminar del carrito

  📋 ÓRDENES
     POST   /orders ....................... Crear orden
     GET    /orders ....................... Ver mis órdenes
     GET    /orders/:id ................... Detalle de orden

  💳 PAGOS
     GET    /payments/order/:id ........... Ver pago
     POST   /payments/order/:id/process ... Procesar pago

═══════════════════════════════════════════════════════════════════════════════

📊 ESTADÍSTICAS DEL PROYECTO:

  • Módulos: 6 (Auth, Products, Categories, Cart, Orders, Payments)
  • Endpoints: 31+
  • Tablas de BD: 8
  • Líneas de código: 1500+
  • DTOs: 15+
  • Guards: 2 (JWT, Admin)
  • Decoradores: 1 (GetUser)

═══════════════════════════════════════════════════════════════════════════════

🔧 COMANDOS BÁSICOS:

  Desarrollo:
    npm run start:dev ..................... Iniciar con watch
    npm run build ......................... Compilar para producción
    npm run start ......................... Iniciar servidor

  Base de Datos:
    npm run prisma:generate ............... Generar tipos
    npm run prisma:migrate ................ Ejecutar migraciones
    npm run prisma:studio ................. Abrir GUI de Prisma

  Testing:
    npm test .............................. Ejecutar tests
    npm run test:watch .................... Tests en modo watch
    npm run test:cov ...................... Tests con coverage

═══════════════════════════════════════════════════════════════════════════════

🔐 AUTENTICACIÓN:

  El backend usa JWT (JSON Web Tokens) con expiración de 24 horas.
  
  Obtener token:
    1. POST /auth/login o /auth/register
    2. Guardar access_token en respuesta
  
  Usar token:
    curl -H "Authorization: Bearer TOKEN" http://localhost:3000/auth/profile

═══════════════════════════════════════════════════════════════════════════════

✅ CHECKLIST DE INICIO:

  [ ] Instalar Node.js (si no tienes)
  [ ] npm install
  [ ] cp .env.example .env
  [ ] Docker corriendo con PostgreSQL
  [ ] npm run prisma:generate
  [ ] npm run prisma:migrate
  [ ] npm run start:dev
  [ ] Visitar http://localhost:3000 ✨
  [ ] Leer API_EXAMPLES.md para probar endpoints

═══════════════════════════════════════════════════════════════════════════════

🐛 SOLUCIÓN RÁPIDA DE PROBLEMAS:

  ❌ "connect ECONNREFUSED"
     → PostgreSQL no está corriendo: cd ../DB && docker-compose up -d

  ❌ "password authentication failed"
     → Revisa credenciales en .env

  ❌ "Module not found: @prisma/client"
     → npm run prisma:generate && npm install

  ❌ "EADDRINUSE :::3000"
     → Puerto 3000 ocupado: Cambia PORT en .env

═══════════════════════════════════════════════════════════════════════════════

💡 PRÓXIMOS PASOS:

  1. Lee QUICKSTART.md para instalación detallada
  2. Revisa API_EXAMPLES.md para todos los endpoints
  3. Instala Postman o Insomnia para probar la API
  4. Conecta el frontend en GAZEL_Web
  5. Agrega datos de prueba usando Prisma Studio
  6. ¡Comienza a desarrollar! 🚀

═══════════════════════════════════════════════════════════════════════════════

📚 DOCUMENTACIÓN OFICIAL:

  • NestJS: https://docs.nestjs.com/
  • Prisma: https://www.prisma.io/docs/
  • PostgreSQL: https://www.postgresql.org/docs/
  • JWT: https://jwt.io/

═══════════════════════════════════════════════════════════════════════════════

🎉 ¡TU BACKEND ESTÁ 100% LISTO!

   Tienes una API completa, segura y profesional lista para:
   • Conectar con tu frontend
   • Escalar según necesidades
   • Agregar más funcionalidades
   • Desplegar a producción

   ¡Felicidades! 🚀

═══════════════════════════════════════════════════════════════════════════════

Creado con ❤️ usando NestJS, TypeScript, Prisma y PostgreSQL
Team GAZEL - 2024
`);
