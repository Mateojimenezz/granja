// Control de Usuarios - JavaScript

let allUsers = [];
let filteredUsers = [];
let selectedUsers = [];
let currentSuspendUser = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeUserControl();
    setupEventListeners();
    loadUsers();
});

function initializeUserControl() {
    // Configurar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Configurar observador de selección
    setupSelectionObserver();
}

function setupEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filtros
    const statusFilter = document.getElementById('statusFilter');
    const roleFilter = document.getElementById('roleFilter');
    const sortBy = document.getElementById('sortBy');
    
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (roleFilter) roleFilter.addEventListener('change', applyFilters);
    if (sortBy) sortBy.addEventListener('change', applySorting);
    
    // Seleccionar todo
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', toggleSelectAll);
    }
    
    // Observer para checkboxes de usuarios
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('user-checkbox')) {
            handleUserSelection(e.target);
        }
    });
}

function setupSelectionObserver() {
    // Observer para mostrar/ocultar barra de acciones masivas
    const observer = new MutationObserver(function(mutations) {
        updateBulkActionsBar();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function loadUsers() {
    // Simular datos de usuarios
    allUsers = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan.perez@email.com',
            role: 'admin',
            status: 'active',
            lastAccess: new Date(Date.now() - 2 * 60 * 60 * 1000),
            activeSessions: 2,
            registrationDate: new Date('2024-01-15'),
            avatar: '../../img/logo.png'
        },
        {
            id: 2,
            name: 'Laura Martínez',
            email: 'laura.martinez@email.com',
            role: 'veterinario',
            status: 'active',
            lastAccess: new Date(Date.now() - 24 * 60 * 60 * 1000),
            activeSessions: 1,
            registrationDate: new Date('2024-02-20')
        },
        {
            id: 3,
            name: 'Roberto García',
            email: 'roberto.garcia@email.com',
            role: 'trabajador',
            status: 'blocked',
            lastAccess: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            activeSessions: 0,
            blockDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            blockReason: 'Violación de políticas'
        },
        {
            id: 4,
            name: 'Isabel Ruiz',
            email: 'isabel.ruiz@email.com',
            role: 'supervisor',
            status: 'suspended',
            lastAccess: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            activeSessions: 0,
            suspendDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            suspendUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            suspendReason: 'Actividad sospechosa'
        },
        {
            id: 5,
            name: 'Pedro Sánchez',
            email: 'pedro.sanchez@email.com',
            role: 'supervisor',
            status: 'active',
            lastAccess: new Date(Date.now() - 30 * 60 * 1000),
            activeSessions: 2,
            registrationDate: new Date('2024-03-10')
        }
    ];
    
    filteredUsers = [...allUsers];
    renderUsers();
    updateStatistics();
}

function renderUsers() {
    const container = document.querySelector('.users-control-list');
    if (!container) return;
    
    container.innerHTML = filteredUsers.map(user => `
        <div class="user-control-card ${user.status}" data-user-id="${user.id}" data-status="${user.status}" data-role="${user.role}">
            <div class="user-select">
                <input type="checkbox" class="form-check-input user-checkbox" value="${user.id}" ${selectedUsers.includes(user.id) ? 'checked' : ''}>
            </div>
            <div class="user-info">
                <div class="user-avatar">
                    ${user.avatar ? `<img src="${user.avatar}" alt="Avatar">` : '<i class="bi bi-person-circle"></i>'}
                    <span class="status-indicator ${user.status}"></span>
                </div>
                <div class="user-details">
                    <h6>${user.name}</h6>
                    <p class="text-muted mb-1">${user.email}</p>
                    <span class="badge bg-${getRoleBadgeColor(user.role)}">${getRoleDisplayName(user.role)}</span>
                </div>
            </div>
            <div class="user-stats">
                ${getUserStats(user)}
            </div>
            <div class="user-status">
                <span class="status-badge ${user.status}">
                    <i class="bi bi-circle-fill"></i>
                    ${getStatusDisplayName(user.status)}
                </span>
            </div>
            <div class="user-actions">
                ${getUserActions(user)}
            </div>
        </div>
    `).join('');
}

function getUserStats(user) {
    switch (user.status) {
        case 'active':
            return `
                <div class="stat-item">
                    <small class="text-muted">Último acceso</small>
                    <span>${formatRelativeTime(user.lastAccess)}</span>
                </div>
                <div class="stat-item">
                    <small class="text-muted">Sesiones activas</small>
                    <span>${user.activeSessions}</span>
                </div>
            `;
        case 'blocked':
            return `
                <div class="stat-item">
                    <small class="text-muted">Bloqueado</small>
                    <span>${formatRelativeTime(user.blockDate)}</span>
                </div>
                <div class="stat-item">
                    <small class="text-muted">Motivo</small>
                    <span>${user.blockReason}</span>
                </div>
            `;
        case 'suspended':
            const daysLeft = Math.ceil((user.suspendUntil - new Date()) / (1000 * 60 * 60 * 24));
            return `
                <div class="stat-item">
                    <small class="text-muted">Suspendido</small>
                    <span>${formatRelativeTime(user.suspendDate)}</span>
                </div>
                <div class="stat-item">
                    <small class="text-muted">Hasta</small>
                    <span>${daysLeft} días más</span>
                </div>
            `;
        default:
            return '';
    }
}

function getUserActions(user) {
    switch (user.status) {
        case 'active':
            return `
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-warning" onclick="blockUser(${user.id})" title="Bloquear">
                        <i class="bi bi-person-x"></i>
                    </button>
                    <button class="btn btn-sm btn-info" onclick="suspendUser(${user.id})" title="Suspender">
                        <i class="bi bi-person-slash"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="viewActivity(${user.id})" title="Ver actividad">
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            `;
        case 'blocked':
            return `
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success" onclick="activateUser(${user.id})" title="Activar">
                        <i class="bi bi-person-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="viewActivity(${user.id})" title="Ver actividad">
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            `;
        case 'suspended':
            return `
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success" onclick="activateUser(${user.id})" title="Activar">
                        <i class="bi bi-person-check"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="blockUser(${user.id})" title="Bloquear">
                        <i class="bi bi-person-x"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="viewActivity(${user.id})" title="Ver actividad">
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            `;
        default:
            return '';
    }
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    applyFilters(query);
}

function applyFilters(searchQuery = '') {
    const statusFilter = document.getElementById('statusFilter').value;
    const roleFilter = document.getElementById('roleFilter').value;
    const query = searchQuery || document.getElementById('searchInput').value.toLowerCase();
    
    filteredUsers = allUsers.filter(user => {
        const matchesSearch = !query || 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);
        
        const matchesStatus = !statusFilter || user.status === statusFilter;
        const matchesRole = !roleFilter || user.role === roleFilter;
        
        return matchesSearch && matchesStatus && matchesRole;
    });
    
    applySorting();
}

