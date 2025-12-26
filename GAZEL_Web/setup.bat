@echo off
REM GAZEL Setup Script for Frontend (Windows PowerShell)
REM Este script configura el frontend para trabajar con el backend

echo.
echo 🚀 GAZEL Frontend Setup
echo =======================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Por favor instálalo primero.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al instalar dependencias
    exit /b 1
)

echo ✅ Dependencias instaladas
echo.

REM Crear archivo .env
if not exist .env (
    echo 🔧 Creando archivo .env...
    copy .env.example .env
    echo ✅ Archivo .env creado
) else (
    echo ℹ️  Archivo .env ya existe
)

echo.
echo ✨ Setup completado!
echo.
echo Próximos pasos:
echo 1. Asegúrate de que el backend está corriendo:
echo    cd GAZEL_Back ^&^& npm run start:dev
echo.
echo 2. Inicia el frontend:
echo    npm run dev
echo.
echo 3. Abre en tu navegador:
echo    http://localhost:5173
echo.
