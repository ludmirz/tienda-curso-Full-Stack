'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select')
        const textarea = form.querySelector('#floatingTextarea2')
        const mensajeExito = document.querySelector('#mensajeExito')

        // Función que valida un campo individual y le pone la clase correspondiente
        const validateField = (field) => {
            if (field === textarea) {
                field.setCustomValidity(field.value.trim() === '' ? 'Campo inválido' : '')
            }
            if (field.checkValidity()) {
                field.classList.remove('is-invalid')
                field.classList.add('is-valid')
            } else {
                field.classList.remove('is-valid')
                field.classList.add('is-invalid')
            }
        }

        // Valida cada campo mientras el usuario escribe
        inputs.forEach(field => {
            field.addEventListener('input', () => validateField(field))
            field.addEventListener('blur', () => validateField(field))
        })

        // Validación general al enviar el formulario
        form.addEventListener('submit', event => {
            inputs.forEach(field => validateField(field))

            // Siempre prevenimos el envío real (no hay backend que lo reciba)
            event.preventDefault()
            event.stopPropagation()

            if (form.checkValidity()) {
                // Formulario válido: mostramos el mensaje de éxito
                if (mensajeExito) {
                    mensajeExito.classList.remove('d-none')
                }
                form.reset()
                form.classList.remove('was-validated')
                inputs.forEach(field => {
                    field.classList.remove('is-valid')
                    field.classList.remove('is-invalid')
                })
            } else {
                // Formulario inválido: nos aseguramos de ocultar el mensaje si estaba visible
                if (mensajeExito) {
                    mensajeExito.classList.add('d-none')
                }
                form.classList.add('was-validated')
            }
        }, false)
    })
})