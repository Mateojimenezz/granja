// Registro.js - Funcionalidad para la página de registro
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistration();
});

function initializeRegistration() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Inicializar validación de formulario
    setupFormValidation(form);
    
    // Configurar validación de contraseña en tiempo real
    setupPasswordValidation(passwordInput, confirmPasswordInput);
    
    // Configurar envío del formulario
    form.addEventListener('submit', handleFormSubmit);
    
    // Configurar validación de email
    setupEmailValidation();
    
    // Configurar validación de campos requeridos
    setupRequiredFieldValidation();
}

function setupFormValidation(form) {
    // Bootstrap validation
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    });
}

function setupPasswordValidation(passwordInput, confirmPasswordInput) {
    // Validación de fuerza de contraseña
    passwordInput.addEventListener('input', function() {
        validatePasswordStrength(this.value);
        validatePasswordMatch();
    });
    
    // Validación de confirmación de contraseña
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
}

function validatePasswordStrength(password) {
    const progressBar = document.querySelector('.password-strength .progress-bar');
    const hint = document.querySelector('.password-hint');
    
    if (!progressBar || !hint) return;
    
    let strength = 0;
    let feedback = '';
    
    // Criterios de validación
    const criteria = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Calcular puntuación
    Object.values(criteria).forEach(met => {
        if (met) strength++;
    });
    
    // Actualizar barra de progreso y mensaje
    if (password.length === 0) {
        progressBar.style.width = '0%';
        progressBar.className = 'progress-bar';
        feedback = 'La contraseña debe tener al menos 8 caracteres';
    } else if (strength <= 2) {
        progressBar.style.width = '33.33%';
        progressBar.className = 'progress-bar weak';
        feedback = 'Contraseña débil';
    } else if (strength <= 4) {
        progressBar.style.width = '66.66%';
        progressBar.className = 'progress-bar medium';
        feedback = 'Contraseña moderada';
    } else {
        progressBar.style.width = '100%';
        progressBar.className = 'progress-bar strong';
        feedback = 'Contraseña fuerte';
    }
    
    hint.textContent = feedback;
    hint.className = `password-hint text-muted ${strength <= 2 ? 'text-danger' : strength <= 4 ? 'text-warning' : 'text-success'}`;
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmInput = document.getElementById('confirmPassword');
    
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            confirmInput.classList.remove('is-invalid');
            confirmInput.classList.add('is-valid');
        } else {
            confirmInput.classList.remove('is-valid');
            confirmInput.classList.add('is-invalid');
        }
    } else {
        confirmInput.classList.remove('is-valid', 'is-invalid');
    }
}

function setupEmailValidation() {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email && !isValidEmail(email)) {
            this.classList.add('is-invalid');
            showFieldError(this, 'Por favor, ingresa un email válido');
        } else if (email) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            hideFieldError(this);
        }
    });
}

function setupRequiredFieldValidation() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Este campo es obligatorio');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                hideFieldError(this);
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                hideFieldError(this);
            }
        });
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validaciones adicionales
    if (!validateForm(data)) {
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    // Simular envío (aquí iría la llamada real al backend)
    setTimeout(() => {
        hideLoading();
        showSuccessMessage();
    }, 2000);
}

function validateForm(data) {
    let isValid = true;
    
    // Validar contraseñas coincidan
    if (data.password !== data.confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'error');
        isValid = false;
    }
    
    // Validar fuerza de contraseña
    if (data.password.length < 8) {
        showAlert('La contraseña debe tener al menos 8 caracteres', 'error');
        isValid = false;
    }
    
    // Validar términos y condiciones
    if (!document.getElementById('terms').checked) {
        showAlert('Debes aceptar los términos y condiciones', 'error');
        isValid = false;
    }
    
    // Validar email
    if (!isValidEmail(data.email)) {
        showAlert('Por favor, ingresa un email válido', 'error');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function showLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Creando cuenta...
    `;
}

function hideLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        Crear Cuenta
        <i class="bi bi-person-plus-fill ms-2"></i>
    `;
}

function showSuccessMessage() {
    showAlert('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function showAlert(message, type = 'info') {
    // Crear el contenedor de alertas si no existe
    let alertContainer = document.querySelector('.alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container position-fixed top-0 start-50 translate-middle-x';
        alertContainer.style.zIndex = '9999';
        alertContainer.style.marginTop = '20px';
        document.body.appendChild(alertContainer);
    }
    
    // Crear la alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show animate__animated animate__fadeInDown`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.add('animate__fadeOutUp');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }
    }, 5000);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentNode.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'bi bi-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'bi bi-eye';
    }
}

// Función para autocompletar ubicación (opcional)
function setupLocationAutocomplete() {
    // Esta función se puede usar en el futuro si se necesita autocompletado de ubicación
    console.log('Autocompletado de ubicación disponible para futuras implementaciones');
}

// Inicializar funcionalidades adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupLocationAutocomplete();
});
