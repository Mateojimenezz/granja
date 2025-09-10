// Manejo específico del formulario de login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!FormUtils.validate(this)) {
        return;
    }
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        remember: document.getElementById('remember').checked
    };
    
    try {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Iniciando sesión...';
        submitButton.disabled = true;

        // Aquí iría la llamada al servidor para autenticación
        console.log('Enviando datos:', formData);
        
        // Simulación de respuesta exitosa
        setTimeout(() => {
            window.location.href = '../../../paginadeinicio.html';
        }, 1000);
    } catch (error) {
        console.error('Error de autenticación:', error);
        FormUtils.showError(document.getElementById('email'), 'Credenciales inválidas');
    }
});

// Función para mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Efecto hover para el logo
document.querySelector('.login-logo').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.login-logo').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
