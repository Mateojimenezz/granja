// Gestión de Usuarios - JavaScript

// Variables globales
let pendingRequests = [];
let registeredUsers = [];
let blockedUsers = [];
let currentUserToEdit = null;
let userManagementSettings = {};

// URL base para las APIs (cuando esté disponible el backend)
const API_BASE_URL = '/api/usuarios'; // Se ajustará según la configuración del backend

document.addEventListener('DOMContentLoaded', function() {
    initializeUserManagement();
    setupEventListeners();
    loadAllUserData();
});

function initializeUserManagement() {
    // Configurar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Configurar búsqueda en tiempo real
    setupSearchFunctionality();
    
    // Cargar configuraciones guardadas
    loadUserManagementSettings();
}

function setupEventListeners() {
    // Búsqueda en tabs
    const searchInputs = document.querySelectorAll('input[id^="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    // Filtros
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', handleRoleFilter);
    }
}

function loadUserManagementSettings() {
    // Cargar configuraciones desde localStorage o API
    const defaultSettings = {
        autoApproveVeterinarians: false,
        requireDocumentVerification: true,
        emailNotificationsEnabled: true,
        autoBlockSuspiciousActivity: true,
        sessionTimeout: 30, // minutos
        maxLoginAttempts: 3
    };
    
    const savedSettings = JSON.parse(localStorage.getItem('userManagementSettings')) || defaultSettings;
    userManagementSettings = { ...defaultSettings, ...savedSettings };
    
    // Aplicar configuraciones
    applyUserManagementSettings();
}

function applyUserManagementSettings() {
    // Aplicar configuraciones específicas
    if (userManagementSettings.autoApproveVeterinarians) {
        console.log('Auto-aprobación de veterinarios activada');
    }
    
    if (userManagementSettings.autoBlockSuspiciousActivity) {
        console.log('Bloqueo automático por actividad sospechosa activado');
    }
}

async function loadAllUserData() {
    try {
        showLoadingStates();
        
        // Cargar todos los datos en paralelo
        await Promise.all([
            loadPendingRequests(),
            loadRegisteredUsers(),
            loadBlockedUsers()
        ]);
        
        updateStats();
        hideLoadingStates();
        
    } catch (error) {
        console.error('Error cargando datos de usuarios:', error);
        showNotification('Error al cargar los datos de usuarios. Mostrando datos de ejemplo.', 'warning');
        
        // Cargar datos de ejemplo como fallback
        loadExampleData();
        hideLoadingStates();
    }
}

async function loadPendingRequests() {
    try {
        // TODO: Cuando esté disponible el backend, usar:
        // const response = await fetch(`${API_BASE_URL}/pendientes`);
        // const data = await response.json();
        // pendingRequests = data;
        
        // Por ahora, simular datos desde la base de datos
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular latencia
        
        pendingRequests = await getDataFromDatabase('pending_requests') || [
            {
                id: 1,
                nombre: 'María González',
                email: 'maria.gonzalez@email.com',
                rol: 'veterinario',
                fecha_solicitud: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                documentos: ['cv.pdf', 'certificado.pdf'],
                telefono: '+57 300 123 4567',
                experiencia: '5 años en medicina veterinaria'
            },
            {
                id: 2,
                nombre: 'Carlos Rodríguez',
                email: 'carlos.rodriguez@email.com',
                rol: 'trabajador',
                fecha_solicitud: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                documentos: ['cv.pdf'],
                telefono: '+57 310 456 7890',
                experiencia: '2 años en ganadería'
            }
        ];
        
        renderPendingRequests(pendingRequests);
        
    } catch (error) {
        console.error('Error cargando solicitudes pendientes:', error);
        showNotification('Error al cargar solicitudes pendientes', 'error');
    }
}

