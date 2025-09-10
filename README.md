<<<<<<< HEAD
# 🐷 Sistema de Gestión de Granja Santa Helena

Sistema completo de gestión para granjas desarrollado con **React + Express + MySQL**.

## 🚀 Tecnologías

### Frontend
- **React 18** - Biblioteca de UI moderna
- **React Router** - Navegación SPA
- **Bootstrap 5** - Framework CSS
- **Chart.js** - Gráficos interactivos
- **Axios** - Cliente HTTP

### Backend
- **Node.js + Express** - Servidor web
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación
- **Winston** - Logging

## 📁 Estructura del Proyecto

```
granja/
├── backend/                 # API REST con Express
│   ├── src/
│   │   ├── routes/         # Rutas modulares (5 módulos)
│   │   ├── middleware/     # Autenticación y validación
│   │   ├── config/         # Configuración de DB
│   │   └── utils/          # Utilidades
│   ├── server.js           # Servidor principal
│   └── setup-db-new.js     # Configurador de BD
├── frontend-react/          # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas por módulo
│   │   └── services/       # Servicios API
│   └── public/
├── database/               # Esquemas SQL
└── package.json           # Scripts de desarrollo
```

## 🏗️ Módulos del Sistema

1. **👥 Usuarios** - Gestión de usuarios y roles
2. **📦 Inventario** - Control de alimentos y suministros
3. **🐷 Producción** - Gestión de lotes y animales
4. **🏥 Salud Animal** - Exámenes, vacunas, tratamientos
5. **💰 Ventas** - Clientes y transacciones

## 🛠️ Instalación y Configuración

### 1. Prerequisitos
- XAMPP (MySQL + Apache)
- Node.js (v16+)
- Git

### 2. Clonar y Configurar
```bash
# Clonar el proyecto
git clone [tu-repo]
cd granja

# Instalar dependencias
npm run install:all
```

### 3. Configurar Base de Datos
```bash
# Asegúrate de que XAMPP esté corriendo
# Ejecutar configuración de BD
npm run setup:db
```

### 4. Desarrollo
```bash
# Opción 1: Desarrollo completo (Frontend + Backend)
npm run dev:frontend  # Terminal 1 - React (puerto 3000)
npm run dev:backend   # Terminal 2 - Express (puerto 3001)

# Opción 2: Producción
npm start  # Build React + Servidor Express
```

## 🔐 Acceso al Sistema

**URL de desarrollo:** http://localhost:3000  
**API Backend:** http://localhost:3001/api

**Credenciales de prueba:**
- Email: `admin@granja.com`
- Password: `admin123`

## 📊 Características

### 🔒 Autenticación Avanzada
- Login con JWT + sesiones en BD
- Verificación de tabla usuarios
- Control de roles y permisos
- Middleware modular

### 📱 Interfaz Moderna
- Diseño responsive con Bootstrap 5
- Sidebar colapsable
- Dashboard con gráficos
- Componentes reutilizables

### 🗄️ Base de Datos Estructurada
- 30+ tablas relacionales
- 5 módulos principales
- Índices optimizados
- Setup automático

### 🔧 API RESTful
- Rutas modulares organizadas
- Validación de datos con Joi
- Manejo de errores centralizado
- Logging con Winston

## 🌐 Endpoints API

```
POST /api/auth/login          # Iniciar sesión
GET  /api/auth/verify         # Verificar token
POST /api/auth/logout         # Cerrar sesión

GET  /api/usuarios            # Listar usuarios
POST /api/usuarios            # Crear usuario
PUT  /api/usuarios/:id        # Actualizar usuario
DELETE /api/usuarios/:id      # Eliminar usuario

GET  /api/inventario          # Inventario
GET  /api/produccion          # Producción
GET  /api/salud-animal        # Salud Animal
GET  /api/ventas              # Ventas
```

## 🚀 Producción

```bash
# Build del frontend
npm run build:frontend

# Iniciar servidor
npm start
```

El servidor servirá tanto la API como la aplicación React compilada.

## 📝 Scripts Disponibles

```bash
npm run dev:frontend      # Desarrollo React (puerto 3000)
npm run dev:backend       # Desarrollo Express (puerto 3001)
npm run setup:db          # Configurar base de datos
npm run install:all       # Instalar todas las dependencias
npm run build:frontend    # Compilar React para producción
npm start                 # Servidor completo
```

## 🔧 Configuración

### Base de Datos (MySQL)
```
Host: localhost
Puerto: 3306
Usuario: root
Password: (vacío - XAMPP default)
Base de datos: granja_db
```

