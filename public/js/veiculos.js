ready(() => {
    carregaSelects('fabricantes', null)

    let selFabricantes = document.getElementById('sel-fabricantes')

    if (selFabricantes !== null && selFabricantes !== undefined) {
        selFabricantes.addEventListener('change', carregaPorFabricante)
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
        .catch((error) => {
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