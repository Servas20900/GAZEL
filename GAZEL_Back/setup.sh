#!/bin/bash

echo "=========================================="
echo "GAZEL Backend - Guía de Inicio Rápido"
echo "=========================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instálalo desde https://nodejs.org"
    exit 1
fi

echo "✓ Node.js detectado: $(node -v)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✓ Dependencias instaladas"
echo ""

# Copiar archivo .env
if [ ! -f ".env" ]; then
    echo "⚙️  Creando archivo .env..."
    cp .env.example .env
    echo "✓ Archivo .env creado"
    echo ""
    echo "⚠️  Por favor, actualiza las variables en .env si es necesario"
else
    echo "✓ Archivo .env ya existe"
fi

echo ""

# Verificar conexión a PostgreSQL
echo "🔍 Verificando conexión a la base de datos..."
if npx prisma db execute --stdin --file <(echo "SELECT 1;") 2>/dev/null; then
    echo "✓ Conexión a PostgreSQL exitosa"
else
    echo "⚠️  No se pudo conectar a PostgreSQL"
    echo "   Asegúrate de que Docker con la BD está corriendo:"
    echo "   cd ../DB && docker-compose up -d"
fi

echo ""

# Generar tipos de Prisma
echo "🔧 Generando tipos de Prisma..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Error al generar tipos de Prisma"
    exit 1
fi

echo "✓ Tipos de Prisma generados"
echo ""

# Ejecutar migraciones
echo "📊 Ejecutando migraciones de base de datos..."
npm run prisma:migrate

if [ $? -eq 0 ]; then
    echo "✓ Migraciones ejecutadas exitosamente"
else
    echo "⚠️  Error al ejecutar migraciones (puede que ya existan)"
fi

echo ""
echo "=========================================="
echo "✓ ¡Listo para iniciar!"
echo "=========================================="
echo ""
echo "Comandos disponibles:"
echo "  npm run start:dev      - Inicia en modo desarrollo (watch)"
echo "  npm run build          - Compila para producción"
echo "  npm run start          - Inicia en modo producción"
echo "  npm run prisma:studio  - Abre Prisma Studio (GUI de BD)"
echo "  npm test               - Ejecuta tests"
echo ""
echo "Para iniciar el servidor:"
echo "  npm run start:dev"
echo ""
