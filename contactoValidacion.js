'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select')
        const textarea = form.querySelector('#floatingTextarea2')
        const charCounter = form.querySelector('#charCounter')
        const mensajeExito = document.querySelector('#mensajeExito')

        // Solo letras y espacios
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
        // Email con formato y dominio obligatorio (ej: nombre@dominio.com)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

        // Contador de caracteres en tiempo real para comentarios
        if (textarea && charCounter) {
            textarea.addEventListener('input', () => {
                charCounter.textContent = `${textarea.value.length} / 250 caracteres`
            })
        }

        // Valida individualmente cada campo
        const validateField = (field) => {
            const value = field.value.trim();
            let message = '';

            if (!value) {
                message = 'Campo obligatorio';
            } else if ((field.id === 'floatingName' || field.id === 'floatingLastName') &&
                !nameRegex.test(value)) {
                message = 'No se admiten números ni caracteres especiales';
            } else if (field.id === 'floatingInput' && !emailRegex.test(value)) {
                message = 'Email inválido';
            }

            field.setCustomValidity(message);

            const feedback = form.querySelector(
                `#feedback${field.id === 'floatingInput' ? 'Email' :
                    field.id === 'floatingName' ? 'Name' : 'LastName'}`
            );

            if (feedback) {
                feedback.textContent = message ?
                    (message === 'Campo obligatorio' ? 'Por favor, completá este campo.' : message + '.')
                    : '';
            }

            field.classList.toggle('is-valid', !message);
            field.classList.toggle('is-invalid', !!message);
        };

        // Valida cada campo mientras el usuario escribe y al salir
        inputs.forEach(field => {
            field.addEventListener('input', () => validateField(field))
            field.addEventListener('blur', () => validateField(field))
        })

        // Validación al enviar el formulario
        form.addEventListener('submit', event => {
            inputs.forEach(field => validateField(field))

            event.preventDefault()
            event.stopPropagation()

            if (form.checkValidity()) {
                if (mensajeExito) {
                    mensajeExito.classList.remove('d-none')
                }
                form.reset()
                if (charCounter) {
                    charCounter.textContent = '0 / 250 caracteres'
                }
                form.classList.remove('was-validated')
                inputs.forEach(field => {
                    field.classList.remove('is-valid')
                    field.classList.remove('is-invalid')
                })
            } else {
                if (mensajeExito) {
                    mensajeExito.classList.add('d-none')
                }
                form.classList.add('was-validated')
            }
        }, false)
    })
})