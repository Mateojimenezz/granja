document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing sidebar...');
    
    // Elementos del DOM
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebarToggleMain = document.getElementById('sidebarToggleMain');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    console.log('Elements found:', {
        toggleBtn: !!toggleBtn,
        sidebarToggleMain: !!sidebarToggleMain,
        sidebar: !!sidebar,
        mainContent: !!mainContent,
        sidebarOverlay: !!sidebarOverlay
    });

    // Función para limpiar overlay completamente
    function clearOverlay() {
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('show');
            sidebarOverlay.style.display = 'none';
            sidebarOverlay.style.opacity = '0';
            sidebarOverlay.style.visibility = 'hidden';
            sidebarOverlay.style.pointerEvents = 'none';
            sidebarOverlay.style.zIndex = '-1';
        }
    }

    // Limpiar overlay inmediatamente
    clearOverlay();

    // FORZAR estilos correctos del main-content en móvil
    if (window.innerWidth < 992) {
        if (mainContent) {
            mainContent.style.marginLeft = '0';
            mainContent.style.width = '100%';
        }
        console.log('Mobile layout forced');
    }

    // Inicializar permisos de usuario
    initializeUserPermissions();

    // Función simple para toggle del sidebar
    function toggleSidebar() {
        console.log('=== TOGGLE SIDEBAR CALLED ===');
        console.log('Sidebar classes before:', sidebar.className);
        
        const isMobile = window.innerWidth < 992;
        
        if (isMobile) {
            // En móvil, usar las clases show/hide y overlay
            const isVisible = sidebar.classList.contains('show');
            
            if (isVisible) {
                sidebar.classList.remove('show');
                clearOverlay();
            } else {
                sidebar.classList.add('show');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.add('show');
                    sidebarOverlay.style.display = 'block';
                    sidebarOverlay.style.opacity = '1';
                    sidebarOverlay.style.visibility = 'visible';
                    sidebarOverlay.style.pointerEvents = 'auto';
                    sidebarOverlay.style.zIndex = '999';
                }
            }
            updateBodyScroll();
        } else {
            // En desktop, usar el comportamiento anterior
            const isHidden = sidebar.classList.contains('hidden');
            
            // Asegurar que el overlay esté oculto en desktop
            clearOverlay();
            
            if (isHidden) {
                sidebar.classList.remove('hidden');
                if (mainContent) {
                    mainContent.classList.remove('expanded');
                }
            } else {
                sidebar.classList.add('hidden');
                if (mainContent) {
                    mainContent.classList.add('expanded');
                }
            }
            document.body.style.overflow = 'auto';
        }
        
        console.log('Sidebar classes after:', sidebar.className);
    }

    // Función para inicializar permisos de usuario
    function initializeUserPermissions() {
        // Simular obtener rol del usuario (en una app real vendría del servidor/localStorage)
        const currentUser = getCurrentUser();
        
        // Mostrar/ocultar elementos según permisos
        toggleAdminElements(currentUser.role === 'admin');
        
        // Actualizar información del usuario en el header
        updateUserDisplay(currentUser);
    }

    // Función para obtener usuario actual
    function getCurrentUser() {
        // En una aplicación real, esto vendría del localStorage o una API
        return {
            name: 'Juan Pérez',
            role: 'admin', // 'admin', 'supervisor', 'veterinario', 'trabajador'
            email: 'juan.perez@email.com',
            avatar: 'frontend/img/logo.png'
        };
    }

    // Función para mostrar/ocultar elementos administrativos
    function toggleAdminElements(isAdmin) {
        const adminElements = document.querySelectorAll('.admin-only');
        
        adminElements.forEach(element => {
            if (isAdmin) {
                element.style.display = 'flex';
                element.style.opacity = '1';
            } else {
                element.style.display = 'none';
                element.style.opacity = '0.5';
            }
        });

        // Agregar badges a elementos administrativos si es admin
        if (isAdmin) {
            adminElements.forEach(element => {
                if (!element.querySelector('.admin-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'admin-badge';
                    badge.textContent = 'ADMIN';
                    element.appendChild(badge);
                }
            });
        }
    }

    // Función para actualizar display del usuario
    function updateUserDisplay(user) {
        const userNameElement = document.querySelector('.user-name');
        const userAvatarElement = document.querySelector('.avatar');
        
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
        
        if (userAvatarElement && user.avatar) {
            userAvatarElement.src = user.avatar;
            userAvatarElement.alt = user.name;
        }
    }

    // Función para manejar navegación de enlaces del sidebar
    function handleSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.nav-submenu a[href]');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Agregar efecto de loading
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Cargando...';
                
                // Restaurar texto después de un breve delay (simular carga)
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 500);
                
                // Cerrar sidebar en móvil después de hacer clic
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('show');
                    clearOverlay();
                    updateBodyScroll();
                }
            });
        });
    }

    // Función para agregar indicadores de notificación
    function addNotificationIndicators() {
        const userSubmenu = document.getElementById('userSubmenu');
        if (userSubmenu) {
            // Agregar indicador de notificación a Gestión de Usuarios si hay solicitudes pendientes
            const gestionLink = userSubmenu.querySelector('a[href*="gestion-usuarios"]');
            if (gestionLink) {
                const badge = document.createElement('span');
                badge.className = 'badge bg-warning ms-2';
                badge.textContent = '5'; // Número de solicitudes pendientes
                badge.style.fontSize = '0.7rem';
                gestionLink.appendChild(badge);
            }
        }
    }

    // Función para tooltip en elementos administrativos
    function addAdminTooltips() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            element.setAttribute('title', 'Función administrativa - Solo para administradores');
            element.setAttribute('data-bs-toggle', 'tooltip');
            element.setAttribute('data-bs-placement', 'right');
        });
        
        // Inicializar tooltips de Bootstrap
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Event listeners
    if (toggleBtn) {
        console.log('Adding click listener to sidebar toggle button');
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('SIDEBAR TOGGLE BUTTON CLICKED');
            toggleSidebar();
        });
    } else {
        console.log('Toggle button not found!');
    }
    
    if (sidebarToggleMain) {
        console.log('Adding click listener to main toggle button');
        sidebarToggleMain.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('MAIN TOGGLE BUTTON CLICKED');
            toggleSidebar();
        });
    } else {
        console.log('Main toggle button not found!');
    }

    // Cerrar con overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Overlay clicked - closing sidebar');
            sidebar.classList.remove('show');
            clearOverlay();
            updateBodyScroll();
        });
    }

    // Función para manejar cambios de tamaño de ventana
    function handleResize() {
        const isMobile = window.innerWidth < 992;
        
        if (isMobile) {
            // En móvil, asegurar que el sidebar esté oculto por defecto
            sidebar.classList.remove('show', 'hidden');
            clearOverlay();
            
            if (mainContent) {
                mainContent.classList.remove('expanded');
                // Forzar estilos de main-content en móvil
                mainContent.style.marginLeft = '0';
                mainContent.style.width = '100%';
            }
        } else {
            // En desktop, limpiar clases móviles y aplicar comportamiento desktop
            sidebar.classList.remove('show');
            clearOverlay();
            
            if (mainContent) {
                // Limpiar estilos inline en desktop
                mainContent.style.marginLeft = '';
                mainContent.style.width = '';
                
                // Si no tiene clase hidden, mostrar sidebar en desktop
                if (!sidebar.classList.contains('hidden')) {
                    mainContent.classList.remove('expanded');
                }
            }
        }
        
        updateBodyScroll();
        console.log('Resize handled - Mobile:', isMobile, 'Overlay cleared');
    }

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);

    // Cerrar sidebar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            clearOverlay();
            updateBodyScroll();
        }
    });

    // Función para debug - mostrar información actual
    function debugSidebarState() {
        const isMobile = window.innerWidth < 992;
        console.log('=== SIDEBAR DEBUG INFO ===');
        console.log('Screen width:', window.innerWidth);
        console.log('Is mobile:', isMobile);
        console.log('Sidebar classes:', sidebar.className);
        console.log('Overlay classes:', sidebarOverlay ? sidebarOverlay.className : 'No overlay');
        console.log('Sidebar transform:', getComputedStyle(sidebar).transform);
        console.log('Body overflow:', document.body.style.overflow);
        console.log('=========================');
    }

    // Agregar debug en modo desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.debugSidebar = debugSidebarState;
        console.log('Debug mode enabled. Use debugSidebar() in console to check state.');
    }

    // Prevenir scroll del body cuando el sidebar está abierto en móvil
    function updateBodyScroll() {
        const isMobile = window.innerWidth < 992;
        const sidebarOpen = sidebar && sidebar.classList.contains('show');
        
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        console.log('Body scroll updated - Mobile:', isMobile, 'Sidebar open:', sidebarOpen, 'Overflow:', document.body.style.overflow);
    }

    // Inicializar estado según el tamaño de pantalla
    setTimeout(() => {
        clearOverlay();
        handleResize();
        console.log('Sidebar initialized for current screen size');
    }, 50);

    // Verificación adicional después de 200ms
    setTimeout(() => {
        clearOverlay();
        console.log('Secondary overlay cleanup completed');
    }, 200);

    // Submenu Toggle - Mejorado para cerrar correctamente los módulos
    const submenuToggles = document.querySelectorAll('[data-submenu-toggle="collapse"]');
    console.log('Found submenu toggles:', submenuToggles.length);
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenuId = this.getAttribute('data-bs-target');
            const submenu = document.querySelector(submenuId);
            const chevronIcon = this.querySelector('.bi-chevron-down');
            const isCurrentlyOpen = submenu.classList.contains('show');
            
            console.log('Submenu toggle clicked:', submenuId, 'Currently open:', isCurrentlyOpen);
            
            // Cerrar todos los submenús abiertos y resetear iconos
            document.querySelectorAll('.nav-submenu.show').forEach(menu => {
                menu.classList.remove('show');
                console.log('Closing submenu:', menu.id);
            });
            
            // Resetear todos los iconos de chevron
            document.querySelectorAll('[data-bs-target] .bi-chevron-down').forEach(icon => {
                icon.classList.remove('rotate-180');
                icon.style.transform = 'rotate(0deg)';
            });
            
            // Si el submenú actual no estaba abierto, abrirlo
            if (!isCurrentlyOpen) {
                submenu.classList.add('show');
                if (chevronIcon) {
                    chevronIcon.classList.add('rotate-180');
                    chevronIcon.style.transform = 'rotate(180deg)';
                }
                console.log('Opening submenu:', submenuId);
            } else {
                console.log('Keeping submenu closed:', submenuId);
            }
        });
    });
    
    // Función para cerrar todos los submenús al hacer clic fuera
    function closeAllSubmenus() {
        console.log('Closing all submenus...');
        const openSubmenus = document.querySelectorAll('.nav-submenu.show');
        const chevronIcons = document.querySelectorAll('[data-bs-toggle="collapse"] .bi-chevron-down');
        
        openSubmenus.forEach(menu => {
            menu.classList.remove('show');
            console.log('Closed submenu:', menu.id);
        });
        
        chevronIcons.forEach(icon => {
            icon.classList.remove('rotate-180');
            icon.style.transform = 'rotate(0deg)';
        });
        
        console.log('All submenus closed');
    }
    
    // Función para forzar el cierre de submenús específicos
    function forceCloseSubmenu(submenuId) {
        const submenu = document.querySelector(submenuId);
        const toggle = document.querySelector(`[data-bs-target="${submenuId}"]`);
        
        if (submenu) {
            submenu.classList.remove('show');
            submenu.style.display = 'none';
            
            // Forzar reflow
            submenu.offsetHeight;
            submenu.style.display = '';
        }
        
        if (toggle) {
            const chevron = toggle.querySelector('.bi-chevron-down');
            if (chevron) {
                chevron.classList.remove('rotate-180');
                chevron.style.transform = 'rotate(0deg)';
            }
        }
        
        console.log('Force closed submenu:', submenuId);
    }
    
    // Agregar botón de "Cerrar Todos" para debug (temporal)
    function addCloseAllButton() {
        const sidebarHeader = document.querySelector('.sidebar-header');
        if (sidebarHeader) {
            const closeAllBtn = document.createElement('button');
            closeAllBtn.className = 'btn btn-sm btn-outline-secondary';
            closeAllBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
            closeAllBtn.title = 'Cerrar todos los módulos';
            closeAllBtn.style.fontSize = '12px';
            closeAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeAllSubmenus();
                
                // Forzar cierre específico de cada módulo
                ['#userSubmenu', '#inventorySubmenu', '#productionSubmenu', '#healthSubmenu', '#salesSubmenu'].forEach(id => {
                    forceCloseSubmenu(id);
                });
            });
            sidebarHeader.appendChild(closeAllBtn);
        }
    }
    
    // Cerrar submenús al hacer clic en el área principal
    if (mainContent) {
        mainContent.addEventListener('click', function(e) {
            // Solo cerrar si no se hizo clic en un elemento del sidebar
            if (!sidebar.contains(e.target)) {
                closeAllSubmenus();
            }
        });
    }
    
    // Cerrar submenús al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllSubmenus();
        }
    });
    
    // Cerrar submenús al hacer scroll en el contenido principal
    if (mainContent) {
        mainContent.addEventListener('scroll', function() {
            if (window.innerWidth < 992) { // Solo en móvil
                closeAllSubmenus();
            }
        });
    }
    
    // Cerrar submenús al hacer clic en el overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeAllSubmenus();
            console.log('Overlay clicked - closing sidebar and submenus');
            sidebar.classList.add('hidden');
            mainContent.classList.add('expanded');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Sample Charts
    const productionCtx = document.getElementById('productionChart').getContext('2d');
    new Chart(productionCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Producción',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: '#2E7D32',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(inventoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Alimentos', 'Medicamentos', 'Equipos', 'Otros'],
            datasets: [{
                data: [300, 50, 100, 40],
                backgroundColor: [
                    '#2E7D32',
                    '#4CAF50',
                    '#81C784',
                    '#C8E6C9'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Responsive Sidebar
    function handleResize() {
        if (window.innerWidth < 992) {
            // En móvil, asegurar que el sidebar esté cerrado al cambiar tamaño
            if (!sidebar.classList.contains('collapsed')) {
                // Solo mostrar overlay si el sidebar está abierto
                sidebarOverlay.classList.add('show');
            } else {
                sidebarOverlay.classList.remove('show');
            }
        } else {
            // En desktop, remover overlay siempre
            sidebarOverlay.classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    // Notifications dropdown (sample)
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        new bootstrap.Tooltip(notificationBtn, {
            title: '3 notificaciones sin leer',
            placement: 'bottom'
        });
    }

    // Task checkboxes
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskLabel = this.parentElement.querySelector('label');
            if (this.checked) {
                taskLabel.style.textDecoration = 'line-through';
                taskLabel.style.color = '#6c757d';
            } else {
                taskLabel.style.textDecoration = 'none';
                taskLabel.style.color = 'inherit';
            }
        });
    });

    // Inicializar funcionalidades del sidebar mejorado
    handleSidebarNavigation();
    addNotificationIndicators();
    addAdminTooltips();
    // addCloseAllButton(); // Removido - era solo para debug

    // Mostrar mensaje de bienvenida con información del usuario
    const currentUser = getCurrentUser();
    console.log(`Bienvenido ${currentUser.name} (${currentUser.role})`);
    
    // Agregar indicador de conexión en tiempo real
    addConnectionStatus();
    
    // Asegurar que todos los submenús estén cerrados al cargar la página
    setTimeout(() => {
        closeAllSubmenus();
        console.log('Initial cleanup: All submenus closed');
    }, 100);

});