function applySorting() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredUsers.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'email':
                return a.email.localeCompare(b.email);
            case 'role':
                return a.role.localeCompare(b.role);
            case 'lastAccess':
                return b.lastAccess - a.lastAccess;
            case 'status':
                return a.status.localeCompare(b.status);
            default:
                return 0;
        }
    });
    
    renderUsers();
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const userCheckboxes = document.querySelectorAll('.user-checkbox');
    
    if (selectAll.checked) {
        selectedUsers = filteredUsers.map(user => user.id);
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        selectedUsers = [];
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    
    updateBulkActionsBar();
}

function handleUserSelection(checkbox) {
    const userId = parseInt(checkbox.value);
    
    if (checkbox.checked) {
        if (!selectedUsers.includes(userId)) {
            selectedUsers.push(userId);
        }
    } else {
        selectedUsers = selectedUsers.filter(id => id !== userId);
    }
    
    // Actualizar estado del checkbox "Seleccionar todo"
    const selectAll = document.getElementById('selectAll');
    const visibleUserIds = filteredUsers.map(user => user.id);
    const visibleSelectedUsers = selectedUsers.filter(id => visibleUserIds.includes(id));
    
    if (visibleSelectedUsers.length === visibleUserIds.length && visibleUserIds.length > 0) {
        selectAll.indeterminate = false;
        selectAll.checked = true;
    } else if (visibleSelectedUsers.length > 0) {
        selectAll.indeterminate = true;
        selectAll.checked = false;
    } else {
        selectAll.indeterminate = false;
        selectAll.checked = false;
    }
    
    updateBulkActionsBar();
}