function loadUserManagementSettings() {
    // Cargar configuraciones desde localStorage o API
    const defaultSettings = {
        autoApproveVeterinarians: false,
        requireDocumentVerification: true,
        emailNotificationsEnabled: true,
        autoBlockSuspiciousActivity: true,
        sessionTimeout: 30, // minutos
        maxLoginAttempts: 3
    };
    
    const savedSettings = JSON.parse(localStorage.getItem('userManagementSettings')) || defaultSettings;
    userManagementSettings = { ...defaultSettings, ...savedSettings };
    
    // Aplicar configuraciones
    applyUserManagementSettings();
}

function applyUserManagementSettings() {
    // Aplicar configuraciones específicas
    if (userManagementSettings.autoApproveVeterinarians) {
        console.log('Auto-aprobación de veterinarios activada');
    }
    
    if (userManagementSettings.autoBlockSuspiciousActivity) {
        console.log('Bloqueo automático por actividad sospechosa activado');
    }
}

async function loadAllUserData() {
    try {
        showLoadingStates();
        
        // Cargar todos los datos en paralelo
        await Promise.all([
            loadPendingRequests(),
            loadRegisteredUsers(),
            loadBlockedUsers()
        ]);
        
        updateStats();
        hideLoadingStates();
        
    } catch (error) {
        console.error('Error cargando datos de usuarios:', error);
        showNotification('Error al cargar los datos de usuarios. Mostrando datos de ejemplo.', 'warning');
        
        // Cargar datos de ejemplo como fallback
        loadExampleData();
        hideLoadingStates();
    }
}

async function loadPendingRequests() {
    try {
        // TODO: Cuando esté disponible el backend, usar:
        // const response = await fetch(`${API_BASE_URL}/pendientes`);
        // const data = await response.json();
        // pendingRequests = data;
        
        // Por ahora, simular datos desde la base de datos
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular latencia
        
        pendingRequests = await getDataFromDatabase('pending_requests') || [
            {
                id: 1,
                nombre: 'María González',
                email: 'maria.gonzalez@email.com',
                rol: 'veterinario',
                fecha_solicitud: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                documentos: ['cv.pdf', 'certificado.pdf'],
                telefono: '+57 300 123 4567',
                experiencia: '5 años en medicina veterinaria'
            },
            {
                id: 2,
                nombre: 'Carlos Rodríguez',
                email: 'carlos.rodriguez@email.com',
                rol: 'trabajador',
                fecha_solicitud: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                documentos: ['cv.pdf'],
                telefono: '+57 310 456 7890',
                experiencia: '2 años en ganadería'
            },
            {
                id: 3,
                nombre: 'Ana López',
                email: 'ana.lopez@email.com',
                rol: 'supervisor',
                fecha_solicitud: new Date(Date.now() - 3 * 60 * 60 * 1000),
                documentos: ['cv.pdf', 'referencias.pdf'],
                telefono: '+57 320 789 0123',
                experiencia: '8 años en supervisión'
            }
        ];
        
        renderPendingRequests(pendingRequests);
        
    } catch (error) {
        console.error('Error cargando solicitudes pendientes:', error);
        showNotification('Error al cargar solicitudes pendientes', 'error');
    }
}

async function loadRegisteredUsers() {
    try {
        // TODO: Cuando esté disponible el backend, usar:
        // const response = await fetch(`${API_BASE_URL}/registrados`);
        // const data = await response.json();
        // registeredUsers = data;
        
        // Por ahora, simular datos desde la base de datos
        await new Promise(resolve => setTimeout(resolve, 800)); // Simular latencia
        
        registeredUsers = await getDataFromDatabase('registered_users') || [
            {
                id: 1,
                nombre: 'Juan Pérez',
                email: 'juan.perez@email.com',
                rol: 'admin',
                ultimo_acceso: new Date(Date.now() - 2 * 60 * 60 * 1000),
                esta_conectado: true,
                fecha_registro: new Date('2024-01-15'),
                telefono: '+57 300 111 2222',
                estado: 'activo'
            },
            {
                id: 2,
                nombre: 'Laura Martínez',
                email: 'laura.martinez@email.com',
                rol: 'veterinario',
                ultimo_acceso: new Date(Date.now() - 24 * 60 * 60 * 1000),
                esta_conectado: false,
                fecha_registro: new Date('2024-02-20'),
                telefono: '+57 310 333 4444',
                estado: 'activo'
            },
            {
                id: 3,
                nombre: 'Pedro Sánchez',
                email: 'pedro.sanchez@email.com',
                rol: 'supervisor',
                ultimo_acceso: new Date(Date.now() - 30 * 60 * 1000),
                esta_conectado: true,
                fecha_registro: new Date('2024-03-10'),
                telefono: '+57 320 555 6666',
                estado: 'activo'
            }
        ];
        
        renderRegisteredUsers(registeredUsers);
        
    } catch (error) {
        console.error('Error cargando usuarios registrados:', error);
        showNotification('Error al cargar usuarios registrados', 'error');
    }
}

