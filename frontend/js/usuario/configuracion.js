// Configuración - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeConfiguration();
    setupEventListeners();
    loadCurrentSettings();
});

function initializeConfiguration() {
    // Aplicar configuraciones guardadas
    applyStoredSettings();
    
    // Configurar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function setupEventListeners() {
    // Listener para cambios en el tema
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        themeSelect.addEventListener('change', handleThemeChange);
    }
    
    // Listener para cambios en el idioma
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }
    
    // Listener para cambios en animaciones
    const animationsToggle = document.getElementById('animations');
    if (animationsToggle) {
        animationsToggle.addEventListener('change', handleAnimationsToggle);
    }
    
    // Listener para modo compacto
    const densityToggle = document.getElementById('densityMode');
    if (densityToggle) {
        densityToggle.addEventListener('change', handleDensityToggle);
    }
    
    // Listeners para notificaciones
    const notificationToggles = document.querySelectorAll('input[type="checkbox"][id$="Alerts"], input[type="checkbox"][id$="Summary"], input[type="checkbox"][id$="Reports"], input[type="checkbox"][id$="Notifications"]');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', handleNotificationToggle);
    });
    
    // Listeners para configuraciones de privacidad
    const privacyToggles = document.querySelectorAll('#privacy input[type="checkbox"]');
    privacyToggles.forEach(toggle => {
        toggle.addEventListener('change', handlePrivacyToggle);
    });
    
    // Listeners para configuraciones de sistema
    const systemToggles = document.querySelectorAll('#system input[type="checkbox"]');
    systemToggles.forEach(toggle => {
        toggle.addEventListener('change', handleSystemToggle);
    });
}

function loadCurrentSettings() {
    // Cargar configuraciones desde localStorage o API
    const defaultSettings = {
        theme: 'auto',
        language: 'es',
        timezone: 'America/Bogota',
        densityMode: true,
        animations: true,
        productionAlerts: true,
        healthAlerts: true,
        inventoryAlerts: true,
        salesAlerts: true,
        dailySummary: true,
        weeklyReports: false,
        pushNotifications: true,
        publicProfile: false,
        onlineStatus: true,
        analytics: true,
        performanceCookies: true,
        autoSync: true,
        wifiOnlySync: true
    };
    
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || defaultSettings;
    
    // Aplicar las configuraciones a los elementos del DOM
    Object.keys(savedSettings).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = savedSettings[key];
            } else {
                element.value = savedSettings[key];
            }
        }
    });
}

function applyStoredSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    
    // Aplicar tema
    if (savedSettings.theme) {
        applyTheme(savedSettings.theme);
    }
    
    // Aplicar animaciones
    if (savedSettings.animations === false) {
        document.body.classList.add('no-animations');
    }
    
    // Aplicar modo compacto
    if (savedSettings.densityMode) {
        document.body.classList.add('compact-mode');
    }
}

function handleThemeChange(event) {
    const theme = event.target.value;
    applyTheme(theme);
    saveSettings();
    showNotification('Tema actualizado correctamente', 'success');
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remover clases de tema existentes
    body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    
    // Aplicar nuevo tema
    switch (theme) {
        case 'light':
            body.classList.add('theme-light');
            break;
        case 'dark':
            body.classList.add('theme-dark');
            break;
        case 'auto':
        default:
            body.classList.add('theme-auto');
            // Detectar preferencia del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('theme-dark');
            } else {
                body.classList.add('theme-light');
            }
            break;
    }
}

function handleLanguageChange(event) {
    const language = event.target.value;
    // Aquí se implementaría el cambio de idioma
    console.log('Idioma cambiado a:', language);
    saveSettings();
    showNotification('Idioma actualizado. Recarga la página para ver los cambios.', 'info');
}

function handleAnimationsToggle(event) {
    const enabled = event.target.checked;
    
    if (enabled) {
        document.body.classList.remove('no-animations');
    } else {
        document.body.classList.add('no-animations');
    }
    
    saveSettings();
    showNotification(`Animaciones ${enabled ? 'habilitadas' : 'deshabilitadas'}`, 'success');
}

function handleDensityToggle(event) {
    const enabled = event.target.checked;
    
    if (enabled) {
        document.body.classList.add('compact-mode');
    } else {
        document.body.classList.remove('compact-mode');
    }
    
    saveSettings();
    showNotification(`Modo ${enabled ? 'compacto' : 'normal'} activado`, 'success');
}

function handleNotificationToggle(event) {
    const setting = event.target.id;
    const enabled = event.target.checked;
    
    const notificationNames = {
        productionAlerts: 'Alertas de Producción',
        healthAlerts: 'Alertas de Salud Animal',
        inventoryAlerts: 'Alertas de Inventario',
        salesAlerts: 'Alertas de Ventas',
        dailySummary: 'Resumen Diario',
        weeklyReports: 'Reportes Semanales',
        pushNotifications: 'Notificaciones Push'
    };
    
    saveSettings();
    showNotification(
        `${notificationNames[setting]} ${enabled ? 'habilitadas' : 'deshabilitadas'}`, 
        'success'
    );
}