### Variables de Entorno
El sistema usa configuración por defecto para XAMPP. Para personalizar, crear `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=granja_db
JWT_SECRET=tu_secreto_jwt
PORT=3001
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -am 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**🐷 Granja Santa Helena - Sistema de Gestión Integral**  
*Desarrollado con React + Express + MySQL*
=======
# 🐷 Sistema de Gestión de Granja Santa Helena

Sistema completo de gestión para granjas desarrollado con **React + Express + MySQL**.

## 🚀 Tecnologías

### Frontend
- **React 18** - Biblioteca de UI moderna
- **React Router** - Navegación SPA
- **Bootstrap 5** - Framework CSS
- **Chart.js** - Gráficos interactivos
- **Axios** - Cliente HTTP

### Backend
- **Node.js + Express** - Servidor web
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación
- **Winston** - Logging

## 📁 Estructura del Proyecto

```
granja/
├── backend/                 # API REST con Express
│   ├── src/
│   │   ├── routes/         # Rutas modulares (5 módulos)
│   │   ├── middleware/     # Autenticación y validación
│   │   ├── config/         # Configuración de DB
│   │   └── utils/          # Utilidades
│   ├── server.js           # Servidor principal
│   └── setup-db-new.js     # Configurador de BD
├── frontend-react/          # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas por módulo
│   │   └── services/       # Servicios API
│   └── public/
├── database/               # Esquemas SQL
└── package.json           # Scripts de desarrollo
```

## 🏗️ Módulos del Sistema

1. **👥 Usuarios** - Gestión de usuarios y roles
2. **📦 Inventario** - Control de alimentos y suministros
3. **🐷 Producción** - Gestión de lotes y animales
4. **🏥 Salud Animal** - Exámenes, vacunas, tratamientos
5. **💰 Ventas** - Clientes y transacciones

## 🛠️ Instalación y Configuración

### 1. Prerequisitos
- XAMPP (MySQL + Apache)
- Node.js (v16+)
- Git

### 2. Clonar y Configurar
```bash
# Clonar el proyecto
git clone [tu-repo]
cd granja

# Instalar dependencias
npm run install:all
```

### 3. Configurar Base de Datos
```bash
# Asegúrate de que XAMPP esté corriendo
# Ejecutar configuración de BD
npm run setup:db
```

### 4. Desarrollo
```bash
# Opción 1: Desarrollo completo (Frontend + Backend)
npm run dev:frontend  # Terminal 1 - React (puerto 3000)
npm run dev:backend   # Terminal 2 - Express (puerto 3001)

# Opción 2: Producción
npm start  # Build React + Servidor Express
```

## 🔐 Acceso al Sistema

**URL de desarrollo:** http://localhost:3000  
**API Backend:** http://localhost:3001/api

**Credenciales de prueba:**
- Email: `admin@granja.com`
- Password: `admin123`

## 📊 Características

### 🔒 Autenticación Avanzada
- Login con JWT + sesiones en BD
- Verificación de tabla usuarios
- Control de roles y permisos
- Middleware modular

### 📱 Interfaz Moderna
- Diseño responsive con Bootstrap 5
- Sidebar colapsable
- Dashboard con gráficos
- Componentes reutilizables

### 🗄️ Base de Datos Estructurada
- 30+ tablas relacionales
- 5 módulos principales
- Índices optimizados
- Setup automático

### 🔧 API RESTful
- Rutas modulares organizadas
- Validación de datos con Joi
- Manejo de errores centralizado
- Logging con Winston

## 🌐 Endpoints API

```
POST /api/auth/login          # Iniciar sesión
GET  /api/auth/verify         # Verificar token
POST /api/auth/logout         # Cerrar sesión

GET  /api/usuarios            # Listar usuarios
POST /api/usuarios            # Crear usuario
PUT  /api/usuarios/:id        # Actualizar usuario
DELETE /api/usuarios/:id      # Eliminar usuario

GET  /api/inventario          # Inventario
GET  /api/produccion          # Producción
GET  /api/salud-animal        # Salud Animal
GET  /api/ventas              # Ventas
```

## 🚀 Producción

```bash
# Build del frontend
npm run build:frontend

# Iniciar servidor
npm start
```

El servidor servirá tanto la API como la aplicación React compilada.

## 📝 Scripts Disponibles

```bash
npm run dev:frontend      # Desarrollo React (puerto 3000)
npm run dev:backend       # Desarrollo Express (puerto 3001)
npm run setup:db          # Configurar base de datos
npm run install:all       # Instalar todas las dependencias
npm run build:frontend    # Compilar React para producción
npm start                 # Servidor completo
```

## 🔧 Configuración

### Base de Datos (MySQL)
```
Host: localhost
Puerto: 3306
Usuario: root
Password: (vacío - XAMPP default)
Base de datos: granja_db
```

### Variables de Entorno
El sistema usa configuración por defecto para XAMPP. Para personalizar, crear `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=granja_db
JWT_SECRET=tu_secreto_jwt
PORT=3001
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -am 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**🐷 Granja Santa Helena - Sistema de Gestión Integral**  
*Desarrollado con React + Express + MySQL*
>>>>>>> 98432a426115134955e9314f86f0da2ef6112aa9