function updateBulkActionsBar() {
    const bulkActionsBar = document.getElementById('bulkActionsBar');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedUsers.length > 0) {
        bulkActionsBar.style.display = 'block';
        selectedCount.textContent = `${selectedUsers.length} usuario${selectedUsers.length !== 1 ? 's' : ''} seleccionado${selectedUsers.length !== 1 ? 's' : ''}`;
    } else {
        bulkActionsBar.style.display = 'none';
    }
}

function updateStatistics() {
    const stats = {
        active: allUsers.filter(u => u.status === 'active').length,
        inactive: allUsers.filter(u => u.status === 'inactive').length,
        blocked: allUsers.filter(u => u.status === 'blocked').length,
        suspended: allUsers.filter(u => u.status === 'suspended').length
    };
    
    const statElements = document.querySelectorAll('.stat-info h3');
    if (statElements.length >= 4) {
        statElements[0].textContent = stats.active;
        statElements[1].textContent = stats.inactive;
        statElements[2].textContent = stats.blocked;
        statElements[3].textContent = stats.suspended;
    }
}

function activateUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    showConfirmModal(
        'Activar Usuario',
        `¿Activar al usuario ${user.name}?`,
        'success',
        () => {
            user.status = 'active';
            user.lastAccess = new Date();
            user.activeSessions = 1;
            delete user.blockDate;
            delete user.blockReason;
            delete user.suspendDate;
            delete user.suspendUntil;
            delete user.suspendReason;
            
            showNotification(`Usuario ${user.name} activado correctamente`, 'success');
            applyFilters();
            updateStatistics();
        }
    );
}

function blockUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    showConfirmModal(
        'Bloquear Usuario',
        `¿Bloquear al usuario ${user.name}?`,
        'warning',
        () => {
            user.status = 'blocked';
            user.blockDate = new Date();
            user.blockReason = 'Bloqueado manualmente';
            user.activeSessions = 0;
            
            showNotification(`Usuario ${user.name} bloqueado`, 'warning');
            applyFilters();
            updateStatistics();
        }
    );
}

function suspendUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    currentSuspendUser = user;
    
    const suspendModal = new bootstrap.Modal(document.getElementById('suspendModal'));
    suspendModal.show();
}

function confirmSuspend() {
    if (!currentSuspendUser) return;
    
    const duration = document.getElementById('suspendDuration').value;
    const reason = document.getElementById('suspendReason').value;
    
    if (!reason.trim()) {
        showNotification('Debe especificar un motivo para la suspensión', 'error');
        return;
    }
    
    let days;
    if (duration === 'custom') {
        days = parseInt(prompt('Ingrese el número de días:')) || 7;
    } else {
        days = parseInt(duration);
    }
    
    currentSuspendUser.status = 'suspended';
    currentSuspendUser.suspendDate = new Date();
    currentSuspendUser.suspendUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    currentSuspendUser.suspendReason = reason;
    currentSuspendUser.activeSessions = 0;
    
    showNotification(`Usuario ${currentSuspendUser.name} suspendido por ${days} días`, 'warning');
    
    // Cerrar modal y limpiar
    const suspendModal = bootstrap.Modal.getInstance(document.getElementById('suspendModal'));
    suspendModal.hide();
    document.getElementById('suspendReason').value = '';
    currentSuspendUser = null;
    
    applyFilters();
    updateStatistics();
}

function deleteUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    showConfirmModal(
        'Eliminar Usuario',
        `¿Eliminar permanentemente al usuario ${user.name}? Esta acción no se puede deshacer.`,
        'danger',
        () => {
            allUsers = allUsers.filter(u => u.id !== userId);
            filteredUsers = filteredUsers.filter(u => u.id !== userId);
            selectedUsers = selectedUsers.filter(id => id !== userId);
            
            showNotification(`Usuario ${user.name} eliminado permanentemente`, 'danger');
            renderUsers();
            updateStatistics();
            updateBulkActionsBar();
        }
    );
}

function viewActivity(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    // Simular datos de actividad
    const activityData = `
        <div class="activity-timeline">
            <div class="activity-item">
                <div class="activity-time">Hoy, 14:30</div>
                <div class="activity-action">Inicio de sesión desde 192.168.1.100</div>
            </div>
            <div class="activity-item">
                <div class="activity-time">Hoy, 09:15</div>
                <div class="activity-action">Acceso al módulo de Producción</div>
            </div>
            <div class="activity-item">
                <div class="activity-time">Ayer, 16:45</div>
                <div class="activity-action">Modificación de registro de animal #1234</div>
            </div>
            <div class="activity-item">
                <div class="activity-time">Ayer, 11:20</div>
                <div class="activity-action">Descarga de reporte mensual</div>
            </div>
        </div>
        <style>
            .activity-timeline { max-height: 400px; overflow-y: auto; }
            .activity-item { padding: 10px; border-bottom: 1px solid #eee; }
            .activity-time { font-size: 12px; color: #666; font-weight: bold; }
            .activity-action { margin-top: 5px; }
        </style>
    `;
    
    const modalBody = document.querySelector('#activityModal .modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <h6>Actividad de ${user.name}</h6>
            ${activityData}
        `;
    }
    
    const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
    activityModal.show();
}

function bulkActivate() {
    if (selectedUsers.length === 0) return;
    
    const count = selectedUsers.length;
    showConfirmModal(
        'Activación Masiva',
        `¿Activar ${count} usuario${count !== 1 ? 's' : ''}?`,
        'success',
        () => {
            selectedUsers.forEach(userId => {
                const user = allUsers.find(u => u.id === userId);
                if (user && user.status !== 'active') {
                    user.status = 'active';
                    user.lastAccess = new Date();
                    user.activeSessions = 1;
                    delete user.blockDate;
                    delete user.blockReason;
                    delete user.suspendDate;
                    delete user.suspendUntil;
                    delete user.suspendReason;
                }
            });
            
            showNotification(`${count} usuario${count !== 1 ? 's' : ''} activado${count !== 1 ? 's' : ''}`, 'success');
            clearSelection();
            applyFilters();
            updateStatistics();
        }
    );
}

function bulkBlock() {
    if (selectedUsers.length === 0) return;
    
    const count = selectedUsers.length;
    showConfirmModal(
        'Bloqueo Masivo',
        `¿Bloquear ${count} usuario${count !== 1 ? 's' : ''}?`,
        'warning',
        () => {
            selectedUsers.forEach(userId => {
                const user = allUsers.find(u => u.id === userId);
                if (user && user.status !== 'blocked') {
                    user.status = 'blocked';
                    user.blockDate = new Date();
                    user.blockReason = 'Bloqueo masivo';
                    user.activeSessions = 0;
                }
            });
            
            showNotification(`${count} usuario${count !== 1 ? 's' : ''} bloqueado${count !== 1 ? 's' : ''}`, 'warning');
            clearSelection();
            applyFilters();
            updateStatistics();
        }
    );
}

function bulkSuspend() {
    if (selectedUsers.length === 0) return;
    
    const count = selectedUsers.length;
    const days = parseInt(prompt(`¿Por cuántos días suspender ${count} usuario${count !== 1 ? 's' : ''}?`, '7'));
    
    if (!days || days <= 0) return;
    
    showConfirmModal(
        'Suspensión Masiva',
        `¿Suspender ${count} usuario${count !== 1 ? 's' : ''} por ${days} día${days !== 1 ? 's' : ''}?`,
        'info',
        () => {
            selectedUsers.forEach(userId => {
                const user = allUsers.find(u => u.id === userId);
                if (user && user.status !== 'suspended') {
                    user.status = 'suspended';
                    user.suspendDate = new Date();
                    user.suspendUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
                    user.suspendReason = 'Suspensión masiva';
                    user.activeSessions = 0;
                }
            });
            
            showNotification(`${count} usuario${count !== 1 ? 's' : ''} suspendido${count !== 1 ? 's' : ''} por ${days} día${days !== 1 ? 's' : ''}`, 'info');
            clearSelection();
            applyFilters();
            updateStatistics();
        }
    );
}

function bulkDelete() {
    if (selectedUsers.length === 0) return;
    
    const count = selectedUsers.length;
    showConfirmModal(
        'Eliminación Masiva',
        `¿Eliminar permanentemente ${count} usuario${count !== 1 ? 's' : ''}? Esta acción no se puede deshacer.`,
        'danger',
        () => {
            allUsers = allUsers.filter(user => !selectedUsers.includes(user.id));
            filteredUsers = filteredUsers.filter(user => !selectedUsers.includes(user.id));
            
            showNotification(`${count} usuario${count !== 1 ? 's' : ''} eliminado${count !== 1 ? 's' : ''} permanentemente`, 'danger');
            clearSelection();
            renderUsers();
            updateStatistics();
        }
    );
}

function clearSelection() {
    selectedUsers = [];
    document.getElementById('selectAll').checked = false;
    document.getElementById('selectAll').indeterminate = false;
    document.querySelectorAll('.user-checkbox').forEach(cb => cb.checked = false);
    updateBulkActionsBar();
}

function showConfirmModal(title, message, type, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const bodyEl = document.getElementById('confirmModalBody');
    const confirmBtn = document.getElementById('confirmButton');
    
    titleEl.textContent = title;
    bodyEl.textContent = message;
    
    // Configurar botón según el tipo
    confirmBtn.className = `btn btn-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'info' ? 'info' : 'danger'}`;
    confirmBtn.textContent = 'Confirmar';
    
    // Configurar evento de confirmación
    confirmBtn.onclick = () => {
        onConfirm();
        bootstrap.Modal.getInstance(modal).hide();
    };
    
    const confirmModal = new bootstrap.Modal(modal);
    confirmModal.show();
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

function getStatusDisplayName(status) {
    const names = {
        active: 'Activo',
        inactive: 'Inactivo',
        blocked: 'Bloqueado',
        suspended: 'Suspendido'
    };
    return names[status] || status;
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
        return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (hours < 24) {
        return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else {
        return `Hace ${days} día${days !== 1 ? 's' : ''}`;
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

// Exportar funciones globales
window.searchUsers = handleSearch;
window.filterUsers = applyFilters;
window.sortUsers = applySorting;
window.toggleSelectAll = toggleSelectAll;
window.activateUser = activateUser;
window.blockUser = blockUser;
window.suspendUser = suspendUser;
window.confirmSuspend = confirmSuspend;
window.deleteUser = deleteUser;
window.viewActivity = viewActivity;
window.bulkAction = (action) => {
    switch (action) {
        case 'block': bulkBlock(); break;
        case 'activate': bulkActivate(); break;
    }
};
window.bulkActivate = bulkActivate;
window.bulkBlock = bulkBlock;
window.bulkSuspend = bulkSuspend;
window.bulkDelete = bulkDelete;