function handlePrivacyToggle(event) {
    const setting = event.target.id;
    const enabled = event.target.checked;
    
    const privacyNames = {
        publicProfile: 'Perfil Público',
        onlineStatus: 'Estado Online',
        analytics: 'Análisis de Uso',
        performanceCookies: 'Cookies de Rendimiento'
    };
    
    saveSettings();
    showNotification(
        `${privacyNames[setting]} ${enabled ? 'habilitado' : 'deshabilitado'}`, 
        'success'
    );
}

function handleSystemToggle(event) {
    const setting = event.target.id;
    const enabled = event.target.checked;
    
    const systemNames = {
        autoSync: 'Sincronización Automática',
        wifiOnlySync: 'Sincronizar solo con WiFi'
    };
    
    saveSettings();
    showNotification(
        `${systemNames[setting]} ${enabled ? 'habilitado' : 'deshabilitado'}`, 
        'success'
    );
}

function saveGeneralSettings() {
    saveSettings();
    showNotification('Configuración general guardada correctamente', 'success');
}

function saveNotificationSettings() {
    saveSettings();
    showNotification('Configuración de notificaciones guardada correctamente', 'success');
}

function savePrivacySettings() {
    saveSettings();
    showNotification('Configuración de privacidad guardada correctamente', 'success');
}

function saveSystemSettings() {
    saveSettings();
    showNotification('Configuración del sistema guardada correctamente', 'success');
}

function saveSettings() {
    const settings = {};
    
    // Recopilar todas las configuraciones
    const inputs = document.querySelectorAll('select, input[type="checkbox"]');
    inputs.forEach(input => {
        if (input.id) {
            if (input.type === 'checkbox') {
                settings[input.id] = input.checked;
            } else {
                settings[input.id] = input.value;
            }
        }
    });
    
    // Guardar en localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // En una aplicación real, también se enviaría al servidor
    console.log('Configuraciones guardadas:', settings);
}

function clearCache() {
    // Simular limpieza de caché
    showNotification('Limpiando caché...', 'info');
    
    setTimeout(() => {
        // Limpiar localStorage relacionado con caché
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('cache_') || key.startsWith('temp_')) {
                localStorage.removeItem(key);
            }
        });
        
        showNotification('Caché limpiado correctamente', 'success');
        
        // Actualizar información de almacenamiento
        updateStorageInfo();
    }, 2000);
}

function updateStorageInfo() {
    // Simular actualización de información de almacenamiento
    const storageItems = document.querySelectorAll('.storage-item span:last-child');
    if (storageItems.length >= 3) {
        storageItems[2].textContent = '12 MB'; // Cache reducido
    }
    
    // Actualizar barra de progreso
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '42%'; // Reducido después de limpiar cache
    }
    
    const storageText = document.querySelector('.storage-info small');
    if (storageText) {
        storageText.textContent = '2.1 GB de 5 GB utilizados';
    }
}

function downloadData() {
    showNotification('Preparando descarga de datos...', 'info');
    
    // Simular preparación de datos
    setTimeout(() => {
        const userData = {
            profile: JSON.parse(localStorage.getItem('userProfile')) || {},
            settings: JSON.parse(localStorage.getItem('userSettings')) || {},
            activity: JSON.parse(localStorage.getItem('userActivity')) || [],
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `datos-usuario-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showNotification('Datos descargados correctamente', 'success');
    }, 3000);
}

function requestDataDeletion() {
    const confirmed = confirm('¿Estás seguro de que quieres solicitar la eliminación de tu cuenta? Esta acción no se puede deshacer.');
    
    if (confirmed) {
        showNotification('Solicitud de eliminación enviada. Te contactaremos en 24-48 horas.', 'warning');
        
        // En una aplicación real, se enviaría una solicitud al servidor
        console.log('Solicitud de eliminación de datos enviada');
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
window.saveGeneralSettings = saveGeneralSettings;
window.saveNotificationSettings = saveNotificationSettings;
window.savePrivacySettings = savePrivacySettings;
window.saveSystemSettings = saveSystemSettings;
window.clearCache = clearCache;
window.downloadData = downloadData;
window.requestDataDeletion = requestDataDeletion;

// Efecto de lluvia especial
function activateRainEffect() {
    const rainElement = document.querySelector('.config-header .rain');
    if (rainElement) {
        rainElement.style.opacity = '1';
        
        // Desactivar después de 3 segundos
        setTimeout(() => {
            rainElement.style.opacity = '0';
        }, 3000);
    }
}

// Activar lluvia al hacer clic en el título
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.config-header h2');
    if (title) {
        title.addEventListener('click', activateRainEffect);
        title.style.cursor = 'pointer';
        title.title = 'Haz clic para ver la lluvia';
    }
});
