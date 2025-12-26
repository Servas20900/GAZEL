@echo off
REM GAZEL Backend - Script de Inicialización para Windows

echo.
echo ==========================================
echo GAZEL Backend - Guía de Inicio Rápido
echo ==========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Node.js no está instalado.
    echo Por favor, instálalo desde https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detectado
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Versión: %NODE_VERSION%
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error al instalar dependencias
    echo.
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas
echo.

REM Copiar archivo .env
if not exist ".env" (
    echo ⚙️  Creando archivo .env...
    copy .env.example .env
    echo ✓ Archivo .env creado
    echo.
    echo ⚠️  Por favor, actualiza las variables en .env si es necesario
) else (
    echo ✓ Archivo .env ya existe
)

echo.

REM Generar tipos de Prisma
echo 🔧 Generando tipos de Prisma...
call npm run prisma:generate
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error al generar tipos de Prisma
    echo.
    pause
    exit /b 1
)
echo ✓ Tipos de Prisma generados
echo.

REM Ejecutar migraciones
echo 📊 Ejecutando migraciones de base de datos...
echo ⚠️  Asegúrate de que PostgreSQL está corriendo
echo    (cd ../DB && docker-compose up -d)
echo.
call npm run prisma:migrate
if %ERRORLEVEL% equ 0 (
    echo ✓ Migraciones ejecutadas exitosamente
) else (
    echo ⚠️  Error al ejecutar migraciones o no hay cambios
)

echo.
echo ==========================================
echo ✓ ¡Listo para iniciar!
echo ==========================================
echo.
echo Comandos disponibles:
echo   npm run start:dev      - Inicia en modo desarrollo (watch)
echo   npm run build          - Compila para producción
echo   npm run start          - Inicia en modo producción
echo   npm run prisma:studio  - Abre Prisma Studio (GUI de BD)
echo   npm test               - Ejecuta tests
echo.
echo Para iniciar el servidor:
echo   npm run start:dev
echo.
pause
