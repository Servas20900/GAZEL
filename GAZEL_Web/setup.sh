#!/bin/bash

# GAZEL Setup Script for Frontend
# Este script configura el frontend para trabajar con el backend

echo "🚀 GAZEL Frontend Setup"
echo "======================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas"
echo ""

# Crear archivo .env
if [ ! -f .env ]; then
    echo "🔧 Creando archivo .env..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
else
    echo "ℹ️  Archivo .env ya existe"
fi

echo ""
echo "✨ Setup completado!"
echo ""
echo "Próximos pasos:"
echo "1. Asegúrate de que el backend está corriendo:"
echo "   cd GAZEL_Back && npm run start:dev"
echo ""
echo "2. Inicia el frontend:"
echo "   npm run dev"
echo ""
echo "3. Abre en tu navegador:"
echo "   http://localhost:5173"
echo ""
