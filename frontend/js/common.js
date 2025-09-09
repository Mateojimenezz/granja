// Utilidades de formulario
const FormUtils = {
    validate: function(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, 'Este campo es requerido');
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    },
    
    showError: function(input, message) {
        const formGroup = input.parentElement;
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-danger small mt-1';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        formGroup.classList.add('has-error');
    },
    
    clearError: function(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        formGroup.classList.remove('has-error');
    }
};

// Animaciones de UI
const UIEffects = {
    initInputEffects: function() {
        document.querySelectorAll('.glass-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    },
    
    initPasswordToggles: function() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const icon = this.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('bi-eye', 'bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.replace('bi-eye-slash', 'bi-eye');
                }
            });
        });
    }
};

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    UIEffects.initInputEffects();
    UIEffects.initPasswordToggles();
});
