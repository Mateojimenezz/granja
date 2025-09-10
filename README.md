# 🐷 Granja Santa Helena - Sistema de Gestión

Sistema completo de gestión para granjas porcinas con tecnología moderna.

## 📁 Estructura del Proyecto

```
granja/
├── index.html              # 🏠 Landing Page (página principal pública)
├── paginadeinicio.html     # 📊 Dashboard administrativo (usuarios logueados)
├── frontend/
│   ├── css/
│   │   ├── variables.css   # 🎨 Variables CSS globales
│   │   ├── components.css  # 🧩 Componentes reutilizables
│   │   ├── paginadeinicio.css
│   │   └── usuario/        # Estilos específicos por módulo
│   ├── js/
│   │   ├── common.js       # 🔧 Funciones comunes
│   │   └── usuario/        # Scripts específicos por módulo
│   ├── img/               # 🖼️ Imágenes optimizadas
│   └── pages/
│       └── usuario/       # Páginas del módulo de usuarios
├── backend/               # 🚀 API y servidor
└── database/             # 🗄️ Scripts de base de datos
```

## 🌐 Páginas Principales

- **`index.html`** - Landing page público (presentación de la granja)
- **`paginadeinicio.html`** - Panel administrativo para usuarios autenticados
- **`frontend/pages/usuario/login.html`** - Página de inicio de sesión

## 🎯 Flujo de Navegación

1. **Visitante** → `index.html` (landing)
2. **Clic en "Ingresar"** → `login.html`
3. **Login exitoso** → `paginadeinicio.html`

## ✨ Características

- ✅ **Código limpio** - Sin duplicaciones
- ✅ **CSS organizado** - Variables centralizadas, componentes reutilizables
- ✅ **Responsive** - Bootstrap 5
- ✅ **Efectos modernos** - Glass morphism, animaciones
- ✅ **Optimizado** - Imágenes y archivos innecesarios eliminados

## 🚀 Tecnologías

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Efectos**: Glass morphism, gradientes, animaciones CSS
- **Icons**: Bootstrap Icons
- **Fonts**: Google Fonts (Poppins, Calistoga)

## 📱 Responsive Design

El sistema está optimizado para:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px) 
- 🖥️ Desktop (> 1024px)

---
*Desarrollado para la modernización de granjas porcinas* 🐷
