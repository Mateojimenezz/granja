// Perfil de Usuario - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupEventListeners();
});

function initializeProfile() {
    // Cargar datos del perfil desde localStorage o API
    loadProfileData();
    
    // Configurar validación de formularios
    setupFormValidation();
    
    // Cargar actividad reciente
    loadRecentActivity();
}

function setupEventListeners() {
    // Formulario de perfil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Formulario de contraseña
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
    // Switches de autenticación
    const smsAuth = document.getElementById('smsAuth');
    const emailAuth = document.getElementById('emailAuth');
    
    if (smsAuth) {
        smsAuth.addEventListener('change', handleAuthToggle);
    }
    
    if (emailAuth) {
        emailAuth.addEventListener('change', handleAuthToggle);
    }
}

function loadProfileData() {
    // Simular carga de datos del perfil
    const profileData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        phone: '+57 300 123 4567',
        role: 'supervisor',
        bio: 'Supervisor de producción con 5 años de experiencia en manejo porcino.'
    };
    
    // Llenar el formulario con los datos
    Object.keys(profileData).forEach(key => {
        const field = document.getElementById(key);
        if (field) {
            field.value = profileData[key];
        }
    });
}

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

function handleProfileUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const profileData = Object.fromEntries(formData);
    
    // Mostrar loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Guardando...';
    submitBtn.disabled = true;
    
    // Simular llamada a API
    setTimeout(() => {
        console.log('Datos del perfil actualizados:', profileData);
        
        // Mostrar notificación de éxito
        showNotification('Perfil actualizado correctamente', 'success');
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Agregar a la actividad reciente
        addToRecentActivity('Perfil actualizado', 'success');
        
    }, 2000);
}

function handlePasswordChange(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar contraseñas
    if (newPassword !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Actualizando...';
    submitBtn.disabled = true;
    
    // Simular llamada a API
    setTimeout(() => {
        console.log('Contraseña actualizada');
        
        // Mostrar notificación de éxito
        showNotification('Contraseña actualizada correctamente', 'success');
        
        // Limpiar formulario
        event.target.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Agregar a la actividad reciente
        addToRecentActivity('Contraseña cambiada', 'warning');
        
    }, 2000);
}

function handleAuthToggle(event) {
    const isChecked = event.target.checked;
    const authType = event.target.id;
    
    console.log(`${authType} ${isChecked ? 'activado' : 'desactivado'}`);
    
    // Simular llamada a API
    showNotification(
        `Autenticación ${authType === 'smsAuth' ? 'SMS' : 'Email'} ${isChecked ? 'activada' : 'desactivada'}`, 
        'info'
    );
}

function changeAvatar() {
    const avatarModal = new bootstrap.Modal(document.getElementById('avatarModal'));
    avatarModal.show();
}

function uploadAvatar() {
    const avatarInput = document.getElementById('avatarInput');
    const file = avatarInput.files[0];
    
    if (!file) {
        showNotification('Por favor selecciona una imagen', 'error');
        return;
    }
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        showNotification('El archivo debe ser una imagen', 'error');
        return;
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('La imagen no debe superar los 5MB', 'error');
        return;
    }
    
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.src = e.target.result;
        
        // Cerrar modal
        const avatarModal = bootstrap.Modal.getInstance(document.getElementById('avatarModal'));
        avatarModal.hide();
        
        showNotification('Avatar actualizado correctamente', 'success');
        addToRecentActivity('Avatar actualizado', 'info');
    };
    
    reader.readAsDataURL(file);
}

function loadRecentActivity() {
    // Simular carga de actividad reciente
    const activities = [
        {
            icon: 'bi-check-circle',
            type: 'success',
            title: 'Perfil actualizado',
            time: 'Hace 2 horas'
        },
        {
            icon: 'bi-box-arrow-in-right',
            type: 'info',
            title: 'Inicio de sesión',
            time: 'Hoy a las 08:30 AM'
        },
        {
            icon: 'bi-key',
            type: 'warning',
            title: 'Contraseña cambiada',
            time: 'Hace 3 días'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h6>${activity.title}</h6>
                    <p class="text-muted mb-0">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }
}

function addToRecentActivity(title, type) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const iconMap = {
        success: 'bi-check-circle',
        info: 'bi-info-circle',
        warning: 'bi-exclamation-triangle',
        error: 'bi-x-circle'
    };
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item animate__animated animate__fadeInUp';
    newActivity.innerHTML = `
        <div class="activity-icon ${type}">
            <i class="${iconMap[type]}"></i>
        </div>
        <div class="activity-content">
            <h6>${title}</h6>
            <p class="text-muted mb-0">Ahora mismo</p>
        </div>
    `;
    
    // Insertar al principio de la lista
    activityList.insertBefore(newActivity, activityList.firstChild);
    
    // Limitar a 10 actividades
    const activities = activityList.querySelectorAll('.activity-item');
    if (activities.length > 10) {
        activityList.removeChild(activityList.lastChild);
    }
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Exportar funciones globales
window.changeAvatar = changeAvatar;
window.uploadAvatar = uploadAvatar;
