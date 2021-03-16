ready(() => {
    let btnLogin = document.getElementById('btn-login')

    if (btnLogin !== null && btnLogin !== undefined) {
        btnLogin.addEventListener('click', entrarSistema)
    }
})

function entrarSistema(e) {
    e.preventDefault()

    let form = document.getElementById('form-login')

    if (!form.checkValidity()) {
        let tmpSubmit = document.createElement('button')

        form.appendChild(tmpSubmit)
        tmpSubmit.click()
        form.removeChild(tmpSubmit)
    } else {
        let login = document.getElementById('txt-login').value
        let senha = document.getElementById('txt-senha').value

        if (login === 'master' && senha === '1234') {
            window.location.assign("/veiculos.html")
            return
        }

        alert('Usuário/senha incorretos.')
    }
}