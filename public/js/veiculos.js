ready(() => {
    carregaSelects('fabricantes', null)

    let selFabricantes = document.getElementById('sel-fabricantes')

    if (selFabricantes !== null && selFabricantes !== undefined) {
        selFabricantes.addEventListener('change', carregaPorFabricante)
    }

    let form = document.getElementById('form-veiculos')

    if (form !== null && form !== undefined) {
        form.addEventListener('submit', gravaVeiculo)
    }

    let btnBusca = document.getElementById('btn-busca')

    if (btnBusca !== null && btnBusca !== undefined) {
        btnBusca.addEventListener('click', carregaVeiculo)
    }
})

function carregaSelects(resource, filter) {
    limpaOpcoes(resource)

    let url = `https://localhost:5001/api/${resource}`
    url += filter ? `?fabricante=${filter}` : ''

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert(`Problema ao carregar ${resource} do servidor.`)
            } else {
                if (data.length === 0) {
                    alert(`Problema ao carregar ${resource} do servidor.`)
                }

                let select = document.getElementById(`sel-${resource}`)
                select.insertAdjacentHTML('beforeend', '<option value="" selected disabled hidden></option>');

                let i = 1

                for (item of data) {
                    select.insertAdjacentHTML('beforeend', `<option value="${item.codigo}">${item.nome}</option>`);
                }
            }
        })
        .catch(error => {
            alert(error)
        })
}

function carregaPorFabricante() {
    let selFabricantes = document.getElementById('sel-fabricantes')

    if (selFabricantes !== null && selFabricantes !== undefined) {
        let codigo = parseInt(selFabricantes.value)

        carregaSelects('modelos', codigo)
        carregaSelects('cores', codigo)
    }
}

function limpaOpcoes(resource) {
    let select = document.getElementById(`sel-${resource}`)

    for (i = select.options.length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
}

function gravaVeiculo(e) {
    e.preventDefault()

    // modal

    let veiculo = {
        chassi: document.getElementById('txt-chassi').value,
        placa: document.getElementById('txt-placa').value.replace('-', ''),
        fabricante: parseInt(document.getElementById('sel-fabricantes').value),
        modelo: document.getElementById('sel-modelos').value,
        cor: document.getElementById('sel-cores').value,
        datavenda: document.getElementById('dat-datavenda').value,
        valor: parseFloat(document.getElementById('txt-valor').value.replace(/\D/g, "")) / 100
    }

    fetch(`https://localhost:5001/api/veiculos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculo)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                limpaForm('form-veiculos')

                alert('Veículo gravado com sucesso.')
            }
        })
        .catch(error => {
            alert(error)
        })
}

function converteData(target) {
    let obj = document.getElementById(target)

    let s = obj.value.split('-')

    return new Date(s[0], s[1], s[2])
}

function limpaForm(element) {
    let form = document.getElementById(element)

    form.reset()

    limpaOpcoes('modelos')
    limpaOpcoes('cores')

    let inputs = form.querySelectorAll('input,textarea,select')

    for (item of inputs) {
        item.classList.remove('active')
        item.focus()
    }

    document.getElementsByTagName('button')[0].focus()
}

let modelo
let cor

function carregaVeiculo() {
    let chassi = document.getElementById('txt-chassi').value

    if (chassi.length !== 17) {
        alert('Preencha corretamente o campo chassi para buscar.')
    }

    fetch(`https://localhost:5001/api/veiculos/${chassi}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert(`Problema ao carregar ${resource} do servidor.`)
            } else {
                if (data) {
                    var event = new Event('change')

                    let chassi = document.getElementById('txt-chassi')
                    chassi.value = data.chassi
                    validaCampos(chassi)

                    let placa = document.getElementById('txt-placa')
                    placa.value = data.placa
                    validaCampos(placa)

                    let fabricante = document.getElementById('sel-fabricantes')
                    fabricante.value = data.fabricante.toString()
                    fabricante.dispatchEvent(event)
                    validaCampos(fabricante)

                    modelo = data.modelo
                    cor = data.cor

                    setTimeout(() => {
                        let modelo2 = document.getElementById('sel-modelos')
                        modelo2.value = modelo
                        validaCampos(modelo2)

                        let cor2 = document.getElementById('sel-cores')
                        cor2.value = cor
                        validaCampos(cor2)

                        modelo = ''
                        cor = ''
                    }, 500)

                    let date = new Date(data.dataVenda)

                    let datDataVenda = document.getElementById('dat-datavenda')
                    datDataVenda.value = `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDay()).slice(-2)}`
                    validaCampos(datDataVenda)

                    let valor = document.getElementById('txt-valor')
                    valor.value = parseFloat(data.valor).toFixed(2)
                    AplicaMascara(valor, mMoeda)
                    validaCampos(valor)
                }
            }
        })
        .catch(error => {
            alert(error)
        })
}