async function loadBlockedUsers() {
    try {
        // TODO: Cuando esté disponible el backend, usar:
        // const response = await fetch(`${API_BASE_URL}/bloqueados`);
        // const data = await response.json();
        // blockedUsers = data;
        
        // Por ahora, simular datos desde la base de datos
        await new Promise(resolve => setTimeout(resolve, 600)); // Simular latencia
        
        blockedUsers = await getDataFromDatabase('blocked_users') || [
            {
                id: 1,
                nombre: 'Roberto García',
                email: 'roberto.garcia@email.com',
                rol: 'trabajador',
                fecha_bloqueo: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                razon_bloqueo: 'Violación de políticas',
                bloqueado_por: 'Juan Pérez'
            },
            {
                id: 2,
                nombre: 'Isabel Ruiz',
                email: 'isabel.ruiz@email.com',
                rol: 'supervisor',
                fecha_bloqueo: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                razon_bloqueo: 'Actividad sospechosa',
                bloqueado_por: 'Sistema automático'
            }
        ];
        
        renderBlockedUsers(blockedUsers);
        
    } catch (error) {
        console.error('Error cargando usuarios bloqueados:', error);
        showNotification('Error al cargar usuarios bloqueados', 'error');
    }
}

// Función para simular obtención de datos de la base de datos
async function getDataFromDatabase(table) {
    // Simular conexión a base de datos
    return new Promise((resolve) => {
        setTimeout(() => {
            // Datos de ejemplo que vendrían de la base de datos
            resolve(null); // null para usar datos por defecto
        }, 500);
    });
}

function showLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading-state');
    loadingElements.forEach(element => {
        element.style.display = 'block';
    });
}

function hideLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading-state');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

function loadExampleData() {
    // Datos de ejemplo para mostrar si falla la conexión a la base de datos
    pendingRequests = [
        {
            id: 1,
            nombre: 'María González',
            email: 'maria.gonzalez@email.com',
            rol: 'veterinario',
            fecha_solicitud: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            documentos: ['cv.pdf', 'certificado.pdf']
        }
    ];
    
    registeredUsers = [
        {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan.perez@email.com',
            rol: 'admin',
            ultimo_acceso: new Date(Date.now() - 2 * 60 * 60 * 1000),
            esta_conectado: true,
            fecha_registro: new Date('2024-01-15')
        }
    ];
    
    blockedUsers = [];
    
    renderPendingRequests(pendingRequests);
    renderRegisteredUsers(registeredUsers);
    renderBlockedUsers(blockedUsers);
}

