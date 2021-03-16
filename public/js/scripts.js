function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    }
}

ready(function () {
    animaCampos()
    limitaInputs()
})

function animaCampos() {
    let inputs = document.querySelectorAll('.animar-input input')

    for (input of inputs) {
        input.addEventListener('blur', function () {
            validaCampos(this)
        })

        validaCampos(input)
    }

    let selects = document.querySelectorAll('.animar-input select')

    for (select of selects) {
        select.addEventListener('blur', function () {
            validaCampos(this)
        })

        validaCampos(select)
    }

    let areas = document.querySelectorAll('.animar-input textarea')

    for (area of areas) {
        area.addEventListener('blur', function () {
            validaCampos(this)
        })

        validaCampos(area)
    }
}

function validaCampos(input) {
    let label = input.parentElement.querySelector('label')

    if (label) {
        if (input.value !== '') {
            input.classList.add('active')
            label.classList.add('active')
        } else {
            input.classList.remove('active')
            label.classList.remove('active')
        }
    }    
}

function limitaInputs() {
    let elements = document.getElementsByTagName('input[type=text], textarea')
    
    for (element of elements) {
        element.addEventListener('oninput', () => {
            if (this.value.length > this.maxLength) 
                this.value = this.value.slice(0, this.maxLength)
        })
    }
}