function renderPendingRequests(requests) {
    const container = document.getElementById('pendingRequestsList');
    
    if (!requests || requests.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-inbox display-4 text-muted"></i>
                <h5 class="mt-3 text-muted">No hay solicitudes pendientes</h5>
                <p class="text-muted">Todas las solicitudes han sido procesadas</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(request => `
        <div class="request-card animate__animated animate__fadeInUp">
            <div class="request-info">
                <div class="user-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>
                <div class="user-details">
                    <h6>${request.nombre}</h6>
                    <p class="text-muted mb-1">${request.email}</p>
                    <span class="badge ${getRoleBadgeColor(request.rol)}">${getRoleDisplayName(request.rol)}</span>
                    <small class="text-muted d-block">Solicitado ${formatRelativeTime(request.fecha_solicitud)}</small>
                    ${request.telefono ? `<small class="text-muted d-block"><i class="bi bi-telephone me-1"></i>${request.telefono}</small>` : ''}
                </div>
            </div>
            <div class="request-actions">
                <button class="btn btn-sm btn-success me-2" onclick="approveUser(${request.id})" title="Aprobar solicitud">
                    <i class="bi bi-check-circle me-1"></i>Aprobar
                </button>
                <button class="btn btn-sm btn-danger me-2" onclick="rejectUser(${request.id})" title="Rechazar solicitud">
                    <i class="bi bi-x-circle me-1"></i>Rechazar
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="viewDetails(${request.id})" title="Ver detalles">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Mostrar acciones masivas si hay solicitudes
    const bulkActions = document.getElementById('bulkActions');
    if (bulkActions) {
        bulkActions.style.display = requests.length > 1 ? 'block' : 'none';
    }
}

function renderRegisteredUsers(users) {
    const container = document.getElementById('usersList');
    
    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-people display-4 text-muted"></i>
                <h5 class="mt-3 text-muted">No hay usuarios registrados</h5>
                <p class="text-muted">Aún no se han registrado usuarios en el sistema</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-card animate__animated animate__fadeInUp">
            <div class="user-info">
                <div class="user-avatar">
                    ${user.avatar ? `<img src="${user.avatar}" alt="Avatar">` : '<i class="bi bi-person-circle"></i>'}
                </div>
                <div class="user-details">
                    <h6>${user.nombre} ${user.esta_conectado ? '<span class="online-indicator" title="Conectado"></span>' : ''}</h6>
                    <p class="text-muted mb-1">${user.email}</p>
                    <span class="badge bg-${getRoleBadgeColor(user.rol)}">${getRoleDisplayName(user.rol)}</span>
                    <small class="text-muted d-block">Último acceso: ${formatRelativeTime(user.ultimo_acceso)}</small>
                    ${user.telefono ? `<small class="text-muted d-block"><i class="bi bi-telephone me-1"></i>${user.telefono}</small>` : ''}
                </div>
            </div>
            <div class="user-actions">
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="editUser(${user.id})"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                        <li><a class="dropdown-item" href="#" onclick="changeRole(${user.id})"><i class="bi bi-person-gear me-2"></i>Cambiar Rol</a></li>
                        <li><a class="dropdown-item" href="#" onclick="resetPassword(${user.id})"><i class="bi bi-key me-2"></i>Restablecer Contraseña</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-warning" href="#" onclick="blockUser(${user.id})"><i class="bi bi-person-slash me-2"></i>Bloquear Usuario</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBlockedUsers(users) {
    const container = document.getElementById('blockedUsersList');
    
    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-person-x display-4 text-muted"></i>
                <h5 class="mt-3 text-muted">No hay usuarios bloqueados</h5>
                <p class="text-muted">Ningún usuario ha sido bloqueado</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-card blocked animate__animated animate__fadeInUp">
            <div class="user-info">
                <div class="user-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>
                <div class="user-details">
                    <h6>${user.nombre}</h6>
                    <p class="text-muted mb-1">${user.email}</p>
                    <span class="badge bg-danger">Bloqueado</span>
                    <small class="text-muted d-block">Bloqueado ${formatRelativeTime(user.fecha_bloqueo)} - ${user.razon_bloqueo}</small>
                    <small class="text-muted d-block">Por: ${user.bloqueado_por}</small>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn btn-success btn-sm me-2" onclick="unblockUser(${user.id})" title="Desbloquear usuario">
                    <i class="bi bi-person-check me-1"></i>Desbloquear
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})" title="Eliminar permanentemente">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function setupSearchFunctionality() {
    const searchPending = document.getElementById('searchPending');
    const searchUsers = document.getElementById('searchUsers');
    const searchBlocked = document.getElementById('searchBlocked');
    
    if (searchPending) {
        searchPending.addEventListener('input', (e) => filterRequests(e.target.value));
    }
    
    if (searchUsers) {
        searchUsers.addEventListener('input', (e) => filterUsers(e.target.value));
    }
    
    if (searchBlocked) {
        searchBlocked.addEventListener('input', (e) => filterBlockedUsers(e.target.value));
    }
}

function updateStats() {
    // Actualizar estadísticas en el header
    const activeUsersCount = document.getElementById('activeUsersCount');
    const pendingRequestsCount = document.getElementById('pendingRequestsCount');
    const blockedUsersCount = document.getElementById('blockedUsersCount');
    const totalUsersCount = document.getElementById('totalUsersCount');
    
    if (activeUsersCount) {
        activeUsersCount.textContent = registeredUsers.length;
        // Animación de contador
        animateNumber(activeUsersCount, registeredUsers.length);
    }
    
    if (pendingRequestsCount) {
        pendingRequestsCount.textContent = pendingRequests.length;
        animateNumber(pendingRequestsCount, pendingRequests.length);
    }
    
    if (blockedUsersCount) {
        blockedUsersCount.textContent = blockedUsers.length;
        animateNumber(blockedUsersCount, blockedUsers.length);
    }
    
    if (totalUsersCount) {
        const total = registeredUsers.length + blockedUsers.length;
        totalUsersCount.textContent = total;
        animateNumber(totalUsersCount, total);
    }
    
    // Actualizar badge en la tab
    const pendingBadge = document.getElementById('pendingBadge');
    if (pendingBadge) {
        pendingBadge.textContent = pendingRequests.length;
        if (pendingRequests.length === 0) {
            pendingBadge.style.display = 'none';
        } else {
            pendingBadge.style.display = 'inline-block';
        }
    }
}

// Función para animar números en las estadísticas
function animateNumber(element, targetNumber) {
    const currentNumber = parseInt(element.textContent) || 0;
    const increment = targetNumber > currentNumber ? 1 : -1;
    const duration = 1000; // 1 segundo
    const steps = Math.abs(targetNumber - currentNumber);
    const stepDuration = steps > 0 ? duration / steps : 0;
    
    if (steps === 0) return;
    
    let current = currentNumber;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if ((increment > 0 && current >= targetNumber) || (increment < 0 && current <= targetNumber)) {
            clearInterval(timer);
            element.textContent = targetNumber;
        }
    }, stepDuration);
}

// Funciones de filtrado y búsqueda
function filterRequests(searchTerm) {
    const filteredRequests = pendingRequests.filter(request => 
        request.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderPendingRequests(filteredRequests);
}

function filterUsers(searchTerm) {
    const filteredUsers = registeredUsers.filter(user => 
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderRegisteredUsers(filteredUsers);
}

function filterBlockedUsers(searchTerm) {
    const filteredUsers = blockedUsers.filter(user => 
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.razon_bloqueo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderBlockedUsers(filteredUsers);
}

function handleRoleFilter(event) {
    const selectedRole = event.target.value;
    
    if (!selectedRole) {
        renderRegisteredUsers(registeredUsers);
        return;
    }
    
    const filteredUsers = registeredUsers.filter(user => user.rol === selectedRole);
    renderRegisteredUsers(filteredUsers);
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const tabId = event.target.closest('.tab-pane').id;
    
    switch (tabId) {
        case 'pending':
            filterRequests(query);
            break;
        case 'users':
            filterUsers(query);
            break;
        case 'blocked':
            filterBlockedUsers(query);
            break;
    }
}

function handleRoleFilter(event) {
    const role = event.target.value;
    filterUsers('', role);
}

function filterRequests(query) {
    const filteredRequests = pendingRequests.filter(request =>
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.role.toLowerCase().includes(query)
    );
    
    renderPendingRequests(filteredRequests);
}

function filterUsers(query, role = '') {
    let filteredUsers = registeredUsers;
    
    if (query) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }
    
    if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    renderRegisteredUsers(filteredUsers);
}

function filterBlockedUsers(query) {
    const filteredUsers = blockedUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.blockReason.toLowerCase().includes(query)
    );
    
    renderBlockedUsers(filteredUsers);
}

function renderPendingRequests(requests) {
    const container = document.querySelector('.pending-requests');
    if (!container) return;
    
    container.innerHTML = requests.map(request => `
        <div class="request-card" data-request-id="${request.id}">
            <div class="request-info">
                <div class="user-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>
                <div class="user-details">
                    <h6>${request.name}</h6>
                    <p class="text-muted mb-1">${request.email}</p>
                    <span class="badge bg-${getRoleBadgeColor(request.role)}">${getRoleDisplayName(request.role)}</span>
                    <small class="text-muted d-block">Solicitado ${formatRelativeTime(request.requestDate)}</small>
                </div>
            </div>
            <div class="request-actions">
                <button class="btn btn-sm btn-success me-2" onclick="approveUser(${request.id})">
                    <i class="bi bi-check-circle me-1"></i>Aprobar
                </button>
                <button class="btn btn-sm btn-danger me-2" onclick="rejectUser(${request.id})">
                    <i class="bi bi-x-circle me-1"></i>Rechazar
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="viewDetails(${request.id})">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderRegisteredUsers(users) {
    const container = document.querySelector('.users-list');
    if (!container) return;
    
    container.innerHTML = users.map(user => `
        <div class="user-card" data-user-id="${user.id}">
            <div class="user-info">
                <div class="user-avatar">
                    ${user.id === 1 ? '<img src="../../img/logo.png" alt="Avatar">' : '<i class="bi bi-person-circle"></i>'}
                </div>
                <div class="user-details">
                    <h6>${user.name} ${user.isOnline ? '<span class="online-indicator"></span>' : ''}</h6>
                    <p class="text-muted mb-1">${user.email}</p>
                    <span class="badge bg-${getRoleBadgeColor(user.role)}">${getRoleDisplayName(user.role)}</span>
                    <small class="text-muted d-block">Último acceso: ${formatRelativeTime(user.lastAccess)}</small>
                </div>
            </div>
            <div class="user-actions">
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="editUser(${user.id})"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                        <li><a class="dropdown-item" href="#" onclick="changeRole(${user.id})"><i class="bi bi-person-gear me-2"></i>Cambiar Rol</a></li>
                        <li><a class="dropdown-item" href="#" onclick="resetPassword(${user.id})"><i class="bi bi-key me-2"></i>Restablecer Contraseña</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-warning" href="#" onclick="blockUser(${user.id})"><i class="bi bi-person-slash me-2"></i>Bloquear Usuario</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBlockedUsers(users) {
    const container = document.querySelector('.blocked-users');
    if (!container) return;
    
    container.innerHTML = users.map(user => `
        <div class="user-card blocked" data-user-id="${user.id}">
            <div class="user-info">
                <div class="user-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>
                <div class="user-details">
                    <h6>${user.name}</h6>
                    <p class="text-muted mb-1">${user.email}</p>
                    <span class="badge bg-danger">Bloqueado</span>
                    <small class="text-muted d-block">Bloqueado ${formatRelativeTime(user.blockDate)} - ${user.blockReason}</small>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn btn-success btn-sm me-2" onclick="unblockUser(${user.id})">
                    <i class="bi bi-person-check me-1"></i>Desbloquear
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function approveUser(requestId) {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    
    if (confirm(`¿Aprobar la solicitud de ${request.name}?`)) {
        // Simular aprobación
        showNotification(`Usuario ${request.name} aprobado correctamente`, 'success');
        
        // Mover a usuarios registrados
        registeredUsers.push({
            id: Date.now(),
            name: request.name,
            email: request.email,
            role: request.role,
            lastAccess: new Date(),
            isOnline: false,
            registrationDate: new Date()
        });
        
        // Remover de pendientes
        pendingRequests = pendingRequests.filter(r => r.id !== requestId);
        
        // Re-renderizar
        renderPendingRequests(pendingRequests);
        updateStats();
    }
}

function rejectUser(requestId) {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    
    if (confirm(`¿Rechazar la solicitud de ${request.name}?`)) {
        showNotification(`Solicitud de ${request.name} rechazada`, 'warning');
        
        // Remover de pendientes
        pendingRequests = pendingRequests.filter(r => r.id !== requestId);
        renderPendingRequests(pendingRequests);
        updateStats();
    }
}

function blockUser(userId) {
    const user = registeredUsers.find(u => u.id === userId);
    if (!user) return;
    
    if (confirm(`¿Bloquear al usuario ${user.name}?`)) {
        showNotification(`Usuario ${user.name} bloqueado`, 'warning');
        
        // Mover a bloqueados
        blockedUsers.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            blockDate: new Date(),
            blockReason: 'Bloqueado manualmente'
        });
        
        // Remover de registrados
        registeredUsers = registeredUsers.filter(u => u.id !== userId);
        
        // Re-renderizar
        renderRegisteredUsers(registeredUsers);
        renderBlockedUsers(blockedUsers);
        updateStats();
    }
}

function unblockUser(userId) {
    const user = blockedUsers.find(u => u.id === userId);
    if (!user) return;
    
    if (confirm(`¿Desbloquear al usuario ${user.name}?`)) {
        showNotification(`Usuario ${user.name} desbloqueado`, 'success');
        
        // Mover a registrados
        registeredUsers.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastAccess: new Date(),
            isOnline: false,
            registrationDate: new Date()
        });
        
        // Remover de bloqueados
        blockedUsers = blockedUsers.filter(u => u.id !== userId);
        
        // Re-renderizar
        renderRegisteredUsers(registeredUsers);
        renderBlockedUsers(blockedUsers);
        updateStats();
    }
}

function deleteUser(userId) {
    const user = blockedUsers.find(u => u.id === userId);
    if (!user) return;
    
    if (confirm(`¿Eliminar permanentemente al usuario ${user.name}? Esta acción no se puede deshacer.`)) {
        showNotification(`Usuario ${user.name} eliminado permanentemente`, 'danger');
        
        // Remover de bloqueados
        blockedUsers = blockedUsers.filter(u => u.id !== userId);
        renderBlockedUsers(blockedUsers);
        updateStats();
    }
}

function editUser(userId) {
    const user = registeredUsers.find(u => u.id === userId);
    if (!user) return;
    
    currentUserToEdit = user;
    // Aquí se abriría un modal para editar el usuario
    showNotification(`Editando usuario ${user.name}`, 'info');
}

function changeRole(userId) {
    const user = registeredUsers.find(u => u.id === userId);
    if (!user) return;
    
    currentUserToEdit = user;
    
    // Configurar el modal de cambio de rol
    const newRoleSelect = document.getElementById('newRole');
    if (newRoleSelect) {
        newRoleSelect.value = user.role;
    }
    
    const changeRoleModal = new bootstrap.Modal(document.getElementById('changeRoleModal'));
    changeRoleModal.show();
}

function saveRoleChange() {
    if (!currentUserToEdit) return;
    
    const newRole = document.getElementById('newRole').value;
    const oldRole = currentUserToEdit.role;
    
    // Actualizar el rol
    currentUserToEdit.role = newRole;
    
    showNotification(`Rol de ${currentUserToEdit.name} cambiado de ${getRoleDisplayName(oldRole)} a ${getRoleDisplayName(newRole)}`, 'success');
    
    // Cerrar modal
    const changeRoleModal = bootstrap.Modal.getInstance(document.getElementById('changeRoleModal'));
    changeRoleModal.hide();
    
    // Re-renderizar
    renderRegisteredUsers(registeredUsers);
    currentUserToEdit = null;
}

function resetPassword(userId) {
    const user = registeredUsers.find(u => u.id === userId);
    if (!user) return;
    
    if (confirm(`¿Restablecer la contraseña de ${user.name}?`)) {
        showNotification(`Contraseña de ${user.name} restablecida. Se ha enviado un email con la nueva contraseña.`, 'success');
    }
}

function viewDetails(requestId) {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    
    // Configurar contenido del modal
    const modalBody = document.querySelector('#requestDetailsModal .modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Información Personal</h6>
                    <p><strong>Nombre:</strong> ${request.name}</p>
                    <p><strong>Email:</strong> ${request.email}</p>
                    <p><strong>Rol solicitado:</strong> ${getRoleDisplayName(request.role)}</p>
                    <p><strong>Fecha de solicitud:</strong> ${request.requestDate.toLocaleDateString()}</p>
                </div>
                <div class="col-md-6">
                    <h6>Documentos adjuntos</h6>
                    ${request.documents.map(doc => `
                        <p><i class="bi bi-file-earmark-pdf me-2"></i>${doc}</p>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    const requestDetailsModal = new bootstrap.Modal(document.getElementById('requestDetailsModal'));
    requestDetailsModal.show();
}

function approveAll() {
    if (pendingRequests.length === 0) {
        showNotification('No hay solicitudes pendientes', 'info');
        return;
    }
    
    if (confirm(`¿Aprobar todas las ${pendingRequests.length} solicitudes pendientes?`)) {
        pendingRequests.forEach(request => {
            registeredUsers.push({
                id: Date.now() + Math.random(),
                name: request.name,
                email: request.email,
                role: request.role,
                lastAccess: new Date(),
                isOnline: false,
                registrationDate: new Date()
            });
        });
        
        showNotification(`${pendingRequests.length} usuarios aprobados correctamente`, 'success');
        pendingRequests = [];
        renderPendingRequests(pendingRequests);
        updateStats();
    }
}

function rejectAll() {
    if (pendingRequests.length === 0) {
        showNotification('No hay solicitudes pendientes', 'info');
        return;
    }
    
    if (confirm(`¿Rechazar todas las ${pendingRequests.length} solicitudes pendientes?`)) {
        showNotification(`${pendingRequests.length} solicitudes rechazadas`, 'warning');
        pendingRequests = [];
        renderPendingRequests(pendingRequests);
        updateStats();
    }
}

function updateStats() {
    // Actualizar estadísticas en el header
    const activeUsersSpan = document.querySelector('.stat-number');
    const pendingSpan = document.querySelectorAll('.stat-number')[1];
    
    if (activeUsersSpan) {
        activeUsersSpan.textContent = registeredUsers.length;
    }
    
    if (pendingSpan) {
        pendingSpan.textContent = pendingRequests.length;
    }
    
    // Actualizar badge en la tab
    const pendingBadge = document.querySelector('#pending-tab .badge');
    if (pendingBadge) {
        pendingBadge.textContent = pendingRequests.length;
        if (pendingRequests.length === 0) {
            pendingBadge.style.display = 'none';
        }
    }
}

function getRoleBadgeColor(role) {
    const colors = {
        admin: 'danger',
        supervisor: 'warning',
        veterinario: 'info',
        trabajador: 'secondary'
    };
    return colors[role] || 'secondary';
}

function getRoleDisplayName(role) {
    const names = {
        admin: 'Administrador',
        supervisor: 'Supervisor',
        veterinario: 'Veterinario',
        trabajador: 'Trabajador'
    };
    return names[role] || role;
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
        return `hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (hours < 24) {
        return `hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else {
        return `hace ${days} día${days !== 1 ? 's' : ''}`;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', function() {
    renderPendingRequests(pendingRequests);
    renderRegisteredUsers(registeredUsers);
    renderBlockedUsers(blockedUsers);
    updateStats();
});

// Exportar funciones globales
window.approveUser = approveUser;
window.rejectUser = rejectUser;
window.blockUser = blockUser;
window.unblockUser = unblockUser;
window.deleteUser = deleteUser;
window.editUser = editUser;
window.changeRole = changeRole;
window.saveRoleChange = saveRoleChange;
window.resetPassword = resetPassword;
window.viewDetails = viewDetails;
window.approveAll = approveAll;
window.rejectAll = rejectAll;
